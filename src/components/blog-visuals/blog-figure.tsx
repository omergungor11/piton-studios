'use client';

import { BLOG_FIGURES } from '@/components/blog-visuals';
import styles from './blog-visuals.module.css';

/**
 * Yazi govdesindeki sema. MDX'ten `<BlogFigure name="fast-website" alt="…" caption="…" />`
 * seklinde kullanilir; `alt` ve `caption` o dilin MDX dosyasinda yazilir — sahne kelime
 * icermedigi icin anlami tasiyan tek yer bu metinlerdir, bu yuzden `alt` zorunludur.
 */
export default function BlogFigure({ name, alt, caption }: { name: string; alt: string; caption?: string }) {
  const Art = BLOG_FIGURES[name];
  if (!Art) return null;

  return (
    <figure className={`mdx-chart ${styles.figure}`}>
      <div className={`sv-stage ${styles.stage}`}>
        <Art label={alt} />
      </div>
      {caption && <figcaption className={`mdx-chart-caption ${styles.caption}`}>{caption}</figcaption>}
    </figure>
  );
}
