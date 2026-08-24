'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { CASE_RESULTS } from '@/lib/testimonials';
import { getProjectBySlug } from '@/lib/data';

export default function TestimonialsScene() {
  const t = useTranslations('testimonials');

  return (
    <div className="testimonials-glass glass">
      <div className="testimonials-head">
        <Reveal variant="fadeIn">
          <div className="eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h3>
            {(t.raw('title') as string).split('{accent}')[0]}
            <span className="em">{t('titleAccent')}</span>
            {(t.raw('title') as string).split('{accent}')[1]}
          </h3>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="testimonials-sub">{t('subtitle')}</p>
        </Reveal>
      </div>

      <Stagger staggerDelay={0.08} className="results-grid">
        {CASE_RESULTS.map((item) => {
          const work = getProjectBySlug(item.workSlug);
          return (
            <StaggerItem key={item.id}>
              <Link
                href={{ pathname: '/projects/[slug]', params: { slug: item.workSlug } }}
                className="result-card"
                data-cursor="hover"
                data-cursor-label="View"
              >
                <span className="result-highlight">{t(`results.${item.id}.highlight`)}</span>
                <p className="result-desc">{t(`results.${item.id}.desc`)}</p>
                <span className="result-project">
                  {work?.title ?? item.workSlug} <span aria-hidden="true">↗</span>
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
