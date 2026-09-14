# Blog incelemesi ve üç yeni rehber — 5 Eylül 2026

Mevcut sistem MDX tabanlı: frontmatter, otomatik başlık çıkarımı, sunucuda grafik çizimi, ilgili yazılar, etiket sayfaları, RSS, sitemap, canonical, çeviri eşlemesine dayalı hreflang ve dinamik paylaşım görselleri bulunuyor. Yeni bir yayın altyapısı kurmak yerine bu yapıya üç Türkçe rehber eklendi. İngilizce/Rusça içerikler değişmedi.

## İçerikler

| Yazı | Dosya | Okuma | Grafik | SSS |
|---|---|---|---|---|
| Web sitesi yenileme ve SEO geçiş planı | `content/blog/tr/web-sitesi-yenileme-seo-gecis-plani.mdx` | 8 dk | 2 | 5 |
| B2B landing page ve nitelikli talep | `content/blog/tr/b2b-landing-page-teklif-toplama.mdx` | 9 dk | 2 | 5 |
| Erişilebilir web tasarımı ve formlar | `content/blog/tr/erisilebilir-web-tasarimi-form-rehberi.mdx` | 9 dk | 2 | 6 |

Üç yazı mevcut maliyet, performans, SEO/GEO ve e-ticaret içeriklerinin yanına yeni arama niyetleri ekliyor. Grafikler temsili planlama/hesap örnekleri; müşteri sonucu veya sektör araştırması olarak sunulmuyor. Teknik kaynaklar ilgili paragrafta bağlantılı ve yazı sonundaki kaynakçada listeleniyor. Dekoratif raster görseller yerine mevcut temayla uyumlu CSS/SVG grafikler ve otomatik OG görselleri kullanıldı.

## Uygulanan geliştirmeler

- İsteğe bağlı `sources` frontmatter alanı: görünür kaynakça ile BlogPosting `citation` aynı veriden üretilir.
- BlogPosting: Piton Studios için Organization yazarı, makale `@id`, `timeRequired` ve dinamik OG görsel bağlantısı.
- FAQPage: dil ve sayfa kimliği. Görünür SSS ile aynı içerik kullanılır; arama sonucu görünümü vaat edilmez.
- İçindekiler artık kaynakça ve SSS hedeflerini de içerir.
- BarChart/TrendChart `dataTableLabel` verilince klavyeyle açılabilen yerel HTML veri tablosu gösterir; ek istemci kütüphanesi yoktur.
- TrendChart ekseninde düşük yüzdeleri tam sayıya yuvarlamanın oluşturduğu tekrarlar giderildi.

## Doğrulama

- `pnpm build`: başarılı, üç yeni yazı ve OG rotaları üretildi.
- `pnpm typecheck`: başarılı.
- `pnpm lint`: 0 hata; mevcut 18 uyarı.
- `pnpm content:check`: 426 mevcut çeviri alanı, 0 sorun. Blog çeviri kapsamını bu betik değil HTML testi kontrol ediyor.
- `python3 scripts/check-blog-pages.py`: 41 sayfa içi hedef, 24 farklı site içi URL (HTTP 200), 16 SSS, kaynakça/şema eşleşmesi, üç OG görseli, yalnızca mevcut dil alternatifi, RSS ve sitemap başarılı.
- Tarayıcı: masaüstü görünümü ve 390 px mobilde bölüm bağlantısı/grafik incelendi. Hedef başlık sabit navigasyonun altında kalıyor; yatay sayfa taşması yok.

## Sonraki içerik geliştirmeleri

1. Yeni üç rehberin İngilizce/Rusça editoryal sürümleri talep edilirse aynı `translationKey` ile eklenebilir. Aynı konunun gerçek çevirileri hazırlanmalı.
2. Gerçek proje ölçümleri elde edildiğinde yöntem, dönem ve izin bilgisiyle vaka yazıları hazırlanabilir. Temsili grafikler gerçeğe aitmiş gibi değiştirilmemeli.
3. Eski yazılardaki zamana bağlı fiyat, platform ve arama özelliği açıklamaları ayrı bir kaynak/güncellik incelemesinden geçirilebilir. Bu çalışma eski yazıların bütün iddialarını doğrulayan bir denetim değildir.
4. Yeni kaynakça alanı eski yazılara editoryal inceleme sırasında eklenebilir. Grafiklerde veri tablosu etiketi mevcut diğer dil içeriklerine kendi dilinde verilebilir.

Bu çalışma canlıya yayınlama içermez; dosyalar mevcut çalışma alanında hazırdır.
