'use client';

import { useTranslations } from 'next-intl';

interface Props {
  image: string;
  title: string;
  previews?: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
  };
}

export default function ProjectMockups({ image, title, previews }: Props) {
  const t = useTranslations('projectDetail');
  const desktopImg = previews?.desktop || image;
  const tabletImg = previews?.tablet || image;
  const mobileImg = previews?.mobile || image;

  return (
    <section className="pd-mockups">
      <div className="pd-section-head">
        <span className="pd-section-eyebrow">{t('preview')}</span>
        <h2 className="pd-section-title">{t('previewTitle')}</h2>
      </div>

      {/* Desktop */}
      <div className="pd-mockup-desktop-wrap">
        <div className="pd-mockup-browser">
          <div className="pd-browser-bar">
            <span className="pd-browser-dot dot-red" aria-hidden="true" />
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
        <div className="pd-monitor-base" aria-hidden="true" />
        <span className="pd-mockup-label">{t('previewDesktop')}</span>
      </div>

      {/* Tablet + Mobile */}
      <div className="pd-mockup-row">
        {/* Tablet */}
        <div className="pd-mockup-tablet-wrap">
          <div className="pd-tablet-frame">
            <div className="pd-tablet-camera" aria-hidden="true" />
            <div className="pd-mockup-screen pd-screen-tablet">
              <img src={tabletImg} alt={`${title} — ${t('previewTablet')}`} loading="lazy" />
            </div>
            <div className="pd-tablet-home" aria-hidden="true" />
          </div>
          <span className="pd-mockup-label">{t('previewTablet')}</span>
        </div>

        {/* Mobile */}
        <div className="pd-mockup-mobile-wrap">
          <div className="pd-mobile-frame">
            <div className="pd-mobile-island" aria-hidden="true" />
            <div className="pd-mockup-screen pd-screen-mobile">
              <img src={mobileImg} alt={`${title} — ${t('previewMobile')}`} loading="lazy" />
            </div>
            <div className="pd-mobile-home" aria-hidden="true" />
          </div>
          <span className="pd-mockup-label">{t('previewMobile')}</span>
        </div>
      </div>
    </section>
  );
}
