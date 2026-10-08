import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/json-ld';
import PageShell from '@/components/page-shell';
import ProcessScene from '@/components/scenes/process';
import { pickMessages } from '@/lib/pick-messages';
import { absoluteUrl, breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from '@/lib/seo';
import type { Locale } from '@/lib/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'processScene' });

  return buildPageMetadata({
    locale: locale as Locale,
    href: '/process',
    title: t('eyebrow'),
    description: t('sub'),
  });
}

export default async function ProcessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations({ locale, namespace: 'processScene' }),
  ]);
  const language = locale as Locale;
  const url = absoluteUrl(language, '/process');

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ['common', 'processScene'])}>
      <JsonLd data={[
        webPageJsonLd({
          url,
          name: t('eyebrow'),
          description: t('sub'),
          locale: language,
          breadcrumbUrl: `${url}#breadcrumb`,
        }),
        {
          ...breadcrumbJsonLd([
            { name: 'Piton', url: absoluteUrl(language, '/') },
            { name: t('eyebrow'), url },
          ]),
          '@id': `${url}#breadcrumb`,
        },
      ]} />
      <PageShell>
        <ProcessScene variant="page" />
      </PageShell>
    </NextIntlClientProvider>
  );
}
