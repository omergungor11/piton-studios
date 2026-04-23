'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { WORKS, STORIES } from '@/lib/data';
import PageShell from '@/components/page-shell';

const YEARS = ['All', ...Array.from(new Set([...WORKS.map((w) => w.year), ...STORIES.map((s) => s.year)])).sort((a, b) => b.localeCompare(a))];

export default function ProjectsPage() {
  const [activeYear, setActiveYear] = useState('All');
  const t = useTranslations('projectsPage');
  const tw = useTranslations('works');
  const ts = useTranslations('stories');

  const filteredWorks = activeYear === 'All' ? WORKS : WORKS.filter((w) => w.year === activeYear);
  const filteredStories = activeYear === 'All' ? STORIES : STORIES.filter((s) => s.year === activeYear);

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
              href={`/projects/${w.slug}`}
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

      {/* Stories / Video work */}
      {filteredStories.length > 0 && (
        <section className="pp-section">
          <div className="pp-section-head">
            <span className="pp-section-tag">{t('storiesSection')}</span>
            <span className="pp-section-count">[{String(filteredStories.length).padStart(2, '0')}]</span>
          </div>
          <div className="pp-stories-grid">
            {filteredStories.map((s) => (
              <Link key={s.no} href={`/projects/${s.slug}`} className="pp-story-card glass" data-cursor="play" data-cursor-label="Play">
                <div className="pp-story-media">
                  <video src={s.video} muted loop playsInline preload="metadata" />
                  <div className="pp-story-fade" />
                  <span className="pp-story-no">{s.no}</span>
                  <div className="pp-story-meta-bottom">
                    <span>{s.year}</span>
                    <span>·</span>
                    <span>{s.role}</span>
                  </div>
                </div>
                <div className="pp-story-body">
                  <div className="pp-story-title-row">
                    <h3>{ts.has(`${s.slug}.title`) ? ts(`${s.slug}.title`) : s.title}</h3>
                    <span className="pp-story-arrow">↗</span>
                  </div>
                  <p>{ts.has(`${s.slug}.sub`) ? ts(`${s.slug}.sub`) : s.sub}</p>
                  <div className="pp-story-tags">
                    {s.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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
