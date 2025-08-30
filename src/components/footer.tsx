import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, Building2, Users, Briefcase, Home, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-width-container section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo size="md" variant="full" darkMode={true} />
            <p className="text-sm opacity-80 leading-relaxed">
              Your trusted partner in real estate, consultancy & facility management across Nigeria and beyond.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 opacity-70" />
                <span className="opacity-80">
                  No 8, 4th Avenue Infinity Estate, Addo Road, Ajah, Lagos, Nigeria
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 opacity-70" />
                <span className="opacity-80">+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-70" />
                <span className="opacity-80">info@sogglobalconsult.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Users className="h-3 w-3" />
                <span>About Us</span>
              </Link>
              <Link href="/services" className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Briefcase className="h-3 w-3" />
                <span>Our Services</span>
              </Link>
              <Link href="/properties" className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Home className="h-3 w-3" />
                <span>Properties</span>
              </Link>
              <Link href="/contact" className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <Mail className="h-3 w-3" />
                <span>Contact</span>
              </Link>
              <Link href="/legal" className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
                <FileText className="h-3 w-3" />
                <span>Legal & Compliance</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Services</h3>
            <div className="space-y-2 text-sm opacity-80">
              <div>Real Estate Services</div>
              <div>Facility Management</div>
              <div>Business Consultancy</div>
              <div>Import & Export</div>
              <div>Construction & Development</div>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Legal & Compliance</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Building2 className="h-3 w-3" />
                <span>RC Registered Company</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <FileText className="h-3 w-3" />
                <span>CAC Certified</span>
              </div>
              <Link href="/legal">
                <Button variant="outline" size="sm" className="mt-4 bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  View Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 opacity-20" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm opacity-80">
            © 2024 SOG Global Consult Limited. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm opacity-80">
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:opacity-100 transition-opacity">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
