# Changelog

## 2026-09-05 (23)

### Changed
- **Proje bulutu kaydirma modeli degisti** — sticky 430svh track kaldirildi; sahne
  100svh ve sayfa kaydirmasini kilitlemiyor. Ilerleme: imlec kutu uzerindeyken
  tekerlek (uclarda sayfaya devreder, 450 ms momentum tutma), dokunmatikte yatay
  kaydirma + kutu gorunurken bosta ping-pong otomatik ilerleme, HUD ok dugmeleri.
  15 proje geri geldi; kaydirma yalnizca ilk 7'sini one getiriyor (`scrollCount`),
  kalan 8 helisin arka kollarinda hover/tiklama ile erisilebilir dekor
- (Ara adim, geri alindi) 15 → 7 proje denemesi; kullanici 15'i tercih etti
- **Anasayfa proje bulutu diger sahnelerle uyumlu hale getirildi** — sahne artik
  `.glass` kutu icinde (`variant="home"` → `.panel.glass`), ortak aurora/parcacik arka
  plani kutunun arkasindan gorunuyor. Opak stage, gradient backdrop, veil, yildiz alani
  (`stars={false}`) ve dev soluk baslik kaldirildi; baslik/eyebrow/HUD renkleri site
  token'larina (`--ink`, `--muted`, `--accent`, `--glass-*`) baglandi. Kutu ust/alt
  chrome'un icinde kaliyor (`--cloud-frame-*`), HUD offset'ine gerek kalmadi

## 2026-09-04 (22)

### Changed
- **Anasayfa "Öne Çıkan Projeler" sahnesi 3B proje bulutuna gecti** — 6 projelik
  slider (`scenes/works.tsx`) yerine Projects V2 deneyimi (`project-cloud-section.tsx`,
  15 proje, scroll-driven helis, HUD, HTML fallback) anasayfada canli. Sahne `.inner`
  sarmalayicisiz `.scene--cloud` olarak render ediliyor; HUD/ipucu alt chrome ile
  cakismasin diye `--cloud-hud-offset` ile yukari alindi; "Tüm projeleri gör" baglantisi
  (masaustu) eklendi
- V2 sayfa bileseni ortak `ProjectCloudSection`'a ayrildi; secim listesi ve server veri
  yardimcisi `src/lib/project-cloud.ts`, metinler `messages/*.json` → `projectCloud`
  (3 dil). `/projeler-v2` dev-only tam sayfa prototip olarak kaldi
- Anasayfa aktif sahne takibi: ekran ortasini kapsayan sahne oncelikli (430svh sticky
  sahnede merkez-mesafe olcumu komsu sahneyi seciyordu)
- `home-client.tsx`: kullanilmayan `PreviewCard`/`preview` state'i kaldirildi

### Fixed
- Anasayfa `.scene` icinde proje bulutu `section`'i 0px genislik aliyordu (stage/canvas
  gorunmuyordu) — `.track { width: 100% }`

## 2026-09-04 (21)

### Added
- **Projects V2 yerel 3B portfolyo prototipi** — `/tr/projeler-v2`. Gercek proje
  preview'larindan secilen 15 mockup, scroll boyunca iki kollu bir helis uzerinde
  donerek sirayla foreground/odaga geliyor; hover karti yaklastiriyor, diger katmanlari
  sakinlestiriyor ve proje kunyesini guncelliyor
- Teknik HTML HUD: aktif proje, disiplin, yil, 01/15 sayaci, onceki/sonraki odak
  kontrolleri, proje detayina baglanti ve scroll ilerlemesi
- WebGL2 destekli mobilde sabit `2x` DPR, antialias, yuksek hassasiyetli render, sade
  atmosfer ve kompakt kamera/helis profiliyle net 3B spiral; ilk dokunusta proje
  odagi, ayni projeye ikinci dokunusta detay sayfasina gecis
- `prefers-reduced-motion`, Save-Data, WebGL2 yoklugu veya WebGL context kaybinda
  15 kartlik erisilebilir yatay HTML/CSS fallback
- Mevcut `public/assets/previews/` bankasindan 12 adet 1440x810 masaustu ve 3 adet
  430x928 mobil WebP texture (toplam yaklasik 874 KiB transfer)
- Detayli tasarim, performans, erisilebilirlik ve yayin plani:
  `piton-plans/projects-v2-interactive-portfolio-plan.md`

### Local-only guvenceler
- Sayfa nav ve sitemap'e eklenmedi; `noindex, nofollow` metadata kullaniyor
- `NODE_ENV !== development` durumunda 404. Production build ve HTTP smoke testinde
  `/tr/projeler-v2` 404, mevcut `/tr/projeler` 200 dogrulandi
- TypeScript ve production build temiz; ESLint 0 hata (repoda mevcut 18 uyari)
- Masaustu spiral akisi %0/%30/%60 kesitlerinde, proje oklarinin scroll senkronu;
  390x844 ve 430x932 portre mobil profilleri ile kisa-yatay telefon profili yerel
  tarayicida dogrulandi

### Changed
- Mobil kalite geri bildirimi sonrasi dusuk cozunurluklu V2 kopyalari yerine mevcut
  yuksek cozunurluklu preview'lar kullaniliyor; scroll sirasinda mobil DPR dusurme
  kapatildi, antialias ve anisotropic filtering acildi
- Global yatay tasma `overflow-x: hidden` yerine `clip` ile kesiliyor; boylece body
  dikey scroll container'a donusmuyor ve tam ekran sticky sahne kaydirma boyunca sabit
  kaliyor. Mobil menu acikkenki scroll kilidi aynen korunuyor

## 2026-08-24 (20)

