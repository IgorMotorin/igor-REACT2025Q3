import type { NextConfig } from 'next';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
};

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: true,
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withBundleAnalyzer(nextConfig));
