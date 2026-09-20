import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { getAllTags, getPageCount, getPostsByTag, parsePageParam, slugifyTag } from '@/lib/blog';
import BlogTagView, { buildTagMetadata, displayTag } from '../../tag-view';
import type { Locale } from '@/lib/site';

type Props = { params: Promise<{ locale: string; tag: string; page: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllTags(locale).flatMap(({ tag }) => {
      const tagSlug = slugifyTag(tag);
      const total = getPageCount(getPostsByTag(locale, tagSlug).length);
      // 1. sayfa /blog/etiket/[tag]'dir; burada yalnizca 2 ve sonrasi uretilir.
      return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
        locale,
        tag: tagSlug,
        page: String(i + 2),
      }));
    })
  );
}

/** Etiket + sayfa gecerliyse ikisini birlikte doner; degilse undefined (→ notFound). */
function resolve(locale: Locale, tag: string, raw: string) {
  const label = displayTag(locale, tag);
  const page = parsePageParam(raw);
  if (!label || !page || page === 1) return undefined;
  if (page > getPageCount(getPostsByTag(locale, tag).length)) return undefined;
  return { label, page };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag, page } = await params;
  const resolved = resolve(locale as Locale, tag, page);
  if (!resolved) return { title: 'Not Found' };

  return buildTagMetadata(locale as Locale, tag, resolved.page, resolved.label);
}

export default async function BlogTagPagedPage({ params }: Props) {
  const { locale, tag, page } = await params;
  setRequestLocale(locale);

  // 1. sayfa ayni icerigi ikinci bir adreste yayinlamasin.
  if (parsePageParam(page) === 1 && displayTag(locale as Locale, tag)) {
    redirect({ href: { pathname: '/blog/tag/[tag]', params: { tag } }, locale });
  }

  const resolved = resolve(locale as Locale, tag, page);
  if (!resolved) notFound();

  return (
    <BlogTagView
      locale={locale as Locale}
      tag={tag}
      page={resolved.page}
      label={resolved.label}
    />
  );
}
