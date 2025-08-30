"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Send, MapPin, Phone, Mail, Clock, Building2, Home, Briefcase
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      subject: "",
      message: ""
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Get in Touch with Our Team
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Ready to start your real estate journey or need business consultancy?
              WeWeWe'reapos;reapos;re here to help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold navy-text mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours.
                  For urgent matters, please call us directly.
                </p>
              </div>

              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General Inquiry</TabsTrigger>
                  <TabsTrigger value="property">Property Inquiry</TabsTrigger>
                  <TabsTrigger value="consultation">Consultation</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle className="navy-text">General Contact Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Full Name *</label>
                            <Input
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Email Address *</label>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Phone Number</label>
                            <Input
                              placeholder="+234 XXX XXX XXXX"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Service Interest</label>
                            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="real-estate">Real Estate</SelectItem>
                                <SelectItem value="facility-management">Facility Management</SelectItem>
                                <SelectItem value="consultancy">Business Consultancy</SelectItem>
                                <SelectItem value="import-export">Import/Export</SelectItem>
                                <SelectItem value="construction">Construction</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Subject</label>
                          <Input
                            placeholder="Brief subject of your inquiry"
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Message *</label>
                          <Textarea
                            placeholder="Tell us about your requirements or questions..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="property">
                  <Card>
                    <CardHeader>
                      <CardTitle className="navy-text">Property Inquiry Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Full Name *</label>
                            <Input
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Email Address *</label>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Phone Number *</label>
                            <Input
                              placeholder="+234 XXX XXX XXXX"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Property Type</label>
                            <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="duplex">Duplex</SelectItem>
                                <SelectItem value="mansion">Mansion</SelectItem>
                                <SelectItem value="terrace">Terrace House</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="land">Land</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Budget Range</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-25m">₦0 - ₦25M</SelectItem>
                              <SelectItem value="25m-50m">₦25M - ₦50M</SelectItem>
                              <SelectItem value="50m-100m">₦50M - ₦100M</SelectItem>
                              <SelectItem value="100m-200m">₦100M - ₦200M</SelectItem>
                              <SelectItem value="200m+">₦200M+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Property Requirements *</label>
                          <Textarea
                            placeholder="Describe your property requirements (location, bedrooms, features, etc.)"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Send className="mr-2 h-4 w-4" />
                          Submit Property Inquiry
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="consultation">
                  <Card>
                    <CardHeader>
                      <CardTitle className="navy-text">Consultation Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Full Name *</label>
                            <Input
                              placeholder="Your full name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Company/Organization</label>
                            <Input
                              placeholder="Your company name (optional)"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium navy-text">Email Address *</label>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium navy-text">Phone Number *</label>
                            <Input
                              placeholder="+234 XXX XXX XXXX"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Consultation Type</label>
                          <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select consultation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="business-strategy">Business Strategy</SelectItem>
                              <SelectItem value="project-financing">Project Financing</SelectItem>
                              <SelectItem value="feasibility-study">Feasibility Study</SelectItem>
                              <SelectItem value="company-setup">Company Registration</SelectItem>
                              <SelectItem value="real-estate-investment">Real Estate Investment</SelectItem>
                              <SelectItem value="facility-management">Facility Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Preferred Meeting</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select meeting preference" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="in-person">In-Person Meeting</SelectItem>
                              <SelectItem value="virtual">Virtual Meeting</SelectItem>
                              <SelectItem value="phone">Phone Consultation</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium navy-text">Project Details *</label>
                          <Textarea
                            placeholder="Please describe your project or business challenge in detail..."
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Send className="mr-2 h-4 w-4" />
                          Request Consultation
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold navy-text mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reach out to us through any of the channels below. WeWeWe'reapos;reapos;re available
                  during business hours and respond to all inquiries promptly.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6">
                <Card className="illuminated-card border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold navy-text mb-2">Office Address</h3>
                        <p className="text-muted-foreground">
                          No 8, 4th Avenue Infinity Estate<br />
                          Addo Road, Ajah, Lagos, Nigeria
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="illuminated-card border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold navy-text mb-2">Phone Numbers</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>Main Line: +234 XXX XXX XXXX</p>
                          <p>WhatsApp: +234 XXX XXX XXXX</p>
                          <p>Emergency: +234 XXX XXX XXXX</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Call Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="illuminated-card border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold navy-text mb-2">Email Addresses</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>General: info@sogglobalconsult.com</p>
                          <p>Sales: sales@sogglobalconsult.com</p>
                          <p>Support: support@sogglobalconsult.com</p>
                        </div>
                        <Button variant="outline" size="sm" className="mt-3">
                          Send Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="illuminated-card border-l-4 border-l-accent">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold navy-text mb-2">Business Hours</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                          <p>Saturday: 9:00 AM - 4:00 PM</p>
                          <p>Sunday: Closed</p>
                          <p className="text-accent font-medium">Emergency services available 24/7</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold navy-text">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Button className="justify-start bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    Schedule a Call
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us Directly
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Building2 className="mr-2 h-4 w-4" />
                    Visit Our Office
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold navy-text mb-4">Our Departments</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect directly with the right department for specialized assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Real Estate Department",
                description: "Property sales, rentals, development, and management services.",
                contact: "realestate@sogglobalconsult.com",
                phone: "+234 XXX XXX XXXX"
              },
              {
                icon: Briefcase,
                title: "Business Consultancy",
                description: "Strategic planning, project financing, and business setup assistance.",
                contact: "consultancy@sogglobalconsult.com",
                phone: "+234 XXX XXX XXXX"
              },
              {
                icon: Building2,
                title: "Facility Management",
                description: "Building maintenance, security, and comprehensive facility services.",
                contact: "facilities@sogglobalconsult.com",
                phone: "+234 XXX XXX XXXX"
              }
            ].map((dept, index) => (
              <Card key={index} className="illuminated-card text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <dept.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="navy-text">{dept.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{dept.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="h-3 w-3 text-accent" />
                      <span>{dept.contact}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Phone className="h-3 w-3 text-accent" />
                      <span>{dept.phone}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Contact Department
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold navy-text mb-4">Find Our Office</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Located in the heart of Ajah, Lagos, our office is easily accessible
              and provides a professional environment for all your business needs.
            </p>
          </div>

          <div className="illuminated-card rounded-2xl p-8 text-center">
            <div className="space-y-4">
              <MapPin className="h-12 w-12 text-accent mx-auto" />
              <h3 className="text-xl font-semibold navy-text">Interactive Map Coming Soon</h3>
              <p className="text-muted-foreground">
                WeWeWe'reapos;reapos;re working on integrating an interactive map to help you find us easily.
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium navy-text">Current Address:</p>
                <p>No 8, 4th Avenue Infinity Estate, Addo Road, Ajah, Lagos, Nigeria</p>
              </div>
              <Button variant="outline">
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
