import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure external image domains
  images: {
    domains: ["res.cloudinary.com"], // Allow loading images from Cloudinary
  },

  // Ignore ESLint errors during builds (useful for Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
