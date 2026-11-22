// AI entegrasyon reklam videosunu üretir (koyu sahne, Nexos mockup'ları).
// Kaynak: piton-docs/social-production/ai-entegrasyon-reklam-v1/creative.html
// Önce site kareleri gerekir:
//   node scripts/capture-site-scroll.cjs https://www.nexosinvestment.com piton-docs/social-production/ai-entegrasyon-reklam-v1/frames
// Sonra: node scripts/render-ai-entegrasyon-ad.cjs [story|feed]   (boş bırakılırsa ikisi de)
// Playwright projede bağımlılık değildir: NODE_PATH=<playwright-core kurulu node_modules> ile çalıştırın.
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");

const dir = path.resolve(__dirname, "../piton-docs/social-production/ai-entegrasyon-reklam-v1");
const source = pathToFileURL(path.join(dir, "creative.html")).href;
const output = path.join(dir, "out");
const fps = 30;
const sizes = { story: { width: 1080, height: 1920 }, feed: { width: 1080, height: 1350 } };
const formats = process.argv[2] ? [process.argv[2]] : ["story", "feed"];

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const format of formats) {
    const viewport = sizes[format];
    const tmp = path.join(output, `.frames-${format}`);
    fs.rmSync(tmp, { recursive: true, force: true });
    fs.mkdirSync(tmp, { recursive: true });

    const page = await browser.newPage({ viewport });
    await page.goto(`${source}?format=${format}`);
    await page.evaluate(() => document.fonts.ready);
    const duration = await page.evaluate(() => window.DURATION);
    const total = Math.round(duration * fps);

    for (let frame = 0; frame < total; frame += 1) {
      await page.evaluate((t) => window.renderAt(t), frame / fps);
      await page.screenshot({
        path: path.join(tmp, `f-${String(frame).padStart(4, "0")}.jpg`),
        type: "jpeg",
        quality: 95,
      });
      if (frame % (fps * 2) === 0) console.log(`${format}: ${frame / fps}s / ${duration}s`);
    }
    await page.evaluate((t) => window.renderAt(t), duration - 0.5);
    await page.screenshot({ path: path.join(output, `piton-ai-entegrasyon-${format}-poster.jpg`), type: "jpeg", quality: 92 });
    await page.close();

    const video = path.join(output, `piton-ai-entegrasyon-${format}.mp4`);
    execFileSync(
      "ffmpeg",
      [
        "-y", "-loglevel", "error",
        "-framerate", String(fps),
        "-i", path.join(tmp, "f-%04d.jpg"),
        "-vf", "scale=in_range=pc:out_range=tv,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "18",
        "-movflags", "+faststart",
        video,
      ],
      { stdio: "inherit" },
    );
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(`→ ${video}`);
  }
  await browser.close();
})();
