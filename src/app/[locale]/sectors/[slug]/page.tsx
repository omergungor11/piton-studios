import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { pickMessages } from "@/lib/pick-messages";
import { Link, getPathname } from "@/i18n/navigation";
import PageShell from "@/components/page-shell";
import ProjectPlaceholder from "@/components/project-placeholder";
import JsonLd from "@/components/json-ld";
import { WORKS, SERVICES } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";
import {
  getSectorBySlug,
  getAllSectorSlugs,
  sectorText,
  sectorFallbackTitle,
  messageString,
} from "@/lib/sectors";
import {
  buildPageMetadata,
  absoluteUrl,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import type { Locale } from "@/lib/site";

// PageShell istemci bileseni yalnizca `common` namespace'ini kullaniyor;
// sayfanin geri kalani sunucuda cozulur, istemciye fazladan mesaj gitmez.
const NAMESPACES = ["common"] as const;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) return { title: "Sector Not Found" };

  const messages = await getMessages({ locale });
  const title =
    sectorText(messages, slug, "metaTitle") ??
    sectorText(messages, slug, "title") ??
    sectorFallbackTitle(slug);
  const description =
    sectorText(messages, slug, "metaDescription") ??
    sectorText(messages, slug, "intro") ??
    messageString(messages, ["sectorsPage", "metaDescription"]) ??
    "";

  return buildPageMetadata({
    locale: locale as Locale,
    href: { pathname: "/sectors/[slug]", params: { slug } },
    title,
    description,
  });
}

