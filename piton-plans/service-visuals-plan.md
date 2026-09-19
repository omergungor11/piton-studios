# Hizmet sayfaları görsel planı (TASK-077)

Tarih: 2026-09-19 · Kaynak: kullanıcı isteği (referans: weevolveit.com hizmet kartları)

## Amaç

18 hizmet detay sayfasına (`/hizmetler/[slug]`) markaya özgü görseller ve grafikler eklemek.
Görseller **yalnızca iç sayfalarda** görünür; mega menü, hizmetler listesi ve anasayfa değişmez.

## Kararlar

| Konu | Karar | Gerekçe |
|---|---|---|
| Üretim yolu | Kodla üretilen SVG sahneler (raster yok) | Görsel üretim modeli yok; SVG keskin, hafif, temaya birebir uyar, lisans riski yok |
| Stil | Koyu sahne (#0A0A0A), tek vurgu kırmızı (#D33A3E + #FF6A5E parlama), sıcak kırık beyaz çizgiler; perspektif/izometrik nesneler, yumuşak glow | Referanstaki "karanlık + tek neon renk" etkisi, kendi paletimizle |
| Metin | Hero sahnelerinde **kelime yok** (dil bağımsız); diyagram etiketleri `messages` → 3 dil | Tek SVG üç dilde çalışır |
| Tema | Sahne her iki temada koyu "ürün çekimi" kartı | Tutarlı görünüm, ayrı açık tema varyantı gerekmez |
| Rakam | Grafiklerde uydurma sayı yok; akış/mimari diyagramları kavramsal | Site kuralı: uydurma rakam/müşteri yok |
| Performans | Her sahne ayrı chunk (`next/dynamic`), sayfa yalnızca kendi sahnesini yükler; hedef < 12 KB/sahne | Hizmet sayfası JS'i şişmesin |
| Hareket | Yalnızca CSS (akan ışık çizgisi, nabız); `prefers-reduced-motion` ile durur | JS animasyon döngüsü yok |
| Erişilebilirlik | Sahne `role="img"` + 3 dilde `alt`; diyagram HTML liste (ekran okuyucu sırayı okur) | |

## Sayfaya eklenenler

1. **Hero sahnesi** (`src/components/service-visuals/art/<slug>.tsx`): hero iki sütun olur — solda metin,
   sağda 16:10 sahne; mobilde başlığın altında tam genişlik. Eski 64px ikon kalkar (ikonlar ilgili hizmet
   kartlarında kullanılmaya devam eder).
2. **"Nasıl çalışır" akış diyagramı** (`ServiceFlow`): Özellikler bölümünden sonra. 3–5 aşama, her aşamada
   1–3 düğüm, bir "çekirdek" düğüm vurgulu; aşamalar arası akan ışık çizgisi. Masaüstünde yatay, mobilde dikey.
   Yapı `src/components/service-visuals/flows.ts`, etiketler `messages → serviceVisuals.<slug>.flow`.

## Hizmet → sahne metaforu

| # | Hizmet | Hero sahnesi | Akış (özet) |
|---|---|---|---|
| 01 | web-design | Perspektifte yüzen tarayıcı pencereleri, ızgara ve tipografi blokları, kırmızı imleç izi | Strateji → Bilgi mimarisi → Tasarım sistemi → Geliştirme → Yayın |
| 02 | custom-software | Modüler bloklar + aralarında veri akan boru hattı, merkezde parlayan çekirdek | İş süreci → Veri modeli → API/servisler → Panel → Kullanıcılar |
| 03 | web-app | Katmanlı dashboard ekranları (grafik, tablo, kartlar) | İstemci → Uygulama katmanı → Veritabanı / Entegrasyonlar |
| 04 | mobile-app | Eğik duran iki telefon, aralarında senkron ışık yayı | Tasarım → Tek kod tabanı → iOS / Android → Mağaza |
| 05 | progressive-web-app | Tarayıcı + telefon, "kurulum" ışını, çevrimdışı katman | Web sitesi → Service worker → Önbellek → Ana ekran |
| 06 | ecommerce | Ürün kartları, sepet, ödeme terminaline akan ışık | Vitrin → Sepet → Ödeme → Kargo → Muhasebe |
| 07 | erp-crm | Merkez hub etrafında modül küpleri (cari, stok, satış, bayi) | Teklif → Sipariş → Stok/Üretim → Fatura → Cari |
| 08 | automation | Konveyör üzerinde ilerleyen belge blokları, dişli düğümler | Tetikleyici → Kurallar/AI → Aksiyonlar → Rapor |
| 09 | whatsapp-chatbot | Konuşma balonları, telefondan panele akan mesaj izi | Müşteri → WhatsApp → Bot (kendi verin) → Ekip/CRM |
| 10 | ai-integration | Parlayan çekirdek model + çevresinde bağlanan belge/araç düğümleri | Veri kaynakları → RAG → Model → Uygulama |
| 11 | ai-consulting | Karar haritası: dallanan yollar, işaretli fırsat noktaları | Keşif → Kullanım senaryoları → Önceliklendirme → Yol haritası |
| 12 | data-engineering | Katmanlı veri ambarı silindirleri, akan satır çizgileri | Kaynaklar → ELT → Ambar → Analitik |
| 13 | cloud-ecosystem | Bulut kütlesi altında sunucu rafları, dağıtım ışınları | Kod → CI/CD → Bulut → İzleme |
| 14 | google-ads | Arama sonucu kartları, yükselen tıklama eğrisi (ölçeksiz) | Arama → Reklam → Açılış sayfası → Dönüşüm |
| 15 | meta-ads | Sosyal akış kartları, hedef halkaları | Kitle → Kreatif → Akış → Dönüşüm |
| 16 | seo-geo | Arama çubuğu + yapay zekâ yanıt kartında alıntılanan site | Tarama → Dizin → Sıralama / AI alıntısı |
| 17 | maintenance-support | Kalkan + izleme ekranı, nabız çizgisi | İzleme → Güncelleme → Yedek → Rapor |
| 18 | how-to-do | Sunum ekranı önünde workshop masası, bağlanan kişiler | İhtiyaç analizi → Eğitim → Uygulama → Bağımsız ekip |

## Uygulama fazları

- **Faz 0 (ana oturum)**: çizim kiti (`kit.tsx`: çerçeve, glow filtreleri, zemin ızgarası, cam panel, ışık
  çizgisi, düğüm), `ServiceFlow` bileşeni, sayfa entegrasyonu, CSS, `serviceVisuals` mesaj şeması,
  referans olarak **web-design** sahnesi + akışı.
- **Faz 1 (3 paralel ajan)**: kalan 17 hizmet — her ajan 5–6 hizmetin sahnesini, akış yapısını ve 3 dil
  metnini yazar. Ajanlar yalnızca scratchpad'e yazar, git kullanmaz; kit dışında renk/filtre icat etmez.
- **Faz 2 (ana oturum)**: birleştirme, typecheck/lint/build, 18 sayfanın ekran görüntüsüyle görsel QA
  (masaüstü + mobil, açık/koyu tema), sahne boyutu kontrolü, düzeltmeler.
- **Faz 3**: dokümantasyon (CLAUDE.md, CHANGELOG, task-index), kullanıcı onayıyla commit/push.

## Kabul ölçütleri

- 18/18 sayfada sahne + akış; 3 dilde alt metin ve etiketler (`pnpm content:check` temiz).
- Menüde ve liste sayfalarında görsel yok.
- Sahnelerde metin yok; diyagramlarda rakam yok.
- Mobilde (390px) taşma yok; reduced-motion'da animasyon durur.
- Build temiz; sahne başına JS boyutu makul (< ~12 KB).
