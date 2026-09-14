import type { Metadata } from 'next';
import LegalPageView, { buildLegalMetadata } from '@/components/legal-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildLegalMetadata(locale, 'privacy');
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  return <LegalPageView locale={locale} page="privacy" />;
}
