import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Simple health check endpoint for Railway
export async function GET() {
  try {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'sog-global-consult',
      version: '1.0.0'
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: 'Health check failed'
    }, { status: 500 })
  }
}
