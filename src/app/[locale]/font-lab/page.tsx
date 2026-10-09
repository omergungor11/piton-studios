import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { pickMessages } from '@/lib/pick-messages';

// Uretimde rota 404 olsa da statik client import'u font CSS'ini ortak chunk'a
// tasiyabilir. Gelistirme dalini sabit NODE_ENV kosuluyla ayri tut.
const loadFontLab = process.env.NODE_ENV === 'development'
  ? () => import('./page-client')
  : null;

export const metadata: Metadata = {
  title: 'Piton — Font karşılaştırması',
  robots: { index: false, follow: false },
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if (!loadFontLab) notFound();

  const { locale } = await params;
  setRequestLocale(locale);
  const [messages, { default: FontLab }] = await Promise.all([
    getMessages(),
    loadFontLab(),
  ]);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ['hero'])}>
      <FontLab />
    </NextIntlClientProvider>
  );
}
