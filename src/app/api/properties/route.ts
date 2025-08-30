import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { PropertyType, PropertyStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

// GET /api/properties - Fetch properties with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters for filtering
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') as PropertyType | null
    const status = searchParams.get('status') as PropertyStatus | null
    const location = searchParams.get('location') || ''
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined
    const minBedrooms = searchParams.get('minBedrooms') ? parseInt(searchParams.get('minBedrooms')!) : undefined
    const maxBedrooms = searchParams.get('maxBedrooms') ? parseInt(searchParams.get('maxBedrooms')!) : undefined
    const featured = searchParams.get('featured') === 'true'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (type) where.type = type
    if (status) where.status = status
    if (location) where.location = { contains: location, mode: 'insensitive' }
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = minPrice
      if (maxPrice) where.price.lte = maxPrice
    }
    if (minBedrooms || maxBedrooms) {
      where.bedrooms = {}
      if (minBedrooms) where.bedrooms.gte = minBedrooms
      if (maxBedrooms) where.bedrooms.lte = maxBedrooms
    }
    if (featured) where.featured = true

    // Calculate skip for pagination
    const skip = (page - 1) * limit

    // Fetch properties with relations
    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: {
            orderBy: { order: 'asc' }
          },
          features: true,
          _count: {
            select: {
              views: true,
              inquiries: true
            }
          }
        },
        orderBy: {
          [sortBy]: sortOrder
        },
        skip,
        take: limit
      }),
      prisma.property.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        properties,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    })

  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create new property
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      price,
      location,
      address,
      latitude,
      longitude,
      type,
      status = 'AVAILABLE',
      bedrooms,
      bathrooms,
      area,
      parking,
      featured = false,
      yearBuilt,
      furnished = false,
      petFriendly = false,
      garden = false,
      balcony = false,
      features = [],
      createdById,
      images = []
    } = body

    // Validate required fields
    if (!title || !description || !price || !location || !type || !createdById) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, description, price, location, type are required' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Check if slug exists and make it unique
    let uniqueSlug = slug
    let counter = 1
    while (await prisma.property.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`
      counter++
    }

    // Create property with relations
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseInt(price),
        location,
        address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        type,
        status,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area: parseInt(area),
        parking: parseInt(parking),
        featured,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        furnished,
        petFriendly,
        garden,
        balcony,
        slug: uniqueSlug,
        createdById,
        features: {
          create: features.map((feature: string, index: number) => ({
            name: feature,
            icon: null
          }))
        },
        images: {
          create: images.map((image: any, index: number) => ({
            url: image.url,
            publicId: image.publicId,
            caption: image.caption || null,
            isPrimary: index === 0,
            order: index
          }))
        }
      },
      include: {
        images: true,
        features: true,
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: property,
      message: 'Property created successfully'
    })

  } catch (error) {
    console.error('Error creating property:', error)

    // Provide more specific error messages
    let errorMessage = 'Failed to create property'
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        errorMessage = 'A property with this title already exists. Please use a different title.'
      } else if (error.message.includes('createdById')) {
        errorMessage = 'Admin user not found. Please contact support.'
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    )
  }
}
