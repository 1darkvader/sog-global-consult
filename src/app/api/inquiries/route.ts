import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Email functionality disabled for now - can be re-enabled later
// import { Resend } from 'resend'
// const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// GET /api/inquiries - Fetch inquiries (Admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type

    const skip = (page - 1) * limit

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: {
          property: {
            select: {
              id: true,
              title: true,
              slug: true,
              price: true,
              images: {
                where: { isPrimary: true },
                take: 1
              }
            }
          },
          responses: {
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.inquiry.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: {
        inquiries,
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
    console.error('Error fetching inquiries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

// POST /api/inquiries - Create new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      message,
      type = 'GENERAL',
      propertyId,
      budgetMin,
      budgetMax
    } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Create inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        type,
        propertyId,
        budgetMin: budgetMin ? parseInt(budgetMin) : null,
        budgetMax: budgetMax ? parseInt(budgetMax) : null
      },
      include: {
        property: {
          select: {
            title: true,
            slug: true,
            price: true
          }
        }
      }
    })

    // Email notifications temporarily disabled for Cloudflare Pages compatibility
    console.log('Inquiry submitted successfully - Email notifications disabled for now')

    // TODO: Re-enable email notifications when ready
    /*
    try {
      if (false) { // Temporarily disabled
        // Email to admin
        await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@sogglobalconsult.com',
        to: process.env.ADMIN_EMAIL || 'admin@sogglobalconsult.com',
        subject: `New ${type} Inquiry - ${inquiry.property?.title || 'General'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">New Property Inquiry</h2>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Contact Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Type:</strong> ${type}</p>
            </div>

            ${inquiry.property ? `
              <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Property Details</h3>
                <p><strong>Property:</strong> ${inquiry.property.title}</p>
                <p><strong>Price:</strong> ₦${inquiry.property.price.toLocaleString()}</p>
              </div>
            ` : ''}

            ${budgetMin || budgetMax ? `
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Budget Range</h3>
                <p><strong>Min:</strong> ${budgetMin ? `₦${parseInt(budgetMin).toLocaleString()}` : 'Not specified'}</p>
                <p><strong>Max:</strong> ${budgetMax ? `₦${parseInt(budgetMax).toLocaleString()}` : 'Not specified'}</p>
              </div>
            ` : ''}

            <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Message</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin"
                 style="background: #1e3a8a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                View in Admin Panel
              </a>
            </div>
          </div>
        `
      })

        // Auto-reply to customer
        await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@sogglobalconsult.com',
        to: email,
        subject: 'Thank you for your inquiry - SOG Global Consult',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a;">Thank You for Your Inquiry</h2>

            <p>Dear ${name},</p>

            <p>Thank you for your interest in ${inquiry.property?.title || 'SOG Global Consult services'}. We have received your inquiry and will get back to you within 24 hours.</p>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Your Inquiry Details</h3>
              <p><strong>Type:</strong> ${type}</p>
              ${inquiry.property ? `<p><strong>Property:</strong> ${inquiry.property.title}</p>` : ''}
              <p><strong>Message:</strong> ${message}</p>
            </div>

            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Browse our <a href="${process.env.NEXT_PUBLIC_APP_URL}/properties">property listings</a></li>
              <li>Learn more <a href="${process.env.NEXT_PUBLIC_APP_URL}/about">about our company</a></li>
              <li>Call us directly at +234 XXX XXX XXXX</li>
            </ul>

            <p>Best regards,<br>
            SOG Global Consult Limited<br>
            No 8, 4th Avenue Infinity Estate<br>
            Addo Road, Ajah, Lagos, Nigeria</p>
          </div>
        `
        })
      } else {
        console.log('Email notifications disabled - RESEND_API_KEY not configured')
      }

    } catch (emailError) {
      console.error('Error sending emails:', emailError)
      // Don't fail the request if email fails
    }
    */

    return NextResponse.json({
      success: true,
      data: inquiry,
      message: 'Inquiry submitted successfully. We will get back to you soon!'
    })

  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}
