import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This might be needed for some Next.js versions/environments to properly bypass host checks
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
