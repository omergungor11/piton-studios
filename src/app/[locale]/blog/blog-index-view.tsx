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
import { getAllPosts, getAllTags, getPageCount, paginatePosts, slugifyTag } from '@/lib/blog';
import { blogPageHref } from '@/lib/blog-links';
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata, organizationJsonLd } from '@/lib/seo';
import { SITE_URL, type Locale } from '@/lib/site';

export const BLOG_NAMESPACES = ['blog', 'common'] as const;

/** Blog listesinin tum sayfalarinda ortak govde — /blog ve /blog/sayfa/[page] ayni gorunur. */
export default async function BlogIndexView({ locale, page }: { locale: Locale; page: number }) {
  const t = await getTranslations('blog');
  const messages = await getMessages();

  const allPosts = getAllPosts(locale);
  const totalPages = getPageCount(allPosts.length);
  const posts = paginatePosts(allPosts, page);
  const tags = getAllTags(locale);

  const url = absoluteUrl(locale, blogPageHref(page));
  const prevUrl = page > 1 ? absoluteUrl(locale, blogPageHref(page - 1)) : undefined;
  const nextUrl = page < totalPages ? absoluteUrl(locale, blogPageHref(page + 1)) : undefined;

  const crumbs = [
    { name: 'Piton Studios', url: absoluteUrl(locale, '/') },
    { name: t('title'), url: absoluteUrl(locale, '/blog') },
    ...(page > 1
      ? [{ name: t('pagination.status', { page, total: totalPages }), url }]
      : []),
  ];

  return (
    <NextIntlClientProvider messages={pickMessages(messages, BLOG_NAMESPACES)}>
      {/* React 19 <link> etiketlerini <head>'e tasir — sayfalanmis liste iliskisi. */}
      {prevUrl && <link rel="prev" href={prevUrl} />}
      {nextUrl && <link rel="next" href={nextUrl} />}

      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SITE_URL}/#blog`,
            name: t('title'),
            description: t('metaDescription'),
            url: absoluteUrl(locale, '/blog'),
            inLanguage: locale,
          },
        ]}
      />

      <PageShell>
        <section className="sp-hero">
          <div className="sp-hero-eyebrow" data-reveal="fade-hero">{t('title')}</div>
          <SplitWords as="h1" hero className="sp-hero-title" text={t('subtitle')} />
          <p className="sp-hero-sub" data-reveal="fade-hero" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
            {t('postCount', { count: allPosts.length })}
          </p>
        </section>

        {tags.length > 0 && (
          <nav className="blog-tagbar" aria-label={t('tags')}>
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={{ pathname: '/blog/tag/[tag]', params: { tag: slugifyTag(tag) } }}
                className="blog-tag"
                data-cursor="hover"
              >
                {tag} <span className="blog-tag-count">{count}</span>
              </Link>
            ))}
          </nav>
        )}

        <BlogPostList posts={posts} locale={locale} showTags />

        <BlogPagination page={page} totalPages={totalPages} hrefFor={blogPageHref} />
      </PageShell>
    </NextIntlClientProvider>
  );
}

/** /blog ve /blog/sayfa/[page] icin ortak metadata; 2. sayfadan itibaren baslik/aciklama sayfa bilgisi tasir. */
export async function buildBlogListMetadata(locale: Locale, page: number): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const total = getPageCount(getAllPosts(locale).length);
  const title = t('metaTitle');
  const description = t('metaDescription');

  return buildPageMetadata({
    locale,
    href: blogPageHref(page),
    title: page > 1 ? t('pagination.metaTitle', { title, page }) : title,
    description:
      page > 1 ? t('pagination.metaDescription', { description, page, total }) : description,
  });
}
