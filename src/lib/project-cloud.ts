import { getTranslations } from 'next-intl/server';
import { WORKS } from '@/lib/data';
import type { ProjectCloudItem } from '@/components/projects-v2/project-cloud-canvas';

/**
 * 3B proje bulutunda gosterilen secili projeler. Sira helis uzerindeki sirayi belirler;
 * `format` hangi preview'in (desktop 1440x810 / mobile 430x928) texture olacagini secer.
 * 2026-09-05: 15 → 7 proje (kullanici karari: daha az texture, daha akici sahne).
 * Tum WORKS'u yuklememek performans butcesinin parcasi (bkz. piton-plans/projects-v2-*).
 */
export const PROJECT_CLOUD_SELECTION = [
  { slug: 'fur-crm', format: 'landscape' },
  { slug: 'pinnacle-yatirim', format: 'portrait' },
  { slug: 'nexos-investment', format: 'landscape' },
  { slug: 'sammys-hotel', format: 'landscape' },
  { slug: 'radyo-juke', format: 'portrait' },
  { slug: 'gel-gez-gor', format: 'landscape' },
  { slug: 'alp-sigorta', format: 'landscape' },
] as const;

/** Server tarafinda calisir: secili projeleri locale'e gore cevrilmis bulut kayitlarina donusturur. */
export async function buildProjectCloudItems(locale: string): Promise<ProjectCloudItem[]> {
  const tw = await getTranslations({ locale, namespace: 'works' });

  return PROJECT_CLOUD_SELECTION.flatMap<ProjectCloudItem>(({ slug, format }, index) => {
    const work = WORKS.find((candidate) => candidate.slug === slug);
    if (!work) return [];

    return [{
      id: work.slug,
      number: work.n,
      slug: work.slug,
      title: tw.has(`${work.slug}.title`) ? tw(`${work.slug}.title`) : work.title,
      kind: tw.has(`${work.slug}.kind`) ? tw(`${work.slug}.kind`) : work.kind,
      year: work.year,
      image: `/assets/previews/${format === 'portrait' ? 'mobile' : 'desktop'}/${work.slug}.webp`,
      format,
      accent: index % 2 === 0 ? 'red' : 'cyan',
    }];
  });
}
