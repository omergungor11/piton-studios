# Pixel Ninja - Project Memory

## Project Info
- Pixel Ninja firmasinin video portfolyo websitesi. Video-agirlikli, hizli yuklenen modern portfolyo.

## Tech Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Supabase (DB + Storage + Auth)
- Vercel (hosting + CDN)
- pnpm (package manager)

## Project Status
- **Phase 0**: IN PROGRESS — Project setup
- **Phase 1**: PENDING — Core infrastructure (Supabase, video pipeline)
- **Phase 2**: PENDING — Frontend / UI (tasarimdan implementation)

## Key Technical Decisions
- Supabase Storage for video hosting (CDN, no self-hosted media server)
- Next.js App Router with Server Components default (performance)
- No monorepo — single Next.js package (portfolio site complexity doesn't warrant it)
- Videos stored locally in dev, Supabase Storage in production

## Important Patterns
- Video lazy loading with Intersection Observer
- Poster/thumbnail images for video previews (don't autoplay all)
- `preload="none"` on videos below fold

## Known Issues / Gotchas
- 17 video files (~300MB total) in `videos/` — too large for git, need Supabase Storage
- Video dosya isimleri Turkce karakterli — rename gerekebilir
- Tasarim linki (Claude Design) 404 donuyor — kullanicidan tekrar istenmeli

## Working Credentials (Dev)
- Supabase: [setup edilecek]
