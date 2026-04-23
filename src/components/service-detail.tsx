'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type Service, SERVICES } from '@/lib/data';
import PageShell from '@/components/page-shell';
import SERVICE_ICONS from '@/components/service-icons';

interface Props {
  service: Service;
}

export default function ServiceDetail({ service }: Props) {
  const t = useTranslations('serviceDetail');
  const ts = useTranslations('servicesList');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const title = ts(`${service.slug}.title`);
  const longDesc = ts(`${service.slug}.longDesc`);
  const features = ts.raw(`${service.slug}.features`) as { title: string; desc: string }[];
  const process = ts.raw(`${service.slug}.process`) as { step: string; title: string; desc: string }[];
  const faq = ts.raw(`${service.slug}.faq`) as { q: string; a: string }[];
  const stats = ts.raw(`${service.slug}.stats`) as { value: string; label: string }[];

  const relatedServices = service.relatedServices
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is Service => s !== undefined);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <PageShell>

      {/* ── A. HERO ─────────────────────────────────────────── */}
      <section className="sd-hero">
        <div className="sd-hero-eyebrow">
          <span className="sd-hero-accent-line" aria-hidden="true" />
          <span className="sd-hero-n">[{service.n}]</span>
          <span className="sd-hero-cat">{service.cat}</span>
        </div>
        {SERVICE_ICONS[service.slug] && (
          <div className="sd-hero-icon">
            {SERVICE_ICONS[service.slug]}
          </div>
        )}
        <h1 className="sd-hero-title">{title}</h1>
        <p className="sd-hero-desc">{longDesc}</p>

        {stats.length > 0 && (
          <div className="sd-stats">
            {stats.map((stat, i) => (
              <div key={i} className="sd-stat glass">
                <span className="sd-stat-value">{stat.value}</span>
                <span className="sd-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── B. FEATURES GRID ────────────────────────────────── */}
      {features.length > 0 && (
        <section className="sd-features sd-section-fade">
          <div className="sd-section-header">
            <span className="sd-section-label">{t('features')}</span>
            <h2 className="sd-section-title">{t('whatsIncluded')}</h2>
          </div>
          <div className="sd-features-grid">
            {features.map((feature, i) => (
              <div key={i} className="sd-feature-card glass" data-cursor="hover">
                <span className="sd-feature-bg-n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sd-feature-n">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="sd-feature-title">{feature.title}</h3>
                <p className="sd-feature-desc">{feature.desc}</p>
                <span className="sd-feature-glow" aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── C. PROCESS TIMELINE ─────────────────────────────── */}
      {process.length > 0 && (
        <section className="sd-process sd-section-fade">
          <div className="sd-section-header">
            <span className="sd-section-label">{t('process')}</span>
            <h2 className="sd-section-title">{t('howWeWork')}</h2>
          </div>
          <div className="sd-timeline">
            {process.map((step, i) => (
              <div key={i} className="sd-timeline-item">
                <div className="sd-timeline-marker">
                  <div className="sd-timeline-circle">
                    <span className="sd-timeline-step">{step.step}</span>
                    <span className="sd-timeline-pulse" aria-hidden="true" />
                  </div>
                  {i < process.length - 1 && (
                    <span className="sd-timeline-line" aria-hidden="true" />
                  )}
                </div>
                <div className="sd-timeline-content">
                  <h3 className="sd-timeline-title">{step.title}</h3>
                  <p className="sd-timeline-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── D. TOOLS ────────────────────────────────────────── */}
      {service.tools.length > 0 && (
        <section className="sd-tools sd-section-fade">
          <span className="sd-section-label">{t('tools')}</span>
          <div className="sd-tools-list">
            {service.tools.map((tool) => (
              <span key={tool} className="sd-tool-badge" data-cursor="hover">
                <span className="sd-tool-dot" aria-hidden="true" />
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── E. FAQ ACCORDION ────────────────────────────────── */}
      {faq.length > 0 && (
        <section className="sd-faq sd-section-fade">
          <div className="sd-section-header">
            <span className="sd-section-label">{t('faq')}</span>
            <h2 className="sd-section-title">{t('commonQuestions')}</h2>
          </div>
          <div className="sd-faq-list">
            {faq.map((item, i) => (
              <div
                key={i}
                className={`sd-faq-item ${openFaq === i ? 'is-open' : ''}`}
              >
                <button
                  className="sd-faq-question"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                  data-cursor="hover"
                >
                  <span className="sd-faq-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="sd-faq-q-text">{item.q}</span>
                  <span className="sd-faq-chevron" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className="sd-faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── F. INFO BOXES ───────────────────────────────────── */}
      <section className="sd-info-boxes sd-section-fade">
        <div className="sd-info-box glass strong">
          <span className="sd-info-box-accent-bar" aria-hidden="true" />
          <h3 className="sd-info-box-title">{t('whyUs')}</h3>
          <ul className="sd-info-box-list">
            {(t.raw('whyUsItems') as string[]).map((item, i) => (
              <li key={i}>
                <span className="sd-info-bullet" aria-hidden="true">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="sd-info-box glass strong">
          <span className="sd-info-box-accent-bar" aria-hidden="true" />
          <h3 className="sd-info-box-title">{t('theProcess')}</h3>
          <ol className="sd-process-mini">
            {process.map((step, i) => (
              <li key={i} className="sd-process-mini-item">
                <span className="sd-process-mini-n">{step.step}</span>
                <span className="sd-process-mini-title">{step.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── G. RELATED SERVICES ─────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="sd-related sd-section-fade">
          <div className="sd-section-header">
            <span className="sd-section-label">{t('related')}</span>
            <h2 className="sd-section-title">{t('youMightNeed')}</h2>
          </div>
          <div className="sd-related-grid">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="sd-related-card glass"
                data-cursor="hover"
                data-cursor-label="↗"
              >
                <span className="sd-related-stripe" aria-hidden="true" />
                <div className="sd-related-card-top">
                  <span className="sd-related-n">{rel.n}</span>
                  {SERVICE_ICONS[rel.slug] && (
                    <div className="sd-related-icon">{SERVICE_ICONS[rel.slug]}</div>
                  )}
                  <span className="sd-related-cat">{rel.cat}</span>
                </div>
                <h3 className="sd-related-title">{ts(`${rel.slug}.title`)}</h3>
                <p className="sd-related-desc">{ts(`${rel.slug}.desc`)}</p>
                <span className="sd-related-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── H. CTA ──────────────────────────────────────────── */}
      <section className="sd-cta sd-section-fade">
        <span className="sd-cta-bg-accent" aria-hidden="true" />
        <div className="sd-cta-inner">
          <p className="sd-cta-eyebrow">{t('ctaEyebrow')}</p>
          <h2 className="sd-cta-title">{t('ctaTitle')}</h2>
          <p className="sd-cta-sub">{t('ctaSub')}</p>
          <Link
            href="/#contact"
            className="sd-cta-btn"
            data-cursor="hover"
            data-cursor-label="↗"
          >
            <span>{t('ctaBtn')}</span>
            <span className="sd-cta-arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

    </PageShell>
  );
}
