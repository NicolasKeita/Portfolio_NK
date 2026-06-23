/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#3b82f6',
        },
        amber: {
          DEFAULT: '#f59e0b',
        },
        'bg-dark': {
          light: '#ffffff',
          dark: '#0b1220',
        },
        'bg-card': {
          light: '#f8fafc',
          dark: '#141d33',
        },
        navy: {
          light: '#1e293b',
          dark: '#e8edf7',
        },
        text: {
          light: '#1e293b',
          dark: '#e8edf7',
        },
        'text-soft': {
          light: '#64748b',
          dark: '#aab4c8',
        },
        muted: {
          light: '#94a3b8',
          dark: '#7c8aa8',
        },
        border: {
          light: '#e2e8f0',
          dark: 'rgba(255,255,255,0.1)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};