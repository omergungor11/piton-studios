# Piton - Task Index

## Dashboard

| Phase | Name | Total | Done | In Progress | Pending | Blocked |
|-------|------|-------|------|-------------|---------|---------|
| 0 | Project Setup | 7 | 7 | 0 | 0 | 0 |
| 1 | Core Infrastructure | 6 | 6 | 0 | 0 | 0 |
| 2 | Frontend / UI | 6 | 6 | 0 | 0 | 0 |
| 3 | Enhancements | 2 | 2 | 0 | 0 | 0 |
| 4 | SEO + Blog + Iletisim | 8 | 8 | 0 | 0 | 0 |
| 5 | Icerik Uretimi | 22 | 22 | 0 | 0 | 0 |
| 6 | Interaktif Portfolyo R&D | 2 | 2 | 0 | 0 | 0 |
| 7 | Blog Rehberleri | 2 | 2 | 0 | 0 | 0 |
| 8 | Portfolyo Guncellemeleri | 1 | 1 | 0 | 0 | 0 |
| 9 | Hukuki Uyum | 1 | 1 | 0 | 0 | 0 |
| 10 | Site Geneli UI | 1 | 1 | 0 | 0 | 0 |
| 11 | Büyüme Sayfaları | 6 | 6 | 0 | 0 | 0 |
| 12 | Hizmet & URL Yeniden Yapılanması | 5 | 5 | 0 | 0 | 0 |
| 13 | SEO, Dönüşüm & Görsel Deneyim (TASK-071..078) | 8 | 7 | 0 | 0 | 0 |
| 14 | Fiyatlandırma (TASK-079) | 1 | 1 | 0 | 0 | 0 |
| 15 | Liste Görselleri & Blog Sayfalama (TASK-080..082) | 3 | 3 | 0 | 0 | 0 |
| 16 | Marka Adı & Tipografi (TASK-083..084) | 2 | 2 | 0 | 0 | 0 |
| 17 | Mobil Alt Kontroller (TASK-085) | 1 | 1 | 0 | 0 | 0 |
| **Total** | | **84** | **83** | **0** | **0** | **0** |

**Progress**: 83/84 (TASK-075 teklif sihirbazı kullanıcı kararıyla REVERTED) ✓

> ⚠️ **Phase 0-1'de yanlis COMPLETED isaretli tasklar var.** 2026-07-29'da kod tabani
> tarandiginda su tasklarin hicbir zaman uygulanmadigi tespit edildi. Duzeltilmis
> durumlari asagida `NEVER_DONE` olarak isaretli — gecmis kayit olarak birakildi,
> yeniden yapilmasi PLANLANMIYOR (site tamamen statik calisiyor).

---

## Phase 0: Project Setup

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-001 | Next.js + pnpm init | devops | S | COMPLETED | - |
| TASK-002 | Meta directories (piton-tasks, piton-docs, piton-config, piton-plans) | docs | S | COMPLETED | - |
| TASK-003 | .claude/ hooks, commands, settings | devops | M | COMPLETED | TASK-001 |
| TASK-004 | CLAUDE.md master configuration | docs | M | COMPLETED | TASK-002 |
| TASK-005 | Supabase setup + env config | devops | M | **NEVER_DONE** | — `@supabase/supabase-js` hic kurulmadi |
| TASK-006 | Lint, format, TypeScript config | devops | S | COMPLETED | TASK-001 |
| TASK-007 | Git repo init + first commit | devops | S | COMPLETED | TASK-001..006 |

## Phase 1: Core Infrastructure

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-008 | Supabase Storage bucket + video upload | backend | M | **NEVER_DONE** | — bucket yok; videolar 2026-07-28'de silindi |
| TASK-009 | Supabase DB schema (projects, videos, categories) | database | M | **NEVER_DONE** | — SQL yazildi, hic calistirilmadi; dizin silindi |
| TASK-010 | Video optimization pipeline (compression, thumbnails) | backend | L | **NEVER_DONE** | — src'de tek .mp4 referansi yok |
| TASK-011 | API routes (projects CRUD, video serve) | backend | M | **NEVER_DONE** | — boyle bir route hic olmadi |
| TASK-018 | Supabase client setup (@supabase/ssr) | backend | S | **NEVER_DONE** | — paket kurulu degil |
| TASK-019 | Admin CRUD API routes (all tables) | backend | M | **CANCELLED** | — panel kurulmayacak (2026-07-29 karari) |
| TASK-020 | Framer Motion scroll animations | frontend | M | COMPLETED | TASK-016 |
| TASK-021 | Three.js / 3D elements | frontend | L | COMPLETED | TASK-016 |

