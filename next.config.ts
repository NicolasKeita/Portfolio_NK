import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
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
};

export default nextConfig;