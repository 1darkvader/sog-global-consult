import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/legal-documents/[id] - Fetch single legal document
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const document = await prisma.legalDocument.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Legal document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: document
    })

  } catch (error) {
    console.error('Error fetching legal document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch legal document' },
      { status: 500 }
    )
  }
}

// PUT /api/legal-documents/[id] - Update legal document
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
      category,
      filePath,
      fileName,
      fileSize,
      mimeType,
      isActive,
      order
    } = body

    // Check if document exists
    const existingDocument = await prisma.legalDocument.findUnique({
      where: { id }
    })

    if (!existingDocument) {
      return NextResponse.json(
        { success: false, error: 'Legal document not found' },
        { status: 404 }
      )
    }

    const document = await prisma.legalDocument.update({
      where: { id },
      data: {
        title,
        description,
        category,
        filePath,
        fileName,
        fileSize: fileSize ? parseInt(fileSize) : undefined,
        mimeType,
        isActive,
        order: order ? parseInt(order) : undefined
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
      message: 'Legal document updated successfully'
    })

  } catch (error) {
    console.error('Error updating legal document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update legal document' },
      { status: 500 }
    )
  }
}

// DELETE /api/legal-documents/[id] - Delete legal document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if document exists
    const document = await prisma.legalDocument.findUnique({
      where: { id }
    })

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Legal document not found' },
        { status: 404 }
      )
    }

    // Delete document
    await prisma.legalDocument.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Legal document deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting legal document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete legal document' },
      { status: 500 }
    )
  }
}
