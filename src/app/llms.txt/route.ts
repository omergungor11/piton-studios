/**
 * /llms.txt — LLM crawler'lari icin duz metin site ozeti (llmstxt.org onerisi).
 *
 * Amac: bir dil modeli siteyi tarayamadan ya da JS calistiramadan da
 * "Piton Studios ne yapar, hangi hizmetleri verir, hangi soruya nerede yanit
 * var" sorularini tek istekte cevaplayabilsin. Her SSS sorusu kalici
 * anchor'iyla listelenir; model dogrudan o adrese atif yapabilir.
 *
 * Dil: TR (varsayilan). Ceviri eksikse soru id'siyle listelenir, uretim patlamaz.
 */
import trMessages from '@/messages/tr.json';
import { SERVICES } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { FAQ_ITEMS, FAQ_COUNT, FAQ_UPDATED } from '@/lib/faq';
import { readFaqEntries } from '@/lib/faq-content';
import { absoluteUrl } from '@/lib/seo';
import { SITE, SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/** JSON import'u kesin tiplenir; slug ile dinamik erisim icin gevsetiliyor. */
const MESSAGES = trMessages as unknown as {
  servicesList?: Record<string, { title?: string; desc?: string } | undefined>;
};

const INTRO =
  'Piton Studios, 2021 yilinda kurulmus, Turkiye merkezli bagimsiz bir dijital studyodur. ' +
  'Web tasarimi ve gelistirme, ozel web uygulamalari, e-ticaret, mobil/PWA, SEO ve GEO, ' +
  'Google Ads, yapay zeka entegrasyonu, is sureci otomasyonu ve bulut altyapisi hizmetleri verir. ' +
  'Kullanilan ana teknolojiler: Next.js, React, TypeScript, Node.js, Vercel. ' +
  'Site tr, en ve ru dillerinde yayindadir.';

export async function GET() {
  const entries = new Map(readFaqEntries(trMessages).map((entry) => [entry.id, entry]));
  const lines: string[] = [];

  lines.push('# Piton Studios');
  lines.push('');
  lines.push(INTRO);
  lines.push('');
  lines.push(`Site: ${SITE_URL}`);
  lines.push(`Son guncelleme: ${FAQ_UPDATED}`);
  lines.push('');

  lines.push('## Hizmetler');
  lines.push('');
  for (const service of SERVICES) {
    const title = MESSAGES.servicesList?.[service.slug]?.title ?? service.title;
    const url = absoluteUrl('tr', { pathname: '/services/[slug]', params: { slug: service.slug } });
    lines.push(`- ${title}: ${url}`);
  }
  lines.push('');

  lines.push('## SSS');
  lines.push('');
  lines.push(`${FAQ_COUNT} soru — tam sayfa: ${absoluteUrl('tr', '/faq')}`);
  lines.push('');
  for (const item of FAQ_ITEMS) {
    const entry = entries.get(item.id);
    const question = entry ? entry.q : item.id;
    lines.push(`- ${question}: ${absoluteUrl('tr', '/faq')}#faq-${item.id}`);
  }
  lines.push('');

  lines.push('## Blog');
  lines.push('');
  for (const post of getAllPosts('tr')) {
    const url = absoluteUrl('tr', { pathname: '/blog/[slug]', params: { slug: post.slug } });
    lines.push(`- ${post.title} (${post.date.slice(0, 10)}): ${url}`);
  }
  lines.push('');

  lines.push('## Iletisim');
  lines.push('');
  lines.push(`E-posta: ${SITE.email}`);
  lines.push(`Iletisim formu: ${absoluteUrl('tr', '/contact')}`);
  for (const link of SITE.social) lines.push(`Sosyal: ${link}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