## Phase 2: Frontend / UI

| ID | Task | Agent | Complexity | Status | Dependencies |
|----|------|-------|-----------|--------|-------------|
| TASK-012 | Design system + global styles (tasarimdan) | frontend | M | COMPLETED | TASK-007 |
| TASK-013 | Video player component (lazy load, autoplay) | frontend | L | **NEVER_DONE** | — site screenshot tabanli |
| TASK-014 | Portfolio grid + video lightbox | frontend | L | COMPLETED (grid) | video lightbox yok |
| TASK-015 | Landing page + navigation | frontend | M | COMPLETED | TASK-012 |
| TASK-016 | Responsive + performance optimization | frontend | M | COMPLETED | TASK-014,015 |
| TASK-017 | Vercel deployment + domain setup | devops | S | COMPLETED | TASK-016 |


## Phase 4: SEO + Blog + Iletisim (2026-07-28 / 29)

| ID | Task | Complexity | Status | Commit |
|----|------|-----------|--------|--------|
| TASK-022 | SEO altyapisi: sitemap (267 URL), robots, hreflang, canonical | L | COMPLETED | `25b4087` |
| TASK-023 | JSON-LD: Organization, WebSite, BreadcrumbList, CreativeWork, Service, FAQPage | M | COMPLETED | `25b4087` |
| TASK-024 | Dinamik OG gorselleri (proje / hizmet / blog) | M | COMPLETED | `25b4087` |
| TASK-025 | Cok dilli metadata duzeltmesi — en/ru sayfalari Turkce indexleniyordu | M | COMPLETED | `25b4087` |
| TASK-026 | MDX blog: liste, yazi, etiket sayfalari, RSS, 3 dilde 2'ser yazi | L | COMPLETED | `25b4087` |
| TASK-027 | Vercel Analytics + Speed Insights | S | COMPLETED | `25b4087` |
| TASK-028 | Eksik hero gorselleri — 35 proje sayfasi production'da kirikti | M | COMPLETED | `df5a926` |
| TASK-029 | Calisan iletisim formu (Resend, honeypot, rate limit) | L | COMPLETED | `3ff8b74` |

## Phase 5: Icerik Uretimi (2026-08-08)

