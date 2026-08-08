import type { Heading } from '@/lib/blog';

/**
 * Icindekiler tablosu. Basliklar yazinin kendisinden cikarilir (src/lib/blog.ts),
 * id'ler rehype-slug ile uretilenlerle birebir aynidir.
 */
export default function BlogToc({
  title,
  headings,
}: {
  title: string;
  headings: Heading[];
}) {
  if (headings.length < 3) return null;

  return (
    <nav className="blog-toc" aria-label={title}>
      <p className="blog-toc-title">{title}</p>
      <ol className="blog-toc-list">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'blog-toc-sub' : undefined}>
            <a href={`#${h.id}`} data-cursor="hover">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
