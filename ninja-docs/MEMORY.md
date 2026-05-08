# Pixel Ninja - Project Memory

## Project Info
- Pixel Ninja firmasinin video portfolyo websitesi. Video-agirlikli, hizli yuklenen modern portfolyo.

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

## Important Patterns
- Video lazy loading with Intersection Observer
- Poster/thumbnail images for video previews (don't autoplay all)
- `preload="none"` on videos below fold
- `media.ts` helper ile videoUrl() — Supabase CDN URL olusturma

## Known Issues / Pending Work
- Admin panel auth yok (Supabase Auth ile korunmali)
- Contact form backend entegrasyonu (Supabase insert)
- SEO meta tags eksik (og:image, og:video, twitter cards)
- Custom domain baglanmamis
- Vercel env vars dogrulanmali
- Canli sitede video yukleme kontrolu yapilmali
