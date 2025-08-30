# 🚂 SOG Global Consult - Railway Deployment Guide

## ✅ WHY RAILWAY IS THE PERFECT CHOICE
- **Database Already There**: Your PostgreSQL database is already running on Railway
- **One Platform**: Manage both database and web application in one place
- **Next.js Ready**: Full support for Next.js applications
- **GitHub Integration**: Auto-deploy from your repository
- **Environment Variables**: Easy configuration management

## 🚂 RAILWAY DEPLOYMENT STEPS

### Step 1: Access Your Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Login to your existing account (where your PostgreSQL database is)
3. You should see your existing database project

### Step 2: Add Web Service to Existing Project
1. In your Railway dashboard, click on your existing project (with the database)
2. Click **"+ New Service"**
3. Select **"GitHub Repo"**
4. Choose your `sog-global-consult` repository
5. Railway will auto-detect it's a Next.js app

### Step 3: Configure Build Settings
Railway should auto-configure, but verify these settings:
- **Build Command**: `prisma generate && npm run build`
- **Start Command**: `npm start`
- **Port**: `3000` (default)

### Step 4: Environment Variables
Your web service needs these environment variables:

```bash
# Database (should already exist in your project)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email (Optional)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@sogglobalconsult.com
ADMIN_EMAIL=admin@sogglobalconsult.com

# App URL (will be provided after deployment)
NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app
```

**Important**: Railway can automatically reference your existing database URL using `${{Postgres.DATABASE_URL}}`

### Step 5: Deploy
1. Click **"Deploy"** in Railway dashboard
2. Railway will build and deploy your application
3. You'll get a public URL like: `https://sog-global-consult-production.up.railway.app`

### Step 6: Update App URL
After deployment:
1. Copy your Railway app URL
2. Update `NEXT_PUBLIC_APP_URL` environment variable with your actual URL
3. Redeploy (Railway will auto-redeploy on environment variable changes)

### Step 7: Test Your Deployment
1. **Visit your Railway URL**: Should show the SOG Global homepage
2. **Test API**: `https://your-app.up.railway.app/api/properties` (should return JSON)
3. **Admin Access**: `https://your-app.up.railway.app/admin` (password: `sogadmin2024`)
4. **Test Property Creation**: Upload images and create properties
5. **Verify Database**: Properties should appear on `/properties` page

## 🔧 CONFIGURATION FILES

### railway.json (Already Created)
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/api/properties"
  }
}
```

### package.json Scripts
Make sure these scripts exist (they do):
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "start": "next start"
  }
}
```

## 🚀 EXPECTED RESULT

After successful Railway deployment:
- **Live URL**: `https://your-app.up.railway.app`
- **Admin Panel**: Working property management system
- **Database**: Connected to your existing Railway PostgreSQL
- **Image Uploads**: Functional Cloudinary integration
- **Professional Website**: Fully functional real estate platform

## 🔗 RAILWAY ADVANTAGES

- **Cost Effective**: Free tier available, pay-as-you-scale
- **Auto-Scaling**: Handles traffic spikes automatically
- **Built-in Monitoring**: Track performance and errors
- **Custom Domains**: Add your own domain (sogglobalconsult.com)
- **Automatic SSL**: HTTPS enabled by default
- **Git Integration**: Auto-deploy on code changes

## 📞 TROUBLESHOOTING

### Build Fails
- Check that `prisma generate` runs successfully
- Verify all dependencies are in package.json
- Check Railway build logs for specific errors

### Database Connection Issues
- Verify `DATABASE_URL` is set to `${{Postgres.DATABASE_URL}}`
- Ensure both services are in the same Railway project
- Check database is running and accessible

### Image Upload Not Working
- Verify Cloudinary environment variables are set correctly
- Test Cloudinary credentials in their dashboard
- Check Railway logs for upload errors

## 🎉 YOU'RE READY TO DEPLOY!

Your application is fully prepared for Railway deployment. The build is successful and all configurations are in place.

**Next Step**: Go to Railway dashboard and deploy your app! 🚂
