import { PrismaClient, PropertyType, PropertyStatus, InquiryType, InquiryStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sogglobalconsult.com' },
    update: {},
    create: {
      email: 'admin@sogglobalconsult.com',
      name: 'SOG Admin',
      password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: password
      role: 'ADMIN'
    }
  })

  console.log('Created admin user:', adminUser)

  // Sample properties
  const properties = [
    {
      title: "Luxury 4-Bedroom Duplex",
      description: "Luxurious 4-bedroom duplex in the heart of Lekki Phase 1. Features modern amenities, spacious rooms, and premium finishes throughout. Perfect for families seeking comfort and elegance.",
      price: 85000000,
      location: "Lekki Phase 1",
      address: "Plot 45, Admiralty Way, Lekki Phase 1, Lagos",
      latitude: 6.4474,
      longitude: 3.4647,
      type: PropertyType.DUPLEX,
      status: PropertyStatus.AVAILABLE,
      bedrooms: 4,
      bathrooms: 5,
      area: 450,
      parking: 3,
      featured: true,
      yearBuilt: 2022,
      furnished: true,
      petFriendly: false,
      garden: true,
      balcony: true,
      slug: "luxury-4-bedroom-duplex-lekki-phase-1",
      metaTitle: "Luxury 4-Bedroom Duplex for Sale in Lekki Phase 1",
      metaDescription: "Beautiful 4-bedroom duplex with modern amenities in prestigious Lekki Phase 1. Contact SOG Global Consult for viewing.",
      createdById: adminUser.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
          publicId: "sog-properties/duplex-1-main",
          caption: "Main exterior view",
          isPrimary: true,
          order: 0
        },
        {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
          publicId: "sog-properties/duplex-1-living",
          caption: "Spacious living room",
          isPrimary: false,
          order: 1
        },
        {
          url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
          publicId: "sog-properties/duplex-1-kitchen",
          caption: "Modern fitted kitchen",
          isPrimary: false,
          order: 2
        }
      ],
      features: [
        { name: "Swimming Pool", icon: "🏊" },
        { name: "Generator", icon: "⚡" },
        { name: "Security System", icon: "🔒" },
        { name: "Fitted Kitchen", icon: "🍳" },
        { name: "Boys Quarter", icon: "🏠" },
        { name: "Parking Space", icon: "🚗" }
      ]
    },
    {
      title: "3-Bedroom Apartment",
      description: "Modern 3-bedroom apartment with stunning ocean views in prestigious Victoria Island. Features high-end finishes and access to world-class amenities.",
      price: 45000000,
      location: "Victoria Island",
      address: "Water Corporation Drive, Victoria Island, Lagos",
      latitude: 6.4281,
      longitude: 3.4219,
      type: "APARTMENT",
      status: "AVAILABLE",
      bedrooms: 3,
      bathrooms: 3,
      area: 180,
      parking: 2,
      featured: false,
      yearBuilt: 2021,
      furnished: false,
      petFriendly: true,
      garden: false,
      balcony: true,
      slug: "3-bedroom-apartment-victoria-island",
      metaTitle: "3-Bedroom Apartment for Sale in Victoria Island",
      metaDescription: "Luxury 3-bedroom apartment with ocean views in Victoria Island. Premium location with modern amenities.",
      createdById: adminUser.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
          publicId: "sog-properties/apartment-1-main",
          caption: "Ocean view from balcony",
          isPrimary: true,
          order: 0
        },
        {
          url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
          publicId: "sog-properties/apartment-1-living",
          caption: "Open plan living area",
          isPrimary: false,
          order: 1
        }
      ],
      features: [
        { name: "Ocean View", icon: "🌊" },
        { name: "Gym Access", icon: "🏋️" },
        { name: "24/7 Security", icon: "👮" },
        { name: "Elevator", icon: "🛗" },
        { name: "Parking", icon: "🚗" }
      ]
    },
    {
      title: "Commercial Office Space",
      description: "Prime commercial office space perfect for corporate headquarters or large businesses. Located in the heart of Ikeja GRA with excellent accessibility.",
      price: 120000000,
      location: "Ikeja GRA",
      address: "Alausa Secretariat Road, Ikeja GRA, Lagos",
      latitude: 6.5698,
      longitude: 3.3616,
      type: "COMMERCIAL",
      status: "AVAILABLE",
      bedrooms: 0,
      bathrooms: 4,
      area: 800,
      parking: 10,
      featured: true,
      yearBuilt: 2020,
      furnished: false,
      petFriendly: false,
      garden: false,
      balcony: false,
      slug: "commercial-office-space-ikeja-gra",
      metaTitle: "Commercial Office Space for Sale in Ikeja GRA",
      metaDescription: "Premium commercial office space in Ikeja GRA. Perfect for corporate headquarters with ample parking.",
      createdById: adminUser.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
          publicId: "sog-properties/office-1-main",
          caption: "Modern office exterior",
          isPrimary: true,
          order: 0
        }
      ],
      features: [
        { name: "Conference Rooms", icon: "🏢" },
        { name: "Reception Area", icon: "🏛️" },
        { name: "Parking Spaces", icon: "🚗" },
        { name: "Generator", icon: "⚡" },
        { name: "Security", icon: "🔒" }
      ]
    },
    {
      title: "5-Bedroom Mansion",
      description: "Exclusive 5-bedroom mansion on prestigious Banana Island with private waterfront access. Ultimate luxury living with premium amenities and stunning views.",
      price: 350000000,
      location: "Banana Island",
      address: "Banana Island Road, Ikoyi, Lagos",
      latitude: 6.4401,
      longitude: 3.4490,
      type: "MANSION",
      status: "AVAILABLE",
      bedrooms: 5,
      bathrooms: 7,
      area: 1200,
      parking: 5,
      featured: true,
      yearBuilt: 2023,
      furnished: true,
      petFriendly: true,
      garden: true,
      balcony: true,
      slug: "5-bedroom-mansion-banana-island",
      metaTitle: "Luxury 5-Bedroom Mansion for Sale on Banana Island",
      metaDescription: "Exclusive waterfront mansion on Banana Island with private pool and premium amenities. Ultimate luxury living.",
      createdById: adminUser.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
          publicId: "sog-properties/mansion-1-main",
          caption: "Luxury mansion exterior",
          isPrimary: true,
          order: 0
        },
        {
          url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
          publicId: "sog-properties/mansion-1-pool",
          caption: "Private swimming pool",
          isPrimary: false,
          order: 1
        }
      ],
      features: [
        { name: "Waterfront Access", icon: "🌊" },
        { name: "Private Pool", icon: "🏊" },
        { name: "Home Cinema", icon: "🎬" },
        { name: "Wine Cellar", icon: "🍷" },
        { name: "Staff Quarters", icon: "🏠" },
        { name: "Boat Dock", icon: "⛵" }
      ]
    },
    // Sold properties
    {
      title: "2-Bedroom Apartment",
      description: "Well-designed 2-bedroom apartment in growing Ajah district, perfect for young professionals and small families.",
      price: 25000000,
      location: "Ajah",
      address: "Lekki-Epe Expressway, Ajah, Lagos",
      latitude: 6.4698,
      longitude: 3.5852,
      type: "APARTMENT",
      status: "SOLD",
      bedrooms: 2,
      bathrooms: 2,
      area: 120,
      parking: 1,
      featured: false,
      yearBuilt: 2020,
      furnished: false,
      petFriendly: false,
      garden: false,
      balcony: true,
      slug: "2-bedroom-apartment-ajah-sold",
      soldDate: new Date('2024-03-15'),
      metaTitle: "2-Bedroom Apartment in Ajah - Sold",
      metaDescription: "Successfully sold 2-bedroom apartment in Ajah. Contact SOG Global Consult for similar properties.",
      createdById: adminUser.id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop",
          publicId: "sog-properties/apartment-sold-1",
          caption: "Cozy living space",
          isPrimary: true,
          order: 0
        }
      ],
      features: [
        { name: "Modern Kitchen", icon: "🍳" },
        { name: "Balcony", icon: "🏡" },
        { name: "Security", icon: "🔒" },
        { name: "Parking", icon: "🚗" }
      ]
    }
  ]

  // Create properties with relations
  for (const propertyData of properties) {
    const { images, features, ...propertyInfo } = propertyData

    const property = await prisma.property.create({
      data: {
        ...propertyInfo,
        images: {
          create: images
        },
        features: {
          create: features
        }
      } as any, // Type assertion for seed data
      include: {
        images: true,
        features: true
      }
    })

    console.log('Created property:', property.title)
  }

  // Sample inquiries
  const inquiries = [
    {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+234 803 123 4567",
      message: "I'm interested in viewing the luxury duplex in Lekki Phase 1. When would be a good time for a showing?",
      type: InquiryType.PROPERTY,
      status: InquiryStatus.NEW,
      budgetMin: 70000000,
      budgetMax: 100000000
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+234 805 987 6543",
      message: "I would like more information about the commercial office space in Ikeja GRA. Can you send me the floor plans?",
      type: InquiryType.CONSULTATION,
      status: InquiryStatus.IN_PROGRESS
    },
    {
      name: "Michael Chen",
      email: "m.chen@email.com",
      message: "Hello, I'm looking for a 3-bedroom apartment in Victoria Island area. What options do you have available?",
      type: InquiryType.GENERAL,
      status: InquiryStatus.NEW,
      budgetMin: 40000000,
      budgetMax: 60000000
    }
  ]

  for (const inquiryData of inquiries) {
    const inquiry = await prisma.inquiry.create({
      data: inquiryData
    })
    console.log('Created inquiry from:', inquiry.name)
  }

  console.log('Database seeded successfully! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
