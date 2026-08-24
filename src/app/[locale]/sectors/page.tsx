import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { Link } from "@/i18n/navigation";
import PageShell from "@/components/page-shell";
import JsonLd from "@/components/json-ld";
import { SECTORS, sectorText, sectorFallbackTitle } from "@/lib/sectors";
import {
  buildPageMetadata,
  absoluteUrl,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/lib/site";

const NAMESPACES = ["common"] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectorsPage" });

  return buildPageMetadata({
    locale: locale as Locale,
    href: "/sectors",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SectorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "sectorsPage" });
  const url = absoluteUrl(locale as Locale, "/sectors");

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          {
            ...webPageJsonLd({
              url,
              name: t("metaTitle"),
              description: t("metaDescription"),
              locale: locale as Locale,
              breadcrumbUrl: `${url}#breadcrumb`,
            }),
            "@type": "CollectionPage",
          },
          {
            ...breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(locale as Locale, "/") },
              { name: t("title"), url },
            ]),
            "@id": `${url}#breadcrumb`,
          },
        ]}
      />

      <PageShell>
        <section className="sp-hero sec-hero">
          <div className="sp-hero-eyebrow">{t("eyebrow")}</div>
          <h1 className="sp-hero-title">{t("title")}</h1>
          <p className="sp-hero-sub">{t("subtitle")}</p>
        </section>

        <div className="sec-grid">
          {SECTORS.map((sector, i) => {
            const title =
              sectorText(messages, sector.slug, "title") ??
              sectorFallbackTitle(sector.slug);
            const intro = sectorText(messages, sector.slug, "intro");
            return (
              <Link
                key={sector.slug}
                href={{ pathname: "/sectors/[slug]", params: { slug: sector.slug } }}
                className="sec-card glass"
                data-cursor="hover"
                data-cursor-label="View ↗"
              >
                <div className="sec-card-top">
                  <span className="sec-card-n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {sector.icon && (
                    <span className="sec-card-icon" aria-hidden="true">
                      {sector.icon}
                    </span>
                  )}
                </div>
                <h2 className="sec-card-title">{title}</h2>
                {intro && <p className="sec-card-desc">{intro}</p>}
                <div className="sec-card-footer">
                  <span className="sec-card-count">
                    {t("projectCount", { count: sector.workSlugs.length })}
                  </span>
                  <span className="sec-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <section className="sp-cta glass">
          <div>
            <h3>{t("ctaTitle")}</h3>
            <p>{t("ctaSub")}</p>
          </div>
          <Link href="/contact" className="sp-cta-btn" data-cursor="hover">
            {t("ctaButton")} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </PageShell>
    </NextIntlClientProvider>
  );
}
