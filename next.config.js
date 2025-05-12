/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // <-- This line must be removed or commented out
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;