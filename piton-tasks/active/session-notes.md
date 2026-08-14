# Session Notes

## 2026-04-19 / 2026-04-20 — Session 1

### Completed
- [x] Project scaffold (Next.js 15 + TypeScript + Tailwind + pnpm)
- [x] Claude Code workflow (piton-* dirs, slash commands, hooks)
- [x] Full design implementation from Portgolio.html (9 sections, glass morphism, custom cursor, film grain)
- [x] `/projects` listing page with year filter
- [x] `/projects/[slug]` detail pages (11 projects, hero video, metadata, body, related nav)
- [x] `/services` listing page with category filter
- [x] `/services/[slug]` detail pages (10 services, stats, features, process timeline, FAQ accordion, tools, related, CTA)
- [x] `/gallery` page with masonry grid, category filter, lightbox
- [x] `/admin` panel (5 tabs: projects, gallery, services, messages, settings)
- [x] Supabase migrations (3 SQL files: schema, storage, RLS)
- [x] Mobile responsive (hamburger menu, accordion nav, touch cursor fix)
- [x] Contact form with phone field, WhatsApp/phone buttons
- [x] About section: centered heading, description, blockquote, full-width mobile video
- [x] Categorized nav with dropdown submenus (desktop) + accordion (mobile)
- [x] Internal linking audit + dead link fixes
- [x] Admin UI visibility fix (opaque glass override)
- [x] Footer redesign (clean layout, no email)
- [x] Project detail inline video
- [x] Glass opacity increase across all sections

### Pending / Not Started
- [ ] Supabase client integration (install @supabase/supabase-js, .env.local)
- [ ] Admin CRUD operations (currently demo data, needs real API routes)
- [ ] Three.js / 3D elements (user requested, not started)
- [ ] Framer Motion scroll animations (user requested)
- [ ] Desktop cursor on /services and sub-pages (user reported missing)
- [ ] Desktop nav dropdown polish (user requested review)

