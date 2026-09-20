import type { Href } from '@/lib/seo';

/**
 * Sayfalanmis blog adresleri. Tek kaynak: sayfa, metadata, sayfalama bileseni ve
 * sitemap ayni fonksiyondan URL uretir.
 *
 * 1. sayfa her zaman kanonik liste adresidir (/blog, /blog/etiket/[tag]) — sayfa
 * numarali surumu yoktur, sayfalar oraya yonlendirir.
 */
export function blogPageHref(page: number): Href {
  return page <= 1 ? '/blog' : { pathname: '/blog/pages/[page]', params: { page: String(page) } };
}

export function blogTagPageHref(tag: string, page: number): Href {
  return page <= 1
    ? { pathname: '/blog/tag/[tag]', params: { tag } }
    : { pathname: '/blog/tag/[tag]/pages/[page]', params: { tag, page: String(page) } };
}
