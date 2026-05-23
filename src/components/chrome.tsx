'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
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

        {/* Desktop nav — anchor links + page links */}
        <nav className="nav glass desktop-nav">
          <Link href="/projects" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('projects')}</span>
              <span className="dup">{t('projects')} ↗</span>
            </span>
          </Link>
          <Link href="/services" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('services')}</span>
              <span className="dup">{t('services')} ↗</span>
            </span>
          </Link>
          <Link href="/gallery" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('gallery')}</span>
              <span className="dup">{t('gallery')} ↗</span>
            </span>
          </Link>
          {(['about'] as const).map((id) => (
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
          <a
            href="#contact"
            className={`item ${activeIdx === indexOf('contact') ? 'active' : ''}`}
            data-cursor="hover"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
          >
            <span className="row">
              <span>{t('contact')}</span>
              <span className="dup">{t('contact')} ↗</span>
            </span>
          </a>
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
          <div className="mobile-menu-header">
            <div className="mm-brand">
              <span className="mark-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              <span>Pixel Ninja</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>

          <nav className="mm-nav">
            <Link href="/projects" className="mm-nav-row" style={{ '--delay': '0ms' } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="mm-nav-label">{t('projects')}</span>
              <span className="mm-nav-arrow">→</span>
            </Link>
            <Link href="/services" className="mm-nav-row" style={{ '--delay': '40ms' } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="mm-nav-label">{t('services')}</span>
              <span className="mm-nav-arrow">→</span>
            </Link>
            <Link href="/gallery" className="mm-nav-row" style={{ '--delay': '80ms' } as React.CSSProperties} onClick={() => setMenuOpen(false)}>
              <span className="mm-nav-label">{t('gallery')}</span>
              <span className="mm-nav-arrow">→</span>
            </Link>
            {[
              { id: 'about', key: 'about' as const },
            ].map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`mm-nav-row ${activeIdx === indexOf(s.id) ? 'is-active' : ''}`}
                style={{ '--delay': `${(i + 3) * 40}ms` } as React.CSSProperties}
                onClick={(e) => { e.preventDefault(); scrollTo(s.id); setMenuOpen(false); }}
              >
                <span className="mm-nav-label">{t(s.key)}</span>
                <span className="mm-nav-arrow">→</span>
              </a>
            ))}
          </nav>

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
