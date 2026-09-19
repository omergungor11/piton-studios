# Piton Studios

## Proje

Piton Studios firmasinin dijital ajans / portfolyo websitesi. Proje screenshot'lari ve case study'ler
uzerine kurulu, 3 dilli (tr/en/ru), hizli yuklenen modern bir portfolyo sitesi.

- **GitHub**: https://github.com/omergungor11/piton-studios
- **Deploy**: Vercel
- **Database**: Yok — site tamamen statik

> Not: Hicbir veritabani veya harici depolama kullanilmiyor. Neon ve Vercel Blob
> degerlendirilip vazgecildi (gerekce: `piton-plans/`).

## Slash Commandlar

| Command | Ne yapar |
|---------|----------|
| `/cold-start` | Session baslangici — projeyi oku, durumu raporla |
| `/git-full` | Stage, commit, push — task durumlarini guncelle |
| `/local-testing` | Tum servisleri ayaga kaldir ve dogrula |
| `/turn-off` | Session notu yaz, tasklari isaretle, push, kapat |

---

## Mevcut Durum

**Progress**: 50/50 task (%100) — son is TASK-051 (SSS sayfasi), 2026-08-14.

> `piton-tasks/task-index.md` Phase 0-1'de **yanlis COMPLETED** isaretli tasklar iceriyordu
> (veritabani kurulumu, video pipeline, admin CRUD API'leri). Hicbiri uygulanmamisti;
> `NEVER_DONE` olarak duzeltildi. Yeniden yapilmasi planlanmiyor.

- **50 proje** WORKS array'inde (2026-09-14: VELAIR — 3B özel jet deneyimi, canlı link + desktop/mobil önizleme — #09 sırasına EKH Yapı'nın yerine alındı, EKH Yapı #50'ye kaydı) — freelancer klasöründen 13 + 5 canlı self-development (FurCRM slider #2, canlı linkler `url` alanıyla) + Work-Restored taramasından 5; nexos-investment mükerrer girdisi silindi. 2026-07-27: tüm kulüp/nightlife projeleri kaldırıldı (WORKS'ten 10, STORIES'ten 5 — detay: piton-docs/MEMORY.md). 2026-07-29: 7 proje daha kaldırıldı (lider-emlak, gemini-tracker, ai-dating-app, manager-oto-servis, sevgili-yogurt, osyb-hap, avie-global) — `n` alanları 01–49 olarak yeniden numaralandı. İlk 6 proje slider'da
- **Case study'ler güçlendirildi**: Nexos (flagship full-stack anlatım), Ambalaj Cini (%30 büyüme), Sammys (özel rezervasyon), Radyo Juke (özel entegrasyon)
- **Saiber ortaklığı**: 18 projede `collaborator: "Saiber"` — detay sayfasında "İş Birliği" metası olarak görünüyor (liste: piton-docs/MEMORY.md)
- **Anasayfa**: Hero → Spark CTA → Projects → Manifesto (Neden Piton Studios) → Services → Process → About → Contact (8 scene; 2026-09-05'te Projects one alindi)
- **Anasayfa Projeler sahnesi = 3B proje bulutu** (2026-09-04): `src/components/projects-v2/project-cloud-section.tsx`
  (React Three Fiber, 15 proje, ilk 7'si tekerlek/yatay dokunma ile one gelir; sayfa kaydirmasini kilitlemez). Secim listesi + server veri yardimcisi
  `src/lib/project-cloud.ts`, metinler `messages/*.json` → `projectCloud`. Sahne `.scene--cloud`
  ile `.inner` sarmalayicisiz render edilir (sticky stage reveal transform'undan etkilenmesin).
  Eski slider `scenes/works.tsx` artik kullanilmiyor (yalnizca `PreviewCard` export'u duruyor).
  `/projeler-v2` rotasi ayni bileseni tam sayfa gosteren **dev-only** prototip (prod 404, noindex).
- **Nav**: Anasayfa `chrome.tsx`, ic sayfalar `page-shell.tsx` — **iki ayri component**, nav
  icerikleri elle esitleniyor. Menuye link eklerken ikisini birden guncelleyin (masaustu nav +
  mobil menu dizisi). 2026-08-08: Blog linki yalnizca `page-shell.tsx`'te vardi, `chrome.tsx`'e
  eklendi
- **Footer** (2026-09-15): nav'in aksine **tek component** — `src/components/site-footer.tsx`,
  hem `page-shell.tsx` hem `home-client.tsx` kullanir. Anasayfa `page.tsx` `NAMESPACES` listesinde
  `common` olmali (yoksa footer ham anahtar gosterir)
- **Videolar**: YOK — `videos/` (289 MB) 2026-07-28'de silindi, kodda tek referansi yoktu
- **Proje detay hero**: Screenshot IS the hero — Desktop/Mobile toggle hero icinde sag ust
- **Projeler sayfasi**: `pp-showcase` yatay screenshot seridi (toggle'li, kareler oranli)
- **Blog**: MDX tabanli, `content/blog/{tr,en,ru}/*.mdx` — liste, yazi, etiket sayfalari + RSS.
  8 yazi × 3 dil. Yazi sayfasinda otomatik icindekiler tablosu (`blog-toc.tsx`), frontmatter
  `faq` alani (SSS bolumu + FAQPage JSON-LD) ve MDX component'leri var:
  `BarChart`, `TrendChart`, `StatGrid`, `Callout`, `KeyTakeaways`
  (`src/components/mdx/mdx-components.tsx`).
  > MDXRemote'ta `blockJS: false` **zorunlu** — varsayilan `true`, MDX icindeki tum JS
  > ifadelerini siler ve component prop'lari `undefined` gelir
- **SSS sayfasi** (2026-08-14): `/sss` · `/en/faq` · `/ru/faq` — 12 kategori, **75 soru × 3 dil**.
  Yapi `src/lib/faq.ts` (kategoriler + kalici soru id'leri + ilgili hizmet/blog baglantilari),
  metinler `messages/*.json` → `faqItems`. Plan: `piton-plans/faq-page-plan.md`
  > **Soru id'leri kalici anchor'dir** (`#faq-{id}`) — soru silinmedikce id degistirilmez.
  > Yeni soru eklerken: `faq.ts`'e girdi + 3 dilde `faqItems.<id>` + `pnpm content:check`.
  >
  > **GEO kurallari** (bozmayin): cevabin ilk paragrafi (`a`) soruyu 40-60 kelimede
  > dogrudan yanitlar; cevaplar native `<details>` icinde **kapaliyken de DOM'da** durur
  > (kosullu render yasak); arama eslesmeyeni silmez, `hidden` verir.
  >
  > JSON-LD: FAQPage + WebPage(`speakable`) + BreadcrumbList + Organization.
  > `/llms.txt` (llmstxt.org bicimi) ve `robots.ts`'teki 14 AI crawler izni de bu isin parcasi.
- **Hizmet / sektör / çözüm yapısı ve yerel URL'ler** (2026-09-15, plan: `piton-plans/hub-restructure-plan.md`):
  - **18 hizmet** (`SERVICES`, sıra önemli): Web Tasarım, Özel Yazılım, Web Uygulama, Mobil Uygulama, PWA, E-ticaret,
    ERP & CRM, Otomasyon, WhatsApp & Chatbot, AI Entegrasyonu, AI Danışmanlık, Veri Müh., Cloud, Google Ads, Meta
    Reklamları, SEO & GEO, Bakım & Destek, Eğitim & Danışmanlık (`how-to-do`). Agentic AI kaldırıldı.
    Hizmet eklerken: `data.ts` + 3 dilde `servicesList` + `service-icons.tsx` + `nav-mega-menu.tsx` SERVICE_SLUGS
    + `common.menu.services` + `src/lib/slugs.ts`. Kaldırılan hizmet → `next.config.ts` REMOVED_SERVICES.
  - **Sektörler = hub** (13, Sanayi ve Mühendislik dahil): "<Sektör> web sitesi" değil, o sektör için tüm ilgili
    hizmetler + çözümler. Menüde listelenmez; `/sektorler` ve footer/hub linklerinden erişilir.
  - **Çözümler** (hizmet × sektör, birbirine benzemeyen sorunlar): SEO ağırlıklı 3 çözüm kaldırıldı → ilgili hub'a
    yönlendirme (`REMOVED_SOLUTIONS`). Menüde yalnızca `FEATURED_SOLUTIONS` (6) + "Tüm çözümler".
  - **Yerel URL'ler**: veri dosyalarındaki `slug` KANONİK KİMLİKTİR; kodda linkler hep kimlikle kurulur.
    Dil başına URL `src/lib/slugs.ts`'te; dönüşüm yalnızca `@/i18n/navigation` (Link, getPathname, useRouter)
    ve sayfaların `resolveSlug` çağrısında. ru yol segmentleri de çevrildi (`/ru/uslugi`, `/ru/proekty`, `/ru/otrasli`,
    `/ru/resheniya`, `/ru/voprosy`...). Eski adresler `next.config.ts`'te bu haritadan otomatik 308.
    > `next-intl` `usePathname` yerel yolu değil **iç şablonu** döndürür (`/services/[slug]`) — karşılaştırmalar
    > kanonik yolla yapılır. Dil değiştirici URL slug'ını önce kimliğe çevirir.
    > Yayındaki bir slug değişirse eski slug için `next.config.ts`'e ayrıca yönlendirme ekleyin.
  - **İçerik içi linkler**: blog/hukuki MDX'te yeni yerel adresler yazılır (eski adresler yönlendirilir ama gereksiz 308).
  - **Menü**: "Hizmetler" açılır paneli (18 hizmet + öne çıkan çözümler + Tüm çözümler / Sektörler). Mobil sıra:
    Hizmetler ▸ → Projeler → Fiyatlar → Çözümler ▸ → Sektörler → Blog → SSS → Hakkında.
- **Büyüme sayfaları** (2026-09-15, plan: `piton-plans/growth-pages-plan.md`):
  - **Şehir sayfaları** `/bolgeler` + `/web-tasarim/[slug]` (en/ru `/locations`, `/web-design/[slug]`) — 10 şehir,
    yapı `src/lib/locations.ts`, metin `messages → locationItems`. Projesi olmayan şehirde uzaktan hizmet
    dürüstçe yazılır; **yerel ofis/müşteri/rakam uydurulmaz**, başka şehirdeki proje "referans" diye çerçevelenir.
  - **Çözüm sayfaları** (hizmet × sektör) `/cozumler` + `/cozumler/[slug]` — 12 kombinasyon, `src/lib/solutions.ts`,
    `messages → solutionItems`. Sektör sayfası "<sektör> web sitesi" niyetini hedefler; çözüm sayfası aynı metni tekrar etmez.
  - İkisi de ortak `src/components/landing-view.tsx` + `src/lib/landing.ts` kullanır (anahtar sözleşmesi `sectorItems` ile aynı).
  - **Vaka çalışmaları**: `works.{slug}.caseStudy` {challenge, solution, highlights[], stack[], outcome} — 6 proje,
    repolardan doğrulanmış, **rakamsız**; metinde dosya yolu / fonksiyon adı gibi kod ifadesi olmaz.
  - **Dile özel 404**: `[locale]/not-found.tsx` + `[locale]/[...rest]/page.tsx`. `Link` istemci bileşeni olduğu için
    404 `NextIntlClientProvider` ile sarılı olmalı.
  - `pnpm content:check` artık locationItems, solutionItems ve (tr'de varsa) caseStudy'yi de denetler.
  - **İç linkleme**: footer'da "Keşfet" satırı (10 şehir + `FOOTER_SOLUTIONS`; kısa adlar `common.cities` /
    `common.solutionsShort`). Sektör, hizmet ve proje detay sayfalarında ortak `RelatedSolutions` bloğu —
    `getSolutionsBySector/ByService/ByWork` (`src/lib/solutions.ts`), başlıklar sunucuda çözülür.
    Yeni şehir veya çözüm eklenirse footer kısa adı 3 dilde `common` altına da eklenmeli.
  > **Paralel ajan kuralı**: içerik ajanları repoda yalnızca kendi çıktı dosyasına yazar, **git komutu çalıştırmaz**.
  > 2026-09-15'te bir ajan başka ajanların değişikliklerini "izinsiz" sanıp `git stash` + dosya taşıma yaptı;
  > ayrıca dev server stash sırasında derlediği CSS'i `.next` önbelleğinde tuttu (çözüm: `.next` silip yeniden başlat).
- **Hukuki sayfalar** (2026-09-14): Gizlilik Politikası ve KVKK Aydınlatma Metni (`/gizlilik-politikasi`),
  Çerez Politikası (`/cerez-politikasi`), Kullanım Koşulları (`/kullanim-kosullari`); en/ru: `/privacy`,
  `/cookies`, `/terms`. Metinler `content/legal/{tr,en,ru}/*.mdx` — **Türkçe metin esastır**, en/ru çeviridir.
  Veri sorumlusu, adres, e-posta, saklama süresi ve güncelleme tarihi yalnızca `src/lib/legal.ts`'te;
  MDX'e `<ControllerCard />`, `<LegalEmail />` vb. component'lerle gelir.
  > `LEGAL_READY` (ad + adres dolu) değilse sayfalar 404, footer linkleri / form notu / sitemap girdileri gizli.
  >
  > **Sitede tek çerez `NEXT_LOCALE`** (next-intl, oturum çerezi, yalnızca tarayıcı dilinden farklı dil
  > açılınca). Analytics/Speed Insights çerezsiz. Yeni çerez, izleme pikseli, harici script veya
  > üçüncü taraf servis eklenirse **çerez politikası + gizlilik metni (3 dil) + `LEGAL.updated`**
  > birlikte güncellenmeli; zorunlu olmayan çerez eklenirse onay banner'ı gerekir.
- **Ceviriler**: 429/429 eksiksiz (works 50, stories 6, servicesList 12, faqItems 75 × 3 dil).
  `pnpm content:check` ile dogrulanir — **her yeni icerikten sonra calistirin**, eksik varsa exit 1.
- **E-posta altyapisi (2026-09-15)**: gelen kutusu `hi@pitonstudios.com` (Zoho Mail, AB veri merkezi;
  MX `mx.zoho.eu`). Form gonderimi Resend ile — `pitonstudios.com` Resend'te dogrulandi (`send.` alt alan adi).
  Vercel env: `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL` (hedef `hi@pitonstudios.com`), `CONTACT_FROM_EMAIL`.
  `NEXT_PUBLIC_SITE_URL` gerekmiyor (canonical zaten www.pitonstudios.com). Bekleyen: proje tarihleri duzeltilecek.

### Sprint 1 tamamlandi (2026-07-28) — SEO + Blog + Analytics

- **SEO altyapisi**: `src/app/sitemap.ts` (267 URL, 3 dil, hreflang'li), `src/app/robots.ts`,
  tum sayfalarda canonical + hreflang + x-default (`src/lib/seo.ts`)
- **JSON-LD**: Organization, WebSite, BreadcrumbList, CreativeWork (proje), Service + **FAQPage**
  (hizmet sayfalarindaki mevcut FAQ verisi rich snippet'e donustu)
- **Cok dilli metadata duzeltmesi**: proje/hizmet detay sayfalari `data.ts`'teki Turkce sabitler
  yerine `src/messages/*.json` cevirilerinden okuyor (`src/lib/content-i18n.ts`) — en/ru sayfalari
  artik Turkce baslikla indexlenmiyor
- **Dinamik OG gorselleri**: `src/lib/og.tsx` + proje/hizmet/blog icin `opengraph-image.tsx`
- **Blog**: MDX tabanli, `content/blog/{tr,en,ru}/*.mdx`. Liste, yazi, etiket sayfalari + RSS
  (`/[locale]/rss.xml`). `translationKey` frontmatter alani diller arasi hreflang'i kuruyor.
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`
- Build: 506 statik sayfa, 0 tip hatasi, 0 lint hatasi

> **Vercel'de `NEXT_PUBLIC_SITE_URL` ayarlanmali** — yoksa sitemap/canonical/OG URL'leri
> localhost veya deploy URL'i olarak uretilir.

### Sprint 2 GERI ALINDI (2026-07-29) — Neon kullanilmayacak

Panel kurulmayinca Neon'un tek mesru kullanimi iletisim formu lead'leri kaliyordu;
onlar da Resend ile dogrudan e-postaya gidecek. Ikinci bir depo bakim yuku olusturmuyor.

Kaldirilanlar: `src/lib/db/`, `src/lib/content/`, `drizzle/`, `drizzle.config.ts`,
`scripts/migrate-content.ts`, `scripts/export-content.ts`,
drizzle-orm / drizzle-kit / @neondatabase/serverless bagimliliklari.
Kod git gecmisinde `61b0d2a` commit'inde duruyor.

**Korunan**: `pnpm content:check` → `scripts/check-translations.ts`.
Artik tamamen statik calisiyor (data.ts + messages/*.json). Iki eksik story
cevirisini bulan seydi; yeni icerik ekledikten sonra calistirin.
Eksik ceviri varsa 1 ile cikar — CI'a baglanabilir.

### Gorsel hatasi duzeltildi (2026-07-29)

`public/assets/optimized/` gitignore'daydi ve `src/lib/media.ts` oraya isaret ediyordu.
10 dosya (876 KB) repoya hic girmiyordu; **62 proje sayfasinin 35'i** production'da
hero gorseli olmadan yayindaydi (29 preview'siz work + 6 story), ayrica /projeler
hero arka plani, reel ve case-study sahneleri.

Cozum: dosyalar repoya alindi. Blob bu olcek icin (876 KB) gereksiz karmasiklik olurdu;
Blob store'undan da vazgecildi (2026-07-29) — kodda hic kullanilmamisti.
Gorseller repoda tutuluyor.

### Icerik uretimi tamamlandi (2026-08-08) — Session 10

Blog 2 yazidan **8 yaziya** cikti (× 3 dil = 24 MDX). Uretilen yazilar:
`seo-to-geo`, `website-cost`, `ai-automation-roi`, `nextjs-vs-wordpress`,
`multilingual-site`, `ecommerce-cro`.

Altyapi tarafinda MDX grafik component'leri, otomatik icindekiler tablosu ve
frontmatter `faq` → FAQPage JSON-LD eklendi (detay yukarida "Blog" maddesinde).
Icerik ici 81 ic link sitemap'e karsi dogrulandi. Statik sayfa 476 → 525.

> **Yeni yazi eklerken**: `translationKey` zorunlu, TOC otomatik (elle yazmayin),
> `faq` opsiyonel ama SSS bolumu + JSON-LD uretir. Grafiklerde `max` degeri veriden
> kucuk olamaz (component kelepceliyor ama veriyi dogru vermek yine de gerekir).
> Yazilardaki sayilar **senaryo modeli / gosterge banti** olarak isaretli.
>
> **Fiyatlandirma (2026-08-08 guncellendi)**: TR yazilari **TL**, en/ru yazilari **euro**
> gosterir; donusum **1 € = 45 ₺**. Bantlar: sablon/WordPress tanitim 10.000-30.000 ₺,
> ozel tasarim kurumsal 35.000-120.000 ₺, e-ticaret 40.000-200.000 ₺, ozel web uygulamasi
> 150.000 ₺+. AI otomasyon ROI senaryosu 250 ₺/saat is gucu maliyeti + 70.000 ₺ kurulum
> uzerine kurulu. Fiyat degisirse **5 yazi × 3 dil** birlikte guncellenmeli:
> maliyet, ai-otomasyon-roi, nextjs-vs-wordpress, cok-dilli-site, e-ticaret-cro.
>
> ⚠️ OG gorselleri Satori ile uretiliyor ve **`₺` glifi dinamik fontta yok** — frontmatter
> `description` alaninda `₺` kullanmayin, "TL" yazin (gövde metninde `₺` sorunsuz).

## Mimari — guncel

Site **tamamen statik**. Veritabani yok, auth yok, panel yok.
- Icerik: `src/lib/data.ts` + `src/messages/{tr,en,ru}.json` (elle duzenlenir)
- Blog: `content/blog/{tr,en,ru}/*.mdx`
- Gorseller: `public/assets/` (repoda; harici depolama yok)
- Tek dinamik parca: iletisim formu → `/api/contact` → Resend e-posta

Harici bagimliliklar: Vercel (deploy + analytics) ve Resend. Baska yok.

### Iletisim formu (2026-07-29)

**Onceki hali sahteydi**: `contact.tsx` 1.2 sn bekleyip "✓ Gonderildi" yaziyordu,
hicbir yere hicbir sey gondermiyordu. Ziyaretci ulastigini saniyordu.

Simdi `/api/contact` (nodejs runtime):
- zod dogrulama, bal kupu (honeypot), IP basina 10 dk / 3 gonderim
- Hiz siniri dogrulamadan SONRA sayilir — e-postasini yanlis yazan kullanici kilitlenmesin
- Bal kupu dolu ise 200 ok:true doner ama e-posta gonderilmez (bota sinyal verilmez)
- Bildirim `CONTACT_NOTIFY_EMAIL` adresine (varsayilan `hi@pitonstudios.com`), `replyTo` gonderenin adresi
- `RESEND_API_KEY` yoksa **acik hata** doner ve kullaniciya dogrudan e-posta adresi
  gosterilir — sessizce yutulmaz

**Ziyaretciye otomatik yanit** yalnizca `CONTACT_FROM_EMAIL` ayarliysa gonderilir.
Resend'te dogrulanmis alan adi olmadan `onboarding@resend.dev` SADECE Resend hesabinin
sahibine gonderebilir — `pitonstudios.com` dogrulandigi icin `CONTACT_FROM_EMAIL` artik bu alan adindan olmali.
> Gelen kutusu veya gonderim saglayicisi degisirse gizlilik metnindeki aktarim tablosu (3 dil) ve
> `LEGAL.updated` birlikte guncellenmeli.

### E-posta sablonlari (2026-09-15)

`src/lib/email/layout.ts` ortak iskelet ve parcalar (tablo tabanli, satir ici stil, 600px;
marka: koyu serit + `#B71727` vurgu). `contact.ts`: ekibe bildirim (TR) + ziyaretciye otomatik
yanit (tr/en/ru, `replyTo` gelen kutusu). `campaign.ts`: firmalara kampanya/bulten sablonu.
Her sablon `{ subject, html, text }` doner — duz metin surumunu birakmayin (teslim edilebilirlik).
Onizleme: `pnpm dev` → `/api/email-preview` (production'da 404). Logo `public/email/logo.png`
(e-posta istemcileri webp gostermez).

> **Kampanya gonderirken**: 6563 sayili Kanun geregi abonelikten cikma linki ve gonderen kimligi
> zorunlu; tacir/esnafa gonderimde de IYS kaydi gerekir. Ret linki sablondan kaldirilmaz
> (varsayilan Resend Broadcasts yer tutucusu `{{{RESEND_UNSUBSCRIBE_URL}}}`). Icerikte uydurma
> rakam/musteri yok — kurallar hizmet metinleriyle ayni.

### Donusum olcumu (2026-09-19)

- `conversion-tracker.tsx` (layout'ta): `wa.me`, `tel:`, `mailto:` linklerini belge dinleyicisiyle yakalar —
  yeni iletisim linki eklerken ayrica isaretlemeye gerek yok. Olaylara kisisel veri yazilmaz.

### Hizmet sayfasi gorselleri (2026-09-19)

- `src/components/service-visuals/`: `kit.tsx` (tek palet + parcalar), `art/<slug>.tsx` (18 SVG hero sahnesi,
  `next/dynamic` ile hizmet basina ayri chunk), `flows.ts` + `service-flow.tsx` ("Nasil calisir" diyagrami).
  Metinler `serviceVisuals.<slug>` (alt, flow.title/caption/nodes) — `pnpm content:check` denetler.
- Kurallar: sahnede **kelime/rakam yok**, yalnizca kit renkleri/filtreleri; hareket yalnizca `sv-flow`/`sv-pulse`/
  `sv-float` siniflariyla (reduced-motion'da durur). `sv-float`, `transform` niteligi olan `<g>`'ye konmaz
  (CSS transform ezer). Gorseller yalnizca hizmet detayinda — menude/listelerde yok (kullanici karari).
- Yeni hizmet eklenirse: sahne + `flows.ts` girdisi + 3 dilde `serviceVisuals` + `index.tsx` haritasi.

### SEO kurallari (2026-09-15 denetimi)

- `buildPageMetadata` baslik ekini (" — Piton Studios") yalnizca 60 karakteri asmiyorsa ekler,
  aciklamayi 160'ta keser ve varsayilan OG gorselini (`[locale]/opengraph-image`) acikca yazar.
  Kendi `opengraph-image.tsx` dosyasi olan rotada **`ownOgImage: true` zorunlu** — config gorseli
  dosya tabanli gorseli ezer.
- Dile ozgu, diger dillerde karsiligi olmayan sayfalar (blog etiketleri) `selfOnlyAlternates: true`.
- Blog MDX ic linkleri dil onekli yazilir (`/tr/blog/...`); oneksiz link 307 ile yanlis dile duser.
- Denetim scriptleri oturum scratchpad'indeydi (sitemap tarama + rapor); tekrar gerekirse
  sitemap'teki tum URL'lerde durum, canonical, hreflang karsiliklilik, baslik/aciklama uzunlugu,
  H1, og:image, JSON-LD ve ic link kontrolu yapin.

> Her yeni session'da `piton-tasks/task-index.md` oku veya `/cold-start` calistir.

---

## Workspace

```
src/
├── app/              → Next.js App Router (pages, layouts, API routes)
├── components/       → React componentleri (scenes/, mdx/, projects-v2/ ...)
├── lib/              → Veri + yardimcilar (data, sectors, locations, solutions, landing, seo, blog, faq, legal)
├── messages/         → tr/en/ru ceviri JSON'lari
└── i18n/             → next-intl routing (lokalize path'ler)
content/              → blog + hukuki MDX (tr/en/ru)
public/assets/        → Gorseller (repoda)
```

## Temel Komutlar

```bash
pnpm dev                    # Dev server (localhost:3000)
pnpm build                  # Production build
pnpm start                  # Production server
pnpm lint                   # ESLint
pnpm typecheck              # TypeScript check
```

---

## Code Conventions (Kisa)

- **TypeScript**: strict, `any` yasak
- **Dosya**: `kebab-case`, `.tsx` componentler, `.ts` utilities
- **Component**: Server Components default, `'use client'` sadece gerekince
- **Commit**: `feat(TASK-XXX): aciklama` (Claude attribution satiri eklenmez)

Detaylar → `piton-config/conventions.md`

## Parallel Agent Orchestration

Birden fazla sub-agent paralel calistirilirken:
- Her agent sadece kendi modul dizininde dosya duzenler (dizin izolasyonu)
- Paket kurulumu sadece ana agent (orchestrator) tarafindan yapilir
- Paylasilan dosyalarda retry pattern uygulanir
- Bagimli task'lar sirali, bagimsiz olanlar paralel calistirilir

Detaylar → `piton-config/agent-instructions.md`

---

## Referans Dizinleri

| Dizin | Icerik |
|-------|--------|
| `piton-tasks/` | Task takip — dashboard + tum task'lar |
| `piton-tasks/task-index.md` | Master task listesi |
| `piton-tasks/phases/` | Phase bazli detayli task aciklamalari |
| `piton-tasks/active/session-notes.md` | Session notlari |
| `piton-config/workflow.md` | Task workflow kurallari |
| `piton-config/conventions.md` | Kod standartlari |
| `piton-config/tech-stack.md` | Teknolojiler + versiyonlar |
| `piton-config/agent-instructions.md` | Sub-agent sorumluluklari |
| `piton-docs/MEMORY.md` | Kalici hafiza |
| `piton-docs/CHANGELOG.md` | Degisiklik kaydi |
| `piton-plans/` | Uygulama planlari |

---

## Hooks (Otomatik Kurallar)

| Hook | Tetikleyici | Ne yapar |
|------|------------|----------|
| `protect-files.sh` | PreToolUse (Edit/Write) | .env, lock files, .git/ duzenlemeyi bloklar |

---

## Notlar

- Hafiza dosyasi `piton-docs/MEMORY.md`'de — her session'da oku, gerektiginde guncelle
- Gorseller `public/assets/` altinda; `optimized/` gitignore'da (buyuk dosyalar)
- 2026-07-28: `videos/` klasoru (289MB, 17 dosya) silindi — kodda hicbir referansi yoktu,
  site screenshot tabanli calisiyor
