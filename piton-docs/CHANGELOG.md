# Changelog

## 2026-08-08 (4)

### Added
- **Etki Paneli** (`src/components/impact-panel.tsx`) — projeler sayfasinda showreel'in
  altinda, musteri sonuclarini anlatan interaktif SVG grafik. Bes boyut (acilis hizi,
  arama gorunurlugu, talep donusumu, bakim yuku, cok dilli erisim); her boyutta
  "Piton ile" ve "tipik kurulum" egrileri, aralarindaki dolgulu alan kazanc bandi.
  Uc etkilesim katmani: boyut listesinde hover ile grafik degisimi (cizgi yeniden
  cizilir), grafik uzerinde imlecle tarama cizgisi + okuma paneli, panel genelinde
  imleci takip eden isik lekesi (CSS degiskeni, re-render yok).
  Mobilde boyut listesi yatay kaydirilabilir cipe donusur, eksen etiketleri buyutulur;
  dokunmatikte parmak kalkinca okunan deger ekranda kalir. 3 dilde metin, acik/koyu tema,
  `prefers-reduced-motion` destegi
- `impact` i18n namespace'i (tr/en/ru) + projeler sayfasinin `NAMESPACES` listesine eklendi

### Fixed
- **Showreel basliginda eksik kelime**: `reel.ppTitle` mesaji `{accent}` yer tutucusu
  kullaniyordu ama `t.rich()` bunu tag olarak tanimiyor — vurgu kelimesi ("kesitler" /
  "in motion" / "в движении") 3 dilde de hic render edilmiyordu ve her yuklemede
  "Functions are not valid as a React child" konsol hatasi veriyordu.
  `<accent>...</accent>` tag formuna cevrildi, artik kullanilmayan `ppTitleAccent`
  anahtari silindi

> Grafikteki rakamlar gosterge modeldir, olculmus musteri verisi degil — panelin altinda
> bu acikca yaziyor. Gercek olcum girildiginde `DIMENSIONS` dizisindeki `us`/`typical`
> dizileri guncellenmeli.

## 2026-08-08 (3)

### Changed
- **Blog fiyatlandirmasi gercek fiyat seviyesine cekildi** (5 yazi × 3 dil = 15 MDX).
  TR yazilari artik **TL**, en/ru yazilari **euro** gosteriyor; donusum 1 € = 45 ₺.
  Bantlar: sablon/WordPress tanitim 10.000-30.000 ₺, ozel tasarim kurumsal
  35.000-120.000 ₺, e-ticaret 40.000-200.000 ₺, ozel web uygulamasi 150.000 ₺+.
  Yillik isletme tablosu, 3 yillik TCO grafikleri ve Next.js/WordPress karsilastirmasi
  ayni olcekte yeniden yazildi
