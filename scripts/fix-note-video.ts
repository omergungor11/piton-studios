/**
 * Fix: "§ 01 · Not / Neden Pixel Ninja?" manifesto section videosu
 * Supabase videos bucket'inda note.mp4 dosyasini kontrol eder,
 * yoksa veya yanlis isimdeyse local optimized versiyonu yukler.
 *
 * Usage: npx tsx scripts/fix-note-video.ts
 * Requires: NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('[fix-note] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const VIDEO_BUCKET = 'videos';
const TARGET_NAME = 'note.mp4';
const LOCAL_PATH = 'public/assets/optimized/note.mp4';

const supabase = createClient(supabaseUrl, serviceKey);

async function main() {
  console.log('=== Fix manifesto note.mp4 ===\n');

  // 1. Listele
  const { data: files, error: listErr } = await supabase.storage
    .from(VIDEO_BUCKET)
    .list('', { limit: 200 });

  if (listErr) {
    console.error('[list] FAIL:', listErr.message);
    process.exit(1);
  }

  const names = (files ?? []).map((f) => f.name);
  console.log('Videos bucket icerigi:');
  for (const n of names) console.log('  -', n);
  console.log();

  const hasTarget = names.includes(TARGET_NAME);
  const suspects = names.filter(
    (n) => n !== TARGET_NAME && /(note|manifesto|why|neden)/i.test(n)
  );

  if (hasTarget) {
    console.log(`[ok] '${TARGET_NAME}' zaten bucket'ta mevcut.`);
  } else {
    console.log(`[miss] '${TARGET_NAME}' bucket'ta yok.`);
    if (suspects.length > 0) {
      console.log(`[hint] Olasi yanlis isimli dosyalar: ${suspects.join(', ')}`);
    }
  }

  // 2. Local dosyayi yukle (upsert = isim varsa uzerine yaz)
  if (!existsSync(LOCAL_PATH)) {
    console.error(`\n[abort] Local kaynak bulunamadi: ${LOCAL_PATH}`);
    console.error('  Once: pnpm exec tsx scripts/optimize-videos.ts (ya da benzeri) calistir.');
    process.exit(1);
  }

  console.log(`\n[upload] ${LOCAL_PATH} -> ${VIDEO_BUCKET}/${TARGET_NAME} (upsert)`);
  const buf = readFileSync(LOCAL_PATH);
  const { error: upErr } = await supabase.storage
    .from(VIDEO_BUCKET)
    .upload(TARGET_NAME, buf, {
      contentType: 'video/mp4',
      upsert: true,
      cacheControl: '3600',
    });

  if (upErr) {
    console.error('[upload] FAIL:', upErr.message);
    process.exit(1);
  }

  const { data: pub } = supabase.storage.from(VIDEO_BUCKET).getPublicUrl(TARGET_NAME);
  console.log('[upload] done.');
  console.log('\nPublic URL:', pub.publicUrl);

  // 3. Yanlis isimli suspect dosyalari temizlemek icin ipucu (otomatik silmiyoruz)
  if (suspects.length > 0) {
    console.log('\n[temizlik onerisi] Asagidaki isimler artik gereksiz olabilir (elle silmek icin):');
    for (const s of suspects) console.log(`  supabase storage rm ${VIDEO_BUCKET}/${s}`);
  }
}

main().catch((e) => {
  console.error('[unexpected]', e);
  process.exit(1);
});