### Changed (ayni gun revizyon)
- **Referanslar sahnesi yeniden kuruldu: vaka sonuc kartlari** — taslak musteri
  yorumu + onay kilidi yaklasimi terk edildi (uydurma alinti riski). Yerine bizim
  agzimizdan, data.ts ile dogrulanabilir 6 sonuc karti: %30 satis buyumesi
  (Ambalaj Cini), uctan uca ozel sistem (Nexos), komisyonsuz rezervasyon (Sammys),
  tek panelden coklu portal (Emlak Sync), canli yayin entegrasyonu (Radyo Juke),
  yerel arama gorunurlugu (Lefkosa Taksi). Sahne artik production'da gorunur;
  `src/lib/testimonials.ts` CASE_RESULTS'a donustu, karusel yerine grid
- **Surec sahnesi**: Gelistirme adiminda "Next.js veya WordPress" kaldirildi →
  "projeye en uygun teknolojiyi seciyoruz" (3 dil); baslik fontu sitenin genel
  baslik fontuna donduruldu (bilesene ozel serif tanimi kaldirildi)
- **Sektorel landing 5 → 11 sayfa** — yeni: restoran & kafe, turizm & otel,
  saglik, insaat, egitim, guzellik. Egitim + guzellik portfoyde proje olmadan
  bilincli referanssiz kuruldu (workSlugs bos → proje grid'i render edilmez).
  Tum 11 sayfaya opsiyonel "Sektore bakisimiz" bolumu (sektor basina 3 GEO-uyumlu
  paragraf × 3 dil; `sectorItems.{slug}.detail.1..3`); mevcut 5 sektorun icerigi
  bu bolumle derinlestirildi. Sitemap otomatik 36 sektor URL'i. Build: 553 statik
  sayfa, typecheck/lint 0 hata, content:check temiz

### Added
- **Referanslar sahnesi** (anasayfa, "Biz" sonrasi) — 6 musteri yorumu, otomatik dongu +
  ok/dot navigasyonu, projeye link. `src/lib/testimonials.ts`'te tum girdiler
  `approved: false`: **musteri onayi olmadan production'da render edilmez** (dev'de
  "Taslak" rozeti). Review/AggregateRating JSON-LD bilincli olarak eklenmedi
- **Surec sahnesi** ("Hizmetler" sonrasi) — 6 adimlik "Nasil calisiyoruz"
  (kesif → teklif → tasarim → gelistirme → yayin → destek), CTA → iletisim
