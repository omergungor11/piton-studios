const { chromium } = require("playwright");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/web-showcase-digital-selection-v4/creative.html",
);
const output = path.join(
  root,
  "public/assets/social/web-showcase-digital-selection-v4",
);

(async () => {
  fs.mkdirSync(output, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto(pathToFileURL(source).href);
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

  const png = await page.locator(".slide").screenshot({
    type: "png",
    animations: "disabled",
  });
  await sharp(png).toFile(path.join(output, "08-digital-selection-mixed.png"));
  await sharp(png)
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, "upload-08-digital-selection-mixed.jpg"));
  await sharp(png)
    .resize(720, 900)
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, "preview-digital-selection-mixed.jpg"));

  await browser.close();
})();
