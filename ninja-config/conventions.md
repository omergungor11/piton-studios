# Code Conventions — Pixel Ninja

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

## Video Handling
- Lazy load videos with Intersection Observer
- Use `<video>` with `preload="none"` or `preload="metadata"`
- Poster images (thumbnails) for initial display
- Supabase Storage CDN for production video serving
- Local `videos/` folder for development only
- Consider HLS/adaptive streaming for large files

## Supabase
- Client initialized in `src/lib/supabase/client.ts` (browser)
- Server client in `src/lib/supabase/server.ts` (server components/API)
- Type-safe queries with generated types
- Storage bucket: `videos` (public), `thumbnails` (public)

## Styling
- Tailwind CSS utility-first
- `cn()` helper for conditional classes (clsx + tailwind-merge)
- CSS variables for theme colors
- Mobile-first responsive design

## Performance
- Static generation (SSG) where possible
- Dynamic imports for heavy components
- Image optimization with next/image
- Video: lazy load + poster image + intersection observer
- Bundle analysis before deploy

## API Design
- Response format: `{ data, meta? }`
- Error format: `{ error: { statusCode, code, message } }`
- Use Supabase client directly where possible (skip API routes)
