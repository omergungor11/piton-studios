'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WORKS, STORIES } from '@/lib/data';
import PageShell from '@/components/page-shell';

const YEARS = ['All', ...Array.from(new Set([...WORKS.map((w) => w.year), ...STORIES.map((s) => s.year)])).sort((a, b) => b.localeCompare(a))];

export default function ProjectsPage() {
  const [activeYear, setActiveYear] = useState('All');

  const filteredWorks = activeYear === 'All' ? WORKS : WORKS.filter((w) => w.year === activeYear);
  const filteredStories = activeYear === 'All' ? STORIES : STORIES.filter((s) => s.year === activeYear);

  return (
    <PageShell>
      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero-eyebrow">Projects</div>
        <h1 className="sp-hero-title">
          Selected <span className="em">works</span>.
        </h1>
        <p className="sp-hero-sub">
          A curated index of brand films, identities, editorial systems, and moving image — filed by the moment each was made.
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
            {year}
          </button>
        ))}
      </section>

      {/* Projects table */}
      <section className="pp-section">
        <div className="pp-section-head">
          <span className="pp-section-tag">§ 01 · Selected Works</span>
          <span className="pp-section-count">[{String(filteredWorks.length).padStart(2, '0')}]</span>
        </div>
        <div className="pp-table glass">
          <div className="pp-table-header">
            <span>No.</span>
            <span>Project</span>
            <span className="pp-hide-mobile">Client</span>
            <span className="pp-hide-mobile">Discipline</span>
            <span>Year</span>
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
              <span className="pp-row-title">{w.title}</span>
              <span className="pp-row-meta pp-hide-mobile">{w.client}</span>
              <span className="pp-row-meta pp-hide-mobile">{w.kind}</span>
              <span className="pp-row-year">{w.year}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stories / Video work */}
      {filteredStories.length > 0 && (
        <section className="pp-section">
          <div className="pp-section-head">
            <span className="pp-section-tag">§ 02 · Stories / Motion</span>
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
                    <h3>{s.title}</h3>
                    <span className="pp-story-arrow">↗</span>
                  </div>
                  <p>{s.sub}</p>
                  <div className="pp-story-tags">
                    {s.tags.map((t) => (
                      <span key={t}>{t}</span>
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
          <h3>Bir sonraki projeniz için buradayız.</h3>
          <p>Yaratıcı sürecinizi birlikte başlatalım.</p>
        </div>
        <Link href="/#contact" className="sp-cta-btn" data-cursor="hover" data-cursor-label="↗">
          <span>İletişime Geç</span>
          <span>↗</span>
        </Link>
      </section>
    </PageShell>
  );
}
