import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

const nextConfig = (phase: string): NextConfig => ({
  ...(phase === PHASE_DEVELOPMENT_SERVER
    ? { pageExtensions: ['dev.ts', 'tsx', 'ts', 'jsx', 'js'] }
    : { output: 'export' }),
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.toml': ['./src/i18n/toml-loader.mjs'],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.toml$/,
      use: './src/i18n/toml-loader.mjs',
    });
    return config;
  },
});

export default nextConfig;
