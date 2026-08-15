import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: false,
  include: ['./src/**/*.{ts,tsx,js,jsx}'],
  exclude: [],
  outdir: 'styled-system',
  theme: {
    extend: {
      tokens: {
        colors: {
          amber: { value: '#f59e0b' },
          cyan: { value: '#22d3ee' },
          ink: { value: '#050816' },
          'slate-950': { value: '#020617' },
          'slate-100': { value: '#f1f5f9' },
          'slate-50': { value: '#f8fafc' },
        },
        fonts: {
          body: { value: 'var(--font-body), sans-serif' },
          display: { value: 'var(--font-display), sans-serif' },
          mono: { value: 'var(--font-mono), monospace' },
        },
      },
    },
  },
});
