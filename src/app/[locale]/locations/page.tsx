import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { Link } from "@/i18n/navigation";
import PageShell from "@/components/page-shell";
import JsonLd from "@/components/json-ld";
import { LOCATIONS, type Location } from "@/lib/locations";
import { landingText } from "@/lib/landing";
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
  const t = await getTranslations({ locale, namespace: "locationsPage" });
  return buildPageMetadata({
    locale: locale as Locale,
    href: "/locations",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function LocationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc = locale as Locale;
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "locationsPage" });
  const url = absoluteUrl(loc, "/locations");

  const groups: { region: Location["region"]; items: Location[] }[] = [
    { region: "cyprus", items: LOCATIONS.filter((l) => l.region === "cyprus") },
    { region: "turkey", items: LOCATIONS.filter((l) => l.region === "turkey") },
  ];

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

        {groups.map((group) => (
          <section key={group.region} className="sec-block">
            <div className="sec-head">
              <span className="sec-head-n" aria-hidden="true">
                ◦
              </span>
              <h2 className="sec-head-title">{t(group.region)}</h2>
            </div>
            <div className="sec-grid">
              {group.items.map((l) => {
                const text = landingText(messages, "locationItems", l.slug);
                return (
                  <Link
                    key={l.slug}
                    href={{ pathname: "/locations/[slug]", params: { slug: l.slug } }}
                    className="sec-card glass"
                    data-cursor="hover"
                    data-cursor-label="View ↗"
                  >
                    <h3 className="sec-card-title">{text.title}</h3>
                    {text.intro && <p className="sec-card-desc">{text.intro}</p>}
                    <div className="sec-card-footer">
                      {/* Proje sayisi gosterilmez: sehir sayfasindaki projelerin bir kismi
                          sektor referansidir, o sehirde yapilmis is gibi okunmamali. */}
                      <span className="sec-card-count">{t(group.region)}</span>
                      <span className="sec-card-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

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
