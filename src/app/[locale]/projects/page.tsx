import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { WORKS } from "@/lib/data";
import { getLocalizedProject } from "@/lib/content-i18n";
import type { Locale } from "@/lib/site";
import ProjectsPageClient from "./page-client";

const NAMESPACES = ["projectsPage", "delivery", "areas", "works", "spark", "common"] as const;

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

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const l = locale as Locale;
  const tm = await getTranslations({ locale, namespace: "pageMeta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(l, "/projects");
  const items = await Promise.all(
    WORKS.map(async (work) => ({
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
            { name: "Piton Studios", url: absoluteUrl(l, "/") },
            { name: tc("projects"), url },
          ],
          items,
        })}
      />
      <ProjectsPageClient />
    </NextIntlClientProvider>
  );
}
