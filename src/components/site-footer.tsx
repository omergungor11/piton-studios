'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PartnerBadges from '@/components/partner-badges';
import { LEGAL_READY } from '@/lib/legal';
import { LOCATIONS } from '@/lib/locations';
import { FOOTER_SOLUTIONS } from '@/lib/solutions';

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
 * Iki satir: ustte menu; altta solda teknoloji ikonlari, ortada copyright, sagda hukuki linkler.
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

      {/* Kesfet: sehir ve cozum sayfalarina site geneli ic link */}
      <div className="page-footer-explore">
        <nav className="pfe-row" aria-label={t('exploreLocations')}>
          <span className="pfe-label">{t('exploreLocations')}</span>
          {LOCATIONS.map((l) => (
            <Link
              key={l.slug}
              href={{ pathname: '/locations/[slug]', params: { slug: l.slug } }}
              className="page-footer-link"
              data-cursor="hover"
            >
              {t(`cities.${l.slug}`)}
            </Link>
          ))}
          <Link href="/locations" className="page-footer-link pfe-all" data-cursor="hover">
            {t('exploreAll')} →
          </Link>
        </nav>
        <nav className="pfe-row" aria-label={t('exploreSolutions')}>
          <span className="pfe-label">{t('exploreSolutions')}</span>
          {FOOTER_SOLUTIONS.map((slug) => (
            <Link
              key={slug}
              href={{ pathname: '/solutions/[slug]', params: { slug } }}
              className="page-footer-link"
              data-cursor="hover"
            >
              {t(`solutionsShort.${slug}`)}
            </Link>
          ))}
          <Link href="/solutions" className="page-footer-link pfe-all" data-cursor="hover">
            {t('exploreAll')} →
          </Link>
        </nav>
      </div>

      <div className="page-footer-meta">
        <PartnerBadges variant="footer" />
        <p className="page-footer-brand">{t('copyright')}</p>
        {LEGAL_READY ? (
          <nav className="page-footer-legal" aria-label="Legal">
            <Link href="/privacy" className="page-footer-link" data-cursor="hover">{t('privacy')}</Link>
            <Link href="/cookies" className="page-footer-link" data-cursor="hover">{t('cookies')}</Link>
            <Link href="/terms" className="page-footer-link" data-cursor="hover">{t('terms')}</Link>
          </nav>
        ) : null}
      </div>
    </footer>
  );
}
