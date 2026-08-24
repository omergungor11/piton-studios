'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/motion';
import { TESTIMONIALS } from '@/lib/testimonials';
import { getProjectBySlug } from '@/lib/data';

const AUTO_INTERVAL_MS = 7000;

const ITEMS =
  process.env.NODE_ENV === 'production'
    ? TESTIMONIALS.filter((item) => item.approved)
    : TESTIMONIALS;

export default function TestimonialsScene() {
  const t = useTranslations('testimonials');
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = ITEMS.length;

  const go = useCallback((dir: number) => {
    setIdx((i) => (i + dir + n) % n);
  }, [n]);

  const jump = useCallback((i: number) => {
    setIdx(Math.max(0, Math.min(n - 1, i)));
  }, [n]);

  useEffect(() => {
    if (reduceMotion || paused || n < 2) return;
    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % n);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, n]);

  if (n === 0) return null;

  const item = ITEMS[idx];
  const work = getProjectBySlug(item.workSlug);
  const projectTitle = work?.title ?? item.clientName;

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  return (
    <div
      className="testimonials-glass glass"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="testimonials-head">
        <Reveal variant="fadeIn">
          <div className="eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h3>
            {(t.raw('title') as string).split('{accent}')[0]}
            <span className="em">{t('titleAccent')}</span>
            {(t.raw('title') as string).split('{accent}')[1]}
          </h3>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="testimonials-sub">{t('subtitle')}</p>
        </Reveal>
      </div>

      <div className="testimonials-stage" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={item.id}
            className="testimonial-card"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: 'easeOut' }}
          >
            {!item.approved && (
              <span className="testimonial-draft">{t('draftBadge')}</span>
            )}
            <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="testimonial-quote">
              <p>{t(`quotes.${item.quoteKey}`)}</p>
            </blockquote>
            <figcaption className="testimonial-meta">
              <div className="testimonial-who">
                <span className="testimonial-client">{item.clientName}</span>
                <span className="testimonial-project">{projectTitle}</span>
              </div>
              <Link
                href={{ pathname: '/projects/[slug]', params: { slug: item.workSlug } }}
                className="testimonial-link"
                data-cursor="hover"
                data-cursor-label="View"
              >
                {t('viewProject')} <span aria-hidden="true">↗</span>
              </Link>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {n > 1 && (
        <div className="testimonials-ctrl">
          <button
            className="testimonials-btn"
            onClick={() => go(-1)}
            aria-label={t('prevLabel')}
            data-cursor="hover"
            data-cursor-label="Prev"
          >
            ←
          </button>
          <div className="testimonials-dots">
            {ITEMS.map((it, i) => (
              <button
                key={it.id}
                className={`testimonials-dot ${i === idx ? 'on' : ''}`}
                onClick={() => jump(i)}
                aria-label={t('goTo', { index: i + 1 })}
                aria-current={i === idx ? 'true' : undefined}
              />
            ))}
          </div>
          <button
            className="testimonials-btn"
            onClick={() => go(1)}
            aria-label={t('nextLabel')}
            data-cursor="hover"
            data-cursor-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
