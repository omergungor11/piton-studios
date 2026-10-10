'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import SplitWords from '@/components/motion/split-words';

export default function HeroScene() {
  const t = useTranslations('hero');

  const chips = t.raw('chips') as string[];

  return (
    <div className="hero-stack">
      <div className="hero-main glass strong">
        <div data-reveal="fade-hero" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
          <Image
            src="/logo.webp"
            alt="Piton"
            width={720}
            height={716}
            sizes="(max-width: 500px) 52vw, (max-width: 900px) 260px, (max-width: 1308px) 26vw, 340px"
            quality={60}
            preload
            fetchPriority="high"
            className="hero-logo"
          />
        </div>
        <SplitWords as="h1" hero text={t('title1')} />
        <div className="sub" data-reveal="fade-hero" style={{ '--reveal-delay': '350ms' } as CSSProperties}>
          {t('subtitle')}
        </div>
        <div className="row-foot">
          {chips.map((chip, index) => (
            <div key={chip} data-reveal="fade-hero" style={{ '--i': index } as CSSProperties}>
              <span className={`chip ${chip === 'ONLINE' || chip === 'ОНЛАЙН' ? 'accent' : ''}`}>
                {chip === 'ONLINE' || chip === 'ОНЛАЙН' ? `● ${chip}` : chip}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div data-reveal="fade-hero" style={{ '--reveal-delay': '600ms' } as CSSProperties}>
        <div className="hero-stats glass" aria-label={t('statsLabel')}>
          {(['projects', 'sectors', 'services', 'languages'] as const).map((key) => (
            <div className="hero-stat" key={key}>
              <span className="hero-stat-value">{t(`stats.${key}.value`)}</span>
              <span className="hero-stat-label">{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
