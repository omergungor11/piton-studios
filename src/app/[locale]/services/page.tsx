'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SERVICES } from '@/lib/data';
import SERVICE_ICONS from '@/components/service-icons';
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
      <section className="svc-glass" style={{ padding: 0 }}>
        <div className="svc-grid">
          {filtered.map((s) => {
            const title = ts(`${s.slug}.title`);
            const desc = ts(`${s.slug}.desc`);
            const items = ts.raw(`${s.slug}.items`) as string[];
            return (
              <Link key={s.n} href={{ pathname: '/services/[slug]', params: { slug: s.slug } }} className="svc" data-cursor="hover" data-cursor-label="+">
                <div className="svc-top">
                  <span className="n">{s.n}</span>
                  <span className="cat">{t(`filterCat.${s.cat}`)}</span>
                </div>
                <div className="svc-icon">
                  {SERVICE_ICONS[s.slug] || null}
                </div>
                <h4>{title}</h4>
                <p className="svc-desc">{desc}</p>
                <ul className="svc-items">
                  {items.map((item) => (
                    <li key={item}>
                      <span className="bullet">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="svc-arrow">↗</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta glass strong">
        <div className="sp-cta-text">
          <h3>{t('ctaTitle')}</h3>
          <p>{t('ctaSub')}</p>
        </div>
        <Link href="/contact" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>{t('ctaBtn')}</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
