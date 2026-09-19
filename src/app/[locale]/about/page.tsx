import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import type { Locale } from "@/lib/site";
import AboutPageClient from "./page-client";

const NAMESPACES = ["about", "aboutSections", "areas", "works", "testimonials", "spark", "common"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/about",
    title: t("about.title"),
    description: t("about.description"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const l = locale as Locale;
  const tm = await getTranslations({ locale, namespace: "pageMeta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(l, "/about");

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={listingPageJsonLd({
          type: "AboutPage",
          url,
          name: tm("about.title"),
          description: tm("about.description"),
          locale: l,
          crumbs: [
            { name: "Piton Studios", url: absoluteUrl(l, "/") },
            { name: tc("about"), url },
          ],
        })}
      />
      <AboutPageClient />
    </NextIntlClientProvider>
  );
}