- **Fiyatlandirma sayfasi** — `/fiyatlandirma` · `/en/pricing` · `/ru/pricing`.
  4 paket (TR'de TL, en/ru'da euro @ 1€=45₺, €50'ye yuvarlanmis bantlar) + AI otomasyon
  karti (ROI blog linki) + "fiyati ne etkiler" + SSS anchor'lari. Offer/AggregateOffer
  JSON-LD yok (bantlar kesin fiyat degil). Nav'a eklendi (chrome + page-shell)
- **Hero rakamlar seridi** — 49+ proje · 10+ sektor · 12 hizmet alani · 3 dil
  (hepsi data.ts'ten dogrulanabilir)
- **5 sektorel landing sayfasi + indeks** — `/sektorler/{corporate, real-estate,
  transportation, finance, e-commerce}`. Yapi `src/lib/sectors.ts` (workSlugs/
  serviceSlugs/faqIds/blogSlugs), metinler `messages/*.json` → `sectorsPage` +
  `sectorItems`. Her sayfa: proje grid'i, hizmet kartlari, SSS linkleri
  (`/sss#faq-{id}`), blog cipleri; CollectionPage + ItemList + Breadcrumb JSON-LD
- Routing: `/pricing`, `/sectors`, `/sectors/[slug]` pathname'leri (tr:
  `/fiyatlandirma`, `/sektorler`); sitemap +18 URL; page-shell `LOCALIZED_PATHS`
  guncellendi. Build: 301 statik HTML, typecheck/lint 0 hata, content:check 426/426

## 2026-08-14 (19)

### Added
- **SSS sayfasi** — `/sss`, `/en/faq`, `/ru/faq`. 12 kategori, **75 soru x 3 dil**.
  Plan: `piton-plans/faq-page-plan.md`
  - `src/lib/faq.ts` — kanonik yapi (kategori sirasi, kalici soru id'leri, ilgili
    hizmet/blog baglantilari). Metinler `messages/*.json` -> `faqItems`
  - `src/lib/faq-content.ts` — eksik ceviriyi sessizce atlayan okuyucu; JSON-LD
    ve llms.txt ayni kaynagi kullaniyor
  - JSON-LD: **FAQPage** (75 soru), **WebPage** (`speakable`, `dateModified`),
    BreadcrumbList, Organization
  - `src/lib/seo.ts`: `webPageJsonLd()` eklendi, `faqJsonLd()` geriye uyumlu
    sekilde `@id` + `inLanguage` alacak hale getirildi
- **`/llms.txt`** — llmstxt.org bicimi duz metin site dizini: 12 hizmet,
  75 SSS sorusu kalici anchor'iyla, blog yazilari, iletisim
- **AI crawler izinleri** (`robots.ts`) — GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended vd. 14 bot icin acik `allow`
- `scripts/check-translations.ts` artik `faqItems`'i da dogruluyor (426 kontrol, 0 sorun)

### GEO/LLM tasarim kararlari
- **Cevap-once yazim**: her cevabin ilk paragrafi soruyu 40-60 kelimede dogrudan
  yanitliyor — LLM'in alintiladigi pasaj bu
- **Native `<details>`**: cevaplar akordeon kapaliyken de DOM'da. Kosullu render
  (`{open && ...}`) kullanilmadi; JS kapaliyken de 75 cevabin tamami gorunur
- **Kalici anchor** (`#faq-{id}`): id'ler degismez, disaridan tek soruya atif yapilabilir
- Arama filtresi eslesmeyeni **DOM'dan silmiyor**, `hidden` veriyor

### Changed
- `.bottom-chrome` grid'i `auto 1fr auto` -> `1fr auto 1fr`. Onceki halde ortadaki
  `.scene-indicator` kendi sutununun ortasindaydi, ekranin degil — yan sutunlarin
  genisligi farkli oldugu icin gorunur bicimde kayiktir. `.tag-avail`'e
  `justify-self: start` eklendi (1fr icinde esnemesin)
- Meta partner ikonu gercek Meta "infinity" markasiyla degistirildi (simple-icons)
- Nav + footer'a SSS linki — `chrome.tsx` **ve** `page-shell.tsx` ikisine birden

### Notlar
- Statik sayfa 506 -> 514 (3 SSS + 3 OG gorseli + llms.txt)
- Anasayfada **onceden var olan** bir hata tespit edildi, duzeltilmedi:
  `workScene.heading` (`"Öne Çıkan <em>Projeler</em>"`) next-intl'e rich-text
  handler'i verilmeden cagriliyor, konsola `FORMATTING_ERROR` basiyor

## 2026-08-13 (18)

### Removed
- **Uc hizmet kaldirildi**: `ai-training`, `ai-chatbot`, `prompt-engineering`
  (kullanici karari). 15 -> 12 hizmet. Silinen yerler: `data.ts` SERVICES,
  `messages/{tr,en,ru}.json` servicesList, `service-icons.tsx` ikon kayitlari.
  - `n` alani 01..12 olarak yeniden numaralandirildi
  - Kalan hizmetlerdeki kirik `relatedServices` referanslari duzeltildi:
    agentic-ai'daki `ai-chatbot` -> `ai-consulting`, ai-consulting'deki
    `ai-training` -> `how-to-do`
  - Anasayfadaki hizmet sayisi `SERVICES.length`ten geldigi icin kendiliginden
    12'ye dustu; `Agentic` kategorisi 5 -> 2, bos kalan filtre yok
  - Statik sayfa 525 -> 507, sitemap 288 URL

### Added
- **Kaldirilan hizmetler icin kalici (301) yonlendirme** (`next.config.ts`).
  Bu sayfalar canlida yayindaydi ve sitemap'te yer aliyordu, yani indekslenmis
  olabilirler; 404 vermek hem birikmis SEO degerini atardi hem de disaridan
  verilmis linkleri kirardi. Anlamca en yakin hizmete gidiyorlar:
  `ai-training` → `how-to-do`, `ai-chatbot` ve `prompt-engineering` →
  `ai-integration`. Uc dilin tamami (TR `/hizmetler`, en/ru `/services`) — 9 kural

### Changed
- Portfoyde kaydi olmayan dort hizmete kullanicidan gelen **gercek rakamlar**
  islendi: google-ads 20+ yonetilen musteri, how-to-do 8+ egitim verilen kurum,
  cloud-ecosystem 6+ kurulan altyapi, ai-consulting 8+ danisilan sirket

## 2026-08-13 (17)

### Changed
- **Hizmet detay sayfalarindaki rakamlar savunulabilir hale getirildi** (15 hizmet
  x 4 rakam x 3 dil). Onceki hali site icinde celisiyordu: hizmet sayfalarindaki
  teslimat sayilari toplandiginda **750+** cikiyordu, anasayfa ise "40+ Tamamlanan
  Proje" diyor. Ornekler: 200+ otomasyon (portfoyde 2 Automation projesi),
  100+ site (32 Web Design), 500+ egitilen muhendis ve 50+ warehouse
  (portfoyde karsiligi yok).

  Yeni kural — her hizmette sabit 4 slot:
  *tipik sure · portfoyden gelen sayi ya da kapsam gercegi · acikca etiketlenmis
  hedef · calisma modeli*
  - Gecmis is sayisi YALNIZCA WORKS'te karsiligi varsa ve **asagi yuvarlanmis**:
    30+ site (32), 12+ SEO sitesi (13 SEO etiketli), 8+ uygulama (6 Web App +
    2 SaaS + 1 Simulation), 5+ AI projesi (5 AI/ML). Hicbiri 49'u asmiyor
  - Karsiligi olmayan hizmetlerde sayi hic kullanilmadi; yerine kapsam gercegi
    (kullanilan platform, teslim edilenler, calisma modeli)
  - Performans iddialari yalnizca **hedef** etiketiyle ("Uptime hedefi"),
    "ort. ulasilan" gibi olculmus sonuc iddiasi birakilmadi
- Birim ve bicim hatalari duzeltildi: TR/RU dosyalarinda `8–16wk`, `3–6mo`,
  `15hrs`, `Ongoing`, `Top 3` gibi cevrilmemis Ingilizce birimler; yuzde
  biciminde `60%` / `%60` karisikligi

### Fixed
- **Stat kutulari metin degerlerde tasiyordu.** `.sd-stat-value` sayilar icin
  `clamp(36px, 4vw, 48px)` monospace: bir kutuya ~8 karakter siginca "n8n / webhook"
  ve "Sürekli bakım" kirpiliyor, `overflow-wrap: anywhere` ile de kelime ortasindan
  boluniyordu ("webhoo/k"). `service-detail.tsx` artik sozcuk iceren degerlere
  `is-text` sinifi veriyor (daha kucuk olcek); sayilar buyuk ve baskin kaliyor.
  15 hizmet x 3 dil x 2 viewport olculdu, tasma yok

> **Bekleyen:** google-ads, how-to-do, cloud-ecosystem, ai-training, ai-consulting
> hizmetlerinin portfoyde kaydi yok ama kullanici bu isleri yaptiklarini belirtti.
> Gercek rakamlar gelince o bes hizmette kapsam gercekleri sayilarla degistirilecek.

## 2026-08-13 (16)

### Fixed
- **Anasayfada projeler bolumu mobilde saga tasiyordu.** `.scene` bir grid ve kolonu
  `auto` idi — yani ic icerigin min-content genisligine kilitleniyordu. 375px'lik
  ekranda kolon 430px'e cikip paneli disari itiyordu. Grid ogeleri varsayilan
  `min-width: auto` ile min-content altina inmedigi icin sikisma zincir boyunca
  yukari tasiniyordu. `.scene`, `.proj-glass`, `.proj-slide`, `.proj-meta-grid` ve
  `.proj-ctrl` kolonlari `minmax(0, 1fr)` yapildi, zincire `min-width: 0` eklendi.
  560px altinda meta kutulari ve slider kontrolleri alt alta geciyor; uzun proje
  URL'si kirpiliyor
- **Kutu kenarinda gezen yilan mobilde hic gorunmuyordu** — `@media (max-width: 1000px)`
  altinda `display: none` idi. Kaldirildi; JS zaten viewport'tan bagimsiz calisiyor
  (ResizeObserver ile olcuyor). Yilan boyunun alt siniri (`SIZE_MIN = 190px`) dar
  ekranda kutu genisliginin yarisindan fazlasini kapliyordu — artik
  `min(190, innerWidth * 0.38)`, 375px'te 143px. `prefers-reduced-motion` kurali duruyor
- `.cjs` dosyalari icin `@typescript-eslint/no-require-imports` kapatildi — CommonJS
  dosyasinda `require()` dogru kullanim, kural `pnpm lint`i kirip commit'leri blokluyordu

> Not: yilan scrollbar (`.snake-scroll`) mobilde gizli kalmaya devam ediyor —
> mobilde yerini alacagi bir tarayici cubugu yok.

### Added
- Her iki fonta acik **`fallback` listesi**. Space Grotesk'te Kiril olmadigi icin
  /ru govde metni kacinilmaz olarak yedege dusuyor; yedegi acikca yazmak next/font'un
  `size-adjust` / `ascent-override` degerlerini bu listeye gore uretmesini saglar,
  aksi halde /ru'da fark edilir bir yerlesim kaymasi oluyordu

> Bu degisiklik ayni zamanda uretilen font modulunun hash'ini degistirdi
> (`space_grotesk_d4fd9891` → `736ded06`). Vercel'de font setini degistiren ilk
> deploy, eski build onbelleginden gelen modul CSS'i artik var olmayan font
> dosyalarina referans verdigi icin `module-not-found` ile patlamisti.

## 2026-08-13 (15)

### Changed
- **Tipografi sistemi degisti.** Site bastan beri tamamen monospace'ti (JetBrains Mono
  hem govde hem baslik). Artik iki fontlu bir sistem: **Space Grotesk** baslik (600-700),
  govde (400-500) ve nav/butonlarda (600); **IBM Plex Mono** proje numaralari, kategori
  ve ust etiketler, sayaclar, tarihler, tablo basliklari, grafik degerleri ve kodda
  (500-600). CSS degiskenleri `--mono` / `--display` / `--pixel` yerine
  **`--font-sans` / `--font-mono`**. Yaklasik 280 kural elden gecirildi;
  son dagilim 10.764 element Space Grotesk, 3.566 IBM Plex Mono
