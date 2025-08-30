import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home, Building2, Briefcase, Truck, Construction, Users,
  CheckCircle, ArrowRight, MapPin, Phone, Mail
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Comprehensive Business Solutions
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              From real estate to consultancy, we provide integrated services across multiple
              sectors to drive growth and deliver exceptional value for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <Tabs defaultValue="real-estate" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12">
              <TabsTrigger value="real-estate" className="text-xs lg:text-sm">Real Estate</TabsTrigger>
              <TabsTrigger value="facility" className="text-xs lg:text-sm">Facility Mgmt</TabsTrigger>
              <TabsTrigger value="consultancy" className="text-xs lg:text-sm">Consultancy</TabsTrigger>
              <TabsTrigger value="import-export" className="text-xs lg:text-sm">Import/Export</TabsTrigger>
              <TabsTrigger value="construction" className="text-xs lg:text-sm">Construction</TabsTrigger>
            </TabsList>

            {/* Real Estate Services */}
            <TabsContent value="real-estate">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Home className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold navy-text">Real Estate Services</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Complete real estate solutions including property development, sales, leasing,
                    and comprehensive estate agency services across Lagos and Nigeria.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Property Sales & Acquisitions",
                      description: "Expert guidance in buying and selling residential and commercial properties.",
                      features: [
                        "Property valuation and appraisal",
                        "Market analysis and pricing strategy",
                        "Legal documentation support",
                        "Negotiation and closing assistance",
                        "Post-sale support services"
                      ]
                    },
                    {
                      title: "Rental & Leasing Services",
                      description: "Comprehensive rental management for property owners and tenants.",
                      features: [
                        "Tenant screening and verification",
                        "Rental collection and management",
                        "Property maintenance coordination",
                        "Lease agreement preparation",
                        "Dispute resolution support"
                      ]
                    },
                    {
                      title: "Estate Development",
                      description: "End-to-end development projects from planning to completion.",
                      features: [
                        "Land acquisition and due diligence",
                        "Development planning and design",
                        "Project management and oversight",
                        "Construction coordination",
                        "Marketing and sales strategy"
                      ]
                    },
                    {
                      title: "Property Management",
                      description: "Ongoing management services for property owners and investors.",
                      features: [
                        "Regular property inspections",
                        "Maintenance and repair coordination",
                        "Financial reporting and analysis",
                        "Insurance management",
                        "Tenant relations management"
                      ]
                    },
                    {
                      title: "Real Estate Investment",
                      description: "Strategic advisory for real estate investment opportunities.",
                      features: [
                        "Investment opportunity analysis",
                        "ROI projections and modeling",
                        "Portfolio diversification advice",
                        "Market trend analysis",
                        "Exit strategy planning"
                      ]
                    },
                    {
                      title: "Estate Agency",
                      description: "Licensed estate agency services with full regulatory compliance.",
                      features: [
                        "Licensed and certified operations",
                        "Professional marketing services",
                        "Network of qualified agents",
                        "Comprehensive market coverage",
                        "Ethical business practices"
                      ]
                    }
                  ].map((service, index) => (
                    <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle className="text-lg navy-text">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Facility Management */}
            <TabsContent value="facility">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Building2 className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold navy-text">Facility Management & Maintenance</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive maintenance and management services for commercial buildings,
                    residential properties, cinemas, sports complexes, factories, and specialized facilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Commercial Building Management",
                      description: "Complete facility management for office buildings, shopping centers, and commercial complexes.",
                      services: [
                        "HVAC system maintenance and optimization",
                        "Electrical systems management",
                        "Plumbing and water system maintenance",
                        "Security system integration and monitoring",
                        "Cleaning and janitorial services",
                        "Waste management and recycling",
                        "Energy management and cost optimization"
                      ]
                    },
                    {
                      title: "Residential Property Services",
                      description: "Professional maintenance and management for residential estates, apartments, and private homes.",
                      services: [
                        "24/7 maintenance support",
                        "Landscaping and grounds keeping",
                        "Swimming pool maintenance",
                        "Generator and backup power systems",
                        "Pest control and prevention",
                        "Regular property inspections",
                        "Emergency response services"
                      ]
                    },
                    {
                      title: "Specialized Facility Management",
                      description: "Expert management for specialized facilities requiring technical expertise.",
                      services: [
                        "Cinema equipment maintenance",
                        "Sports complex management",
                        "Factory and industrial maintenance",
                        "Medical facility management",
                        "Educational institution support",
                        "Hospitality facility services",
                        "Government building maintenance"
                      ]
                    },
                    {
                      title: "Preventive Maintenance Programs",
                      description: "Proactive maintenance strategies to prevent issues and extend asset life.",
                      services: [
                        "Scheduled inspection programs",
                        "Predictive maintenance analytics",
                        "Asset lifecycle management",
                        "Maintenance scheduling and tracking",
                        "Performance monitoring and reporting",
                        "Cost optimization strategies",
                        "Emergency preparedness planning"
                      ]
                    }
                  ].map((service, index) => (
                    <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle className="text-xl navy-text">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.services.map((item, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Business Consultancy */}
            <TabsContent value="consultancy">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Briefcase className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold navy-text">Business & Management Consultancy</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Strategic business advisory services including project financing, feasibility studies,
                    business setup assistance, and comprehensive management consulting.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Business Strategy Development",
                      features: [
                        "Strategic planning and roadmapping",
                        "Market entry strategies",
                        "Competitive analysis",
                        "Business model optimization",
                        "Growth strategy formulation"
                      ]
                    },
                    {
                      title: "Project Financing Solutions",
                      features: [
                        "Funding strategy development",
                        "Investor pitch preparation",
                        "Financial modeling and projections",
                        "Loan application assistance",
                        "Grant and funding opportunity identification"
                      ]
                    },
                    {
                      title: "Feasibility Studies",
                      features: [
                        "Market research and analysis",
                        "Technical feasibility assessment",
                        "Financial viability analysis",
                        "Risk assessment and mitigation",
                        "Implementation roadmap development"
                      ]
                    },
                    {
                      title: "Company Registration & Setup",
                      features: [
                        "Business registration with CAC",
                        "Legal structure optimization",
                        "Tax registration and compliance",
                        "Banking and financial setup",
                        "Operational framework development"
                      ]
                    },
                    {
                      title: "Management Advisory",
                      features: [
                        "Organizational development",
                        "Process improvement and optimization",
                        "Performance management systems",
                        "Change management support",
                        "Leadership development programs"
                      ]
                    },
                    {
                      title: "Financial Advisory",
                      features: [
                        "Financial planning and analysis",
                        "Investment advisory services",
                        "Budgeting and forecasting",
                        "Cost optimization strategies",
                        "Financial risk management"
                      ]
                    }
                  ].map((service, index) => (
                    <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle className="text-lg navy-text">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Import/Export */}
            <TabsContent value="import-export">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Truck className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold navy-text">Import, Export & Trading</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    International trade services covering machinery, equipment, fashion items,
                    raw materials, and general merchandise with end-to-end supply chain solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Machinery & Equipment Import",
                      description: "Specialized import services for industrial machinery, construction equipment, and technical apparatus.",
                      categories: [
                        "Industrial manufacturing equipment",
                        "Construction and heavy machinery",
                        "Medical and laboratory equipment",
                        "Agricultural machinery and tools",
                        "Technology and computing equipment"
                      ]
                    },
                    {
                      title: "Fashion & Textile Trading",
                      description: "Import and distribution of fashion items, textiles, and apparel products.",
                      categories: [
                        "Ready-to-wear clothing and accessories",
                        "Fabric and textile materials",
                        "Footwear and leather goods",
                        "Jewelry and fashion accessories",
                        "Home textiles and furnishings"
                      ]
                    },
                    {
                      title: "Raw Materials Supply",
                      description: "Sourcing and import of raw materials for manufacturing and production needs.",
                      categories: [
                        "Industrial raw materials",
                        "Chemical and pharmaceutical ingredients",
                        "Food and beverage ingredients",
                        "Building and construction materials",
                        "Energy and fuel products"
                      ]
                    },
                    {
                      title: "General Merchandise & Supplies",
                      description: "Wide range of general goods and supplies for diverse business needs.",
                      categories: [
                        "Consumer electronics and appliances",
                        "Automotive parts and accessories",
                        "Office and business supplies",
                        "Household and personal care items",
                        "Sports and recreational equipment"
                      ]
                    }
                  ].map((service, index) => (
                    <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle className="text-xl navy-text">{service.title}</CardTitle>
                        <CardDescription className="text-base">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.categories.map((category, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{category}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Construction */}
            <TabsContent value="construction">
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Construction className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold navy-text">Construction & Infrastructure Development</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive construction services including civil engineering, road construction,
                    building projects, and renovation works with qualified contractors and engineers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Civil Engineering Projects",
                      features: [
                        "Infrastructure design and planning",
                        "Site surveying and assessment",
                        "Structural engineering services",
                        "Project management and oversight",
                        "Quality assurance and control"
                      ]
                    },
                    {
                      title: "Road Construction & Maintenance",
                      features: [
                        "Highway and road construction",
                        "Street and pathway development",
                        "Bridge and overpass construction",
                        "Road maintenance and repair",
                        "Traffic management systems"
                      ]
                    },
                    {
                      title: "Building Construction",
                      features: [
                        "Residential building construction",
                        "Commercial and office buildings",
                        "Industrial facility construction",
                        "Educational and institutional buildings",
                        "Healthcare facility construction"
                      ]
                    },
                    {
                      title: "Renovation & Refurbishment",
                      features: [
                        "Building renovation and modernization",
                        "Interior and exterior refurbishment",
                        "Structural rehabilitation",
                        "System upgrades and improvements",
                        "Heritage building restoration"
                      ]
                    },
                    {
                      title: "Estate Development",
                      features: [
                        "Land development and preparation",
                        "Residential estate construction",
                        "Commercial complex development",
                        "Infrastructure installation",
                        "Landscaping and environmental works"
                      ]
                    },
                    {
                      title: "Specialized Construction",
                      features: [
                        "Industrial and manufacturing facilities",
                        "Sports and recreational facilities",
                        "Water and wastewater treatment plants",
                        "Energy and power infrastructure",
                        "Telecommunications infrastructure"
                      ]
                    }
                  ].map((service, index) => (
                    <Card key={index} className="illuminated-card border-l-4 border-l-accent">
                      <CardHeader>
                        <CardTitle className="text-lg navy-text">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <CheckCircle className="h-3 w-3 text-accent mt-1 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
              Ready to Work with Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              LetLetLet'sapos;sapos;s discuss how our comprehensive services can help achieve your business objectives.
              Contact us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline">
                  View Our Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
