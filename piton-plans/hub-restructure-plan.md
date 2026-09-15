# Hizmet / sektor hub / cozum yeniden yapilanmasi + yerel URL'ler — 2026-09-15

Kullanici kararlari: menude Hizmetler + secili cozumler; sektorler "hub"; tum sayfalarin URL'si
dile gore cevrilir; cozumler 20-25'e cikar; Sanayi sektoru eklenir.

## Asamalar

| # | Is | Durum |
|---|---|---|
| 1 | 7 yeni hizmet (ozel yazilim, mobil, e-ticaret, ERP & CRM, WhatsApp & chatbot, Meta reklamlari, bakim & destek), Agentic AI kaldirildi (308 → ai-integration), How To Do → Egitim & Danismanlik, Muhendislik sektoru | tamam |
| 2 | 13 sektor hub'i (11 mevcut + muhendislik + sanayi): tum ilgili hizmetler, tr/en + ru | icerik ajanlarda |
| 3 | Cozumler: SEO agirlikli 3 cozum cikar (real-estate-seo, ecommerce-seo, clinic-seo → yonlendirme), 13 yeni cozum → toplam 22 | icerik ajanlarda |
| 4 | Yerel URL'ler: hizmet, sektor, cozum, sehir slug'lari + ru yol segmentleri; eski adresler kalici yonlendirme | altyapi |
| 5 | Menu: Hizmetler kolonu + 5-6 benzersiz cozum + "Tum cozumler", "Sektorler" linkleri | sonra |

## Yerel URL mimarisi

- **Kimlik (id) sabit**: veri dosyalarindaki `slug` alani kanonik kimliktir (ingilizce). Kodda linkler
  hep kimlikle kurulur.
- **`src/lib/slugs.ts`**: tur (services / sectors / solutions / locations) → kimlik → `{ tr, en, ru }`.
  Bagimliliksiz tutulur (next.config.ts de import eder).
- **Donusum tek noktada**: `src/i18n/navigation` → `Link`, `getPathname`, `useRouter` sarmalayicilari
  `params.slug` kimligini hedef dilin slug'ina cevirir. Boylece linkler, sitemap, canonical, hreflang,
  JSON-LD otomatik dogru olur.
- **Sayfalar**: `[slug]` parametresi yerel slug'dir; sayfa `resolveSlug(tur, slug, dil)` ile kimligi bulur,
  bulunamazsa 404. `generateStaticParams` dil basina yerel slug uretir.
- **Dil degistirici**: mevcut URL slug'ini once kimlige, sonra hedef dilin slug'ina cevirir.
- **ru yol segmentleri**: /ru/uslugi, /ru/proekty, /ru/otrasli, /ru/resheniya, /ru/tseny, /ru/voprosy,
  /ru/o-nas, /ru/kontakty ... (`src/i18n/routing.ts`).
- **Yonlendirmeler** (`next.config.ts`, uretilir): eski slug → yeni slug ve eski ru segment → yeni segment;
  hepsi kalici. Kaldirilan cozumler ilgili hub'a/cozume.
- **Icerik ici linkler**: blog MDX ve mesajlardaki eski ic linkler script ile yeni adreslere cevrilir.
- Proje slug'lari marka adi oldugu icin tum dillerde ayni kalir.

## Icerik kurallari (tum ajanlar)

- Git komutu yok, repoya yazma yok — yalnizca scratchpad cikti dosyasi.
- Teslim edilmemis is iddia edilmez; rakam, musteri, SLA uydurulmaz. Yayinlanmis native mobil uygulama yok.
  Gel Gez Gor: yalnizca otomasyon. Ambalaj Cini %30 buyume: Google Ads + Meta kampanyalari.
