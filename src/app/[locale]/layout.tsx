import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Preloader from '@/components/preloader';
import { jetbrainsMono, ibmPlexMono, pressStart2P } from '@/lib/fonts';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${jetbrainsMono.variable} ${ibmPlexMono.variable} ${pressStart2P.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
