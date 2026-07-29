# Piton Studios

## Proje

Piton Studios firmasinin dijital ajans / portfolyo websitesi. Proje screenshot'lari ve case study'ler
uzerine kurulu, 3 dilli (tr/en/ru), hizli yuklenen modern bir portfolyo sitesi.

- **GitHub**: https://github.com/omergungor11/piton-studios
- **Deploy**: Vercel
- **Database**: Neon Postgres (planlandi — bkz. `piton-plans/2026-07-28-blog-admin-platform-plan.md`)
- **Medya**: Vercel Blob (planlandi — Hobby planinda ucretsiz)

> Not: Supabase kullanilmiyor. `@supabase/supabase-js` hic kurulmadi, `supabase/migrations/`
> altindaki SQL'ler hic calistirilmadi. Ucretsiz limit doldugu icin Neon'a gecildi.

## Slash Commandlar

| Command | Ne yapar |
|---------|----------|
| `/cold-start` | Session baslangici — projeyi oku, durumu raporla |
| `/git-full` | Stage, commit, push — task durumlarini guncelle |
| `/local-testing` | Tum servisleri ayaga kaldir ve dogrula |
| `/turn-off` | Session notu yaz, tasklari isaretle, push, kapat |

---

## Mevcut Durum

**Progress**: 21/21 task (%100) — Tum phase'ler tamamlandi. Polish/iyilestirme devam ediyor.

