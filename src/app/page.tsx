import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Briefcase, Home, Truck, Construction, ArrowRight, CheckCircle, Star, Phone } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-primary-foreground py-20 lg:py-32 overflow-hidden hero-glow">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(55, 71, 100, 0.85), rgba(55, 71, 100, 0.85)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-width-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  RC Registered Company
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-glow">
                  Your Trusted Partner in{" "}
                  <span className="gold-accent">Real Estate</span> &
                  <span className="gold-accent"> Business Growth</span>
                </h1>
                <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                  SOG Global Consult Limited provides world-class consultancy, real estate,
                  and facility management solutions across Nigeria and beyond.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-button">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-blue-200 text-blue-100 hover:bg-blue-100 hover:text-primary">
                  <Phone className="mr-2 h-4 w-4" />
                  Get Consultation
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm opacity-80">CAC Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-sm opacity-80">Trusted by 100+ Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-accent" />
                  <span className="text-sm opacity-80">Lagos Based</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="illuminated-card rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold mb-6">Our Core Services</h3>
                <div className="space-y-4">
                  {[
                    "Real Estate Development & Sales",
                    "Facility Management Services",
                    "Business & Management Consultancy",
                    "Import & Export Operations",
                    "Construction & Infrastructure"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="text-sm opacity-90">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">Our Expertise</Badge>
            <h2 className="text-3xl md:text-4xl font-bold navy-text">
              Comprehensive Business Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From real estate to consultancy, we provide integrated services that drive growth
              and deliver exceptional value for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "Real Estate Services",
                description: "Property development, sales, leasing, and estate agency services across Lagos and Nigeria.",
                features: ["Property Sales", "Leasing & Rentals", "Estate Development", "Property Management"]
              },
              {
                icon: Building2,
                title: "Facility Management",
                description: "Comprehensive maintenance and management for commercial, residential, and industrial properties.",
                features: ["Building Maintenance", "Security Services", "Cleaning & Upkeep", "Technical Support"]
              },
              {
                icon: Briefcase,
                title: "Business Consultancy",
                description: "Strategic advice, project financing, feasibility studies, and business setup assistance.",
                features: ["Business Strategy", "Project Financing", "Feasibility Studies", "Company Setup"]
              },
              {
                icon: Truck,
                title: "Import & Export",
                description: "Trading in goods, machinery, equipment, fashion items, and general supplies.",
                features: ["International Trade", "Machinery Import", "Fashion & Textiles", "General Supplies"]
              },
              {
                icon: Construction,
                title: "Construction Services",
                description: "Building contractors, civil engineering, road works, and renovation projects.",
                features: ["Civil Engineering", "Road Construction", "Building Projects", "Renovations"]
              },
              {
                icon: Users,
                title: "Project Management",
                description: "End-to-end project oversight ensuring timely delivery and quality results.",
                features: ["Project Planning", "Quality Control", "Timeline Management", "Risk Assessment"]
              }
            ].map((service, index) => (
              <Card key={index} className="illuminated-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl navy-text">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline">Why Choose SOG Global Consult</Badge>
                <h2 className="text-3xl md:text-4xl font-bold navy-text">
                  Excellence in Every Project
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our commitment to integrity, innovation, and excellence has made us a trusted
                  partner for businesses and individuals across Nigeria.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Registered & Certified",
                    description: "Fully RC registered with CAC certification for your peace of mind."
                  },
                  {
                    title: "Experienced Team",
                    description: "Skilled professionals with deep market knowledge and industry expertise."
                  },
                  {
                    title: "Comprehensive Solutions",
                    description: "One-stop destination for all your real estate and business needs."
                  },
                  {
                    title: "Client-Focused Approach",
                    description: "Tailored solutions that align with your specific goals and requirements."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="bg-accent/20 p-2 rounded-full flex-shrink-0 mt-1">
                      <CheckCircle className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold navy-text mb-1">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="illuminated-card p-8 rounded-2xl">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold navy-text">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Contact us today for a free consultation and discover how we can help
                  achieve your real estate and business objectives.
                </p>
                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground glow-button">
                    Schedule Free Consultation
                  </Button>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="w-full">
                      Contact Our Team
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 border-t border-muted">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium navy-text">Office Location:</p>
                    <p>No 8, 4th Avenue Infinity Estate</p>
                    <p>Addo Road, Ajah, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
