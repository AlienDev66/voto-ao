import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.parlamento.ao" },
      { protocol: "https", hostname: "parlamento.ao" },
      { protocol: "https", hostname: "portaladmin.parlamento.ao" },
      { protocol: "https", hostname: "pollsafrica.com" },
    ],
    dangerouslyAllowSVG: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
