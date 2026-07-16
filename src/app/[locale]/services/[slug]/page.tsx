import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data";
import ServiceDetail from "@/components/service-detail";

const NAMESPACES = ["serviceDetail", "servicesList", "common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} — Piton Studios`,
    description: service.desc,
    openGraph: {
      title: `${service.title} — Piton Studios`,
      description: service.desc,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <ServiceDetail service={service} />
    </NextIntlClientProvider>
  );
}
