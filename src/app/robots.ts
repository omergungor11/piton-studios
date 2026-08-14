import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Yapay zeka / arama asistani crawler'lari.
 *
 * Bunlara acikca izin veriyoruz: sitenin icerigi (ozellikle SSS sayfasi ve blog)
 * ChatGPT, Claude, Perplexity, Gemini gibi uretken arama yanitlarinda
 * alintilanabilsin diye. GEO gorunurlugu bu botlarin sayfayi okuyabilmesine
 * bagli — engellenen site, uretilen yanitta hic gecmez.
 *
 * Not: `*` kurali zaten izin veriyor, ancak bircok bot kendi user-agent'ina
 * ozel bir blok arar; acik blok belirsizligi ortadan kaldirir.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
  'meta-externalagent',
  'Bytespider',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  // Preview deploy'lar indexlenmemeli.
  const isProduction =
    process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

  if (process.env.VERCEL_ENV === 'preview') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: isProduction ? SITE_URL : undefined,
  };
}
