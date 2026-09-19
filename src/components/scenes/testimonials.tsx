'use client';

import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SplitWords from '@/components/motion/split-words';
import { CASE_RESULTS } from '@/lib/testimonials';
import { getProjectBySlug } from '@/lib/data';

export default function TestimonialsScene() {
  const t = useTranslations('testimonials');

  return (
    <div className="testimonials-glass glass">
      <div className="testimonials-head">
        <div className="eyebrow" data-reveal="fade">{t('eyebrow')}</div>
        <SplitWords
          as="h3"
          segments={[
            (t.raw('title') as string).split('{accent}')[0],
            { text: t('titleAccent'), className: 'em' },
            (t.raw('title') as string).split('{accent}')[1],
          ]}
        />
        <p className="testimonials-sub" data-reveal="fade" style={{ '--reveal-delay': '150ms' } as CSSProperties}>{t('subtitle')}</p>
      </div>

      <div className="results-grid">
        {CASE_RESULTS.map((item, i) => {
          const work = getProjectBySlug(item.workSlug);
          return (
            <Link
              key={item.id}
              href={{ pathname: '/projects/[slug]', params: { slug: item.workSlug } }}
              className="result-card"
              data-cursor="hover"
              data-cursor-label="View"
              data-reveal="rise"
              style={{ '--i': i } as CSSProperties}
            >
              <span className="result-highlight">{t(`results.${item.id}.highlight`)}</span>
              <p className="result-desc">{t(`results.${item.id}.desc`)}</p>
              <span className="result-project">
                {work?.title ?? item.workSlug} <span aria-hidden="true">↗</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
