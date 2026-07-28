import { getTranslations } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/seo';
import { SITE, locales, type Locale } from '@/lib/site';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return new Response('Not found', { status: 404 });
  }

  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts(locale as Locale);
  const feedUrl = `${SITE.url}/${locale}/rss.xml`;
  const blogUrl = absoluteUrl(locale as Locale, '/blog');

  const items = posts
    .map((post) => {
      const url = absoluteUrl(locale as Locale, {
        pathname: '/blog/[slug]',
        params: { slug: post.slug },
      });
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${escapeXml(SITE.email)} (${escapeXml(post.author)})</author>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} — ${t('title')}`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(t('metaDescription'))}</description>
    <language>${locale}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
