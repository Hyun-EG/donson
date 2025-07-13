import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  swSrc: "custom-sw.js",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lwi.nexon.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
