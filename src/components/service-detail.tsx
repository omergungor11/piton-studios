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

  const WP_PHONE = '905439500750';
  const WP_EMAIL = 'hi@pitonstudios.com';
  const wpUrl = `https://wa.me/${WP_PHONE}?text=${encodeURIComponent(t('ctaWpText', { title }))}`;
  const emailUrl = `mailto:${WP_EMAIL}?subject=${encodeURIComponent(t('ctaEmailSubject', { title }))}&body=${encodeURIComponent(t('ctaEmailBody', { title, desc: longDesc }))}`;

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
                href={{ pathname: '/services/[slug]', params: { slug: rel.slug } }}
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
          <div className="sd-cta-btns">
            <a
              href={wpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sd-cta-btn sd-cta-btn-wp"
              data-cursor="hover"
              data-cursor-label="WA"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t('ctaWhatsappBtn')}</span>
            </a>
            <a
              href={emailUrl}
              className="sd-cta-btn sd-cta-btn-email"
              data-cursor="hover"
              data-cursor-label="✉"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{t('ctaEmailBtn')}</span>
            </a>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
