import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { pickMessages } from '@/lib/pick-messages';
import { Link } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import JsonLd from '@/components/json-ld';
import BlogToc from '@/components/blog-toc';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { legalMdxComponents } from '@/components/mdx/legal-components';
import { extractHeadings } from '@/lib/blog';
import { LEGAL, LEGAL_HREF, LEGAL_PAGES, LEGAL_READY, type LegalPage } from '@/lib/legal';
import { getLegalDocument } from '@/lib/legal-content';
import {
  buildPageMetadata,
  absoluteUrl,
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from '@/lib/seo';
import type { Locale } from '@/lib/site';

const mdxOptions: MDXRemoteProps['options'] = {
  // Blog ile ayni sebep: component'lere JSX ifadesi gecebilmek icin JS acik kalmali.
  blockJS: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

export async function buildLegalMetadata(locale: string, page: LegalPage): Promise<Metadata> {
  if (!LEGAL_READY) return { title: 'Not Found', robots: { index: false, follow: false } };

  const doc = getLegalDocument(locale as Locale, page);
  return buildPageMetadata({
    locale: locale as Locale,
    href: LEGAL_HREF[page],
    title: doc.title,
    description: doc.description,
  });
}

export default async function LegalPageView({ locale, page }: { locale: string; page: LegalPage }) {
  setRequestLocale(locale);
  // Veri sorumlusu bilgisi eksikse metin yayina cikmaz.
  if (!LEGAL_READY) notFound();

  const doc = getLegalDocument(locale as Locale, page);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'legal' });
  const url = absoluteUrl(locale as Locale, LEGAL_HREF[page]);
  const headings = extractHeadings(doc.content);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ['common'] as const)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            url,
            name: doc.title,
            description: doc.description,
            locale: locale as Locale,
            dateModified: LEGAL.updated,
          }),
          breadcrumbJsonLd([
            { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
            { name: doc.title, url },
          ]),
        ]}
      />

      <PageShell>
        <article className="blog-post legal-page">
          <header className="blog-post-head">
            <h1 className="blog-post-title">{doc.title}</h1>
            <p className="blog-post-desc">{doc.description}</p>
          </header>

          {headings.length > 2 && <BlogToc title={t('toc')} headings={headings} />}

          <div className="blog-prose">
            <MDXRemote
              source={doc.content}
              options={mdxOptions}
              components={{ ...mdxComponents, ...legalMdxComponents(locale as Locale) }}
            />
          </div>

          <nav className="legal-nav" aria-label={t('navLabel')}>
            {LEGAL_PAGES.filter((p) => p !== page).map((p) => (
              <Link key={p} href={LEGAL_HREF[p]} className="legal-nav-link" data-cursor="hover">
                {t(p)} →
              </Link>
            ))}
          </nav>
        </article>
      </PageShell>
    </NextIntlClientProvider>
  );
}