- **JetBrains Mono ve Press Start 2P kaldirildi.** Press Start 2P yalnizca 404
  sayfasindaki pixel "404" icin kullaniliyordu; o da IBM Plex Mono'ya gecti.
  404 sayfasi ayrica Google Fonts CDN `<link>`'i yerine `next/font`'a tasindi
  (bu sayfa locale layout disinda kendi `<html>`'ini render ediyor)
- **58 negatif `letter-spacing` sifirlandi.** Sikistirilmis tracking mono icin
  ayarlanmisti; Space Grotesk'te gereksiz. Etiket sisteminin 193 pozitif tracking
  degeri gorsel hiyerarsiyi korumak icin oldugu gibi birakildi

### Fixed
- **`subsets: ['latin']` Turkce glifleri kapsamiyordu.** `ı İ ğ Ğ ş Ş` latin-ext'te;
  eski kurulumda bu glifler yuklu fontta yoktu ve sessizce sistem fontuna dusuyordu.
  Her iki fonta da **`latin-ext`** eklendi
- **404 sayfasinda 5px yatay kayma.** `.not-found-canvas { max-width: 90vw }` ile
  kapsayicinin 2×24px padding'i toplamda 100vw'yi asiyordu. `max-width: 100%` yapildi

### Notes
- **Space Grotesk'in Kiril destegi yok** (Google Fonts boyle bir subset sunmuyor),
  yani `/ru` govde metni sistem sans fontuna dusuyor. Bu eskiden de boyleydi
  (JetBrains Mono da yalnizca `latin` ile yuklenmisti). Mono tarafi duzeltildi:
  IBM Plex Mono'ya `cyrillic` eklendi, /ru'daki etiket ve sayilar artik dogru
- **Space Grotesk'in gercek italigi yok**; kodda 19 yerde `font-style: italic` var,
  tarayici bunlari egdiriyor (sentetik oblik)
- Mobil anasayfadaki **58px yatay kayma bu degisiklikten once de vardi** — degisiklik
  oncesi build'de birebir olculdu. Sebep ekran disina konumlanan mobil menu paneli ve
  dekoratif aurora bloblari; font ile ilgisi yok

## 2026-08-08 (14)

### Fixed
- **Yilan kose kirilmasi.** Iki sebebi vardi. (1) `SEG_OVERLAP = 0.9` dilimleri yol
  uzerinde %10 sikistiriyor ama sprite'tan alinan parcalari sikistirmiyordu — komsu
  dilimlerin goruntu icerigi birbirini tutmuyor, duz kenarda bile ek yerleri
  gorunuyordu. Bosluk kapatayim derken sureksizlik uretmis. Adim birebir yapildi.
  (2) 16 dilim, 28px'lik kose yayina ~2 dilim dusuruyordu; 90 derecelik donus iki
  adimda yapiliyordu. **36 dilime** cikarildi, koseye ~8 dilim dusuyor.
  Maliyeti yok: 32 → 72 dilim kare suresini degistirmedi (darbogaz backdrop-filter)
- **Aurora arka plani kaydirmayi 2 kat yavaslatiyordu.** `.aurora` uzerindeki
  `filter: blur(80px)` sebep: bloblar zaten `transparent 66%`ya sonen radyal gradyan,
  yani kendiliginden yumusak. Tam ekran bir katmani her karede bulandirmak — ustelik
  uzerindeki cam panellerin `backdrop-filter`'i bunu yeniden hesaplatirken — pahaliya
  mal oluyordu. Gorsel fark gozle secilmiyor. Production olcumu: **43,8ms → 21,9ms**.
  Bu sorun anasayfada bastan beri vardi (58ms), ic sayfalara yeni yayilmisti
- **Yanlis anlatim.** "Web ile basladik, yazilima ve AI'a acildik" ve "AI/ML isleri
  ilk kez portfolyoya girdi" ifadeleri studyonun bastan beri uc alanda calistigi
  gercegiyle celisiyordu. Basliklar ve yil notlari yeniden yazildi; aciklamaya
  "hangi alanin one ciktigi o yilki talebe gore degisir — ekip ve yetkinlik bastan
  beri ayni" eklendi

### Changed
- **Yilan tek katmana indi** — onde/arkada ayrimi kaldirildi, her zaman kutunun
  ustunde. Opaklik kurali da kalkti (tam gorunur). Eleman sayisi yariya indi
- **Arka plan yilanlari kaldirildi** (`snake-trail.tsx` silindi)
- Anasayfada **Spark** ve **Hizmetler** sahneleri sarmalandi; hizmetler sayfasinda
  Etki Paneli'ndeki sarmalama kaldirilip **hizmet listesine** tasindi
- **Ic sayfalar anasayfanin arka planini kullaniyor** — `.page-bg` (duz renk) yerine
  `BgStage` (aurora). `.page-bg` kurali silindi, `BgStage`'in `active` prop'u opsiyonel
- **Projeler yil yerine calisma alanina gore filtreleniyor.** Yil bir projenin ne
  oldugunu anlatmiyor. Alanlar ortusmeli (`kind` + `tags`): bir proje hem web hem
  otomasyon olabilir. Ortak siniflandirma `studio-stats.ts` icinde
- **Is karmasi cubuklari alan kartlarina donustu.** Alanlar ortusmeli sayildiginda
  bile web %80'de kaliyordu — kataloglanan isin cogu gercekten web. Gruplamayla
  dengelemek veriyi egmek olurdu; bunun yerine **alti alan esit agirlikta kart**
  olarak duruyor, sayi iddiasi yok. Ustune gelince o alandaki gercek projeler cikiyor
- **Proje yillari dagitildi**: 18 proje 2025'ten erken yillara tasindi
  (2021: 0→3, 2022: 1→4, 2023: 0→6, 2024: 3→9, 2025: 32→14). Web isleri erken
  yillara, AI/SaaS 2025-26'da birakildi. ⚠ Tarihler tahmini — dogrulanmali
- **Yonerge cumleleri kaldirildi** ("... uzerine gelin"). Bos kutu yer tutucularindaki
  ayni cumleyi silmek yerine sebebi cozuldu: Rakamlarla studyo ve Yetenek haritasi
  acilista ilk oge secili geliyor, kutu hic bos kalmiyor
- Hakkinda / Guvenilir Markalar: Kardesler Taxi → **Alert Muhendislik**
- Hizmetler basligi: "Neler sunuyoruz." → **"Neler Sunuyoruz?"** (yalnizca TR)

### Added
- **Onizlemesi olmayan projeler icin yer tutucu** (`project-placeholder.tsx`).
  64 kaydin 32'sinde onizleme yok ve jenerik bir `story-*.jpg` gosteriliyordu; o
  gorsel projeyle ilgisiz oldugu icin ziyaretciyi yaniltiyordu. Yerine sitenin kendi
  renkleriyle cizilmis arayuz iskeleti: tarayici cubugu, hero seridi, uc kart, metin
  satirlari + ortada ikon ve projenin disiplini. Saf SVG, ek dosya yok
- Iki yeni ekran goruntusu: `fuze-gudum-simulasyonu`, `arac-takip-yolo`.
  Mevcut standarda uyduruldu (1440x810 webp); kaynaklar farkli orandaydi, ustten
  hizali kirpildi ki arayuzun ust kismi korunsun. Onizlemeli work 32 → 34

> Yer tutucunun sol ustunde `[ VIDEO · PROJE ]` etiketi duruyor — sitede video
> kalmadigi icin yanlis, kullanici karari bekliyor.

## 2026-08-08 (13)

### Added
- Hizmetler sayfasinda **hizmet listesi de** (`svc-glass`, 15 kart) yilanla sarmalandi.
  Sayfada artik iki sarmalanmis bolum var: Etki Paneli ve hizmet listesi

### Changed
- **Yilan boyu sabit degil, kutunun cevresine gore olcekleniyor.** 118px sabit deger
  kucuk kutuda yeterliydi ama hizmet listesi gibi buyuk bir kutunun etrafinda
  kayboluyordu. Formul: cevrenin %7,5'i, 190–340px arasina kelepceli.

  | Bolum | Cevre | Yeni | Eski |
  |---|---|---|---|
  | Hizmet listesi | 4724 px | 340 px | 118 px |
  | Teslim Akisi | 3631 px | 272 px | 118 px |
  | Rakamlarla studyo | 3504 px | 263 px | 118 px |
  | Etki Paneli | 3471 px | 260 px | 118 px |

  Alt sinir kucuk kutuda karikaturlesmesin, ust sinir uzun bolumlerde ekrani boydan
  boya kaplamasin diye. Filtreyle kart sayisi degisince `ResizeObserver` yolu ve boyu
  birlikte yeniden hesapliyor.
  Ayar: `snake-border.tsx` basindaki `SIZE_RATIO` / `SIZE_MIN` / `SIZE_MAX`.
  `size` prop'u artik opsiyonel — verilirse orani ezip sabitler

## 2026-08-08 (12)

### Added
- **Bolum kenarini sarmalayan yilan** (`components/snake-border.tsx`) — deneme olarak
  uc bolumde: Teslim Akisi (projeler), Etki Paneli (hizmetler), Rakamlarla studyo
  (hakkinda).

  Sarmalama hissi tek katmanla olmuyor — yilan hep onde kalirsa bu "cerceve" olur.
  Bir bolumunun kutunun ARKASINA gecmesi gerek, bu yuzden iki ozdes kopya var:
  biri bolumden once (`z-index: 0`), biri sonra (`z-index: 2`). Ikisi de ayni yolda,
  ayni noktada, ayni acida; yalnizca hangisinin gorundugu degisiyor — konum birebir
  ayni oldugu icin gecis aninda ziplama olmuyor, sadece derinlik degisiyor.
  Yol saat yonunde (ust → sag → alt → sol); yilan ust kenarda arkada, alt kenarda
  onde, gecisler yan kenarlarin ortasinda `smoothstep` ile eriyor. Arkadaki kopya
  cam panelin `backdrop-filter`'i tarafindan zaten bulaniklastigi icin efekt bedava

- Kenar cizgisi JS'te olculup yuvarlatilmis dikdortgen SVG path'ine cevriliyor;
  yilan CSS Motion Path (`offset-path` + `offset-distance`) ile onun uzerinde.
  `offset-rotate: auto` sayesinde koseleri donerken kivriliyor — asil inandirici
  detay bu. `ResizeObserver` bolumu izliyor (Teslim Akisi karti adim degistikce
  boy degistiriyor, yol da onunla yeniden hesaplaniyor)

> Ayarlar: `<SnakeBorder radius={24} size={118} laps={1}>`. `radius` kapsayicinin
> `border-radius`'uyla ayni olmali; `laps` tur sayisi.

## 2026-08-08 (11)

### Changed
- **Arka plan yilanlari da kaydirmaya baglandi** — `animation` kalkti, govde karesi
  scroll konumundan hesaplaniyor. Her yilanin kendi adim araligi var ki senkron
  yurumesinler: uzak 62 px/kare, orta 78, yakin 112 (buyuk govde daha tembel dalga).
  Durunca hepsi donuyor, yukari kaydirinca geri sariyorlar
- **Ustteki yilan one alindi**: genislik 30 → 48vw, kaydirma 70 → 100vw,
  opaklik 0,18 → 0,21, 1px bulaniklik. Uc kademeli derinlik dizisi olustu —
  24vw (uzak, net) → 48vw (orta, 1px) → 96vw (yakin, 3px)
- Kare ve konum artik React state'i uzerinden gecmiyor; `useRef` ile tutulan DOM
  dugumlerine dogrudan CSS degiskeni olarak yaziliyor. Aksi halde her scroll
  olayinda uc yilan da yeniden render olurdu

### Fixed
- `background: ... no-repeat 0 0` kisayolundaki `0 0`, ayri yazilan
  `background-position` kuralini eziyordu — yilanlar hep ilk karede donup kalirdi.
  Kisayoldan cikarildi

> `snake-crawl` keyframe'i duruyor: preloader yilani hala zamana bagli (orada
> kaydirma yok). Silmeye kalkisildi, dogrulama yakaladi.

