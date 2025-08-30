"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Home, Plus, Edit, Trash2, Upload, FileText, Eye, EyeOff,
  Save, X, Building2, MapPin, Bed, Bath, Square, Car,
  ImageIcon, AlertCircle, CheckCircle, Clock,
  Mail, Phone, User, DollarSign, BarChart3, TrendingUp,
  Loader2, Star, Camera, Globe
} from "lucide-react"
import { Logo } from "@/components/logo"

// Types
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
  createdAt: string
  updatedAt: string
  images: PropertyImage[]
  features: PropertyFeature[]
  _count: {
    views: number
    inquiries: number
  }
}

type PropertyImage = {
  id: string
  url: string
  publicId: string
  caption?: string
  isPrimary: boolean
  order: number
}

type PropertyFeature = {
  id: string
  name: string
  icon?: string
}

type Inquiry = {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  type: string
  status: string
  createdAt: string
  property?: {
    title: string
    slug: string
  }
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Data states
  const [properties, setProperties] = useState<Property[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [legalDocuments, setLegalDocuments] = useState<any[]>([])
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [isAddingProperty, setIsAddingProperty] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingDocument, setUploadingDocument] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    soldProperties: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalViews: 0
  })

  // Admin password
  const ADMIN_PASSWORD = "sogadmin2024"

  // Check for existing session on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('sog_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      loadDashboardData()
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('sog_admin_auth', 'true')
      await loadDashboardData()
    } else {
      setError("Invalid password")
    }

    setLoading(false)
    setPassword("")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('sog_admin_auth')
  }

  const loadDashboardData = async () => {
    try {
      // Load properties
      const propertiesResponse = await fetch('/api/properties')
      if (propertiesResponse.ok) {
        const propertiesData = await propertiesResponse.json()
        setProperties(propertiesData.data.properties || [])

        // Calculate stats
        const props = propertiesData.data.properties || []
        const totalViews = props.reduce((sum: number, prop: Property) => sum + prop._count.views, 0)
        const totalInquiries = props.reduce((sum: number, prop: Property) => sum + prop._count.inquiries, 0)

        setStats({
          totalProperties: props.length,
          availableProperties: props.filter((p: Property) => p.status === 'AVAILABLE').length,
          soldProperties: props.filter((p: Property) => p.status === 'SOLD').length,
          totalInquiries: totalInquiries,
          newInquiries: 0,
          totalViews: totalViews
        })
      }

      // Load inquiries
      const inquiriesResponse = await fetch('/api/inquiries')
      if (inquiriesResponse.ok) {
        const inquiriesData = await inquiriesResponse.json()
        setInquiries(inquiriesData.data.inquiries || [])
      }

      // Load legal documents
      const legalResponse = await fetch('/api/legal-documents')
      if (legalResponse.ok) {
        const legalData = await legalResponse.json()
        setLegalDocuments(legalData.data.documents || [])
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setError('Failed to load dashboard data')
    }
  }

  const handleImageUpload = async (files: FileList) => {
    setUploadingImages(true)
    setError("")
    setSuccess("")

    const fileCount = files.length
    const fileNames = Array.from(files).map(f => f.name).join(', ')

    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('files', file)
      })
      formData.append('folder', 'properties')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Successfully uploaded ${fileCount} image${fileCount > 1 ? 's' : ''} to Cloudinary`)
        return data.data.images
      } else {
        throw new Error(data.error || 'Upload failed')
      }

    } catch (error) {
      console.error('Error uploading images:', error)
      setError(`Failed to upload ${fileCount} image${fileCount > 1 ? 's' : ''}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return []
    } finally {
      setUploadingImages(false)
    }
  }

  const handleSaveProperty = async (propertyData: any) => {
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const url = isAddingProperty ? '/api/properties' : `/api/properties/${propertyData.id}`
      const method = isAddingProperty ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...propertyData,
          createdById: 'cmey61fsh0000cufcw1nxuz6b' // Admin user ID from seed
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(data.message)
        await loadDashboardData() // Reload data
        setEditingProperty(null)
        setIsAddingProperty(false)
      } else {
        setError(data.error || 'Failed to save property')
      }

    } catch (error) {
      console.error('Error saving property:', error)
      setError('Failed to save property')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProperty = async (id: string) => {
    // Find the property to get its title for better confirmation
    const property = properties.find(p => p.id === id)
    const propertyTitle = property?.title || 'this property'

    if (!confirm(`Delete "${propertyTitle}"?\n\nThis action cannot be undone. The property and all its images will be permanently removed.`)) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Property deleted successfully')
        await loadDashboardData()
      } else {
        setError(data.error || 'Failed to delete property')
      }

    } catch (error) {
      console.error('Error deleting property:', error)
      setError('Failed to delete property')
    } finally {
      setLoading(false)
    }
  }

  const handleAddProperty = () => {
    setEditingProperty({
      id: '',
      title: '',
      description: '',
      price: 0,
      location: '',
      address: '',
      type: 'APARTMENT',
      status: 'AVAILABLE',
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
      parking: 0,
      featured: false,
      furnished: false,
      petFriendly: false,
      garden: false,
      balcony: false,
      slug: '',
      createdAt: '',
      updatedAt: '',
      images: [],
      features: [],
      _count: { views: 0, inquiries: 0 }
    })
    setIsAddingProperty(true)
  }

  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `₦${(price / 1000000000).toFixed(1)}B`
    } else if (price >= 1000000) {
      return `₦${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `₦${(price / 1000).toFixed(0)}K`
    }
    return `₦${price.toLocaleString()}`
  }

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(loadDashboardData, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen dark-illuminated flex items-center justify-center">
        <Card className="w-full max-w-md illuminated-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo size="md" variant="icon-only" />
            </div>
            <CardTitle className="text-2xl navy-text">Admin Dashboard</CardTitle>
            <p className="text-muted-foreground">SOG Global Consult Property Management</p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium navy-text">Admin Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

              </div>
              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login to Dashboard'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main Dashboard
  return (
    <div className="min-h-screen dark-illuminated">
      {/* Header */}
      <div className="dark-illuminated glow-border border-b">
        <div className="max-width-container section-padding py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo size="md" variant="icon-only" />
              <div>
                <h1 className="text-2xl font-bold navy-text">Real Estate Admin</h1>
                <p className="text-sm text-muted-foreground">Property & Inquiry Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Live</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="max-width-container section-padding">
        {error && (
          <Alert className="mt-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mt-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Main Content */}
      <div className="max-width-container section-padding py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="legal">Legal Docs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold navy-text">Dashboard Overview</h2>
                <Button onClick={loadDashboardData} disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <BarChart3 className="mr-2 h-4 w-4" />
                  )}
                  Refresh Data
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="illuminated-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold navy-text">{stats.totalProperties}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.availableProperties} available, {stats.soldProperties} sold
                    </p>
                  </CardContent>
                </Card>

                <Card className="illuminated-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold navy-text">{stats.totalInquiries}</div>
                    <p className="text-xs text-muted-foreground">
                      {stats.newInquiries} new this week
                    </p>
                  </CardContent>
                </Card>

                <Card className="illuminated-card">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold navy-text">{stats.totalViews}</div>
                    <p className="text-xs text-muted-foreground">
                      Property page views
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="illuminated-card">
                  <CardHeader>
                    <CardTitle className="navy-text">Recent Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {properties.slice(0, 5).map((property) => (
                        <div key={property.id} className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                            {property.images.length > 0 ? (
                              <img
                                src={property.images.find(img => img.isPrimary)?.url || property.images[0].url}
                                alt={property.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Home className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium navy-text line-clamp-1">{property.title}</p>
                            <p className="text-xs text-muted-foreground">{property.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium gold-accent">{formatPrice(property.price)}</p>
                            <p className="text-xs text-muted-foreground">{property.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="illuminated-card">
                  <CardHeader>
                    <CardTitle className="navy-text">Recent Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {inquiries.slice(0, 5).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium navy-text">{inquiry.name}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{inquiry.message}</p>
                            {inquiry.property && (
                              <p className="text-xs text-accent mt-1">Re: {inquiry.property.title}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge variant={inquiry.status === 'NEW' ? 'default' : 'secondary'} className="text-xs">
                              {inquiry.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Properties Management */}
          <TabsContent value="properties">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold navy-text">Properties Management</h2>
                <Button onClick={handleAddProperty} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
              </div>

              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onEdit={() => setEditingProperty(property)}
                    onDelete={() => handleDeleteProperty(property.id)}
                  />
                ))}
              </div>

              {properties.length === 0 && (
                <div className="text-center py-12">
                  <div className="illuminated-card p-8 rounded-lg">
                    <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold navy-text mb-2">No Properties Found</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding your first property to the system.
                    </p>
                    <Button onClick={handleAddProperty} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Property
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Inquiries Management */}
          <TabsContent value="inquiries">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold navy-text">Inquiries Management</h2>

              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <Card key={inquiry.id} className="illuminated-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div>
                              <h3 className="font-semibold navy-text">{inquiry.name}</h3>
                              <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                              {inquiry.phone && (
                                <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge variant={inquiry.status === 'NEW' ? 'default' : 'secondary'}>
                                {inquiry.status}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {inquiry.property && (
                            <div className="bg-muted/50 p-3 rounded-lg mb-3">
                              <p className="text-sm font-medium">Property Inquiry:</p>
                              <p className="text-sm text-accent">{inquiry.property.title}</p>
                            </div>
                          )}

                          <div className="bg-muted/30 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Message:</p>
                            <p className="text-sm text-muted-foreground">{inquiry.message}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Mark Resolved
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {inquiries.length === 0 && (
                <div className="text-center py-12">
                  <div className="illuminated-card p-8 rounded-lg">
                    <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold navy-text mb-2">No Inquiries Yet</h3>
                    <p className="text-muted-foreground">
                      Customer inquiries will appear here when they contact you.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Legal Documents Management */}
          <TabsContent value="legal">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold navy-text">Legal Documents Management</h2>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Document
                </Button>
              </div>

              <div className="space-y-4">
                {legalDocuments.map((doc) => (
                  <Card key={doc.id} className="illuminated-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div>
                              <h3 className="font-semibold navy-text">{doc.title}</h3>
                              <p className="text-sm text-muted-foreground">{doc.category}</p>
                              <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={doc.isActive ? 'default' : 'secondary'}>
                                {doc.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(doc.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {doc.description && (
                            <div className="bg-muted/30 p-3 rounded-lg mb-3">
                              <p className="text-sm text-muted-foreground">{doc.description}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => window.open(doc.filePath, '_blank')}>
                          <FileText className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {legalDocuments.length === 0 && (
                <div className="text-center py-12">
                  <div className="illuminated-card p-8 rounded-lg">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold navy-text mb-2">No Legal Documents</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding your first legal document to the system.
                    </p>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Document
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold navy-text">Analytics & Reports</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="illuminated-card">
                  <CardHeader>
                    <CardTitle className="text-lg navy-text">Property Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['Available', 'Sold', 'Pending'].map(status => {
                        const count = properties.filter(p =>
                          p.status.toLowerCase() === status.toLowerCase() ||
                          (status === 'Available' && p.status === 'AVAILABLE')
                        ).length
                        const percentage = properties.length > 0 ? (count / properties.length) * 100 : 0

                        return (
                          <div key={status} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{status}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div
                                  className="bg-accent h-2 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-8 text-right">
                                {count}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="illuminated-card">
                  <CardHeader>
                    <CardTitle className="text-lg navy-text">Database Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Railway Database</p>
                          <p className="text-xs text-muted-foreground">Connected & Active</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Cloudinary</p>
                          <p className="text-xs text-muted-foreground">Image uploads ready</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">API Endpoints</p>
                          <p className="text-xs text-muted-foreground">All systems operational</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Property Edit Dialog */}
      {editingProperty && (
        <PropertyEditDialog
          property={editingProperty}
          isAdding={isAddingProperty}
          onSave={handleSaveProperty}
          onCancel={() => {
            setEditingProperty(null)
            setIsAddingProperty(false)
          }}
          onImageUpload={handleImageUpload}
          uploading={uploadingImages}
        />
      )}
    </div>
  )
}

// Property Card Component
function PropertyCard({
  property,
  onEdit,
  onDelete
}: {
  property: Property
  onEdit: () => void
  onDelete: () => void
}) {
  const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]

  return (
    <Card className="illuminated-card overflow-hidden">
      <div className="relative">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-muted flex items-center justify-center">
            <Camera className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        <div className="absolute top-2 left-2 space-y-1">
          <Badge variant={property.status === 'AVAILABLE' ? 'default' : 'secondary'}>
            {property.status}
          </Badge>
          {property.featured && (
            <Badge className="bg-accent text-accent-foreground">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <Badge variant="outline" className="bg-white/90">
            {property.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold navy-text line-clamp-1">{property.title}</h3>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
            <p className="text-lg font-bold gold-accent">₦{property.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-3 w-3" />
                <span>{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="h-3 w-3" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Square className="h-3 w-3" />
              <span>{property.area} sqm</span>
            </div>
            {property.parking > 0 && (
              <div className="flex items-center space-x-1">
                <Car className="h-3 w-3" />
                <span>{property.parking} Parking</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{property._count.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>{property._count.inquiries}</span>
              </div>
            </div>
            <div>{new Date(property.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={onEdit} className="flex-1">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Property Edit Dialog Component
function PropertyEditDialog({
  property,
  isAdding,
  onSave,
  onCancel,
  onImageUpload,
  uploading
}: {
  property: Property
  isAdding: boolean
  onSave: (property: any) => void
  onCancel: () => void
  onImageUpload: (files: FileList) => Promise<any[]>
  uploading: boolean
}) {
  const [formData, setFormData] = useState(property)
  const [featuresInput, setFeaturesInput] = useState(
    property.features.map(f => f.name).join(', ')
  )
  const [images, setImages] = useState(property.images)
  const [addressCoords, setAddressCoords] = useState<{lat: number, lng: number} | null>(
    property.latitude && property.longitude
      ? { lat: property.latitude, lng: property.longitude }
      : null
  )

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Limit to 10 images max
    const fileArray = Array.from(files).slice(0, 10)
    const currentImageCount = images.length
    const remainingSlots = 10 - currentImageCount

    if (remainingSlots <= 0) {
      alert('You can upload a maximum of 10 images per property.')
      return
    }

    const filesToUpload = fileArray.slice(0, remainingSlots)
    if (filesToUpload.length < fileArray.length) {
      alert(`Only uploading ${filesToUpload.length} images to stay within the 10 image limit.`)
    }

    // Create FileList from selected files
    const dataTransfer = new DataTransfer()
    filesToUpload.forEach(file => dataTransfer.items.add(file))

    const uploadedImages = await onImageUpload(dataTransfer.files)
    if (uploadedImages.length > 0) {
      setImages([...images, ...uploadedImages.map((img, index) => ({
        id: `temp-${Date.now()}-${index}`,
        url: img.url,
        publicId: img.publicId,
        caption: '',
        isPrimary: images.length === 0 && index === 0,
        order: images.length + index
      }))])

      // Clear the input so user can select the same files again if needed
      e.target.value = ''
    }
  }

  const handleImageDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const handleSetPrimaryImage = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index
    }))
    setImages(newImages)
  }

  const handleGeocodeAddress = async () => {
    if (!formData.address) return

    try {
      const response = await fetch('/api/geocode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: formData.address })
      })

      const data = await response.json()
      if (data.success) {
        setAddressCoords({ lat: data.data.latitude, lng: data.data.longitude })
        setFormData({
          ...formData,
          latitude: data.data.latitude,
          longitude: data.data.longitude
        })
      }
    } catch (error) {
      console.error('Error geocoding address:', error)
    }
  }

  const handleSave = () => {
    const features = featuresInput
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0)

    onSave({
      ...formData,
      features,
      images: images.map((img, index) => ({
        url: img.url,
        publicId: img.publicId,
        caption: img.caption || null,
        isPrimary: img.isPrimary,
        order: index
      }))
    })
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto illuminated-card">
        <DialogHeader>
          <DialogTitle className="navy-text">
            {isAdding ? 'Add New Property' : 'Edit Property'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold navy-text">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium navy-text">Property Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Property title"
                />
              </div>

              <div>
                <label className="text-sm font-medium navy-text">Price (₦) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  placeholder="Price in Naira"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium navy-text">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Property description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium navy-text">Property Type *</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="DUPLEX">Duplex</SelectItem>
                    <SelectItem value="MANSION">Mansion</SelectItem>
                    <SelectItem value="TERRACE">Terrace</SelectItem>
                    <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                    <SelectItem value="LAND">Land</SelectItem>
                    <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium navy-text">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="SOLD">Sold</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="RENTED">Rented</SelectItem>
                    <SelectItem value="OFF_MARKET">Off Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold navy-text">Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium navy-text">Location/Area *</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Lekki Phase 1, Lagos"
                />
              </div>

              <div>
                <label className="text-sm font-medium navy-text">Full Address</label>
                <div className="flex space-x-2">
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Complete property address"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGeocodeAddress}
                    disabled={!formData.address}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {addressCoords && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium navy-text">Latitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.latitude || ''}
                    onChange={(e) => setFormData({...formData, latitude: parseFloat(e.target.value) || undefined})}
                    placeholder="Latitude"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium navy-text">Longitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={formData.longitude || ''}
                    onChange={(e) => setFormData({...formData, longitude: parseFloat(e.target.value) || undefined})}
                    placeholder="Longitude"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold navy-text">Property Details</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium navy-text">Bedrooms</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-sm font-medium navy-text">Bathrooms</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-sm font-medium navy-text">Area (sqm)</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: parseInt(e.target.value) || 0})}
                />
              </div>
              <div>
                <label className="text-sm font-medium navy-text">Parking Spaces</label>
                <Input
                  type="number"
                  min="0"
                  value={formData.parking}
                  onChange={(e) => setFormData({...formData, parking: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium navy-text">Year Built</label>
                <Input
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.yearBuilt || ''}
                  onChange={(e) => setFormData({...formData, yearBuilt: parseInt(e.target.value) || undefined})}
                  placeholder="e.g., 2020"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium navy-text">Property Features</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    />
                    <label htmlFor="featured" className="text-sm">Featured Property</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="furnished"
                      checked={formData.furnished}
                      onChange={(e) => setFormData({...formData, furnished: e.target.checked})}
                    />
                    <label htmlFor="furnished" className="text-sm">Furnished</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="petFriendly"
                      checked={formData.petFriendly}
                      onChange={(e) => setFormData({...formData, petFriendly: e.target.checked})}
                    />
                    <label htmlFor="petFriendly" className="text-sm">Pet Friendly</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="garden"
                      checked={formData.garden}
                      onChange={(e) => setFormData({...formData, garden: e.target.checked})}
                    />
                    <label htmlFor="garden" className="text-sm">Garden</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="balcony"
                      checked={formData.balcony}
                      onChange={(e) => setFormData({...formData, balcony: e.target.checked})}
                    />
                    <label htmlFor="balcony" className="text-sm">Balcony</label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium navy-text">Additional Features (comma-separated)</label>
              <Input
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Swimming Pool, Generator, Security, Fitted Kitchen, etc."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold navy-text">Property Images</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium navy-text">Upload Multiple Images</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Select multiple images at once (Hold Ctrl/Cmd to select multiple files)
                </p>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`
                      inline-flex items-center px-6 py-3 border-2 border-dashed border-gray-300
                      rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white
                      hover:bg-gray-50 hover:border-accent cursor-pointer transition-all
                      ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading Images...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose Multiple Images
                      </>
                    )}
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: JPG, PNG, WebP. Max 10 images per property.
                  </p>
                </div>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium navy-text">
                      Property Images ({images.length}/10)
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {images.filter(img => img.isPrimary).length > 0 ? 'Primary image set' : 'Select primary image'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                    <div key={`${image.id}-${index}`} className="relative group">
                      <img
                        src={image.url}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-transparent hover:border-accent transition-colors"
                      />

                      {/* Primary Image Badge */}
                      {image.isPrimary && (
                        <div className="absolute top-1 left-1">
                          <Badge className="text-xs bg-accent text-accent-foreground">
                            <Star className="h-2 w-2 mr-1" />
                            Primary
                          </Badge>
                        </div>
                      )}

                      {/* Image Controls */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        {!image.isPrimary && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleSetPrimaryImage(index)}
                            className="text-xs"
                          >
                            Set Primary
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleImageDelete(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button onClick={handleSave} className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Save className="mr-2 h-4 w-4" />
              {isAdding ? 'Add Property' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
