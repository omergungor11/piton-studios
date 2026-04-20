'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type Service, SERVICES } from '@/lib/data';
import PageShell from '@/components/page-shell';

interface Props {
  service: Service;
}

export default function ServiceDetail({ service }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
          <span className="sd-hero-n">[{service.n}]</span>
          <span className="sd-hero-cat">{service.cat}</span>
        </div>
        <h1 className="sd-hero-title">{service.title}</h1>
        <p className="sd-hero-desc">{service.longDesc}</p>

        {service.stats.length > 0 && (
          <div className="sd-stats">
            {service.stats.map((stat, i) => (
              <div key={i} className="sd-stat glass">
                <span className="sd-stat-value">{stat.value}</span>
                <span className="sd-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── B. FEATURES GRID ────────────────────────────────── */}
      {service.features.length > 0 && (
        <section className="sd-features">
          <div className="sd-section-label">// Features</div>
          <h2 className="sd-section-title">What's included</h2>
          <div className="sd-features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className="sd-feature-card glass">
                <span className="sd-feature-n">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="sd-feature-title">{feature.title}</h3>
                <p className="sd-feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── C. PROCESS TIMELINE ─────────────────────────────── */}
      {service.process.length > 0 && (
        <section className="sd-process">
          <div className="sd-section-label">// Process</div>
          <h2 className="sd-section-title">How we work</h2>
          <div className="sd-timeline">
            {service.process.map((step, i) => (
              <div key={i} className="sd-timeline-item">
                <div className="sd-timeline-marker">
                  <span className="sd-timeline-step">{step.step}</span>
                  {i < service.process.length - 1 && (
                    <span className="sd-timeline-line" />
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
        <section className="sd-tools">
          <div className="sd-section-label">// Tools & Technologies</div>
          <div className="sd-tools-list">
            {service.tools.map((tool) => (
              <span key={tool} className="sd-tool-badge">
                {tool}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── E. FAQ ACCORDION ────────────────────────────────── */}
      {service.faq.length > 0 && (
        <section className="sd-faq">
          <div className="sd-section-label">// FAQ</div>
          <h2 className="sd-section-title">Common questions</h2>
          <div className="sd-faq-list">
            {service.faq.map((item, i) => (
              <div
                key={i}
                className={`sd-faq-item glass ${openFaq === i ? 'is-open' : ''}`}
              >
                <button
                  className="sd-faq-question"
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                  data-cursor="hover"
                >
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
      <section className="sd-info-boxes">
        <div className="sd-info-box glass">
          <h3 className="sd-info-box-title">Why Pixel Ninja?</h3>
          <ul className="sd-info-box-list">
            <li>
              <span className="sd-info-bullet">—</span>
              Deep expertise in each discipline, not a generalist agency spreading thin.
            </li>
            <li>
              <span className="sd-info-bullet">—</span>
              Transparent process — you know what's happening and why at every stage.
            </li>
            <li>
              <span className="sd-info-bullet">—</span>
              Handover-ready delivery: documentation, training, and no black boxes.
            </li>
          </ul>
        </div>
        <div className="sd-info-box glass">
          <h3 className="sd-info-box-title">The Process</h3>
          <ol className="sd-process-mini">
            {service.process.map((step, i) => (
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
        <section className="sd-related">
          <div className="sd-section-label">// Related</div>
          <h2 className="sd-section-title">You might also need</h2>
          <div className="sd-related-grid">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="sd-related-card glass"
                data-cursor="hover"
                data-cursor-label="↗"
              >
                <div className="sd-related-card-top">
                  <span className="sd-related-n">{rel.n}</span>
                  <span className="sd-related-cat">{rel.cat}</span>
                </div>
                <h3 className="sd-related-title">{rel.title}</h3>
                <p className="sd-related-desc">{rel.desc}</p>
                <span className="sd-related-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── H. CTA ──────────────────────────────────────────── */}
      <section className="sd-cta glass strong">
        <div className="sd-cta-inner">
          <p className="sd-cta-eyebrow">// Let's talk</p>
          <h2 className="sd-cta-title">
            Bu servis hakkında konuşalım.
          </h2>
          <p className="sd-cta-sub">
            Tell us about your project and we'll come back with a clear scope and timeline.
          </p>
          <Link
            href="/#contact"
            className="sd-cta-btn"
            data-cursor="hover"
            data-cursor-label="↗"
          >
            <span>İletişime Geç</span>
            <span className="sd-cta-arrow">↗</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
