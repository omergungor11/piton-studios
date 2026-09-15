'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import Cursor from '@/components/cursor';
import BgStage from '@/components/bg-stage';
import FloatingGlass from '@/components/floating-glass';
import FloatingActions from '@/components/floating-actions';
import LanguageSwitcher from '@/components/language-switcher';
import SiteFooter from '@/components/site-footer';
import NavMegaMenu from '@/components/nav-mega-menu';
import MobileMenuSections from '@/components/mobile-menu-sections';

interface PageShellProps {
  children: React.ReactNode;
  /** Tam ekran deneyimlerde rekabet eden GPU efektlerini ve sabit aksiyonlari kapatir. */
  immersive?: boolean;
}

export default function PageShell({ children, immersive = false }: PageShellProps) {
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
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // next-intl usePathname dile gore degil, ic rota sablonunu dondurur (/projects/[slug]);
  // bu yuzden kanonik yolla karsilastirilir. (Onceki yerel-yol esleme TR'de hic eslesmiyordu.)
  const isActive = (canonical: string) =>
    pathname === canonical || pathname.startsWith(canonical + '/');

  const mobileRow = (
    item: { href: '/projects' | '/pricing' | '/sectors' | '/blog' | '/faq' | '/about'; label: string },
    order: number
  ) => (
    <Link
      key={item.href}
      href={item.href}
      className={`mm-nav-row ${isActive(item.href) ? 'is-active' : ''}`}
      style={{ '--delay': `${order * 40}ms` } as React.CSSProperties}
      onClick={() => setMenuOpen(false)}
    >
      <span className="mm-nav-label">{item.label}</span>
      <span className="mm-nav-arrow">→</span>
    </Link>
  );

  return (
    <>
      <div className="grain" />
      {/* Ic sayfalar da anasayfanin arka planini kullaniyor — duz renk yerine aurora */}
      <BgStage />
      {!immersive ? <FloatingGlass /> : null}
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
          <NavMegaMenu
            label={t('services')}
            active={['/services', '/sectors', '/solutions'].some(isActive)}
          />
          <Link href="/pricing" className={`item ${isActive('/pricing') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('pricing')}</span>
              <span className="dup">{t('pricing')} ↗</span>
            </span>
          </Link>
          <Link href="/blog" className={`item ${isActive('/blog') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('blog')}</span>
              <span className="dup">{t('blog')} ↗</span>
            </span>
          </Link>
          <Link href="/faq" className={`item ${isActive('/faq') ? 'active' : ''}`} data-cursor="hover">
            <span className="row">
              <span>{t('faq')}</span>
              <span className="dup">{t('faq')} ↗</span>
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

          {/* Sira: Hizmetler (grup) → Projeler → Fiyatlar → Cozumler (grup) → Sektorler → kalan sayfalar */}
          <nav className="mm-nav">
            <MobileMenuSections keys={['services']} onNavigate={() => setMenuOpen(false)} />
            {mobileRow({ href: '/projects', label: t('projects') }, 1)}
            {mobileRow({ href: '/pricing', label: t('pricing') }, 2)}
            <MobileMenuSections
              keys={['solutions']}
              delayStart={3}
              onNavigate={() => setMenuOpen(false)}
            />
            {mobileRow({ href: '/sectors', label: t('sectors') }, 4)}
            {mobileRow({ href: '/blog', label: t('blog') }, 5)}
            {mobileRow({ href: '/faq', label: t('faq') }, 6)}
            {mobileRow({ href: '/about', label: t('about') }, 7)}
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

      <SiteFooter />
      {!immersive ? <FloatingActions /> : null}
    </>
  );
}
