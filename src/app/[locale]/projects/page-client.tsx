'use client';

import '@/styles/projects.css';

import { useState, type CSSProperties, type ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/components/navigation/intent-link';
import type { AreaKey } from '@/lib/studio-stats';
import PageShell from '@/components/page-shell';
import DeliveryFlow from '@/components/delivery-flow';
import SnakeBorder from '@/components/snake-border';
import SparkScene from '@/components/scenes/spark';

export interface ProjectListingRow {
  n: string;
  slug: string;
  title: string;
  client: string;
  kind: string;
  year: string;
  preview?: string;
  areas: readonly AreaKey[];
}

export interface ProjectShowcaseItem {
  n: string;
  slug: string;
  title: string;
  desktop: string;
  mobile?: string;
}

export interface ProjectArea {
  key: AreaKey;
  label: string;
  count: number;
}

export interface DeliveryExample {
  slug: string;
  title: string;
  kind: string;
}

interface ProjectsPageClientProps {
  projects: readonly ProjectListingRow[];
  previews: readonly ProjectShowcaseItem[];
  areas: readonly ProjectArea[];
  deliveryExamples: Readonly<Record<string, DeliveryExample>>;
}

// Ekran goruntusu olmayan projede tabloda sayi tekrar etmesin — baslik bas harfleri daha okunur.
function initials(title: string): string {
  return title
    .split(/[\s·—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

type ShowcaseView = 'desktop' | 'mobile';

export default function ProjectsPageClient({
  projects,
  previews,
  areas,
  deliveryExamples,
}: ProjectsPageClientProps): ReactElement {
  const [activeArea, setActiveArea] = useState<AreaKey | 'All'>('All');
  const [showcaseView, setShowcaseView] = useState<ShowcaseView>('desktop');
  const t = useTranslations('projectsPage');

  const filteredWorks =
    activeArea === 'All' ? projects : projects.filter((work) => work.areas.includes(activeArea));

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero is-wide">
        <div className="sp-hero-eyebrow" data-reveal="fade-hero">{t('title')}</div>
        <h1 className="sp-hero-title" data-reveal="fade-hero" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
          {t.rich('headline', {
            accent: (chunks) => <span className="em">{chunks}</span>,
          })}
        </h1>
        <p className="sp-hero-sub" data-reveal="fade-hero" style={{ '--reveal-delay': '240ms' } as CSSProperties}>
          {t('subtitle')}
        </p>
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
          {previews.map((w) => {
            const src =
              showcaseView === 'mobile' && w.mobile
                ? w.mobile
                : w.desktop;
            return (
              <Link
                key={w.n}
                href={{ pathname: '/projects/[slug]', params: { slug: w.slug } }}
                className={`pp-showcase-item ${showcaseView === 'mobile' ? 'is-mobile' : 'is-desktop'}`}
                data-cursor="hover"
                data-cursor-label="View ↗"
              >
                <div className="pp-showcase-screen">
                  <Image src={src} alt={w.title} fill sizes="(max-width: 640px) 200px, 260px" loading="lazy" />
                </div>
                <div className="pp-showcase-meta">
                  <span className="pp-showcase-n">[{w.n}]</span>
                  <span className="pp-showcase-title">{w.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Teslim akisi — surecin interaktif seridi */}
      <SnakeBorder radius={24}>
        <DeliveryFlow examples={deliveryExamples} />
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
        {areas.map((area) => (
          <button
            key={area.key}
            className={`sp-filter-btn ${activeArea === area.key ? 'active' : ''}`}
            onClick={() => setActiveArea(area.key)}
            data-cursor="hover"
          >
            {area.label}
            <span className="sp-filter-count">{area.count}</span>
          </button>
        ))}
      </section>

      {/* Projects table */}
      <section className="pp-section">
        <div className="pp-section-head" data-reveal="fade">
          <span className="pp-section-tag">{t('worksSection')}</span>
          <span className="pp-section-count">[{String(filteredWorks.length).padStart(2, '0')}]</span>
        </div>
        <div className="pp-table glass">
          <div className="pp-table-header">
            <span>No.</span>
            <span aria-hidden="true" />
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
              <span className="pp-row-thumb" aria-hidden="true">
                {w.preview ? (
                  <Image
                    src={w.preview}
                    alt=""
                    fill
                    sizes="(max-width: 1000px) 56px, 96px"
                    loading="lazy"
                  />
                ) : (
                  <span className="pp-row-thumb-empty">{initials(w.title)}</span>
                )}
              </span>
              <span className="pp-row-title">{w.title}</span>
              <span className="pp-row-meta pp-hide-mobile">{w.client}</span>
              <span className="pp-row-meta pp-hide-mobile">{w.kind}</span>
              <span className="pp-row-year">{w.year}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="subpage-spark">
        <SparkScene hideStats sub={t('ctaSub')} />
      </div>
    </PageShell>
  );
}
