import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link, getPathname } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import SparkScene from '@/components/scenes/spark';
import SplitWords from '@/components/motion/split-words';
import type { Locale } from '@/lib/site';

export interface PricingPostLink {
  slug: string;
  title: string;
}

interface Props {
  locale: Locale;
  /** ai-otomasyon-roi blog yazisi — slug dile gore degistigi icin sunucuda cozulup buraya verilir. */
  roiPost: PricingPostLink | null;
}

const PACKAGE_KEYS = ['template', 'corporate', 'ecommerce', 'webapp', 'mobile'] as const;

/** Aylik calisan buyume hizmetleri — anahtarlar ayni zamanda hizmet sayfasi slug'i. */
const GROWTH_KEYS = ['seo-geo', 'google-ads', 'meta-ads'] as const;

/** SSS sayfasindaki kalici soru anchor'lari (faq.ts id'leri) — soru silinmedikce degismez. */
const FAQ_ANCHOR_IDS = [
  'website-cost',
  'pricing-model',
  'whats-included-in-price',
  'payment-schedule',
  'ecommerce-cost',
] as const;

interface PricingFactor {
  t: string;
  d: string;
}

export default async function PricingContent({ locale, roiPost }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricingPage' });
  const faqPath = getPathname({ href: '/faq', locale });
  const factors = t.raw('factors.items') as PricingFactor[];
  const aiPoints = t.raw('ai.points') as string[];

  return (
    <PageShell>
      <section className="sp-hero pricing-hero">
        <div className="sp-hero-eyebrow" data-reveal="fade-hero">{t('title')}</div>
        <SplitWords as="h1" hero className="sp-hero-title" text={t('subtitle')} />
        <p className="sp-hero-sub pricing-lead" data-reveal="fade-hero" style={{ '--reveal-delay': '180ms' } as CSSProperties}>
          {t('lead')}
        </p>
      </section>

      <div className="pricing-grid">
        {PACKAGE_KEYS.map((key, i) => {
          const includes = t.raw(`packages.${key}.includes`) as string[];
          // Tek sayida kart varsa sonuncusu yalniz kalir — iki sutunu kaplasin.
          const wide = PACKAGE_KEYS.length % 2 === 1 && i === PACKAGE_KEYS.length - 1;
          return (
            <article
              key={key}
              className={`pricing-card glass${wide ? ' pricing-card--wide' : ''}`}
              data-reveal="rise"
              style={{ '--i': i } as CSSProperties}
            >
              <div>
                <h2 className="pricing-card-name">{t(`packages.${key}.name`)}</h2>
                <p className="pricing-card-desc">{t(`packages.${key}.desc`)}</p>
              </div>
              <p className="pricing-band">
                <span className="pricing-band-value">{t(`packages.${key}.price`)}</span>
                <span className="pricing-band-label">{t('bandLabel')}</span>
              </p>
              <div className="pricing-includes">
                <span className="pricing-includes-label">{t('includesLabel')}</span>
                <ul>
                  {includes.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <p className="pricing-note">{t('note')}</p>

      <section className="pricing-growth">
        <SplitWords as="h2" className="pricing-section-title" text={t('growth.title')} />
        <p className="pricing-section-lead" data-reveal="fade">{t('growth.lead')}</p>
        <div className="pricing-growth-grid">
          {GROWTH_KEYS.map((key, i) => {
            const includes = t.raw(`growth.items.${key}.includes`) as string[];
            // Reklam hizmetlerinde bedel yalnizca yonetim — bant etiketi bunu acikca soyluyor.
            const label = key === 'seo-geo' ? t('growth.monthlyLabel') : t('growth.adsLabel');
            return (
              <article key={key} className="pricing-card glass" data-reveal="rise" style={{ '--i': i } as CSSProperties}>
                <div>
                  <h3 className="pricing-card-name">{t(`growth.items.${key}.name`)}</h3>
                  <p className="pricing-card-desc">{t(`growth.items.${key}.desc`)}</p>
                </div>
                <p className="pricing-band">
                  <span className="pricing-band-value">{t(`growth.items.${key}.price`)}</span>
                  <span className="pricing-band-label">{label}</span>
                </p>
                <div className="pricing-includes">
                  <span className="pricing-includes-label">{t('includesLabel')}</span>
                  <ul>
                    {includes.map((line, j) => (
                      <li key={j}>{line}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={{ pathname: '/services/[slug]', params: { slug: key } }}
                  className="pricing-growth-link"
                  data-cursor="hover"
                >
                  {t('growth.linkLabel')} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </div>
        <p className="pricing-note pricing-growth-note">{t('growth.note')}</p>
      </section>

      <section className="pricing-ai glass strong" data-reveal="fade">
        <span className="pricing-ai-accent" aria-hidden="true" />
        <div className="pricing-ai-inner">
          <div className="pricing-ai-main">
            <p className="pricing-ai-eyebrow">{t('ai.eyebrow')}</p>
            <h2 className="pricing-ai-name">{t('ai.name')}</h2>
            <p className="pricing-band">
              <span className="pricing-band-value">{t('ai.price')}</span>
              <span className="pricing-band-label">{t('ai.priceLabel')}</span>
            </p>
            <p className="pricing-card-desc">{t('ai.desc')}</p>
            <p className="pricing-roi">{t('ai.roi')}</p>
            {roiPost && (
              <p className="pricing-roi-more">
                {t('ai.roiLinkLabel')}{' '}
                <Link
                  href={{ pathname: '/blog/[slug]', params: { slug: roiPost.slug } }}
                  className="pricing-roi-link"
                  data-cursor="hover"
                >
                  {roiPost.title} <span aria-hidden="true">↗</span>
                </Link>
              </p>
            )}
          </div>
          <div className="pricing-includes pricing-ai-includes">
            <span className="pricing-includes-label">{t('includesLabel')}</span>
            <ul>
              {aiPoints.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pricing-factors">
        <SplitWords as="h2" className="pricing-section-title" text={t('factors.title')} />
        <p className="pricing-section-lead" data-reveal="fade">{t('factors.lead')}</p>
        <div className="pricing-factors-grid">
          {factors.map((factor, i) => (
            <div key={factor.t} className="pricing-factor glass" data-reveal="rise" style={{ '--i': i } as CSSProperties}>
              <h3>{factor.t}</h3>
              <p>{factor.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-faq glass">
        <SplitWords as="h2" className="pricing-section-title" text={t('faq.title')} />
        <p className="pricing-section-lead" data-reveal="fade">{t('faq.lead')}</p>
        <div className="pricing-faq-links">
          {FAQ_ANCHOR_IDS.map((id) => (
            <a
              key={id}
              href={`${faqPath}#faq-${id}`}
              className="pricing-faq-link"
              data-cursor="hover"
            >
              {t(`faq.links.${id}`)} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

      <div className="subpage-spark">
        <SparkScene hideStats sub={t('cta.desc')} />
      </div>
    </PageShell>
  );
}
