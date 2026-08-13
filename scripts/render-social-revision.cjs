const { chromium } = require("playwright");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const social = path.join(root, "public/assets/social");

async function capture(page, source, height) {
  await page.setViewportSize({ width: 3240, height });
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
  return page.screenshot({ type: "png", animations: "disabled" });
}

async function writePanel(master, x, y, pngPath, jpgPath) {
  const panel = await sharp(master)
    .extract({ left: x, top: y, width: 1080, height: 1440 })
    .png()
    .toBuffer();
  if (pngPath) await sharp(panel).toFile(pngPath);
  if (jpgPath) {
    await sharp(panel)
      .extract({ left: 0, top: 45, width: 1080, height: 1350 })
      .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
      .toFile(jpgPath);
  }
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
    .jpeg({ quality: 90 })
    .toFile(destination);
}

async function renderGrid(page) {
  const out = path.join(social, "grid-triptych-v1");
  const master = await capture(
    page,
    "piton-docs/social-production/grid-triptych-v1/triptych.html",
    1440,
  );
  await sharp(master).toFile(path.join(out, "master-3240x1440.png"));
  const left = await writePanel(
    master,
    0,
    0,
    path.join(out, "panel-left.png"),
    path.join(out, "upload-03-left.jpg"),
  );
  const center = await writePanel(
    master,
    1080,
    0,
    path.join(out, "panel-center.png"),
    path.join(out, "upload-02-center.jpg"),
  );
  const right = await writePanel(
    master,
    2160,
    0,
    path.join(out, "panel-right.png"),
    path.join(out, "upload-01-right.jpg"),
  );
  await writeGridPreview([left, center, right], path.join(out, "preview-instagram-grid.jpg"));
}

async function renderProjectRows(page) {
  const master = await capture(
    page,
    "piton-docs/social-production/project-triptych-v2/project-rows.html",
    2880,
  );
  const rows = [
    {
      y: 0,
      folder: "project-triptych-v2",
      panels: ["gel-gez-gor", "mindloop", "securify"],
    },
    {
      y: 1440,
      folder: "project-triptych-v3",
      panels: ["arac-takip", "jack-3d-creator", "veldara"],
    },
  ];

  for (const row of rows) {
    const out = path.join(social, row.folder);
    const rowMaster = await sharp(master)
      .extract({ left: 0, top: row.y, width: 3240, height: 1440 })
      .png()
      .toBuffer();
    await sharp(rowMaster).toFile(path.join(out, "master-3240x1440.png"));
    const panels = [];
    for (let index = 0; index < 3; index += 1) {
      const panel = await writePanel(
        rowMaster,
        index * 1080,
        0,
        path.join(out, `panel-${index + 1}-${row.panels[index]}.png`),
        path.join(out, `upload-0${3 - index}-${row.panels[index]}.jpg`),
      );
      panels.push(panel);
    }
    await writeGridPreview(panels, path.join(out, "preview-instagram-grid.jpg"));
  }
}

async function renderProjectArchive(page, source, firstRow, lastRow) {
  await capture(page, source, 1440);
  const namesByRow = {
    4: ["radyo-juke", "halas-exchange", "arslan-coin-center"],
    5: ["sammys-hotel", "virginia-ice-cream", "dental-health"],
    6: ["beton-store", "alert-muhendislik", "velis-ltd"],
    7: ["lithos", "vanguard", "pinnacle-yatirim"],
    8: ["pampas-investment", "homes-in-mediterranean", "arslan-estates"],
    9: ["alp-sigorta", "all-pro-cyprus", "ozge-ozler"],
    10: ["aydin-transfer", "kardesler-taxi", "kibris-lefkosa-taksi"],
    11: ["bt-elevator", "ekh-yapi", "rnv-trading"],
  };

  for (let rowNumber = firstRow; rowNumber <= lastRow; rowNumber += 1) {
    const out = path.join(social, `project-triptych-v${rowNumber}`);
    fs.mkdirSync(out, { recursive: true });
    const rowMaster = await page.locator(`.r${rowNumber}`).screenshot({
      type: "png",
      animations: "disabled",
    });
    await sharp(rowMaster).toFile(path.join(out, "master-3240x1440.png"));
    const panels = [];
    for (let index = 0; index < 3; index += 1) {
      const panel = await writePanel(
        rowMaster,
        index * 1080,
        0,
        path.join(out, `panel-${index + 1}-${namesByRow[rowNumber][index]}.png`),
        path.join(out, `upload-0${3 - index}-${namesByRow[rowNumber][index]}.jpg`),
      );
      panels.push(panel);
    }
    await writeGridPreview(panels, path.join(out, "preview-instagram-grid.jpg"));
  }
}