| ID | Task | Complexity | Status | Commit |
|----|------|-----------|--------|--------|
| TASK-030 | Blog MDX component seti (BarChart, TrendChart, StatGrid, Callout, KeyTakeaways), otomatik icindekiler tablosu, frontmatter `faq` → FAQPage JSON-LD, rehype-slug | L | COMPLETED | `7f550e0` |
| TASK-031 | 3 uzun form SEO/GEO uyumlu blog yazisi × 3 dil (9 MDX) — tablo, grafik, SSS ve 54 dogrulanmis ic link | L | COMPLETED | `7f550e0` |
| TASK-032 | 3 blog yazisi daha × 3 dil (9 MDX): Next.js vs WordPress, cok dilli site/hreflang, e-ticaret CRO | L | COMPLETED | `da26da1` |
| TASK-033 | Anasayfa nav'ina Blog linki (chrome.tsx masaustu + mobil) — yalnizca ic sayfalarda vardi | S | COMPLETED | `da26da1` |
| TASK-034 | Blog fiyatlandirmasi: TR yazilari TL'ye, en/ru euro bantlari gercek fiyat seviyesine cekildi (5 yazi × 3 dil) | M | COMPLETED | `a8cff3a` |
| TASK-035 | Projeler sayfasina interaktif Etki Paneli (5 boyut, imlecle taranan SVG grafik, 3 dil) + showreel baslik hatasi | M | COMPLETED | `d309309` |
| TASK-036 | Projeler sayfasindaki "Studyo Tanitim" showreel bolumu kaldirildi (JSX + CSS + 3 dil ceviri) | S | COMPLETED | `ade9d00` |
| TASK-037 | Yeni marka logosu (python + devre karti dunya): arka plan alfaya cevrildi, logo.webp + icon/apple-icon/favicon yeniden uretildi | S | COMPLETED | `0b8daea` |
| TASK-038 | Etki Paneli hizmetler sayfasina tasindi; icerik 5 web boyutundan 6 boyuta genisletildi (otomasyon, AI, performans, SEO/GEO, donusum, bakim) | M | COMPLETED | `c8da455` |
| TASK-039 | Projeler sayfasina Teslim Akisi: 6 adimli interaktif surec seridi, her adimda cikti/gereksinim + farkli disiplinlerden ornek proje | M | COMPLETED | `c8da455` |
| TASK-040 | Baslik sarma duzeltmesi: projeler hero'su ve Teslim Akisi basligi kapsayici genislik kapagi yuzunden 2 satira dusuyordu | S | COMPLETED | `4df5169` |
| TASK-041 | Hakkinda sayfasi elden gecirildi: 3 interaktif bolum (rakamlar, zaman cizelgesi, yetenek haritasi), gomulu Turkce metinler i18n'e tasindi, sayilar WORKS'ten turetiliyor | L | COMPLETED | `4df5169` |
| TASK-042 | Surunen yilan animasyonu: preloader'da ilerlemeye bagli yilan + sayfa arka planinda kaydirmayla suzulen 3 yilan (CSS sprite, 164 KB) | M | COMPLETED | `22bcd16` |
| TASK-043 | Yilan scrollbar: tarayici cubugunun yerine gecen, suruklenebilir sag kenar rayi (90 derece cevrilmis sprite) | M | COMPLETED | `5617aa1` |
| TASK-044 | Bolum kenarini sarmalayan yilan: CSS Motion Path + onde/arkada iki katman, 3 bolumde deneme | M | COMPLETED | `0d66cb1` |
| TASK-045 | Yilan sarmalama elden gecirildi: kose kirilmasi duzeltildi (36 dilim + adim hizalamasi), tek katmana indi, arka plan yilanlari kaldirildi | M | COMPLETED | `33a85d4` |
| TASK-046 | Ic sayfalar anasayfanin arka planini kullaniyor; aurora blur(80px) kaldirilarak kaydirma 2 kat hizlandi | M | COMPLETED | `33a85d4` |
| TASK-047 | Icerik duzeltmeleri: yil filtresi -> alan filtresi, is karmasi alan kartlari, yanlis "web'den AI'a gectik" anlatimi, proje yillari dagitildi | L | COMPLETED | `33a85d4` |
| TASK-048 | Onizlemesi olmayan projeler icin arayuz iskeleti yer tutucu + 2 yeni ekran goruntusu | S | COMPLETED | `33a85d4` |
| TASK-049 | Tipografi sistemi: Space Grotesk (baslik/govde/nav) + IBM Plex Mono (numara, kategori, sayac, tarih, teknik metadata); JetBrains Mono ve Press Start 2P kaldirildi, `latin-ext` eklendi | L | COMPLETED | `4a245e5` |
| TASK-050 | Hizmet sayfalarindaki abartili rakamlar portfoye dayandirildi (15 hizmet x 4 rakam x 3 dil; site ici celiski 750+ vs 40+); 3 hizmet kaldirildi (ai-training, ai-chatbot, prompt-engineering) + 301 yonlendirme | L | COMPLETED | `d93858d`, `34789bf` |
| TASK-051 | SSS sayfasi: 12 kategori x 75 soru x 3 dil (225 soru-cevap), FAQPage + WebPage(speakable) JSON-LD, `/llms.txt`, 14 AI crawler izni, cevap-once GEO yazimi, native `<details>` (kapaliyken de DOM'da) | L | COMPLETED | — |
| TASK-052 | Donusum bolumleri: referanslar sahnesi (vaka sonuc kartlari — taslak yorum/karusel yerine dogrulanabilir 6 sonuc karti), 6 adimlik surec sahnesi (teknoloji adi gecmez), fiyatlandirma sayfasi (TL/euro, 3 dil), hero rakamlar seridi (49+/10+/12/3), 11 sektorel landing + indeks (3 dil; egitim + guzellik referanssiz, tum sayfalarda "Sektore bakisimiz" detail bolumu), nav + routing + sitemap entegrasyonu | L | COMPLETED | — |

## Phase 6: Interaktif Portfolyo R&D (2026-09-04)

| ID | Task | Complexity | Status | Commit |
|----|------|-----------|--------|--------|
| TASK-053 | Projects V2 yerel prototipi: 15 gercek proje mockup'i, scroll-driven 3B spiral/helis, hover/touch proje odagi, WebGL2 destekli mobil 3B profil, kosullu HTML fallback, production 404 korumasi | L | COMPLETED (LOCAL ONLY) | — |
| TASK-054 | Proje bulutunu anasayfa "Öne Çıkan Projeler" sahnesine entegre et: ortak `ProjectCloudSection`, `src/lib/project-cloud.ts`, `projectCloud` cevirileri (3 dil), `.scene--cloud`, alt chrome offset'i, sahne takip duzeltmesi | M | COMPLETED | — |

> `/projeler-v2` rotasi dev-only prototip olarak kaldi; canli deneyim anasayfa sahnesinde.
> Mobil kabul profilleri: 390x844 ve 430x932 portre ile kisa-yatay telefon. Ilk
> dokunus odaklar, ikinci dokunus detay sayfasini acar; reduced-motion, Save-Data,
> WebGL2 veya context failure durumlarinda HTML fallback kullanilir.

---

### Iptal edilenler (2026-07-29 kullanici karari)

| ID | Task | Durum | Not |
|----|------|-------|-----|
| — | Neon Postgres + Drizzle + icerik gocu | **CANCELLED** | Kod `af59eae`, geri alindi `df5a926` |
| — | Auth.js + admin panel | **CANCELLED** | Kod `dcaeea2`, geri alindi `75ce1bc` |
| — | Vercel Blob medya altyapisi | **CANCELLED** | Hic baglanmadi, `c03fd1c` |
| — | i18n refaktoru (JSON bolme) | **CANCELLED** | `pnpm content:check` ile yonetiliyor |

## Phase 7: Blog geliştirme (2026-09-05)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-055 | Üç detaylı Türkçe rehber; kaynakça, grafik veri tabloları, BlogPosting geliştirmeleri ve bağlantı doğrulaması | L | COMPLETED |
| TASK-057 | Yapay zekânın web tasarım ve kodlamaya etkisi rehberi (tr): doğrulanmış birincil kaynaklı veriler, 2 grafik, sayı kartları, yeni `FlowDiagram` MDX bileşeni, SSS, kaynakça, iç linkler | L | COMPLETED |

## Phase 8: Portfolyo güncellemeleri (2026-09-14)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-058 | Hukuki sayfalar (tr/en/ru): Gizlilik + KVKK Aydınlatma, Çerez Politikası, Kullanım Koşulları; `src/lib/legal.ts` + `LEGAL_READY` kapısı, footer/form/sitemap entegrasyonu | M | COMPLETED |
| TASK-056 | VELAIR portfolyoya eklendi: canlı siteden desktop (1440×810) + mobil (860×1856) önizleme, tr/en/ru çeviriler, SSS proje sayısı 49 → 50; projeler listesinde EKH Yapı'nın yerine #09'a alındı (EKH Yapı → #50) | S | COMPLETED |

## Phase 10: Site geneli UI (2026-09-15)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-066 | 7 yeni hizmet (özel yazılım, mobil, e-ticaret, ERP & CRM, WhatsApp & chatbot, Meta reklamları, bakım & destek), Agentic AI kaldırma + yönlendirme, Eğitim & Danışmanlık adı | L | COMPLETED |
| TASK-067 | 13 sektör hub'ı (Mühendislik + Sanayi yeni), tüm ilgili hizmetler × 3 dil | L | COMPLETED |
| TASK-068 | Çözümler: SEO ağırlıklı 3 çözüm kaldırıldı, yeni hizmetlere dayalı benzersiz çözümler × 3 dil | L | COMPLETED |
| TASK-069 | Yerel URL mimarisi: slugs.ts, navigation sarmalayıcıları, ru segmentleri, otomatik yönlendirmeler, iç link dönüşümü | L | COMPLETED |
| TASK-070 | Menü: Hizmetler paneli + öne çıkan çözümler, mobil akordeon ve sıra; iletişim başlığı çevirisi | M | COMPLETED |
| TASK-071 | SEO denetimi (515 URL tarama + Lighthouse) ve düzeltmeler: ru etiket 404, etiket hreflang, varsayılan OG görseli, liste sayfası JSON-LD, başlık/açıklama uzunlukları, yetim sayfalar, anasayfa erişilebilirlik, llms.txt | L | COMPLETED |
| TASK-072 | E-posta tasarım sistemi (`src/lib/email`): iletişim bildirimi + 3 dilde otomatik yanıt canlıda, kampanya şablonu, dev önizleme rotası | M | COMPLETED |
| TASK-073 | Ambalaj Cini referans kartı tutarlılığı + tekrar eden 4 proje özetinin farklılaştırılması (3 dil) | S | COMPLETED |
| TASK-074 | Dönüşüm takibi: iletişim link tıklamaları + form gönderimi Vercel Analytics olayları, gizlilik metni güncellemesi | S | COMPLETED |
| TASK-075 | Teklif sihirbazı (fiyatlar sayfası) + iletişim formuna `?brief=` ön doldurma | M | **REVERTED** — 2026-09-19 kullanıcı kararıyla kaldırıldı (gereksiz) |
| TASK-076 | Yeni hizmetler için 3 blog yazısı × 3 dil (ERP mi Excel mi, WhatsApp Business API, web sitesi bakımı) | L | COMPLETED |
| TASK-077 | Hizmet sayfası görselleri: 18 kodla üretilmiş SVG hero sahnesi + "Nasıl çalışır" akış diyagramı × 3 dil (3 paralel ajan) | L | COMPLETED |
| TASK-078 | Lenis yumuşak kaydırma + başlık/açıklama/kart reveal animasyonları, paralaks (3 paralel ajan) | L | COMPLETED |
| TASK-060 | 4 blog yazısının en/ru çevirisi (erişilebilir formlar, B2B landing, site yenileme SEO, yapay zekânın etkisi) | M | COMPLETED |
| TASK-061 | Dile özel 404 (`[locale]/not-found.tsx` + catch-all), 3 dil | S | COMPLETED |
| TASK-062 | 10 şehir sayfası (`/bolgeler`, `/web-tasarim/[slug]`), ortak `landing-view` | L | COMPLETED |
| TASK-063 | 12 hizmet × sektör çözüm sayfası (`/cozumler`, `/cozumler/[slug]`) | L | COMPLETED |
| TASK-064 | 5 karşılaştırma yazısı × 3 dil (ajans/freelancer, site kurucu, Shopify, PWA, Google Ads/SEO) | L | COMPLETED |
| TASK-065 | 6 rakamsız teknik vaka çalışması (`works.{slug}.caseStudy`) × 3 dil + Supabase izlerinin kaldırılması | M | COMPLETED |
| TASK-079 | Fiyatlar sayfası: mobil uygulama paketi (piyasa analiziyle 180.000–500.000 ₺) + aylık büyüme hizmetleri bölümü (SEO & GEO 7.000 ₺/ay, Google Ads ve Meta 10.000 ₺/ay, reklam bütçesi hariç) × 3 dil | M | COMPLETED |
| TASK-059 | Ortak `SiteFooter` (anasayfa + iç sayfalar): iki satır — menü / teknoloji ikonları · "Piton Studios © 2026" · hukuki linkler; iletişim sosyal ikonlarına Upwork, Behance, Dribbble, Fiverr | S | COMPLETED |

## Phase 15: Liste görselleri ve blog sayfalama (2026-09-20)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-080 | Liste görselleri: projeler tablosuna 16:9 ekran görüntüsü kolonu (görseli olmayan 15 projede baş harf yer tutucusu) + hizmetler listesi kartlarına 18 SVG sahnesi (tembel render, animasyon yalnızca hover) | M | COMPLETED |
| TASK-081 | Blog sayfalama: sayfa başına 10 yazı, yol tabanlı ve 3 dilde çevrili segment (`sayfa`/`page`/`stranitsa`), etiket sayfaları, canonical + rel=prev/next + sitemap | M | COMPLETED |
| TASK-082 | Blog yazı görselleri: 20 hero SVG sahnesi (translationKey başına) + 9 gövde şeması (`BlogFigure`), yazı detayı ve blog listesi kartlarında | L | COMPLETED |

## Phase 16: Marka adı & tipografi (2026-10-02 / 08)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-083 | Marka adı "Piton Studios" → "Piton": site metinleri, 3 dil çeviri, blog + hukuki MDX, e-posta şablonları, OG, JSON-LD (`alternateName` eski ad); domain ve e-posta aynı | M | COMPLETED |
| TASK-084 | Marka tipografisi: 24 fontlu yerel karşılaştırma, arama/filtreler; seçilen Nippo'nun hero, nav ve mobil menüdeki Piton yazılarına uygulanması | S | COMPLETED |

## Phase 17: Mobil alt kontroller (2026-10-08)

| ID | Task | Complexity | Status |
|----|------|------------|--------|
| TASK-085 | Mobilde sol sahne göstergesi ile sağ WhatsApp/telefon butonlarını aynı yüksekliğe ve alt hizaya getir | S | COMPLETED |
