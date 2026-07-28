# Piton Studios — Blog + Admin Panel + Platform Geliştirme Planı

**Tarih:** 2026-07-28
**Statü:** Onay bekliyor
**Kapsam:** Blog (MDX), tam CMS admin paneli, veritabanı göçü (Supabase → Neon), medya altyapısı (R2), iletişim formu + lead yönetimi, SEO, analytics, i18n refaktörü

---

## 1. Mevcut Durum — Mimari Tespit

Plan yazmadan önce kod tabanını taradım. Kritik bulgular:

| Alan | Durum | Sonuç |
|---|---|---|
| **İçerik kaynağı** | `src/lib/data.ts` (1.880 satır) — 56 proje + hizmetler + story'ler hardcoded | Admin panel için DB'ye taşınmalı |
| **Çeviriler** | `src/messages/{tr,en,ru}.json` — 100KB / 106KB / 151KB monolitik | Her yeni proje = 3 dosyada elle düzenleme. Ana teknik borç. |
| **Supabase** | 3 migration dosyası var (`supabase/migrations/`) ama **`@supabase/supabase-js` bağımlılık olarak kurulu değil** | Migration'lar hiç çalıştırılmamış. Vendor değişimi **sıfır maliyetli** — atılacak kod yok. |
| **`src/app/admin/`** | Dizin var, **tamamen boş** | Temiz sayfa |
| **`src/middleware.ts`** | matcher: `['/', '/(tr|en|ru)/:path*']` | `/admin` middleware kapsamı **dışında** — auth guard eklenirken matcher değişmeli |
| **SEO** | `sitemap.ts` yok, `robots.txt` yok, hreflang yok, JSON-LD yok, dinamik OG yok | 56 proje + 15 hizmet sayfası arama motorunda görünmüyor |
| **İletişim** | Sadece `mailto:` linki (`contact/page-client.tsx:36`) | Gerçek form + lead kaydı yok, dönüşüm ölçülemiyor |
| **Videolar** | `videos/` 289MB, **gitignore'da**; `src/` içinde **tek bir `.mp4` referansı yok** | Site artık screenshot tabanlı. `CLAUDE.md`'deki "video portfolyo" tanımı güncel değil. 289MB ölü ağırlık. |
| **Analytics** | Yok | Trafik/dönüşüm körlüğü |

**Önemli çıkarım:** Supabase'e hiç bağlanılmamış olması bir şans. Vendor seçimini sıfırdan, doğru kriterlerle yapabiliyoruz.

---

## 2. Vendor Kararı — Supabase Yerine Ne?

Supabase limitiniz dolduğu için ücretsiz katmanları doğruladım (28 Temmuz 2026 itibarıyla resmi fiyatlandırma sayfalarından):

### 2.1 Veritabanı: **Neon Postgres** ✅

| Limit | Ücretsiz katman |
|---|---|
| Depolama | 0.5 GB / proje |
| Compute | 100 CU-saat / ay |
| Egress | 5 GB / ay |
| Proje sayısı | 100 |
| Branch | 10 / proje |
| Otomatik uyku | 5 dk hareketsizlikten sonra |

**Neden Neon:**
- Postgres — mevcut `supabase/migrations/*.sql` şemaları neredeyse birebir taşınabilir, SQL bilgisi çöpe gitmez.
- `@neondatabase/serverless` HTTP driver — Vercel serverless/edge ile connection pooling derdi yok.
- Veritabanı branch'leri: preview deploy'lar için izole DB kopyası (`main` branch verisinden fork).
- Vercel ile birinci sınıf entegrasyon.

**Kritik tasarım kısıtı:** 0.5 GB ve 100 CU-saat cömert değil. Bu yüzden mimarinin temel kuralı:

> **Veritabanı bir _build-time_ kaynağıdır, _request-time_ bağımlılığı değil.**

