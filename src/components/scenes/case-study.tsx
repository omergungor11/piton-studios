'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CaseScene() {
  const t = useTranslations('caseStudy');

  return (
    <div className="case-glass glass">
      <div className="case-media">
        <span className="tag-img">{t('mediaTag')}</span>
        <video className="case-img" src="/assets/red-knight.mp4" autoPlay muted loop playsInline preload="auto" />
        <span className="scale">{t('scale')}</span>
      </div>
      <div className="case-text">
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
          {t('eyebrow')}
        </div>
        <h3>
          {(t.raw('title') as string).split('{accent}')[0]}
          <span className="em">{t('titleAccent')}</span>
          {(t.raw('title') as string).split('{accent}')[1]}
        </h3>
        <div className="meta-grid">
          <div><div className="k">{t('labelClient')}</div><div className="v">{t('valueClient')}</div></div>
          <div><div className="k">{t('labelYear')}</div><div className="v">{t('valueYear')}</div></div>
          <div><div className="k">{t('labelScope')}</div><div className="v">{t('valueScope')}</div></div>
          <div><div className="k">{t('labelStack')}</div><div className="v">{t('valueStack')}</div></div>
        </div>
        <p>{t('body1')}</p>
        <p>{t('body2')}</p>
        <Link href="/projects/gel-gez-gor" className="arrow" data-cursor="hover" data-cursor-label="Open">
          <span>{t('cta')}</span>
          <span>↗</span>
        </Link>
      </div>
    </div>
  );
}
