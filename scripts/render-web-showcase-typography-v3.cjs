const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/web-showcase-typography-v3/creative.html",
);
const output = path.join(
  root,
  "public/assets/social/web-showcase-concepts-v3-typography-fixed",
);

const names = [
  "07-curved-web-gallery",
  "08-isometric-website-city",
  "09-infinite-scroll-tunnel",
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

(async () => {
  fs.mkdirSync(output, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto(pathToFileURL(source).href);
  await waitForAssets(page);

  const panels = [];
  const slides = page.locator(".slide");
  for (let index = 0; index < names.length; index += 1) {
    const png = await slides.nth(index).screenshot({
      type: "png",
      animations: "disabled",
    });
    panels.push(png);
    await sharp(png).toFile(path.join(output, `${names[index]}.png`));
    await sharp(png)
      .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
      .toFile(path.join(output, `upload-${names[index]}.jpg`));
  }

  const previews = await Promise.all(
    panels.map((panel) =>
      sharp(panel).resize(360, 450).jpeg({ quality: 90 }).toBuffer(),
    ),
  );

  await sharp({
    create: {
      width: 1080,
      height: 450,
      channels: 3,
      background: "#0a0a0a",
    },
  })
    .composite(
      previews.map((input, index) => ({ input, left: index * 360, top: 0 })),
    )
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, "preview-typography-fixed.jpg"));

  await browser.close();
})();
