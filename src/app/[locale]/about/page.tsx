import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata } from "@/lib/seo";
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

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <AboutPageClient />
    </NextIntlClientProvider>
  );
}
