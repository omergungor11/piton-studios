import { locales, defaultLocale, type Locale } from '@/i18n/config';

/**
 * Kanonik site adresi. Vercel preview deploy'larinda VERCEL_URL uzerinden turetilir,
 * production'da NEXT_PUBLIC_SITE_URL ile sabitlenir.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

export const SITE = {
  url: SITE_URL,
  name: 'Piton Studios',
  email: 'hi@pitonstudios.com',
  logo: `${SITE_URL}/logo.webp`,
  social: [
    'https://instagram.com/pitonstudios',
    'https://www.linkedin.com/company/piton-studios',
    'https://github.com/omergungor11',
    'https://www.facebook.com/profile.php?id=100089359021738',
  ],
} as const;

/** OG locale kodlari — Open Graph `og:locale` icin. */
export const OG_LOCALE: Record<Locale, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  ru: 'ru_RU',
};

export { locales, defaultLocale };
export type { Locale };
