import { getPost, getAllPostParams, formatPostDate } from '@/lib/blog';
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og';
import type { Locale } from '@/lib/site';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Piton Studios';

export function generateStaticParams() {
  return getAllPostParams();
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPost(locale as Locale, slug);

  if (!post) {
    return renderOgImage({ title: 'Piton Studios', eyebrow: 'Blog' });
  }

  return renderOgImage({
    title: post.title,
    eyebrow: 'Blog',
    description: post.description,
    footnote: formatPostDate(post.date, locale as Locale),
  });
}
