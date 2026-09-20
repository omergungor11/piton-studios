import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogIndexView, { buildBlogListMetadata } from './blog-index-view';
import type { Locale } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildBlogListMetadata(locale as Locale, 1);
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogIndexView locale={locale as Locale} page={1} />;
}
