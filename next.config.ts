import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.toml': ['./src/i18n/toml-loader.cjs'],
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.toml$/,
      use: './src/i18n/toml-loader.cjs',
    });
    return config;
  },
};

export default nextConfig;