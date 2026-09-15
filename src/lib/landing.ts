/**
 * Sehir (`locations`) ve hizmet x sektor (`solutions`) landing sayfalarinin ortak
 * cozumleyicisi. Yapi `locations.ts` / `solutions.ts`'te, metinler
 * `messages/*.json` → `{namespace}.{slug}` altinda (`sectorItems` ile ayni sozlesme):
 * title, metaTitle, metaDescription, intro, bullets.1..5, painTitle,
 * painPoints.1..3, detail.1..3, ctaText.
 */
import { WORKS, SERVICES, type Work, type Service } from "@/lib/data";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { messageString, sectorFallbackTitle } from "@/lib/sectors";
import type { Locale } from "@/lib/site";

export interface LandingEntry {
  slug: string;
  /** WORKS slug'lari — sayfada gercekten atif yapilan projeler. */
  workSlugs: string[];
  /** SERVICES slug'lari. */
  serviceSlugs: string[];
  /** src/lib/faq.ts FAQ_ITEMS id'leri. */
  faqIds: string[];
  /** Blog `translationKey` degerleri (dosya slug'i dile gore degisir). */
  blogKeys: string[];
}

export type LandingNamespace = "locationItems" | "solutionItems";

export interface LandingText {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro?: string;
  bullets: string[];
  painTitle?: string;
  painPoints: string[];
  detail: string[];
  ctaText?: string;
}

function numbered(messages: unknown, base: readonly string[], key: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    messageString(messages, [...base, key, String(i + 1)])
  ).filter((v): v is string => Boolean(v));
}

export function landingText(
  messages: unknown,
  namespace: LandingNamespace,
  slug: string
): LandingText {
  const base = [namespace, slug] as const;
  const read = (key: string) => messageString(messages, [...base, key]);
  const title = read("title") ?? sectorFallbackTitle(slug);
  const intro = read("intro");
  return {
    title,
    metaTitle: read("metaTitle") ?? title,
    metaDescription: read("metaDescription") ?? intro ?? "",
    intro,
    bullets: numbered(messages, base, "bullets", 5),
    painTitle: read("painTitle"),
    painPoints: numbered(messages, base, "painPoints", 3),
    detail: numbered(messages, base, "detail", 3),
    ctaText: read("ctaText"),
  };
}

export interface LandingRelations {
  works: Work[];
  services: Service[];
  faqLinks: { id: string; q: string }[];
  posts: PostMeta[];
}

/** Slug listelerini gercek kayitlara cozer; bulunamayan/cevrilmemis olan sessizce duser. */
export function landingRelations(
  messages: unknown,
  locale: Locale,
  entry: Pick<LandingEntry, "workSlugs" | "serviceSlugs" | "faqIds" | "blogKeys">
): LandingRelations {
  const works = entry.workSlugs
    .map((slug) => WORKS.find((w) => w.slug === slug))
    .filter((w): w is Work => Boolean(w));
  const services = entry.serviceSlugs
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
  const faqLinks = entry.faqIds
    .map((id) => ({ id, q: messageString(messages, ["faqItems", id, "q"]) }))
    .filter((f): f is { id: string; q: string } => Boolean(f.q));
  const all = getAllPosts(locale);
  const posts = entry.blogKeys
    .map((key) => all.find((p) => p.translationKey === key))
    .filter((p): p is PostMeta => Boolean(p));
  return { works, services, faqLinks, posts };
}
