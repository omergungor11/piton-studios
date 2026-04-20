'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCENES } from '@/lib/data';

interface TopChromeProps {
  clock: string;
  activeIdx: number;
  onNav: (idx: number) => void;
}

export function TopChrome({ clock: _clock, activeIdx, onNav }: TopChromeProps) {
  const indexOf = (id: string) => SCENES.findIndex((s) => s.id === id);

  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

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
      setExpandedGroup(null);
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const idx = indexOf(id);
    onNav(idx);
  };

  const toggleGroup = (g: string) => {
    setExpandedGroup(expandedGroup === g ? null : g);
  };

  return (
    <>
      <header className="chrome">
        <div className="lockup glass">
          <span className="mark-dot" />
          <span className="mark">Pixel Ninja</span>
        </div>

        {/* Desktop nav — categorized with dropdowns */}
        <nav className="nav glass desktop-nav">
          {/* Work dropdown */}
          <div className="nav-dropdown">
            <button
              className={`item ${[2, 3, 4, 5].includes(activeIdx) ? 'active' : ''}`}
              data-cursor="hover"
            >
              <span className="row">
                <span>Work</span>
                <span className="dup">Work ↗</span>
              </span>
              <span className="nav-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu glass">
              <a href="#work" className="nav-drop-item" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>
                <span className="nav-drop-n">01</span>
                <span>Selected Works</span>
              </a>
              <a href="#stories" className="nav-drop-item" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('stories'); }}>
                <span className="nav-drop-n">02</span>
                <span>Stories</span>
              </a>
              <a href="#case" className="nav-drop-item" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('case'); }}>
                <span className="nav-drop-n">03</span>
                <span>Case Study</span>
              </a>
              <a href="#reel" className="nav-drop-item" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('reel'); }}>
                <span className="nav-drop-n">04</span>
                <span>Reel</span>
              </a>
              <div className="nav-drop-divider" />
              <Link href="/projects" className="nav-drop-item page-link" data-cursor="hover">
                <span className="nav-drop-n">↗</span>
                <span>All Projects</span>
              </Link>
              <Link href="/gallery" className="nav-drop-item page-link" data-cursor="hover">
                <span className="nav-drop-n">↗</span>
                <span>Gallery</span>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="nav-dropdown">
            <button
              className={`item ${activeIdx === indexOf('services') ? 'active' : ''}`}
              data-cursor="hover"
            >
              <span className="row">
                <span>Services</span>
                <span className="dup">Services ↗</span>
              </span>
              <span className="nav-caret">▾</span>
            </button>
            <div className="nav-dropdown-menu glass">
              <a href="#services" className="nav-drop-item" data-cursor="hover" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>
                <span className="nav-drop-n">§</span>
                <span>Overview</span>
              </a>
              <div className="nav-drop-divider" />
              <Link href="/services" className="nav-drop-item page-link" data-cursor="hover">
                <span className="nav-drop-n">↗</span>
                <span>All Services</span>
              </Link>
            </div>
          </div>

          {/* About — direct */}
          <a
            href="#about"
            className={`item ${activeIdx === indexOf('about') ? 'active' : ''}`}
            data-cursor="hover"
            data-cursor-label="↗"
            onClick={(e) => { e.preventDefault(); scrollTo('about'); }}
          >
            <span className="row">
              <span>About</span>
              <span className="dup">About ↗</span>
            </span>
          </a>

          {/* Contact — direct */}
          <a
            href="#contact"
            className={`item ${activeIdx === indexOf('contact') ? 'active' : ''}`}
            data-cursor="hover"
            data-cursor-label="↗"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
          >
            <span className="row">
              <span>Contact</span>
              <span className="dup">Contact ↗</span>
            </span>
          </a>
        </nav>

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

      {/* Mobile fullscreen menu — categorized with accordion */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-panel glass strong">
          <div className="mobile-menu-header">
            <span className="mobile-menu-tag">Navigation</span>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>

          <nav className="mobile-menu-nav">
            {/* Work group */}
            <div className="mm-group" style={{ '--delay': '0ms' } as React.CSSProperties}>
              <button className={`mm-group-toggle ${expandedGroup === 'work' ? 'is-open' : ''}`} onClick={() => toggleGroup('work')}>
                <span className="mm-group-label">Work</span>
                <span className="mm-group-badge">6</span>
                <span className="mm-group-chevron">›</span>
              </button>
              <div className={`mm-group-items ${expandedGroup === 'work' ? 'is-open' : ''}`}>
                <a href="#work" className="mobile-menu-item" onClick={(e) => { e.preventDefault(); scrollTo('work'); setMenuOpen(false); }}>
                  <span className="mobile-menu-idx">01</span>
                  <span className="mobile-menu-label">Selected Works</span>
                </a>
                <a href="#stories" className="mobile-menu-item" onClick={(e) => { e.preventDefault(); scrollTo('stories'); setMenuOpen(false); }}>
                  <span className="mobile-menu-idx">02</span>
                  <span className="mobile-menu-label">Stories</span>
                </a>
                <a href="#case" className="mobile-menu-item" onClick={(e) => { e.preventDefault(); scrollTo('case'); setMenuOpen(false); }}>
                  <span className="mobile-menu-idx">03</span>
                  <span className="mobile-menu-label">Case Study</span>
                </a>
                <a href="#reel" className="mobile-menu-item" onClick={(e) => { e.preventDefault(); scrollTo('reel'); setMenuOpen(false); }}>
                  <span className="mobile-menu-idx">04</span>
                  <span className="mobile-menu-label">Reel</span>
                </a>
                <div className="mm-sub-divider" />
                <Link href="/projects" className="mobile-menu-item mm-page-link" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-idx">↗</span>
                  <span className="mobile-menu-label">All Projects</span>
                </Link>
                <Link href="/gallery" className="mobile-menu-item mm-page-link" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-idx">↗</span>
                  <span className="mobile-menu-label">Gallery</span>
                </Link>
              </div>
            </div>

            {/* Services group */}
            <div className="mm-group" style={{ '--delay': '60ms' } as React.CSSProperties}>
              <button className={`mm-group-toggle ${expandedGroup === 'services' ? 'is-open' : ''}`} onClick={() => toggleGroup('services')}>
                <span className="mm-group-label">Services</span>
                <span className="mm-group-badge">10</span>
                <span className="mm-group-chevron">›</span>
              </button>
              <div className={`mm-group-items ${expandedGroup === 'services' ? 'is-open' : ''}`}>
                <a href="#services" className="mobile-menu-item" onClick={(e) => { e.preventDefault(); scrollTo('services'); setMenuOpen(false); }}>
                  <span className="mobile-menu-idx">§</span>
                  <span className="mobile-menu-label">Overview</span>
                </a>
                <div className="mm-sub-divider" />
                <Link href="/services" className="mobile-menu-item mm-page-link" onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu-idx">↗</span>
                  <span className="mobile-menu-label">All Services</span>
                </Link>
              </div>
            </div>

            {/* Direct links */}
            <div className="mm-group" style={{ '--delay': '120ms' } as React.CSSProperties}>
              <a href="#about" className="mm-direct-link" onClick={(e) => { e.preventDefault(); scrollTo('about'); setMenuOpen(false); }}>
                <span className="mm-group-label">About</span>
                <span className="mobile-menu-arrow">↗</span>
              </a>
            </div>

            <div className="mm-group" style={{ '--delay': '160ms' } as React.CSSProperties}>
              <a href="#contact" className="mm-direct-link" onClick={(e) => { e.preventDefault(); scrollTo('contact'); setMenuOpen(false); }}>
                <span className="mm-group-label">Contact</span>
                <span className="mobile-menu-arrow">↗</span>
              </a>
            </div>
          </nav>

          <div className="mobile-menu-footer">
            <div className="mobile-menu-contact">
              <a href="mailto:hi@pixelninja.com">hi@pixelninja.com</a>
            </div>
            <div className="mobile-menu-socials">
              <a href="https://instagram.com/pixelninja.studio" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://vimeo.com/pixelninja" target="_blank" rel="noopener noreferrer">Vimeo</a>
              <a href="https://are.na/pixel-ninja" target="_blank" rel="noopener noreferrer">Are.na</a>
              <a href="https://read.cv/pixelninja" target="_blank" rel="noopener noreferrer">Read.cv</a>
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
  const socials = [
    { l: 'IG', h: 'instagram', url: 'https://instagram.com/pixelninja.studio' },
    { l: 'AR', h: 'are.na', url: 'https://are.na/pixel-ninja' },
    { l: 'VI', h: 'vimeo', url: 'https://vimeo.com/pixelninja' },
    { l: 'RE', h: 'read.cv', url: 'https://read.cv/pixelninja' },
  ];

  return (
    <div className="bottom-chrome">
      <div className="tag-avail glass">
        <span className="star">✦</span>
        <span>A studio of one · briefs Q3 &apos;26</span>
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
      <div className="socials glass desktop-socials">
        {socials.map((s) => (
          <a
            key={s.l}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label={s.h}
            data-hover={`↗ ${s.h}`}
          >
            <span>{s.h}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
