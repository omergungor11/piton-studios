import type { Metadata } from "next";
import type { ReactElement } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { WORKS, type Work } from "@/lib/data";
import { PROJECT_LIST_WORKS, SHOWCASE_HIDDEN_SLUGS } from "@/lib/project-list";
import { AREA_KEYS, isInArea } from "@/lib/studio-stats";
import { getLocalizedProject } from "@/lib/content-i18n";
import type { Locale } from "@/lib/site";
import ProjectsPageClient from "./page-client";
import type {
  DeliveryExample,
  ProjectArea,
  ProjectListingRow,
  ProjectShowcaseItem,
} from "./page-client";

const NAMESPACES = ["projectsPage", "delivery", "spark", "common"] as const;

const DELIVERY_EXAMPLE_SLUGS = {
  discovery: "emlak-sync",
  design: "fur-crm",
  build: "nexos-investment",
  test: "deprem-erken-uyari",
  launch: "odeme-takip-botu",
  grow: "ambalaj-cini",
} as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/projects",
    title: t("projects.title"),
    description: t("projects.description"),
  });
}

export default async function Page({ params }: Props): Promise<ReactElement> {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const [messages, tm, tc, tw, ta] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: "pageMeta" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "works" }),
    getTranslations({ locale, namespace: "areas" }),
  ]);

  const localizedTitle = (work: Work): string =>
    tw.has(`${work.slug}.title`) ? tw(`${work.slug}.title`) : work.title;
  const localizedKind = (work: Work): string =>
    tw.has(`${work.slug}.kind`) ? tw(`${work.slug}.kind`) : work.kind;

  // Tam proje govdeleri ve ceviri kataloglari istemciye gecmez; filtre icin
  // alan uyeligi sunucuda hesaplanir, sira ve ortusen alanlar aynen korunur.
  const projects: ProjectListingRow[] = PROJECT_LIST_WORKS.map((work) => ({
    n: work.n,
    slug: work.slug,
    title: localizedTitle(work),
    client: work.client,
    kind: localizedKind(work),
    year: work.year,
    preview: work.previews?.desktop,
    areas: AREA_KEYS.filter((key) => isInArea(work, key)),
  }));
  const previews: ProjectShowcaseItem[] = WORKS.flatMap((work): ProjectShowcaseItem[] => {
    const desktop = work.previews?.desktop;
    if (!desktop || SHOWCASE_HIDDEN_SLUGS.has(work.slug)) return [];
    return [{
      n: work.n,
      slug: work.slug,
      title: localizedTitle(work),
      desktop,
      mobile: work.previews?.mobile,
    }];
  });
  const areas: ProjectArea[] = AREA_KEYS.map((key) => ({
    key,
    label: ta(`${key}.label`),
    count: projects.filter((work) => work.areas.includes(key)).length,
  }));
  const deliveryExamples: Readonly<Record<string, DeliveryExample>> = Object.fromEntries(
    Object.entries(DELIVERY_EXAMPLE_SLUGS).map(([step, slug]): [string, DeliveryExample] => {
      const work = WORKS.find((project) => project.slug === slug);
      if (!work) throw new Error(`Delivery example project not found: ${slug}`);
      return [step, { slug, title: localizedTitle(work), kind: localizedKind(work) }];
    })
  );
  const url = absoluteUrl(l, "/projects");
  const items = await Promise.all(
    PROJECT_LIST_WORKS.map(async (work) => ({
      name: (await getLocalizedProject(l, work.slug))?.title ?? work.title,
      url: absoluteUrl(l, { pathname: "/projects/[slug]", params: { slug: work.slug } }),
    }))
  );

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={listingPageJsonLd({
          url,
          name: tm("projects.title"),
          description: tm("projects.description"),
          locale: l,
          crumbs: [
            { name: "Piton", url: absoluteUrl(l, "/") },
            { name: tc("projects"), url },
          ],
          items,
        })}
      />
      <ProjectsPageClient
        projects={projects}
        previews={previews}
        areas={areas}
        deliveryExamples={deliveryExamples}
      />
    </NextIntlClientProvider>
  );
}
