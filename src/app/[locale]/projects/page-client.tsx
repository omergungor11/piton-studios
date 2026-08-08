'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { WORKS } from '@/lib/data';
import PageShell from '@/components/page-shell';
import ImpactPanel from '@/components/impact-panel';

const YEARS = ['All', ...Array.from(new Set(WORKS.map((w) => w.year))).sort((a, b) => b.localeCompare(a))];
const PREVIEW_WORKS = WORKS.filter((w) => w.previews?.desktop);

type ShowcaseView = 'desktop' | 'mobile';

export default function ProjectsPageClient() {
  const [activeYear, setActiveYear] = useState('All');
  const [showcaseView, setShowcaseView] = useState<ShowcaseView>('desktop');
  const t = useTranslations('projectsPage');
  const tw = useTranslations('works');

  const filteredWorks = activeYear === 'All' ? WORKS : WORKS.filter((w) => w.year === activeYear);

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

      {/* Etki paneli — musteri sonuclari, interaktif */}
      <ImpactPanel />

      {/* Year filter */}
      <section className="sp-filter">
        {YEARS.map((year) => (
          <button
            key={year}
            className={`sp-filter-btn ${activeYear === year ? 'active' : ''}`}
            onClick={() => setActiveYear(year)}
            data-cursor="hover"
          >
            {year === 'All' ? t('filterAll') : year}
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
