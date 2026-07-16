# Piton Studios - Project Memory

## Project Info
- Piton Studios firmasinin video portfolyo websitesi. Video-agirlikli, hizli yuklenen modern portfolyo.

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (DB + Storage + Auth)
- Vercel (hosting + CDN)
- pnpm (package manager)
- Framer Motion (scroll animations)
- Three.js (3D particle scene)

## Project Status
- **Phase 0**: COMPLETED — Project setup (7/7)
- **Phase 1**: COMPLETED — Core infrastructure (8/8)
- **Phase 2**: COMPLETED — Frontend / UI (6/6)
- **Overall**: 21/21 tasks (%100)
- **Deploy**: Vercel aktif, Supabase Storage CDN uzerinden video servis

## Key Technical Decisions
- Supabase Storage for video hosting (CDN, no self-hosted media server)
- Next.js App Router with Server Components default (performance)
- No monorepo — single Next.js package (portfolio site complexity doesn't warrant it)
- Videos: Supabase Storage CDN (production), local dev icin public/videos/
- Video optimization: ffmpeg pipeline (183MB → 13MB, %93 compression)
- next-intl config: ./i18n/request.ts (Vercel uyumluluk icin tasinmis)

## Saiber Ortakligi (proje atiflari)
- Saiber = Kibris merkezli ajans, eski adi Media King. WordPress tabanli islerin cogu Saiber ortakliginda teslim edildi.
- Kaynak dogrulugu: `/Users/arlec/Work-Restored/freelancer/02-projeler-case-study.md` (ajans notu) — atif sorularinda oraya bak.
- WORKS'te `collaborator: "Saiber"` olan 20 proje: velis-ltd, pampas-investment, ekh-yapi, radyo-juke, ozge-ozler, rnv-trading, pinnacle-yatirim, jet-transfer-cyprus, boon-fresh, halas-exchange, arslan-estates, arslan-coin-center, arslan-group, homes-in-mediterranean, sammys-hotel, all-pro-cyprus, alert-muhendislik, virginia-ice-cream, lider-emlak, avie-global (avie-global: WP kurali geregi eklendi, kullanici teyidi bekliyor)
- Lefke Belediyesi HIC YAPILMADI — freelancer dokumaninda listelense de siteye EKLENMEYECEK (kullanici 2026-07-16'da kaldirtti)
- Bagimsiz (collaborator YOK): nexos-investment, bt-elevator, gel-gez-gor, alp-sigorta, beton-store, ambalaj-cini, tum kulup/nightlife siteleri (night-club-katalog dahil), taksi & transfer siteleri (jet-transfer haric), tum AI/SaaS isleri
- Detay sayfasinda "Is Birligi" meta alani olarak gosteriliyor (`projectDetail.collab`)

## Canli Linkli Self-Development Projeleri (2026-07-16)
- Work tipine `url?: string` alani eklendi — detay sayfasinda "Canli Site → Siteyi ziyaret et" metasi olarak render ediliyor (`projectDetail.live/visit`)
- 5 canli proje eklendi (gercek ekran goruntuleriyle): fur-crm (one cikan slider #2 — mobilya CRM/cari/bayi sistemi), lithos, vanguard, jack-portfolio, veldara
- mindloop'a da canli url eklendi: mindloop-landing-page-phi.vercel.app
- fur-crm.vercel.app backend'i o gun veri vermiyordu — ekran goruntusu hata bandi gizlenerek alindi; backend duzelirse yeniden cekilebilir

## Important Patterns
- Video lazy loading with Intersection Observer
- Poster/thumbnail images for video previews (don't autoplay all)
- `preload="none"` on videos below fold
- `media.ts` helper ile videoUrl() — Supabase CDN URL olusturma

## Current State (Session 4 — 2026-05-24)
- 32 proje (WORKS), ilk 6'si anasayfa slider'da
- Anasayfa: Hero → Note → Services → Projects → About → Contact
- Unified nav (chrome) anasayfa ve ic sayfalar icin
- Videolar local fallback'ten servis ediliyor (media.ts)
- Stories section anasayfa ve projeler sayfasindan kaldirildi
- Hizmet ve manifesto kutulari JS ile esit yukseklikte

## Known Issues / Pending Work
- Proje tarihleri duzeltilecek (kullanicidan bilgi bekleniyor)
- Proje detay sayfalarina mockup gorselleri eklenecek
- Admin panel auth yok (Supabase Auth ile korunmali)
- Contact form backend entegrasyonu (Supabase insert)
- SEO meta tags eksik (og:image, og:video, twitter cards)
- Custom domain baglanmamis
- Vercel env vars dogrulanmali
- Canli sitede video yukleme kontrolu yapilmali