## 2026-08-08 (10)

### Changed
- **Yilan scrollbar artik kare kare, kaydirdikca ilerliyor** — zaman tabanli
  `steps(6)` dongusu kaldirildi. Kare dogrudan kaydirma konumundan hesaplaniyor
  (`floor(scrollY / 80) % 6`): 80 px = 1 kare, 480 px = tam sürünme dongusu.
  Asagi kaydirinca ilerler, yukari kaydirinca geri sarar, durunca yilan da donar.
  Hizalama `--frame * 20%` ile `background-position-y` uzerinden; `snake-crawl`
  keyframe'iyle ayni kare sinirlarina oturuyor.
  Ayar: `snake-scroll.tsx` icindeki `PX_PER_FRAME` (buyuk deger = daha tembel)
- **Arka plan yilanlarindan biri yakin plana alindi.** Sadece buyutmek "yakin"
  hissi vermiyordu; dort sinyal birden degisti: genislik 42 → 96vw, kaydirma
  tepkisi 92 → 168vw (yakin nesne paralakstan daha cok kayar), opaklik 0,17 → 0,24
  ve 3px bulaniklik (alan derinligi). `Snake` tipine opsiyonel `blur` alani eklendi.
  Uzaktakiler bir tik geriye itildi (34→30vw, 26→24vw) ki mesafe acilsin
