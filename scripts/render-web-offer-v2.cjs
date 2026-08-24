const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/web-offer-v2/creative.html",
);
const output = path.join(
  root,
  "public/assets/social/web-offer-v2",
);

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

async function render(page, name) {
  const element = page.locator(`[data-output="${name}"]`);
  const png = await element.screenshot({ type: "png", animations: "disabled" });
  await sharp(png).png().toFile(path.join(output, `${name}.png`));
  await sharp(png)
    .jpeg({ quality: 95, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, `${name}.jpg`));
  return png;
}

async function createPreview(feed, story) {
  const feedPreview = await sharp(feed)
    .resize({ width: 540 })
    .jpeg({ quality: 92 })
    .toBuffer();
  const storyPreview = await sharp(story)
    .resize({ width: 380 })
    .jpeg({ quality: 92 })
    .toBuffer();
  const feedMeta = await sharp(feedPreview).metadata();
  const storyMeta = await sharp(storyPreview).metadata();
  const margin = 34;
  const gap = 28;
  const labelHeight = 58;
  const width = margin * 2 + feedMeta.width + storyMeta.width + gap;
  const height = margin * 2 + Math.max(feedMeta.height, storyMeta.height) + labelHeight;
  const labels = Buffer.from(
    `<svg width="${width}" height="${labelHeight}"><style>text{fill:#f5f5f2;font:600 22px Arial,sans-serif;letter-spacing:1px}</style><text x="${margin}" y="38">FEED / 1080 x 1350</text><text x="${margin + feedMeta.width + gap}" y="38">STORY / 1080 x 1920</text></svg>`,
  );
  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: "#17191b",
    },
  })
    .composite([
      { input: feedPreview, left: margin, top: margin },
      { input: storyPreview, left: margin + feedMeta.width + gap, top: margin },
      { input: labels, left: 0, top: height - labelHeight - margin },
    ])
    .jpeg({ quality: 93 })
    .toFile(path.join(output, "preview-web-offer.jpg"));
}

(async () => {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(pathToFileURL(source).href);
  await waitForAssets(page);
  const feed = await render(page, "piton-web-offer-feed");
  const story = await render(page, "piton-web-offer-story");
  await createPreview(feed, story);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
