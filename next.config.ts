import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ allows Cloudinary-hosted images
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint errors during Vercel build
  },
};

export default nextConfig;
