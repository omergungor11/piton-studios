# Changelog

## 2026-07-16 (4)

### Fixed
- **ru.json translation debt cleared**: added the 11 long-missing Russian works entries (alert-muhendislik, beton-store, crazy-girl, kibris-katalog, misse, virginia, faraon, welcome-pickups, mindloop, dental-health, securify) — all 66 projects now complete in tr/en/ru
- Removed duplicate `nexos-investment` entry (two entries shared one slug; kept the one with previews)

### Changed
- **4 case studies strengthened** with the freelancer pack's stronger narratives: Nexos (flagship full-stack — maps, i18n, automated PDF/PPT proposals, E2E), Ambalaj Cini (30% growth via Google Ads + Meta), Sammys Hotel (custom-coded reservation system), Radyo Juke (custom streaming integration)
- Re-added `avie-global` (orphan translation had survived an old data removal) with Saiber attribution per the WordPress rule — awaiting user confirmation

## 2026-07-16 (3)

### Added
- **5 live self-development projects** with real desktop+mobile screenshots and live links: FurCRM (furniture CRM — featured, slider #2), Lithos, Vanguard, Jack — 3D Creator, Veldara. New `url` field on Work type renders a "Canlı Site" meta link on detail pages; Mindloop also got its live URL
- **5 projects found in the Work-Restored scan** (WORKS 61 → 66): Manager (multi-tenant auto-service CRM SaaS), Emlak Sync (multi-portal listing sync), Sevgili Yoğurt (dairy PWA), Dolmuş Güzergah Kontrol (GPS route-compliance automation), ÖSYB Hap (exam-prep platform) — full tr/en/ru translations
- Work-Restored folders verified as already covered or deliberately excluded: baykan-night-club (= Miracle), mehmet-missme (= Misse), seytan-ibo (= Gece Kıbrıs), kktc-gece-hayati (= Kıbrıs Gece Hayatı), baykan taxi (= Kıbrıs Lefkoşa Taksi); excluded: Hermes (empty), aeo-factory/ctools (internal tools), thunderbolt/uda-ozel/aii002/com333/irmak/aii003 (coursework & docs), zadi-test-website, cs2-market, traify/gstack, lefke-belediyesi (never built)

## 2026-07-16 (2)

### Added
- **13 new portfolio projects** from the freelancer content pack (WORKS 43 → 56): Lider Emlak, Ödeme Takip Botu (Telegram automation), 6 AI/ML R&D projects (Deprem Erken Uyarı, Araç Takip, Trafik Levha Okuma, Yüz Duygu Analizi, Hava Görüntüsü Segmentasyonu, Füze Güdüm Görselleştirme) and 5 SaaS prototypes (ContentFlow AI, Social Pro, Holly Trader, AI Dating App, Gemini Tracker) — AI/SaaS entries honestly framed as R&D/prototypes; full tr/en/ru translations included
- **Saiber partnership attribution**: `collaborator: "Saiber"` on 19 projects (Velis, Pampas, EKH Yapı, Radyo Juke, Özge Özler, RNV, Pinnacle, Jet Transfer, Boon Fresh, Halas Exchange, Arslan ×3, Homes in Mediterranean, Sammys, All Pro, Alert Müh., Virginia, Lider Emlak) — shown as "İş Birliği" meta on project detail pages; Saiber is the agency formerly known as Media King

### Removed
- Lefke Belediyesi entry (added earlier today from the content pack, then removed — project was never actually built)

### Not added (deliberate)
- CS2-Market (gambling category), Traify/GStack (vague prototype), Baykan Next.js taxi build (possible duplicate of existing entry)

## 2026-07-16

### Fixed (mobile UX, follow-up)
- About code panel overflowed narrow screens: `aspect-ratio + max-height` transferred width from height (400px); replaced with fixed 280px height so width follows the container
- Featured projects swipe didn't work on real devices (browser claimed the gesture as page scroll): replaced manual touch handlers with framer-motion `drag="x"` + `touch-action: pan-y`, with post-drag click suppression on inner links
- Page-footer partner badges stacked on phones: ≤640px falls back to a single centered icon-only row (names remain as tooltips)
- Project detail prev/next nav stacked vertically ≤600px: explicit grid placement puts prev+next side by side with the view-all button centered below; `projectDetail.viewAll` shortened ("Tümünü gör ↗" / "View all ↗")

### Changed (mobile UX)
- Services scene: mobile now lists 5 core services (web-app, automation, ai-integration, google-ads, cloud-ecosystem) with a "Tüm Hizmetler" button linking to `/services`; desktop unchanged
- Hero: moved inline h1 styles to CSS; mobile line-height raised to 1.08 so "STUDIOS" no longer overlaps "PITON" when the title wraps
- Featured projects slider: added touch swipe navigation (left/right) with vertical-scroll guard
- About code panel: mobile aspect ratio 9/16 → 4/3 with 300px max height (was far too tall)
- Partner badges: on mobile, Google+Meta and Vercel+Supabase+Anthropic now sit side by side (group label stacked above, smaller badges, nowrap)
- Contact: Mail promoted to an action button next to Call (WhatsApp full-width on mobile); social icons moved to their own row below
- New i18n keys in tr/en/ru: `services.viewAll`, `contact.mail`

### Fixed
- Added missing `works` translation entries (title/summary/body) for 11 project slugs in `tr.json` and `en.json` — previously these fell back to `data.ts` raw fields, leaking English summaries into Turkish pages and Turkish body text into English pages

## 2026-07-06

### Added
- 3 new portfolio projects: Mindloop (personal 3D interactive site), Dental Health (healthcare clinic), Securify (SaaS security landing page)
- Desktop/mobile WebP previews for all 3 new projects (`public/assets/previews/`)

## 2026-06-27

### Changed
- **Rebrand: Pixel Ninja → Piton Studios** across all content, locales (EN/TR/RU), components, package name, emails/domains/socials, and the project folder
- Renamed meta directories `ninja-*` → `piton-*`
- Hero rewritten around the new name (ninja wordplay dropped)

### Added
- New brand logo (tech-globe `public/logo.webp`) used as favicon, header/footer mark, and hero feature
- Replaced ninja-silhouette favicon (`icon.svg`) with `icon.png` + `apple-icon.png`

## 2026-04-19

### Added
- Project scaffold with Claude Code workflow (piton-* meta directories)
- CLAUDE.md master configuration for Piton Studios
- Task tracking system (Phase 0-2 planned)
- Slash commands (cold-start, git-full, turn-off, local-testing)
- protect-files.sh hook for sensitive file protection
