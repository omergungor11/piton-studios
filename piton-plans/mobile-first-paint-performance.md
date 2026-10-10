# Mobil ilk ekran performansı — TASK-115 (2026-10-10)

## Amaç ve başlangıç

Kullanıcı paralel agentlarla geliştirme, doğrulama ve push istedi. Başlangıç commit'i `7345d4e`; çalışma ağacı temiz. Canlı `/tr` Lighthouse 13.5 mobil üç koşu 94/86/95 (medyan 94); LCP 2,43 sn, Speed Index 5,48 sn, TBT 15,5 ms, CLS 0,00038. Bu ölçümler yalnız TR anasayfayı kapsar; başka CPU süreçleri ve puan dağılımı dikkate alınır. PageSpeed API 429 nedeniyle alan verisi yok.

## Paralel çalışma sınırları

- Animasyon agentı: yalnız `src/styles/mobile-first-paint.css`. Mobil üst/alt chrome gecikmelerini kaldır; hero logosu/aurora sürekli hareketini sadeleştir. Masaüstü ve bölüm reveal davranışları korunur. Orchestrator stil importunu yapar.
- CSS agentı: `src/app/globals.css`, `src/styles/page-scoped/` ve gerekli sayfa/component stil importları. Hero TSX, layout, font dosyaları ve animasyon agentının dosyası kapsam dışı. Kullanılmayan eski stilleri kanıtla; kalan sayfaya özgü stilleri doğru girişlere taşı; cascade ve client navigation korunur.
- Font agentı: yalnız `src/lib/fonts.ts` ve `src/lib/fonts/`. Türkçe/Rusça glifleri ve mevcut görünümü koruyan boyut azaltımını araştır/uygula. Latin Extended preload kaldırılmaz; paket kurulmaz, kayıp glif riski alınmaz. Kazanç kanıtlanmıyorsa değişiklik yapılmaz.
- Ana agent: hero görsel optimizasyonu, ortak layout importu, görev/raporlar, build/tarayıcı/Lighthouse, commit/push. Paket/lock/env değişikliği yok. Diğer kullanıcı süreçleri kapatılmaz.

## Kabul ve doğrulama

1. Aynı yerel üretim başlangıcında ve son build'de tekrarlı mobil Lighthouse; CSS/font/görsel bytes ve metrik dağılımları. Her adayın tamamının kazanacağı varsayılmaz.
2. Mobil üst/alt alanlar ilk çizimde görünür; masaüstü animasyonları korunur. Logo görüntü kalitesi ve TR/EN/RU tipografi kontrolü.
3. Temel sayfalar + CSS taşınan sayfalar doğrudan ve client navigation ile kontrol; mobil menü, dil, proje filtreleri/preview ve hizmet kartları. 390/430/desktop genişliklerde taşma/console hatası yok.
4. `pnpm lint`, `pnpm typecheck`, `pnpm content:check`, production build.
5. Sonuç raporu, MEMORY/CHANGELOG/session notu/task-index güncelle; uygun TASK-115 commit, main push ve Vercel gerçek proje üzerinden canlı doğrulama.

## Durum

COMPLETED (2026-10-10). Animasyon ve CSS adımları uygulandı; font adımında kayıpsız kazanç kanıtlanmadığı için değişiklik yok.

| Ölçüm (yerel üretim, Lighthouse 13.5 mobil) | Önce | Son |
|---|---|---|
| Anasayfa skor medyanı (3 koşu) | 86 | 87 |
| Anasayfa LCP medyanı | 4,18 sn | 3,97 sn |
| Hizmetler LCP (3 koşu medyanı / tek önce) | 3,77 sn | 3,70 sn |
| CSS transferi anasayfa / hizmetler / blog | 30,3 / 28,6 / 29,1 KB | 25,3 / 23,8 / 24,1 KB |
| Anasayfa görsel transferi | 42,8 KB | 38,1 KB |
| Masaüstü anasayfa skor / CLS | 98 / 0,0102 | 98 / 0,0102 |

Düzen 34/0 fark; flow, critical flow ve no-JS first-paint (11 kayıt) geçti. Lint 0 hata, typecheck, 630 çeviri, build geçti. Main push kullanıcı onayına bağlı.
