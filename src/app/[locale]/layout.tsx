import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import Preloader from '@/components/preloader';
import SnakeScroll from '@/components/snake-scroll';
import { jetbrainsMono, ibmPlexMono, pressStart2P } from '@/lib/fonts';
import { SITE_URL } from '@/lib/site';

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
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Piton Studios — Blog"
          href={`${SITE_URL}/${locale}/rss.xml`}
        />
      </head>
      <body>
        <Preloader />
        <SnakeScroll />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
