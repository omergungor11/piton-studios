import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

/**
 * Dil basina yol segmentleri. ru segmentleri 2026-09-15'te Latin harf cevirisine gecti
 * (eski ingilizce ru adresleri next.config.ts'te kalici yonlendiriliyor).
 * [slug] parametrelerinin dile gore cevirisi: src/lib/slugs.ts.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames: {
    '/': '/',
    '/projects': {
      tr: '/projeler',
      en: '/projects',
      ru: '/proekty',
    },
    '/projects-v2': {
      tr: '/projeler-v2',
      en: '/projects-v2',
      ru: '/proekty-v2',
    },
    '/projects/[slug]': {
      tr: '/projeler/[slug]',
      en: '/projects/[slug]',
      ru: '/proekty/[slug]',
    },
    '/services': {
      tr: '/hizmetler',
      en: '/services',
      ru: '/uslugi',
    },
    '/services/[slug]': {
      tr: '/hizmetler/[slug]',
      en: '/services/[slug]',
      ru: '/uslugi/[slug]',
    },
    '/pricing': {
      tr: '/fiyatlandirma',
      en: '/pricing',
      ru: '/tseny',
    },
    '/sectors': {
      tr: '/sektorler',
      en: '/sectors',
      ru: '/otrasli',
    },
    '/sectors/[slug]': {
      tr: '/sektorler/[slug]',
      en: '/sectors/[slug]',
      ru: '/otrasli/[slug]',
    },
    '/locations': {
      tr: '/bolgeler',
      en: '/locations',
      ru: '/regiony',
    },
    '/locations/[slug]': {
      tr: '/web-tasarim/[slug]',
      en: '/web-design/[slug]',
      ru: '/veb-dizayn/[slug]',
    },
    '/solutions': {
      tr: '/cozumler',
      en: '/solutions',
      ru: '/resheniya',
    },
    '/solutions/[slug]': {
      tr: '/cozumler/[slug]',
      en: '/solutions/[slug]',
      ru: '/resheniya/[slug]',
    },
    '/blog': {
      tr: '/blog',
      en: '/blog',
      ru: '/blog',
    },
    // Sayfalanmis blog listesi. Sayfa numarasi dilden bagimsiz (2, 3 ...), yalnizca
    // segment cevriliyor. 1. sayfa hep /blog'dur; /blog/sayfa/1 oraya yonlendirilir.
    '/blog/pages/[page]': {
      tr: '/blog/sayfa/[page]',
      en: '/blog/page/[page]',
      ru: '/blog/stranitsa/[page]',
    },
    '/blog/[slug]': {
      tr: '/blog/[slug]',
      en: '/blog/[slug]',
      ru: '/blog/[slug]',
    },
    '/blog/tag/[tag]': {
      tr: '/blog/etiket/[tag]',
      en: '/blog/tag/[tag]',
      ru: '/blog/teg/[tag]',
    },
    '/blog/tag/[tag]/pages/[page]': {
      tr: '/blog/etiket/[tag]/sayfa/[page]',
      en: '/blog/tag/[tag]/page/[page]',
      ru: '/blog/teg/[tag]/stranitsa/[page]',
    },
    '/faq': {
      tr: '/sss',
      en: '/faq',
      ru: '/voprosy',
    },
    '/about': {
      tr: '/hakkinda',
      en: '/about',
      ru: '/o-nas',
    },
    '/contact': {
      tr: '/iletisim',
      en: '/contact',
      ru: '/kontakty',
    },
    '/privacy': {
      tr: '/gizlilik-politikasi',
      en: '/privacy',
      ru: '/konfidentsialnost',
    },
    '/cookies': {
      tr: '/cerez-politikasi',
      en: '/cookies',
      ru: '/cookie-fayly',
    },
    '/terms': {
      tr: '/kullanim-kosullari',
      en: '/terms',
      ru: '/usloviya-ispolzovaniya',
    },
  },
});
