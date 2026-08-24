import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import JsonLd from '@/components/json-ld';
import { getAllPosts } from '@/lib/blog';
import {
  buildPageMetadata,
  absoluteUrl,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
} from '@/lib/seo';
import type { Locale } from '@/lib/site';
import PricingContent, { type PricingPostLink } from '@/components/pricing-content';

/** Bantlar guncellendiginde bu tarihi de guncelleyin — WebPage.dateModified buradan okunur. */
const PRICING_UPDATED = '2026-08-24';

// PageShell yalnizca `common` namespace'ini kullaniyor; icerik sunucuda cevriliyor.
const NAMESPACES = ['common'] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageMeta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/pricing',
    title: t('pricing.title'),
    description: t('pricing.description'),
  });
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'pricingPage' });
  const tMeta = await getTranslations({ locale, namespace: 'pageMeta' });
  const url = absoluteUrl(locale as Locale, '/pricing');

  // AI otomasyon kartindaki ROI baglantisi — blog slug'i dile gore degisiyor,
  // dosya sisteminden yalnizca sunucuda okunabilir.
  let roiPost: PricingPostLink | null = null;
  for (const post of getAllPosts(locale as Locale)) {
    if (post.translationKey === 'ai-automation-roi') {
      roiPost = { slug: post.slug, title: post.title };
      break;
    }
  }

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <JsonLd
        data={[
          organizationJsonLd(),
          // Bantlar kesin fiyat degil — bilincli olarak Offer/AggregateOffer YOK.
          webPageJsonLd({
            url,
            name: tMeta('pricing.title'),
            description: tMeta('pricing.description'),
            locale: locale as Locale,
            dateModified: PRICING_UPDATED,
            breadcrumbUrl: `${url}#breadcrumb`,
            speakableSelectors: ['.pricing-lead', '.pricing-note'],
          }),
          {
            ...breadcrumbJsonLd([
              { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
              { name: t('title'), url },
            ]),
            '@id': `${url}#breadcrumb`,
          },
        ]}
      />
      <PricingContent locale={locale as Locale} roiPost={roiPost} />
    </NextIntlClientProvider>
  );
}
