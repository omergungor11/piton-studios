import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/projects': {
      tr: '/projeler',
      en: '/projects',
      ru: '/projects',
    },
    '/projects/[slug]': {
      tr: '/projeler/[slug]',
      en: '/projects/[slug]',
      ru: '/projects/[slug]',
    },
    '/services': {
      tr: '/hizmetler',
      en: '/services',
      ru: '/services',
    },
    '/services/[slug]': {
      tr: '/hizmetler/[slug]',
      en: '/services/[slug]',
      ru: '/services/[slug]',
    },
    '/about': {
      tr: '/hakkinda',
      en: '/about',
      ru: '/about',
    },
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
      ru: '/contact',
    },
  },
});
