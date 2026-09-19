'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import MatrixRain from '@/components/matrix-rain';
import PartnerBadges from '@/components/partner-badges';

export default function AboutScene() {
  const t = useTranslations('about');

  const clients = [
    'Velis LTD', 'BT Elevator', 'Gel Gez Gör',
    'Nexos Investment', 'Ambalaj Cini',
  ];

  return (
    <div className="about-glass glass">
      <div className="about-top">
        <div className="about-heading">
          <div
            data-reveal="fade"
            style={{
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 18,
              textAlign: 'center',
            }}
          >
            {t('eyebrow')}
          </div>
          <h3 data-reveal="fade" style={{ textAlign: 'center', '--reveal-delay': '100ms' } as CSSProperties}>
            {(t.raw('heading') as string).split('{accent}')[0]}
            <span className="em">{t('headingAccent')}</span>
            {(t.raw('heading') as string).split('{accent}')[1]}
          </h3>
          <p className="about-desc" data-reveal="fade" style={{ '--reveal-delay': '180ms' } as CSSProperties}>{t('desc')}</p>
          <blockquote className="about-quote" data-reveal="fade" style={{ '--reveal-delay': '260ms' } as CSSProperties}>
            <span className="about-quote-mark">&ldquo;</span>
            <p>{t('quote')}</p>
            <cite>{t('quoteAuthor')}</cite>
          </blockquote>
        </div>
        <div className="about-media code-panel" aria-hidden="true">
          <span className="about-media-tag">[ CODE · SYSTEM ]</span>
          <MatrixRain bgColor="#04080F" glyphColor="#2080D0" headColor="#B0D8FF" />
          <div className="code-core">
            <span>PTN://STUDIO</span>
            <strong>creative_system.online</strong>
          </div>
          <div className="about-media-fade" />
          <div className="about-media-caption">
            <span>{t('location')}</span>
            <span>{t('mediaCaption')}</span>
          </div>
        </div>
      </div>
      <div className="about-meta">
        <div className="block" data-reveal="rise" style={{ '--i': 0 } as CSSProperties}>
          <div className="k">{t('expertise')}</div>
          <div>{t('expertiseList')}</div>
        </div>
        <div className="block" data-reveal="rise" style={{ '--i': 1 } as CSSProperties}>
          <div className="k">{t('clients')}</div>
          <div className="list">
            {clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <div className="block" data-reveal="rise" style={{ '--i': 2 } as CSSProperties}>
          <div className="k">{t('technologies')}</div>
          <div>{t('techList')}</div>
        </div>
      </div>
      <PartnerBadges variant="trust-bar" />
    </div>
  );
}
