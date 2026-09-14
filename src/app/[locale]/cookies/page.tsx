import type { Metadata } from 'next';
import LegalPageView, { buildLegalMetadata } from '@/components/legal-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalMetadata(locale, 'cookies');
}

export default async function CookiesPage({ params }: Props) {
  const { locale } = await params;
  return <LegalPageView locale={locale} page="cookies" />;
}
