# Piton Studios - Task Index

## Dashboard

| Phase | Name | Total | Done | In Progress | Pending | Blocked |
|-------|------|-------|------|-------------|---------|---------|
| 0 | Project Setup | 7 | 7 | 0 | 0 | 0 |
| 1 | Core Infrastructure | 6 | 6 | 0 | 0 | 0 |
| 2 | Frontend / UI | 6 | 6 | 0 | 0 | 0 |
| 3 | Enhancements | 2 | 2 | 0 | 0 | 0 |
| 4 | SEO + Blog + Iletisim | 8 | 8 | 0 | 0 | 0 |
| 5 | Icerik Uretimi | 20 | 20 | 0 | 0 | 0 |
| **Total** | | **49** | **49** | **0** | **0** | **0** |

**Progress**: 49/49 (100%) ✓

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
| TASK-022 | SEO altyapisi: sitemap (267 URL), robots, hreflang, canonical | L | COMPLETED | `27274ff` |
| TASK-023 | JSON-LD: Organization, WebSite, BreadcrumbList, CreativeWork, Service, FAQPage | M | COMPLETED | `27274ff` |
| TASK-024 | Dinamik OG gorselleri (proje / hizmet / blog) | M | COMPLETED | `27274ff` |
| TASK-025 | Cok dilli metadata duzeltmesi — en/ru sayfalari Turkce indexleniyordu | M | COMPLETED | `27274ff` |
| TASK-026 | MDX blog: liste, yazi, etiket sayfalari, RSS, 3 dilde 2'ser yazi | L | COMPLETED | `27274ff` |
| TASK-027 | Vercel Analytics + Speed Insights | S | COMPLETED | `27274ff` |
| TASK-028 | Eksik hero gorselleri — 35 proje sayfasi production'da kirikti | M | COMPLETED | `a4fa8e9` |
| TASK-029 | Calisan iletisim formu (Resend, honeypot, rate limit) | L | COMPLETED | `4756404` |

## Phase 5: Icerik Uretimi (2026-08-08)

