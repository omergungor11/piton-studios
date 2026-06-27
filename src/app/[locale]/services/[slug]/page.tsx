import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/data";
import ServiceDetail from "@/components/service-detail";

interface Props {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
