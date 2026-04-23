'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SERVICES } from '@/lib/data';
import PageShell from '@/components/page-shell';

const CAT_KEYS = Array.from(new Set(SERVICES.map((s) => s.cat)));

export default function ServicesPage() {
  const t = useTranslations('servicesPage');
  const ts = useTranslations('servicesList');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? SERVICES : SERVICES.filter((s) => s.cat === activeCat);

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-eyebrow">{t('title')}</div>
        <h1 className="sp-hero-title">
          {t.rich('headline', {
            accent: (chunks) => <span className="em">{chunks}</span>,
          })}
        </h1>
        <p className="sp-hero-sub">
          {t('subtitle')}
        </p>
      </section>

      {/* Filter */}
      <section className="sp-filter">
        <button
          className={`sp-filter-btn ${activeCat === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCat('All')}
          data-cursor="hover"
        >
          {t('filterAll')}
        </button>
        {CAT_KEYS.map((cat) => (
          <button
            key={cat}
            className={`sp-filter-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
            data-cursor="hover"
          >
            {t(`filterCat.${cat}`)}
            <span className="sp-filter-count">
              {SERVICES.filter((s) => s.cat === cat).length}
            </span>
          </button>
        ))}
      </section>

      {/* Services grid */}
      <section className="sp-grid">
        {filtered.map((s) => (
          <Link key={s.n} href={`/services/${s.slug}`} className="sp-card glass" data-cursor="hover" data-cursor-label="+">
            <div className="sp-card-top">
              <span className="sp-card-n">{s.n}</span>
              <span className="sp-card-cat">{t(`filterCat.${s.cat}`)}</span>
            </div>
            <h2 className="sp-card-title">{ts(`${s.slug}.title`)}</h2>
            <p className="sp-card-desc">{ts(`${s.slug}.desc`)}</p>
            <ul className="sp-card-items">
              {(ts.raw(`${s.slug}.items`) as string[]).map((item) => (
                <li key={item}>
                  <span className="sp-card-bullet">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="sp-card-footer">
              <span className="sp-card-cta">{t('details')}</span>
              <span className="sp-card-arrow">↗</span>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="sp-cta glass strong">
        <div className="sp-cta-text">
          <h3>{t('ctaTitle')}</h3>
          <p>{t('ctaSub')}</p>
        </div>
        <Link href="/#contact" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>{t('ctaBtn')}</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