| ID | Task | Complexity | Status | Commit |
|----|------|-----------|--------|--------|
| TASK-030 | Blog MDX component seti (BarChart, TrendChart, StatGrid, Callout, KeyTakeaways), otomatik icindekiler tablosu, frontmatter `faq` → FAQPage JSON-LD, rehype-slug | L | COMPLETED | `7e9ed89` |
| TASK-031 | 3 uzun form SEO/GEO uyumlu blog yazisi × 3 dil (9 MDX) — tablo, grafik, SSS ve 54 dogrulanmis ic link | L | COMPLETED | `7e9ed89` |
| TASK-032 | 3 blog yazisi daha × 3 dil (9 MDX): Next.js vs WordPress, cok dilli site/hreflang, e-ticaret CRO | L | COMPLETED | `d50eeb8` |
| TASK-033 | Anasayfa nav'ina Blog linki (chrome.tsx masaustu + mobil) — yalnizca ic sayfalarda vardi | S | COMPLETED | `d50eeb8` |
| TASK-034 | Blog fiyatlandirmasi: TR yazilari TL'ye, en/ru euro bantlari gercek fiyat seviyesine cekildi (5 yazi × 3 dil) | M | COMPLETED | `1fbce47` |
| TASK-035 | Projeler sayfasina interaktif Etki Paneli (5 boyut, imlecle taranan SVG grafik, 3 dil) + showreel baslik hatasi | M | COMPLETED | `cae515a` |
| TASK-036 | Projeler sayfasindaki "Studyo Tanitim" showreel bolumu kaldirildi (JSX + CSS + 3 dil ceviri) | S | COMPLETED | `fce9ebb` |
| TASK-037 | Yeni marka logosu (python + devre karti dunya): arka plan alfaya cevrildi, logo.webp + icon/apple-icon/favicon yeniden uretildi | S | COMPLETED | `af405aa` |
| TASK-038 | Etki Paneli hizmetler sayfasina tasindi; icerik 5 web boyutundan 6 boyuta genisletildi (otomasyon, AI, performans, SEO/GEO, donusum, bakim) | M | COMPLETED | `1e8c743` |
| TASK-039 | Projeler sayfasina Teslim Akisi: 6 adimli interaktif surec seridi, her adimda cikti/gereksinim + farkli disiplinlerden ornek proje | M | COMPLETED | `1e8c743` |
| TASK-040 | Baslik sarma duzeltmesi: projeler hero'su ve Teslim Akisi basligi kapsayici genislik kapagi yuzunden 2 satira dusuyordu | S | COMPLETED | `ba5c5f7` |
| TASK-041 | Hakkinda sayfasi elden gecirildi: 3 interaktif bolum (rakamlar, zaman cizelgesi, yetenek haritasi), gomulu Turkce metinler i18n'e tasindi, sayilar WORKS'ten turetiliyor | L | COMPLETED | `ba5c5f7` |
| TASK-042 | Surunen yilan animasyonu: preloader'da ilerlemeye bagli yilan + sayfa arka planinda kaydirmayla suzulen 3 yilan (CSS sprite, 164 KB) | M | COMPLETED | `bac924b` |
| TASK-043 | Yilan scrollbar: tarayici cubugunun yerine gecen, suruklenebilir sag kenar rayi (90 derece cevrilmis sprite) | M | COMPLETED | `5ad8d79` |
| TASK-044 | Bolum kenarini sarmalayan yilan: CSS Motion Path + onde/arkada iki katman, 3 bolumde deneme | M | COMPLETED | `17dc822` |
| TASK-045 | Yilan sarmalama elden gecirildi: kose kirilmasi duzeltildi (36 dilim + adim hizalamasi), tek katmana indi, arka plan yilanlari kaldirildi | M | COMPLETED | `3e6bdc5` |
| TASK-046 | Ic sayfalar anasayfanin arka planini kullaniyor; aurora blur(80px) kaldirilarak kaydirma 2 kat hizlandi | M | COMPLETED | `3e6bdc5` |
| TASK-047 | Icerik duzeltmeleri: yil filtresi -> alan filtresi, is karmasi alan kartlari, yanlis "web'den AI'a gectik" anlatimi, proje yillari dagitildi | L | COMPLETED | `3e6bdc5` |
| TASK-048 | Onizlemesi olmayan projeler icin arayuz iskeleti yer tutucu + 2 yeni ekran goruntusu | S | COMPLETED | `3e6bdc5` |
| TASK-049 | Tipografi sistemi: Space Grotesk (baslik/govde/nav) + IBM Plex Mono (numara, kategori, sayac, tarih, teknik metadata); JetBrains Mono ve Press Start 2P kaldirildi, `latin-ext` eklendi | L | COMPLETED | `a3faf7d` |
| TASK-050 | Hizmet sayfalarindaki abartili rakamlar portfoye dayandirildi (15 hizmet x 4 rakam x 3 dil; site ici celiski 750+ vs 40+); 3 hizmet kaldirildi (ai-training, ai-chatbot, prompt-engineering) + 301 yonlendirme | L | COMPLETED | `4fa2651`, `00fb701` |

---

### Iptal edilenler (2026-07-29 kullanici karari)

| ID | Task | Durum | Not |
|----|------|-------|-----|
| — | Neon Postgres + Drizzle + icerik gocu | **CANCELLED** | Kod `61b0d2a`, geri alindi `a4fa8e9` |
| — | Auth.js + admin panel | **CANCELLED** | Kod `5cd315c`, geri alindi `0a35979` |
| — | Vercel Blob medya altyapisi | **CANCELLED** | Hic baglanmadi, `b9af751` |
| — | i18n refaktoru (JSON bolme) | **CANCELLED** | `pnpm content:check` ile yonetiliyor |
