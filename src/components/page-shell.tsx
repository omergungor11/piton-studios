'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Cursor from '@/components/cursor';
import FloatingGlass from '@/components/floating-glass';
import FloatingActions from '@/components/floating-actions';
import LanguageSwitcher from '@/components/language-switcher';

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('common');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <div className="grain" />
      <div className="page-bg" />
      <FloatingGlass />
      <Cursor />

      <header className="chrome">
        <Link href="/" className="lockup glass" data-cursor="hover" data-cursor-label="Home">
          <img src="/logo.webp" alt="" className="mark-logo" aria-hidden="true" />
          <span className="mark">Piton Studios</span>
        </Link>

        <nav className="nav glass desktop-nav">
          <Link href="/projects" className={`item ${isActive('/projects') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('projects')}</span>
              <span className="dup">{t('projects')} ↗</span>
            </span>
          </Link>
          <Link href="/services" className={`item ${isActive('/services') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('services')}</span>
              <span className="dup">{t('services')} ↗</span>
            </span>
          </Link>
          <Link href="/about" className={`item ${isActive('/about') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('about')}</span>
              <span className="dup">{t('about')} ↗</span>
            </span>
          </Link>
          <Link href="/contact" className={`item ${isActive('/contact') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('contact')}</span>
              <span className="dup">{t('contact')} ↗</span>
            </span>
          </Link>
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
              <img src="/logo.webp" alt="" className="mark-logo" aria-hidden="true" />
              <span>Piton Studios</span>
            </div>
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>

          <nav className="mm-nav">
            {[
              { href: '/projects', label: t('projects') },
              { href: '/services', label: t('services') },
              { href: '/about', label: t('about') },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mm-nav-row ${isActive(item.href) ? 'is-active' : ''}`}
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

      <main className="page-main">
        {children}
      </main>

      <footer className="page-footer glass">
        <span className="page-footer-brand">{t('copyright')}</span>
        <nav className="page-footer-nav">
          <Link href="/" className="page-footer-link" data-cursor="hover">{t('home')}</Link>
          <Link href="/projects" className="page-footer-link" data-cursor="hover">{t('projects')}</Link>
          <Link href="/services" className="page-footer-link" data-cursor="hover">{t('services')}</Link>
          <Link href="/about" className="page-footer-link" data-cursor="hover">{t('about')}</Link>
          <Link href="/contact" className="page-footer-link" data-cursor="hover">{t('contact')}</Link>
        </nav>
      </footer>
      <FloatingActions />
    </>
  );
}
