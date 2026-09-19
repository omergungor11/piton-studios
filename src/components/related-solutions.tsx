'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SplitWords from '@/components/motion/split-words';

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
      <SplitWords as="h2" className="rel-solutions-title" text={t('relatedSolutions')} />
      <div className="rel-solutions-list">
        {items.map((s, i) => (
          <Link
            key={s.slug}
            href={{ pathname: '/solutions/[slug]', params: { slug: s.slug } }}
            className="rel-solutions-link glass"
            data-cursor="hover"
            data-reveal="rise"
            style={{ '--i': i } as CSSProperties}
          >
            <span>{s.title}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
