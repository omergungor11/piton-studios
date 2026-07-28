import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

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
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: isProduction ? SITE_URL : undefined,
  };
}
