import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Target, Eye, Award, Users, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              About SOG Global Consult
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Building Excellence Since Our Inception
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              SOG Global Consult Limited is a registered company committed to delivering
              world-class solutions in real estate, consultancy, and facility management.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">Our Story</Badge>
                <h2 className="text-3xl md:text-4xl font-bold navy-text mb-6">
                  A Vision for Excellence
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    SOG Global Consult Limited was established with a clear vision: to become
                    NigeriaNigeriaNigeria'sapos;sapos;s most trusted partner in real estate development, business consultancy,
                    and facility management services.
                  </p>
                  <p>
                    Our journey began with the recognition that businesses and individuals needed
                    a reliable, professional, and comprehensive service provider who could handle
                    diverse challenges in todaytodaytoday'sapos;sapos;s dynamic market environment.
                  </p>
                  <p>
                    Based in Lagos, NigeriaNigeriaNigeria'sapos;sapos;s commercial hub, we strategically positioned ourselves
                    to serve both local and international clients seeking quality real estate
                    solutions and business growth opportunities.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold navy-text">Why WeWeWe'reapos;reapos;re Different</h3>
                <div className="space-y-3">
                  {[
                    "Comprehensive multi-sector expertise",
                    "RC registered and CAC certified",
                    "Client-centric approach to every project",
                    "Strong local market knowledge",
                    "Commitment to innovation and excellence"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="illuminated-card border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-accent" />
                    <CardTitle className="navy-text">Company Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium navy-text">Full Legal Name</p>
                    <p className="text-muted-foreground">SOG Global Consult Limited</p>
                  </div>
                  <div>
                    <p className="font-medium navy-text">Registration Status</p>
                    <p className="text-muted-foreground">RC Registered Private Limited Company</p>
                  </div>
                  <div>
                    <p className="font-medium navy-text">Headquarters</p>
                    <p className="text-muted-foreground">
                      No 8, 4th Avenue Infinity Estate<br />
                      Addo Road, Ajah, Lagos, Nigeria
                    </p>
                  </div>
                  <div>
                    <p className="font-medium navy-text">Business Type</p>
                    <p className="text-muted-foreground">Multi-Sector Service Provider</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Foundation</Badge>
            <h2 className="text-3xl md:text-4xl font-bold navy-text">
              Mission, Vision & Values
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="text-center illuminated-card">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl navy-text">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To provide world-class consultancy, real estate, and facility management
                  solutions that exceed client expectations and contribute to sustainable
                  development across Nigeria and beyond.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="text-center illuminated-card">
              <CardHeader>
                <div className="mx-auto bg-accent/20 p-4 rounded-full w-fit mb-4">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl navy-text">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be a global leader in real estate, business consultancy, and project
                  management services, recognized for innovation, integrity, and exceptional
                  client satisfaction.
                </p>
              </CardContent>
            </Card>

            {/* Values */}
            <Card className="text-center illuminated-card">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl navy-text">Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-muted-foreground">
                  <div className="font-medium gold-accent">Integrity</div>
                  <div className="font-medium gold-accent">Innovation</div>
                  <div className="font-medium gold-accent">Excellence</div>
                  <div className="font-medium gold-accent">Growth</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold navy-text">
              Comprehensive Business Solutions
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              We operate across multiple sectors to provide integrated solutions for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Real Estate & Property Services",
                description: "Complete real estate solutions including buying, selling, renting, leasing, property development, and estate agency services.",
                services: [
                  "Property Sales & Acquisitions",
                  "Rental & Leasing Services",
                  "Estate Development Projects",
                  "Property Management",
                  "Real Estate Investment Advisory"
                ]
              },
              {
                title: "Facility Management & Maintenance",
                description: "Comprehensive maintenance and management services for commercial, residential, and specialized facilities.",
                services: [
                  "Commercial Building Management",
                  "Residential Property Maintenance",
                  "Cinema & Entertainment Facilities",
                  "Sports Complex Management",
                  "Factory & Industrial Maintenance"
                ]
              },
              {
                title: "Business & Management Consultancy",
                description: "Strategic business advisory services to help organizations grow and achieve their objectives.",
                services: [
                  "Business Strategy Development",
                  "Project Financing Solutions",
                  "Feasibility Studies",
                  "Company Registration & Setup",
                  "Management Advisory Services"
                ]
              },
              {
                title: "Import, Export & Trading",
                description: "International trade services covering diverse product categories and supply chain solutions.",
                services: [
                  "Machinery & Equipment Import",
                  "Fashion & Textile Trading",
                  "Raw Materials Supply",
                  "General Merchandise",
                  "Supply Chain Management"
                ]
              },
              {
                title: "Construction & Infrastructure",
                description: "Building and civil engineering services for diverse construction and development projects.",
                services: [
                  "Civil Engineering Projects",
                  "Road Construction & Maintenance",
                  "Building Construction",
                  "Renovation & Refurbishment",
                  "Infrastructure Development"
                ]
              },
              {
                title: "Legal & Compliance",
                description: "Ensuring all operations meet regulatory requirements and maintaining the highest standards of corporate governance.",
                services: [
                  "CAC Registration Compliance",
                  "Corporate Governance",
                  "Regulatory Compliance",
                  "Documentation Services",
                  "Legal Advisory Support"
                ]
              }
            ].map((area, index) => (
              <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="text-xl navy-text">{area.title}</CardTitle>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {area.services.map((service, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-accent flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold navy-text">
              Professional Excellence
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our experienced team brings together diverse expertise to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Management Team",
                description: "Experienced leadership guiding strategic direction and operational excellence.",
                icon: Users
              },
              {
                title: "Technical Experts",
                description: "Skilled professionals with deep industry knowledge and practical experience.",
                icon: Award
              },
              {
                title: "Support Staff",
                description: "Dedicated team members ensuring smooth operations and client satisfaction.",
                icon: CheckCircle
              }
            ].map((team, index) => (
              <Card key={index} className="text-center professional-shadow">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <team.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl navy-text">{team.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {team.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
