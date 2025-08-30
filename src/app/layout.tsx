import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOG Global Consult Limited - Real Estate, Consultancy & Facility Management",
  description: "Your trusted partner in real estate, business consultancy, and facility management services across Nigeria and beyond. RC registered company providing professional solutions.",
  keywords: "real estate Lagos, facility management Nigeria, business consultancy, property development, estate agency, construction services",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ClientBody>
      </body>
    </html>
  );
}
