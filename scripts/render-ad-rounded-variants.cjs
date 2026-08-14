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
const styles = path.join(
  root,
  "piton-docs/social-production/ad-campaign-rounded-v1/rounded-variants.css",
);
const output = path.join(
  root,
  "public/assets/social/ad-campaign-rounded-v1",
);

const variants = [
  {
    label: "01 / SOFT / SAMMYS",
    className: "rounded-soft",
    feedSource: "creative-04-website-package-feed",
    storySource: "creative-04-website-package-story",
    feedOutput: "rounded-01-web-sammys-feed",
    storyOutput: "rounded-01-web-sammys-story",
  },
  {
    label: "02 / LAYERED / NEXOS",
    className: "rounded-layered",
    feedSource: "creative-04b-website-package-nexos-feed",
    storySource: "creative-04b-website-package-nexos-story",
    feedOutput: "rounded-02-web-nexos-feed",
    storyOutput: "rounded-02-web-nexos-story",
  },
  {
    label: "03 / PERFORMANCE",
    className: "rounded-performance",
    feedSource: "creative-05-ads-management-feed",
    storySource: "creative-05-ads-management-story",
    feedOutput: "rounded-03-ads-feed",
    storyOutput: "rounded-03-ads-story",
  },
];

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

async function renderVariant(page, sourceName, outputName, className) {
  const element = page.locator(`[data-output="${sourceName}"]`);
  await element.evaluate(
    (node, profile) => node.classList.add("rounded-preview", profile),
    className,
  );
  const png = await element.screenshot({ type: "png", animations: "disabled" });
  await sharp(png).png().toFile(path.join(output, `${outputName}.png`));
  await sharp(png)
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, `${outputName}.jpg`));
  await element.evaluate(
    (node, profile) => node.classList.remove("rounded-preview", profile),
    className,
  );
  return png;
}

async function contactSheet(images, labels, destination, sourceWidth, sourceHeight) {
  const cardWidth = 360;
  const cardHeight = Math.round((cardWidth / sourceWidth) * sourceHeight);
  const gap = 18;
  const margin = 28;
  const labelHeight = 52;
  const resized = await Promise.all(
    images.map((image) =>
      sharp(image).resize(cardWidth, cardHeight).jpeg({ quality: 90 }).toBuffer(),
    ),
  );
  const canvas = sharp({
    create: {
      width: margin * 2 + cardWidth * images.length + gap * (images.length - 1),
      height: margin * 2 + cardHeight + labelHeight,
      channels: 3,
      background: "#151617",
    },
  });
  const captions = labels.map((label, index) => ({
    input: Buffer.from(
      `<svg width="${cardWidth}" height="${labelHeight}"><style>text{fill:#f2efe9;font:600 18px Arial,sans-serif}</style><text x="0" y="34">${label}</text></svg>`,
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
      ...captions,
    ])
    .jpeg({ quality: 92 })
    .toFile(path.join(output, destination));
}

(async () => {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(pathToFileURL(source).href);
  await page.addStyleTag({ path: styles });
  await waitForAssets(page);

  const feed = [];
  const story = [];
  for (const variant of variants) {
    feed.push(
      await renderVariant(
        page,
        variant.feedSource,
        variant.feedOutput,
        variant.className,
      ),
    );
    story.push(
      await renderVariant(
        page,
        variant.storySource,
        variant.storyOutput,
        variant.className,
      ),
    );
  }

  await contactSheet(
    feed,
    variants.map((variant) => variant.label),
    "preview-rounded-feed.jpg",
    1080,
    1350,
  );
  await contactSheet(
    story,
    variants.map((variant) => variant.label),
    "preview-rounded-story.jpg",
    1080,
    1920,
  );

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
