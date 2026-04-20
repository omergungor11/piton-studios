'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

      <header className={`page-header glass ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" className="page-back" data-cursor="hover" data-cursor-label="Home">
          <span className="page-back-arrow">←</span>
          <span className="page-back-label">Pixel Ninja</span>
        </Link>
        <nav className="page-header-nav">
          <Link
            href="/projects"
            className={`page-header-link ${isActive('/projects') ? 'active' : ''}`}
            data-cursor="hover"
          >
            Projects
          </Link>
          <Link
            href="/services"
            className={`page-header-link ${isActive('/services') ? 'active' : ''}`}
            data-cursor="hover"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className={`page-header-link ${isActive('/gallery') ? 'active' : ''}`}
            data-cursor="hover"
          >
            Gallery
          </Link>
          <Link href="/#contact" className="page-header-link accent" data-cursor="hover">Contact</Link>
        </nav>
      </header>

      <main className="page-main">
        {children}
      </main>

      <footer className="page-footer glass">
        <span className="page-footer-brand">© 2025 Pixel Ninja</span>
        <nav className="page-footer-nav">
          <Link href="/" className="page-footer-link" data-cursor="hover">Home</Link>
          <Link href="/projects" className="page-footer-link" data-cursor="hover">Projects</Link>
          <Link href="/services" className="page-footer-link" data-cursor="hover">Services</Link>
          <Link href="/gallery" className="page-footer-link" data-cursor="hover">Gallery</Link>
          <Link href="/#contact" className="page-footer-link" data-cursor="hover">Contact</Link>
        </nav>
      </footer>
    </>
  );
}
