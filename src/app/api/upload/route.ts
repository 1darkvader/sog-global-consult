import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

export const dynamic = 'force-dynamic'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// POST /api/upload - Upload images to Cloudinary
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const folder = formData.get('folder') as string || 'sog-properties'

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      )
    }

    const uploadPromises = files.map(async (file) => {
      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: `sog-global-consult/${folder}`,
            resource_type: 'image',
            transformation: [
              { width: 1200, height: 800, crop: 'fill', quality: 'auto' },
              { flags: 'progressive' }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve({
                url: result?.secure_url,
                publicId: result?.public_id,
                width: result?.width,
                height: result?.height,
                format: result?.format,
                size: result?.bytes
              })
            }
          }
        ).end(buffer)
      })
    })

    const uploadedImages = await Promise.all(uploadPromises)

    return NextResponse.json({
      success: true,
      data: {
        images: uploadedImages,
        count: uploadedImages.length
      },
      message: `Successfully uploaded ${uploadedImages.length} image(s)`
    })

  } catch (error) {
    console.error('Error uploading images:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

// DELETE /api/upload - Delete image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get('publicId')

    if (!publicId) {
      return NextResponse.json(
        { success: false, error: 'Public ID is required' },
        { status: 400 }
      )
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId)

    if (result.result === 'ok') {
      return NextResponse.json({
        success: true,
        message: 'Image deleted successfully'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to delete image' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
