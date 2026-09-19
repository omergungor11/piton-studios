import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import ProjectDetail from "@/components/project-detail";
import JsonLd from "@/components/json-ld";
import { getLocalizedProject } from "@/lib/content-i18n";
import { getSolutionsByWork } from "@/lib/solutions";
import { landingText } from "@/lib/landing";
import {
  buildPageMetadata,
  absoluteUrl,
  creativeWorkJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/lib/site";

const NAMESPACES = ["projectDetail", "works", "stories", "common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const localized = await getLocalizedProject(locale as Locale, slug);
  if (!localized) return { title: "Not Found" };
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    ownOgImage: true,
    locale: locale as Locale,
    href: { pathname: "/projects/[slug]", params: { slug } },
    // Proje adlari uc dilde ayni; sablon basligi dile ozgu kilar.
    title: t("projectTitle", { title: localized.title }),
    // Kart ozetleri 40-70 karakter; arama sonucu icin tek basina fazla kisa.
    description:
      localized.description.length + t("projectDescSuffix").length < 160
        ? `${localized.description} ${t("projectDescSuffix")}`
        : localized.description,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const messages = await getMessages();
  const localized = await getLocalizedProject(locale as Locale, slug);
  const t = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(locale as Locale, {
    pathname: "/projects/[slug]",
    params: { slug },
  });

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      {localized && (
        <JsonLd
          data={[
            organizationJsonLd(),
            creativeWorkJsonLd({
              name: localized.title,
              description: localized.description,
              url,
              year: localized.year,
              keywords: localized.tags,
              client: localized.client,
            }),
            breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(locale as Locale, "/") },
              { name: t("projects"), url: absoluteUrl(locale as Locale, "/projects") },
              { name: localized.title, url },
            ]),
          ]}
        />
      )}
      <ProjectDetail
        project={project}
        relatedSolutions={getSolutionsByWork(slug).map((x) => ({
          slug: x.slug,
          title: landingText(messages, "solutionItems", x.slug).title,
        }))}
      />
    </NextIntlClientProvider>
  );
}