export default async function SectorPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "sectorsPage" });

  const title = sectorText(messages, slug, "title") ?? sectorFallbackTitle(slug);
  const intro = sectorText(messages, slug, "intro");
  const painTitle = sectorText(messages, slug, "painTitle");
  const ctaText = sectorText(messages, slug, "ctaText");

  const bullets = [1, 2, 3, 4, 5]
    .map((i) => sectorText(messages, slug, `bullets.${i}`))
    .filter((b): b is string => Boolean(b));
  const painPoints = [1, 2, 3]
    .map((i) => sectorText(messages, slug, `painPoints.${i}`))
    .filter((p): p is string => Boolean(p));

  // Opsiyonel duzyazi bolumu: ceviri anahtari yoksa bolum hic render edilmez.
  const detailParagraphs = [1, 2, 3]
    .map((i) => sectorText(messages, slug, `detail.${i}`))
    .filter((p): p is string => Boolean(p));
  const detailTitle = messageString(messages, ["sectorsPage", "detailTitle"]);

  const works = sector.workSlugs
    .map((workSlug) => WORKS.find((w) => w.slug === workSlug))
    .filter((w): w is (typeof WORKS)[number] => Boolean(w));
  const services = sector.serviceSlugs
    .map((serviceSlug) => SERVICES.find((s) => s.slug === serviceSlug))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));

  // SSS sorulari: metin ceviriden okunur, ceviri yoksa soru listelenmez.
  const faqLinks = sector.faqIds
    .map((id) => ({ id, q: messageString(messages, ["faqItems", id, "q"]) }))
    .filter((f): f is { id: string; q: string } => Boolean(f.q));

  // Blog: sectors.ts translationKey tutar, dosya slug'i dile gore burada cozulur.
  const posts = getAllPosts(locale as Locale);
  const blogLinks = (sector.blogSlugs ?? [])
    .map((key) => posts.find((p) => p.translationKey === key))
    .filter((p): p is (typeof posts)[number] => Boolean(p));

  // Localize dis linkler (#anchor tasiyanlar Link yerine duz <a> ile kurulur).
  const faqPath = getPathname({ href: "/faq", locale: locale as Locale });

  const url = absoluteUrl(locale as Locale, {
    pathname: "/sectors/[slug]",
    params: { slug },
  });
  const metaTitle = sectorText(messages, slug, "metaTitle") ?? title;
  const metaDescription =
    sectorText(messages, slug, "metaDescription") ?? intro ?? "";

  const workTitle = (w: (typeof WORKS)[number]): string =>
    messageString(messages, ["works", w.slug, "title"]) ?? w.title;
  const serviceTitle = (s: (typeof SERVICES)[number]): string =>
    messageString(messages, ["servicesList", s.slug, "title"]) ?? s.title;
  const serviceDesc = (s: (typeof SERVICES)[number]): string =>
    messageString(messages, ["servicesList", s.slug, "desc"]) ?? s.desc;

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          {
            ...webPageJsonLd({
              url,
              name: metaTitle,
              description: metaDescription,
              locale: locale as Locale,
              breadcrumbUrl: `${url}#breadcrumb`,
              speakableSelectors: [".sp-hero-title", ".sec-intro"],
            }),
            "@type": "CollectionPage",
          },
          works.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "@id": `${url}#projects`,
                name: t("relatedProjects"),
                itemListElement: works.map((w, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: workTitle(w),
                  url: absoluteUrl(locale as Locale, {
                    pathname: "/projects/[slug]",
                    params: { slug: w.slug },
                  }),
                })),
              }
            : null,
          {
            ...breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(locale as Locale, "/") },
              { name: t("title"), url: absoluteUrl(locale as Locale, "/sectors") },
              { name: title, url },
            ]),
            "@id": `${url}#breadcrumb`,
          },
        ]}
      />

      <PageShell>
        {/* Hero */}
        <section className="sp-hero sec-hero">
          <div className="sp-hero-eyebrow">{t("eyebrow")}</div>
          <h1 className="sp-hero-title">{title}</h1>
          {intro && <p className="sp-hero-sub sec-intro">{intro}</p>}
        </section>

        {/* Sektorun dertleri */}
        {painPoints.length > 0 && (
          <section className="sec-pain">
            {painTitle && (
              <div className="sec-head">
                <span className="sec-head-n" aria-hidden="true">
                  ◦
                </span>
                <h2 className="sec-head-title">{painTitle}</h2>
              </div>
            )}
            <div className="sec-pain-grid">
              {painPoints.map((point, i) => (
                <div key={i} className="sec-pain-card glass">
                  <span className="sec-pain-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Opsiyonel duzyazi: sectorItems.{slug}.detail.1..3 */}
        {detailParagraphs.length > 0 && (
          <section className="sec-block">
            {detailTitle && (
              <div className="sec-head">
                <span className="sec-head-n" aria-hidden="true">
                  ◦
                </span>
                <h2 className="sec-head-title">{detailTitle}</h2>
              </div>
            )}
            <div className="sec-detail">
              {detailParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  style={{
                    maxWidth: "68ch",
                    color: "var(--muted)",
                    lineHeight: 1.7,
                    margin: "0 0 16px",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Bu sektorde neler yapiyoruz */}
        {bullets.length > 0 && (
          <section className="sec-block">
            <div className="sec-head">
              <span className="sec-head-n" aria-hidden="true">
                ◦
              </span>
              <h2 className="sec-head-title">{t("whatWeDo")}</h2>
            </div>
            <ul className="sec-bullets">
              {bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Ilgili projeler */}
        {works.length > 0 && (
          <section className="sec-block">
            <div className="sec-head">
              <span className="sec-head-n" aria-hidden="true">
                ◦
              </span>
              <h2 className="sec-head-title">{t("relatedProjects")}</h2>
              <Link href="/projects" className="sec-head-link" data-cursor="hover">
                {t("viewAll")} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="sec-projects">
              {works.map((w) => (
                <Link
                  key={w.slug}
                  href={{ pathname: "/projects/[slug]", params: { slug: w.slug } }}
                  className="sec-project-card glass"
                  data-cursor="hover"
                  data-cursor-label="View ↗"
                >
                  <div className="sec-project-shot">
                    {w.previews?.desktop ? (
                      <Image
                        src={w.previews.desktop}
                        alt={workTitle(w)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <ProjectPlaceholder label={w.kind} />
                    )}
                  </div>
                  <div className="sec-project-meta">
                    <span className="sec-project-title">{workTitle(w)}</span>
                    <span className="sec-project-client">
                      {w.client} · {w.kind}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ilgili hizmetler */}
        {services.length > 0 && (
          <section className="sec-block">
            <div className="sec-head">
              <span className="sec-head-n" aria-hidden="true">
                ◦
              </span>
              <h2 className="sec-head-title">{t("relatedServices")}</h2>
            </div>
            <div className="sec-services">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={{ pathname: "/services/[slug]", params: { slug: s.slug } }}
                  className="sec-service-card glass"
                  data-cursor="hover"
                >
                  <span className="sec-service-n">{s.n}</span>
                  <span className="sec-service-title">{serviceTitle(s)}</span>
                  <span className="sec-service-desc">{serviceDesc(s)}</span>
                  <span className="sec-service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ilgili SSS + blog */}
        {(faqLinks.length > 0 || blogLinks.length > 0) && (
          <section className="sec-block">
            <div className="sec-head">
              <span className="sec-head-n" aria-hidden="true">
                ◦
              </span>
              <h2 className="sec-head-title">{t("relatedFaq")}</h2>
            </div>
            {faqLinks.length > 0 && (
              <ul className="sec-faq">
                {faqLinks.map((f) => (
                  <li key={f.id}>
                    <a
                      href={`${faqPath}#faq-${f.id}`}
                      className="sec-faq-link"
                      data-cursor="hover"
                    >
                      <span className="sec-faq-q">{f.q}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {blogLinks.length > 0 && (
              <div className="sec-posts">
                <span className="sec-posts-label">{t("relatedPosts")}</span>
                <div className="sec-posts-links">
                  {blogLinks.map((post) => (
                    <Link
                      key={post.slug}
                      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                      className="sec-post-link"
                      data-cursor="hover"
                    >
                      {post.title} <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CTA */}
        <section className="sp-cta glass">
          <div>
            <h3>{ctaText ?? t("ctaTitle")}</h3>
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
