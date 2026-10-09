import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { buildPageMetadata, absoluteUrl, listingPageJsonLd } from "@/lib/seo";
import JsonLd from "@/components/json-ld";
import { SERVICES } from "@/lib/data";
import { getLocalizedService } from "@/lib/content-i18n";
import type { Locale } from "@/lib/site";
import { Link } from "@/components/navigation/intent-link";
import SERVICE_ICONS from "@/components/service-icons";
import SparkScene from "@/components/scenes/spark";
import ServicesPageClient from "./page-client";
import ServiceCardArt from "./service-card-art";
import { hasServiceArt } from "./service-art-loaders";
import styles from "./services-list.module.css";

const NAMESPACES = ["impact", "spark", "common"] as const;

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
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const ts = await getTranslations({ locale, namespace: "servicesList" });
  const tv = await getTranslations({ locale, namespace: "serviceVisuals" });
  const url = absoluteUrl(l, "/services");
  const categories = Array.from(new Set(SERVICES.map((service) => service.cat))).map((id) => ({
    id,
    label: t(`filterCat.${id}`),
    count: SERVICES.filter((service) => service.cat === id).length,
  }));
  const cards = SERVICES.map((service, index) => {
    const hasArt = hasServiceArt(service.slug);
    const serviceItems = ts.raw(`${service.slug}.items`) as string[];
    return {
      id: service.n,
      category: service.cat,
      content: (
        <Link
          href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
          className={`svc ${styles.card}`}
          data-cursor="hover"
          data-cursor-label="+"
          data-reveal="rise"
          style={{ "--i": index % 6 } as CSSProperties}
        >
          {hasArt && <ServiceCardArt slug={service.slug} label={tv(`${service.slug}.alt`)} />}
          <div className="svc-top">
            <span className="n">{service.n}</span>
            <span className="cat">{t(`filterCat.${service.cat}`)}</span>
          </div>
          {!hasArt && <div className="svc-icon">{SERVICE_ICONS[service.slug] || null}</div>}
          <h4>{ts(`${service.slug}.title`)}</h4>
          <p className="svc-desc">{ts(`${service.slug}.desc`)}</p>
          <ul className="svc-items">
            {serviceItems.map((item) => (
              <li key={item}>
                <span className="bullet">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <span className="svc-arrow">↗</span>
        </Link>
      ),
    };
  });
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
            { name: "Piton", url: absoluteUrl(l, "/") },
            { name: tc("services"), url },
          ],
          items,
        })}
      />
      <ServicesPageClient
        hero={(
          <section className="sp-hero">
            <div className="sp-hero-eyebrow" data-reveal="fade-hero" style={{ "--reveal-delay": "0ms" } as CSSProperties}>{t("title")}</div>
            <h1 className="sp-hero-title" data-reveal="fade-hero" style={{ "--reveal-delay": "120ms" } as CSSProperties}>
              {t.rich("headline", { accent: (chunks) => <span className="em">{chunks}</span> })}
            </h1>
            <p className="sp-hero-sub" data-reveal="fade-hero" style={{ "--reveal-delay": "380ms" } as CSSProperties}>{t("subtitle")}</p>
          </section>
        )}
        cta={<SparkScene hideStats sub={t("ctaSub")} />}
        filterAll={t("filterAll")}
        categories={categories}
        cards={cards}
      />
    </NextIntlClientProvider>
  );
}
