import { SITE } from '@/lib/site';

/**
 * Hukuki sayfalarin (gizlilik/KVKK, cerez, kullanim kosullari) tek bilgi kaynagi.
 *
 * Veri sorumlusunun adi ve adresi uydurulamaz — ikisi de dolmadan sayfalar 404
 * doner, footer linkleri, iletisim formu notu ve sitemap girdileri gorunmez.
 * Boylece yer tutucu bir metin yanlislikla yayina cikmaz.
 */
export const LEGAL = {
  /** Kayitli sirket yok: veri sorumlusu gercek kisi olarak yazilir. */
  controllerName: 'Ömer Faruk Güngör',
  tradeName: SITE.name,
  address: '4 Eylül Mah. 889. Sk. Karaca Apt. A Blok, Bozüyük / Bilecik, Türkiye',
  email: SITE.email,
  /** Iletisim formu bildirimlerinin ve dogrudan e-postalarin dustugu kutu (Zoho Mail, AB veri merkezi). */
  inbox: 'hi@pitonstudios.com',
  /** Is iliskisine donusmeyen form mesajlarinin saklanma suresi. */
  retentionYears: 2,
  /** Metinlerde "son guncelleme" olarak gosterilir; metin degisince guncelleyin. */
  updated: '2026-09-19',
} as const;

export const LEGAL_READY = Boolean(LEGAL.controllerName.trim() && LEGAL.address.trim());

export const LEGAL_PAGES = ['privacy', 'cookies', 'terms'] as const;
export type LegalPage = (typeof LEGAL_PAGES)[number];

export const LEGAL_HREF: Record<LegalPage, '/privacy' | '/cookies' | '/terms'> = {
  privacy: '/privacy',
  cookies: '/cookies',
  terms: '/terms',
};
