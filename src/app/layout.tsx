import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  preload: true,

});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,

});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: true,

});

export const metadata: Metadata = {
  title: 'Portfolio | Nicolas Keita — Ingénieur Logiciel & Consultant IT',
  description:
    'Portfolio de Nicolas Keita - Ingénieur Logiciel & Consultant IT spécialisé en systèmes, réseaux et gestion de projets',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={clsx('dark', inter.variable, spaceGrotesk.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="font-body">
        <a
          href="#main-content"
          className={`
            sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100
            focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-900 focus:font-semibold
            focus:rounded-lg focus:shadow-lg focus:outline-hidden focus:text-sm
          `}
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
