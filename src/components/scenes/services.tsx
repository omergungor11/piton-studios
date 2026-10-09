import type { CSSProperties, ReactElement } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/components/navigation/intent-link';
import { SERVICES } from '@/lib/data';
import SERVICE_ICONS from '@/components/service-icons';
import ServiceGrid from './service-grid';

const FEATURED = ['web-design', 'web-app', 'automation', 'ai-integration', 'google-ads', 'cloud-ecosystem'];

export default async function ServicesScene(): Promise<ReactElement> {
  const [t, ts, tp] = await Promise.all([
    getTranslations('services'),
    getTranslations('servicesList'),
    getTranslations('servicesPage'),
  ]);

  return (
    <div className="svc-glass glass">
      <div className="head" data-reveal="fade">
        <span className="n">{t('eyebrow')}</span>
        <span className="t">{t('title')}</span>
        <span>[{SERVICES.length} {t('count', { count: SERVICES.length }).replace(String(SERVICES.length), '').trim()}]</span>
      </div>
      <ServiceGrid>
        {SERVICES.filter((s) => FEATURED.includes(s.slug)).map((s, i) => {
          // Anasayfada 6 one cikan hizmet gosteriliyor; numaralar data.ts'teki global
          // sirayi degil, bu listedeki sirayi yansitmali (01-06).
          const n = String(i + 1).padStart(2, '0');
          const hasTranslation = (() => { try { ts(`${s.slug}.title`); return true; } catch { return false; } })();
          const title = hasTranslation ? ts(`${s.slug}.title`) : s.title;
          const desc = hasTranslation ? ts(`${s.slug}.desc`) : s.desc;
          const items = hasTranslation ? (ts.raw(`${s.slug}.items`) as string[]) : s.items;

          return (
            <Link
              key={s.slug}
              href={{ pathname: '/services/[slug]', params: { slug: s.slug } }}
              className="svc"
              data-cursor="hover"
              data-cursor-label="+"
              data-reveal="rise"
              style={{ '--i': i } as CSSProperties}
            >
              <div className="svc-top">
                <span className="n">{n}</span>
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
          );
        })}
      </ServiceGrid>
      <Link href="/services" className="svc-all-btn" data-cursor="hover" data-cursor-label="+">
        <span>{t('viewAll')}</span>
        <span className="svc-all-arrow">↗</span>
      </Link>
    </div>
  );
}
