const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/ad-video-v1/creative-website-story.html",
);
const output = path.join(root, "public/assets/social/ad-video-v1");
const frames = path.join(output, ".website-frames");
const video = path.join(output, "piton-website-ad-story-12s.mp4");
const poster = path.join(output, "piton-website-ad-story-poster.jpg");

const width = 1080;
const height = 1920;
const fps = 25;
const duration = 12;
const frameCount = fps * duration;

async function waitForAssets(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
  });
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  fs.rmSync(frames, { recursive: true, force: true });
  fs.mkdirSync(frames, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(source).href);
  await waitForAssets(page);
  const creative = page.locator("#video");

  for (let frame = 0; frame < frameCount; frame += 1) {
    const time = frame / fps;
    await page.evaluate((value) => window.renderAt(value), time);
    await creative.screenshot({
      path: path.join(frames, `frame-${String(frame).padStart(4, "0")}.jpg`),
      type: "jpeg",
      quality: 95,
      animations: "disabled",
    });
    if (frame % fps === 0) console.log(`Rendered ${frame / fps}s / ${duration}s`);
  }

  await page.evaluate(() => window.renderAt(10.2));
  await creative.screenshot({ path: poster, type: "jpeg", quality: 95 });
  await browser.close();

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      String(fps),
      "-i",
      path.join(frames, "frame-%04d.jpg"),
      "-vf",
      "scale=in_range=pc:out_range=tv,format=yuv420p",
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "18",
      "-profile:v",
      "high",
      "-level",
      "4.2",
      "-pix_fmt",
      "yuv420p",
      "-color_range",
      "tv",
      "-colorspace",
      "bt709",
      "-color_primaries",
      "bt709",
      "-color_trc",
      "bt709",
      "-movflags",
      "+faststart",
      video,
    ],
    { stdio: "inherit" },
  );

  fs.rmSync(frames, { recursive: true, force: true });
  console.log(video);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
