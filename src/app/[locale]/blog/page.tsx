import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import JsonLd from '@/components/json-ld';
import { getAllPosts, getAllTags, slugifyTag, formatPostDate } from '@/lib/blog';
import { buildPageMetadata, absoluteUrl, breadcrumbJsonLd, organizationJsonLd } from '@/lib/seo';
import { SITE_URL, type Locale } from '@/lib/site';

const NAMESPACES = ['blog', 'common'] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/blog',
    title: t('metaTitle'),
    description: t('metaDescription'),
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const messages = await getMessages();
  const posts = getAllPosts(locale as Locale);
  const tags = getAllTags(locale as Locale);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
            { name: t('title'), url: absoluteUrl(locale as Locale, '/blog') },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SITE_URL}/#blog`,
            name: t('title'),
            description: t('metaDescription'),
            url: absoluteUrl(locale as Locale, '/blog'),
            inLanguage: locale,
          },
        ]}
      />

      <PageShell>
        <section className="sp-hero">
          <div className="sp-hero-eyebrow">{t('title')}</div>
          <h1 className="sp-hero-title">{t('subtitle')}</h1>
          <p className="sp-hero-sub">{t('postCount', { count: posts.length })}</p>
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

        <section className="blog-list">
          {posts.length === 0 && <p className="blog-empty">{t('empty')}</p>}

          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                className="blog-card-link"
                data-cursor="hover"
              >
                <div className="blog-card-meta">
                  <time dateTime={post.date}>{formatPostDate(post.date, locale as Locale)}</time>
                  <span className="blog-card-dot">•</span>
                  <span>{t('readingTime', { minutes: post.readingMinutes })}</span>
                </div>
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-desc">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="blog-card-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="blog-card-more">{t('readMore')} →</span>
              </Link>
            </article>
          ))}
        </section>
      </PageShell>
    </NextIntlClientProvider>
  );
}
