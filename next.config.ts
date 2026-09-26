import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PAGES.md (#27): Examine and Who live on Home. The old URLs redirect, never 404.
  async redirects() {
    return [
      { source: "/practice", destination: "/#examine", permanent: true },
      { source: "/for", destination: "/#who", permanent: true },
    ];
  },
};

export default nextConfig;
