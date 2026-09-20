import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { getAllPosts, getPageCount, parsePageParam } from '@/lib/blog';
import BlogIndexView, { buildBlogListMetadata } from '../../blog-index-view';
import type { Locale } from '@/lib/site';

type Props = { params: Promise<{ locale: string; page: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => {
    const total = getPageCount(getAllPosts(locale).length);
    // 1. sayfa /blog'dur; burada yalnizca 2 ve sonrasi uretilir.
    return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
      locale,
      page: String(i + 2),
    }));
  });
}

/** Rota disi sayfa numarasi (0, 99, "abc", 1) → undefined; 1 ayrica /blog'a yonlendirilir. */
function resolvePage(locale: Locale, raw: string): number | undefined {
  const page = parsePageParam(raw);
  if (!page || page === 1) return undefined;
  return page <= getPageCount(getAllPosts(locale).length) ? page : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  const resolved = resolvePage(locale as Locale, page);
  if (!resolved) return { title: 'Not Found' };

  return buildBlogListMetadata(locale as Locale, resolved);
}

export default async function BlogPagedPage({ params }: Props) {
  const { locale, page } = await params;
  setRequestLocale(locale);

  // /blog/sayfa/1 ayni icerigi ikinci bir adreste yayinlamasin.
  if (parsePageParam(page) === 1) redirect({ href: '/blog', locale });

  const resolved = resolvePage(locale as Locale, page);
  if (!resolved) notFound();

  return <BlogIndexView locale={locale as Locale} page={resolved} />;
}
