'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CAPABILITIES, TITLE_BY_SLUG } from '@/lib/studio-stats';

/**
 * Yetenek haritasi — WORKS'teki `tags` alanindan turetilen etkilesimli cip seti.
 *
 * Cip boyutu kullanim sayisiyla olceklenir. Cipe gelince o yetenegin gectigi
 * projeler listelenir. 93 tekil etiketin tamami gosterilmez; en az iki projede
 * gecenler alinir, boylece harita tek seferlik etiketlerle dolmaz.
 */

const MIN_USES = 2;
const MAX_CHIPS = 24;

const CHIPS = CAPABILITIES.filter((c) => c.count >= MIN_USES).slice(0, MAX_CHIPS);

export default function CapabilityMap() {
  const t = useTranslations('aboutSections');
  const tw = useTranslations('works');
  const [active, setActive] = useState<string | null>(null);

  const current = CHIPS.find((c) => c.key === active) ?? null;
  const titleOf = (slug: string) =>
    tw.has(`${slug}.title`) ? tw(`${slug}.title`) : TITLE_BY_SLUG[slug];

  return (
    <section className="cm glass" aria-labelledby="cm-title">
      <header className="cm-head">
        <div className="cm-eyebrow">{t('capabilities.eyebrow')}</div>
        <h2 className="cm-title" id="cm-title">
          {t.rich('capabilities.title', { accent: (c) => <span className="em">{c}</span> })}
        </h2>
        <p className="cm-desc">{t('capabilities.desc')}</p>
      </header>

      <div className="cm-cloud">
        {CHIPS.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`cm-chip ${active === c.key ? 'is-active' : ''} ${active && active !== c.key ? 'is-dim' : ''}`}
            // Cip buyuklugu kullanim sayisiyla orantili — en cok kullanilan en buyuk
            style={{ '--w': c.ratio } as React.CSSProperties}
            onPointerEnter={() => setActive(c.key)}
            onFocus={() => setActive(c.key)}
            onClick={() => setActive(c.key)}
            data-cursor="hover"
          >
            <span className="cm-chip-k">{c.key}</span>
            <span className="cm-chip-n">{c.count}</span>
          </button>
        ))}
      </div>

      <div className="cm-detail" key={current?.key ?? 'empty'}>
        {current ? (
          <>
            <span className="cm-detail-k">
              {current.key} · {t('capabilities.projectCount', { count: current.count })}
            </span>
            <div className="cm-detail-list">
              {current.slugs.map((slug) => (
                <Link
                  key={slug}
                  href={{ pathname: '/projects/[slug]', params: { slug } }}
                  className="cm-detail-item"
                  data-cursor="hover"
                  data-cursor-label="↗"
                >
                  {titleOf(slug)}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <span className="cm-detail-hint">{t('capabilities.hint')}</span>
        )}
      </div>
    </section>
  );
}
