'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { videoUrl } from '@/lib/media';

export default function ReelScene() {
  const t = useTranslations('reel');

  return (
    <div className="case-glass reel-glass glass">
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
          <div><div className="k">{t('labelReel')}</div><div className="v">{t('valueReel')}</div></div>
          <div><div className="k">{t('labelContent')}</div><div className="v">{t('valueContent')}</div></div>
          <div><div className="k">{t('labelProjectCount')}</div><div className="v">{t('valueProjectCount')}</div></div>
          <div><div className="k">{t('labelPreparedBy')}</div><div className="v">{t('valuePreparedBy')}</div></div>
        </div>
        <p>{t('body1')}</p>
        <p>{t('body2')}</p>
        <Link href="/projects" className="arrow" data-cursor="hover" data-cursor-label="Watch">
          <span>{t('cta')}</span>
          <span>↗</span>
        </Link>
      </div>
      <div className="case-media reel-media" data-cursor="play" data-cursor-label="Play ↗">
        <span className="tag-img">{t('mediaTag')}</span>
        <video className="case-img" src={videoUrl('reel-b.mp4')} autoPlay muted loop playsInline preload="auto" />
        <span className="scale">{t('scale')}</span>
      </div>
    </div>
  );
}
