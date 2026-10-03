import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is one page. Keep existing page links pointing to useful destinations.
  async redirects() {
    return [
      { source: "/practice", destination: "/#examine", permanent: true },
      { source: "/method", destination: "/#method", permanent: true },
      { source: "/ask", destination: "/#method", permanent: true },
      { source: "/for", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
