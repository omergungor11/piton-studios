import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import LandingView from "@/components/landing-view";
import { LOCATIONS, getLocationBySlug, getAllLocationSlugs } from "@/lib/locations";
import { landingText, landingRelations } from "@/lib/landing";
import { localizeSlug, resolveSlug } from "@/lib/slugs";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo";
import type { Locale } from "@/lib/site";

// PageShell yalnizca `common` kullaniyor; gerisi sunucuda cozulur.
const NAMESPACES = ["common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// URL parcasi dile gore degisir (src/lib/slugs.ts); sayfa icinde hep kanonik kimlik kullanilir.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getAllLocationSlugs().map((id) => ({ slug: localizeSlug("locations", id, params.locale) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: urlSlug } = await params;
  const slug = resolveSlug("locations", urlSlug, locale) ?? "";
  if (!getLocationBySlug(slug)) return {};
  const messages = await getMessages({ locale });
  const text = landingText(messages, "locationItems", slug);
  return buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: "/locations/[slug]", params: { slug } },
    title: text.metaTitle,
    description: text.metaDescription,
  });
}

export default async function LocationPage({ params }: Props) {
  const { locale, slug: urlSlug } = await params;
  setRequestLocale(locale);
  const slug = resolveSlug("locations", urlSlug, locale) ?? "";

  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const loc = locale as Locale;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "locationsPage" });

  const others = LOCATIONS.filter((l) => l.slug !== slug)
    // Ayni bolgedeki sehirler once — KKTC ziyaretcisine once Lefkosa gorunsun.
    .sort((a, b) => Number(b.region === location.region) - Number(a.region === location.region));

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <LandingView
        locale={loc}
        messages={messages}
        url={absoluteUrl(loc, { pathname: "/locations/[slug]", params: { slug } })}
        text={landingText(messages, "locationItems", slug)}
        relations={landingRelations(messages, loc, location)}
        ui={{
          eyebrow: t(location.region === "cyprus" ? "cyprus" : "turkey"),
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
        parent={{ name: t("title"), href: "/locations" }}
        crossLinks={[
          {
            title: t("otherLocations"),
            links: others.map((l) => ({
              href: { pathname: "/locations/[slug]", params: { slug: l.slug } },
              label: landingText(messages, "locationItems", l.slug).title,
            })),
          },
        ]}
      />
    </NextIntlClientProvider>
  );
}
