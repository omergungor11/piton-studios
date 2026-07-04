'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type View = 'desktop' | 'mobile';

interface Props {
  image: string;
  title: string;
  previews?: {
    desktop?: string;
    mobile?: string;
  };
}

function IconDesktop() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  );
}

function IconMobile() {
  return (
    <svg width="11" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}

export default function ProjectMockups({ image, title, previews }: Props) {
  const t = useTranslations('projectDetail');
  const desktopImg = previews?.desktop || image;
  const mobileImg  = previews?.mobile  || image;
  const hasMobile  = !!(previews?.mobile);

  const [view, setView] = useState<View>('desktop');

  return (
    <section className="pd-mockups">
      <div className="pd-section-head">
        <span className="pd-section-eyebrow">{t('preview')}</span>
        <h2 className="pd-section-title">{t('previewTitle')}</h2>
      </div>

      {/* Görünüm seçici */}
      {hasMobile && (
        <div className="pd-view-toggle" role="group" aria-label="Önizleme modu">
          <button
            className={`pd-view-btn ${view === 'desktop' ? 'is-active' : ''}`}
            onClick={() => setView('desktop')}
          >
            <IconDesktop />
            {t('previewDesktop')}
          </button>
          <button
            className={`pd-view-btn ${view === 'mobile' ? 'is-active' : ''}`}
            onClick={() => setView('mobile')}
          >
            <IconMobile />
            {t('previewMobile')}
          </button>
        </div>
      )}

      {/* Desktop browser */}
      {view === 'desktop' && (
        <div className="pd-mockup-desktop-wrap">
          <div className="pd-mockup-browser">
            <div className="pd-browser-bar">
              <span className="pd-browser-dot dot-red"   aria-hidden="true" />
              <span className="pd-browser-dot dot-yellow" aria-hidden="true" />
              <span className="pd-browser-dot dot-green" aria-hidden="true" />
              <div className="pd-browser-url" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span>www.example.com</span>
              </div>
            </div>
            <div className="pd-mockup-screen">
              <img src={desktopImg} alt={`${title} — ${t('previewDesktop')}`} loading="lazy" />
            </div>
          </div>
          <div className="pd-monitor-stand" aria-hidden="true" />
          <div className="pd-monitor-base"  aria-hidden="true" />
          <span className="pd-mockup-label">{t('previewDesktop')}</span>
        </div>
      )}

      {/* Mobile telefon */}
      {view === 'mobile' && (
        <div className="pd-mockup-mobile-outer">
          <div className="pd-mobile-frame">
            <div className="pd-mobile-island" aria-hidden="true" />
            <div className="pd-mockup-screen pd-screen-mobile">
              <img src={mobileImg} alt={`${title} — ${t('previewMobile')}`} loading="lazy" />
            </div>
            <div className="pd-mobile-home" aria-hidden="true" />
          </div>
          <span className="pd-mockup-label">{t('previewMobile')}</span>
        </div>
      )}
    </section>
  );
}