### Next Session
- [ ] Three.js research + implementation (scroll-driven 3D elements)
- [ ] Framer Motion integration for scroll/motion effects
- [ ] Supabase client setup + API routes for admin CRUD
- [ ] Cursor fix on sub-pages (PageShell doesn't render Cursor component)
- [ ] Nav dropdown UX polish
- [ ] Vercel deployment

### Notes
- Cursor component only renders on homepage (page.tsx imports it). Sub-pages using PageShell don't have it. Need to add Cursor to PageShell or layout.
- Service data model fully extended with slug, longDesc, features, process, stats, faq, tools, relatedServices
- 29 total static pages generated
- Video assets in public/assets/ (~180MB) — gitignored, need Supabase Storage for production

---

## 2026-04-23 — Session 2

### Completed
- [x] TASK-018: Supabase client setup (@supabase/ssr, server + client helpers, TypeScript types)
- [x] TASK-019: Admin CRUD API routes (projects, gallery, services, messages, upload — 5 resource)
- [x] TASK-008: Supabase Storage bucket + video upload API
- [x] TASK-020: Framer Motion scroll animations (hero, services, manifesto, about, contact)
- [x] TASK-021: Three.js 3D scene (particle system, wireframe octahedron/icosahedron, mouse tracking)
- [x] TASK-010: Video optimization pipeline (ffmpeg: 183MB → 13MB, %93 compression, 10 thumbnails)
- [x] Supabase Storage'a 10 video + 10 thumbnail upload
- [x] GitHub repo olusturma (omergungor11/piton-studios)
- [x] Vercel deploy fix (next-intl config path, packageManager, .nvmrc)
- [x] Video URL'lerini Supabase CDN'e yonlendirme (media.ts helper)

### Pending
- [ ] Vercel'de env vars eklenmis mi kontrol et (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] Canli sitede videolarin yuklendigini dogrula
- [ ] Admin panel'i Supabase auth ile koruma altina al
- [ ] Contact form'u gercek Supabase insert'e bagla
- [ ] SEO meta tags (og:image, og:video, twitter cards)
- [ ] Custom domain baglama

### Next Session
- [ ] Vercel deploy dogrulama — videolar calisiyorsa production hazir
- [ ] Admin auth (Supabase Auth ile login)
- [ ] Contact form backend entegrasyonu
- [ ] SEO + analytics (Vercel Analytics veya Plausible)
- [ ] Performance audit (Lighthouse, video lazy loading kontrolu)

### Notes
- Vercel npm kullaniyordu, packageManager: pnpm@10.25.0 eklendi
- next-intl config Vercel'de ./src/i18n/request.ts bulamiyordu, ./i18n/request.ts olarak tasindi
- Video dosyalari artik Supabase Storage CDN uzerinden servis ediliyor (media.ts)
- Cursor fix zaten Session 1'de yapilmis (PageShell icinde Cursor mevcut)

---

## 2026-05-08 — Session 3

### Goals
- Session 2'den kalan pending isler
- Admin auth, contact form, SEO, performance audit

### Completed
_(session devam ediyor)_

### Pending
- [ ] Admin panel Supabase Auth ile koruma
- [ ] Contact form backend entegrasyonu (Supabase insert)
- [ ] SEO meta tags (og:image, og:video, twitter cards)
- [ ] Custom domain baglama
- [ ] Performance audit (Lighthouse)
- [ ] Vercel env vars + canli video dogrulama

### Notes
- Tum 21 task tamamlanmis durumda, bu session iyilestirme/polish uzerine

---

## 2026-05-23 / 2026-05-24 — Session 4

### Completed
- [x] Hero başlığı sadece "Piton Studios" olarak sadeleştirildi
- [x] Hero'dan video sidebar kaldırıldı, tek kolon layout'a dönüldü
- [x] Unified nav: Anasayfa ve iç sayfalar aynı kompakt chrome nav'ı kullanıyor
- [x] Nav'a Gallery linki eklendi (desktop + mobil)
- [x] Stories section → Services showcase'e dönüştürüldü (sonra kaldırıldı)
- [x] Works/Projects slider eklendi (mockup frame + meta kutular, framer-motion)
- [x] Öne çıkan projeler 6'ya limitlendi, Türkçeleştirildi
- [x] Ambalaj Cini yerine Alp Sigorta öne çıkan 6'ya alındı
- [x] 21 yeni proje eklendi (toplam 32 proje)
- [x] Avie Global ve Tüp Bebek kaldırıldı
- [x] Case study ve Reel section'ları anasayfadan kaldırıldı
- [x] Manifesto videosu red-knight.mp4 ile değiştirildi
- [x] Projeler sayfasına showreel section eklendi (bg video + kompakt layout)
- [x] Projeler sayfasından hikayeler/stories bölümü kaldırıldı
- [x] Hizmetler sayfası anasayfadaki grid yapısına güncellendi
- [x] Hizmet ve manifesto kutularının yüksekliği JS ile eşitlendi
- [x] Türkçe çeviri düzeltmeleri (hero kicker, nav labels, metadata)
- [x] Subtitle düzeltmesi: "Dijital çözümler, otomasyonlar ve yapay zekâ ile markanızı geliştiririz."
- [x] Local video fallback aktifleştirildi (Supabase CDN dev'de devre dışı)
- [x] Press Start 2P pixel font eklendi (sonra kaldırıldı, mono korundu)
- [x] SCENES label'ları Türkçeleştirildi
- [x] Gereksiz import ve render kodları temizlendi
- [x] Dolmuş adı "Bozüyük Dolmuşçular Derneği" olarak değiştirildi

### Pending / Yarım Kalan
- [ ] Proje tarihlerinin düzeltilmesi (kullanıcı söyleyecek)
- [ ] Proje detay sayfalarına desktop/tablet/mobil mockup eklenmesi
- [ ] Daha fazla proje ekran kayıtları / videoları
- [ ] Admin panel Supabase Auth ile koruma
- [ ] Contact form backend entegrasyonu
- [ ] SEO meta tags (og:image, og:video, twitter cards)
- [ ] Custom domain bağlama
- [ ] Vercel env vars + canlı video doğrulama

### Next Session
- [ ] Proje tarihlerini düzelt (kullanıcıdan bilgi bekleniyor)
- [ ] Proje detay sayfalarına mockup görselleri ekle
- [ ] Vercel deploy test — video'lar çalışıyor mu kontrol
- [ ] SEO + analytics
- [ ] Performance audit (Lighthouse)

### Notes
- Videolar şu an local fallback'ten servis ediliyor (media.ts'de Supabase URL devre dışı)
- 32 proje WORKS array'inde, ilk 6'sı anasayfa slider'da gösteriliyor
- STORIES array hala var ama anasayfada ve projeler sayfasında kullanılmıyor
- Nav artık anasayfa ve iç sayfalarda tutarlı (chrome component)

---

## 2026-07-05 — Session 5

### Completed
- [x] Proje detay sayfalarına Desktop/Mobile toggle eklendi (CSS responsive yerine explicit buton)
- [x] Typography & Colors (brand section) tamamen kaldırıldı — component, CSS, i18n, data
- [x] `getAdjacentProjects` sadece WORKS üzerinde iterate ediyor (STORIES dahil edilmiyordu)
- [x] Preview toggle + screenshot, body section'dan hero section'a taşındı
- [x] Proje detay hero tamamen yeniden tasarlandı — screenshot IS the hero (16/9 aspect)
- [x] Hero içinde Desktop/Mobile toggle sağ üstte (dark glass pill)
- [x] Mobile preview modunda hero 9/16 portrait oranına geçiyor (`.pd-hero-mobile`)
- [x] `pd-preview-wrap` inline section body'den kaldırıldı
- [x] Projeler sayfasına `pp-showcase` yatay kaydırmalı screenshot şeridi eklendi
- [x] Prev/next nav görsel kartlar yerine temiz 3 sütun metin bar'a dönüştürüldü
- [x] Preloader 3.1s'dan ~1.35s'a kısaltıldı
- [x] Spark CTA scene eklendi (hero ile manifesto arasında) — pulse animasyon, istatistik, WA + email butonları
- [x] Spark subtitle AI/otomasyon vurgusu ile güncellendi
- [x] Preloader logo fly-up animasyonu kaldırıldı (exit'te sadece fade)
- [x] "28 projects · full-page preview" etiketi projeler sayfasından kaldırıldı
- [x] Showcase kartları: `object-fit: cover` ile landscape screenshot'larda boş alan giderildi
- [x] Preview tag, görselin üstünden çıkarılıp üst bar'a taşındı (`.pd-preview-bar`)

### Pending / Yarım Kalan
- [ ] Proje tarihleri düzeltilecek (kullanıcı söyleyecek)
- [ ] Mockup görselleri eksik projeler için eklenecek
- [ ] Admin panel Supabase Auth ile koruma
- [ ] Contact form backend entegrasyonu
- [ ] SEO meta tags (og:image, twitter cards)
- [ ] Custom domain bağlama

### Next Session
- [ ] /tr/projeler ve proje detay sayfalarını tarayıcıda görsel kontrol
- [ ] Eksik preview'ı olan projeler için screenshot ekle
- [ ] SEO + analytics kurulumu
- [ ] Performance audit (Lighthouse)

### Notes
- Hero'da preview yoksa (hasPreviews=false): eski thumbnail gösterilir, pd-hero-tag görünür
- Hero'da preview varsa: screenshot gösterilir, toggle sağ üstte, tag gizlenir
- Showcase card genişlikleri: desktop 260px / mobile 148px; yükseklikler: 162px / 264px
- Anasayfa SCENES sırası: hero → spark → note → services → work → about → contact (7 scene)

---

## 2026-07-06 / 2026-07-07 — Session 6

### Completed
- [x] 3 yeni portfolyo projesi eklendi: Mindloop (bireysel 3D site), Dental Health (diş kliniği), Securify (SaaS güvenlik landing page)
- [x] Her 3 proje için desktop (1440x810) + mobile (430x928) WebP preview görselleri üretildi (PIL + cwebp pipeline)
  - Mindloop desktop: cover-crop; Mindloop mobile + Dental Health + Securify (4 görsel): scale-to-width + pad-bottom (UI elemanları kenara yakındı, crop riski vardı)
- [x] Tarayıcıda canlı doğrulama yapıldı (Desktop/Mobile toggle, hero render)
- [x] CHANGELOG güncellendi, commit + push (`d62d4c9`)
- [x] Türkçe/İngilizce çeviri eksikleri bulundu ve düzeltildi: 11 proje slug'ında (`alert-muhendislik`, `beton-store`, `crazy-girl-night-club`, `kibris-katalog`, `misse-night-club`, `virginia-ice-cream`, `faraon-night-clubs`, `welcome-pickups`, `mindloop`, `dental-health`, `securify`) `works.{slug}.{title,summary,body}` eksikti → fallback mekanizması yanlış dilde metin sızdırıyordu (TR sayfada EN summary, EN sayfada TR body)
- [x] `tr.json` + `en.json`'a 11 eksik çeviri eklendi, `beton-store` üzerinden tarayıcıda doğrulandı, commit + push (`124a8e7`)

### Pending / Yarım Kalan
- [ ] `ru.json`'da aynı 11 slug hâlâ eksik (bilerek ertelendi — kullanıcı istemedi, çeviri kalitesi doğrulanamadı)
- [ ] Proje tarihleri düzeltilecek (kullanıcı söyleyecek)
- [ ] Admin panel Supabase Auth ile koruma
- [ ] Contact form backend entegrasyonu
- [ ] SEO meta tags (og:image, twitter cards)
- [ ] Custom domain bağlama

### Next Session
- [ ] `ru.json` çeviri tamamlama konusunda kullanıcıya sor
- [ ] Proje tarihlerini düzelt (kullanıcıdan bilgi bekleniyor)
- [ ] SEO + analytics kurulumu
- [ ] Performance audit (Lighthouse)

### Notes
- Toplam proje sayısı 32 → 35 (Mindloop, Dental Health, Securify eklendi)
- Preview pipeline artık standart: 1440x810 desktop / 430x928 mobile WebP, `public/assets/previews/{desktop,mobile}/{slug}.webp`
- Çeviri fallback mantığı `project-detail.tsx`'te: `tw.has()` kontrolü yoksa `data.ts`'teki ham `summary`(EN)/`body`(TR) alanına düşüyor — yeni proje eklerken tr/en.json'a girdi eklemeyi unutma
- Repo remote hâlâ `pixel-ninja.git`'e işaret ediyor ama GitHub `piton-studios.git`'e redirect ediyor (repo rename edilmiş) — push çalışıyor ama redirect süresi dolarsa remote URL güncellenmeli

---

## 2026-07-16 — Session 7

### Completed
- [x] Performans commit'i push edildi (session başında hazırdı: static rendering, scoped i18n, deferred assets)
- [x] Mobil anasayfa düzenlemeleri: servisler 5 ana hizmet + "Tüm Hizmetler" butonu, hero PITON/STUDIOS satır aralığı, proje slider'ına framer-motion drag swipe, about kod paneli kısaltıldı (280px), partner rozetleri yan yana, iletişim (WhatsApp / Ara+Mail / sosyal ikonlar düzeni)
- [x] Mobil iç sayfa düzeltmeleri: footer partner rozetleri tek ikon satırı, proje detay prev/next yan yana + "Tümünü gör" kısaltması
- [x] **Saiber ortaklığı** (eski adı Media King): 20 projede `collaborator: "Saiber"` — detayda "İş Birliği" metası. Kaynak: `Work-Restored/freelancer/02-projeler-case-study.md`
- [x] **Portfolyo genişlemesi 35 → 66 proje**: freelancer paketinden 13 (Lider Emlak, Ödeme Takip Botu, 6 AI/ML Ar-Ge, 5 SaaS prototip) + 5 canlı self-dev site (FurCRM slider #2, Lithos, Vanguard, Jack 3D, Veldara — gerçek ekran görüntüleri + `url` alanı ile canlı linkler) + Work-Restored taramasından 5 (Manager, Emlak Sync, Sevgili Yoğurt, Dolmuş Kontrol, ÖSYB Hap) + avie-global geri eklendi
- [x] Lefke Belediyesi kaldırıldı (hiç yapılmadı — tekrar EKLEME)
- [x] Nexos mükerrer girdisi silindi; 4 case study güçlendirildi (Nexos flagship full-stack, Ambalaj Cini %30 büyüme, Sammys özel rezervasyon, Radyo Juke özel entegrasyon)
- [x] **ru.json çeviri borcu kapandı** — 66 proje × 3 dil eksiksiz
- [x] AWS Technical Essentials sertifikası arşivlendi + freelancer dokümanlarına işlendi (03 + 08 öne çıkan 6'lı)

### Pending
- [ ] Proje tarihleri düzeltilecek (eski P1 maddesi)
- [ ] avie-global Saiber atıfı kullanıcı teyidi bekliyor
- [ ] fur-crm.vercel.app backend'i veri döndürmüyor — düzelince ekran görüntüsü tazelenebilir
- [ ] Domain: pitonstudios.tr satın alma (kullanıcı tarafında) → Vercel bağlama

### Notes
- Work-Restored klasör ↔ portfolyo eşlemesi piton-docs/MEMORY.md'de (baykan-night-club=Miracle, mehmet-missme=Misse, seytan-ibo=Gece Kıbrıs vb.)
- Canlı link mekanizması: `Work.url` → detay metasında "Canlı Site → Siteyi ziyaret et ↗" (`projectDetail.live/visit`)
- Mobil ekran görüntüsü almak için chrome-devtools `emulate` (430x928x2,mobile,touch) — resize_page 500px altına inmiyor

---

## 2026-07-28 / 29 — Session 8

Plan: `piton-plans/2026-07-28-blog-admin-platform-plan.md` (Sprint 1 uygulandi, 2-5 iptal)

### Completed

**SEO altyapisi** (`27274ff`)
- [x] `src/app/sitemap.ts` — 3 dilde 267 URL, her girdide hreflang + x-default, lokalize yollar (`/tr/projeler` ↔ `/en/projects`)
- [x] `src/app/robots.ts` — preview deploy'da noindex
- [x] Tum sayfalarda canonical + hreflang (`src/lib/seo.ts`)
- [x] JSON-LD: Organization, WebSite, BreadcrumbList, CreativeWork (proje), Service + **FAQPage** (hizmet sayfalarindaki mevcut FAQ verisi rich snippet'e donustu)
- [x] Dinamik OG gorselleri: `src/lib/og.tsx` + proje/hizmet/blog `opengraph-image.tsx`

**Bulunan ve duzeltilen hatalar**
- [x] **Cok dilli metadata**: proje/hizmet detay sayfalari `data.ts`'teki Turkce sabitleri kullaniyordu — `/en/` ve `/ru/` sayfalari Turkce baslik+aciklama ile indexleniyordu. `src/lib/content-i18n.ts` ile ceviri dosyalarindan okunuyor.
- [x] **Eksik ceviri**: `stories.cyprokey` ve `stories.salih-defterali` **hicbir dilde** cevrilmemisti (`CLAUDE.md` "ceviriler TAMAM" diyordu — bu iddia `works` icin dogru, `stories` icin degildi). 3 dilde eklendi.
- [x] **35 proje sayfasinda kirik hero gorseli** (`a4fa8e9`): `public/assets/optimized/` gitignore'daydi, `src/lib/media.ts` oraya isaret ediyordu. 10 dosya (876 KB) repoya hic girmiyordu. 29 preview'siz work + 6 story + /projeler hero + reel + case-study etkileniyordu. Dosyalar repoya alindi.
- [x] **Sahte iletisim formu** (`4756404`): `contact.tsx` 1.2 sn bekleyip "✓ Gonderildi" yaziyor, hicbir yere hicbir sey gondermiyordu.

**Blog** (`27274ff`)
- [x] MDX pipeline: `content/blog/{tr,en,ru}/*.mdx`, gray-matter + remark-gfm + rehype-pretty-code
- [x] Liste / yazi / etiket sayfalari, tr'de `/blog/etiket/[tag]` lokalize yolu
- [x] `translationKey` frontmatter alani diller arasi hreflang'i kuruyor
- [x] RSS: `/[locale]/rss.xml`
- [x] 3 dilde 2'ser ornek yazi (gercek icerik)

**Iletisim formu** (`4756404`)
- [x] `/api/contact` — zod, honeypot, IP basina 10 dk / 3 gonderim
- [x] Bildirim `pitonstudios@gmail.com`, `replyTo` gonderenin adresi
- [x] `RESEND_API_KEY` yoksa acik hata + kullaniciya dogrudan e-posta adresi

**Temizlik**
- [x] `videos/` (289 MB, 17 dosya) Cop Kutusu'na — kodda tek referansi yoktu
- [x] `supabase/` kaldirildi — hic kullanilmamisti
- [x] Vercel Analytics + Speed Insights

**Geri alinanlar** (kullanici karari — panel gereksiz yuk)
- Neon + Drizzle + icerik gocu: kod `61b0d2a`, geri alindi `a4fa8e9`
- Auth.js + admin panel: kod `5cd315c`, geri alindi `0a35979`
- Vercel Blob: hic baglanmadi, `b9af751`

### Pending — kullanici tarafinda

- [ ] **`NEXT_PUBLIC_SITE_URL`** Vercel'e eklenmeli. Yoksa sitemap/canonical/OG URL'leri deploy adresini kullaniyor. Domain'e su an dokunulamiyor.
- [ ] **`RESEND_API_KEY`** — resend.com hesabi **`pitonstudios@gmail.com` ile acilmali** (dogrulanmis alan adi olmadan `onboarding@resend.dev` sadece hesap sahibine gonderebiliyor). Anahtar girilmeden form calismaz, acik hata verir.
- [ ] Vercel dashboard'dan `piton-studios-db` Blob store'u silinebilir — kullanilmiyor.
- [ ] Opsiyonel: `pitonstudios.com` Resend'te dogrulanirsa `CONTACT_FROM_EMAIL` eklenip ziyaretciye otomatik yanit acilir.
- [ ] Eski madde: proje tarihleri duzeltilecek; avie-global Saiber atifi teyit bekliyor.

### Next Session

- [ ] Resend anahtari girildikten sonra formu **canli test et** (gercek bir gonderim yapilmadi — sadece dogrulama/rate-limit/honeypot davranislari test edildi)
- [ ] Search Console'a sitemap gonder, indexlemeyi izle
- [ ] Blog icerik uretimine devam (altyapi hazir, 3 dilde 2'ser yazi var)
- [ ] Lighthouse audit (Sprint 1 sonrasi olculmedi)

### Notes / Dikkat

- **Site tamamen statik.** Veritabani yok, auth yok, panel yok, harici depolama yok. Icerik `src/lib/data.ts` + `src/messages/*.json` uzerinden elle duzenleniyor.
- **`pnpm content:check`** her yeni proje/hizmet ekleyisinden sonra calistirilmali — eksik ceviri varsa exit 1 verir. Iki eksik story cevirisini bulan seydi.
- **Blog yazisi eklerken** `translationKey` frontmatter alani zorunlu — diller arasi hreflang buna bagli.
- `piton-tasks/task-index.md` Phase 0-1'de **yanlis COMPLETED** isaretli tasklar vardi (Supabase kurulumu, video pipeline, admin CRUD). `NEVER_DONE` olarak duzeltildi.
- Middleware matcher'i genis: `/((?!api|_next|_vercel|.*\..*).*)`. Eski dar matcher `['/', '/(tr|en|ru)/:path*']` locale oneki olmayan yeni bir rotayi sessizce kapsam disinda birakiyordu.
- Plan dosyasinin basinda **iptal basligi** var — ileride bir session onu okuyup panel kurmaya kalkmasin.

---

## 2026-08-08 — Session 10

Icerik uretimi sessioni. Blog altyapisi grafik/TOC/SSS destegiyle genisletildi,
6 uzun form yazi 3 dilde yazildi (18 MDX), anasayfa nav'indaki Blog eksigi duzeltildi.

### Completed

**Blog altyapisi** (`7e9ed89` — TASK-030)
- [x] `src/components/mdx/mdx-components.tsx` — `BarChart` (CSS yatay cubuk),
      `TrendChart` (inline SVG cok serili cizgi), `StatGrid`, `Callout`, `KeyTakeaways`
      + site ici baglantilari `next/link`'e ceviren `a` override'i. Hepsi tema
      degiskenleriyle calisir, hicbiri client component degil
- [x] `src/components/blog-toc.tsx` — icindekiler tablosu yazidan otomatik cikarilir
      (`extractHeadings()`, `src/lib/blog.ts`); id'ler `rehype-slug` ile ayni
      github-slugger algoritmasini kullanir. 3'ten az baslikta gizlenir
- [x] Frontmatter `faq` alani → yazi sonunda SSS bolumu + `FAQPage` JSON-LD
- [x] `rehype-slug` + `github-slugger` bagimliliklari, h4-h6 baslik hiyerarsisi,
      `.blog-toc` / `.mdx-*` / `.blog-faq` stilleri (globals.css +230 satir)
- [x] `blog.tableOfContents` ve `blog.faqTitle` cevirileri tr/en/ru

**Icerik — 6 yazi × 3 dil = 18 MDX** (`7e9ed89` TASK-031, `d50eeb8` TASK-032)
- [x] `seo-to-geo` — yapay zeka caginda arama gorunurlugu, SEO'dan GEO'ya
- [x] `website-cost` — kurumsal web sitesi maliyeti 2026, butce kalemleri
- [x] `ai-automation-roi` — KOBI'ler icin AI otomasyonu ve ROI hesabi
- [x] `nextjs-vs-wordpress` — kurumsal siteler icin karar matrisi, 3 yillik TCO
- [x] `multilingual-site` — hreflang, i18n mimarisi, ceviri borcu, 7 hata
- [x] `ecommerce-cro` — huni olcumu, terk noktalari, 12 iyilestirme
- [x] Her yazida TOC, h2-h6 hiyerarsisi, tablolar, grafikler, ozet kutusu, SSS
- [x] Icerik ici **81 ic link**, tamami sitemap'e karsi dogrulandi — kirik yok
- [x] Blog toplam **8 yazi × 3 dil**, statik sayfa 476 → 525

**Nav duzeltmesi** (`d50eeb8` — TASK-033)
- [x] Anasayfa nav'inda Blog linki yoktu. Site iki ayri nav component'i kullaniyor:
      `chrome.tsx` (anasayfa) ve `page-shell.tsx` (ic sayfalar); Blog yalnizca
      ikincisindeydi. `chrome.tsx`'in masaustu nav'ina + mobil menu dizisine eklendi

### Yol boyunca cikan iki gercek hata

1. **`next-mdx-remote` MDX icindeki tum JS ifadelerini siliyordu.** `blockJS` varsayilani
   `true`; `items={[...]}` gibi prop ifadeleri sessizce kaldiriliyor, component'ler
   `undefined` prop ile cagriliyor ve prerender `items.map` uzerinde patliyordu.
   `blockJS: false` eklendi, `blockDangerousJS` acik birakildi. **Bu ayar kaldirilirsa
   tum grafikler ve ozet kutulari kirilir.**
2. **Grafik tavani veriden kucuk verilebiliyordu.** ROI yazisinda `max={4000}` iken seri
   7.440'a cikiyor, cizgi cerceveden tasip ustteki paragrafin uzerine biniyordu.
   `BarChart`/`TrendChart` artik `max(verilen, veri)` kullaniyor — bir daha olamaz.

### Pending — kullanici tarafinda (onceki session'dan devam)

- [ ] **`NEXT_PUBLIC_SITE_URL`** Vercel'e eklenmeli. Yoksa yeni yazilarin da
      canonical / hreflang / OG URL'leri deploy adresinden uretiliyor
- [ ] **`RESEND_API_KEY`** — Resend hesabi `pitonstudios@gmail.com` ile acilmali
- [ ] Vercel'deki kullanilmayan `piton-studios-db` Blob store'u silinebilir
- [ ] Proje tarihleri duzeltilecek; avie-global Saiber atifi teyit bekliyor

### Next Session

- [ ] Deploy sonrasi anasayfada nav'da Blog'un gorundugunu canli dogrula
- [ ] Search Console'a sitemap gonder (525 sayfa), yeni yazilarin indexlenmesini izle
- [ ] Lighthouse audit — Sprint 1'den beri olculmedi, blog sayfalari yeni
- [ ] Resend anahtari girildikten sonra iletisim formunu canli test et
- [ ] Isteniyorsa icerik uretimine devam — altyapi hazir, yazi eklemek artik
      yalnizca MDX yazmak demek

### Notes / Dikkat

- **Nav iki yerde.** `chrome.tsx` (anasayfa) ve `page-shell.tsx` (ic sayfalar) ayri
  component'ler ve nav icerikleri **elle** esitleniyor. Menuye link eklerken ikisini de
  guncelleyin — hem masaustu nav hem mobil menu dizisi
- **`blockJS: false`** `src/app/[locale]/blog/[slug]/page.tsx`'te kalmali (yukariya bakin)
- **Yeni blog yazisi eklerken**: `translationKey` zorunlu (hreflang buna bagli),
  `faq` alani opsiyonel ama SSS + FAQPage JSON-LD uretir, TOC otomatik — elle yazmayin
- **Grafik verileri ve fiyat bantlari olcum degil.** Yazilarda senaryo modeli /
  gosterge piyasa araligi olarak acikca isaretlendi. Gercek Piton fiyatlandirmasi
  farkliysa maliyet yazisindaki bantlar guncellenmeli
- Ic link dogrulamasi icin pratik yontem: MDX'lerden `/xx/...` linklerini cikarip
  `.next/server/app/sitemap.xml.body` ile `comm -23` karsilastirmasi

---

## 2026-08-14 — Session 11

Tek konu: **kapsamli SSS sayfasi** (TASK-051). Yaninda iki kucuk UI duzeltmesi.

### Completed

- [x] **TASK-051 — SSS sayfasi**: `/sss` · `/en/faq` · `/ru/faq`
      12 kategori, **75 soru x 3 dil = 225 soru-cevap**. Plan: `piton-plans/faq-page-plan.md`
- [x] `src/lib/faq.ts` — kanonik iskelet: kategori sirasi, **kalici soru id'leri**,
      ilgili hizmet/blog baglantilari. Metinler `messages/*.json` -> `faqItems`
- [x] `src/lib/faq-content.ts` — eksik cevirili soruyu sessizce atlayan okuyucu;
      JSON-LD ve llms.txt ayni kaynagi kullaniyor
- [x] `src/lib/seo.ts`: `webPageJsonLd()` eklendi; `faqJsonLd()` geriye uyumlu
      sekilde `@id` + `inLanguage` aliyor (12 hizmet sayfasindaki cagrilar bozulmadi)
- [x] `/llms.txt` (llmstxt.org bicimi) — 12 hizmet, 75 SSS sorusu anchor'iyla,
      blog yazilari, iletisim
- [x] `robots.ts` — 14 AI crawler icin acik `allow` (GPTBot, OAI-SearchBot,
      ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended vd.)
- [x] `check-translations.ts` artik `faqItems`'i da dogruluyor — 426 kontrol, 0 sorun
- [x] Nav + footer'a SSS linki — `chrome.tsx` **ve** `page-shell.tsx` ikisine birden
- [x] `.bottom-chrome` grid duzeltmesi: `auto 1fr auto` -> `1fr auto 1fr`
- [x] Meta partner ikonu gercek Meta "infinity" markasiyla degistirildi

### GEO/LLM kurallari — sayfanin varlik sebebi, bozmayin

- **Cevap-once**: her cevabin ilk paragrafi (`a`) soruyu **40-60 kelimede dogrudan**
  yanitlar. LLM'in alintiladigi pasaj bu. "Duruma gore degisir" girisi yasak
- **Native `<details>`**: cevaplar akordeon **kapaliyken de DOM'da**. Kosullu render
  (`{open && ...}`) yasak — JS kapaliyken de 75 cevabin tamami gorunur
- **Kalici anchor** (`#faq-{id}`): id'ler degismez, disaridan tek soruya atif yapilabilir
- Arama filtresi eslesmeyeni **DOM'dan silmez**, `hidden` verir
- **Kendi kendine yeten cevaplar**: "yukarida anlattigimiz gibi" tarzi baglam
  bagimliligi yok — LLM pasaji izole alintiliyor

### Nasil uretildi

Ana oturum plani + iskeleti yazdi, icerik 6 paralel agent'a dagitildi (dizin
izolasyonuyla): altyapi 1 agent, TR icerik 2, EN cevirisi 2, RU cevirisi 2.
Icerik agent'lari `src/messages/*.json`'a **dogrudan yazmadi** — scratchpad'e JSON
uretti, ana oturum `faq.ts` sirasina gore merge etti. Cakisma olmadi.

### Dogrulama

- `typecheck` temiz · `lint` 0 error (18 onceden var olan warning)
- `build` basarili: statik sayfa **506 -> 514** (3 SSS + 3 OG + llms.txt)
- `content:check`: **426 kontrol, 0 sorun** (tr/en/ru faqItems 75/75)
- Render edilen HTML: 75 `<details>`, hepsi **kapali** (`open` attribute yok),
  75 cevap yine de DOM'da. 1 `h1` / 12 `h2` / 75 `h3`. 87 benzersiz `faq-*` anchor
- JSON-LD 4 blok; FAQPage'de 75 soru, **bos/kisa cevap 0**. hreflang 3 dil + `x-default`

### Yarim kalan yok

Session'da baslanip bitirilmemis is yok.

### Pending — kullanici karari bekliyor

- [ ] `robots.ts`'te **`CCBot` ve `Bytespider`** de izinli. Bunlar cevap motoru degil,
      egitim verisi toplayicisi — GEO gorunurlugune katkisi yok. Istenmiyorsa cikarilir
- [ ] **Anasayfada onceden var olan hata** (bu isin parcasi degil, `HEAD`'de de vardi):
      `workScene.heading` = `"Öne Çıkan <em>Projeler</em>"` next-intl'e rich-text
      handler'i verilmeden cagriliyor, konsola `FORMATTING_ERROR` basiyor

### Pending — kullanici tarafinda (onceki session'lardan devam)

- [ ] **`NEXT_PUBLIC_SITE_URL`** Vercel'e eklenmeli — yoksa SSS sayfasinin da
      canonical / hreflang / JSON-LD `@id` / llms.txt URL'leri deploy adresinden uretilir
- [ ] **`RESEND_API_KEY`** — Resend hesabi `pitonstudios@gmail.com` ile acilmali
- [ ] Proje tarihleri duzeltilecek; avie-global Saiber atifi teyit bekliyor

### Next Session

- [ ] Deploy sonrasi `/sss`, `/en/faq`, `/ru/faq` ve `/llms.txt` canli dogrula
- [ ] Search Console'a guncel sitemap gonder, SSS sayfasinin indexlenmesini izle
- [ ] Rich Results Test ile FAQPage yapilandirilmis verisini dogrula
- [ ] Lighthouse audit — Sprint 1'den beri olculmedi, SSS sayfasi da yeni

### Notes / Dikkat

- **Soru id'leri kalici anchor'dir.** Soru silinmedikce `faq.ts`'teki `id` degistirilmez —
  LLM'ler ve harici siteler `#faq-{id}` adresine atif yapiyor
- **Yeni soru eklerken**: `faq.ts`'e girdi + **3 dilde** `faqItems.<id>` + `pnpm content:check`
- **Fiyat bantlari SSS'te de var.** Fiyat degisirse artik 5 blog yazisi x 3 dil'e ek
  olarak `faqItems`'taki `pricing` ve `ecommerce` kategorileri de guncellenmeli
  (TR TL, en/ru euro; kur 1 EUR = 45 TL)
- **Nav hala iki yerde** — `chrome.tsx` + `page-shell.tsx`. Ayrica `page-shell.tsx`
  nav etiketlerini `nav` degil **`common`** namespace'inden okuyor; yeni link eklerken
  her iki namespace'e de etiket gerekebiliyor
- Sosyal medya uretim dosyalari (`piton-docs/social-production/`, `render-*.cjs`)
  bu oturumun isi degildi; karismasin diye **ayri commit'e** alindi (`1b7f299`)