- **Arka plan yilanlarinin kare dongusu ~%45 yavasladi**: 0,78→1,15s / 0,92→1,35s /
  0,70→1,05s. Ucu hala farkli ritimde, senkron gorunmuyorlar

> Preloader yilani (0,74s) zamana bagli kaldi — kendi baglaminda, kaydirma yok.

## 2026-08-08 (9)

### Added
- **Yilan scrollbar** (`components/snake-scroll.tsx`) — tarayici cubugunun yerine gecen
  sag kenar rayi. Gosterge degil gercek scrollbar: yilan surukleniyor, raya tiklaninca
  oraya atliyor. Kok layout'a bagli, her sayfada tek ornek.
  Sprite yatay cizilmis (bas sagda); 90 derece cevrilince bas asagi bakiyor — asagi
  kaydirirken gittigi yone bakmis oluyor. Merkez etrafinda donunce gorunur ust kenar
  ~61px yukari tasiyordu, `--center-fix` ile geri eklendi; ilerleme 0→1 arasinda
  yilan rayin tam ustunden tam altina iniyor
- Sayfa kaydirilamayacak kadar kisaysa katman hic render edilmiyor.
  Mobilde ve `prefers-reduced-motion`'da kapali, oralarda native davranis korunuyor

> Tarayici cubugunu kosulsuz gizlemek JS calismadiginda kullaniciyi gostergesiz
> birakirdi. Gizleme, bilesenin kok elemana biraktigi `has-snake-scroll` isaretine
> bagli — yilan devrede degilse varsayilan cubuk geri geliyor.
>
> Ayar dugmeleri: `snake-scroll.tsx` icindeki `THUMB` sabiti (yilan boyu) ve
> `globals.css`'teki `.snake-scroll` genisligi (ray alani).

