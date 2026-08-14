import type { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { absoluteUrl, type Href } from '@/lib/seo';
import { getAllProjectSlugs, getAllServiceSlugs } from '@/lib/data';
import { getAllPosts, getAllTags, slugifyTag } from '@/lib/blog';

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
    ...entries('/about', { changeFrequency: 'yearly', priority: 0.6 }),
    ...entries('/contact', { changeFrequency: 'yearly', priority: 0.7 }),
  ];

  for (const slug of getAllProjectSlugs()) {
    all.push(
      ...entries({ pathname: '/projects/[slug]', params: { slug } }, { priority: 0.7 })
    );
  }

  for (const slug of getAllServiceSlugs()) {
    all.push(
      ...entries({ pathname: '/services/[slug]', params: { slug } }, { priority: 0.8 })
    );
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

    for (const { tag } of getAllTags(locale)) {
      all.push({
        url: absoluteUrl(locale, {
          pathname: '/blog/tag/[tag]',
          params: { tag: slugifyTag(tag) },
        }),
        changeFrequency: 'weekly',
        priority: 0.4,
      });
    }
  }

  return all;
}
