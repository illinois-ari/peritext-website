
import { withPayload } from '@payloadcms/next/withPayload'

const isGitHubPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true'

// peritext/peritext-website/next.config.mjs
/** @type {import('next').NextConfig} */

const nextConfig = {
  output: isGitHubPages ? 'export' : undefined, // Enable 'export' only for GH Pages
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Ensures all URLs have a trailing slash (useful for GitHub Pages)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,  // Matches the repository's project name on GitHub Pages
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH, // Ensures assets are correctly prefixed

  publicRuntimeConfig: {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  },
};

export default withPayload(nextConfig);