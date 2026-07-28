import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import JsonLd from '@/components/json-ld';
import {
  getPostsByTag,
  getAllTagParams,
  getAllTags,
  slugifyTag,
  formatPostDate,
} from '@/lib/blog';
import { buildPageMetadata, absoluteUrl, breadcrumbJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';

const NAMESPACES = ['blog', 'common'] as const;

type Props = { params: Promise<{ locale: string; tag: string }> };

export async function generateStaticParams() {
  return getAllTagParams();
}

/** Slug'lastirilmis etiketten okunabilir orijinal etikete geri doner. */
function displayTag(locale: Locale, tagSlug: string): string | undefined {
  return getAllTags(locale).find(({ tag }) => slugifyTag(tag) === tagSlug)?.tag;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  const label = displayTag(locale as Locale, tag);
  if (!label) return { title: 'Not Found' };

  const t = await getTranslations({ locale, namespace: 'blog' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: '/blog/tag/[tag]', params: { tag } },
    title: t('tagPageSubtitle', { tag: label }),
    description: t('tagPageSubtitle', { tag: label }),
  });
}

export default async function BlogTagPage({ params }: Props) {
  const { locale, tag } = await params;
  setRequestLocale(locale);

  const label = displayTag(locale as Locale, tag);
  if (!label) notFound();

  const t = await getTranslations('blog');
  const messages = await getMessages();
  const posts = getPostsByTag(locale as Locale, tag);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
          { name: t('title'), url: absoluteUrl(locale as Locale, '/blog') },
          {
            name: label,
            url: absoluteUrl(locale as Locale, {
              pathname: '/blog/tag/[tag]',
              params: { tag },
            }),
          },
        ])}
      />

      <PageShell>
        <section className="sp-hero">
          <div className="sp-hero-eyebrow">{t('tags')}</div>
          <h1 className="sp-hero-title">{label}</h1>
          <p className="sp-hero-sub">{t('postCount', { count: posts.length })}</p>
          <Link href="/blog" className="blog-back" data-cursor="hover">
            ← {t('allPosts')}
          </Link>
        </section>

        <section className="blog-list">
          {posts.length === 0 && <p className="blog-empty">{t('emptyTag')}</p>}

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
                <span className="blog-card-more">{t('readMore')} →</span>
              </Link>
            </article>
          ))}
        </section>
      </PageShell>
    </NextIntlClientProvider>
  );
}
