'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export interface RelatedSolution {
  slug: string;
  title: string;
}

interface Props {
  /** Sunucuda cozulmus cozum basliklari (solutionItems.{slug}.title). */
  items: RelatedSolution[];
  className?: string;
}

/** Hizmet, proje ve sektor sayfalarindan cozum sayfalarina ic link blogu. */
export default function RelatedSolutions({ items, className = '' }: Props) {
  const t = useTranslations('common');
  if (items.length === 0) return null;

  return (
    <section className={`rel-solutions ${className}`}>
      <h2 className="rel-solutions-title">{t('relatedSolutions')}</h2>
      <div className="rel-solutions-list">
        {items.map((s) => (
          <Link
            key={s.slug}
            href={{ pathname: '/solutions/[slug]', params: { slug: s.slug } }}
            className="rel-solutions-link glass"
            data-cursor="hover"
          >
            <span>{s.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
