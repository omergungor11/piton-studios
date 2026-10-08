import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';
import FontLab from './page-client';

export const metadata: Metadata = {
  title: 'Piton — Font karşılaştırması',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV !== 'development') notFound();

  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ['hero'])}>
      <FontLab />
    </NextIntlClientProvider>
  );
}
