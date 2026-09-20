import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import JsonLd from '@/components/json-ld';
import SplitWords from '@/components/motion/split-words';
import BlogPostList from '@/components/blog-post-list';
import BlogPagination from '@/components/blog-pagination';
import {
  getAllTags,
  getPageCount,
  getPostsByTag,
  paginatePosts,
  slugifyTag,
} from '@/lib/blog';
import { blogTagPageHref } from '@/lib/blog-links';
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata, clampText } from '@/lib/seo';
import type { Locale } from '@/lib/site';

const NAMESPACES = ['blog', 'common'] as const;

/** Slug'lastirilmis etiketten okunabilir orijinal etikete geri doner. */
export function displayTag(locale: Locale, tagSlug: string): string | undefined {
  return getAllTags(locale).find(({ tag }) => slugifyTag(tag) === tagSlug)?.tag;
}

/** Etiketin toplam sayfa sayisi. */
export function tagPageCount(locale: Locale, tag: string): number {
  return getPageCount(getPostsByTag(locale, tag).length);
}

/** Etiket listesinin tum sayfalarinda ortak govde. */
export default async function BlogTagView({
  locale,
  tag,
  page,
  label,
}: {
  locale: Locale;
  tag: string;
  page: number;
  label: string;
}) {
  const t = await getTranslations('blog');
  const messages = await getMessages();

  const allPosts = getPostsByTag(locale, tag);
  const totalPages = getPageCount(allPosts.length);
  const posts = paginatePosts(allPosts, page);

  const url = absoluteUrl(locale, blogTagPageHref(tag, page));
  const prevUrl = page > 1 ? absoluteUrl(locale, blogTagPageHref(tag, page - 1)) : undefined;
  const nextUrl = page < totalPages ? absoluteUrl(locale, blogTagPageHref(tag, page + 1)) : undefined;

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      {/* React 19 <link> etiketlerini <head>'e tasir — sayfalanmis liste iliskisi. */}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Piton Studios', url: absoluteUrl(locale, '/') },
          { name: t('title'), url: absoluteUrl(locale, '/blog') },
          { name: label, url: absoluteUrl(locale, blogTagPageHref(tag, 1)) },
          ...(page > 1
            ? [{ name: t('pagination.status', { page, total: totalPages }), url }]
            : []),
        ])}
      />

      <PageShell>
        <section className="sp-hero">
          <div className="sp-hero-eyebrow" data-reveal="fade-hero">{t('tags')}</div>
          <SplitWords as="h1" hero className="sp-hero-title" text={label} />
          <p className="sp-hero-sub" data-reveal="fade-hero" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
            {t('postCount', { count: allPosts.length })}
          </p>
          <Link href="/blog" className="blog-back" data-cursor="hover">
            ← {t('allPosts')}
          </Link>
        </section>

        <BlogPostList posts={posts} locale={locale} emptyKey="emptyTag" />

        <BlogPagination
          page={page}
          totalPages={totalPages}
          hrefFor={(n) => blogTagPageHref(tag, n)}
        />
      </PageShell>
    </NextIntlClientProvider>
  );
}

/** Etiket sayfalarinin ortak metadata'si. Etiketler dile ozgu → hreflang yerine yalnizca canonical. */
export async function buildTagMetadata(
  locale: Locale,
  tag: string,
  page: number,
  label: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const subtitle = t('tagPageSubtitle', { tag: label });
  const allPosts = getPostsByTag(locale, tag);
  const totalPages = getPageCount(allPosts.length);
  const titles = paginatePosts(allPosts, page).map((post) => post.title);
  const description = `${subtitle}: ${titles.join(' · ')}`;

  return buildPageMetadata({
    locale,
    href: blogTagPageHref(tag, page),
    title: page > 1 ? t('pagination.metaTitle', { title: subtitle, page }) : subtitle,
    description: clampText(
      page > 1 ? t('pagination.metaDescription', { description, page, total: totalPages }) : description
    ),
    // Etiketler dile ozgu; ayni slug diger dillerde yok, hreflang yanlis sayfalari gosteriyordu.
    selfOnlyAlternates: true,
  });
}
