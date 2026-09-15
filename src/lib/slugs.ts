/**
 * Dil basina URL parcalari (slug).
 *
 * Veri dosyalarindaki `slug` alani KANONIK KIMLIKTIR ve kodda linkler hep kimlikle kurulur.
 * Kimlik → { tr, en, ru } donusumu yalnizca `src/i18n/navigation` sarmalayicilarinda ve
 * sayfalarin parametre cozumunde yapilir. Bu dosya bilerek bagimliliksizdir: next.config.ts
 * eski adreslerin yonlendirmesini buradan uretir.
 *
 * Kurallar: tr Turkce ASCII kebab (ş→s ğ→g ı→i ö→o ü→u ç→c); ru Latin harf cevirisi
 * (content/blog/ru dosya adlariyla ayni stil: ый→yy, х→kh, ц→ts, ж→zh).
 * Eski adresler (kimlik = slug olan 2026-09-15 oncesi URL'ler) next.config.ts'te bu haritadan
 * otomatik yonlendirilir. Yayindaki bir slug sonradan degisirse eski slug icin next.config.ts'e
 * ayrica yonlendirme eklenmeli — yoksa eski adres 404 verir.
 */

export type SlugLocale = "tr" | "en" | "ru";
export type SlugKind = "services" | "sectors" | "solutions" | "locations";
type SlugMap = Record<string, Record<SlugLocale, string>>;

export const SLUGS: Record<SlugKind, SlugMap> = {
  services: {
    "web-design": { tr: "web-tasarim", en: "web-design", ru: "veb-dizayn" },
    "custom-software": { tr: "ozel-yazilim", en: "custom-software", ru: "razrabotka-po-na-zakaz" },
    "web-app": { tr: "web-uygulama", en: "web-app", ru: "veb-prilozheniya" },
    "mobile-app": { tr: "mobil-uygulama", en: "mobile-app", ru: "mobilnye-prilozheniya" },
    "progressive-web-app": { tr: "progressive-web-app", en: "progressive-web-app", ru: "progressivnye-veb-prilozheniya" },
    ecommerce: { tr: "e-ticaret", en: "ecommerce", ru: "internet-magaziny" },
    "erp-crm": { tr: "erp-crm", en: "erp-crm", ru: "erp-crm" },
    automation: { tr: "otomasyon", en: "automation", ru: "avtomatizatsiya" },
    "whatsapp-chatbot": { tr: "whatsapp-chatbot", en: "whatsapp-chatbot", ru: "whatsapp-i-chat-boty" },
    "ai-integration": { tr: "yapay-zeka-entegrasyonu", en: "ai-integration", ru: "integratsiya-ii" },
    "ai-consulting": { tr: "yapay-zeka-danismanligi", en: "ai-consulting", ru: "konsalting-po-ii" },
    "data-engineering": { tr: "veri-muhendisligi", en: "data-engineering", ru: "inzheneriya-dannykh" },
    "cloud-ecosystem": { tr: "bulut-altyapi", en: "cloud-infrastructure", ru: "oblachnaya-infrastruktura" },
    "google-ads": { tr: "google-ads", en: "google-ads", ru: "google-ads" },
    "meta-ads": { tr: "meta-reklamlari", en: "meta-ads", ru: "reklama-v-meta" },
    "seo-geo": { tr: "seo-geo", en: "seo-geo", ru: "seo-geo" },
    "maintenance-support": { tr: "bakim-ve-destek", en: "maintenance-support", ru: "podderzhka-i-soprovozhdenie" },
    "how-to-do": { tr: "egitim-ve-danismanlik", en: "training-consulting", ru: "obuchenie-i-konsalting" },
  },
  locations: {
    kktc: { tr: "kktc", en: "north-cyprus", ru: "severnyy-kipr" },
    lefkosa: { tr: "lefkosa", en: "nicosia", ru: "nikosiya" },
    bilecik: { tr: "bilecik", en: "bilecik", ru: "bilecik" },
    eskisehir: { tr: "eskisehir", en: "eskisehir", ru: "eskishekhir" },
    bursa: { tr: "bursa", en: "bursa", ru: "bursa" },
    istanbul: { tr: "istanbul", en: "istanbul", ru: "stambul" },
    kutahya: { tr: "kutahya", en: "kutahya", ru: "kyutakhya" },
    antalya: { tr: "antalya", en: "antalya", ru: "antalya" },
    izmit: { tr: "izmit", en: "izmit", ru: "izmit" },
    izmir: { tr: "izmir", en: "izmir", ru: "izmir" },
  },
  sectors: {
    corporate: { tr: "kurumsal", en: "corporate", ru: "korporativnyy-sektor" },
    "real-estate": { tr: "emlak", en: "real-estate", ru: "nedvizhimost" },
    transportation: { tr: "tasimacilik-ve-transfer", en: "transportation", ru: "perevozki" },
    finance: { tr: "finans", en: "finance", ru: "finansy" },
    "e-commerce": { tr: "e-ticaret", en: "e-commerce", ru: "internet-magazin" },
    restaurant: { tr: "restoran-ve-kafe", en: "restaurants-cafes", ru: "restorany-i-kafe" },
    tourism: { tr: "turizm-ve-otel", en: "tourism-hospitality", ru: "turizm-i-oteli" },
    health: { tr: "saglik-ve-klinik", en: "healthcare-clinics", ru: "meditsina-i-kliniki" },
    construction: { tr: "insaat-ve-mimarlik", en: "construction-architecture", ru: "stroitelstvo-i-arkhitektura" },
    engineering: { tr: "muhendislik", en: "engineering", ru: "inzheneriya" },
    industry: { tr: "sanayi", en: "industry-manufacturing", ru: "promyshlennost" },
    education: { tr: "egitim", en: "education", ru: "obrazovanie" },
    beauty: { tr: "guzellik-ve-kuafor", en: "beauty", ru: "krasota" },
  },
  solutions: {
    "real-estate-listing-software": { tr: "emlak-ilan-yazilimi", en: "real-estate-listing-software", ru: "po-dlya-obyavleniy-nedvizhimosti" },
    "transfer-booking-system": { tr: "transfer-rezervasyon-sistemi", en: "transfer-booking-system", ru: "sistema-bronirovaniya-transferov" },
    "hotel-booking-website": { tr: "otel-rezervasyon-sitesi", en: "hotel-booking-website", ru: "sayt-otelya-s-bronirovaniem" },
    "ecommerce-automation": { tr: "e-ticaret-otomasyonu", en: "ecommerce-automation", ru: "avtomatizatsiya-internet-magazina" },
    "restaurant-google-ads": { tr: "restoran-google-ads", en: "restaurant-google-ads", ru: "google-ads-dlya-restoranov" },
    "finance-automation": { tr: "finans-otomasyonu", en: "finance-automation", ru: "avtomatizatsiya-finansov" },
    "corporate-ai-assistant": { tr: "kurumsal-yapay-zeka-asistani", en: "corporate-ai-assistant", ru: "korporativnyy-ii-assistent" },
    "education-platform": { tr: "egitim-platformu", en: "education-platform", ru: "obrazovatelnaya-platforma" },
    "beauty-appointment-system": { tr: "guzellik-salonu-randevu-sistemi", en: "beauty-appointment-system", ru: "sistema-zapisi-v-salon-krasoty" },
    "whatsapp-sales-bot": { tr: "whatsapp-satis-botu", en: "whatsapp-sales-bot", ru: "whatsapp-bot-dlya-prodazh" },
    "clinic-whatsapp-appointments": { tr: "klinik-whatsapp-randevu", en: "clinic-whatsapp-appointments", ru: "whatsapp-zapis-v-kliniku" },
    "real-estate-meta-ads": { tr: "emlak-meta-reklamlari", en: "real-estate-meta-ads", ru: "meta-reklama-dlya-nedvizhimosti" },
    "engineering-quote-portal": { tr: "muhendislik-teklif-portali", en: "engineering-quote-portal", ru: "portal-tekhnicheskikh-predlozheniy" },
    "finance-customer-portal": { tr: "finans-musteri-portali", en: "finance-customer-portal", ru: "klientskiy-portal-finansy" },
    "hotel-maintenance-care": { tr: "otel-bakim-destek", en: "hotel-maintenance-care", ru: "tekhpodderzhka-sayta-otelya" },
    "real-estate-crm": { tr: "emlak-crm", en: "real-estate-crm", ru: "crm-dlya-agentstv-nedvizhimosti" },
    "construction-erp": { tr: "insaat-erp", en: "construction-erp", ru: "erp-dlya-stroitelnykh-kompaniy" },
    "manufacturing-erp": { tr: "uretim-erp", en: "manufacturing-erp", ru: "erp-dlya-proizvodstva" },
    "b2b-dealer-portal": { tr: "bayi-siparis-portali", en: "b2b-dealer-portal", ru: "b2b-portal-dlya-dilerov" },
    "restaurant-qr-ordering": { tr: "qr-menu-ve-siparis", en: "restaurant-qr-ordering", ru: "qr-menyu-i-zakaz-dlya-restoranov" },
    "transfer-driver-app": { tr: "transfer-sofor-uygulamasi", en: "transfer-driver-app", ru: "prilozhenie-dlya-voditeley-transfera" },
    "ecommerce-meta-ads": { tr: "e-ticaret-meta-reklamlari", en: "ecommerce-meta-ads", ru: "meta-reklama-dlya-internet-magazinov" },
  },
};

