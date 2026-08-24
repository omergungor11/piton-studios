const { chromium } = require("playwright");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const social = path.join(root, "public/assets/social");

async function loadRows(page, source) {
  await page.setViewportSize({ width: 3240, height: 1440 });
  await page.goto(pathToFileURL(path.join(root, source)).href);
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

  const rows = [];
  for (let pageIndex = 0; pageIndex < 4; pageIndex += 1) {
    rows.push(
      await page.locator(".canvas").nth(pageIndex).screenshot({
        type: "png",
        animations: "disabled",
      }),
    );
  }
  return rows;
}

async function writePanel(row, x, pngPath, jpgPath) {
  const panel = await sharp(row)
    .extract({ left: x, top: 0, width: 1080, height: 1440 })
    .png()
    .toBuffer();
  await sharp(panel).toFile(pngPath);
  await sharp(panel)
    .extract({ left: 0, top: 45, width: 1080, height: 1350 })
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(jpgPath);
  return panel;
}

async function writeGridPreview(panels, destination) {
  const width = 400;
  const height = 500;
  const gap = 14;
  const margin = 24;
  const resized = await Promise.all(
    panels.map((panel) =>
      sharp(panel)
        .extract({ left: 0, top: 45, width: 1080, height: 1350 })
        .resize(width, height)
        .jpeg({ quality: 90 })
        .toBuffer(),
    ),
  );

  await sharp({
    create: {
      width: margin * 2 + width * 3 + gap * 2,
      height: margin * 2 + height,
      channels: 3,
      background: "#171717",
    },
  })
    .composite(
      resized.map((input, index) => ({
        input,
        left: margin + index * (width + gap),
        top: margin,
      })),
    )
    .jpeg({ quality: 91 })
    .toFile(destination);
}

async function writeAllPagesPreview(rows, columns, destination) {
  const width = 300;
  const height = 375;
  const gap = 14;
  const margin = 24;
  const cells = [];

  for (let pageIndex = 0; pageIndex < 4; pageIndex += 1) {
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex += 1) {
      const column = columns[columnIndex];
      let input;
      if (pageIndex < column.pages) {
        input = await sharp(rows[pageIndex])
          .extract({ left: column.x, top: 45, width: 1080, height: 1350 })
          .resize(width, height)
          .jpeg({ quality: 88 })
          .toBuffer();
      } else {
        input = await sharp({
          create: { width, height, channels: 3, background: "#101214" },
        })
          .jpeg({ quality: 88 })
          .toBuffer();
      }
      cells.push({
        input,
        left: margin + columnIndex * (width + gap),
        top: margin + pageIndex * (height + gap),
      });
    }
  }

  await sharp({
    create: {
      width: margin * 2 + width * 3 + gap * 2,
      height: margin * 2 + height * 4 + gap * 3,
      channels: 3,
      background: "#171717",
    },
  })
    .composite(cells)
    .jpeg({ quality: 90 })
    .toFile(destination);
}

async function writeCarouselPreview(rows, column, destination) {
  const width = 400;
  const height = 500;
  const gap = 8;
  const margin = 16;
  const panels = [];

  for (let pageIndex = 0; pageIndex < column.pages; pageIndex += 1) {
    panels.push(
      await sharp(rows[pageIndex])
        .extract({ left: column.x, top: 45, width: 1080, height: 1350 })
        .resize(width, height)
        .jpeg({ quality: 89 })
        .toBuffer(),
    );
  }

  await sharp({
    create: {
      width: margin * 2 + width * panels.length + gap * (panels.length - 1),
      height: margin * 2 + height,
      channels: 3,
      background: "#171717",
    },
  })
    .composite(
      panels.map((input, index) => ({
        input,
        left: margin + index * (width + gap),
        top: margin,
      })),
    )
    .jpeg({ quality: 90 })
    .toFile(destination);
}

async function renderBundle(page, config) {
  const out = path.join(social, config.folder);
  fs.mkdirSync(out, { recursive: true });
  const rows = await loadRows(page, config.source);

  await sharp(rows[0]).toFile(path.join(out, "master-covers-3240x1440.png"));
  await sharp(rows[0])
    .resize({ width: 1620 })
    .jpeg({ quality: 91, chromaSubsampling: "4:4:4" })
    .toFile(path.join(out, "preview-continuous.jpg"));

  const covers = [];
  for (const column of config.columns) {
    for (let pageIndex = 0; pageIndex < column.pages; pageIndex += 1) {
      const suffix = column.pages === 1 ? "" : `-0${pageIndex + 1}`;
      const panel = await writePanel(
        rows[pageIndex],
        column.x,
        path.join(out, `${column.stem}${suffix}.png`),
        path.join(out, `${column.upload}${suffix}.jpg`),
      );
      if (pageIndex === 0) covers.push(panel);
    }
  }

  await writeGridPreview(covers, path.join(out, "preview-instagram-grid.jpg"));
  await writeAllPagesPreview(rows, config.columns, path.join(out, "preview-all-pages.jpg"));
  for (const column of config.columns) {
    if (column.pages > 1) {
      await writeCarouselPreview(
        rows,
        column,
        path.join(out, `preview-${column.stem}.jpg`),
      );
    }
  }
  return out;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 3240, height: 1440 } });

  await renderBundle(page, {
    folder: "content-triptych-v1",
    source: "piton-docs/social-production/content-triptych-v1/content-row.html",
    columns: [
      { x: 0, stem: "web-carousel", upload: "upload-03-web-carousel", pages: 4 },
      { x: 1080, stem: "contact-single", upload: "upload-02-contact", pages: 1 },
      { x: 2160, stem: "ai-carousel", upload: "upload-01-ai-carousel", pages: 4 },
    ],
  });

  await renderBundle(page, {
    folder: "content-triptych-v2",
    source: "piton-docs/social-production/content-triptych-v2/conversion-row.html",
    columns: [
      { x: 0, stem: "form-carousel", upload: "upload-03-form-carousel", pages: 4 },
      { x: 1080, stem: "mini-review-single", upload: "upload-02-mini-review", pages: 1 },
      { x: 2160, stem: "conversion-carousel", upload: "upload-01-conversion-carousel", pages: 4 },
    ],
  });

  await renderBundle(page, {
    folder: "content-triptych-v4",
    source: "piton-docs/social-production/content-triptych-v4/system-row.html",
    columns: [
      { x: 0, stem: "crm-carousel", upload: "upload-03-crm-carousel", pages: 4 },
      { x: 1080, stem: "process-map-single", upload: "upload-02-process-map", pages: 1 },
      { x: 2160, stem: "automation-carousel", upload: "upload-01-automation-carousel", pages: 4 },
    ],
  });

  await renderBundle(page, {
    folder: "content-triptych-v5",
    source: "piton-docs/social-production/content-triptych-v5/growth-row.html",
    columns: [
      { x: 0, stem: "reporting-carousel", upload: "upload-03-reporting-carousel", pages: 4 },
      { x: 1080, stem: "growth-audit-single", upload: "upload-02-growth-audit", pages: 1 },
      { x: 2160, stem: "acquisition-carousel", upload: "upload-01-acquisition-carousel", pages: 4 },
    ],
  });

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
