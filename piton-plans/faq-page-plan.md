# SSS (FAQ) Sayfası — Uygulama Planı

**Tarih**: 2026-08-14
**Amaç**: SEO + GEO (Generative Engine Optimization) + LLM alıntılanabilirliği için optimize edilmiş,
3 dilli (tr/en/ru), 75 soruluk kapsamlı SSS sayfası.

---

## 1. Neden bu sayfa

Sitede hâlihazırda 12 hizmet sayfasında 4'er soru (48 SSS) var ama bunlar hizmet bazlı ve dağınık.
Ziyaretçinin ve LLM'in aradığı "fiyat, süre, sahiplik, sözleşme, destek" gibi **yatay** sorular
hiçbir yerde toplu değil. Tek bir kanonik SSS sayfası:

- **SEO**: long-tail sorgu yakalama (`"web sitesi ne kadar tutar"`, `"kod kime ait"`), FAQPage
  rich result adayı, iç link hub'ı.
- **GEO/LLM**: ChatGPT/Claude/Gemini/Perplexity yanıtlarında alıntılanabilir, **soru-cevap
  formatında, cevap-önce yazılmış**, kaynak atfı kolay (her soruya kalıcı anchor) içerik.
- **Dönüşüm**: satış öncesi itirazları karşılar, teklif taleplerinin kalitesini yükseltir.

## 2. Rota ve dosya haritası

| Dosya | Ne |
|---|---|
| `src/i18n/routing.ts` | `/faq` pathname eklenir → tr `/sss`, en `/faq`, ru `/faq` |
| `src/lib/faq.ts` | Kanonik yapı: kategoriler, 75 soru id'si, ilişkili hizmet/blog bağlantıları |
| `src/app/[locale]/faq/page.tsx` | Server component — metadata, JSON-LD, çeviri sağlayıcı |
| `src/app/[locale]/faq/page-client.tsx` | UI — kategori navigasyonu, arama/filtre, akordeon |
| `src/app/[locale]/faq/opengraph-image.tsx` | Dinamik OG görseli (`src/lib/og.tsx` kullanır) |
| `src/messages/{tr,en,ru}.json` | `faqPage` (arayüz) + `faqItems` (75 soru-cevap) namespace'leri |
| `src/app/globals.css` | `faq-*` prefix'li stiller |
| `src/app/sitemap.ts` | `/faq` girdisi (priority 0.8, changeFrequency monthly) |
| `src/app/llms.txt/route.ts` | LLM'ler için düz metin site özeti + SSS dizini |
| `src/app/robots.ts` | AI crawler'lar için açık izin blokları |
| `src/components/chrome.tsx`, `page-shell.tsx` | Nav + footer linkleri (**ikisi de** güncellenir) |
| `scripts/check-translations.ts` | `faqItems` eksiksizlik kontrolü |

## 3. GEO / LLM optimizasyon kuralları (zorunlu)

Bunlar sayfanın varlık sebebi — uygulamada taviz verilmez:

1. **Cevap-önce (answer-first)**: her cevabın ilk paragrafı (`a` alanı) soruyu **40–60 kelimede
   doğrudan** yanıtlar. Giriş cümlesi, "harika bir soru", "duruma göre değişir" yok. Bağlam ve
   nüans sonraki paragraflara (`detail`) gider.
2. **Tam DOM görünürlüğü**: cevaplar akordeon kapalıyken de HTML'de bulunur. Native
   `<details>/<summary>` kullanılır — JS olmadan açılır, crawler tümünü görür, klavye erişilebilir.
   Koşullu render (`{open && <p>}`) **yasak**.
3. **Kalıcı anchor**: her soru `<details id="faq-{id}">`, başlıkta kopyalanabilir `#` linki.
   LLM'in ve kullanıcının tek soruya atıf yapabilmesi için id'ler asla değişmez.
4. **Semantik hiyerarşi**: `h1` sayfa → `h2` kategori → `h3` soru. Her kategori kendi `<section>`ı.
5. **Kendi kendine yeten cevaplar**: her cevap tek başına okunduğunda anlamlı olmalı — "yukarıda
   anlattığımız gibi" tarzı bağlam bağımlılığı yok. LLM'ler pasajı izole alıntılar.
6. **Somut sayı ve isim**: "hızlı teslim" değil, "4–6 hafta"; "modern stack" değil,
   "Next.js 16, React 19, Vercel". Doğrulanabilirlik alıntılanma olasılığını artırır.
7. **Fiyat tutarlılığı**: TR içerik **₺**, en/ru içerik **€** (1 € = 45 ₺). Bantlar CLAUDE.md'deki
   blog bantlarıyla birebir aynı olmalı — çelişki güven kaybettirir.
