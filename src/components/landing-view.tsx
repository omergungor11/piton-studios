import Image from "next/image";
import { Link, getPathname } from "@/i18n/navigation";
import PageShell from "@/components/page-shell";
import ProjectPlaceholder from "@/components/project-placeholder";
import JsonLd from "@/components/json-ld";
import { messageString } from "@/lib/sectors";
import type { LandingRelations, LandingText } from "@/lib/landing";
import {
  absoluteUrl,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  type Href,
} from "@/lib/seo";
import type { Locale } from "@/lib/site";

export interface LandingUi {
  eyebrow: string;
  whatWeDo: string;
  painFallback?: string;
  detailTitle: string;
  relatedProjects: string;
  relatedServices: string;
  relatedFaq: string;
  relatedPosts: string;
  viewAll: string;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
}

export interface LandingCrossLinks {
  title: string;
  links: { href: Href; label: string }[];
}

interface Props {
  locale: Locale;
  messages: unknown;
  url: string;
  text: LandingText;
  relations: LandingRelations;
  ui: LandingUi;
  /** Liste sayfasi (ornegin /bolgeler) — breadcrumb'in orta halkasi. */
  parent: { name: string; href: Href };
  /** Sayfa sonunda ic linkleme blogu (ilgili sehirler / cozumler). */
  crossLinks?: LandingCrossLinks[];
}

/** Sektor sayfasiyla ayni gorsel dil (`sec-*` siniflari) — sehir ve cozum sayfalari paylasir. */
export default function LandingView({
  locale,
  messages,
  url,
  text,
  relations,
  ui,
  parent,
  crossLinks = [],
}: Props) {
  const { works, services, faqLinks, posts } = relations;
  const faqPath = getPathname({ href: "/faq", locale });

  const workTitle = (slug: string, fallback: string) =>
    messageString(messages, ["works", slug, "title"]) ?? fallback;
  const serviceTitle = (slug: string, fallback: string) =>
    messageString(messages, ["servicesList", slug, "title"]) ?? fallback;
  const serviceDesc = (slug: string, fallback: string) =>
    messageString(messages, ["servicesList", slug, "desc"]) ?? fallback;

  const head = (title: string, link?: { href: Href; label: string }) => (
    <div className="sec-head">
      <span className="sec-head-n" aria-hidden="true">
        ◦
      </span>
      <h2 className="sec-head-title">{title}</h2>
      {link && (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <Link href={link.href as any} className="sec-head-link" data-cursor="hover">
          {link.label} <span aria-hidden="true">↗</span>
        </Link>
      )}
    </div>
  );

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            url,
            name: text.metaTitle,
            description: text.metaDescription,
            locale,
            breadcrumbUrl: `${url}#breadcrumb`,
            speakableSelectors: [".sp-hero-title", ".sec-intro"],
          }),
          works.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "@id": `${url}#projects`,
                name: ui.relatedProjects,
                itemListElement: works.map((w, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: workTitle(w.slug, w.title),
                  url: absoluteUrl(locale, {
                    pathname: "/projects/[slug]",
                    params: { slug: w.slug },
                  }),
                })),
              }
            : null,
          {
            ...breadcrumbJsonLd([
              { name: "Piton Studios", url: absoluteUrl(locale, "/") },
              { name: parent.name, url: absoluteUrl(locale, parent.href) },
              { name: text.title, url },
            ]),
            "@id": `${url}#breadcrumb`,
          },
        ]}
      />

      <PageShell>
        <section className="sp-hero sec-hero">
          <div className="sp-hero-eyebrow">{ui.eyebrow}</div>
          <h1 className="sp-hero-title">{text.title}</h1>
          {text.intro && <p className="sp-hero-sub sec-intro">{text.intro}</p>}
        </section>

        {text.painPoints.length > 0 && (
          <section className="sec-pain">
            {text.painTitle && head(text.painTitle)}
            <div className="sec-pain-grid">
              {text.painPoints.map((point, i) => (
                <div key={i} className="sec-pain-card glass">
                  <span className="sec-pain-n">{String(i + 1).padStart(2, "0")}</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {text.detail.length > 0 && (
          <section className="sec-block">
            {head(ui.detailTitle)}
            <div className="sec-detail">
              {text.detail.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        {text.bullets.length > 0 && (
          <section className="sec-block">
            {head(ui.whatWeDo)}
            <ul className="sec-bullets">
              {text.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </section>
        )}

        {works.length > 0 && (
          <section className="sec-block">
            {head(ui.relatedProjects, { href: "/projects", label: ui.viewAll })}
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
                        alt={workTitle(w.slug, w.title)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <ProjectPlaceholder label={w.kind} />
                    )}
                  </div>
                  <div className="sec-project-meta">
                    <span className="sec-project-title">{workTitle(w.slug, w.title)}</span>
                    <span className="sec-project-client">
                      {w.client} · {w.kind}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {services.length > 0 && (
          <section className="sec-block">
            {head(ui.relatedServices)}
            <div className="sec-services">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={{ pathname: "/services/[slug]", params: { slug: s.slug } }}
                  className="sec-service-card glass"
                  data-cursor="hover"
                >
                  <span className="sec-service-n">{s.n}</span>
                  <span className="sec-service-title">{serviceTitle(s.slug, s.title)}</span>
                  <span className="sec-service-desc">{serviceDesc(s.slug, s.desc)}</span>
                  <span className="sec-service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {(faqLinks.length > 0 || posts.length > 0) && (
          <section className="sec-block">
            {head(ui.relatedFaq)}
            {faqLinks.length > 0 && (
              <ul className="sec-faq">
                {faqLinks.map((f) => (
                  <li key={f.id}>
                    <a href={`${faqPath}#faq-${f.id}`} className="sec-faq-link" data-cursor="hover">
                      <span className="sec-faq-q">{f.q}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {posts.length > 0 && (
              <div className="sec-posts">
                <span className="sec-posts-label">{ui.relatedPosts}</span>
                <div className="sec-posts-links">
                  {posts.map((post) => (
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

        {crossLinks
          .filter((group) => group.links.length > 0)
          .map((group) => (
            <section key={group.title} className="sec-block">
              {head(group.title)}
              <div className="sec-posts-links landing-cross">
                {group.links.map((l) => (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <Link key={l.label} href={l.href as any} className="sec-post-link" data-cursor="hover">
                    {l.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

        <section className="sp-cta glass">
          <div>
            <h3>{text.ctaText ?? ui.ctaTitle}</h3>
            <p>{ui.ctaSub}</p>
          </div>
          <Link href="/contact" className="sp-cta-btn" data-cursor="hover">
            {ui.ctaButton} <span aria-hidden="true">→</span>
          </Link>
        </section>
      </PageShell>
    </>
  );
}
