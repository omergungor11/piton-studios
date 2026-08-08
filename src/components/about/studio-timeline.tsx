'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { TIMELINE, TITLE_BY_SLUG } from '@/lib/studio-stats';

/**
 * Zaman cizelgesi — kurulustan bugune yil seridi.
 *
 * Yillar ve dagilimlar WORKS'ten turetilir; yalnizca her yilin bir cumlelik
 * yorumu cevirilerden gelir (`aboutSections.timeline.notes.<yil>`). Yorum
 * yoksa satir sessizce atlanir, yani yeni yil eklendiginde sayfa kirilmaz.
 */

export default function StudioTimeline() {
  const t = useTranslations('aboutSections');
  const tw = useTranslations('works');
  const [active, setActive] = useState(TIMELINE.length - 1);

  const entry = TIMELINE[active];
  const noteKey = `timeline.notes.${entry.year}`;
  const note = t.has(noteKey) ? t(noteKey) : null;
  const titleOf = (slug: string) =>
    tw.has(`${slug}.title`) ? tw(`${slug}.title`) : TITLE_BY_SLUG[slug];

  return (
    <section className="st glass" aria-labelledby="st-title">
      <header className="st-head">
        <div className="st-eyebrow">{t('timeline.eyebrow')}</div>
        <h2 className="st-title" id="st-title">
          {t.rich('timeline.title', { accent: (c) => <span className="em">{c}</span> })}
        </h2>
        <p className="st-desc">{t('timeline.desc')}</p>
      </header>

      <div className="st-track-wrap">
        <div className="st-track" role="tablist" aria-label={t('timeline.trackLabel')}>
          <div className="st-rail" aria-hidden="true">
            <span
              className="st-rail-fill"
              style={{ width: `${(active / (TIMELINE.length - 1)) * 100}%` }}
            />
          </div>

          {TIMELINE.map((y, i) => (
            <button
              key={y.year}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`st-year ${i === active ? 'is-active' : ''} ${y.count === 0 ? 'is-empty' : ''}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="hover"
            >
              <span className="st-year-dot" aria-hidden="true" />
              <span className="st-year-n">{y.year}</span>
              <span className="st-year-c">{y.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="st-card" key={entry.year}>
        <div className="st-card-top">
          <span className="st-card-year">{entry.year}</span>
          <span className="st-card-count">
            {t('timeline.projectCount', { count: entry.count })}
          </span>
        </div>

        {note && <p className="st-card-note">{note}</p>}

        {entry.count > 0 ? (
          <>
            <div className="st-mix">
              {entry.disciplines.map((d) => (
                <span key={d.key} className="st-chip">
                  {d.key}
                  <span className="st-chip-n">{d.count}</span>
                </span>
              ))}
            </div>

            <div className="st-links">
              {entry.highlights.map((slug) => (
                <Link
                  key={slug}
                  href={{ pathname: '/projects/[slug]', params: { slug } }}
                  className="st-link"
                  data-cursor="hover"
                  data-cursor-label="↗"
                >
                  <span>{titleOf(slug)}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </>
        ) : (
          // Yilin kendi notu varsa genel "kayit yok" cumlesini tekrarlamiyoruz
          !note && <p className="st-card-empty">{t('timeline.noProjects')}</p>
        )}
      </div>
    </section>
  );
}
