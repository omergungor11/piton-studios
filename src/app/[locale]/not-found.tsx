import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import FuzzyText from '@/components/fuzzy-text';
import { pickMessages } from '@/lib/pick-messages';

/**
 * Dile ozel 404. `[locale]/[...rest]` eslesmeyen her yolu buraya dusurur;
 * kok `app/not-found.tsx` yalnizca dil onekini bile cozulemeyen istekler icin kalir.
 */
export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');
  const tc = await getTranslations('common');
  // Link istemci bileseni: dil onekini cozmek icin intl context'i gerekiyor.
  const messages = await getMessages();

  const links = [
    { href: '/projects', label: tc('projects') },
    { href: '/services', label: tc('services') },
    { href: '/blog', label: tc('blog') },
    { href: '/contact', label: tc('contact') },
  ] as const;

  return (
    <NextIntlClientProvider messages={pickMessages(messages, ['common'])}>
    <div className="not-found-page">
      <div className="not-found-content">
        <FuzzyText
          text="404"
          fontSize={140}
          fontWeight={600}
          color="#F2EFE9"
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover={true}
          fuzzRange={30}
          fps={30}
          direction="horizontal"
          glitchMode={true}
          glitchInterval={3000}
          glitchDuration={200}
          className="not-found-canvas"
        />
        <h1 className="not-found-sub">{t('title')}</h1>
        <p className="not-found-hint">{t('hint')}</p>
        <nav className="not-found-links" aria-label={t('suggest')}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="not-found-chip">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="not-found-link">
          {t('home')} <span>↗</span>
        </Link>
      </div>
    </div>
    </NextIntlClientProvider>
  );
}
