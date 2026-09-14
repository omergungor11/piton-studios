'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PartnerBadges from '@/components/partner-badges';
import { LEGAL_READY } from '@/lib/legal';

interface SiteFooterProps {
  /** Anasayfada sabit alt cubuk (.bottom-chrome) footer'in ustune biner; ek bosluk birakilir. */
  variant?: 'page' | 'home';
}

const FOOTER_LINKS = [
  { href: '/', key: 'home' },
  { href: '/projects', key: 'projects' },
  { href: '/services', key: 'services' },
  { href: '/pricing', key: 'pricing' },
  { href: '/sectors', key: 'sectors' },
  { href: '/blog', key: 'blog' },
  { href: '/faq', key: 'faq' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

/**
 * Anasayfa ve ic sayfalarin ortak footer'i.
 * Siralama: ustte menu → ortada teknoloji ikonlari + hukuki linkler → en altta copyright.
 */
export default function SiteFooter({ variant = 'page' }: SiteFooterProps) {
  const t = useTranslations('common');

  return (
    <footer className={`page-footer glass ${variant === 'home' ? 'page-footer--home' : ''}`}>
      <nav className="page-footer-nav">
        {FOOTER_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="page-footer-link" data-cursor="hover">
            {t(item.key)}
          </Link>
        ))}
      </nav>

      <div className="page-footer-meta">
        <PartnerBadges variant="footer" />
        {LEGAL_READY ? (
          <nav className="page-footer-legal" aria-label="Legal">
            <Link href="/privacy" className="page-footer-link" data-cursor="hover">{t('privacy')}</Link>
            <Link href="/cookies" className="page-footer-link" data-cursor="hover">{t('cookies')}</Link>
            <Link href="/terms" className="page-footer-link" data-cursor="hover">{t('terms')}</Link>
          </nav>
        ) : null}
      </div>

      <p className="page-footer-brand">{t('copyright')}</p>
    </footer>
  );
}
