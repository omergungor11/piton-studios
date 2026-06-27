#!/bin/bash
# Video Optimization Pipeline
# Compresses videos for web + generates thumbnails
#
# Usage: ./scripts/optimize-videos.sh [input_dir] [output_dir]
# Default: videos/ → public/assets/optimized/

set -e

INPUT_DIR="${1:-videos}"
OUTPUT_DIR="${2:-public/assets/optimized}"
THUMB_DIR="$OUTPUT_DIR/thumbnails"

mkdir -p "$OUTPUT_DIR" "$THUMB_DIR"

# Settings
MAX_WIDTH=1280        # Max video width
VIDEO_BITRATE="1500k" # Target bitrate
AUDIO_BITRATE="128k"
CRF=28                # Quality (lower = better, 23-30 range)
THUMB_TIME="00:00:02" # Thumbnail capture time
THUMB_WIDTH=640

echo "=== Video Optimization Pipeline ==="
echo "Input:  $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

TOTAL=0
PROCESSED=0
SKIPPED=0

for src in "$INPUT_DIR"/*.mp4; do
  [ -f "$src" ] || continue
  TOTAL=$((TOTAL + 1))

  filename=$(basename "$src")
  # Sanitize filename: remove Turkish chars, spaces → hyphens, lowercase
  safe_name=$(echo "$filename" | \
    sed 's/ı/i/g; s/İ/I/g; s/ş/s/g; s/Ş/S/g; s/ç/c/g; s/Ç/C/g; s/ü/u/g; s/Ü/U/g; s/ö/o/g; s/Ö/O/g; s/ğ/g/g; s/Ğ/G/g' | \
    tr '[:upper:]' '[:lower:]' | \
    sed 's/ /-/g; s/[^a-z0-9._-]//g; s/--*/-/g')

  out="$OUTPUT_DIR/$safe_name"
  thumb="$THUMB_DIR/${safe_name%.mp4}.jpg"

  # Skip if already processed
  if [ -f "$out" ] && [ "$out" -nt "$src" ]; then
    echo "SKIP: $filename (already optimized)"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  src_size=$(du -h "$src" | cut -f1)
  echo -n "PROC: $filename ($src_size) → $safe_name ... "

  # Compress video
  ffmpeg -y -i "$src" \
    -vf "scale='min($MAX_WIDTH,iw)':-2" \
    -c:v libx264 -preset slow -crf $CRF \
    -b:v $VIDEO_BITRATE -maxrate 2000k -bufsize 4000k \
    -c:a aac -b:a $AUDIO_BITRATE \
    -movflags +faststart \
    -pix_fmt yuv420p \
    "$out" 2>/dev/null

  # Generate thumbnail
  ffmpeg -y -i "$src" \
    -ss $THUMB_TIME \
    -vframes 1 \
    -vf "scale=$THUMB_WIDTH:-2" \
    -q:v 2 \
    "$thumb" 2>/dev/null

  out_size=$(du -h "$out" | cut -f1)
  echo "done ($out_size)"
  PROCESSED=$((PROCESSED + 1))
done

echo ""
echo "=== Summary ==="
echo "Total:     $TOTAL videos"
echo "Processed: $PROCESSED"
echo "Skipped:   $SKIPPED"
echo ""

if [ $PROCESSED -gt 0 ]; then
  src_total=$(du -sh "$INPUT_DIR" | cut -f1)
  out_total=$(du -sh "$OUTPUT_DIR" | cut -f1)
  echo "Input size:  $src_total"
  echo "Output size: $out_total"
fi

echo ""
echo "Optimized videos: $OUTPUT_DIR/"
echo "Thumbnails:       $THUMB_DIR/"
