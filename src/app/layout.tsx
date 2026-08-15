import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { css } from '../../styled-system/css';
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

const bodyClass = css({
  fontFamily: 'body',
});

const skipLink = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  p: '0',
  m: '-1px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  clipPath: 'inset(50%)',
  borderWidth: 0,
  _focus: {
    clipPath: 'none',
    whiteSpace: 'normal',
    width: 'auto',
    height: 'auto',
    m: '0',
    position: 'fixed',
    top: '4',
    left: '4',
    zIndex: 100,
    px: '4',
    py: '2',
    bg: 'cyan.500',
    color: 'slate.900',
    fontWeight: 'semibold',
    rounded: 'lg',
    boxShadow: 'lg',
    outline: 'none',
    fontSize: 'sm',
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className={bodyClass}>
        <a
          href="#main-content"
          className={skipLink}
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
