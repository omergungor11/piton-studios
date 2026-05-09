'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { videoUrl } from '@/lib/media';
import { STORIES } from '@/lib/data';

export default function StoriesScene() {
  const t = useTranslations('storiesSection');
  const ts = useTranslations('stories');
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stories = STORIES.slice(0, 6);
  const n = stories.length;

  const go = (dir: number) => setIdx((i) => Math.max(0, Math.min(n - 1, i + dir)));
  const jump = (i: number) => setIdx(Math.max(0, Math.min(n - 1, i)));

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [idx]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <div className="stories-glass glass" tabIndex={0} onKeyDown={onKey}>
      <div className="stories-head">
        <div className="stories-tag">{t('eyebrow')} / {String(n).padStart(2, '0')}</div>
        <h3>
          {(t.raw('title') as string).split('{accent}')[0]}
          <span className="em">{t('titleAccent')}</span>
          {(t.raw('title') as string).split('{accent}')[1]}
        </h3>
        <p className="stories-lead">{t('lead')}</p>
      </div>

      <div className="stories-viewport">
        <div className="stories-track" ref={trackRef}>
          {stories.map((s, i) => (
            <Link
              key={s.no}
              href={`/projects/${s.slug}`}
              className={`story-card ${i === idx ? 'is-active' : ''}`}
              data-cursor="play"
              data-cursor-label="Play"
              onClick={() => jump(i)}
            >
              <div className="story-media">
                <span className="story-no">{s.no}</span>
                <video src={videoUrl(s.video)} autoPlay muted loop playsInline preload="metadata" />
                <div className="story-fade" />
                <div className="story-meta-bottom">
                  <span>{s.year}</span>
                  <span>·</span>
                  <span>{ts.has(`${s.slug}.role`) ? ts(`${s.slug}.role`) : s.role}</span>
                </div>
              </div>
              <div className="story-body">
                <div className="story-title-row">
                  <h4>{ts.has(`${s.slug}.title`) ? ts(`${s.slug}.title`) : s.title}</h4>
                  <span className="story-arrow">↗</span>
                </div>
                <p>{ts.has(`${s.slug}.sub`) ? ts(`${s.slug}.sub`) : s.sub}</p>
                <div className="story-tags">
                  {s.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="stories-ctrl">
        <div className="stories-progress">
          <span className="stories-idx">{String(idx + 1).padStart(2, '0')}</span>
          <div className="stories-bar">
            <div className="stories-bar-fill" style={{ width: `${((idx + 1) / n) * 100}%` }} />
          </div>
          <span className="stories-total">/ {String(n).padStart(2, '0')}</span>
        </div>
        <div className="stories-nav">
          <button className="stories-btn" onClick={() => go(-1)} disabled={idx === 0} data-cursor="hover" data-cursor-label="Prev">←</button>
          <div className="stories-dots">
            {stories.map((_, i) => (
              <button key={i} className={`stories-dot ${i === idx ? 'on' : ''}`} onClick={() => jump(i)} aria-label={`Story ${i + 1}`} />
            ))}
          </div>
          <button className="stories-btn" onClick={() => go(1)} disabled={idx === n - 1} data-cursor="hover" data-cursor-label="Next">→</button>
        </div>
      </div>
    </div>
  );
}
