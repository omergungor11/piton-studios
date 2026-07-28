import { getAllServiceSlugs } from '@/lib/data';
import { getLocalizedService } from '@/lib/content-i18n';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { locales, type Locale } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Piton Studios';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllServiceSlugs().map((slug) => ({ locale, slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = await getLocalizedService(locale as Locale, slug);

  if (!service) {
    return renderOgImage({ title: 'Piton Studios' });
  }

  return renderOgImage({
    title: service.title,
    eyebrow: service.category,
    description: service.description,
  });
}
