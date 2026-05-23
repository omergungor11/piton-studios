# Pixel Ninja

## Proje

Pixel Ninja firmasinin video portfolyo websitesi. Video tabanli sunumlari sergileyen, hizli yuklenme ve akici video deneyimi sunan modern bir portfolyo sitesi.

- **GitHub**: [repo URL]
- **Deploy**: Vercel
- **Database**: Supabase

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

- **32 proje** WORKS array'inde, ilk 6'si anasayfa slider'da
- **Anasayfa**: Hero → Note → Services → Projects → About → Contact
- **Nav**: Unified chrome (anasayfa + ic sayfalar ayni nav)
- **Videolar**: Local fallback aktif (Supabase CDN dev'de devre disi)
- **Bekleyen**: Proje tarihleri duzeltilecek, mockup gorselleri eklenecek

> Her yeni session'da `ninja-tasks/task-index.md` oku veya `/cold-start` calistir.

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

Detaylar → `ninja-config/conventions.md`

## Parallel Agent Orchestration

Birden fazla sub-agent paralel calistirilirken:
- Her agent sadece kendi modul dizininde dosya duzenler (dizin izolasyonu)
- Paket kurulumu sadece ana agent (orchestrator) tarafindan yapilir
- Paylasilan dosyalarda retry pattern uygulanir
- Bagimli task'lar sirali, bagimsiz olanlar paralel calistirilir

Detaylar → `ninja-config/agent-instructions.md`

---

## Referans Dizinleri

| Dizin | Icerik |
|-------|--------|
| `ninja-tasks/` | Task takip — dashboard + tum task'lar |
| `ninja-tasks/task-index.md` | Master task listesi |
| `ninja-tasks/phases/` | Phase bazli detayli task aciklamalari |
| `ninja-tasks/active/session-notes.md` | Session notlari |
| `ninja-config/workflow.md` | Task workflow kurallari |
| `ninja-config/conventions.md` | Kod standartlari |
| `ninja-config/tech-stack.md` | Teknolojiler + versiyonlar |
| `ninja-config/agent-instructions.md` | Sub-agent sorumluluklari |
| `ninja-docs/MEMORY.md` | Kalici hafiza |
| `ninja-docs/CHANGELOG.md` | Degisiklik kaydi |
| `ninja-plans/` | Uygulama planlari |

---

## Hooks (Otomatik Kurallar)

| Hook | Tetikleyici | Ne yapar |
|------|------------|----------|
| `protect-files.sh` | PreToolUse (Edit/Write) | .env, lock files, .git/ duzenlemeyi bloklar |

---

## Notlar

- Hafiza dosyasi `ninja-docs/MEMORY.md`'de — her session'da oku, gerektiginde guncelle
- Videolar `videos/` klasorunde (local dev), production'da Supabase Storage
- Vercel deploy icin `next.config.ts` video optimizasyonlari kritik
