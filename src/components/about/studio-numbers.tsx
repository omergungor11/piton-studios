'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AREA_KEYS, STUDIO, TITLE_BY_SLUG, worksInArea, type AreaKey } from '@/lib/studio-stats';

/**
 * Rakamlarla studyo — sayaclar ve calisma alanlari.
 *
 * Alanlar CUBUKLA DEGIL esit agirlikta gosteriliyor: kayitlarin 32'si
 * "Web Design" oldugu icin proje sayisina gore cizilen bir cubuk grafigi
 * studyoyu yalnizca site yapan bir yer gibi gosteriyordu. Alanlar esit
 * uzmanlik alanlari; hangisinde kac is oldugu bu bolumun anlatmak istedigi
 * sey degil. Ustune gelince o alandaki gercek projeler listeleniyor.
 *
 * Tum sayilar `studio-stats` uzerinden WORKS'ten turetilir; burada elle
 * yazilmis rakam yok. Sayaclar ekrana girince 0'dan hedefe sayar
 * (IntersectionObserver, ek bagimlilik yok). Cubuga gelince o disiplindeki
 * projeler listelenir.
 */

const COUNTERS = [
  { id: 'projects', value: STUDIO.projects },
  { id: 'disciplines', value: STUDIO.disciplines },
  { id: 'years', value: STUDIO.years },
  { id: 'clients', value: STUDIO.clients },
] as const;

const DURATION = 1100;

/**
 * Ekrana girdiginde bir kez 0 -> target sayan deger.
 *
 * Baslangic degeri hedefin kendisi: sunucuda uretilen HTML'de gercek rakam
 * yazsin (JS calismayan istemci ve arama motorlari "0+" gormesin). Sayma,
 * bolum goruse girdiginde rAF ile 0'dan baslar — bu bolum her zaman katlamanin
 * altinda oldugu icin kullanici hedef degeri onceden gormez.
 */
function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!start) return;
    // Hareket azaltma tercihinde tek karede hedefe atlar. setState yalnizca
    // rAF icinde cagriliyor — effect icinde senkron setState zincirleme render tetikler.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = reduce ? 1 : Math.min(1, (now - t0) / DURATION);
      // easeOutCubic — sonda yavaslasin
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);

  return value;
}

function Counter({ target, label, sub }: { target: number; label: string; sub: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [seen, setSeen] = useState(false);
  const value = useCountUp(target, seen);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <div className="sn-counter" ref={ref}>
      {/* Rakamlar portfolyodan birebir hesaplandigi icin "+" eki yok */}
      <span className="sn-counter-n">{value}</span>
      <span className="sn-counter-label">{label}</span>
      <span className="sn-counter-sub">{sub}</span>
    </div>
  );
}

export default function StudioNumbers() {
  const t = useTranslations('aboutSections');
  const tw = useTranslations('works');
  const ta = useTranslations('areas');
  // Acilista ilk alan secili — kutu hic bos kalmasin diye
  const [activeArea, setActiveArea] = useState<AreaKey>(AREA_KEYS[0]);

  const activeWorks = worksInArea(activeArea);
  const titleOf = (slug: string) =>
    tw.has(`${slug}.title`) ? tw(`${slug}.title`) : TITLE_BY_SLUG[slug];

  return (
    <section className="sn glass" aria-labelledby="sn-title">
      <header className="sn-head">
        <div className="sn-eyebrow">{t('numbers.eyebrow')}</div>
        <h2 className="sn-title" id="sn-title">
          {t.rich('numbers.title', { accent: (c) => <span className="em">{c}</span> })}
        </h2>
        <p className="sn-desc">{t('numbers.desc')}</p>
      </header>

      <div className="sn-counters">
        {COUNTERS.map((c) => (
          <Counter
            key={c.id}
            target={c.value}
            label={t(`numbers.${c.id}.label`)}
            sub={t(`numbers.${c.id}.sub`)}
          />
        ))}
      </div>

      <div className="sn-split">
        <div className="sn-areas">
          <span className="sn-bars-k">{t('numbers.mixLabel')}</span>
          <div className="sn-area-grid">
            {AREA_KEYS.map((key) => (
              <button
                key={key}
                type="button"
                className={`sn-area ${activeArea === key ? 'is-active' : ''}`}
                onPointerEnter={() => setActiveArea(key)}
                onFocus={() => setActiveArea(key)}
                onClick={() => setActiveArea(key)}
                data-cursor="hover"
              >
                <span className="sn-area-label">{ta(`${key}.label`)}</span>
                <span className="sn-area-desc">{ta(`${key}.desc`)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sn-detail">
          <span className="sn-detail-k">{ta(`${activeArea}.label`)}</span>
          <ul className="sn-detail-list">
            {activeWorks.slice(0, 8).map((w) => (
              <li key={w.slug}>
                <Link
                  href={{ pathname: '/projects/[slug]', params: { slug: w.slug } }}
                  data-cursor="hover"
                  data-cursor-label="↗"
                >
                  {titleOf(w.slug)}
                </Link>
              </li>
            ))}
          </ul>
          {activeWorks.length > 8 && (
            <span className="sn-detail-more">
              {t('numbers.more', { count: activeWorks.length - 8 })}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
