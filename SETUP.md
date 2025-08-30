# SOG Global Consult - Full-Stack Setup Guide

This guide will help you set up the complete real estate platform with all advanced features including database, image uploads, email notifications, and map integration.

## 🏗️ Architecture Overview

The platform now includes:
- **Frontend**: Next.js 15.3.2 with TypeScript and Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **File Storage**: Cloudinary for image uploads
- **Email Service**: Resend for notifications
- **Maps**: Mapbox for location-based features
- **Real-time**: Live admin dashboard with auto-refresh

## 📋 Prerequisites

1. **Node.js 18+** or **Bun** (recommended)
2. **PostgreSQL Database** (local or cloud)
3. **Cloudinary Account** (for image uploads)
4. **Resend Account** (for email notifications)
5. **Mapbox Account** (for maps)
6. **Google Cloud Account** (optional - for geocoding)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/1darkvader/sog-global-consult.git
cd sog-global-consult
bun install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL locally
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Create database
createdb sog_global_consult
```

#### Option B: Cloud Database (Recommended)
Use any of these cloud providers:
- **Render**: https://render.com (Free tier available)
- **Supabase**: https://supabase.com (PostgreSQL with free tier)
- **Railway**: https://railway.app
- **Vercel Postgres**: https://vercel.com/storage/postgres

### 3. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env.local
```

Fill in your `.env.local` file with actual values:

```env
# Database - Replace with your actual database URL
DATABASE_URL="postgresql://username:password@host:port/database"

# Cloudinary - Get from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Resend - Get from https://resend.com/api-keys
RESEND_API_KEY="re_your-api-key"

# Mapbox - Get from https://mapbox.com/account/access-tokens
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="pk.your-mapbox-token"

# Google Geocoding (Optional) - Get from Google Cloud Console
GOOGLE_GEOCODING_API_KEY="your-google-api-key"

# Other settings
NEXTAUTH_SECRET="your-secret-key-change-in-production"
FROM_EMAIL="noreply@sogglobalconsult.com"
ADMIN_EMAIL="admin@sogglobalconsult.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database (for development)
bun run db:push

# OR create and run migrations (for production)
bun run db:migrate

# Seed database with sample data
bun run db:seed
```

### 5. Start Development Server

```bash
bun run dev
```

Visit `http://localhost:3000` to see the application.

## 🔧 Service Setup Guides

### Cloudinary Setup (Required for Image Uploads)

1. Sign up at https://cloudinary.com
2. Go to Dashboard → Settings → API Keys
3. Copy your Cloud Name, API Key, and API Secret
4. Add to `.env.local`

### Resend Setup (Required for Email Notifications)

1. Sign up at https://resend.com
2. Go to API Keys → Create API Key
3. Copy the API key (starts with `re_`)
4. Add to `.env.local`

### Mapbox Setup (Required for Maps)

1. Sign up at https://mapbox.com
2. Go to Account → Access Tokens
3. Create a new token with these scopes:
   - `styles:read`
   - `fonts:read`
   - `datasets:read`
4. Copy the token (starts with `pk.`)
5. Add to `.env.local`

### Database Hosting Options

#### Render (Free Tier)
1. Sign up at https://render.com
2. Create a new PostgreSQL database
3. Copy the External Database URL
4. Use as your `DATABASE_URL`

#### Supabase (Free Tier)
1. Sign up at https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Use as your `DATABASE_URL`

### Google Geocoding (Optional)

1. Go to Google Cloud Console
2. Enable the Geocoding API
3. Create an API key
4. Restrict it to the Geocoding API
5. Add to `.env.local`

## 🎯 Admin Dashboard

### Access Admin Panel
- URL: `http://localhost:3000/admin`
- Password: `sogadmin2024`

### Admin Features
- **Property Management**: Add, edit, delete properties
- **Image Upload**: Drag & drop image uploads via Cloudinary
- **Inquiry Management**: View and respond to inquiries
- **Real-time Updates**: Dashboard refreshes every 30 seconds
- **Analytics**: Property performance and statistics

## 🏠 Property Features

