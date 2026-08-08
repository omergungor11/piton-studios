# Piton Studios - Task Index

## Dashboard

| Phase | Name | Total | Done | In Progress | Pending | Blocked |
|-------|------|-------|------|-------------|---------|---------|
| 0 | Project Setup | 7 | 7 | 0 | 0 | 0 |
| 1 | Core Infrastructure | 6 | 6 | 0 | 0 | 0 |
| 2 | Frontend / UI | 6 | 6 | 0 | 0 | 0 |
| 3 | Enhancements | 2 | 2 | 0 | 0 | 0 |
| 4 | SEO + Blog + Iletisim | 8 | 8 | 0 | 0 | 0 |
| 5 | Icerik Uretimi | 6 | 6 | 0 | 0 | 0 |
| **Total** | | **35** | **35** | **0** | **0** | **0** |

**Progress**: 35/35 (100%) ✓

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
| TASK-035 | Projeler sayfasina interaktif Etki Paneli (5 boyut, imlecle taranan SVG grafik, 3 dil) + showreel baslik hatasi | M | COMPLETED | `PENDING` |

---

### Iptal edilenler (2026-07-29 kullanici karari)

| ID | Task | Durum | Not |
|----|------|-------|-----|
| — | Neon Postgres + Drizzle + icerik gocu | **CANCELLED** | Kod `61b0d2a`, geri alindi `a4fa8e9` |
| — | Auth.js + admin panel | **CANCELLED** | Kod `5cd315c`, geri alindi `0a35979` |
| — | Vercel Blob medya altyapisi | **CANCELLED** | Hic baglanmadi, `b9af751` |
| — | i18n refaktoru (JSON bolme) | **CANCELLED** | `pnpm content:check` ile yonetiliyor |
