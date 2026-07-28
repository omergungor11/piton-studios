import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data";
import ServiceDetail from "@/components/service-detail";
import JsonLd from "@/components/json-ld";
import { getLocalizedService } from "@/lib/content-i18n";
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

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const localized = await getLocalizedService(locale as Locale, slug);

  if (!localized) {
    return { title: "Service Not Found" };
  }

  return buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: "/services/[slug]", params: { slug } },
    title: localized.title,
    description: localized.description,
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);

  if (!service) {
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
      <ServiceDetail service={service} />
    </NextIntlClientProvider>
  );
}
