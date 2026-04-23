'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SCENES } from '@/lib/data';
import LanguageSwitcher from '@/components/language-switcher';

interface TopChromeProps {
  clock: string;
  activeIdx: number;
  onNav: (idx: number) => void;
}

export function TopChrome({ clock: _clock, activeIdx, onNav }: TopChromeProps) {
  const indexOf = (id: string) => SCENES.findIndex((s) => s.id === id);
  const t = useTranslations('nav');

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1000) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const idx = indexOf(id);
    onNav(idx);
  };

  return (
    <>
      <header className="chrome">
        <div className="lockup glass">
          <span className="mark-dot" />
          <span className="mark">Pixel Ninja</span>
        </div>

        {/* Desktop nav */}
        <nav className="nav glass desktop-nav">
          {(['services', 'stories', 'about', 'contact'] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`item ${activeIdx === indexOf(id) ? 'active' : ''}`}
              data-cursor="hover"
              onClick={(e) => { e.preventDefault(); scrollTo(id); }}
            >
              <span className="row">
                <span>{t(id)}</span>
                <span className="dup">{t(id)} ↗</span>
              </span>
            </a>
          ))}
        </nav>

        <LanguageSwitcher />

        {/* Mobile hamburger */}
        <button
          className={`mobile-menu-btn glass ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="burger-line" />
          <span className="burger-line" />
          <span className="burger-line" />
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-panel glass strong">
          {/* Header */}
          <div className="mobile-menu-header">
            <div className="mm-brand">
              <span className="mark-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span>Pixel Ninja</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>

          {/* Flat navigation list */}
          <nav className="mm-nav">
            {[
              { id: 'services', key: 'services' },
              { id: 'stories',  key: 'stories' },
              { id: 'case',     key: 'caseStudy' },
              { id: 'reel',     key: 'reel' },
              { id: 'about',    key: 'about' },
            ].map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`mm-nav-row ${activeIdx === indexOf(s.id) ? 'is-active' : ''}`}
                style={{ '--delay': `${i * 40}ms` } as React.CSSProperties}
                onClick={(e) => { e.preventDefault(); scrollTo(s.id); setMenuOpen(false); }}
              >
                <span className="mm-nav-label">{t(s.key as 'services' | 'stories' | 'about' | 'contact' | 'caseStudy' | 'reel')}</span>
                <span className="mm-nav-arrow">→</span>
              </a>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="mm-cta">
            <a
              href="#contact"
              className="mm-cta-btn"
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); setMenuOpen(false); }}
            >
              <span>{t('contact')}</span>
              <span>↗</span>
            </a>
          </div>

          {/* Footer */}
          <div className="mobile-menu-footer">
            <a href="mailto:hi@pixelninja.com" className="mm-footer-email">hi@pixelninja.com</a>
            <div className="mm-lang-switcher">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface BottomChromeProps {
  activeIdx: number;
  progress: number;
}

export function BottomChrome({ activeIdx, progress }: BottomChromeProps) {
  const t = useTranslations('chrome');
  return (
    <div className="bottom-chrome">
      <div className="tag-avail glass">
        <span className="star">✦</span>
        <span>{t('availability')}</span>
      </div>
      <div className="scene-indicator glass">
        <span className="n">{String(activeIdx + 1).padStart(2, '0')}</span>
        <span className="bar" style={{ '--p': progress } as React.CSSProperties}>
          <i />
        </span>
        <span style={{ color: 'var(--muted)' }}>
          {String(SCENES.length).padStart(2, '0')} · {SCENES[activeIdx]?.label}
        </span>
      </div>
    </div>
  );
}
