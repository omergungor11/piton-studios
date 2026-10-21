import { getImageProps } from 'next/image';
import { getTranslations } from 'next-intl/server';
import { WORKS } from '@/lib/data';
import type { ProjectCloudItem } from '@/components/projects-v2/project-cloud-canvas';

/**
 * 3B proje bulutunda gosterilen secili projeler: projeler sayfasindaki ekran goruntusu
 * seridinin ilk 15'i (WORKS sirasi). Sira helis uzerindeki sirayi belirler;
 * `format` hangi preview'in (desktop 1440x810 / mobile 430x928) texture olacagini secer.
 * Ilk 7'si kaydirmayla one gelir (project-cloud-section DEFAULT_SCROLL_COUNT); kalan 8
 * helisin arka kollarinda dekor + hover/tiklama ile erisilebilir durur.
 * Tum WORKS'u yuklememek performans butcesinin parcasi (bkz. piton-plans/projects-v2-*).
 */
export const PROJECT_CLOUD_SELECTION = [
  { slug: 'evolve', format: 'landscape' },
  { slug: 'coffi', format: 'landscape' },
  { slug: 'karga', format: 'landscape' },
  { slug: 'neuneu', format: 'landscape' },
  { slug: 'naiben', format: 'landscape' },
  { slug: 'kabizzu', format: 'landscape' },
  { slug: 'fur-crm', format: 'portrait' },
  { slug: 'bt-elevator', format: 'landscape' },
  { slug: 'gel-gez-gor', format: 'portrait' },
  { slug: 'nexos-investment', format: 'landscape' },
  { slug: 'alp-sigorta', format: 'landscape' },
  { slug: 'ambalaj-cini', format: 'landscape' },
  { slug: 'velair-experience', format: 'landscape' },
  { slug: 'velis-ltd', format: 'landscape' },
  { slug: '3monkeys-bozuyuk', format: 'landscape' },
] as const;

/**
 * Doku adresi: ham 1440px dosya yerine Next image optimizer (~3x kucuk, tarayici cache'li).
 * getImageProps src olarak 2x adayini verir: 540 -> w=1080 (masaustu en buyuk kart icin yeter),
 * portrait 320 -> w=640 (kaynak 430px, buyutulmez).
 */
function textureUrl(src: string, portrait: boolean): string {
  return getImageProps(portrait
    ? { src, alt: '', width: 320, height: 691 }
    : { src, alt: '', width: 540, height: 304 }).props.src;
}

/** Server tarafinda calisir: secili projeleri locale'e gore cevrilmis bulut kayitlarina donusturur. */
export async function buildProjectCloudItems(locale: string): Promise<ProjectCloudItem[]> {
  const tw = await getTranslations({ locale, namespace: 'works' });

  return PROJECT_CLOUD_SELECTION.flatMap<ProjectCloudItem>(({ slug, format }, index) => {
    const work = WORKS.find((candidate) => candidate.slug === slug);
    if (!work) return [];

    const image = `/assets/previews/${format === 'portrait' ? 'mobile' : 'desktop'}/${work.slug}.webp`;
    return [{
      id: work.slug,
      number: work.n,
      slug: work.slug,
      title: tw.has(`${work.slug}.title`) ? tw(`${work.slug}.title`) : work.title,
      kind: tw.has(`${work.slug}.kind`) ? tw(`${work.slug}.kind`) : work.kind,
      year: work.year,
      image,
      texture: textureUrl(image, format === 'portrait'),
      format,
      accent: index % 2 === 0 ? 'red' : 'cyan',
    }];
  });
}
