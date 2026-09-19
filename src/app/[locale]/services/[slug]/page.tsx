import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data";
import ServiceDetail from "@/components/service-detail";
import JsonLd from "@/components/json-ld";
import { getLocalizedService } from "@/lib/content-i18n";
import { getSolutionsByService } from "@/lib/solutions";
import { landingText } from "@/lib/landing";
import { localizeSlug, resolveSlug } from "@/lib/slugs";
import {
  buildPageMetadata,
  absoluteUrl,
  serviceJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  organizationJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/lib/site";

const NAMESPACES = ["serviceDetail", "servicesList", "common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// URL parcasi dile gore degisir (src/lib/slugs.ts); sayfa icinde hep kanonik kimlik kullanilir.
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  return getAllServiceSlugs().map((id) => ({ slug: localizeSlug("services", id, params.locale) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug: urlSlug } = await params;
  const slug = resolveSlug("services", urlSlug, locale);
  const localized = slug ? await getLocalizedService(locale as Locale, slug) : null;

  if (!slug || !localized) {
    return { title: "Service Not Found" };
  }

  return buildPageMetadata({
    ownOgImage: true,
    locale: locale as Locale,
    href: { pathname: "/services/[slug]", params: { slug } },
    title: localized.title,
    // Bazi kisa kart aciklamalari (ornegin AI Consulting) tek basina 60 karakterin altinda.
    description:
      localized.description.length < 90 && localized.longDescription
        ? `${localized.description} ${localized.longDescription}`
        : localized.description,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug: urlSlug } = await params;
  setRequestLocale(locale);
  const slug = resolveSlug("services", urlSlug, locale);
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!slug || !service) {
    notFound();
  }

  const messages = await getMessages();
  const localized = await getLocalizedService(locale as Locale, slug);
  const t = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(locale as Locale, {
    pathname: "/services/[slug]",
    params: { slug },
  });

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      {localized && (
        <JsonLd
          data={[
            organizationJsonLd(),
            serviceJsonLd({
              name: localized.title,
              description: localized.description,
              url,
              category: localized.category,
            }),
            faqJsonLd(localized.faq),
            breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(locale as Locale, "/") },
              { name: t("services"), url: absoluteUrl(locale as Locale, "/services") },
              { name: localized.title, url },
            ]),
          ]}
        />
      )}
      <ServiceDetail
        service={service}
        relatedSolutions={getSolutionsByService(slug).map((x) => ({
          slug: x.slug,
          title: landingText(messages, "solutionItems", x.slug).title,
        }))}
      />
    </NextIntlClientProvider>
  );
}
