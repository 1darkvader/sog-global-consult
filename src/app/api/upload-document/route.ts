import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export const dynamic = 'force-dynamic'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload-document - Upload legal documents to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'legal-documents'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type (allow PDF, DOC, DOCX, TXT)
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum allowed size is 10MB.' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `sog-global-consult/${folder}`,
          resource_type: 'auto', // Allows non-image files
          public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve({
              url: result?.secure_url,
              publicId: result?.public_id,
              fileName: file.name,
              fileSize: file.size,
              mimeType: file.type,
              format: result?.format,
              resourceType: result?.resource_type
            })
          }
        }
      ).end(buffer)
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Document uploaded successfully'
    })

  } catch (error) {
    console.error('Error uploading document:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}