### Available Features
- **Advanced Search**: Price range, location, bedrooms, type
- **Map Integration**: Interactive property locations
- **Image Galleries**: Multiple photos with carousel
- **Real-time Inquiries**: Email notifications to admin
- **Property Analytics**: View counts and inquiry tracking
- **SEO Optimization**: Meta tags and structured data

### Adding Properties
1. Go to Admin Dashboard
2. Click "Add New Property"
3. Fill in all details including:
   - Basic information (title, price, description)
   - Location (address with optional geocoding)
   - Property details (bedrooms, bathrooms, etc.)
   - Upload multiple images
   - Add features and amenities
4. Save to publish

## 📧 Email System

### Automatic Notifications
- **New Inquiries**: Admin receives email when someone inquires
- **Auto-Reply**: Customers receive confirmation email
- **Property Alerts**: Notify admin of new properties

### Email Templates
All emails include:
- Professional SOG Global Consult branding
- Property details (if applicable)
- Contact information
- Links back to website

## 🗺️ Map Features

### Interactive Maps
- **Property Markers**: Color-coded by status (available/sold/pending)
- **Property Popups**: Quick property details
- **Search Integration**: Filter properties on map
- **Location Detection**: Geocoding for addresses

### Map Controls
- **Zoom/Pan**: Standard map navigation
- **Fullscreen**: Expand map view
- **Property Selection**: Click markers to view details

## 📊 Analytics & Reports

### Dashboard Analytics
- **Property Statistics**: Total, available, sold counts
- **View Tracking**: Individual property view counts
- **Inquiry Analytics**: Total and new inquiry counts
- **Performance Metrics**: Top performing properties

### Property Insights
- **View Tracking**: Unique views per property
- **Inquiry Conversion**: Properties with most inquiries
- **Price Analytics**: Average prices by type/location
- **Trend Analysis**: Property performance over time

## 🔒 Security Features

### Data Protection
- **Environment Variables**: Sensitive data in `.env.local`
- **Database Security**: Prisma with parameterized queries
- **Admin Authentication**: Password-protected admin access
- **Input Validation**: Form validation and sanitization

### Production Security
- **HTTPS Required**: SSL certificates for production
- **Rate Limiting**: API rate limiting (implement as needed)
- **CORS Configuration**: Proper cross-origin setup
- **Environment Separation**: Different configs for dev/prod

## 🚢 Deployment Options

### Netlify (Current)
```bash
# Build for static export
bun run build

# Deploy automatically via Git
git push origin main
```

### Vercel (Recommended for Full-Stack)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Other Options
- **Railway**: Full-stack with database
- **Render**: Web service + PostgreSQL
- **AWS/DigitalOcean**: VPS deployment

## 🛠️ Development Commands

```bash
# Development
bun run dev              # Start dev server
bun run build           # Build for production
bun run start           # Start production server

# Database
bun run db:generate     # Generate Prisma client
bun run db:push         # Push schema changes
bun run db:migrate      # Create and run migrations
bun run db:studio       # Open Prisma Studio
bun run db:seed         # Seed database with sample data

# Code Quality
bun run lint            # Run linting
bun run format          # Format code
```

## 📞 Support & Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check if PostgreSQL is running
pg_isready

# Test connection
psql "your-database-url"
```

#### Image Upload Issues
- Verify Cloudinary credentials
- Check file size limits (default: 10MB)
- Ensure proper CORS configuration

#### Map Not Loading
- Verify Mapbox token is valid
- Check browser console for errors
- Ensure token has proper scopes

#### Email Not Sending
- Verify Resend API key
- Check spam folder
- Validate email addresses

### Getting Help
- **Documentation**: Check API docs for each service
- **Community**: Stack Overflow, Discord
- **Support**: Contact service providers directly

## 🎉 Congratulations!

You now have a fully functional real estate platform with:
- ✅ Real-time property management
- ✅ Interactive maps with location search
- ✅ Image upload and gallery system
- ✅ Email notification system
- ✅ Advanced search and filtering
- ✅ Professional admin dashboard
- ✅ Mobile-responsive design
- ✅ SEO optimization

The platform is ready for production use and can handle real estate business operations at scale!
