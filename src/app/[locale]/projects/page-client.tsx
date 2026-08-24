'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { WORKS } from '@/lib/data';
import { AREA_KEYS, isInArea, type AreaKey } from '@/lib/studio-stats';
import PageShell from '@/components/page-shell';
import DeliveryFlow from '@/components/delivery-flow';
import SnakeBorder from '@/components/snake-border';
import ContactScene from '@/components/scenes/contact';

// Yil yerine calisma alani: yil bir projenin ne oldugunu anlatmiyor, alan anlatiyor.
// Alanlar ortusmeli — bir proje hem web hem otomasyon olabilir.
const AREA_COUNTS = Object.fromEntries(
  AREA_KEYS.map((k) => [k, WORKS.filter((w) => isInArea(w, k)).length])
) as Record<AreaKey, number>;
const PREVIEW_WORKS = WORKS.filter((w) => w.previews?.desktop);

type ShowcaseView = 'desktop' | 'mobile';

export default function ProjectsPageClient() {
  const [activeArea, setActiveArea] = useState<AreaKey | 'All'>('All');
  const [showcaseView, setShowcaseView] = useState<ShowcaseView>('desktop');
  const t = useTranslations('projectsPage');
  const tw = useTranslations('works');
  const ta = useTranslations('areas');

  const filteredWorks =
    activeArea === 'All' ? WORKS : WORKS.filter((w) => isInArea(w, activeArea));

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero is-wide">
        <div className="sp-hero-eyebrow">{t('title')}</div>
        <h1 className="sp-hero-title">
          {t.rich('headline', {
            accent: (chunks) => <span className="em">{chunks}</span>,
          })}
        </h1>
        <p className="sp-hero-sub">{t('subtitle')}</p>
      </section>

      {/* Screenshot showcase */}
      <section className="pp-showcase">
        <div className="pp-showcase-head">
          <div className="pd-preview-toggle">
            <button
              className={`pd-ptoggle-btn ${showcaseView === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setShowcaseView('desktop')}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              Desktop
            </button>
            <button
              className={`pd-ptoggle-btn ${showcaseView === 'mobile' ? 'is-active' : ''}`}
              onClick={() => setShowcaseView('mobile')}
            >
              <svg width="9" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
              </svg>
              Mobile
            </button>
          </div>
        </div>

        <div className="pp-showcase-scroll">
          {PREVIEW_WORKS.map((w) => {
            const src =
              showcaseView === 'mobile' && w.previews?.mobile
                ? w.previews.mobile
                : w.previews!.desktop!;
            const title = tw.has(`${w.slug}.title`) ? tw(`${w.slug}.title`) : w.title;
            return (
              <Link
                key={w.n}
                href={{ pathname: '/projects/[slug]', params: { slug: w.slug } }}
                className={`pp-showcase-item ${showcaseView === 'mobile' ? 'is-mobile' : 'is-desktop'}`}
                data-cursor="hover"
                data-cursor-label="View ↗"
              >
                <div className="pp-showcase-screen">
                  <Image src={src} alt={title} fill sizes="(max-width: 640px) 200px, 260px" loading="lazy" />
                </div>
                <div className="pp-showcase-meta">
                  <span className="pp-showcase-n">[{w.n}]</span>
                  <span className="pp-showcase-title">{title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Teslim akisi — surecin interaktif seridi */}
      <SnakeBorder radius={24}>
        <DeliveryFlow />
      </SnakeBorder>

      {/* Year filter */}
      <section className="sp-filter">
        <button
          className={`sp-filter-btn ${activeArea === 'All' ? 'active' : ''}`}
          onClick={() => setActiveArea('All')}
          data-cursor="hover"
        >
          {t('filterAll')}
        </button>
        {AREA_KEYS.map((key) => (
          <button
            key={key}
            className={`sp-filter-btn ${activeArea === key ? 'active' : ''}`}
            onClick={() => setActiveArea(key)}
            data-cursor="hover"
          >
            {ta(`${key}.label`)}
            <span className="sp-filter-count">{AREA_COUNTS[key]}</span>
          </button>
        ))}
      </section>

      {/* Projects table */}
      <section className="pp-section">
        <div className="pp-section-head">
          <span className="pp-section-tag">{t('worksSection')}</span>
          <span className="pp-section-count">[{String(filteredWorks.length).padStart(2, '0')}]</span>
        </div>
        <div className="pp-table glass">
          <div className="pp-table-header">
            <span>No.</span>
            <span>{t('colProject')}</span>
            <span className="pp-hide-mobile">{t('colClient')}</span>
            <span className="pp-hide-mobile">{t('colDiscipline')}</span>
            <span>{t('colYear')}</span>
          </div>
          {filteredWorks.map((w) => (
            <Link
              key={w.n}
              href={{ pathname: '/projects/[slug]', params: { slug: w.slug } }}
              className="pp-table-row"
              data-cursor="play"
              data-cursor-label="View"
            >
              <span className="pp-row-n">[{w.n}]</span>
              <span className="pp-row-title">{tw.has(`${w.slug}.title`) ? tw(`${w.slug}.title`) : w.title}</span>
              <span className="pp-row-meta pp-hide-mobile">{w.client}</span>
              <span className="pp-row-meta pp-hide-mobile">{tw.has(`${w.slug}.kind`) ? tw(`${w.slug}.kind`) : w.kind}</span>
              <span className="pp-row-year">{w.year}</span>
            </Link>
          ))}
        </div>
      </section>

      <ContactScene />
    </PageShell>
  );
}
