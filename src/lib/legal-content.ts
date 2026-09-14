import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/config';
import type { LegalPage } from '@/lib/legal';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'legal');

export interface LegalDocument {
  title: string;
  description: string;
  content: string;
}

/**
 * `content/legal/{locale}/{page}.mdx` dosyasini okur. Hukuki metin eksikse
 * build'de gorunur hata verir — bir dilde sayfa sessizce bos yayinlanmasin.
 */
export function getLegalDocument(locale: Locale, page: LegalPage): LegalDocument {
  const filePath = path.join(CONTENT_DIR, locale, `${page}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`[legal] content/legal/${locale}/${page}.mdx bulunamadi`);
  }

  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  const missing = (['title', 'description'] as const).filter((k) => !data[k]);
  if (missing.length) {
    throw new Error(
      `[legal] content/legal/${locale}/${page}.mdx — eksik frontmatter alani: ${missing.join(', ')}`
    );
  }

  return {
    title: String(data.title),
    description: String(data.description),
    content,
  };
}
