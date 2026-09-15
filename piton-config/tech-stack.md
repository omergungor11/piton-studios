# Tech Stack — Piton Studios

> Guncel durum (2026-09-15). Site tamamen statiktir; veritabani, auth ve harici depolama yoktur.
> Supabase planlanmis ama hic baglanmamisti — kodda, bagimliliklarda ve dokumanlarda kaldirildi.

## Runtime
- Node.js 20 LTS
- Package manager: pnpm

## Frontend
- Framework: Next.js (App Router, Turbopack)
- Language: TypeScript (strict)
- i18n: next-intl (tr / en / ru)
- Stil: `src/app/globals.css` (ozel CSS, tema degiskenleri)
- 3B: React Three Fiber (anasayfa proje bulutu)
- Blog / hukuki metinler: MDX (`next-mdx-remote`)

## Icerik
- Projeler, hizmetler: `src/lib/data.ts` + `src/messages/*.json`
- Sektor / sehir / cozum sayfalari: `src/lib/{sectors,locations,solutions}.ts` + mesajlar
- Gorseller: `public/assets/` (repoda)

## Dinamik parca
- Iletisim formu: `/api/contact` → Resend (e-posta)

## Altyapi
- Hosting: Vercel (main'den otomatik deploy)
- Domain: www.pitonstudios.com
- Analytics: Vercel Analytics + Speed Insights (cerezsiz)

## Gelistirme
- ESLint, TypeScript strict
- `pnpm content:check` — ceviri butunlugu
