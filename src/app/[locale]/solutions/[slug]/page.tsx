import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import LandingView from "@/components/landing-view";
import {
  SOLUTIONS,
  getSolutionBySlug,
  getAllSolutionSlugs,
} from "@/lib/solutions";
import { landingText, landingRelations } from "@/lib/landing";
import { sectorText, sectorFallbackTitle } from "@/lib/sectors";
import { localizeSlug, resolveSlug } from "@/lib/slugs";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/lib/site";

const NAMESPACES = ["common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// URL parcasi dile gore degisir (src/lib/slugs.ts); sayfa icinde hep kanonik kimlik kullanilir.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getAllSolutionSlugs().map((id) => ({ slug: localizeSlug("solutions", id, params.locale) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: urlSlug } = await params;
  const slug = resolveSlug("solutions", urlSlug, locale) ?? "";
  if (!getSolutionBySlug(slug)) return {};
  const messages = await getMessages({ locale });
  const text = landingText(messages, "solutionItems", slug);
  return buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: "/solutions/[slug]", params: { slug } },
    title: text.metaTitle,
    description: text.metaDescription,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { locale, slug: urlSlug } = await params;
  setRequestLocale(locale);
  const slug = resolveSlug("solutions", urlSlug, locale) ?? "";

  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const loc = locale as Locale;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "solutionsPage" });

  const link = (s: string) => ({
    href: { pathname: "/solutions/[slug]" as const, params: { slug: s } },
    label: landingText(messages, "solutionItems", s).title,
  });
  const sameSector = SOLUTIONS.filter(
    (x) => x.slug !== slug && x.sectorSlug === solution.sectorSlug
  );
  const rest = SOLUTIONS.filter(
    (x) => x.slug !== slug && x.sectorSlug !== solution.sectorSlug
  );

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <LandingView
        locale={loc}
        messages={messages}
        url={absoluteUrl(loc, { pathname: "/solutions/[slug]", params: { slug } })}
        text={landingText(messages, "solutionItems", slug)}
        relations={landingRelations(messages, loc, {
          ...solution,
          serviceSlugs: [solution.serviceSlug],
        })}
        ui={{
          eyebrow: t("eyebrowDetail"),
          whatWeDo: t("whatWeDo"),
          detailTitle: t("detailTitle"),
          relatedProjects: t("relatedProjects"),
          relatedServices: t("relatedServices"),
          relatedFaq: t("relatedFaq"),
          relatedPosts: t("relatedPosts"),
          viewAll: t("viewAll"),
          ctaTitle: t("ctaTitle"),
          ctaSub: t("ctaSub"),
          ctaButton: t("ctaButton"),
        }}
        parent={{ name: t("title"), href: "/solutions" }}
        crossLinks={[
          {
            title: t("sector"),
            links: [
              {
                href: { pathname: "/sectors/[slug]", params: { slug: solution.sectorSlug } },
                label:
                  sectorText(messages, solution.sectorSlug, "title") ??
                  sectorFallbackTitle(solution.sectorSlug),
              },
              ...sameSector.map((x) => link(x.slug)),
            ],
          },
          { title: t("allSolutions"), links: rest.map((x) => link(x.slug)) },
        ]}
      />
    </NextIntlClientProvider>
  );
}
