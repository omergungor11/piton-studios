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
  const pathname = usePathname();
  const t = useTranslations('common');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <div className="grain" />
      <div className="page-bg" />
      <FloatingGlass />
      <Cursor />

      <header className={`page-header glass ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="page-back" data-cursor="hover" data-cursor-label="Home">
          <span className="page-back-arrow">←</span>
          <span className="page-back-label">{t('pixelNinja')}</span>
        </Link>
        <nav className="page-header-nav">
          <Link href="/projects" className={`page-header-link ${isActive('/projects') ? 'active' : ''}`} data-cursor="hover">
            {t('projects')}
          </Link>
          <Link href="/services" className={`page-header-link ${isActive('/services') ? 'active' : ''}`} data-cursor="hover">
            {t('services')}
          </Link>
          <Link href="/gallery" className={`page-header-link ${isActive('/gallery') ? 'active' : ''}`} data-cursor="hover">
            {t('gallery')}
          </Link>
          <Link href="/#contact" className="page-header-link accent" data-cursor="hover">
            {t('contact')}
          </Link>
        </nav>
        <LanguageSwitcher />
      </header>

      <main className="page-main">
        {children}
      </main>

      <footer className="page-footer glass">
        <span className="page-footer-brand">{t('copyright')}</span>
        <nav className="page-footer-nav">
          <Link href="/" className="page-footer-link" data-cursor="hover">{t('home')}</Link>
          <Link href="/projects" className="page-footer-link" data-cursor="hover">{t('projects')}</Link>
          <Link href="/services" className="page-footer-link" data-cursor="hover">{t('services')}</Link>
          <Link href="/gallery" className="page-footer-link" data-cursor="hover">{t('gallery')}</Link>
          <Link href="/#contact" className="page-footer-link" data-cursor="hover">{t('contact')}</Link>
        </nav>
      </footer>
      <FloatingActions />
    </>
  );
}
