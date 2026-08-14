import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import JsonLd from '@/components/json-ld';
import { getAllPosts } from '@/lib/blog';
import { FAQ_UPDATED } from '@/lib/faq';
import { readFaqEntries, faqPlainAnswer } from '@/lib/faq-content';
import {
  buildPageMetadata,
  absoluteUrl,
  organizationJsonLd,
  breadcrumbJsonLd,
  webPageJsonLd,
  faqJsonLd,
} from '@/lib/seo';
import type { Locale } from '@/lib/site';
import FaqPageClient, { type FaqPostLink } from './page-client';

const NAMESPACES = ['faqPage', 'faqItems', 'servicesList', 'common'] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pageMeta' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/faq',
    title: t('faq.title'),
    description: t('faq.description'),
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'faqPage' });
  // WebPage dugumunun name/description'i metadata ile ayni olmali — `faqPage.title`
  // arayuz kisaltmasidir ("SSS"), yapilandirilmis veride tam ad ve tam aciklama durur.
  const tMeta = await getTranslations({ locale, namespace: 'pageMeta' });
  const url = absoluteUrl(locale as Locale, '/faq');
  const entries = readFaqEntries(messages);

  // Blog slug'lari dile gore degisiyor ve dosya sisteminden okunuyor —
  // client bileseni bunu cozemez, eslemeyi burada hazirlayip prop olarak veriyoruz.
  const postLinks: Record<string, FaqPostLink | null> = {};
  for (const post of getAllPosts(locale as Locale)) {
    if (post.translationKey) {
      postLinks[post.translationKey] = { slug: post.slug, title: post.title };
    }
  }

  // faqItems namespace'i ceviriler gelene kadar hic bulunmayabilir;
  // next-intl eksik namespace'i cozemedigi icin bos obje ile garantiye aliyoruz.
  const clientMessages = pickMessages(messages, NAMESPACES);
  if (!('faqItems' in clientMessages)) clientMessages.faqItems = {};

  return (
    <NextIntlClientProvider messages={clientMessages}>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            url,
            name: tMeta('faq.title'),
            description: tMeta('faq.description'),
            locale: locale as Locale,
            dateModified: FAQ_UPDATED,
            breadcrumbUrl: `${url}#breadcrumb`,
            speakableSelectors: ['.faq-q', '.faq-lead'],
          }),
          faqJsonLd(
            entries.map((entry) => ({ q: entry.q, a: faqPlainAnswer(entry) })),
            { id: `${url}#faq`, inLanguage: locale as Locale }
          ),
          {
            ...breadcrumbJsonLd([
              { name: 'Piton Studios', url: absoluteUrl(locale as Locale, '/') },
              { name: t('title'), url },
            ]),
            '@id': `${url}#breadcrumb`,
          },
        ]}
      />
      <FaqPageClient postLinks={postLinks} />
    </NextIntlClientProvider>
  );
}
