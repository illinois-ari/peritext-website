import { fileURLToPath } from 'url';
import path from 'path';
import { withPayload } from '@payloadcms/next/withPayload';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isGitHubPages = process.env.NEXT_PUBLIC_GH_PAGES === 'true';
const isStaticExport = process.env.NEXT_PUBLIC_USE_STATIC_EXPORT === 'true';

// Print Environment Variables to Debug
console.log('⚙️ NEXT CONFIG ENV VARS:');
console.log('✅ process.env.NEXT_PUBLIC_GH_PAGES:', process.env.NEXT_PUBLIC_GH_PAGES);
console.log('✅ process.env.NEXT_PUBLIC_USE_STATIC_EXPORT:', process.env.NEXT_PUBLIC_USE_STATIC_EXPORT);
console.log('✅ process.env.NEXT_PUBLIC_BASE_PATH:', process.env.NEXT_PUBLIC_BASE_PATH);
console.log('✅ isGitHubPages:', isGitHubPages);
console.log('✅ isStaticExport:', isStaticExport);

/** @type {import('next').NextConfig} */
const baseNextConfig = {
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  trailingSlash: true,

  basePath: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  assetPrefix: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  publicRuntimeConfig: {
    basePath: isGitHubPages ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  },

  webpack: (config) => {
    if (isStaticExport) {
      // Use `dirname` in place of __dirname
      config.resolve.alias['@/app/(payload)'] = path.join(dirname, 'empty-payload.js');
    }
    return config;
  },
};

const nextConfig = isStaticExport
  ? baseNextConfig
  : withPayload(baseNextConfig);

export default nextConfig;