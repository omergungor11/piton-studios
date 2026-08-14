/**
 * SSS ceviri metinlerini `messages.faqItems` icinden guvenli sekilde okur.
 *
 * Ceviriler asamali uretiliyor — bir soru henuz cevrilmemis olabilir.
 * Bu yuzden burada hicbir sey firlatmaz; eksik kayit sessizce atlanir ve
 * ne JSON-LD'ye ne de llms.txt'e girer. Yariyla dolu bir FAQPage dugumu
 * uretmektense o soruyu hic yayinlamamak dogru davranis.
 *
 * Yapi: src/lib/faq.ts — metinler: src/messages/{tr,en,ru}.json
 */
import { FAQ_ITEMS } from './faq';

export interface FaqEntry {
  id: string;
  q: string;
  a: string;
  detail: string[];
  list: string[];
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function textList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(text).filter(Boolean);
}

/** FAQ_ITEMS sirasini koruyarak cevirisi tamamlanmis kayitlari dondurur. */
export function readFaqEntries(messages: unknown): FaqEntry[] {
  const root = messages as Record<string, unknown> | null | undefined;
  const namespace = root?.faqItems;
  if (!namespace || typeof namespace !== 'object') return [];

  const bag = namespace as Record<string, unknown>;
  const entries: FaqEntry[] = [];

  for (const item of FAQ_ITEMS) {
    const raw = bag[item.id];
    if (!raw || typeof raw !== 'object') continue;

    const record = raw as Record<string, unknown>;
    const q = text(record.q);
    const a = text(record.a);
    if (!q || !a) continue;

    entries.push({
      id: item.id,
      q,
      a,
      detail: textList(record.detail),
      list: textList(record.list),
    });
  }

  return entries;
}

/**
 * JSON-LD `acceptedAnswer.text` ve llms.txt icin duz metin cevap.
 * HTML yok — lead, ek paragraflar ve madde isaretleri bos satirla ayrilir.
 */
export function faqPlainAnswer(entry: FaqEntry): string {
  return [entry.a, ...entry.detail, ...entry.list.map((line) => `- ${line}`)].join('\n\n');
}
