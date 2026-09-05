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

## Projects V2 → Anasayfa entegrasyonu (2026-09-04, gece)
- Proje bulutu anasayfadaki "Projeler" sahnesinde canli (`ProjectCloudSection variant="home"`).
  Eski 6'li slider kullanilmiyor. `/projeler-v2` rotasi dev-only kaldi; oradaki guard'a
  dokunulmadi (nav/sitemap'te yok).
- Anasayfa `.scene` blok konteynerinde `section` 0px genislik olcuyordu — `.track`
  `width: 100%` zorunlu; kaldirmayin.
- Alt chrome (tag-avail + scene-indicator) ile cakisma `--cloud-hud-offset: 58px` ile
  cozuldu; mobilde HUD alt cubugun 8px ustunde.
- Bilinen, bu isle ilgisiz 404: `/models/logo.glb` (hero logo) — dosya repoda yok.

## Projects V2 Yerel Prototip (2026-09-04)
- Yerel rota: `/tr/projeler-v2` (`/en/projects-v2`, `/ru/projects-v2` esleri var).
- 15 gercek proje preview'i React Three Fiber sahnesinde iki kollu 3B spiral/helis
  uzerinde ilerliyor; scroll her projeyi sirayla foreground'a getiriyor.
- WebGL2 destekli mobil/dokunmatik cihazlarda optimize 3B spiral aktif; kompakt
  kamera/helis, sade atmosfer ve sabit `2x` Canvas render'i 390x844, 430x932 portre
  ile kisa-yatay telefon profillerine uyarlaniyor.
- Mobilde ilk dokunus projeyi odakliyor, ayni projeye ikinci dokunus detay sayfasini
  aciyor. `prefers-reduced-motion`, Save-Data, WebGL2 yoklugu veya context failure
  durumunda HTML/CSS yatay proje seridi kullaniliyor.
- Rota nav/sitemap'te yok, `noindex, nofollow`; production'da bilerek 404. Kullanici
  onayi gelmeden guard kaldirilmayacak, commit/push/deploy yapilmayacak.
- Sahne, `public/assets/previews/desktop/` icindeki 1440x810 ve
  `public/assets/previews/mobile/` icindeki 430x928 kaynaklari kullaniyor; plan
  `piton-plans/projects-v2-interactive-portfolio-plan.md`.

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
- WORKS'te `collaborator: "Saiber"` olan 18 proje: velis-ltd, pampas-investment, ekh-yapi, radyo-juke, ozge-ozler, rnv-trading, pinnacle-yatirim, jet-transfer-cyprus, boon-fresh, halas-exchange, arslan-estates, arslan-coin-center, arslan-group, homes-in-mediterranean, sammys-hotel, all-pro-cyprus, alert-muhendislik, virginia-ice-cream
  (lider-emlak ve avie-global 2026-07-29'da portfolyodan tamamen kaldirildi — avie-global'in Saiber atifi hic teyit edilmedi)
- Lefke Belediyesi HIC YAPILMADI — freelancer dokumaninda listelense de siteye EKLENMEYECEK (kullanici 2026-07-16'da kaldirtti)
- Bagimsiz (collaborator YOK): nexos-investment, bt-elevator, gel-gez-gor, alp-sigorta, beton-store, ambalaj-cini, taksi & transfer siteleri (jet-transfer haric), tum AI/SaaS isleri
- Kulup/nightlife siteleri 2026-07-27'de KALDIRILDI (kullanici istegi — portfolyoda listelenmesinler): WORKS'ten 10 (night-club-katalog, kibris-gece-hayati, gece-kibris, prenses/miracle/misse/crazy-girl-night-club, kibris-nights-club, kibris-katalog, faraon-night-clubs), STORIES'ten 5 (kibris-night-club, miracle-night-club, fareon-night-club, ibo-seytan, kibris-gece-hayati). Ceviriler de silindi; preview webp'leri assets'te duruyor
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
