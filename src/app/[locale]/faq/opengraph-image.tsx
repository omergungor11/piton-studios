import { getTranslations } from 'next-intl/server';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { FAQ_COUNT } from '@/lib/faq';
import { locales } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Piton Studios';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faqPage' });

  return renderOgImage({
    title: t('subtitle'),
    eyebrow: t('title'),
    description: t('lead'),
    footnote: t('countLabel', { count: FAQ_COUNT }),
  });
}
