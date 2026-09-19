import { getTranslations } from 'next-intl/server';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { locales } from '@/lib/site';

/**
 * Varsayilan OG gorseli: kendi opengraph-image dosyasi olmayan tum sayfalar (anasayfa, liste,
 * sektor, cozum, sehir, hukuki sayfalar) paylasildiginda gorselsiz kalmasin.
 */
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
  const t = await getTranslations({ locale, namespace: 'pageMeta' });

  return renderOgImage({
    title: t('home.title'),
    description: t('home.description'),
    footnote: 'pitonstudios.com',
  });
}
