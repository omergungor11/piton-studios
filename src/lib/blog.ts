import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { locales, type Locale } from '@/i18n/config';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  cover?: string;
  author: string;
  draft: boolean;
  /** Ayni yazinin diller arasi baglantisi — hreflang ve dil degistirici icin. */
  translationKey: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  locale: Locale;
  content: string;
  readingMinutes: number;
}

export type PostMeta = Omit<Post, 'content'>;

function readPostFile(locale: Locale, fileName: string): Post | null {
  const filePath = path.join(CONTENT_DIR, locale, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const slug = fileName.replace(/\.mdx?$/, '');

  // Zorunlu alanlar eksikse yazi sessizce yok sayilmaz — build'de gorunur hata verir.
  const missing = (['title', 'description', 'date'] as const).filter((k) => !data[k]);
  if (missing.length) {
    throw new Error(
      `[blog] content/blog/${locale}/${fileName} — eksik frontmatter alani: ${missing.join(', ')}`
    );
  }

  return {
    slug,
    locale,
    title: String(data.title),
    description: String(data.description),
    date: toIsoDate(data.date),
    updated: data.updated ? toIsoDate(data.updated) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    author: data.author ? String(data.author) : 'Piton Studios',
    draft: data.draft === true,
    translationKey: data.translationKey ? String(data.translationKey) : slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return new Date(String(value)).toISOString();
}

/** Taslaklar yalnizca development'ta gorunur. */
function isVisible(post: Post): boolean {
  return !post.draft || process.env.NODE_ENV === 'development';
}

function loadLocale(locale: Locale): Post[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readPostFile(locale, f))
    .filter((p): p is Post => p !== null)
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return loadLocale(locale).map(({ content: _content, ...meta }) => meta);
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return loadLocale(locale).find((p) => p.slug === slug);
}

/** generateStaticParams icin — tum diller x tum slug'lar. */
export function getAllPostParams(): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) =>
    loadLocale(locale).map((p) => ({ locale, slug: p.slug }))
  );
}

export function getAllTags(locale: Locale): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of loadLocale(locale)) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(locale: Locale, tag: string): PostMeta[] {
  return getAllPosts(locale).filter((p) =>
    p.tags.some((t) => slugifyTag(t) === slugifyTag(tag))
  );
}

export function getAllTagParams(): { locale: Locale; tag: string }[] {
  return locales.flatMap((locale) =>
    getAllTags(locale).map(({ tag }) => ({ locale, tag: slugifyTag(tag) }))
  );
}

/**
 * Bir yazinin diger dillerdeki karsiliklarini bulur (translationKey uzerinden).
 * hreflang'in dogru calismasi buna bagli.
 */
export function getTranslations(translationKey: string): Partial<Record<Locale, string>> {
  const map: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    const match = loadLocale(locale).find((p) => p.translationKey === translationKey);
    if (match) map[locale] = match.slug;
  }
  return map;
}

const TR_MAP: Record<string, string> = {
  ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u',
  Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u',
};

export function slugifyTag(tag: string): string {
  return tag
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (c) => TR_MAP[c] ?? c)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatPostDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