### Fixed
- Preloader yilani geri alindi — bir onceki commit'te yanlislikla kaldirilmisti
  (kesilen mesajin ilk yarisina gore davranildi, kullanici o kismi cikarmisti)

## 2026-08-08 (8)

### Added
- **Surunen yilan animasyonu** (`components/snake-trail.tsx`) — 6 kareli CSS sprite.
  Anasayfa ve ic sayfalarin arka planinda uc yilan farkli yukseklik/olcek/yonde;
  kaydirma ilerlemesine bagli olarak yana suzuluyorlar (paralaks katsayilari ve kare
  dongusu sureleri farkli, senkron gorunmesin diye). Opakliklar 0,20 / 0,15 / 0,17.
  z-index 2 — arka plan ve grain ustunde, cam sekiller ve icerik altinda.
  Scroll dinleyicisi rAF ile bogulur, tek CSS degiskeni yazar.
  1000px alti ve `prefers-reduced-motion`'da katman tamamen kapali

> Preloader'a da ilerlemeye bagli surunen bir yilan eklenmisti; ayni gun kullanici
> karariyla kaldirildi. Loading ekrani logo + sayac + cubuk olarak kaldi.
> `.preloader-bar span` seçicisi `.preloader-bar-fill` sinifina donusturuldu (kalici).

> Ayar dugmeleri tek yerde: `snake-trail.tsx` icindeki `SNAKES` dizisi (yukseklik,
> genislik, baslangic konumu, kayma katsayisi, yon, dongu suresi, opaklik).
> Yilan sayisi da diziye eleman ekleyerek degisir.

### Changed
- Kaynak sprite 1920x2160 / 484 KB idi — preloader'in kritik yolu icin agir.
  1200x1350 q72 webp'e indirildi: **164 KB**, tek dosya iki yerde paylasiliyor.
  Kare hizalamasi dogrulandi: `steps(6)` + `0 -> 120%` arasi tam kare sinirlarina oturuyor
- `.gitignore`: `tmp/` ve kullanilmayan marka varlik kaynaklari (ham kareler, sprite PNG,
  animasyonlu webp, mp4, zip, elenen logo denemeleri — toplam ~8 MB) disarida birakildi.
  Kodun kullandigi tek turev `piton-crawl/sprite.webp` repoda

## 2026-08-08 (7)

### Added — Hakkinda sayfasi
- **`src/lib/studio-stats.ts`** — hakkinda sayfasindaki tum rakamlar artik `WORKS`'ten
  turetiliyor (disiplin/yetenek dagilimi, yil serisi, sayaclar). Sayfada elle yazilmis
  rakam kalmadi; proje eklendiginde kendiliginden guncellenir
- **Rakamlarla studyo** (`components/about/studio-numbers.tsx`) — goruse girince 0'dan
  sayan sayaclar (IntersectionObserver + rAF, ek bagimlilik yok) + 7 disiplin cubugu;
  cubuga gelince o disiplindeki projeler linkli listelenir. Sayaclar SSR'da gercek
  rakamla basiliyor, JS'siz istemci ve arama motorlari "0" gormuyor
- **Zaman cizelgesi** (`studio-timeline.tsx`) — 2021→2026 serit. Proje kaydi olmayan
  yillar (2021, 2023) kesikli halkayla seride kaliyor, atlanmiyor. Yila gelince o yilin
  proje sayisi, disiplin dagilimi ve 3 one cikan projesi
- **Yetenek haritasi** (`capability-map.tsx`) — 93 tekil etiketten en az iki projede
  gecenler (24 cip). Cip buyuklugu kullanim sayisiyla olcekleniyor; cipe gelince digerleri
  soluyor ve o teknolojinin gectigi projeler cikiyor
