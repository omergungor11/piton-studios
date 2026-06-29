'use client';

import { useTranslations } from 'next-intl';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { imageUrl } from '@/lib/media';

export default function AboutScene() {
  const t = useTranslations('about');

  const clients = [
    'Velis LTD', 'BT Elevator', 'Gel Gez Gor', 'Nexos Investment',
    'Ambalaj Cini', 'Avie Global', 'Orchid Tent', 'Gabfest 2025',
  ];

  return (
    <div className="about-glass glass">
      <div className="about-top">
        <div className="about-heading">
          <Reveal variant="fadeIn">
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: 18,
                textAlign: 'center',
              }}
            >
              {t('eyebrow')}
            </div>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <h3 style={{ textAlign: 'center' }}>
              {(t.raw('heading') as string).split('{accent}')[0]}
              <span className="em">{t('headingAccent')}</span>
              {(t.raw('heading') as string).split('{accent}')[1]}
            </h3>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.2}>
            <p className="about-desc">{t('desc')}</p>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.3}>
            <blockquote className="about-quote">
              <span className="about-quote-mark">&ldquo;</span>
              <p>{t('quote')}</p>
              <cite>{t('quoteAuthor')}</cite>
            </blockquote>
          </Reveal>
        </div>
        <div className="about-media" data-cursor="hover">
          <span className="about-media-tag">{t('mediaTag')}</span>
          <img src={imageUrl('about.jpg')} alt="Piton Studios" />
          <div className="about-media-fade" />
          <div className="about-media-caption">
            <span>{t('location')}</span>
            <span>{t('mediaCaption')}</span>
          </div>
        </div>
      </div>
      <Stagger className="about-meta" staggerDelay={0.1}>
        <StaggerItem>
          <div className="block">
            <div className="k">{t('expertise')}</div>
            <div>{t('expertiseList')}</div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="block">
            <div className="k">{t('clients')}</div>
            <div className="list">
              {clients.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="block">
            <div className="k">{t('technologies')}</div>
            <div>{t('techList')}</div>
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
