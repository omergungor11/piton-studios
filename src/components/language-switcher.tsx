'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { locales } from '@/i18n/config';

const LABELS: Record<string, string> = {
  tr: 'TR',
  en: 'EN',
  ru: 'RU',
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLocale = (newLocale: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params } as any, { locale: newLocale });
  };

  return (
    <div className="lang-switcher glass">
      {locales.map((loc) => (
        <button
          key={loc}
          className={`lang-btn ${loc === locale ? 'active' : ''}`}
          onClick={() => switchLocale(loc)}
          data-cursor="hover"
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  );
}
