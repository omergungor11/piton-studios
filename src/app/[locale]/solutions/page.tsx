import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { Link } from "@/i18n/navigation";
import PageShell from "@/components/page-shell";
import JsonLd from "@/components/json-ld";
import { SOLUTIONS } from "@/lib/solutions";
import { landingText } from "@/lib/landing";
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
  const t = await getTranslations({ locale, namespace: "solutionsPage" });
  return buildPageMetadata({
    locale: locale as Locale,
    href: "/solutions",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "solutionsPage" });
  const url = absoluteUrl(loc, "/solutions");

  // Sektor sirasi sectors.ts ile ayni kalsin; cozumu olmayan sektor atlanir.
  const groups = SECTORS.map((sector) => ({
    sector,
    items: SOLUTIONS.filter((x) => x.sectorSlug === sector.slug),
  })).filter((g) => g.items.length > 0);

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
              locale: loc,
              breadcrumbUrl: `${url}#breadcrumb`,
            }),
            "@type": "CollectionPage",
          },
          {
            ...breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(loc, "/") },
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
          {groups.flatMap(({ sector, items }) =>
            items.map((x) => {
              const text = landingText(messages, "solutionItems", x.slug);
              return (
                <Link
                  key={x.slug}
                  href={{ pathname: "/solutions/[slug]", params: { slug: x.slug } }}
                  className="sec-card glass"
                  data-cursor="hover"
                  data-cursor-label="View ↗"
                >
                  <div className="sec-card-top">
                    <span className="sec-card-n">
                      {sectorText(messages, sector.slug, "title") ??
                        sectorFallbackTitle(sector.slug)}
                    </span>
                    {sector.icon && (
                      <span className="sec-card-icon" aria-hidden="true">
                        {sector.icon}
                      </span>
                    )}
                  </div>
                  <h2 className="sec-card-title">{text.title}</h2>
                  {text.intro && <p className="sec-card-desc">{text.intro}</p>}
                  <div className="sec-card-footer">
                    <span className="sec-card-count" />
                    <span className="sec-card-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </Link>
              );
            })
          )}
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
