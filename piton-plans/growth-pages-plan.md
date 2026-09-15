# Buyume sayfalari plani (TASK-060..065) — 2026-09-15

Kullanici secimi: 1 blog cevirileri, 2 cok dilli 404, 3 sehir sayfalari, 4 hizmet x sektor
sayfalari, 5 karsilastirma yazilari, 8 teknik vaka calismalari.

## Kararlar

| Konu | Karar |
|---|---|
| Sehirler | kktc, lefkosa, bilecik (Bozuyuk dahil), eskisehir, bursa, istanbul, kutahya, antalya, izmit, izmir |
| Projesi olmayan sehir | Uzaktan hizmet olarak durustce anlatilir; sahte ofis/musteri/adres/rakam YOK |
| Hizmet x sektor | 12 secili kombinasyon; sektor sayfasiyla ayni niyeti hedeflemez (kanibalizasyon) |
| Vaka calismalari | Rakamsiz teknik anlatim, proje repolarindan dogrulanir |
| Karsilastirmalar | Blog yazisi (3 dil), birincil kaynakli veri; kaynak yoksa rakam yok |

## Rotalar

| Kanonik | tr | en / ru |
|---|---|---|
| `/locations` | `/bolgeler` | `/locations` |
| `/locations/[slug]` | `/web-tasarim/[slug]` | `/web-design/[slug]` |
| `/solutions` | `/cozumler` | `/solutions` |
| `/solutions/[slug]` | `/cozumler/[slug]` | `/solutions/[slug]` |

Slug'lar tum dillerde ayni (sectors konvansiyonu).

## Veri + metin sozlesmesi

Yapi `src/lib/locations.ts` / `src/lib/solutions.ts` (workSlugs, serviceSlugs, faqIds, blogKeys).
Metinler `messages/*.json` → `locationItems.{slug}` / `solutionItems.{slug}`, `sectorItems` ile ayni
anahtarlar: title, metaTitle, metaDescription, intro, bullets.1..5, painTitle, painPoints.1..3,
detail.1..3, ctaText. Sayfa UI metinleri `locationsPage` / `solutionsPage`.

Vaka calismasi: `works.{slug}.caseStudy` = { challenge, solution, highlights[], stack[], outcome }.
Opsiyonel; tr'de varsa en/ru'da zorunlu (`pnpm content:check`).

### Cozum kombinasyonlari (12)

| slug | hizmet | sektor |
|---|---|---|
| real-estate-listing-software | web-app | real-estate |
| real-estate-seo | seo-geo | real-estate |
| transfer-booking-system | web-app | transportation |
| hotel-booking-website | web-design | tourism |
| ecommerce-seo | seo-geo | e-commerce |
| ecommerce-automation | automation | e-commerce |
| restaurant-google-ads | google-ads | restaurant |
| finance-automation | automation | finance |
| clinic-seo | seo-geo | health |
| corporate-ai-assistant | ai-integration | corporate |
| education-platform | web-app | education |
| beauty-appointment-system | web-app | beauty |

### Vaka calismalari (6)

nexos-investment (`Work-Restored/Nexos`), odeme-takip-botu (`odeme-takip`), ambalaj-cini
(`ambalajcini`), velair-experience, gel-gez-gor, holly-trader.

### Karsilastirma yazilari (5)

agency-vs-freelancer, site-builder-vs-professional-website, shopify-vs-custom-ecommerce,
pwa-vs-native-app, google-ads-vs-seo.

## Uretim

Ana oturum altyapi + birlestirme. Icerik agent'lari `messages/*.json`'a dogrudan YAZMAZ —
scratchpad'e JSON uretir. TR once, en/ru cevirisi TR bittikten sonra.