- **AI otomasyon ROI senaryosu** 250 ₺/saat is gucu maliyeti + 70.000 ₺ kurulum uzerinden
  yeniden hesaplandi — geri odeme 6,7 ay, 12 aylik ROI %80 (metindeki "yedinci ay
  civarinda" anlatimi korundu)

### Fixed
- **TrendChart eksen etiketleri**: eksen degerleri `Math.round(ceiling * r)` ile uretiliyor,
  ondalikli `max` verilince tekrar eden etiketler ("1, 1, 2, 3") cikiyordu. en/ru grafikleri
  mutlak euro, TR grafikleri bin-TL olcegine alindi
- **OG gorseli font hatasi**: Satori'nin dinamik fontunda `₺` glifi yok; maliyet yazisinin
  frontmatter `description` alanindaki `₺` build sirasinda "Failed to load dynamic font"
  veriyordu. Description'da "TL" kullaniliyor (govde metninde `₺` sorunsuz)

## 2026-08-08 (2)

### Added
- **3 uzun form blog yazisi daha, 3 dilde** (9 MDX): Next.js mi WordPress mi karar matrisi
  (`nextjs-vs-wordpress`), cok dilli site / hreflang / i18n mimarisi (`multilingual-site`),
  e-ticaret donusum orani optimizasyonu (`ecommerce-cro`). Blog toplam 8 yazi × 3 dil.
  Yazilar arasi capraz linklerle birlikte icerik ici toplam 81 dogrulanmis ic link

### Fixed
- **Anasayfa nav'inda Blog linki yoktu**: site iki ayri nav component'i kullaniyor
  (`chrome.tsx` anasayfa, `page-shell.tsx` ic sayfalar) ve Blog yalnizca ikincisinde vardi.
  `chrome.tsx`'in hem masaustu nav'ina hem mobil menu dizisine eklendi (tr/en/ru)

### Changed
- Statik sayfa sayisi 495 → 525

## 2026-08-08

### Added
- **3 new long-form blog posts in all 3 languages** (9 MDX files, ~2.000 kelime/yazi):
  SEO'dan GEO'ya (`seo-to-geo`), kurumsal web sitesi maliyeti (`website-cost`),
  KOBI'ler icin AI otomasyonu ve ROI (`ai-automation-roi`). Her yazida icindekiler tablosu,
  tablolar, grafikler, SSS bolumu ve hizmet/proje/blog sayfalarina 54 dogrulanmis ic link
- **MDX component seti** (`src/components/mdx/mdx-components.tsx`): `BarChart` (yatay cubuk),
  `TrendChart` (inline SVG cizgi grafik), `StatGrid`, `Callout`, `KeyTakeaways` + site ici
  baglantilari next/link'e ceviren `a` override'i. Hepsi tema degiskenleriyle calisir
- **Otomatik icindekiler tablosu** (`src/components/blog-toc.tsx`): basliklar
  `extractHeadings()` ile yazidan cikarilir, id'ler rehype-slug ile ayni github-slugger
  algoritmasini kullanir — 3'ten az baslikta gizlenir
- **Frontmatter `faq` alani**: yazi sonunda SSS bolumu render eder + `FAQPage` JSON-LD uretir

### Fixed
- **next-mdx-remote MDX icindeki tum JS ifadelerini siliyordu** (`blockJS` varsayilan `true`):
  prop olarak veri alan component'ler bos geliyor, `items.map` ile prerender patlıyordu.
  `blockJS: false` eklendi; `blockDangerousJS` acik birakildi
- `BarChart`/`TrendChart` tavani artik `max(verilen max, veri)` — kucuk verilen `max`
  grafigi cercevenin disina tasiyordu

### Changed
- `rehype-slug` eklendi (h2-h4 anchor id'leri), `blog.tableOfContents` ve `blog.faqTitle`
  cevirileri tr/en/ru'ya eklendi, `.blog-toc` / `.mdx-*` / `.blog-faq` stilleri + h4-h6
  baslik hiyerarsisi `globals.css`'e girdi
- Statik sayfa sayisi 476 → 495

## 2026-07-27

### Removed
- **All club/nightlife projects removed from the portfolio** (user request — they should no longer be listed). WORKS 66 → 56: night-club-katalog, kibris-gece-hayati, gece-kibris, prenses-night-club, miracle-night-club, misse-night-club, crazy-girl-night-club, kibris-nights-club, kibris-katalog, faraon-night-clubs. STORIES 11 → 6: kibris-night-club, miracle-night-club, fareon-night-club, ibo-seytan, kibris-gece-hayati. Project numbers renumbered sequentially (01–56), tr/en/ru translation entries and 19 preview webp assets deleted

## 2026-07-22

### Added
- **3D hero logo infrastructure** (`hero-logo-3d.tsx`): loads `public/models/logo.glb` with react-three-fiber (auto-rotate, mouse parallax, Float, blue-tinted lighting); gracefully falls back to the webp logo while the GLB doesn't exist yet. Model is user-generated via Meshy/Tripo image-to-3D — drop the file in and it activates automatically. Dynamic import keeps three.js out of the initial bundle

### Changed
- **Homepage services now show only 6 everywhere** (was: 15 on desktop, 5 CSS-hidden on mobile): `FEATURED` list renders 6 cards (web-design added as the 6th) on all viewports, grid switched 5→3 columns (3×2), "Tümünü Gör" button now visible on desktop too; dead `svc-desktop-only` CSS removed

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
