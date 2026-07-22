'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

const HeroLogo3D = dynamic(() => import('@/components/hero-logo-3d'), {
  ssr: false,
  loading: () => <img src="/logo.webp" alt="Piton Studios" className="hero-logo" />,
});

interface HeroSceneProps {
  clock: string;
}

export default function HeroScene({ clock: _clock }: HeroSceneProps) {
  const t = useTranslations('hero');

  const chips = t.raw('chips') as string[];

  return (
    <div className="hero-stack">
      <div className="hero-main glass strong">
        <Reveal variant="fadeIn" duration={0.8}>
          <HeroLogo3D />
        </Reveal>
        <Reveal variant="fadeIn" duration={0.8}>
          <div className="kicker">{t('kicker')}</div>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.2} duration={0.8}>
          <h1>
            {t('title1')} <span className="it">{t('title2')}</span>
          </h1>
        </Reveal>
        <Reveal variant="fadeUp" delay={0.4}>
          <div className="sub">
            {t('subtitle')}
          </div>
        </Reveal>
        <Stagger staggerDelay={0.1} className="row-foot">
          {chips.map((chip) => (
            <StaggerItem key={chip}>
              <span className={`chip ${chip === 'ONLINE' || chip === 'ОНЛАЙН' ? 'accent' : ''}`}>
                {chip === 'ONLINE' || chip === 'ОНЛАЙН' ? `● ${chip}` : chip}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
