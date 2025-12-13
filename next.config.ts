import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname:
          process.env.STRAPI_HOST?.replace(/^https?:\/\//, "") || "127.0.0.1",
        port: process.env.STRAPI_PORT || "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname:
          process.env.STRAPI_HOST?.replace(/^https?:\/\//, "") || "localhost",
        port: "", // HTTPS default port
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
