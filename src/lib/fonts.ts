import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import localFont from 'next/font/local';

/** Marka yazisi: hero 700; nav, mobil menu ve hero rozetleri 500. Dosyalar dev/build oncesi indirilir. */
export const nippo = localFont({
  src: [
    { path: './fonts/nippo-medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/nippo-bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-nippo',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

/**
 * Ana font. Basliklar 600-700, govde 400-500, nav/buton 500-600.
 * `latin-ext` Turkce glifler (i, I, g, s, c, o, u) icin zorunlu.
 */
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  // Space Grotesk'te Kiril yok — /ru govde metni kacinilmaz olarak yedege duser.
  // Yedegi acikca yazmak, next/font'un olcu ayarini (size-adjust/ascent-override)
  // bu listeye gore uretmesini saglar; aksi halde /ru'da fark edilir bir
  // yerlesim kaymasi olur.
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
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
  // 18 agirlik/stil/alfabe dosyasini her sayfada onceden indirmek yerine,
  // tarayici yalnizca gorunen metnin ihtiyac duydugu dosyalari yukler.
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});
