import type { ComponentProps } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Href } from '@/lib/seo';
import styles from './blog-pagination.module.css';

type LinkHref = ComponentProps<typeof Link>['href'];

type Props = {
  page: number;
  totalPages: number;
  /** Sayfa numarasindan href uretir — blog listesi ve etiket listesi farkli rotalar kullanir. */
  hrefFor: (page: number) => Href;
};

/**
 * Gosterilecek sayfa numaralari: her zaman ilk, son, aktif ve komsulari;
 * aradaki boskuklar '…' ile isaretlenir. 7'den az sayfada hepsi listelenir.
 */
function pageWindow(page: number, total: number): (number | 'gap')[] {
  const wanted = new Set<number>([1, total, page - 1, page, page + 1]);
  if (page <= 3) [2, 3].forEach((n) => wanted.add(n));
  if (page >= total - 2) [total - 1, total - 2].forEach((n) => wanted.add(n));

  const numbers = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

  const out: (number | 'gap')[] = [];
  let previous = 0;
  for (const n of numbers) {
    if (previous && n - previous > 1) out.push('gap');
    out.push(n);
    previous = n;
  }
  return out;
}

export default async function BlogPagination({ page, totalPages, hrefFor }: Props) {
  if (totalPages <= 1) return null;

  const t = await getTranslations('blog');
  const items = pageWindow(page, totalPages);
  // seo.Href parametre tipleri gevsek (Record<string, any>); Link'in kesin birlesim tipine cevriliyor.
  const href = (n: number) => hrefFor(n) as LinkHref;

  return (
    <nav className={styles.nav} aria-label={t('pagination.label')}>
      <ul className={styles.list}>
        {page > 1 && (
          <li className={styles.item}>
            <Link
              href={href(page - 1)}
              rel="prev"
              className={`${styles.link} ${styles.edge}`}
              data-cursor="hover"
            >
              <span aria-hidden="true">←</span> <span>{t('pagination.prev')}</span>
            </Link>
          </li>
        )}

        {items.map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} className={styles.item}>
              <span className={styles.gap} aria-hidden="true">
                …
              </span>
            </li>
          ) : item === page ? (
            <li key={item} className={styles.item}>
              <span className={styles.current} aria-current="page">
                {item}
              </span>
            </li>
          ) : (
            <li key={item} className={styles.item}>
              <Link
                href={href(item)}
                className={styles.link}
                aria-label={t('pagination.goToPage', { page: item })}
                data-cursor="hover"
              >
                {item}
              </Link>
            </li>
          )
        )}

        {page < totalPages && (
          <li className={styles.item}>
            <Link
              href={href(page + 1)}
              rel="next"
              className={`${styles.link} ${styles.edge}`}
              data-cursor="hover"
            >
              <span>{t('pagination.next')}</span> <span aria-hidden="true">→</span>
            </Link>
          </li>
        )}
      </ul>

      <p className={styles.status} aria-live="off">
        {t('pagination.status', { page, total: totalPages })}
      </p>
    </nav>
  );
}