async function renderContent(page) {
  const out = path.join(social, "content-triptych-v3");
  const master = await capture(
    page,
    "piton-docs/social-production/content-triptych-v3/website-value-row.html",
    5760,
  );
  await sharp(master)
    .extract({ left: 0, top: 0, width: 3240, height: 1440 })
    .toFile(path.join(out, "master-covers-3240x1440.png"));

  const columns = [
    { x: 0, stem: "website-carousel", upload: "upload-03-website-carousel" },
    { x: 1080, stem: "piton-carousel", upload: "upload-02-piton-carousel" },
    { x: 2160, stem: "channels-carousel", upload: "upload-01-channels-carousel" },
  ];
  const coverPanels = [];
  for (const column of columns) {
    for (let pageIndex = 0; pageIndex < 4; pageIndex += 1) {
      const panel = await writePanel(
        master,
        column.x,
        pageIndex * 1440,
        path.join(out, `${column.stem}-0${pageIndex + 1}.png`),
        path.join(out, `${column.upload}-0${pageIndex + 1}.jpg`),
      );
      if (pageIndex === 0) coverPanels.push(panel);
    }
  }
  await writeGridPreview(coverPanels, path.join(out, "preview-instagram-grid.jpg"));
}

async function renderEditorialBundle(page, source, folder, columns) {
  const out = path.join(social, folder);
  fs.mkdirSync(out, { recursive: true });
  await capture(page, source, 1440);
  const rows = [];
  for (let pageIndex = 0; pageIndex < 4; pageIndex += 1) {
    rows.push(
      await page.locator(".canvas").nth(pageIndex).screenshot({
        type: "png",
        animations: "disabled",
      }),
    );
  }
  await sharp(rows[0]).toFile(path.join(out, "master-covers-3240x1440.png"));

  const coverPanels = [];
  for (const column of columns) {
    for (let pageIndex = 0; pageIndex < column.pages; pageIndex += 1) {
      const suffix = column.pages === 1 ? "" : `-0${pageIndex + 1}`;
      const panel = await writePanel(
        rows[pageIndex],
        column.x,
        0,
        path.join(out, `${column.stem}${suffix}.png`),
        path.join(out, `${column.upload}${suffix}.jpg`),
      );
      if (pageIndex === 0) coverPanels.push(panel);
    }
  }
  await writeGridPreview(coverPanels, path.join(out, "preview-instagram-grid.jpg"));
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 3240, height: 1440 } });
  await renderGrid(page);
  await renderProjectRows(page);
  await renderProjectArchive(
    page,
    "piton-docs/social-production/project-triptych-v4/project-rows-04-07.html",
    4,
    7,
  );
  await renderProjectArchive(
    page,
    "piton-docs/social-production/project-triptych-v8/project-rows-08-11.html",
    8,
    11,
  );
  await renderEditorialBundle(
    page,
    "piton-docs/social-production/content-triptych-v1/content-row.html",
    "content-triptych-v1",
    [
      { x: 0, stem: "web-carousel", upload: "upload-03-web-carousel", pages: 4 },
      { x: 1080, stem: "contact-single", upload: "upload-02-contact", pages: 1 },
      { x: 2160, stem: "ai-carousel", upload: "upload-01-ai-carousel", pages: 4 },
    ],
  );
  await renderEditorialBundle(
    page,
    "piton-docs/social-production/content-triptych-v2/conversion-row.html",
    "content-triptych-v2",
    [
      { x: 0, stem: "form-carousel", upload: "upload-03-form-carousel", pages: 4 },
      { x: 1080, stem: "mini-review-single", upload: "upload-02-mini-review", pages: 1 },
      { x: 2160, stem: "conversion-carousel", upload: "upload-01-conversion-carousel", pages: 4 },
    ],
  );
  await renderContent(page);
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
