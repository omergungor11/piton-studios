import { LEGAL } from '@/lib/legal';
import type { Locale } from '@/lib/site';

/**
 * Hukuki MDX metinlerinde kullanilan component'ler. Veri sorumlusu bilgisi
 * metne elle yazilmaz — `LEGAL` yapilandirmasindan gelir, boylece adres veya
 * e-posta degistiginde uc dildeki uc metin ayni anda guncellenir.
 */

const LABELS: Record<Locale, { controller: string; tradeName: string; address: string; email: string; updated: string }> = {
  tr: {
    controller: 'Veri sorumlusu',
    tradeName: 'Ticari ad',
    address: 'Adres',
    email: 'E-posta',
    updated: 'Son güncelleme',
  },
  en: {
    controller: 'Data controller',
    tradeName: 'Trade name',
    address: 'Address',
    email: 'Email',
    updated: 'Last updated',
  },
  ru: {
    controller: 'Оператор персональных данных',
    tradeName: 'Торговое наименование',
    address: 'Адрес',
    email: 'Эл. почта',
    updated: 'Последнее обновление',
  },
};

export function legalMdxComponents(locale: Locale) {
  const label = LABELS[locale];
  const updated = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${LEGAL.updated}T00:00:00Z`));

  return {
    ControllerCard: () => (
      <dl className="legal-card">
        <div>
          <dt>{label.controller}</dt>
          <dd>{LEGAL.controllerName}</dd>
        </div>
        <div>
          <dt>{label.tradeName}</dt>
          <dd>{LEGAL.tradeName}</dd>
        </div>
        <div>
          <dt>{label.address}</dt>
          <dd>{LEGAL.address}</dd>
        </div>
        <div>
          <dt>{label.email}</dt>
          <dd>
            <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
          </dd>
        </div>
      </dl>
    ),
    ControllerName: () => <>{LEGAL.controllerName}</>,
    ControllerAddress: () => <>{LEGAL.address}</>,
    LegalEmail: () => <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>,
    RetentionYears: () => <>{LEGAL.retentionYears}</>,
    LegalUpdated: () => (
      <p className="legal-updated">
        {label.updated}: <time dateTime={LEGAL.updated}>{updated}</time>
      </p>
    ),
  };
}
