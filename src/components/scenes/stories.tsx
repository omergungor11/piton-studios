'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SERVICES } from '@/lib/data';
import SERVICE_ICONS from '@/components/service-icons';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';

const FEATURED = SERVICES.slice(0, 5);

export default function StoriesScene() {
  const t = useTranslations('storiesSection');
  const ts = useTranslations('servicesList');
  const [idx, setIdx] = useState(0);
  const n = FEATURED.length;

  const go = useCallback((dir: number) => {
    setIdx((i) => Math.max(0, Math.min(n - 1, i + dir)));
  }, [n]);

  const jump = useCallback((i: number) => {
    setIdx(Math.max(0, Math.min(n - 1, i)));
  }, [n]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <div className="stories-glass glass" tabIndex={0} onKeyDown={onKey}>
      <div className="stories-head">
        <div className="stories-tag">SERVICES / {String(n).padStart(2, '0')}</div>
        <h3>
          What We <span className="em">Build</span>
        </h3>
        <p className="stories-lead">End-to-end digital solutions — from design to deployment.</p>
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="svc-showcase-desktop">
        <div className="svc-showcase-track">
          {FEATURED.map((s, i) => {
            const hasT = (() => { try { ts(`${s.slug}.title`); return true; } catch { return false; } })();
            const title = hasT ? ts(`${s.slug}.title`) : s.title;
            const desc = hasT ? ts(`${s.slug}.desc`) : s.desc;
            const items = hasT ? (ts.raw(`${s.slug}.items`) as string[]) : s.items;

            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`svc-showcase-card ${i === idx ? 'is-active' : ''}`}
                data-cursor="hover"
                data-cursor-label="View"
                onClick={() => jump(i)}
              >
                <div className="svc-showcase-top">
                  <span className="svc-showcase-num">{s.n}</span>
                  <span className="svc-showcase-cat">{s.cat}</span>
                </div>
                <div className="svc-showcase-icon">
                  {SERVICE_ICONS[s.slug] || null}
                </div>
                <h4>{title}</h4>
                <p>{desc}</p>
                <ul className="svc-showcase-items">
                  {items.map((item) => (
                    <li key={item}>
                      <span className="bullet">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span className="svc-showcase-arrow">↗</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile: card stack with swipe */}
      <div className="svc-showcase-mobile">
        <div className="svc-stack-container">
          <AnimatePresence mode="popLayout">
            {FEATURED.map((s, i) => {
              const offset = i - idx;
              const isActive = i === idx;
              const isBehind = offset > 0 && offset <= 2;
              if (offset < 0 || offset > 2) return null;

              const hasT = (() => { try { ts(`${s.slug}.title`); return true; } catch { return false; } })();
              const title = hasT ? ts(`${s.slug}.title`) : s.title;
              const desc = hasT ? ts(`${s.slug}.desc`) : s.desc;
              const items = hasT ? (ts.raw(`${s.slug}.items`) as string[]) : s.items;

              return (
                <motion.div
                  key={s.slug}
                  className={`svc-stack-card ${isActive ? 'is-active' : ''}`}
                  style={{
                    zIndex: n - offset,
                    position: offset === 0 ? 'relative' : 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                  initial={false}
                  animate={{
                    scale: 1 - offset * 0.06,
                    y: offset * 18,
                    rotate: offset * 1.5,
                    opacity: isActive ? 1 : isBehind ? 0.5 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={isActive ? onDragEnd : undefined}
                >
                  <Link href={`/services/${s.slug}`} className="svc-stack-inner" data-cursor="hover">
                    <div className="svc-showcase-top">
                      <span className="svc-showcase-num">{s.n}</span>
                      <span className="svc-showcase-cat">{s.cat}</span>
                    </div>
                    <div className="svc-showcase-icon">
                      {SERVICE_ICONS[s.slug] || null}
                    </div>
                    <h4>{title}</h4>
                    <p>{desc}</p>
                    <ul className="svc-showcase-items">
                      {items.map((item) => (
                        <li key={item}>
                          <span className="bullet">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
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
            {FEATURED.map((_, i) => (
              <button key={i} className={`stories-dot ${i === idx ? 'on' : ''}`} onClick={() => jump(i)} aria-label={`Service ${i + 1}`} />
            ))}
          </div>
          <button className="stories-btn" onClick={() => go(1)} disabled={idx === n - 1} data-cursor="hover" data-cursor-label="Next">→</button>
        </div>
      </div>
    </div>
  );
}
