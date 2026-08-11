import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site compiles to plain HTML/CSS/JS.
  // No server, no runtime cost — deploys to Cloudflare Pages free tier.
  output: "export",

  // next/image optimisation needs a server, which a static export doesn't have.
  images: { unoptimized: true },

  // Emit /contact/index.html rather than /contact.html so static hosts
  // serve clean URLs without redirect rules.
  trailingSlash: true,
};

export default nextConfig;
