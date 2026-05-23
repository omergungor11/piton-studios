// Supabase Storage henüz yüklenmedi — local assets kullan
const SUPABASE_URL = false && process.env.NEXT_PUBLIC_SUPABASE_URL;

const VIDEO_BUCKET = 'videos';
const THUMB_BUCKET = 'thumbnails';

export function videoUrl(filename: string): string {
  if (SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/${VIDEO_BUCKET}/${filename}`;
  }
  // Local fallback
  return `/assets/${filename}`;
}

export function thumbUrl(filename: string): string {
  const jpg = filename.replace(/\.mp4$/, '.jpg');
  if (SUPABASE_URL) {
    return `${SUPABASE_URL}/storage/v1/object/public/${THUMB_BUCKET}/${jpg}`;
  }
  return `/assets/optimized/thumbnails/${jpg}`;
}
