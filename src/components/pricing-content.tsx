import { getTranslations } from 'next-intl/server';
import { Link, getPathname } from '@/i18n/navigation';
import PageShell from '@/components/page-shell';
import SparkScene from '@/components/scenes/spark';
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

const PACKAGE_KEYS = ['template', 'corporate', 'ecommerce', 'webapp'] as const;

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
        <div className="sp-hero-eyebrow">{t('title')}</div>
        <h1 className="sp-hero-title">{t('subtitle')}</h1>
        <p className="sp-hero-sub pricing-lead">{t('lead')}</p>
      </section>

      <div className="pricing-grid">
        {PACKAGE_KEYS.map((key) => {
          const includes = t.raw(`packages.${key}.includes`) as string[];
          return (
            <article key={key} className="pricing-card glass">
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

      <section className="pricing-ai glass strong">
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
        <h2 className="pricing-section-title">{t('factors.title')}</h2>
        <p className="pricing-section-lead">{t('factors.lead')}</p>
        <div className="pricing-factors-grid">
          {factors.map((factor) => (
            <div key={factor.t} className="pricing-factor glass">
              <h3>{factor.t}</h3>
              <p>{factor.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-faq glass">
        <h2 className="pricing-section-title">{t('faq.title')}</h2>
        <p className="pricing-section-lead">{t('faq.lead')}</p>
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
