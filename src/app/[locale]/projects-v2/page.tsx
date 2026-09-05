import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { pickMessages } from '@/lib/pick-messages';
import { buildProjectCloudItems } from '@/lib/project-cloud';
import ProjectsV2Client from './page-client';

const NAMESPACES = ['common', 'projectCloud'] as const;

const EYEBROW: Record<string, string> = {
  tr: 'Projeler V2 · Yerel prototip',
  en: 'Projects V2 · Local prototype',
  ru: 'Projects V2 · Локальный прототип',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projectCloud' });

  return {
    title: `${EYEBROW[locale] ?? EYEBROW.tr} — Piton Studios`,
    description: t('intro'),
    robots: { index: false, follow: false },
  };
}

/**
 * Yerel prototip rotasi. Proje bulutu anasayfadaki "Projeler" sahnesinde canlida;
 * bu tam sayfa surum yalnizca gelistirme ortaminda acilir (nav/sitemap'te yok).
 */
export default async function Page({ params }: Props) {
  const { locale } = await params;

  if (
    process.env.NODE_ENV !== 'development' ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, projects] = await Promise.all([
    getMessages(),
    buildProjectCloudItems(locale),
  ]);

  return (
    <NextIntlClientProvider messages={pickMessages(messages, NAMESPACES)}>
      <ProjectsV2Client eyebrow={EYEBROW[locale] ?? EYEBROW.tr} projects={projects} />
    </NextIntlClientProvider>
  );
}
