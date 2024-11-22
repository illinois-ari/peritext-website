// peritext/peritext-website/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: "/peritext-website",  // Matches the repository's project name on GitHub Pages
  assetPrefix: "/peritext-website", // Ensures assets are correctly prefixed
};

export default nextConfig;
