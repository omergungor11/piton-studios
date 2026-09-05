import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import JsonLd from "@/components/json-ld";
import { buildPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import type { Locale } from "@/lib/site";
import { buildProjectCloudItems } from "@/lib/project-cloud";
import HomeClient from "./home-client";

const NAMESPACES = [
  "hero",
  "spark",
  "manifesto",
  "services",
  "servicesList",
  "servicesPage",
  "projectCloud",
  "processScene",
  "about",
  "contact",
  "nav",
  "chrome",
] as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pageMeta" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/",
    title: t("home.title"),
    description: t("home.description"),
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [messages, projectCloud] = await Promise.all([
    getMessages(),
    buildProjectCloudItems(locale),
  ]);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(locale as Locale)]} />
      <HomeClient projectCloud={projectCloud} />
    </NextIntlClientProvider>
  );
}
