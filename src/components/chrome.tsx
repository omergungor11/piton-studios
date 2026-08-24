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

export function TopChrome({ clock: _clock, activeIdx: _activeIdx, onNav: _onNav }: TopChromeProps) {
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

  return (
    <>
      <header className="chrome">
        <div className="lockup glass">
          <img src="/logo.webp" alt="" className="mark-logo" aria-hidden="true" />
          <span className="mark">Piton Studios</span>
        </div>

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
          <Link href="/pricing" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('pricing')}</span>
              <span className="dup">{t('pricing')} ↗</span>
            </span>
          </Link>
          <Link href="/blog" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('blog')}</span>
              <span className="dup">{t('blog')} ↗</span>
            </span>
          </Link>
          <Link href="/faq" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('faq')}</span>
              <span className="dup">{t('faq')} ↗</span>
            </span>
          </Link>
          <Link href="/about" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('about')}</span>
              <span className="dup">{t('about')} ↗</span>
            </span>
          </Link>
          <Link href="/contact" className="item" data-cursor="hover">
            <span className="row">
              <span>{t('contact')}</span>
              <span className="dup">{t('contact')} ↗</span>
            </span>
          </Link>
        </nav>

        <LanguageSwitcher />

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

      <div className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-panel glass strong">
          <div className="mobile-menu-header">
            <div className="mm-brand">
              <img src="/logo.webp" alt="" className="mark-logo" aria-hidden="true" />
              <span>Piton Studios</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>

          <nav className="mm-nav">
            {([
              { href: '/projects', label: t('projects') },
              { href: '/services', label: t('services') },
              { href: '/pricing',  label: t('pricing')  },
              { href: '/blog',     label: t('blog')     },
              { href: '/faq',      label: t('faq')      },
              { href: '/about',    label: t('about')    },
            ] as const).map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="mm-nav-row"
                style={{ '--delay': `${i * 40}ms` } as React.CSSProperties}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mm-nav-label">{item.label}</span>
                <span className="mm-nav-arrow">→</span>
              </Link>
            ))}
          </nav>

          <div className="mm-cta">
            <Link href="/contact" className="mm-cta-btn" onClick={() => setMenuOpen(false)}>
              <span>{t('contact')}</span>
              <span>↗</span>
            </Link>
          </div>

          <div className="mobile-menu-footer">
            <a href="mailto:hi@pitonstudios.com" className="mm-footer-email">hi@pitonstudios.com</a>
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
