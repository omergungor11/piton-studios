import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { pickMessages } from '@/lib/pick-messages';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import JsonLd from '@/components/json-ld';
import {
  getPost,
  getAllPostParams,
  getAllPosts,
  getTranslations as getPostTranslations,
  slugifyTag,
  formatPostDate,
} from '@/lib/blog';
import {
  buildPageMetadata,
  absoluteUrl,
  blogPostingJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from '@/lib/seo';
import { SITE_URL, locales, defaultLocale, type Locale } from '@/lib/site';

const NAMESPACES = ['blog', 'common'] as const;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);
  if (!post) return { title: 'Not Found' };

  const base = buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: '/blog/[slug]', params: { slug } },
    title: post.title,
    description: post.description,
    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    tags: post.tags,
  });

  // hreflang: bir yazinin karsiligi her dilde olmayabilir — yalnizca var olan diller listelenir.
  const translations = getPostTranslations(post.translationKey);
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const translated = translations[l];
    if (translated) {
      languages[l] = absoluteUrl(l, { pathname: '/blog/[slug]', params: { slug: translated } });
    }
  }
  const fallback = translations[defaultLocale] ?? slug;
  languages['x-default'] = absoluteUrl(defaultLocale, {
    pathname: '/blog/[slug]',
    params: { slug: fallback },
  });

  return {
    ...base,
    alternates: {
      canonical: absoluteUrl(locale as Locale, { pathname: '/blog/[slug]', params: { slug } }),
      languages,
    },
  };
}

const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false }],
    ],
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations('blog');
  const messages = await getMessages();
  const url = absoluteUrl(locale as Locale, { pathname: '/blog/[slug]', params: { slug } });

  // Ilgili yazilar: ortak etiket sayisina gore, en fazla 3 tane.
  const related = getAllPosts(locale as Locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, shared: p.tags.filter((tag) => post.tags.includes(tag)).length }))
    .filter((p) => p.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, 3)
    .map((p) => p.post);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          blogPostingJsonLd({
            title: post.title,
            description: post.description,
            url,
            datePublished: post.date,
            dateModified: post.updated,
            image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
            author: post.author,
            tags: post.tags,
            locale: locale as Locale,
          }),
          breadcrumbJsonLd([
            { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
            { name: t('title'), url: absoluteUrl(locale as Locale, '/blog') },
            { name: post.title, url },
          ]),
        ]}
      />

      <PageShell>
        <article className="blog-post">
          <header className="blog-post-head">
            <Link href="/blog" className="blog-back" data-cursor="hover">
              ← {t('backToBlog')}
            </Link>

            <h1 className="blog-post-title">{post.title}</h1>
            <p className="blog-post-desc">{post.description}</p>

            <div className="blog-post-meta">
              <span>{post.author}</span>
              <span className="blog-card-dot">•</span>
              <time dateTime={post.date}>{formatPostDate(post.date, locale as Locale)}</time>
              <span className="blog-card-dot">•</span>
              <span>{t('readingTime', { minutes: post.readingMinutes })}</span>
            </div>

            {post.updated && post.updated !== post.date && (
              <div className="blog-post-updated">
                {t('updatedOn')}: {formatPostDate(post.updated, locale as Locale)}
              </div>
            )}

            {post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={{ pathname: '/blog/tag/[tag]', params: { tag: slugifyTag(tag) } }}
                    className="blog-tag"
                    data-cursor="hover"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="blog-prose">
            <MDXRemote source={post.content} options={mdxOptions} />
          </div>

          {related.length > 0 && (
            <aside className="blog-related">
              <h2 className="blog-related-title">{t('relatedPosts')}</h2>
              <div className="blog-related-grid">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={{ pathname: '/blog/[slug]', params: { slug: p.slug } }}
                    className="blog-related-card"
                    data-cursor="hover"
                  >
                    <span className="blog-related-card-title">{p.title}</span>
                    <span className="blog-related-card-meta">
                      {t('readingTime', { minutes: p.readingMinutes })}
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </PageShell>
    </NextIntlClientProvider>
  );
}
