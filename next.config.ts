import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // or '20mb', '50mb' depending on your needs
    },
  },
};

export default nextConfig;
