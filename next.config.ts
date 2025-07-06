import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow loading images from Cloudinary and Pinterest
    domains: ["res.cloudinary.com", "i.pinimg.com"],
  },

  // Ignore ESLint errors during builds (useful for Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
