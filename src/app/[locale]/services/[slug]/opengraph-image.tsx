import { getAllServiceSlugs } from '@/lib/data';
import { getLocalizedService } from '@/lib/content-i18n';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { locales, type Locale } from '@/lib/site';
import { localizeSlug, resolveSlug } from '@/lib/slugs';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Piton Studios';

// URL parcasi dile gore degisir (src/lib/slugs.ts).
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllServiceSlugs().map((id) => ({ locale, slug: localizeSlug('services', id, locale) }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug: urlSlug } = await params;
  const slug = resolveSlug('services', urlSlug, locale);
  const service = slug ? await getLocalizedService(locale as Locale, slug) : null;

  if (!service) {
    return renderOgImage({ title: 'Piton Studios' });
  }

  return renderOgImage({
    title: service.title,
    eyebrow: service.category,
    description: service.description,
  });
}
