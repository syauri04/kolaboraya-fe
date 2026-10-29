import type { NextConfig } from "next";

// Image URLs from Strapi are normalized by getStrapiMedia (src/utils/strapiMedia.ts),
// so this config is the same for local (Strapi /uploads) and production (DO Spaces).
const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
