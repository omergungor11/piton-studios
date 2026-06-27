/**
 * Upload optimized videos and thumbnails to Supabase Storage
 *
 * Usage: npx tsx scripts/upload-to-supabase.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, basename } from 'path';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const VIDEO_DIR = 'public/assets/optimized';
const THUMB_DIR = 'public/assets/optimized/thumbnails';
const VIDEO_BUCKET = 'videos';
const THUMB_BUCKET = 'thumbnails';

async function ensureBucket(name: string) {
  // Check if bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.id === name);

  if (exists) {
    console.log(`  Bucket "${name}" exists, updating size limit...`);
    await supabase.storage.updateBucket(name, {
      public: true,
      fileSizeLimit: 104857600, // 100MB
    });
  } else {
    console.log(`  Creating bucket "${name}"...`);
    await supabase.storage.createBucket(name, {
      public: true,
      fileSizeLimit: 104857600,
    });
  }
}

async function uploadFile(bucket: string, filePath: string) {
  const fileName = basename(filePath);
  const fileBuffer = readFileSync(filePath);
  const contentType = filePath.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  FAIL: ${fileName} — ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
}

async function main() {
  console.log('=== Supabase Storage Upload ===\n');

  // Ensure buckets exist
  await ensureBucket(VIDEO_BUCKET);
  await ensureBucket(THUMB_BUCKET);
  console.log('Buckets ready.\n');

  // Upload videos
  const videos = readdirSync(VIDEO_DIR).filter((f) => f.endsWith('.mp4'));
  console.log(`Uploading ${videos.length} videos...`);

  const urlMap: Record<string, { video: string; thumbnail: string }> = {};

  for (const file of videos) {
    const filePath = join(VIDEO_DIR, file);
    const size = (statSync(filePath).size / 1024 / 1024).toFixed(1);
    process.stdout.write(`  ${file} (${size}MB) ... `);

    const url = await uploadFile(VIDEO_BUCKET, filePath);
    if (url) {
      urlMap[file] = { video: url, thumbnail: '' };
      console.log('done');
    }
  }

  // Upload thumbnails
  const thumbs = readdirSync(THUMB_DIR).filter((f) => f.endsWith('.jpg'));
  console.log(`\nUploading ${thumbs.length} thumbnails...`);

  for (const file of thumbs) {
    const filePath = join(THUMB_DIR, file);
    process.stdout.write(`  ${file} ... `);

    const url = await uploadFile(THUMB_BUCKET, filePath);
    if (url) {
      const videoKey = file.replace('.jpg', '.mp4');
      if (urlMap[videoKey]) {
        urlMap[videoKey].thumbnail = url;
      }
      console.log('done');
    }
  }

  // Output URL mapping
  console.log('\n=== URL Mapping ===\n');
  console.log(JSON.stringify(urlMap, null, 2));
}

main().catch(console.error);
