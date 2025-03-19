import { withPayload } from '@payloadcms/next/withPayload';

const isGitHubPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true';
const isStaticExport = process.env.NEXT_PUBLIC_USE_STATIC_EXPORT === 'true';

// peritext/peritext-website/next.config.mjs
/** @type {import('next').NextConfig} */

const nextConfig = withPayload({
  output: isStaticExport ? 'export' : undefined, // Export only if static mode is enabled
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for GitHub Pages (doesn't support Image Optimization)
  },
  trailingSlash: true, // Ensures all URLs have a trailing slash (GitHub Pages requirement)

  basePath: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '', // Only use basePath in GitHub Pages
  assetPrefix: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '', // Only modify asset paths for GitHub Pages

  publicRuntimeConfig: {
    basePath: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  },
});

export default nextConfig;