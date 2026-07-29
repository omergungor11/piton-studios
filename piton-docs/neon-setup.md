# Neon Kurulumu — Sprint 2

Kod tarafı hazır. Aşağıdaki adımlar bir kez yapılır, ~10 dakika sürer.

## 1. Neon projesi oluştur

1. [neon.com](https://neon.com) → ücretsiz hesap
2. **New Project**
   - İsim: `piton-studios`
   - Postgres sürümü: varsayılan
   - Bölge: `AWS eu-central-1 (Frankfurt)` — Türkiye'ye en yakın, en düşük gecikme
3. Proje açıldıktan sonra **Connection string** → **Direct connection** (pooled değil)

Ücretsiz katman: 0.5 GB depolama, 100 CU-saat/ay, 5 GB egress, 10 branch.
Bu proje için metin içeriği ~5 MB — limitin çok altında.

## 2. Bağlantıyı ekle

`.env.local` dosyasına:

```bash
DATABASE_URL=postgresql://...   # Neon'dan kopyaladığın direct connection string
CONTENT_SOURCE=static           # Göç doğrulanana kadar static kalsın
```

## 3. Şemayı oluştur

```bash
pnpm db:migrate
```

`drizzle/0000_initial_schema.sql` çalışır — 8 tablo, 6 enum tipi kurulur.

## 4. İçeriği taşı

```bash
pnpm content:migrate --dry   # Önce ne olacağını gör (DB'ye yazmaz)
pnpm content:migrate         # Gerçek göç
```

Beklenen çıktı: 62 proje, 186 proje çevirisi, 15 hizmet, 45 hizmet çevirisi, 0 eksik çeviri.

## 5. Göçü doğrula

```bash
pnpm content:check
```

Statik kaynak ile DB'yi alan alan karşılaştırır. **"Fark yok"** çıkmadan bir sonraki adıma geçme.

## 6. DB kaynağına geç

`.env.local`:

```bash
CONTENT_SOURCE=db
```

```bash
pnpm build   # 506 sayfa yine üretilmeli
```

Sorun çıkarsa `CONTENT_SOURCE=static` yaz, anında eski davranışa döner.

## 7. Vercel

Environment variables:

| Değişken | Değer |
|---|---|
| `DATABASE_URL` | Neon direct connection string |
| `CONTENT_SOURCE` | `static` (doğrulanana kadar), sonra `db` |
| `NEXT_PUBLIC_SITE_URL` | Production domain — **hâlâ ayarlanmadı** |

## Faydalı komutlar

| Komut | Ne yapar |
|---|---|
| `pnpm db:generate` | Şema değişikliğinden yeni migration üretir |
| `pnpm db:migrate` | Bekleyen migration'ları uygular |
| `pnpm db:studio` | Tarayıcıda DB gezgini açar |
| `pnpm content:migrate` | data.ts + messages → Neon (idempotent) |
| `pnpm content:check` | Statik ↔ DB denklik kontrolü |
| `pnpm content:export` | **Acil durum**: Neon → data.ts formatı |

## Geri dönüş planı

Neon tarafında bir sorun çıkarsa:

```bash
pnpm content:export          # ./content-export/ altına yazar
CONTENT_SOURCE=static        # .env.local
```

`content-export/data.generated.ts` ve `*.partial.json` dosyaları `src/` üzerine
otomatik yazılmaz — karşılaştırıp elle taşınır.

## Mimari kural

> **Veritabanı build-time kaynağıdır, request-time bağımlılığı değil.**

Public sayfalar statik üretilir; DB'ye yalnızca build sırasında ve admin bir içeriği
kaydettiğinde (on-demand `revalidatePath`) dokunulur. Ziyaretçi trafiği DB'yi uyandırmaz —
Neon'un 5 dakikalık uyku davranışı bu mimaride sorun değil, avantajdır.
