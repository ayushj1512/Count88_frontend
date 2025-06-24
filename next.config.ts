import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // ✅ allows Cloudinary-hosted images
  },
};

export default nextConfig;