8. **İç link**: her cevabın altında ilgili hizmet/blog bağlantıları (`faq.ts`'teki `services`/`posts`).
9. **Güncellenme tarihi**: sayfa başında görünür `dateModified`, JSON-LD'de de aynı değer.

## 4. Yapılandırılmış veri (JSON-LD)

Sayfada tek `<script>` bloğu dizisi (`JsonLd` component'i) ile:

- `Organization` (mevcut `organizationJsonLd()`)
- `BreadcrumbList` — Ana sayfa → SSS
- **`FAQPage`** — 75 sorunun tamamı; `acceptedAnswer.text` = `a` + `detail` paragrafları
  düz metin olarak birleştirilmiş (HTML etiketi yok, tırnak kaçışları `JsonLd` tarafından yönetilir)
- `WebPage` — `@id`, `inLanguage`, `dateModified`, `isPartOf` → WebSite, `about` → Organization,
  `speakable` (`.faq-answer` CSS seçicisi)

`src/lib/seo.ts`'e eklenecek: `webPageJsonLd()`. Mevcut `faqJsonLd()` yeniden kullanılır
(gerekirse `@id` ve `inLanguage` alacak şekilde genişletilir).

## 5. UI yapısı

```
[hero]      h1 + tek cümle özet + "son güncelleme" + soru sayısı
[jump nav]  12 kategori — sticky, tıklayınca ilgili section'a kayar
[search]    client-side filtre (soru + cevap metninde arar, eşleşmeyeni gizler)
[sections]  kategori başına: h2 + kısa açıklama + <details> listesi
[cta]       "Sorunuz burada yok mu?" → /contact + WhatsApp
```

- Mevcut `PageShell` içine yerleşir (nav + footer + cursor otomatik gelir).
- Stil dili: `glass` kartlar, mono etiketler, `sd-*` (service-detail) sınıflarının görsel dili.
- Arama input'u `useState` ile filtreler; **DOM'dan silmez**, `hidden` attribute ile gizler —
  crawler yine tümünü görür (JS'siz durumda hepsi görünür kalır).

## 6. İçerik envanteri — 12 kategori, 75 soru

Soru id'leri `src/lib/faq.ts`'te sabittir. Aşağıdaki TR soru metinleri **birebir** kullanılacak;
en/ru bunların çevirisidir (id'ler değişmez).

### `studio` — Stüdyo & Ekip (6)
| id | TR soru |
|---|---|
| `what-is-piton-studios` | Piton Studios nedir, ne iş yapar? |
| `where-are-you-located` | Nerede bulunuyorsunuz, hangi bölgelere hizmet veriyorsunuz? |
| `team-size` | Ekip kaç kişi, projemde kiminle çalışacağım? |
| `why-choose-you` | Neden büyük bir ajans yerine Piton Studios'u seçmeliyim? |
| `saiber-partnership` | Saiber iş birliği ne anlama geliyor? |
| `portfolio-proof` | Daha önce hangi işleri yaptınız, referans verebilir misiniz? |

### `services` — Hizmetler & Kapsam (7)
| id | TR soru |
|---|---|
| `services-overview` | Hangi hizmetleri sunuyorsunuz? |
| `small-projects` | Küçük ölçekli işler alıyor musunuz, minimum proje büyüklüğü var mı? |
| `redesign-existing-site` | Mevcut sitemizi sıfırdan mı yapıyorsunuz, yoksa yenileyebiliyor musunuz? |
| `branding-and-design` | Logo ve marka kimliği de yapıyor musunuz? |
| `content-and-copy` | Site metinlerini ve görselleri siz mi hazırlıyorsunuz? |
| `white-label` | Ajanslara white-label / taşeron olarak çalışıyor musunuz? |
| `industries` | Hangi sektörlerde deneyiminiz var? |

### `pricing` — Fiyatlandırma & Ödeme (8)
| id | TR soru |
|---|---|
| `website-cost` | Bir web sitesi ne kadara mal olur? |
| `pricing-model` | Sabit fiyat mı, saatlik mi çalışıyorsunuz? |
| `whats-included-in-price` | Fiyata neler dahil, gizli maliyet var mı? |
| `payment-schedule` | Ödeme planı nasıl işliyor? |
| `ecommerce-cost` | E-ticaret sitesi maliyeti ne kadar? |
| `ai-automation-cost` | Yapay zeka / otomasyon projesi ne kadar tutar? |
| `running-costs` | Yıllık işletme maliyetleri (hosting, alan adı, lisans) ne kadar? |
| `budget-too-low` | Bütçem bandınızın altında, ne yapmalıyım? |

### `process` — Süreç & Zaman Çizelgesi (7)
| id | TR soru |
|---|---|
| `how-project-starts` | Bir proje nasıl başlıyor? |
| `project-timeline` | Proje ne kadar sürer? |
| `discovery-phase` | Keşif aşamasında bizden ne isteniyor? |
| `revisions` | Kaç revizyon hakkımız var? |
| `client-involvement` | Süreçte bizim ne kadar zaman ayırmamız gerekiyor? |
| `project-communication` | İlerlemeyi nasıl takip ediyoruz? |
| `launch-checklist` | Yayına almadan önce neler kontrol ediliyor? |

### `tech` — Teknoloji & Altyapı (7)
| id | TR soru |
|---|---|
| `tech-stack` | Hangi teknolojileri kullanıyorsunuz? |
| `nextjs-vs-wordpress` | Next.js mi WordPress mi — hangisi bize uygun? |
| `cms-and-editing` | İçeriği kendimiz güncelleyebilecek miyiz, panel veriyor musunuz? |
| `hosting-and-deployment` | Site nerede barındırılıyor? |
| `performance` | Sitenin hızlı olacağını nasıl garanti ediyorsunuz? |
| `accessibility` | Erişilebilirlik (WCAG) standartlarına uyuyor musunuz? |
| `multilingual` | Çok dilli site yapıyor musunuz? |

### `seo` — SEO, GEO & AI Görünürlüğü (7)
| id | TR soru |
|---|---|
| `seo-included` | SEO fiyata dahil mi? |
| `what-is-geo` | GEO (Generative Engine Optimization) nedir? |
| `llm-visibility` | ChatGPT, Claude, Gemini gibi araçlarda nasıl görünürüz? |
| `seo-timeline` | SEO sonuçları ne zaman gelir? |
| `structured-data` | Yapılandırılmış veri (schema.org) kuruyor musunuz? |
| `migration-seo` | Site yenilemede mevcut SEO değerimizi kaybeder miyiz? |
| `google-ads-vs-seo` | Google Ads mi SEO mu — hangisine bütçe ayırmalıyız? |

### `ai` — Yapay Zeka & Otomasyon (7)
| id | TR soru |
|---|---|
| `ai-use-cases` | İşimizde yapay zekayı nerede kullanabiliriz? |
| `chatbot-on-site` | Sitemize yapay zeka asistanı ekleyebilir misiniz? |
| `which-llm` | Hangi yapay zeka modelini kullanıyorsunuz? |
| `ai-data-privacy` | Verilerimiz model eğitiminde kullanılır mı? |
| `hallucination` | Yapay zekanın yanlış cevap vermesini nasıl engelliyorsunuz? |
| `automation-tools` | Otomasyonları hangi araçlarla kuruyorsunuz? |
| `ai-roi` | Yapay zeka yatırımının geri dönüşünü nasıl ölçüyoruz? |

### `ecommerce` — E-ticaret (5)
| id | TR soru |
|---|---|
| `ecommerce-platform` | Shopify mı, özel e-ticaret mi? |
| `payment-integration` | Hangi ödeme altyapılarıyla çalışıyorsunuz? |
| `marketplace-integration` | Pazaryeri ve kargo entegrasyonu yapıyor musunuz? |
| `conversion-optimization` | Dönüşüm oranını nasıl artırıyorsunuz? |
| `ecommerce-migration` | Mevcut mağazamızı taşıyabilir misiniz? |

### `mobile` — Mobil & PWA (4)
| id | TR soru |
|---|---|
| `native-vs-pwa` | Native uygulama mı, PWA mı? |
| `app-store-publishing` | Uygulamayı App Store ve Google Play'e yayınlıyor musunuz? |
| `mobile-responsive` | Yaptığınız siteler mobilde nasıl çalışıyor? |
| `offline-support` | Uygulama çevrimdışı çalışır mı? |

### `support` — Bakım, Destek & Garanti (6)
| id | TR soru |
|---|---|
| `after-launch-support` | Yayına aldıktan sonra destek veriyor musunuz? |
| `maintenance-packages` | Bakım paketleriniz nasıl işliyor? |
| `bug-warranty` | Teslimden sonra hata çıkarsa ücret alıyor musunuz? |
| `response-time` | Destek taleplerine ne kadar sürede dönüyorsunuz? |
| `backups-and-uptime` | Yedekleme ve kesinti durumunda ne oluyor? |
| `security-updates` | Güvenlik güncellemeleri kimin sorumluluğunda? |

### `legal` — Sözleşme, Sahiplik & Veri (6)
| id | TR soru |
|---|---|
| `who-owns-the-code` | Kod ve tasarım kime ait? |
| `contract-and-nda` | Sözleşme ve gizlilik anlaşması imzalıyor musunuz? |
| `kvkk-gdpr` | KVKK / GDPR uyumluluğu sağlıyor musunuz? |
| `data-storage-location` | Verilerimiz nerede saklanıyor? |
| `portfolio-usage` | Projemizi portfolyonuzda paylaşacak mısınız? |
| `exit-and-handover` | Çalışmayı sonlandırırsak devir nasıl oluyor? |

### `working` — Çalışma Modeli & İletişim (5)
| id | TR soru |
|---|---|
| `remote-work` | Uzaktan mı çalışıyorsunuz, yüz yüze görüşme mümkün mü? |
| `languages-spoken` | Hangi dillerde iletişim kuruyorsunuz? |
| `contact-channels` | Size nasıl ulaşabiliriz? |
| `response-to-inquiry` | Teklif talebine ne kadar sürede dönüş yapıyorsunuz? |
| `international-clients` | Yurt dışından çalışabilir miyiz, faturalandırma nasıl? |

## 7. Çeviri şeması

`src/messages/{tr,en,ru}.json` içine iki yeni namespace:

```jsonc
"faqPage": {
  "title": "Sıkça Sorulan Sorular",
  "subtitle": "…",
  "lead": "…",                 // h1 altı 1-2 cümle
  "updatedLabel": "Son güncelleme",
  "countLabel": "{count} soru",
  "searchPlaceholder": "…",
  "searchEmpty": "…",
  "allCategories": "Tümü",
  "relatedServices": "İlgili hizmetler",
  "relatedPosts": "Detaylı okuma",
  "copyLink": "Bu sorunun bağlantısını kopyala",
  "ctaTitle": "…", "ctaDesc": "…", "ctaButton": "…",
  "categories": {
    "studio": { "title": "…", "desc": "…" }
    // 12 kategori
  }
},
"faqItems": {
  "what-is-piton-studios": {
    "q": "…",                  // soru
    "a": "…",                  // CEVAP-ÖNCE lead, 40-60 kelime, tek paragraf
    "detail": ["…", "…"],      // 1-3 ek paragraf, her biri 40-80 kelime
    "list": ["…"]              // opsiyonel 3-6 madde; yoksa alan hiç yazılmaz
  }
  // 75 soru
}
```

Ayrıca `pageMeta.faq` = `{ title, description }` ve `nav.faq` etiketi eklenir.

## 8. `llms.txt`

`/llms.txt` — LLM crawler'ları için düz metin site haritası (llmstxt.org önerisi):
site tanımı, hizmet listesi, SSS başlıkları + anchor URL'leri, blog yazıları, iletişim.
`src/app/llms.txt/route.ts` içinde `export const dynamic = 'force-static'` ile üretilir.
Varsayılan dil TR; `?lang=` yok — tek dosya, TR + EN başlıklarını birlikte listeler.

## 9. Uygulama sırası ve agent dağılımı

| Aşama | İş | Kim |
|---|---|---|
| 0 | `src/lib/faq.ts` iskeleti + bu plan | ana oturum |
| 1a | Rota, sayfa, client UI, CSS, JSON-LD, nav, sitemap, robots, llms.txt, content:check | Agent `faq-infra` |
| 1b | TR içerik — 75 soru-cevap `tr.json` | Agent `faq-tr` |
| 2a | EN çeviri — `en.json` | Agent `faq-en` (TR bittikten sonra) |
| 2b | RU çeviri — `ru.json` | Agent `faq-ru` (TR bittikten sonra) |
| 3 | `pnpm typecheck`, `lint`, `content:check`, `build`, JSON-LD doğrulama | ana oturum |

**Dizin izolasyonu**: `faq-infra` yalnızca `src/app`, `src/components`, `src/lib/seo.ts`,
`src/i18n`, `scripts/`, `globals.css`'e dokunur ve **`src/messages/*.json`'a dokunmaz**.
İçerik agent'ları **yalnızca kendi dil dosyasına** dokunur.

## 10. Kabul kriterleri

- [ ] `/sss`, `/en/faq`, `/ru/faq` 200 döner, 75 soru da HTML kaynağında görünür (JS kapalı)
- [ ] `pnpm typecheck` ve `pnpm lint` temiz
- [ ] `pnpm build` başarılı; statik sayfa sayısı 3 artar (+OG görselleri)
- [ ] Sayfa kaynağında FAQPage JSON-LD 75 `Question` içerir, `acceptedAnswer.text` boş değil
- [ ] hreflang: 3 dil + x-default; canonical doğru
- [ ] `/llms.txt` düz metin döner
- [ ] `pnpm content:check` faqItems'ı da doğrular ve 0 sorun raporlar
- [ ] Nav ve footer'da SSS linki — `chrome.tsx` **ve** `page-shell.tsx` ikisinde de
