# Tech Stack — Piton Studios

## Runtime
- Node.js 20 LTS
- Package manager: pnpm 9.x

## Frontend / Full-Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript 5.x (strict)
- Styling: Tailwind CSS 4.x
- UI Components: shadcn/ui (Radix primitives)
- Animation: Framer Motion 11.x (video transitions, scroll effects)
- State: React hooks (minimal state — mostly server-rendered)

## Backend / Data
- Database: Supabase (PostgreSQL managed)
- Storage: Supabase Storage (video files + thumbnails)
- Auth: Supabase Auth (admin panel icin, opsiyonel)
- ORM: Supabase JS client (type-safe queries)

## Video
- Format: MP4 (H.264)
- Thumbnails: Generated from video frames
- Delivery: Supabase Storage CDN
- Player: Custom React component (native <video>)

## Infrastructure
- Hosting: Vercel (auto-deploy from main)
- CDN: Vercel Edge Network + Supabase Storage CDN
- Domain: [TBD]
- Analytics: Vercel Analytics (opsiyonel)

## Development Tools
- Linter: ESLint (Next.js config)
- Formatter: Prettier
- Type checking: TypeScript strict
- Version control: Git + GitHub

## Testing (Phase 2+)
- Unit: Vitest
- E2E: Playwright (opsiyonel)
