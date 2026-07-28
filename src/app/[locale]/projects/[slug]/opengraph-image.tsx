import { getAllProjectSlugs } from '@/lib/data';
import { getLocalizedProject } from '@/lib/content-i18n';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import { locales, type Locale } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Piton Studios';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getLocalizedProject(locale as Locale, slug);

  if (!project) {
    return renderOgImage({ title: 'Piton Studios' });
  }

  return renderOgImage({
    title: project.title,
    eyebrow: project.tags[0],
    description: project.description,
    footnote: [project.client, project.year].filter(Boolean).join(' · '),
  });
}