- **56 proje** WORKS array'inde — freelancer klasöründen 13 + 5 canlı self-development (FurCRM slider #2, canlı linkler `url` alanıyla) + Work-Restored taramasından 5 + avie-global geri eklendi; nexos-investment mükerrer girdisi silindi. 2026-07-27: tüm kulüp/nightlife projeleri kaldırıldı (WORKS'ten 10, STORIES'ten 5 — detay: piton-docs/MEMORY.md). İlk 6 proje slider'da
- **Case study'ler güçlendirildi**: Nexos (flagship full-stack anlatım), Ambalaj Cini (%30 büyüme), Sammys (özel rezervasyon), Radyo Juke (özel entegrasyon)
- **Saiber ortaklığı**: 19 projede `collaborator: "Saiber"` — detay sayfasında "İş Birliği" metası olarak görünüyor (liste: piton-docs/MEMORY.md)
- **Anasayfa**: Hero → Spark CTA → Manifesto → Services → Projects → About → Contact (7 scene)
- **Nav**: Unified chrome (anasayfa + ic sayfalar ayni nav)
- **Videolar**: Local fallback aktif (Supabase CDN dev'de devre disi)
- **Proje detay hero**: Screenshot IS the hero — Desktop/Mobile toggle hero icinde sag ust
- **Projeler sayfasi**: `pp-showcase` yatay screenshot seridi (toggle'li, kareler oranli)
- **Ceviriler**: TAMAM — tum 56 proje icin tr/en/ru works.{slug} girdileri eksiksiz (eski 11 ru eksigi 2026-07-16'da kapatildi)
- **Bekleyen**: Proje tarihleri duzeltilecek; avie-global'in Saiber atifi kullanici teyidi bekliyor

### Sprint 1 tamamlandi (2026-07-28) — SEO + Blog + Analytics

- **SEO altyapisi**: `src/app/sitemap.ts` (267 URL, 3 dil, hreflang'li), `src/app/robots.ts`,
  tum sayfalarda canonical + hreflang + x-default (`src/lib/seo.ts`)
- **JSON-LD**: Organization, WebSite, BreadcrumbList, CreativeWork (proje), Service + **FAQPage**
  (hizmet sayfalarindaki mevcut FAQ verisi rich snippet'e donustu)
- **Cok dilli metadata duzeltmesi**: proje/hizmet detay sayfalari `data.ts`'teki Turkce sabitler
  yerine `src/messages/*.json` cevirilerinden okuyor (`src/lib/content-i18n.ts`) — en/ru sayfalari
  artik Turkce baslikla indexlenmiyor
- **Dinamik OG gorselleri**: `src/lib/og.tsx` + proje/hizmet/blog icin `opengraph-image.tsx`
- **Blog**: MDX tabanli, `content/blog/{tr,en,ru}/*.mdx`. Liste, yazi, etiket sayfalari + RSS
  (`/[locale]/rss.xml`). `translationKey` frontmatter alani diller arasi hreflang'i kuruyor.
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`
- Build: 506 statik sayfa, 0 tip hatasi, 0 lint hatasi

> **Vercel'de `NEXT_PUBLIC_SITE_URL` ayarlanmali** — yoksa sitemap/canonical/OG URL'leri
> localhost veya deploy URL'i olarak uretilir.

### Sprint 2 tamamlandi (2026-07-29) — Neon + Drizzle + icerik gocu

Kod tarafi hazir; **Neon projesi acilip `DATABASE_URL` girilmesi bekleniyor**
(adimlar: `piton-docs/neon-setup.md`).

- **Sema**: `src/lib/db/schema.ts` — 8 tablo. Icerik ve ceviri ayristirilmis
  (`projects` / `project_translations`, `services` / `service_translations`);
  ceviri satirlarinda `status` alani var (`missing` | `draft` | `done`)
- **Migration**: `drizzle/0000_initial_schema.sql` uretildi
- **Icerik erisim katmani**: `src/lib/content/` — `CONTENT_SOURCE=static|db` bayragi ile
  iki kaynak arasinda aninda gecis. Sayfalar henuz rewire edilmedi (Sprint 4).
- **Script'ler**: `content:migrate` (idempotent goc, `--dry` destekli),
  `content:export` (DB → data.ts, acil durum valfi), `content:check` (statik ↔ DB denklik)
- **Ceviri borcu kapatildi**: goc script'i `stories.cyprokey` ve `stories.salih-defterali`
  cevirilerinin **hicbir dilde** olmadigini ortaya cikardi (bu sayfalar en/ru'da Turkce
  gorunuyordu). 3 dilde de eklendi — artik 0 eksik ceviri.
- `supabase/` dizini kaldirildi (hic kullanilmamisti, git gecmisinde duruyor)
- Build: 506 statik sayfa, 0 tip hatasi, 0 lint hatasi

### Sprint 3 tamamlandi (2026-07-29) — Auth + admin iskeleti

- **Auth.js v5 + Credentials**: `src/lib/auth/` — edge-guvenli config (middleware) ile
  Node-runtime config (bcrypt + DB) ayrilmis. JWT session, 8 saat.
- **Middleware guvenlik acigi kapatildi**: eski matcher `['/', '/(tr|en|ru)/:path*']`
  `/admin`'i kapsamiyordu. Yeni matcher tum yollari kapsiyor; `/admin/*` auth guard'a,
  digerleri next-intl'e gidiyor. Yonlendirme `authorized` callback'ine birakilmadi —
  callback var olmayan alt yollarda 404 donduruyordu, guard acikca middleware icinde.
- **Kaba kuvvet korumasi**: 15 dk / 5 deneme (`src/lib/auth/rate-limit.ts`, bellek ici)
- **Timing sizintisi kapali**: kullanici yoksa da bcrypt karsilastirmasi yapiliyor
- **Panel**: `/admin/login` + `/admin` (dashboard). Sidebar, ceviri sagligi tablosu,
  okunmamis mesaj sayaci, son islemler. `/admin` tek dilli (Türkçe), `[locale]` disinda.
- **Denetim kaydi**: `src/lib/audit.ts` — `recordAudit`, `computeDiff`, `recentAudit`
- **`pnpm admin:create`**: admin kullanicisi olusturma/sifre guncelleme script'i
- Dogrulandi: `/admin`, `/admin/projects`, `/admin/rastgele` dahil tum yollar
  oturumsuz `/admin/login`'e 307 donuyor; public site etkilenmedi.

**Siradaki**: Sprint 4 — proje/hizmet CRUD, ceviri sekmeleri, Vercel Blob medya
yukleme, iletisim formu + lead kutusu.

> Her yeni session'da `piton-tasks/task-index.md` oku veya `/cold-start` calistir.

---

## Workspace

```
src/
├── app/              → Next.js App Router (pages, layouts, API routes)
├── components/       → React componentleri
│   ├── ui/           → shadcn/ui + genel UI
│   ├── video/        → Video player, grid, lightbox
│   └── layout/       → Header, footer, navigation
├── lib/              → Utility fonksiyonlar
│   ├── supabase/     → Supabase client + helpers
│   └── utils/        → Genel yardimcilar
├── hooks/            → Custom React hooks
├── types/            → TypeScript type definitions
└── styles/           → Global stiller
public/
├── videos/           → Video dosyalari (dev)
└── images/           → Statik gorseller
```

## Temel Komutlar

```bash
pnpm dev                    # Dev server (localhost:3000)
pnpm build                  # Production build
pnpm start                  # Production server
pnpm lint                   # ESLint
pnpm typecheck              # TypeScript check
```

---

## Code Conventions (Kisa)

- **TypeScript**: strict, `any` yasak
- **Dosya**: `kebab-case`, `.tsx` componentler, `.ts` utilities
- **Component**: Server Components default, `'use client'` sadece gerekince
- **Video**: Lazy loading, intersection observer, Supabase Storage CDN
- **Commit**: `feat(TASK-XXX): aciklama` + `Co-Authored-By: Claude <noreply@anthropic.com>`

Detaylar → `piton-config/conventions.md`

## Parallel Agent Orchestration

Birden fazla sub-agent paralel calistirilirken:
- Her agent sadece kendi modul dizininde dosya duzenler (dizin izolasyonu)
- Paket kurulumu sadece ana agent (orchestrator) tarafindan yapilir
- Paylasilan dosyalarda retry pattern uygulanir
- Bagimli task'lar sirali, bagimsiz olanlar paralel calistirilir

Detaylar → `piton-config/agent-instructions.md`

---

## Referans Dizinleri

| Dizin | Icerik |
|-------|--------|
| `piton-tasks/` | Task takip — dashboard + tum task'lar |
| `piton-tasks/task-index.md` | Master task listesi |
| `piton-tasks/phases/` | Phase bazli detayli task aciklamalari |
| `piton-tasks/active/session-notes.md` | Session notlari |
| `piton-config/workflow.md` | Task workflow kurallari |
| `piton-config/conventions.md` | Kod standartlari |
| `piton-config/tech-stack.md` | Teknolojiler + versiyonlar |
| `piton-config/agent-instructions.md` | Sub-agent sorumluluklari |
| `piton-docs/MEMORY.md` | Kalici hafiza |
| `piton-docs/CHANGELOG.md` | Degisiklik kaydi |
| `piton-plans/` | Uygulama planlari |

---

## Hooks (Otomatik Kurallar)

| Hook | Tetikleyici | Ne yapar |
|------|------------|----------|
| `protect-files.sh` | PreToolUse (Edit/Write) | .env, lock files, .git/ duzenlemeyi bloklar |

---

## Notlar

- Hafiza dosyasi `piton-docs/MEMORY.md`'de — her session'da oku, gerektiginde guncelle
- Gorseller `public/assets/` altinda; `optimized/` gitignore'da (buyuk dosyalar)
- 2026-07-28: `videos/` klasoru (289MB, 17 dosya) silindi — kodda hicbir referansi yoktu,
  site screenshot tabanli calisiyor
