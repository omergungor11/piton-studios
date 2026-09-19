'use client';

import type { ComponentProps } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

/**
 * SERVICES (src/lib/data.ts) sirasi. data.ts buyuk oldugu icin her sayfanin istemci
 * paketine girmesin diye slug'lar burada tutulur — hizmet eklenirse buraya da ekleyin.
 * Etiketler: messages → common.menu.services.{slug}.
 */
const SERVICE_SLUGS = [
  'web-design',
  'custom-software',
  'web-app',
  'mobile-app',
  'progressive-web-app',
  'ecommerce',
  'erp-crm',
  'automation',
  'whatsapp-chatbot',
  'ai-integration',
  'ai-consulting',
  'data-engineering',
  'cloud-ecosystem',
  'google-ads',
  'meta-ads',
  'seo-geo',
  'maintenance-support',
  'how-to-do',
] as const;

/**
 * Menude one cikan cozumler: birbirinden farkli sorunlari cozenler (hepsi degil — tumu /cozumler'de).
 * Etiketler: messages → common.menu.solutionNames.{slug}. Sektor sayfalari menude listelenmez.
 */
const FEATURED_SOLUTIONS = [
  'real-estate-listing-software',
  'construction-erp',
  'transfer-booking-system',
  'restaurant-qr-ordering',
  'whatsapp-sales-bot',
  'corporate-ai-assistant',
] as const;

export interface MenuColumn {
  key: string;
  title: string;
  href: Href;
  items: { slug: string; href: Href; label: string }[];
}

/** Masaustu mega menu ve mobil akordeon ayni kolonlari paylasir. */
export function useMenuColumns(): MenuColumn[] {
  const t = useTranslations('common');

  return [
    {
      key: 'services',
      title: t('services'),
      href: '/services',
      items: SERVICE_SLUGS.map((slug) => ({
        slug,
        href: { pathname: '/services/[slug]', params: { slug } },
        label: t(`menu.services.${slug}`),
      })),
    },
    {
      key: 'solutions',
      title: t('menu.featuredSolutions'),
      href: '/solutions',
      items: FEATURED_SOLUTIONS.map((slug) => ({
        slug,
        href: { pathname: '/solutions/[slug]', params: { slug } },
        label: t(`menu.solutionNames.${slug}`),
      })),
    },
  ];
}

interface Props {
  label: string;
  active?: boolean;
}

/** Masaustu nav'daki "Hizmetler" ogesi: hizmetler + one cikan cozumler, altta tum cozumler / sektorler. */
export default function NavMegaMenu({ label, active = false }: Props) {
  const t = useTranslations('common');
  const [services, solutions] = useMenuColumns();

  return (
    <div className="nav-mega">
      <Link
        href="/services"
        className={`item ${active ? 'active' : ''}`}
        data-cursor="hover"
        aria-haspopup="true"
      >
        <span className="row">
          <span>{label}</span>
          <span className="dup">{label} ↗</span>
        </span>
        <span className="nav-caret" aria-hidden="true">▾</span>
      </Link>

      {/* Dis kapsayici kirpmaz: ust boslugu tetikle panel arasindaki hover koprusu.
          Ic panel ekrana sigmazsa kendi icinde kayar. */}
      <div className="nav-mega-drop">
        <div className="nav-mega-panel glass strong" data-lenis-prevent>
          {[services, solutions].map((col) => (
            <nav key={col.key} className={`nav-mega-col nav-mega-col--${col.key}`} aria-label={col.title}>
              <Link href={col.href} className="nav-mega-title" data-cursor="hover">
                <span>{col.title}</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <div className="nav-mega-list">
                {col.items.map((item) => (
                  <Link key={item.slug} href={item.href} className="nav-drop-item" data-cursor="hover">
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          ))}

          <div className="nav-mega-foot">
            <Link href="/solutions" className="nav-mega-foot-link" data-cursor="hover">
              {t('menu.allSolutions')} →
            </Link>
            <Link href="/sectors" className="nav-mega-foot-link" data-cursor="hover">
              {t('menu.allSectors')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
