'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { locales } from '@/i18n/config';
import { SLUG_PATHNAMES, resolveSlug } from '@/lib/slugs';

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
    // URL'deki slug mevcut dilin slug'i; once kanonik kimlige cevrilir, hedef dilin slug'ina
    // donusumu useRouter sarmalayicisi yapar (bkz. src/lib/slugs.ts).
    const kind = SLUG_PATHNAMES[pathname];
    const slug = params?.slug;
    const nextParams =
      kind && typeof slug === 'string'
        ? { ...params, slug: resolveSlug(kind, slug, locale) ?? slug }
        : params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace({ pathname, params: nextParams } as any, { locale: newLocale });
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
