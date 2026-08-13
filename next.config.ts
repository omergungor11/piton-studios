import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Kaldirilan hizmetler (2026-08-13) -> anlamca en yakin kalan hizmet.
 *
 * Bu sayfalar canlida yayindaydi ve sitemap'te yer aliyordu, yani indekslenmis
 * olabilirler. Kaldirinca 404 vermek hem birikmis SEO degerini atar hem de
 * disaridan verilmis linkleri kirar. Kalici (301) yonlendirme ikisini de onler.
 *
 * TR yolu /hizmetler, en/ru /services (bkz. src/i18n/routing.ts).
 */
const REMOVED_SERVICES: Record<string, string> = {
  "ai-training": "how-to-do",
  "ai-chatbot": "ai-integration",
  "prompt-engineering": "ai-integration",
};

const SERVICE_PATH: Record<string, string> = {
  tr: "hizmetler",
  en: "services",
  ru: "services",
};

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return Object.entries(REMOVED_SERVICES).flatMap(([from, to]) =>
      Object.entries(SERVICE_PATH).map(([locale, segment]) => ({
        source: `/${locale}/${segment}/${from}`,
        destination: `/${locale}/${segment}/${to}`,
        permanent: true,
      }))
    );
  },
};

export default withNextIntl(nextConfig);
