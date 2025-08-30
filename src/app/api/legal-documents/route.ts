import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/legal-documents - Fetch legal documents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const activeOnly = searchParams.get('activeOnly') === 'true'

    const where: any = {}
    if (category) where.category = category
    if (activeOnly) where.isActive = true

    const documents = await prisma.legalDocument.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({
      success: true,
      data: { documents }
    })

  } catch (error) {
    console.error('Error fetching legal documents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch legal documents' },
      { status: 500 }
    )
  }
}

// POST /api/legal-documents - Create new legal document
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      category,
      filePath,
      fileName,
      fileSize,
      mimeType,
      isActive = true,
      order = 0,
      createdById
    } = body

    // Validate required fields
    if (!title || !category || !filePath || !fileName || !createdById) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, category, filePath, fileName are required' },
        { status: 400 }
      )
    }

    const document = await prisma.legalDocument.create({
      data: {
        title,
        description,
        category,
        filePath,
        fileName,
        fileSize: parseInt(fileSize) || 0,
        mimeType,
        isActive,
        order: parseInt(order),
        createdById
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: document,
      message: 'Legal document created successfully'
    })

  } catch (error) {
    console.error('Error creating legal document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create legal document' },
      { status: 500 }
    )
  }
}
