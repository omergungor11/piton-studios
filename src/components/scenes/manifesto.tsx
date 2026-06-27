'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion';

const ICONS = [
  /* 0: Hızlı Teslimat */ <svg key="0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="10" /><path d="M16 6v10l6 4" /></svg>,
  /* 1: Kalite */ <svg key="1" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 28l6-16h8l6 16" /><path d="M10 20h12" /><circle cx="16" cy="8" r="3" /></svg>,
  /* 2: Uçtan Uca */ <svg key="2" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="10" height="10" rx="2" /><rect x="18" y="4" width="10" height="10" rx="2" /><rect x="4" y="18" width="10" height="10" rx="2" /><rect x="18" y="18" width="10" height="10" rx="2" /><line x1="14" y1="9" x2="18" y2="9" /><line x1="9" y1="14" x2="9" y2="18" /><line x1="23" y1="14" x2="23" y2="18" /></svg>,
  /* 3: AI */ <svg key="3" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="3" /><circle cx="16" cy="16" r="10" /><path d="M16 6v7" /><path d="M16 19v7" /><path d="M6 16h7" /><path d="M19 16h7" /></svg>,
  /* 4: SEO */ <svg key="4" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="11" /><ellipse cx="16" cy="16" rx="5" ry="11" /><line x1="5" y1="12" x2="27" y2="12" /><line x1="5" y1="20" x2="27" y2="20" /><line x1="16" y1="5" x2="16" y2="27" /></svg>,
  /* 5: Ödeme & SaaS */ <svg key="5" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="8" width="24" height="16" rx="2" /><line x1="4" y1="14" x2="28" y2="14" /><line x1="8" y1="20" x2="14" y2="20" /><circle cx="24" cy="20" r="2" /></svg>,
  /* 6: Otomasyon */ <svg key="6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3" /><circle cx="24" cy="8" r="3" /><circle cx="16" cy="24" r="3" /><path d="M10.5 9.5L14 21.5" /><path d="M21.5 9.5L18 21.5" /><path d="M11 8h10" /><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" /></svg>,
  /* 7: Cloud & DevOps */ <svg key="7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 24a5 5 0 01-.5-9.96A7.5 7.5 0 0122 10a6 6 0 012 11.66" /><path d="M12 24h12" /><line x1="16" y1="18" x2="16" y2="28" /><line x1="14" y1="20" x2="16" y2="18" /><line x1="18" y1="20" x2="16" y2="18" /></svg>,
];

const CODE_COLUMNS = [
  ['const studio = "Piton";', 'render.motion(reel);', 'await idea.launch();', 'brand.signal++', 'frame.sync(60);', 'ship.clean();'],
  ['01001000', 'motion.map()', 'AI.compose()', 'scene.cut()', 'color.grade()', 'deploy.edge()'],
  ['{ strategy: true }', '<visual-story />', 'while (bold) build();', 'pixel.align();', 'sound.mix();', 'client.ready'],
  ['function spark()', 'const craft = code;', 'timeline.play()', 'grid.calibrate()', 'export.story()', 'studio.online'],
];

export default function ManifestoScene() {
  const t = useTranslations('manifesto');
  const cardsRef = useRef<HTMLDivElement>(null);

  const highlights = t.raw('highlights') as { title: string; desc: string }[];

  useEffect(() => {
    const equalize = () => {
      const container = cardsRef.current;
      if (!container) return;
      const cards = Array.from(container.querySelectorAll('.manifesto-card')) as HTMLElement[];
      cards.forEach((c) => { c.style.height = 'auto'; });
      const maxH = Math.max(...cards.map((c) => c.offsetHeight));
      cards.forEach((c) => { c.style.height = `${maxH}px`; });
    };
    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  return (
    <div className="manifesto-glass glass">
      <div className="manifesto-main">
        <Reveal variant="fadeIn">
          <div className="eyebrow">{t('eyebrow')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.1}>
          <h2>
            {(t.raw('title') as string).split('{accent}')[0]}
            <span className="em">{t('titleAccent')}</span>
            {(t.raw('title') as string).split('{accent}')[1]}
          </h2>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2}>
          <p className="manifesto-sub">{t('subtitle')}</p>
        </Reveal>
        <div className="manifesto-cards" ref={cardsRef}>
          {highlights.map((h, i) => (
            <div key={i} className="manifesto-card">
              <div className="manifesto-card-icon">{ICONS[i]}</div>
              <div>
                <h4 className="manifesto-card-title">{h.title}</h4>
                <p className="manifesto-card-desc">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Reveal variant="scaleIn" delay={0.2}>
      <div className="note-media code-panel" aria-hidden="true">
        <span className="note-media-tag">[ CODE · SYSTEM ]</span>
        <div className="code-grid">
          {CODE_COLUMNS.map((column, index) => (
            <div
              className="code-column"
              style={{ '--stream-index': index } as React.CSSProperties}
              key={index}
            >
              {[...column, ...column, ...column].map((line, lineIndex) => (
                <span key={`${line}-${lineIndex}`}>{line}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="code-core">
          <span>PTN://STUDIO</span>
          <strong>creative_system.online</strong>
        </div>
        <div className="note-media-fade" />
        <div className="note-media-caption">
          <span>Live</span><span>— Code · AI</span>
        </div>
      </div>
      </Reveal>
    </div>
  );
}
