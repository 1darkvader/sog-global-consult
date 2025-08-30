import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// POST /api/geocode - Convert address to coordinates
export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json()

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    // Use Google Geocoding API
    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Geocoding service not configured' },
        { status: 500 }
      )
    }

    const encodedAddress = encodeURIComponent(address)
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0]
      const { lat, lng } = result.geometry.location

      return NextResponse.json({
        success: true,
        data: {
          latitude: lat,
          longitude: lng,
          formatted_address: result.formatted_address,
          place_id: result.place_id,
          address_components: result.address_components
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Address not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Error geocoding address:', error)
    return NextResponse.json(
      { success: false, error: 'Geocoding failed' },
      { status: 500 }
    )
  }
}

// GET /api/geocode/reverse - Convert coordinates to address
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GOOGLE_GEOCODING_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Geocoding service not configured' },
        { status: 500 }
      )
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0]

      return NextResponse.json({
        success: true,
        data: {
          formatted_address: result.formatted_address,
          place_id: result.place_id,
          address_components: result.address_components
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Location not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Error reverse geocoding:', error)
    return NextResponse.json(
      { success: false, error: 'Reverse geocoding failed' },
      { status: 500 }
    )
  }
}
