import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/properties/[id] - Fetch single property
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        features: true,
        createdBy: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: {
            views: true,
            inquiries: true
          }
        }
      }
    })

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    // Track property view
    const clientIP = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    '127.0.0.1'
    const userAgent = request.headers.get('user-agent') || ''

    // Create view record (unique constraint will prevent duplicates)
    try {
      await prisma.propertyView.create({
        data: {
          propertyId: property.id,
          ipAddress: clientIP,
          userAgent
        }
      })
    } catch (error) {
      // Ignore duplicate view errors
    }

    return NextResponse.json({
      success: true,
      data: property
    })

  } catch (error) {
    console.error('Error fetching property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch property' },
      { status: 500 }
    )
  }
}

// PUT /api/properties/[id] - Update property
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      status,
      bedrooms,
      bathrooms,
      area,
      parking,
      featured,
      yearBuilt,
      furnished,
      petFriendly,
      garden,
      balcony,
      features = [],
      images = []
    } = body

    // Check if property exists
    const existingProperty = await prisma.property.findUnique({
      where: { id },
      include: { features: true, images: true }
    })

    if (!existingProperty) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    // Generate new slug if title changed
    let slug = existingProperty.slug
    if (title && title !== existingProperty.title) {
      slug = title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      // Make slug unique
      let uniqueSlug = slug
      let counter = 1
      while (await prisma.property.findFirst({
        where: { slug: uniqueSlug, id: { not: id } }
      })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      slug = uniqueSlug
    }

    // Update property with transaction
    const property = await prisma.$transaction(async (tx) => {
      // Delete existing features
      await tx.propertyFeature.deleteMany({
        where: { propertyId: id }
      })

      // Delete existing images
      await tx.propertyImage.deleteMany({
        where: { propertyId: id }
      })

      // Update property
      return await tx.property.update({
        where: { id },
        data: {
          title,
          description,
          price: price ? parseInt(price) : undefined,
          location,
          address,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
          type,
          status,
          bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
          bathrooms: bathrooms ? parseInt(bathrooms) : undefined,
          area: area ? parseInt(area) : undefined,
          parking: parking ? parseInt(parking) : undefined,
          featured,
          yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
          furnished,
          petFriendly,
          garden,
          balcony,
          slug,
          features: {
            create: features.map((feature: string) => ({
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
          images: {
            orderBy: { order: 'asc' }
          },
          features: true,
          createdBy: {
            select: { id: true, name: true, email: true }
          }
        }
      })
    })

    return NextResponse.json({
      success: true,
      data: property,
      message: 'Property updated successfully'
    })

  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update property' },
      { status: 500 }
    )
  }
}

// DELETE /api/properties/[id] - Delete property
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Check if property exists
    const property = await prisma.property.findUnique({
      where: { id },
      include: { images: true }
    })

    if (!property) {
      return NextResponse.json(
        { success: false, error: 'Property not found' },
        { status: 404 }
      )
    }

    // Delete property (cascade will handle related records)
    await prisma.property.delete({
      where: { id }
    })

    // TODO: Delete images from Cloudinary
    // You would implement Cloudinary deletion here using the publicId from property.images

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}
