import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Shield, Building2, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-primary-foreground py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
              Legal & Compliance
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Corporate Legal Documents
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              SOG Global Consult Limited is fully registered with the Corporate Affairs Commission (CAC)
              and complies with all Nigerian business registration requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Company Registration Details */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold navy-text mb-4">Company Registration Information</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All our legal documentation is available for verification and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Registration Details */}
            <Card className="illuminated-card border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="navy-text">Company Registration Details</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium navy-text">Full Legal Name</label>
                    <p className="text-base">SOG Global Consult Limited</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium navy-text">Business Type</label>
                    <p className="text-base">Private Limited Company</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium navy-text">Registration Status</label>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">Active & Compliant</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium navy-text">Registered Office Address</label>
                    <p className="text-base">
                      No 8, 4th Avenue Infinity Estate<br />
                      Addo Road, Ajah, Lagos State, Nigeria
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium navy-text">Primary Business Activities</label>
                    <div className="space-y-1">
                      <p className="text-sm">• Real Estate Development & Management</p>
                      <p className="text-sm">• Business & Management Consultancy</p>
                      <p className="text-sm">• Facility Management Services</p>
                      <p className="text-sm">• Import & Export Trading</p>
                      <p className="text-sm">• Construction & Infrastructure Development</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance Status */}
            <Card className="illuminated-card border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="navy-text">Compliance Status</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { item: "CAC Registration", status: "Current", date: "2024", color: "green" },
                    { item: "Annual Returns Filing", status: "Up to Date", date: "2024", color: "green" },
                    { item: "Tax Compliance", status: "Current", date: "2024", color: "green" },
                    { item: "Business Permits", status: "Valid", date: "2024", color: "green" },
                    { item: "Professional Licenses", status: "Active", date: "2024", color: "green" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium navy-text">{item.item}</p>
                        <p className="text-sm text-muted-foreground">Last updated: {item.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CAC Documents */}
      <section className="py-16 lg:py-24 illuminated-bg">
        <div className="max-width-container section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold navy-text mb-4">Official CAC Documents</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download and view our official Corporate Affairs Commission documents for verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Certificate of Incorporation",
                description: "Official certificate confirming the registration of SOG Global Consult Limited with CAC.",
                issueDate: "January 15, 2024",
                docType: "PDF Document",
                available: true
              },
              {
                title: "Status Report",
                description: "Current status report showing active company registration and compliance.",
                issueDate: "March 10, 2024",
                docType: "PDF Document",
                available: true
              },
              {
                title: "Memorandum of Association",
                description: "Company's memorandum detailing business objectives and operational framework.",
                issueDate: "January 15, 2024",
                docType: "PDF Document",
                available: true
              },
              {
                title: "Articles of Association",
                description: "Internal governance rules and regulations of the company.",
                issueDate: "January 15, 2024",
                docType: "PDF Document",
                available: true
              },
              {
                title: "Form CAC 2.1",
                description: "Particulars of directors and company secretary filed with CAC.",
                issueDate: "February 20, 2024",
                docType: "PDF Document",
                available: true
              },
              {
                title: "Annual Return",
                description: "Latest annual return filed with the Corporate Affairs Commission.",
                issueDate: "December 31, 2023",
                docType: "PDF Document",
                available: true
              }
            ].map((doc, index) => (
              <Card key={index} className="illuminated-card">
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg navy-text">{doc.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{doc.issueDate}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {doc.description}
                  </p>
                  <div className="space-y-2">
                    <Badge variant="outline">{doc.docType}</Badge>
                    {doc.available ? (
                      <div className="space-y-2">
                        <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          <FileText className="h-3 w-3 mr-2" />
                          View Document
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-3 w-3 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" disabled className="w-full">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Document Upload Notice */}
          <Card className="mt-8 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold navy-text mb-2">Document Verification</h3>
                  <p className="text-muted-foreground mb-3">
                    All documents are regularly updated and verified with the Corporate Affairs Commission.
                    For additional verification, you can search our company on the CAC Business Registration Portal.
                  </p>
                  <Button variant="outline" size="sm">
                    Visit CAC Portal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="py-16 lg:py-24">
        <div className="max-width-container section-padding">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold navy-text">Need Additional Documentation?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you require additional legal documents or have questions about our registration status,
              please contact our legal compliance team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Contact Legal Team
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Request Document Copy
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
