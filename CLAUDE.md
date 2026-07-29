# Piton Studios

## Proje

Piton Studios firmasinin dijital ajans / portfolyo websitesi. Proje screenshot'lari ve case study'ler
uzerine kurulu, 3 dilli (tr/en/ru), hizli yuklenen modern bir portfolyo sitesi.

- **GitHub**: https://github.com/omergungor11/piton-studios
- **Deploy**: Vercel
- **Database**: Yok — site tamamen statik

> Not: Hicbir veritabani veya harici depolama kullanilmiyor. Supabase hic baglanmadi,
> Neon ve Vercel Blob degerlendirilip vazgecildi (gerekce: `piton-plans/`).

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

### Sprint 2 GERI ALINDI (2026-07-29) — Neon kullanilmayacak

Panel kurulmayinca Neon'un tek mesru kullanimi iletisim formu lead'leri kaliyordu;
onlar da Resend ile dogrudan e-postaya gidecek. Ikinci bir depo bakim yuku olusturmuyor.

Kaldirilanlar: `src/lib/db/`, `src/lib/content/`, `drizzle/`, `drizzle.config.ts`,
`scripts/migrate-content.ts`, `scripts/export-content.ts`,
drizzle-orm / drizzle-kit / @neondatabase/serverless bagimliliklari.
Kod git gecmisinde `61b0d2a` commit'inde duruyor.

**Korunan**: `pnpm content:check` → `scripts/check-translations.ts`.
Artik tamamen statik calisiyor (data.ts + messages/*.json). Iki eksik story
cevirisini bulan seydi; yeni icerik ekledikten sonra calistirin.
Eksik ceviri varsa 1 ile cikar — CI'a baglanabilir.

### Gorsel hatasi duzeltildi (2026-07-29)

`public/assets/optimized/` gitignore'daydi ve `src/lib/media.ts` oraya isaret ediyordu.
10 dosya (876 KB) repoya hic girmiyordu; **62 proje sayfasinin 35'i** production'da
hero gorseli olmadan yayindaydi (29 preview'siz work + 6 story), ayrica /projeler
hero arka plani, reel ve case-study sahneleri.

Cozum: dosyalar repoya alindi. Blob bu olcek icin (876 KB) gereksiz karmasiklik olurdu;
Blob store'undan da vazgecildi (2026-07-29) — kodda hic kullanilmamisti.
Gorseller repoda tutuluyor.

## Mimari — guncel

Site **tamamen statik**. Veritabani yok, auth yok, panel yok.
- Icerik: `src/lib/data.ts` + `src/messages/{tr,en,ru}.json` (elle duzenlenir)
- Blog: `content/blog/{tr,en,ru}/*.mdx`
- Gorseller: `public/assets/` (repoda; harici depolama yok)
- Tek dinamik parca (planlanan): iletisim formu → Resend e-posta

Harici bagimliliklar: Vercel (deploy + analytics) ve ileride Resend. Baska yok.

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
