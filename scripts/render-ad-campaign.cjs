const { chromium } = require("playwright");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/ad-campaign-v1/creatives.html",
);
const output = path.join(root, "public/assets/social/ad-campaign-v1");

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

async function renderCreative(page, element, name) {
  const png = await element.screenshot({ type: "png", animations: "disabled" });
  await sharp(png).png().toFile(path.join(output, `${name}.png`));
  await sharp(png)
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, `${name}.jpg`));
  return png;
}

async function contactSheet(images, names, destination, width, height) {
  const cardWidth = 360;
  const cardHeight = Math.round((cardWidth / width) * height);
  const gap = 18;
  const margin = 28;
  const labelsHeight = 52;
  const resized = await Promise.all(
    images.map((image) =>
      sharp(image).resize(cardWidth, cardHeight).jpeg({ quality: 90 }).toBuffer(),
    ),
  );
  const canvas = sharp({
    create: {
      width: margin * 2 + cardWidth * images.length + gap * (images.length - 1),
      height: margin * 2 + cardHeight + labelsHeight,
      channels: 3,
      background: "#151617",
    },
  });
  const labels = names.map((name, index) => ({
    input: Buffer.from(
      `<svg width="${cardWidth}" height="${labelsHeight}"><style>text{fill:#f2efe9;font:600 18px Arial,sans-serif}</style><text x="0" y="34">${name}</text></svg>`,
    ),
    left: margin + index * (cardWidth + gap),
    top: margin + cardHeight,
  }));
  await canvas
    .composite([
      ...resized.map((input, index) => ({
        input,
        left: margin + index * (cardWidth + gap),
        top: margin,
      })),
      ...labels,
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(output, destination));
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(pathToFileURL(source).href);
  await waitForAssets(page);

  const elements = await page.locator("[data-output]").all();
  const feed = [];
  const story = [];
  for (const element of elements) {
    const name = await element.getAttribute("data-output");
    const image = await renderCreative(page, element, name);
    if (name.endsWith("-feed")) feed.push(image);
    if (name.endsWith("-story")) story.push(image);
  }

  await contactSheet(
    feed,
    [
      "01 / DONUSUM",
      "02 / DIJITAL URUN",
      "03 / GORUSME",
      "04A / WEB / SAMMYS",
      "04B / WEB / NEXOS",
      "05 / REKLAM",
    ],
    "preview-feed.jpg",
    1080,
    1350,
  );
  await contactSheet(
    story,
    [
      "01 / DONUSUM",
      "02 / DIJITAL URUN",
      "03 / GORUSME",
      "04A / WEB / SAMMYS",
      "04B / WEB / NEXOS",
      "05 / REKLAM",
    ],
    "preview-story.jpg",
    1080,
    1920,
  );

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
