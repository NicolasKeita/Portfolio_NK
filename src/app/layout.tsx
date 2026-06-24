import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';

export const metadata: Metadata = {
  title: 'Nicolas Keita - Portfolio',
  description: 'Portfolio de Nicolas Keita, developpeur React, TypeScript, Python, Java et C++.',
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
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
