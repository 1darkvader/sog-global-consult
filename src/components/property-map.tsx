"use client"

import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

type Property = {
  id: string
  title: string
  description: string
  price: number
  location: string
  address: string
  latitude?: number
  longitude?: number
  type: string
  status: string
  bedrooms: number
  bathrooms: number
  area: number
  parking: number
  featured: boolean
  yearBuilt?: number
  furnished: boolean
  petFriendly: boolean
  garden: boolean
  balcony: boolean
  slug: string
  soldDate?: string
  createdAt: string
  updatedAt: string
  images: Array<{
    id: string
    url: string
    publicId: string
    caption?: string
    isPrimary: boolean
    order: number
  }>
  features: Array<{
    id: string
    name: string
    icon?: string
  }>
  _count?: {
    views: number
    inquiries: number
  }
}

type PropertyMapProps = {
  properties: Property[]
  height?: string
}

export function PropertyMap({
  properties,
  height = '400px'
}: PropertyMapProps) {
  // Filter properties with valid coordinates
  const mappedProperties = properties.filter(
    property => property.latitude && property.longitude
  )

  return (
    <div className="relative rounded-lg overflow-hidden border border-border" style={{ height }}>
      <div className="w-full h-full bg-muted/20 flex items-center justify-center rounded-lg">
        <div className="text-center space-y-4 p-8">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold navy-text">Interactive Map</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Map integration with Mapbox requires additional setup.
            </p>
            <p className="text-xs text-muted-foreground">
              Set your NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in .env.local to enable maps
            </p>
          </div>
          <div className="text-sm font-medium navy-text">
            {mappedProperties.length} Properties with Location Data
          </div>

          {/* Property List for Map View */}
          <div className="mt-6 max-w-md mx-auto space-y-2">
            {mappedProperties.slice(0, 3).map((property) => (
              <Card key={property.id} className="text-left">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm navy-text line-clamp-1">
                        {property.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {property.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold gold-accent">
                        ₦{(property.price / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {property.bedrooms}BR
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {mappedProperties.length > 3 && (
              <p className="text-xs text-muted-foreground">
                +{mappedProperties.length - 3} more properties
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
