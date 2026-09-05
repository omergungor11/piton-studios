'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion';

const WP_NUMBER = '905439500750';
const EMAIL     = 'hi@pitonstudios.com';

const STATS = [
  { value: '40+', labelKey: 'completedProjects' },
  { value: '5+',  labelKey: 'yearsExperience'  },
  { value: '24h', labelKey: 'responseTime'     },
] as const;

type SparkSceneProps = {
  hideStats?: boolean;
  sub?: string;
};

export default function SparkScene({ hideStats = false, sub }: SparkSceneProps) {
  const t = useTranslations('spark');

  const wpMsg = encodeURIComponent('Merhaba, proje hakkında bilgi almak istiyorum.');
  const wpUrl    = `https://wa.me/${WP_NUMBER}?text=${wpMsg}`;
  const emailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent('Proje Danışma')}`;

  return (
    <div className="spark-glass glass">

      {/* Eyebrow */}
      <Reveal variant="fadeIn">
        <div className="spark-eyebrow">
          <span className="spark-pulse" aria-hidden="true" />
          {t('eyebrow')}
        </div>
      </Reveal>

      {/* Main content grid */}
      <div className="spark-grid">
        {/* Left: headline + sub */}
        <div className="spark-left">
          <Reveal variant="fadeUp" delay={0.05}>
            <h2 className="spark-title">
              {t.rich('title', {
                accent: (chunks) => <span className="em">{chunks}</span>,
              })}
            </h2>
          </Reveal>
          <Reveal variant="fadeUp" delay={0.12}>
            <p className="spark-sub">{sub ?? t('sub')}</p>
          </Reveal>

          {!hideStats && (
            <Reveal variant="fadeUp" delay={0.18}>
              <div className="spark-stats">
                {STATS.map((s) => (
                  <div key={s.labelKey} className={`spark-stat ${s.value === '24h' ? 'spark-stat-response' : ''}`}>
                    <span className="spark-stat-value">{s.value}</span>
                    <span className="spark-stat-label">{t(`stats.${s.labelKey}`)}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Right: CTA buttons */}
        <Reveal variant="fadeUp" delay={0.1}>
          <div className="spark-right">
            <a
              href={wpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="spark-btn spark-btn-wp"
              data-cursor="hover"
              data-cursor-label="WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{t('wpBtn')}</span>
              <span className="spark-btn-arrow">↗</span>
            </a>

            <a
              href={emailUrl}
              className="spark-btn spark-btn-email"
              data-cursor="hover"
              data-cursor-label="E-posta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>{t('emailBtn')}</span>
              <span className="spark-btn-arrow">↗</span>
            </a>

            <p className="spark-note">{t('note')}</p>
          </div>
        </Reveal>
      </div>

    </div>
  );
}
