import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { routing } from '@/i18n/routing';
import Preloader from '@/components/preloader';
import SnakeScroll from '@/components/snake-scroll';
import ConversionTracker from '@/components/conversion-tracker';
import SmoothScroll from '@/components/motion/smooth-scroll';
import RevealObserver, { REVEAL_BOOT_SCRIPT } from '@/components/motion/reveal-observer';
import { spaceGrotesk, ibmPlexMono } from '@/lib/fonts';
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
      // reveal-ready (satir ici script) ve lenis siniflari hidrasyondan once/sonra html'e eklenir.
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT_SCRIPT }} />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Piton Studios — Blog"
          href={`${SITE_URL}/${locale}/rss.xml`}
        />
      </head>
      <body>
        <SmoothScroll>
          <Preloader />
          <SnakeScroll />
          {children}
        </SmoothScroll>
        <RevealObserver />
        <Analytics />
        <ConversionTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
