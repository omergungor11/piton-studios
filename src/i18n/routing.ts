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
    '/blog': {
      tr: '/blog',
      en: '/blog',
      ru: '/blog',
    },
    '/blog/[slug]': {
      tr: '/blog/[slug]',
      en: '/blog/[slug]',
      ru: '/blog/[slug]',
    },
    '/blog/tag/[tag]': {
      tr: '/blog/etiket/[tag]',
      en: '/blog/tag/[tag]',
      ru: '/blog/tag/[tag]',
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