Public sayfalar tamamen statik üretilir; DB'ye yalnızca build sırasında ve admin bir içeriği kaydettiğinde (on-demand `revalidatePath`) dokunulur. Ziyaretçi trafiği DB'yi hiç uyandırmaz. Bu sayede:
- 100 CU-saat pratikte **tükenmez** (sadece admin oturumları + build'ler),
- sitenin mevcut hızı birebir korunur,
- Neon'un 5 dk'da uykuya dalması bir sorun değil, **avantaj** olur.

Tek istisna: iletişim formu POST'u (saniyeler süren tek INSERT) ve admin paneli.

**Değerlendirilen alternatifler:**
- **Cloudflare D1** (5 GB ücretsiz): daha cömert ama SQLite — Postgres array/JSONB tipleri ve mevcut şema kaybolur, Vercel'den erişim dolaylı.
- **Turso**: iyi ücretsiz katman, yine SQLite; ücretsiz plan koşulları son dönemde sık değişti.
- **MongoDB Atlas** (512 MB): şema tipi tamamen değişir, ilişkisel içerik modeli için gereksiz sürtünme.
- **PlanetScale**: ücretsiz katman kaldırıldı.

### 2.2 Medya Depolama: **Cloudflare R2** ✅

| Limit | Ücretsiz katman |
|---|---|
| Depolama | 10 GB / ay |
| Class A (yazma) | 1M istek / ay |
| Class B (okuma) | 10M istek / ay |
| **Egress** | **Ücretsiz (sınırsız)** |

S3 uyumlu API → `@aws-sdk/client-s3` ile çalışır. Sıfır egress maliyeti, görsel/video ağırlıklı bir portfolyo sitesi için belirleyici. Neon'un 5 GB egress'ini medya ile harcamamak için medya **asla** DB'den geçmez.

### 2.3 Auth: **Auth.js v5 (NextAuth) + Credentials** ✅

Tek admin kullanıcısı için harici bir auth servisine bağlanmak gereksiz bağımlılık. `admin_users` tablosu + `bcrypt` hash + JWT session + middleware guard yeterli, taşınabilir ve ücretsiz.
_(Alternatif: Neon Auth 60k MAU'ya kadar ücretsiz — ekip büyürse geçiş yapılabilir.)_

### 2.4 E-posta: **Resend** — ücretsiz 3.000 e-posta/ay, iletişim formu bildirimleri için yeterli.

### 2.5 Analytics: **Vercel Analytics + Speed Insights** — Hobby planında ücretsiz, sıfır kurulum, kendi `page_views` tablomuzu yazmaktan çok daha ucuz (DB CU'su yakmaz).

**Toplam aylık maliyet: 0 ₺.**

---

## 3. Çözülmesi Gereken Bir Çelişki: MDX Blog + "Tam CMS"

Seçimleriniz iki yönde çekiyor:
- Blog için **MDX dosyaları** (repo içi, git ile versiyonlu)
- Admin panel için **tam CMS** (blog dahil)

MDX dosyaları veritabanında değil repoda yaşar; dolayısıyla admin panel bir MDX yazısını "kaydedemez" — ancak GitHub Contents API üzerinden commit atarak yapabilir.

**Önerim — aşamalı çözüm:**

| Aşama | Blog yazma yöntemi |
|---|---|
| **Sprint 1 (şimdi)** | Saf MDX: editörde yaz → commit → push → Vercel deploy. Sıfır ek karmaşıklık, en hızlı sayfa, git geçmişi. |
| **Sprint 5 (opsiyonel)** | Admin panelde MDX editörü: yazıyı düzenle → GitHub Contents API ile commit → otomatik deploy. Panel deneyimi + git avantajı birlikte. |

Böylece blog gücünü hemen alırsınız; panel editörü gerçekten ihtiyaç duyulursa eklenir. Admin panelin **tam CMS** kısmı (projeler, hizmetler, medya, mesajlar) baştan itibaren DB üzerinden tam kapsamlı çalışır — asıl acı veren nokta zaten orası (56 proje × 3 dil elle JSON düzenleme).

Bu ayrımı kabul etmiyorsanız alternatif: blog da DB'ye alınır, MDX bırakılır. Söyleyin, planı ona göre revize ederim.

---

## 4. Hedef Mimari

```
┌──────────────────────────────────────────────────────────────┐
│                        VERCEL (Next.js 16)                   │
│                                                              │
│  PUBLIC (tamamen statik / ISR)          ADMIN (dinamik)      │
│  ├─ /[locale]/                          ├─ /admin/login      │
│  ├─ /[locale]/projeler/[slug]           ├─ /admin            │
│  ├─ /[locale]/hizmetler/[slug]          ├─ /admin/projects   │
│  ├─ /[locale]/blog/[slug]  ◄── MDX      ├─ /admin/services   │
│  ├─ /[locale]/hakkinda                  ├─ /admin/media      │
│  ├─ /[locale]/iletisim                  ├─ /admin/messages   │
│  ├─ /sitemap.xml, /robots.txt           └─ /admin/settings   │
│  └─ /rss.xml                                                 │
│                                                              │
│  middleware: next-intl (public) + auth guard (/admin)        │
└────────┬──────────────────────────┬──────────────┬───────────┘
         │ build-time + on-demand   │ upload       │ e-posta
         │ revalidate               │              │
    ┌────▼─────┐              ┌─────▼─────┐   ┌────▼────┐
    │   NEON   │              │ CLOUDFLARE│   │ RESEND  │
    │ Postgres │              │    R2     │   │         │
    │ +Drizzle │              │  (medya)  │   │         │
    └──────────┘              └───────────┘   └─────────┘

    content/blog/{tr,en,ru}/*.mdx  ──► build-time okunur (git)
```

### 4.1 Veri Modeli (Neon / Drizzle)

İçerik ve çeviri **ayrıştırılmış** — mevcut i18n borcunun kök nedeni bu ayrımın olmaması.

```
projects                        project_translations
├─ id (uuid, pk)                ├─ project_id (fk) ─┐
├─ slug (unique)                ├─ locale ──────────┤ composite pk
├─ type ('work'|'story')        ├─ title            │
├─ year, client, kind           ├─ summary          │
├─ role_key, collaborator       ├─ scope            │
├─ tags (text[])                ├─ role             │
├─ external_url                 ├─ body (text[])    │
├─ cover_media_id (fk)          └─ status ('missing'|'draft'|'done')
├─ previews (jsonb)
├─ sort_order, is_featured
├─ is_published
└─ created_at, updated_at

services / service_translations   → aynı desen
                                    (features, process, stats, faq → jsonb)

media_assets                    contact_messages
├─ id, r2_key, public_url       ├─ id, name, email, phone
├─ kind ('image'|'video')       ├─ service, message, locale
├─ width, height, size_bytes    ├─ status ('new'|'read'|'replied'|'archived')
├─ alt_text (jsonb: per-locale) ├─ source, referrer, ip_hash
└─ project_id (fk, nullable)    └─ created_at

admin_users                     audit_log
├─ id, email, password_hash     ├─ id, actor_id, action
├─ role ('owner'|'editor')      ├─ entity, entity_id
└─ last_login_at                ├─ diff (jsonb)
                                └─ created_at
```

**Tasarım gerekçeleri:**
- `project_translations.status` → admin panelde "ru çevirisi eksik" rozeti. Çeviri borcu bir daha sessizce birikmez.
- `media_assets` ayrı tablo → aynı görsel birden çok yerde kullanılabilir, yetim dosya taraması yapılabilir.
- `audit_log` → tek kişilik ekipte bile "bunu ne zaman değiştirdim" sorusunun cevabı.
- Blog **bu şemada yok** (MDX). İleride sadece `post_metrics` gerekirse eklenir.

### 4.2 Blog — MDX Yapısı

```
content/blog/
├─ tr/hizli-web-sitesi-nasil-yapilir.mdx
├─ en/how-to-build-a-fast-website.mdx
└─ ru/kak-sozdat-bystryy-sayt.mdx
```

Frontmatter sözleşmesi:
```yaml
---
title: "Hızlı web sitesi nasıl yapılır"
description: "..."                 # meta description + OG
date: 2026-08-01
updated: 2026-08-05
tags: ["performans", "next.js"]
cover: "/assets/blog/hizli-site.webp"
author: "Ömer Güngör"
draft: false
translationKey: "fast-website"     # diller arası eşleme + hreflang
---
```

- `translationKey` üç dildeki aynı yazıyı bağlar → doğru `hreflang` ve dil değiştirici davranışı.
- Rotalar: `/[locale]/blog`, `/[locale]/blog/[slug]`, `/[locale]/blog/etiket/[tag]`
- `routing.pathnames`'e eklenir (tr: `/blog`, en: `/blog`, ru: `/blog`).
- Pipeline: `gray-matter` + `next-mdx-remote/rsc` + `remark-gfm` + `rehype-pretty-code` (kod blokları) + `reading-time`.
- RSS: `/rss.xml` (dil başına `/[locale]/rss.xml`).
- `draft: true` → sadece `NODE_ENV=development` ve admin preview'da görünür.

---

## 5. Uygulama Planı — 5 Sprint

Sıralama **bağımlılığa göre değil, değere göre** kurgulandı: DB gerektirmeyen ve hemen kazanç veren işler önde.

### Sprint 1 — Hızlı Kazanç: SEO + Blog + Analytics ✅ TAMAMLANDI (2026-07-28)
_DB bağımlılığı yok, tek başına deploy edilebilir._

> Ek olarak plan dışında bir hata düzeltildi: proje ve hizmet detay sayfalarının metadata'sı
> `data.ts`'teki Türkçe sabitlerden okunuyordu — `en`/`ru` sayfaları Türkçe başlık ve açıklamayla
> indeksleniyordu. `src/lib/content-i18n.ts` ile çeviri dosyalarından okunacak şekilde düzeltildi.

| # | İş | Çıktı |
|---|---|---|
| 1.1 | `app/sitemap.ts` — 3 dil × (statik rotalar + 56 proje + 15 hizmet + blog) | ~250 URL indexlenebilir |
| 1.2 | `app/robots.ts` | Crawl kontrolü |
| 1.3 | Tüm sayfalara `alternates.languages` (hreflang) | Çok dilli SEO'nun eksik yarısı tamamlanır |
| 1.4 | JSON-LD: `Organization` (root), `BreadcrumbList`, proje detayda `CreativeWork`, hizmet detayda `Service` + `FAQPage` | Hizmet sayfalarında **zaten FAQ verisi var** — rich snippet'e dönüşür |
| 1.5 | Dinamik OG görselleri (`opengraph-image.tsx`, `next/og`) | Paylaşımlarda marka görünürlüğü |
| 1.6 | MDX pipeline + blog rotaları + etiket sayfaları + RSS | Blog yayında |
| 1.7 | 3 dilde 1'er örnek yazı (iskelet + yazım rehberi) | İçerik üretimi başlayabilir |
| 1.8 | `@vercel/analytics` + `@vercel/speed-insights` | Trafik/CWV görünürlüğü |

**Risk:** Düşük. Mevcut sayfalara dokunulmuyor, sadece ekleme yapılıyor.

---

### Sprint 2 — Veri Temeli: Neon + Şema + Göç
_~4 gün_

| # | İş | Çıktı |
|---|---|---|
| 2.1 | Neon projesi, `main` + `preview` branch'leri, env değişkenleri | `DATABASE_URL` |
| 2.2 | Drizzle kurulumu (`drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`) | Tip güvenli sorgu katmanı |
| 2.3 | Şema tanımları (Bölüm 4.1) + ilk migration | Tablolar canlı |
| 2.4 | **Göç script'i** `scripts/migrate-content.ts`: `data.ts` + 3 JSON → Neon (slug bazında idempotent) | 56 proje + hizmetler DB'de, çevirileriyle |
| 2.5 | **Geri-dışa aktarım** `scripts/export-content.ts`: Neon → `data.ts` formatı | Acil durumda tek komutla statik moda dönüş |
| 2.6 | `CONTENT_SOURCE=static\|db` bayrağı + veri erişim katmanı `src/lib/content/` | Kademeli geçiş, anında rollback |
| 2.7 | `supabase/` dizinini kaldır, `.env.example`'ı güncelle | Ölü kod temizliği |

**Risk:** Orta. Azaltma: göç script'i idempotent; `data.ts` Sprint 4 sonuna kadar repoda kalır; her aşamada `pnpm build` ile 56 sayfanın üretildiği doğrulanır.

---

### Sprint 3 — Auth + Admin İskeleti
_~3 gün_

| # | İş | Çıktı |
|---|---|---|
| 3.1 | Auth.js v5, Credentials provider, `admin_users` + bcrypt | Giriş |
| 3.2 | **Middleware kompozisyonu**: next-intl (public) + auth guard (`/admin`). Mevcut matcher `/admin`'i kapsamıyor — düzeltilecek | `/admin` korunuyor |
| 3.3 | Admin layout: sidebar, breadcrumb, dark tema (site diliyle uyumlu), toast | Panel kabuğu |
| 3.4 | Dashboard: okunmamış mesaj sayısı, yayınlanmamış içerik, **eksik çeviri sayacı**, son işlemler | Tek bakışta durum |
| 3.5 | `audit_log` yazımı — tüm mutasyonlarda | İzlenebilirlik |
| 3.6 | Rate limit (login denemesi) + CSRF + güvenli cookie | Sertleştirme |

**Kritik detay:** `/admin` `[locale]` dışında kalır (tek dil: Türkçe). next-intl middleware'inin `/admin`'i yakalamaması için matcher açıkça dışlamalı.

---

### Sprint 4 — Tam CMS: İçerik + Medya + Lead
_~7 gün_

| # | İş | Çıktı |
|---|---|---|
| 4.1 | Proje CRUD: liste (filtre/sırala/sürükle-bırak sıralama), oluştur/düzenle/sil, yayınla-taslak | 56 proje panelden yönetilir |
| 4.2 | **Çeviri sekmeleri** (tr/en/ru) her proje formunda + "eksik" rozeti | Çeviri borcu görünür ve kapatılabilir |
| 4.3 | Hizmet CRUD (features/process/stats/faq için yapılandırılmış editör) | Hizmet içerikleri panelden |
| 4.4 | R2 kurulumu + presigned URL upload + `sharp` ile otomatik webp/boyutlandırma | Medya yükleme |
| 4.5 | Medya kütüphanesi: ızgara görünüm, arama, alt-text (dil bazlı), yetim dosya tespiti | Screenshot/preview yönetimi |
| 4.6 | `videos/` (289MB) → R2'ye taşıma veya arşivleme kararı | Repo/disk temizliği |
| 4.7 | Gerçek iletişim formu: zod doğrulama + honeypot + rate limit → `contact_messages` | `mailto:` yerine ölçülebilir dönüşüm |
| 4.8 | Resend ile bildirim e-postası + kullanıcıya otomatik yanıt (3 dilde) | Lead kaçmaz |
| 4.9 | Lead gelen kutusu: durum akışı (yeni→okundu→yanıtlandı→arşiv), not, CSV dışa aktarım | Satış takibi |
| 4.10 | Her mutasyonda `revalidatePath` / `revalidateTag` | Kaydet → site anında güncel |

---

### Sprint 5 — Refaktör + Opsiyoneller
_~4 gün_

| # | İş | Çıktı |
|---|---|---|
| 5.1 | i18n refaktörü: monolitik JSON'ları `src/messages/{locale}/{namespace}.json` olarak böl | 151KB'lik ru.json parçalanır |
| 5.2 | İçerik çevirileri JSON'dan tamamen DB'ye taşınır (`works`, `servicesList`, `stories` namespace'leri kalkar); JSON'da yalnızca **arayüz metinleri** kalır | Yeni proje eklemek artık 3 dosya düzenlemek değil |
| 5.3 | `data.ts` kaldırılır, `CONTENT_SOURCE` bayrağı sadeleştirilir | Tek doğruluk kaynağı |
| 5.4 | Eksik çeviri raporu + CI kontrolü (eksik çeviriyle build uyarısı) | Borç bir daha birikmez |
| 5.5 | _(Opsiyonel)_ Admin MDX blog editörü — GitHub Contents API ile commit | Panelden yazı yazma |
| 5.6 | Neon otomatik yedekleme script'i + geri yükleme tatbikatı | Veri güvenliği |

---

## 6. Yeni Bağımlılıklar

```jsonc
// Sprint 1
"gray-matter", "next-mdx-remote", "remark-gfm", "rehype-pretty-code",
"reading-time", "@vercel/analytics", "@vercel/speed-insights"

// Sprint 2
"drizzle-orm", "@neondatabase/serverless", "drizzle-kit" (dev), "zod"

// Sprint 3
"next-auth@beta" (v5), "bcryptjs"

// Sprint 4
"@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner", "sharp", "resend"
```

Hepsi Next.js 16 / React 19 uyumlu. Ağır bir eklenti yok; bundle'a giren tek şey analytics (~2KB).

---

## 7. Riskler ve Azaltma

| Risk | Etki | Azaltma |
|---|---|---|
| Neon 0.5GB / 100 CU-saat aşımı | Compute askıya alınır | DB build-time kaynağı; public trafik DB'ye dokunmaz. Metin içeriği ~5MB, medya R2'de. Gerçekçi kullanım limitin %5'i. |
| İçerik göçünde veri kaybı | Yüksek | Idempotent script + geri-dışa aktarım + `data.ts` iki sprint boyunca repoda + her adımda build doğrulaması |
| Statik siteden DB'ye geçişte hız kaybı | Orta | ISR + on-demand revalidate; sayfa üretimi build'de. Lighthouse skoru Sprint 2 öncesi/sonrası karşılaştırılır. |
| `/admin` middleware boşluğu | **Güvenlik** | Sprint 3.2'de matcher açıkça düzeltilir; korumasız route testi yazılır |
| İletişim formu spam | Orta | Honeypot + rate limit + zod. Yetmezse Cloudflare Turnstile (ücretsiz). |
| MDX blog + panel beklentisi çelişkisi | Düşük | Bölüm 3'te aşamalandırıldı, 5.5 opsiyonel |

---

## 8. Başarı Kriterleri

- [ ] `/sitemap.xml` 3 dilde ~250 URL döndürüyor, Search Console'da hatasız
- [ ] Blog 3 dilde yayında, RSS çalışıyor, Lighthouse SEO ≥ 95
- [ ] Yeni proje eklemek: **tek panel formu** (bugün: 4 dosya elle düzenleme)
- [ ] Eksik çeviri sayısı panelde görünür, hedef 0
- [ ] İletişim formu lead'leri DB'de + e-posta bildirimi ≤ 30 sn
- [ ] Public sayfa Lighthouse performans skoru göç öncesine eşit veya üstü
- [ ] Aylık altyapı maliyeti: 0 ₺
- [ ] `/admin` kimlik doğrulaması olmadan erişilemiyor (test ile doğrulanmış)

---

## 9. Toplam Efor

| Sprint | Süre | DB gerekir mi? |
|---|---|---|
| 1 — SEO + Blog + Analytics | ~5 gün | Hayır |
| 2 — Neon + şema + göç | ~4 gün | Evet |
| 3 — Auth + admin iskeleti | ~3 gün | Evet |
| 4 — Tam CMS + medya + lead | ~7 gün | Evet |
| 5 — Refaktör + opsiyoneller | ~4 gün | Evet |
| **Toplam** | **~23 gün** | |

Sprint 1 bağımsız — istenirse tek başına yapılıp deploy edilebilir, sonrası ertelenebilir.

---

## 10. Karar Bekleyen Noktalar

1. **Blog editörü:** Saf MDX yeterli mi, yoksa 5.5 (panelden GitHub commit) baştan kapsama alınsın mı?
2. **`videos/` (289MB):** Kodda hiç referans yok. R2'ye arşivlensin mi, yoksa tamamen silinsin mi?
3. **Blog URL'i:** Türkçede `/blog` mu, `/gunluk` / `/yazilar` mı?
4. **Admin dili:** Sadece Türkçe (önerim) mi, çok dilli mi?
5. **Sprint sırası:** Değer odaklı sıra (yukarıdaki) mı, yoksa önce admin panel mi?
