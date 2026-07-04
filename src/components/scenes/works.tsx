'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { WORKS, type Work, type PreviewData } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface WorksSceneProps {
  onPreview: (w: Work | null, x?: number, y?: number) => void;
}

const FEATURED = WORKS.slice(0, 6);

export default function WorksScene({ onPreview: _onPreview }: WorksSceneProps) {
  const t = useTranslations('workScene');
  const [idx, setIdx] = useState(0);
  const n = FEATURED.length;
  const work = FEATURED[idx];
  const autoRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const go = useCallback((dir: number) => {
    setIdx((i) => (i + dir + n) % n);
  }, [n]);

  // Auto-advance every 6s
  useEffect(() => {
    autoRef.current = setInterval(() => go(1), 6000);
    return () => clearInterval(autoRef.current);
  }, [go]);

  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 6000);
  };

  const prev = () => { go(-1); resetAuto(); };
  const next = () => { go(1); resetAuto(); };
  const jumpTo = (i: number) => { setIdx(i); resetAuto(); };

  return (
    <div className="proj-glass glass">
      <div className="proj-head">
        <span className="proj-tag">{t('tag', { count: String(n).padStart(2, '0') })}</span>
        <h3 dangerouslySetInnerHTML={{ __html: t('heading').replace('<em>', '<span class="em">').replace('</em>', '</span>') }} />
      </div>

      <div className="proj-slider">
        <AnimatePresence mode="wait">
          <motion.div
            key={work.slug}
            className="proj-slide"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Left: Mockup */}
            <Link href={{ pathname: '/projects/[slug]', params: { slug: work.slug } }} className="proj-mockup" data-cursor="play" data-cursor-label="View ↗">
              <div className="proj-browser-bar">
                <span className="proj-dot" />
                <span className="proj-dot" />
                <span className="proj-dot" />
                <span className="proj-browser-url">pitonstudios.dev/{work.slug}</span>
              </div>
              {work.previews?.desktop ? (
                <div className="proj-screen proj-screen-img">
                  <img src={work.previews.desktop} alt={work.title} />
                  <div className="proj-screen-overlay">
                    <span className="proj-screen-num">{work.n}</span>
                    <h2 className="proj-screen-title">{work.title}</h2>
                    <span className="proj-screen-kind">{work.kind}</span>
                  </div>
                </div>
              ) : (
                <div className="proj-screen">
                  <span className="proj-screen-num">{work.n}</span>
                  <h2 className="proj-screen-title">{work.title}</h2>
                  <span className="proj-screen-kind">{work.kind}</span>
                </div>
              )}
            </Link>

            {/* Right: Features */}
            <div className="proj-features">
              <div className="proj-meta-grid">
                <div className="proj-meta-box">
                  <span className="proj-meta-label">{t('client')}</span>
                  <span className="proj-meta-value">{work.client}</span>
                </div>
                <div className="proj-meta-box">
                  <span className="proj-meta-label">{t('type')}</span>
                  <span className="proj-meta-value">{work.kind}</span>
                </div>
                <div className="proj-meta-box">
                  <span className="proj-meta-label">{t('year')}</span>
                  <span className="proj-meta-value">{work.year}</span>
                </div>
                <div className="proj-meta-box">
                  <span className="proj-meta-label">{t('role')}</span>
                  <span className="proj-meta-value">{work.role}</span>
                </div>
              </div>

              <p className="proj-summary">{work.summary}</p>

              <div className="proj-tags">
                {work.tags.map((tag) => (
                  <span key={tag} className="proj-tag-chip">{tag}</span>
                ))}
              </div>

              <Link href={{ pathname: '/projects/[slug]', params: { slug: work.slug } }} className="proj-cta" data-cursor="hover">
                {t('cta')} <span>↗</span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="proj-ctrl">
        <div className="proj-progress">
          <span className="proj-idx">{String(idx + 1).padStart(2, '0')}</span>
          <div className="proj-bar">
            <div className="proj-bar-fill" style={{ width: `${((idx + 1) / n) * 100}%` }} />
          </div>
          <span className="proj-total">/ {String(n).padStart(2, '0')}</span>
        </div>
        <div className="proj-nav">
          <button className="proj-btn" onClick={prev} data-cursor="hover" data-cursor-label="Prev">←</button>
          <div className="proj-dots">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                className={`proj-dot-btn ${i === idx ? 'on' : ''}`}
                onClick={() => jumpTo(i)}
                aria-label={`Project ${i + 1}`}
              />
            ))}
          </div>
          <button className="proj-btn" onClick={next} data-cursor="hover" data-cursor-label="Next">→</button>
        </div>
      </div>
    </div>
  );
}

interface PreviewCardProps {
  data: PreviewData | null;
}

export function PreviewCard({ data }: PreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && data) {
      ref.current.style.transform = `translate3d(${data.x ?? window.innerWidth / 2}px, ${data.y ?? window.innerHeight / 2}px, 0) translate(-50%, -50%) scale(1)`;
    }
  }, [data]);

  return (
    <div ref={ref} className={`preview ${data ? 'on' : ''}`}>
      <div className="ph">{data ? data.title : ''}</div>
      <div className="chip-tc">
        <span className="dot" /> PREVIEW · {data ? data.kind : ''}
      </div>
    </div>
  );
}
