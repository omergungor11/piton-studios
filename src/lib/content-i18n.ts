import { getMessages } from 'next-intl/server';
import { getProjectBySlug, getServiceBySlug } from '@/lib/data';
import type { Locale } from '@/lib/site';

/**
 * data.ts icerigi Turkce sabitler tutuyor; gercek ceviriler src/messages/*.json altinda.
 * Metadata ve OG gorselleri bu ceviriden okunmali — aksi halde en/ru sayfalari
 * Turkce baslik ve aciklama ile indexleniyor.
 *
 * Ceviri bulunamazsa data.ts degerine duser (sessiz bozulma yerine gorunur fallback).
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pick(messages: any, namespace: string, slug: string): any {
  const ns = messages?.[namespace];
  if (!ns || typeof ns !== 'object') return undefined;
  return ns[slug];
}

export interface LocalizedProject {
  title: string;
  description: string;
  body: string[];
  year?: string;
  client?: string;
  tags: string[];
  image?: string;
}

export async function getLocalizedProject(
  locale: Locale,
  slug: string
): Promise<LocalizedProject | undefined> {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;

  const messages = await getMessages({ locale });
  const namespace = project.type === 'work' ? 'works' : 'stories';
  const translated = pick(messages, namespace, slug);

  const fallbackDescription =
    project.type === 'work' ? project.summary : project.sub;

  return {
    title: translated?.title ?? project.title,
    description: translated?.summary ?? translated?.sub ?? fallbackDescription,
    body: Array.isArray(translated?.body) ? translated.body : project.body,
    year: project.year,
    client: project.type === 'work' ? project.client : project.client,
    tags: project.tags,
    image: project.image,
  };
}

export interface LocalizedService {
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  faq: { q: string; a: string }[];
}

export async function getLocalizedService(
  locale: Locale,
  slug: string
): Promise<LocalizedService | undefined> {
  const service = getServiceBySlug(slug);
  if (!service) return undefined;

  const messages = await getMessages({ locale });
  const translated = pick(messages, 'servicesList', slug);

  return {
    title: translated?.title ?? service.title,
    description: translated?.desc ?? service.desc,
    longDescription: translated?.longDesc ?? service.longDesc,
    category: service.cat,
    faq: Array.isArray(translated?.faq) ? translated.faq : service.faq,
  };
}
