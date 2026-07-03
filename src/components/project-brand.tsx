'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { type ColorSwatch } from '@/lib/data';

interface TypographyData {
  family: string;
  googleFont?: string;
}

interface Props {
  title: string;
  desc?: string;
  typography?: TypographyData;
  colors?: ColorSwatch[];
}

function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

export default function ProjectBrand({ title, desc, typography, colors }: Props) {
  const t = useTranslations('projectDetail');

  useEffect(() => {
    if (!typography?.googleFont) return;
    const id = `gf-${typography.family.replace(/\s+/g, '-')}`;
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${typography.googleFont}&display=swap`;
    document.head.appendChild(link);
  }, [typography?.googleFont, typography?.family]);

  if (!typography && (!colors || colors.length === 0)) return null;

  const panelBg = colors?.[0]?.hex ?? '#111118';
  const accentClr = colors?.[1]?.hex ?? '#ffffff';

  return (
    <section className="pb-section">

      {/* Section header */}
      <div className="pb-header">
        <div className="pb-header-left">
          <h2 className="pb-heading">
            <span>Typography &</span>
            <span className="pb-heading-sub">Colours</span>
          </h2>
        </div>
        {desc && (
          <div className="pb-header-right">
            <p className="pb-desc">{desc}</p>
          </div>
        )}
      </div>

      {/* Typography showcase */}
      {typography && (
        <div className="pb-block">
          <div className="pb-block-label">
            <span>{t('typography')}</span>
            <span className="pb-block-sub">{title}</span>
          </div>
          <div
            className="pb-font-panel"
            style={{
              background: panelBg,
              fontFamily: `'${typography.family}', sans-serif`,
            }}
          >
            <div className="pb-font-left">
              <div className="pb-font-name-light" style={{ color: accentClr }}>
                {typography.family} Font
              </div>
              <div className="pb-font-name-bold">{typography.family} Fo</div>
              <div className="pb-font-alpha">ABCDEFGHIJKLMNOPQRSTUVWX...</div>
              <div className="pb-font-alpha lower">abcdefghijklmnopqrstuvwx...</div>
              <div className="pb-font-nums">0123456789</div>
            </div>
            <div className="pb-font-right">
              <p className="pb-font-sample">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but
              </p>
            </div>
            <div className="pb-font-watermark" aria-hidden="true">
              Aa Bb Cc Dd E
            </div>
          </div>
        </div>
      )}

      {/* Color swatches */}
      {colors && colors.length > 0 && (
        <div className="pb-block">
          <div className="pb-block-label">
            <span>{t('colours')}</span>
            <span className="pb-block-sub">{title}</span>
          </div>
          <div className="pb-swatches">
            {colors.map((c, i) => {
              const light = c.light ?? isLight(c.hex);
              return (
                <div
                  key={i}
                  className="pb-swatch"
                  style={{ background: c.hex }}
                >
                  <span className="pb-swatch-name" style={{ color: light ? '#1a1a2e' : '#ffffff' }}>
                    {c.name}
                  </span>
                  <div className={`pb-swatch-inner${light ? ' is-light' : ''}`} aria-hidden="true" />
                  <span className="pb-swatch-hex" style={{ color: light ? '#1a1a2e' : '#ffffff' }}>
                    {c.hex}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </section>
  );
}
