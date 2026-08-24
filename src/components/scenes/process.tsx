'use client';

import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion';

const STEP_KEYS = ['1', '2', '3', '4', '5', '6'] as const;

const STEP_ICONS = [
  /* 1: Keşif & Analiz */ <svg key="1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="14" cy="14" r="8" /><line x1="20" y1="20" x2="27" y2="27" /><path d="M11 14h6" /><path d="M14 11v6" /></svg>,
  /* 2: Teklif & Kapsam */ <svg key="2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h12l6 6v18H8z" /><path d="M20 4v6h6" /><line x1="12" y1="16" x2="22" y2="16" /><line x1="12" y1="21" x2="18" y2="21" /></svg>,
  /* 3: Tasarım */ <svg key="3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="6" width="24" height="20" rx="2" /><line x1="4" y1="12" x2="28" y2="12" /><line x1="12" y1="12" x2="12" y2="26" /><path d="M17 18h7" /><path d="M17 22h4" /></svg>,
  /* 4: Geliştirme */ <svg key="4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10l-6 6 6 6" /><path d="M20 10l6 6-6 6" /><line x1="17.5" y1="8" x2="14.5" y2="24" /></svg>,
  /* 5: Yayın */ <svg key="5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4c4 4 6 9 6 14l-6 4-6-4c0-5 2-10 6-14z" /><circle cx="16" cy="14" r="2.5" /><path d="M10 22l-3 6 6-2" /><path d="M22 22l3 6-6-2" /></svg>,
  /* 6: Destek & Büyüme */ <svg key="6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 27V17" /><path d="M12 27V12" /><path d="M19 27V15" /><path d="M26 27V8" /><path d="M5 12l7-5 7 4 7-6" /></svg>,
];

export default function ProcessScene() {
  const t = useTranslations('processScene');

  return (
    <div className="prc-glass glass">
      <header className="prc-head">
        <Reveal variant="fadeIn">
          <div className="prc-eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.08}>
          <h2 className="prc-title">
            {t.rich('title', {
              accent: (chunks) => <span className="em">{chunks}</span>,
            })}
          </h2>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.16}>
          <p className="prc-sub">{t('sub')}</p>
        </Reveal>
      </header>

      <ol className="prc-grid">
        {STEP_KEYS.map((k, i) => (
          <Reveal key={k} variant="fadeUp" delay={0.1 + i * 0.07} className="prc-cell">
            <li className="prc-step" data-cursor="hover">
              <span className="prc-step-ghost" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="prc-step-top">
                <span className="prc-step-dot" aria-hidden="true" />
                <span className="prc-step-icon" aria-hidden="true">
                  {STEP_ICONS[i]}
                </span>
              </div>
              <h4 className="prc-step-title">{t(`steps.${k}.title`)}</h4>
              <p className="prc-step-desc">{t(`steps.${k}.desc`)}</p>
              {i < STEP_KEYS.length - 1 && (
                <span className="prc-step-link" aria-hidden="true" />
              )}
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal variant="fadeUp" delay={0.2}>
        <footer className="prc-foot">
          <p className="prc-foot-note">{t('footNote')}</p>
          <a href="#contact" className="prc-cta" data-cursor="hover" data-cursor-label="→">
            <span>{t('cta')}</span>
            <span className="prc-cta-arrow" aria-hidden="true">↗</span>
          </a>
        </footer>
      </Reveal>
    </div>
  );
}