/** Parametreli rota → slug turu. */
export const SLUG_PATHNAMES: Record<string, SlugKind> = {
  "/services/[slug]": "services",
  "/sectors/[slug]": "sectors",
  "/solutions/[slug]": "solutions",
  "/locations/[slug]": "locations",
};

/** Kimligin verilen dildeki URL parcasi (esleme yoksa kimligin kendisi). */
export function localizeSlug(kind: SlugKind, id: string, locale: string): string {
  return SLUGS[kind][id]?.[locale as SlugLocale] ?? id;
}

/**
 * URL parcasindan kimlik. Eslemesi olan bir kimlik baska dilde yazilmissa (ornegin /tr/ altinda
 * ingilizce slug) undefined doner — o adres yonlendirmeyle yakalanir, sayfa 404 verir.
 */
export function resolveSlug(kind: SlugKind, slug: string, locale: string): string | undefined {
  const map = SLUGS[kind];
  for (const [id, byLocale] of Object.entries(map)) {
    if (byLocale[locale as SlugLocale] === slug) return id;
  }
  return map[slug] ? undefined : slug;
}

/** Link/getPathname href'indeki kimligi hedef dilin slug'ina cevirir. */
export function localizeHref<T>(href: T, locale: string): T {
  if (!href || typeof href !== "object") return href;
  const h = href as { pathname?: string; params?: Record<string, unknown> };
  const kind = h.pathname ? SLUG_PATHNAMES[h.pathname] : undefined;
  const slug = h.params?.slug;
  if (!kind || typeof slug !== "string") return href;
  return { ...h, params: { ...h.params, slug: localizeSlug(kind, slug, locale) } } as T;
}
