# Code Conventions — Piton Studios

## TypeScript
- Strict mode always enabled
- No `any` types (use `unknown` + type guards)
- Interfaces for object shapes, types for unions/intersections
- Explicit return types on exported functions

## File Naming
- `kebab-case` for all files
- `.tsx` for React components
- `.ts` for utilities, hooks, types
- Colocate tests as `*.test.ts(x)`

## Next.js App Router
- Server Components by default
- `'use client'` only when needed (event handlers, hooks, browser APIs)
- Layout.tsx for shared layouts, loading.tsx for suspense
- API routes in `app/api/` — RESTful pattern
- Use `next/image` for images, custom component for video
- Metadata API for SEO (generateMetadata)

## Media
- Site screenshot tabanli; video yok (2026-07-28'de kaldirildi)
- Gorseller `public/assets/` altinda, `next/image` ile
- Veritabani / harici depolama yok (Supabase hic baglanmadi, kaldirildi)

## Styling
- Tailwind CSS utility-first
- `cn()` helper for conditional classes (clsx + tailwind-merge)
- CSS variables for theme colors
- Mobile-first responsive design

## Performance
- Static generation (SSG) where possible
- Dynamic imports for heavy components
- Image optimization with next/image
- Bundle analysis before deploy

## API Design
- Tek API rotasi: `/api/contact` (zod dogrulama + Resend)
- Response format: `{ ok: true }` / `{ ok: false, error }`
