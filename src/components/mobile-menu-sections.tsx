'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useMenuColumns } from '@/components/nav-mega-menu';

interface Props {
  /** Bir linke dokununca mobil menuyu kapatir. */
  onNavigate: () => void;
  /** Gosterilecek gruplar (sirasiyla): services, sectors, solutions. Bos = hepsi. */
  keys?: string[];
  /** Giris animasyonu gecikmesinin baslangic sirasi (menudeki konum). */
  delayStart?: number;
}

/** Mobil menude masaustu mega menunun karsiligi: native <details> akordeon gruplari. */
export default function MobileMenuSections({ onNavigate, keys, delayStart = 0 }: Props) {
  const t = useTranslations('common');
  const columns = useMenuColumns().filter((col) => !keys || keys.includes(col.key));

  return (
    <>
      {columns.map((col, i) => (
        <details key={col.key} className="mm-group">
          <summary
            className="mm-nav-row mm-group-summary"
            style={{ '--delay': `${(delayStart + i) * 40}ms` } as CSSProperties}
          >
            <span className="mm-nav-label">{col.title}</span>
            <span className="mm-group-caret" aria-hidden="true">+</span>
          </summary>
          <div className="mm-group-list">
            <Link href={col.href} className="mm-group-all" onClick={onNavigate}>
              {t('menu.viewAll')} →
            </Link>
            {col.items.map((item) => (
              <Link key={item.slug} href={item.href} className="mm-group-link" onClick={onNavigate}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      ))}
    </>
  );
}
