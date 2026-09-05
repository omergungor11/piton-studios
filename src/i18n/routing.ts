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
    '/projects-v2': {
      tr: '/projeler-v2',
      en: '/projects-v2',
      ru: '/projects-v2',
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
    '/pricing': {
      tr: '/fiyatlandirma',
      en: '/pricing',
      ru: '/pricing',
    },
    '/sectors': {
      tr: '/sektorler',
      en: '/sectors',
      ru: '/sectors',
    },
    '/sectors/[slug]': {
      tr: '/sektorler/[slug]',
      en: '/sectors/[slug]',
      ru: '/sectors/[slug]',
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
    '/faq': {
      tr: '/sss',
      en: '/faq',
      ru: '/faq',
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
