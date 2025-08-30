"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  MapPin, Bed, Bath, Square, Car, Phone, Mail,
  Search, Filter, Eye, CheckCircle, Star, ArrowRight,
  ChevronLeft, ChevronRight, X, SlidersHorizontal, Map, Grid3X3, Loader2
} from "lucide-react"
import Link from "next/link"
import { PropertyMap } from "@/components/property-map"

// Property type definition matching database schema
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



// Image Carousel Component
const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative group">
      <img
        src={images[currentImage]}
        alt={title}
        className="w-full h-48 object-cover transition-all duration-300"
      />

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentImage + 1} / {images.length}
        </div>
      )}
    </div>
  )
}

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 500000000])
  const [minBedrooms, setMinBedrooms] = useState(0)
  const [maxBedrooms, setMaxBedrooms] = useState(10)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Real data states
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [availableProperties, setAvailableProperties] = useState<Property[]>([])
  const [soldProperties, setSoldProperties] = useState<Property[]>([])

  // Load properties from API
  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/properties')
      const data = await response.json()

      if (data.success) {
        const properties = data.data.properties || []
        setAllProperties(properties)
        setAvailableProperties(properties.filter((p: Property) => p.status === 'AVAILABLE'))
        setSoldProperties(properties.filter((p: Property) => p.status === 'SOLD'))
      } else {
        setError('Failed to load properties')
      }
    } catch (error) {
      console.error('Error loading properties:', error)
      setError('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  // Filter properties based on search criteria
  const filterProperties = (properties: Property[]) => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || property.type.toLowerCase() === selectedType.toLowerCase()
      const matchesLocation = selectedLocation === "all" ||
                             property.location.toLowerCase().includes(selectedLocation.toLowerCase())
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
      const matchesBedrooms = property.bedrooms >= minBedrooms && property.bedrooms <= maxBedrooms

      return matchesSearch && matchesType && matchesLocation && matchesPrice && matchesBedrooms
    })
  }

  const filteredAvailableProperties = filterProperties(availableProperties)
  const filteredSoldProperties = filterProperties(soldProperties)

  const PropertyCard = ({ property, showSoldBadge = false }: { property: Property, showSoldBadge?: boolean }) => {

    return (
    <Card className="illuminated-card hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <ImageCarousel
          images={property.images.map(img => img.url)}
          title={property.title}
        />
        <div className="absolute top-4 left-4 space-y-2">
          {property.featured && (
            <Badge className="bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          {showSoldBadge && property.soldDate && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Sold - {new Date(property.soldDate).toLocaleDateString()}
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-blue-100 text-primary border-blue-300">
            {property.type}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <div className="space-y-2">
          <CardTitle className="text-lg navy-text">{property.title}</CardTitle>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.location}</span>
          </div>
          <div className="text-2xl font-bold gold-accent">₦{property.price.toLocaleString()}</div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Property Details */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{property.area} sqm</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center space-x-1">
                <Car className="h-4 w-4" />
                <span>{property.parking} Parking</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature.name}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={() => setSelectedProperty(property)}
            >
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Button>
            {property.status === "AVAILABLE" && (
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
  }

  // Property Details Modal with Image Gallery
  const PropertyDetailsModal = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    if (!selectedProperty) return null

    return (
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto illuminated-card">
          <DialogHeader>
            <DialogTitle className="navy-text">{selectedProperty.title}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
              onClick={() => setSelectedProperty(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* Main Image Gallery */}
            <div className="relative">
              <img
                src={selectedProperty.images[currentImageIndex]?.url}
                alt={selectedProperty.title}
                className="w-full h-96 object-cover rounded-lg"
              />

              {/* Gallery Navigation */}
              {selectedProperty.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) =>
                      (prev - 1 + selectedProperty.images.length) % selectedProperty.images.length
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) =>
                      (prev + 1) % selectedProperty.images.length
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {selectedProperty.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {selectedProperty.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-accent'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${selectedProperty.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium navy-text">Location</p>
                  <p className="text-muted-foreground">{selectedProperty.location}</p>
                </div>
                <div>
                  <p className="font-medium navy-text">Price</p>
                  <p className="text-2xl font-bold gold-accent">₦{selectedProperty.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium navy-text">Property Details</p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {selectedProperty.bedrooms > 0 && (
                      <div className="flex items-center space-x-2">
                        <Bed className="h-4 w-4 text-accent" />
                        <span className="text-sm">{selectedProperty.bedrooms} Bedrooms</span>
                      </div>
                    )}
                    {selectedProperty.bathrooms > 0 && (
                      <div className="flex items-center space-x-2">
                        <Bath className="h-4 w-4 text-accent" />
                        <span className="text-sm">{selectedProperty.bathrooms} Bathrooms</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Square className="h-4 w-4 text-accent" />
                      <span className="text-sm">{selectedProperty.area} sqm</span>
                    </div>
                    {selectedProperty.parking > 0 && (
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-accent" />
                        <span className="text-sm">{selectedProperty.parking} Parking</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-medium navy-text mb-2">Description</p>
                  <p className="text-muted-foreground leading-relaxed">{selectedProperty.description}</p>
                </div>
                <div>
                  <p className="font-medium navy-text mb-2">Features</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            {selectedProperty.status === "available" && (
              <div className="flex space-x-3 pt-4 border-t border-border">
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Agent
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Inquiry
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Location
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              Our Properties
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Find Your Perfect Property
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of premium properties for sale and explore
              our successful sales portfolio across Lagos and Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Search and Filters */}
      <section className="py-8 illuminated-bg glow-border border-b">
        <div className="max-width-container section-padding">
          <div className="space-y-6">
            {/* Basic Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search properties by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="duplex">Duplex</SelectItem>
                  <SelectItem value="mansion">Mansion</SelectItem>
                  <SelectItem value="terrace">Terrace</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                    <SelectItem value="victoria island">Victoria Island</SelectItem>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="ajah">Ajah</SelectItem>
                    <SelectItem value="banana island">Banana Island</SelectItem>
                    <SelectItem value="chevron">Chevron Drive</SelectItem>
                    <SelectItem value="ibeju">Ibeju-Lekki</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex-shrink-0"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="illuminated-card p-6 rounded-lg space-y-6">
                <h3 className="text-lg font-semibold navy-text flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Advanced Filters
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price Range Slider */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium navy-text">
                      Price Range: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500000000}
                      min={0}
                      step={5000000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₦0</span>
                      <span>₦500M</span>
                    </div>
                  </div>

                  {/* Bedrooms Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium navy-text">
                      Bedrooms: {minBedrooms} - {maxBedrooms}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Min</label>
                        <Select value={minBedrooms.toString()} onValueChange={(value) => setMinBedrooms(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Max</label>
                        <Select value={maxBedrooms.toString()} onValueChange={(value) => setMaxBedrooms(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium navy-text">Quick Price Filters</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Under ₦50M", range: [0, 50000000] },
                      { label: "₦50M - ₦100M", range: [50000000, 100000000] },
                      { label: "₦100M - ₦200M", range: [100000000, 200000000] },
                      { label: "Above ₦200M", range: [200000000, 500000000] }
                    ].map((filter, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setPriceRange(filter.range)}
                        className="text-xs"
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                      setSelectedLocation("all")
                      setPriceRange([0, 500000000])
                      setMinBedrooms(0)
                      setMaxBedrooms(10)
                    }}
                  >
                    Reset All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Search Results Summary & View Toggle */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                Showing {filteredAvailableProperties.length} of {availableProperties.length} available properties
              </div>
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4 mr-1" />
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Map
                  </Button>
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedType !== "all" || selectedLocation !== "all" ||
                  priceRange[0] !== 0 || priceRange[1] !== 500000000 ||
                  minBedrooms !== 0 || maxBedrooms !== 10) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                      setSelectedLocation("all")
                      setPriceRange([0, 500000000])
                      setMinBedrooms(0)
                      setMaxBedrooms(10)
                    }}
                    className="text-accent hover:text-accent/80"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Tabs */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <Tabs defaultValue="available" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="available">Available Properties</TabsTrigger>
                <TabsTrigger value="sold">Sold Properties</TabsTrigger>
              </TabsList>
            </div>

            {/* Available Properties */}
            <TabsContent value="available">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold navy-text">
                    Properties for Sale
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore our current portfolio of available properties, from luxury homes
                    to commercial spaces across prime Lagos locations.
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
                    <p className="text-muted-foreground">Loading properties...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <div className="illuminated-card p-8 rounded-lg">
                      <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold navy-text mb-2">Error Loading Properties</h3>
                      <p className="text-muted-foreground mb-4">{error}</p>
                      <Button onClick={loadProperties} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {viewMode === 'map' ? (
                      <div className="space-y-6">
                        <PropertyMap
                          properties={filteredAvailableProperties}
                          height="600px"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Featured Properties */}
                        {filteredAvailableProperties.filter((p: Property) => p.featured).length > 0 && (
                          <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                              <Star className="h-5 w-5 text-accent" />
                              <h3 className="text-xl font-semibold navy-text">Featured Properties</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {filteredAvailableProperties.filter((p: Property) => p.featured).map((property: Property) => (
                                <PropertyCard key={property.id} property={property} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* All Available Properties */}
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold navy-text">All Available Properties</h3>
                            <Badge variant="outline">
                              {filteredAvailableProperties.length} Properties
                            </Badge>
                          </div>

                          {filteredAvailableProperties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {filteredAvailableProperties.map((property: Property) => (
                                <PropertyCard key={property.id} property={property} />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <div className="illuminated-card p-8 rounded-lg">
                                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold navy-text mb-2">No Properties Found</h3>
                                <p className="text-muted-foreground mb-4">
                                  Try adjusting your search criteria or clearing some filters.
                                </p>
                                <Button
                                  onClick={() => {
                                    setSearchTerm("")
                                    setSelectedType("all")
                                    setSelectedLocation("all")
                                    setPriceRange([0, 500000000])
                                    setMinBedrooms(0)
                                    setMaxBedrooms(10)
                                  }}
                                  variant="outline"
                                >
                                  Clear All Filters
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            {/* Sold Properties */}
            <TabsContent value="sold">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold navy-text">
                    Recently Sold Properties
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    View our successful sales portfolio and see the properties we've helped
                    clients purchase and sell in recent months.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h3 className="text-xl font-semibold navy-text">Successfully Sold</h3>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      {soldProperties.length} Properties Sold
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSoldProperties.map((property: Property) => (
                      <PropertyCard key={property.id} property={property} showSoldBadge={true} />
                    ))}
                  </div>
                </div>

                {/* Success Stats */}
                <div className="illuminated-card rounded-2xl p-8">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold navy-text">Our Sales Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold gold-accent">50+</div>
                        <div className="text-muted-foreground">Properties Sold</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold gold-accent">₦2.5B+</div>
                        <div className="text-muted-foreground">Total Sales Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold gold-accent">100%</div>
                        <div className="text-muted-foreground">Client Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold navy-text">
              Looking to Buy or Sell?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're buying your dream home or selling your property, our experienced
              team is here to guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  List Your Property
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Property Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      <PropertyDetailsModal />
    </div>
  )
}
