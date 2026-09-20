import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { absoluteUrl, type Href } from '@/lib/seo';
import { getAllProjectSlugs, getAllServiceSlugs } from '@/lib/data';
import { getAllSectorSlugs } from '@/lib/sectors';
import { getAllLocationSlugs } from '@/lib/locations';
import { getAllSolutionSlugs } from '@/lib/solutions';
import { getAllPosts, getAllTags, getPageCount, getPostsByTag, slugifyTag } from '@/lib/blog';
import { blogPageHref, blogTagPageHref } from '@/lib/blog-links';
import { LEGAL_READY } from '@/lib/legal';

type Entry = MetadataRoute.Sitemap[number];

/**
 * Bir rotayi her dil icin ayri sitemap girdisine cevirir.
 * Google her dil surumunun kendi <url> girdisi olmasini, her birinin de
 * tum alternatifleri listelemesini bekler.
 */
function entries(
  href: Href,
  opts: { changeFrequency?: Entry['changeFrequency']; priority?: number; lastModified?: Date } = {}
): Entry[] {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = absoluteUrl(locale, href);
  }
  languages['x-default'] = absoluteUrl(defaultLocale, href);

  return locales.map((locale) => ({
    url: absoluteUrl(locale, href),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'monthly',
    priority: opts.priority ?? 0.5,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const all: Entry[] = [
    ...entries('/', { changeFrequency: 'weekly', priority: 1 }),
    ...entries('/projects', { changeFrequency: 'weekly', priority: 0.9 }),
    ...entries('/services', { changeFrequency: 'monthly', priority: 0.9 }),
    ...entries('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    ...entries('/faq', { changeFrequency: 'monthly', priority: 0.8 }),
    ...entries('/pricing', { changeFrequency: 'monthly', priority: 0.8 }),
    ...entries('/sectors', { changeFrequency: 'monthly', priority: 0.7 }),
    ...entries('/solutions', { changeFrequency: 'monthly', priority: 0.7 }),
    ...entries('/locations', { changeFrequency: 'monthly', priority: 0.6 }),
    ...entries('/about', { changeFrequency: 'yearly', priority: 0.6 }),
    ...entries('/contact', { changeFrequency: 'yearly', priority: 0.7 }),
    // Hukuki sayfalar yalnizca veri sorumlusu bilgisi tamamsa yayinda.
    ...(LEGAL_READY
      ? [
          ...entries('/privacy', { changeFrequency: 'yearly', priority: 0.3 }),
          ...entries('/cookies', { changeFrequency: 'yearly', priority: 0.3 }),
          ...entries('/terms', { changeFrequency: 'yearly', priority: 0.3 }),
        ]
      : []),
  ];

  for (const slug of getAllProjectSlugs()) {
    all.push(
      ...entries({ pathname: '/projects/[slug]', params: { slug } }, { priority: 0.7 })
    );
  }

  for (const slug of getAllSectorSlugs()) {
    all.push(
      ...entries({ pathname: '/sectors/[slug]', params: { slug } }, { priority: 0.7 })
    );
  }

  for (const slug of getAllSolutionSlugs()) {
    all.push(
      ...entries({ pathname: '/solutions/[slug]', params: { slug } }, { priority: 0.7 })
    );
  }

  for (const slug of getAllLocationSlugs()) {
    all.push(
      ...entries({ pathname: '/locations/[slug]', params: { slug } }, { priority: 0.6 })
    );
  }

  for (const slug of getAllServiceSlugs()) {
    all.push(
      ...entries({ pathname: '/services/[slug]', params: { slug } }, { priority: 0.8 })
    );
  }

  // Sayfalanmis blog listesi (2. sayfadan itibaren; 1. sayfa /blog girdisidir).
  // Yazi sayisi dile gore degisebilir: sayfa her dilde varsa hreflang'li ortak girdi,
  // degilse yalnizca o dilin tekil girdisi uretilir — hreflang kirik hedef gostermesin.
  const blogPages = new Map(locales.map((locale) => [locale, getPageCount(getAllPosts(locale).length)]));
  const maxBlogPages = Math.max(...blogPages.values());
  for (let page = 2; page <= maxBlogPages; page++) {
    const href = blogPageHref(page);
    const present = locales.filter((locale) => (blogPages.get(locale) ?? 1) >= page);
    if (present.length === locales.length) {
      all.push(...entries(href, { changeFrequency: 'weekly', priority: 0.5 }));
    } else {
      for (const locale of present) {
        all.push({
          url: absoluteUrl(locale, href),
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        });
      }
    }
  }

  // Blog yazilari dil basina bagimsiz — her dilde ayni yazi olmayabilir,
  // bu yuzden alternates yerine dil basina tekil girdi uretiliyor.
  for (const locale of locales) {
    for (const post of getAllPosts(locale)) {
      all.push({
        url: absoluteUrl(locale, { pathname: '/blog/[slug]', params: { slug: post.slug } }),
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    // Etiketler dile ozgu (hreflang yok) — sayfalanmis surumleri de dil basina tekil girdi.
    for (const { tag } of getAllTags(locale)) {
      const tagSlug = slugifyTag(tag);
      const pages = getPageCount(getPostsByTag(locale, tagSlug).length);
      for (let page = 1; page <= pages; page++) {
        all.push({
          url: absoluteUrl(locale, blogTagPageHref(tagSlug, page)),
          changeFrequency: 'weekly',
          priority: page === 1 ? 0.4 : 0.3,
        });
      }
    }
  }

  return all;
}