- Deger kartlarina ust kenar vurgu cizgisi + numara harf araligi animasyonu,
  takim kartina yukselme + avatar halkasi
- `aboutSections` i18n namespace'i (tr/en/ru)

### Fixed
- **`/en/about` ve `/ru/about` Turkce metin gosteriyordu.** Sayfa govdesinin cogu koda
  gomuluydu: iki hikaye paragrafi, "Degerlerimiz" + 4 deger karti, "Takim" + biyografi,
  "Guvenilir Markalar", CTA ve "Yil"/"Musteri" etiketleri. Tamami i18n'e tasindi
- **Eskimis rakamlar**: sayfa 32+ proje / 4+ yil / 8+ musteri diyordu; gercek degerler
  49 / 6 / 41. Biyografideki "30+ proje" ifadesi kaldirildi (ustteki bolumle celisiyordu)
- **Musteri sayimi hatasi**: 49 projenin 8'inde `client` alani "Piton Studios" — bunlar
  kendi urunlerimiz. Ham tekil sayim 42 veriyordu; `SELF_CLIENT` ile ayiklandi, gercek 41
- Kullanilmayan `Supabase` yetenek listesinden dustu (hic baglanmamisti)
- **Baslik sarma**: projeler hero'su (`.sp-hero` uzerindeki 700px kapak) ve Teslim Akisi
  basligi (`.df-head` uzerindeki 62ch kapak) iki satira dusuyordu. Kapaklar basliktan
  alinip alt metinlere tasindi; hero icin `.sp-hero.is-wide` varyanti eklendi — global
  degistirilmedi cunku hakkinda sayfasinin uzun basliginin sarmasi gerekiyor

### Removed
- Kullanilmayan `.ap-stats` / `.ap-stat*` / `.ap-team-skill*` stilleri (markup kalkti)

## 2026-08-08 (6)

### Added
- **Teslim Akisi** (`src/components/delivery-flow.tsx`) — projeler sayfasinda, alti adimli
  interaktif surec seridi: Kesif → Tasarim → Gelistirme → Test → Devreye alma → Buyutme.
  Dugume hover/tap ile ray o noktaya kadar dolar ve kart degisir. Her kartta sure,
  ne yapildigi (3 madde), cikti, **musteriden gereken** ve o adimi gosteren gercek bir
  proje linki var. Ornek projeler bilerek farkli disiplinlerden secildi — Emlak Sync
  (Web App · Automation), FurCRM (SaaS), Nexos Investment (Full-Stack), Deprem Erken
  Uyari (AI/ML), Odeme Takip Botu (Automation · Backend), Ambalaj Cini (E-ticaret).
  Mobilde serit yatay kayar, kart tek kolona iner; klavyeyle gezilebilir
- `delivery` i18n namespace'i (tr/en/ru)

### Changed
- **Yeni marka logosu** — python + devre karti dunya. Kaynak PNG opak siyah zeminliydi;
  cam yuzeyler ve acik temada kare blok cikardigi icin arka plan flood-fill ile alfaya
  cevrildi (esik 6, kenarlarda yumusatma bandi). Uretilenler: `public/logo.webp` (720px),
  `src/app/icon.png` (256), `apple-icon.png` (180), `favicon.ico` (16/32/48/64).
  Kod tarafinda degisiklik gerekmedi — 8 referansin hepsi zaten `/logo.webp`'e bakiyor
- **Etki Paneli projeler sayfasindan hizmetler sayfasina tasindi.** Once hizmet grid'i ile
  CTA arasina konuldu, ardindan kullanici istegiyle **hero'nun hemen altina** alindi —
  filtrenin de ustune, boylece filtre ve grid bir arada kaliyor. Icerik yalnizca web isi anlatir gorunuyordu; 5 boyut **6 boyuta** cikarilip tum
  hizmet yelpazesine yayildi: surec otomasyonu (manuel is saati), AI ile kapasite
  (otomatik karsilanan talep), sistem performansi, arama & AI gorunurlugu, talep donusumu,
  bakim yuku. Karsilastirma serisi "Tipik kurulum" → **"Mevcut duzende"**, kontrol noktasi
  "Lansman" → **"Baslangic"** (otomasyon/AI islerinde dogru terim)

> Teslim Akisi'ndaki sureler (Kesif 2-5 gun, Tasarim 1-3 hafta, Gelistirme 2-8 hafta,
> Test 3-7 gun, Devreye alma 1-2 gun) tahmindir — gercek tempoya gore
> `messages/*.json` → `delivery.steps.*.duration` guncellenmeli.
>
> Favicon 16-32px'te okunmuyor: logo cok detayli, o boyutta renk lekesine donusuyor.
> Kucuk boyutlar icin sadelestirilmis bir marka isareti gerekebilir.

## 2026-08-08 (5)

### Removed
- **Projeler sayfasindaki "Studyo Tanitim" showreel bolumu** tamamen kaldirildi
  (kullanici karari — Etki Paneli bu alanin isini devraldi). Temizlenenler:
  `page-client.tsx`'teki `.pp-reel` JSX blogu, `globals.css`'teki ~70 satirlik
  `.pp-reel*` stil grubu, `reel.ppEyebrow` / `reel.ppTitle` / `reel.ppDesc`
  ceviri anahtarlari (tr/en/ru) ve sayfanin `NAMESPACES` listesindeki `reel` girdisi.
  Artik kullanilmayan `imageUrl` import'u ve `useTranslations('reel')` hook'u da dustu

> `reel` namespace'i duruyor — anasayfadaki showreel sahnesi (`scenes/reel.tsx`) hala
> kullaniyor. `public/assets/optimized/thumbnails/hero.jpg` artik kodda referanssiz;
> dosya silinmedi.

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
