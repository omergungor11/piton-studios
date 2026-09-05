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

**Progress**: 50/50 task (%100) — son is TASK-051 (SSS sayfasi), 2026-08-14.

> `piton-tasks/task-index.md` Phase 0-1'de **yanlis COMPLETED** isaretli tasklar iceriyordu
> (Supabase kurulumu, video pipeline, admin CRUD API'leri). Hicbiri uygulanmamisti;
> `NEVER_DONE` olarak duzeltildi. Yeniden yapilmasi planlanmiyor.

- **49 proje** WORKS array'inde — freelancer klasöründen 13 + 5 canlı self-development (FurCRM slider #2, canlı linkler `url` alanıyla) + Work-Restored taramasından 5; nexos-investment mükerrer girdisi silindi. 2026-07-27: tüm kulüp/nightlife projeleri kaldırıldı (WORKS'ten 10, STORIES'ten 5 — detay: piton-docs/MEMORY.md). 2026-07-29: 7 proje daha kaldırıldı (lider-emlak, gemini-tracker, ai-dating-app, manager-oto-servis, sevgili-yogurt, osyb-hap, avie-global) — `n` alanları 01–49 olarak yeniden numaralandı. İlk 6 proje slider'da
- **Case study'ler güçlendirildi**: Nexos (flagship full-stack anlatım), Ambalaj Cini (%30 büyüme), Sammys (özel rezervasyon), Radyo Juke (özel entegrasyon)
- **Saiber ortaklığı**: 18 projede `collaborator: "Saiber"` — detay sayfasında "İş Birliği" metası olarak görünüyor (liste: piton-docs/MEMORY.md)
- **Anasayfa**: Hero → Spark CTA → Manifesto → Services → Process → Projects → About → Contact (8 scene)
- **Anasayfa Projeler sahnesi = 3B proje bulutu** (2026-09-04): `src/components/projects-v2/project-cloud-section.tsx`
  (React Three Fiber, scroll-driven helis, 7 secili proje — 2026-09-05'te 15'ten indirildi). Secim listesi + server veri yardimcisi
  `src/lib/project-cloud.ts`, metinler `messages/*.json` → `projectCloud`. Sahne `.scene--cloud`
  ile `.inner` sarmalayicisiz render edilir (sticky stage reveal transform'undan etkilenmesin).
  Eski slider `scenes/works.tsx` artik kullanilmiyor (yalnizca `PreviewCard` export'u duruyor).
  `/projeler-v2` rotasi ayni bileseni tam sayfa gosteren **dev-only** prototip (prod 404, noindex).
- **Nav**: Anasayfa `chrome.tsx`, ic sayfalar `page-shell.tsx` — **iki ayri component**, nav
  icerikleri elle esitleniyor. Menuye link eklerken ikisini birden guncelleyin (masaustu nav +
  mobil menu dizisi). 2026-08-08: Blog linki yalnizca `page-shell.tsx`'te vardi, `chrome.tsx`'e
  eklendi
- **Videolar**: YOK — `videos/` (289 MB) 2026-07-28'de silindi, kodda tek referansi yoktu
- **Proje detay hero**: Screenshot IS the hero — Desktop/Mobile toggle hero icinde sag ust
- **Projeler sayfasi**: `pp-showcase` yatay screenshot seridi (toggle'li, kareler oranli)
- **Blog**: MDX tabanli, `content/blog/{tr,en,ru}/*.mdx` — liste, yazi, etiket sayfalari + RSS.
  8 yazi × 3 dil. Yazi sayfasinda otomatik icindekiler tablosu (`blog-toc.tsx`), frontmatter
  `faq` alani (SSS bolumu + FAQPage JSON-LD) ve MDX component'leri var:
  `BarChart`, `TrendChart`, `StatGrid`, `Callout`, `KeyTakeaways`
  (`src/components/mdx/mdx-components.tsx`).
  > MDXRemote'ta `blockJS: false` **zorunlu** — varsayilan `true`, MDX icindeki tum JS
  > ifadelerini siler ve component prop'lari `undefined` gelir
- **SSS sayfasi** (2026-08-14): `/sss` · `/en/faq` · `/ru/faq` — 12 kategori, **75 soru × 3 dil**.
  Yapi `src/lib/faq.ts` (kategoriler + kalici soru id'leri + ilgili hizmet/blog baglantilari),
  metinler `messages/*.json` → `faqItems`. Plan: `piton-plans/faq-page-plan.md`
  > **Soru id'leri kalici anchor'dir** (`#faq-{id}`) — soru silinmedikce id degistirilmez.
  > Yeni soru eklerken: `faq.ts`'e girdi + 3 dilde `faqItems.<id>` + `pnpm content:check`.
  >
  > **GEO kurallari** (bozmayin): cevabin ilk paragrafi (`a`) soruyu 40-60 kelimede
  > dogrudan yanitlar; cevaplar native `<details>` icinde **kapaliyken de DOM'da** durur
  > (kosullu render yasak); arama eslesmeyeni silmez, `hidden` verir.
  >
  > JSON-LD: FAQPage + WebPage(`speakable`) + BreadcrumbList + Organization.
  > `/llms.txt` (llmstxt.org bicimi) ve `robots.ts`'teki 14 AI crawler izni de bu isin parcasi.
- **Ceviriler**: 210/210 eksiksiz (works 49, stories 6, servicesList 15 × 3 dil).
  `pnpm content:check` ile dogrulanir — **her yeni icerikten sonra calistirin**, eksik varsa exit 1.
- **Bekleyen (kullanici tarafinda)**: `NEXT_PUBLIC_SITE_URL` ve `RESEND_API_KEY` Vercel'e eklenmeli.
  Resend hesabi `pitonstudios@gmail.com` ile acilmali. Ayrica proje tarihleri duzeltilecek.

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

### Icerik uretimi tamamlandi (2026-08-08) — Session 10

Blog 2 yazidan **8 yaziya** cikti (× 3 dil = 24 MDX). Uretilen yazilar:
`seo-to-geo`, `website-cost`, `ai-automation-roi`, `nextjs-vs-wordpress`,
`multilingual-site`, `ecommerce-cro`.

Altyapi tarafinda MDX grafik component'leri, otomatik icindekiler tablosu ve
frontmatter `faq` → FAQPage JSON-LD eklendi (detay yukarida "Blog" maddesinde).
Icerik ici 81 ic link sitemap'e karsi dogrulandi. Statik sayfa 476 → 525.

> **Yeni yazi eklerken**: `translationKey` zorunlu, TOC otomatik (elle yazmayin),
> `faq` opsiyonel ama SSS bolumu + JSON-LD uretir. Grafiklerde `max` degeri veriden
> kucuk olamaz (component kelepceliyor ama veriyi dogru vermek yine de gerekir).
> Yazilardaki sayilar **senaryo modeli / gosterge banti** olarak isaretli.
>
> **Fiyatlandirma (2026-08-08 guncellendi)**: TR yazilari **TL**, en/ru yazilari **euro**
> gosterir; donusum **1 € = 45 ₺**. Bantlar: sablon/WordPress tanitim 10.000-30.000 ₺,
> ozel tasarim kurumsal 35.000-120.000 ₺, e-ticaret 40.000-200.000 ₺, ozel web uygulamasi
> 150.000 ₺+. AI otomasyon ROI senaryosu 250 ₺/saat is gucu maliyeti + 70.000 ₺ kurulum
> uzerine kurulu. Fiyat degisirse **5 yazi × 3 dil** birlikte guncellenmeli:
> maliyet, ai-otomasyon-roi, nextjs-vs-wordpress, cok-dilli-site, e-ticaret-cro.
>
> ⚠️ OG gorselleri Satori ile uretiliyor ve **`₺` glifi dinamik fontta yok** — frontmatter
> `description` alaninda `₺` kullanmayin, "TL" yazin (gövde metninde `₺` sorunsuz).

## Mimari — guncel

Site **tamamen statik**. Veritabani yok, auth yok, panel yok.
- Icerik: `src/lib/data.ts` + `src/messages/{tr,en,ru}.json` (elle duzenlenir)
- Blog: `content/blog/{tr,en,ru}/*.mdx`
- Gorseller: `public/assets/` (repoda; harici depolama yok)
- Tek dinamik parca: iletisim formu → `/api/contact` → Resend e-posta

Harici bagimliliklar: Vercel (deploy + analytics) ve Resend. Baska yok.

### Iletisim formu (2026-07-29)

**Onceki hali sahteydi**: `contact.tsx` 1.2 sn bekleyip "✓ Gonderildi" yaziyordu,
hicbir yere hicbir sey gondermiyordu. Ziyaretci ulastigini saniyordu.

Simdi `/api/contact` (nodejs runtime):
- zod dogrulama, bal kupu (honeypot), IP basina 10 dk / 3 gonderim
- Hiz siniri dogrulamadan SONRA sayilir — e-postasini yanlis yazan kullanici kilitlenmesin
- Bal kupu dolu ise 200 ok:true doner ama e-posta gonderilmez (bota sinyal verilmez)
- Bildirim `pitonstudios@gmail.com` adresine, `replyTo` gonderenin adresi
- `RESEND_API_KEY` yoksa **acik hata** doner ve kullaniciya dogrudan e-posta adresi
  gosterilir — sessizce yutulmaz

**Ziyaretciye otomatik yanit** yalnizca `CONTACT_FROM_EMAIL` ayarliysa gonderilir.
Resend'te dogrulanmis alan adi olmadan `onboarding@resend.dev` SADECE Resend hesabinin
sahibine gonderebilir; bu yuzden Resend hesabi `pitonstudios@gmail.com` ile acilmali.

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
