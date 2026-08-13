import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';

/**
 * Ana font. Basliklar 600-700, govde 400-500, nav/buton 500-600.
 * `latin-ext` Turkce glifler (i, I, g, s, c, o, u) icin zorunlu.
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

/**
 * Proje numaralari, kategori/ust etiketler, sayaclar, tarihler, teknik metadata.
 * `cyrillic` /ru icin — Space Grotesk'te Kiril yok, en azindan mono etiketler dogru render olsun.
 */
export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});
