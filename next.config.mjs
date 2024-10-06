/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages:['eslint', 'jsdom', 'postcss', 'typescript'],
};

import withBundleAnalyzer from '@next/bundle-analyzer'
const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })

export default nextConfig