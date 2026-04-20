'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SERVICES } from '@/lib/data';
import PageShell from '@/components/page-shell';

const CATEGORIES = ['All', ...Array.from(new Set(SERVICES.map((s) => s.cat)))];

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? SERVICES : SERVICES.filter((s) => s.cat === activeCat);

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-eyebrow">Services</div>
        <h1 className="sp-hero-title">
          What we <span className="em">ship</span>.
        </h1>
        <p className="sp-hero-sub">
          End-to-end capabilities — from brand identity to production infrastructure. Each practice is led by deep expertise, not surface-level familiarity.
        </p>
      </section>

      {/* Filter */}
      <section className="sp-filter">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`sp-filter-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
            data-cursor="hover"
          >
            {cat}
            {cat !== 'All' && (
              <span className="sp-filter-count">
                {SERVICES.filter((s) => s.cat === cat).length}
              </span>
            )}
          </button>
        ))}
      </section>

      {/* Services grid */}
      <section className="sp-grid">
        {filtered.map((s) => (
          <Link key={s.n} href={`/services/${s.slug}`} className="sp-card glass" data-cursor="hover" data-cursor-label="+">
            <div className="sp-card-top">
              <span className="sp-card-n">{s.n}</span>
              <span className="sp-card-cat">{s.cat}</span>
            </div>
            <h2 className="sp-card-title">{s.title}</h2>
            <p className="sp-card-desc">{s.desc}</p>
            <ul className="sp-card-items">
              {s.items.map((item) => (
                <li key={item}>
                  <span className="sp-card-bullet">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="sp-card-footer">
              <span className="sp-card-cta">Detaylar</span>
              <span className="sp-card-arrow">↗</span>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="sp-cta glass strong">
        <div className="sp-cta-text">
          <h3>Projeniz için doğru çözümü birlikte bulalım.</h3>
          <p>İhtiyacınıza özel bir yaklaşım için bize yazın.</p>
        </div>
        <Link href="/#contact" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>İletişime Geç</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
