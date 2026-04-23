'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SERVICES } from '@/lib/data';
import SERVICE_ICONS from '@/components/service-icons';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';

export default function ServicesScene() {
  const t = useTranslations('services');
  const ts = useTranslations('servicesList');
  const tp = useTranslations('servicesPage');

  return (
    <div className="svc-glass glass">
      <Reveal variant="fadeUp">
        <div className="head">
          <span className="n">{t('eyebrow')}</span>
          <span className="t">{t('title')}</span>
          <span>[{SERVICES.length} {t('count', { count: SERVICES.length }).replace(String(SERVICES.length), '').trim()}]</span>
        </div>
      </Reveal>
      <Stagger className="svc-grid" staggerDelay={0.06}>
        {SERVICES.map((s) => {
          const hasTranslation = (() => { try { ts(`${s.slug}.title`); return true; } catch { return false; } })();
          const title = hasTranslation ? ts(`${s.slug}.title`) : s.title;
          const desc = hasTranslation ? ts(`${s.slug}.desc`) : s.desc;
          const items = hasTranslation ? (ts.raw(`${s.slug}.items`) as string[]) : s.items;

          return (
            <StaggerItem key={s.n}>
            <Link href={`/services/${s.slug}`} className="svc" data-cursor="hover" data-cursor-label="+">
              <div className="svc-top">
                <span className="n">{s.n}</span>
                <span className="cat">{tp(`filterCat.${s.cat}`)}</span>
              </div>
              <div className="svc-icon">
                {SERVICE_ICONS[s.slug] || null}
              </div>
              <h4>{title}</h4>
              <p className="svc-desc">{desc}</p>
              <ul className="svc-items">
                {items.map((item) => (
                  <li key={item}>
                    <span className="bullet">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="svc-arrow">↗</span>
            </Link>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
