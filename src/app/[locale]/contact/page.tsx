import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import type { Locale } from "@/lib/site";
import ContactPageClient from "./page-client";

const NAMESPACES = ["contact", "common"] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/contact",
    title: t("contact.title"),
    description: t("contact.description"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const l = locale as Locale;
  const tm = await getTranslations({ locale, namespace: "pageMeta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const url = absoluteUrl(l, "/contact");

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={listingPageJsonLd({
          type: "ContactPage",
          url,
          name: tm("contact.title"),
          description: tm("contact.description"),
          locale: l,
          crumbs: [
            { name: "Piton Studios", url: absoluteUrl(l, "/") },
            { name: tc("contact"), url },
          ],
        })}
      />
      <ContactPageClient />
    </NextIntlClientProvider>
  );
}
