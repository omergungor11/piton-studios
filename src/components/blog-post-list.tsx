import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import BlogCardArt from '@/components/blog-visuals/blog-card-art';
import { hasBlogArt } from '@/components/blog-visuals/art-keys';
import { formatPostDate, type PostMeta } from '@/lib/blog';
import type { Locale } from '@/lib/site';

type Props = {
  posts: PostMeta[];
  locale: Locale;
  /** Kart altinda etiket rozetleri — blog listesinde var, etiket sayfasinda yok. */
  showTags?: boolean;
  /** Liste bossa gosterilecek metnin `blog` namespace'indeki anahtari. */
  emptyKey?: 'empty' | 'emptyTag';
};

/** Blog ve etiket listelerinin ortak kart seridi (sayfalamayla birlikte dort yerde kullaniliyor). */
export default async function BlogPostList({
  posts,
  locale,
  showTags = false,
  emptyKey = 'empty',
}: Props) {
  const t = await getTranslations('blog');

  return (
    <section className="blog-list">
      {posts.length === 0 && <p className="blog-empty">{t(emptyKey)}</p>}

      {posts.map((post, i) => (
        <article key={post.slug} className="blog-card" data-reveal="rise" style={{ '--i': i } as CSSProperties}>
          <Link
            href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
            className={`blog-card-link ${hasBlogArt(post.translationKey) ? 'blog-card-link--art' : ''}`}
            data-cursor="hover"
          >
            <BlogCardArt artKey={post.translationKey} label={post.title} />
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
                <span className="blog-card-dot">•</span>
                <span>{t('readingTime', { minutes: post.readingMinutes })}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              {showTags && post.tags.length > 0 && (
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="blog-card-more">{t('readMore')} →</span>
            </div>
          </Link>
        </article>
      ))}
    </section>
  );
}
