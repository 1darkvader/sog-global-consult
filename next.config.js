/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages compatibility
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "res.cloudinary.com", // Add Cloudinary domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary images
        pathname: "/**",
      },
    ],
  },
  // Aggressive optimization for Cloudflare Pages deployment
  serverExternalPackages: ['@prisma/client'],
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Aggressive chunk splitting and size optimization
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 20000000, // 20MB max chunk size
          cacheGroups: {
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
              maxSize: 15000000, // 15MB max
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
              maxSize: 20000000, // 20MB max
            },
            prisma: {
              test: /[\\/]node_modules[\\/]@prisma[\\/]/,
              name: 'prisma',
              priority: 10,
              chunks: 'all',
              maxSize: 10000000, // 10MB max
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: 'react',
              priority: 20,
              chunks: 'all',
              maxSize: 5000000, // 5MB max
            }
          }
        }
      }

      // Disable source maps in production to reduce size
      config.devtool = false

      // Remove unnecessary modules
      config.resolve.alias = {
        ...config.resolve.alias,
        '@mapbox/node-pre-gyp': false,
        'mock-aws-s3': false,
        'aws-sdk': false,
        'nock': false
      }
    }

    // Disable webpack cache completely
    config.cache = false

    return config
  },
  // Additional size optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
};

module.exports = nextConfig;
