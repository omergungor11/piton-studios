import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getAllTagParams } from '@/lib/blog';
import BlogTagView, { buildTagMetadata, displayTag } from './tag-view';
import type { Locale } from '@/lib/site';

type Props = { params: Promise<{ locale: string; tag: string }> };

export async function generateStaticParams() {
  return getAllTagParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params;
  const label = displayTag(locale as Locale, tag);
  if (!label) return { title: 'Not Found' };

  return buildTagMetadata(locale as Locale, tag, 1, label);
}

export default async function BlogTagPage({ params }: Props) {
  const { locale, tag } = await params;
  setRequestLocale(locale);

  const label = displayTag(locale as Locale, tag);
  if (!label) notFound();

  return <BlogTagView locale={locale as Locale} tag={tag} page={1} label={label} />;
}
