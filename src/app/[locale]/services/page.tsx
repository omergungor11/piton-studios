import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { SERVICES } from "@/lib/data";
import { getLocalizedService } from "@/lib/content-i18n";
import type { Locale } from "@/lib/site";
import ServicesPageClient from "./page-client";

const NAMESPACES = ["servicesPage", "servicesList", "impact", "spark", "common"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/services",
    title: t("services.title"),
    description: t("services.description"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const l = locale as Locale;
  const tm = await getTranslations({ locale, namespace: "pageMeta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(l, "/services");
  const items = await Promise.all(
    SERVICES.map(async (service) => ({
      name: (await getLocalizedService(l, service.slug))?.title ?? service.title,
      url: absoluteUrl(l, { pathname: "/services/[slug]", params: { slug: service.slug } }),
    }))
  );

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={listingPageJsonLd({
          url,
          name: tm("services.title"),
          description: tm("services.description"),
          locale: l,
          crumbs: [
            { name: "Piton Studios", url: absoluteUrl(l, "/") },
            { name: tc("services"), url },
          ],
          items,
        })}
      />
      <ServicesPageClient />
    </NextIntlClientProvider>
  );
}
