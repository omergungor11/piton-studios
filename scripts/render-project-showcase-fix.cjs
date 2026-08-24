const { chromium } = require("playwright");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");

const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "piton-docs/social-production/project-triptych-v4/project-rows-04-07.html",
);
const virginiaDesktop = path.join(
  root,
  "website-flows/microlink-screenshots-desktop/https-virginiaicecream.com-.png",
);
const output = path.join(
  root,
  "public/assets/social/project-triptych-mixed-v1",
);

const projects = [
  { selector: ".r5 .panel:nth-child(1)", slug: "sammys-hotel", upload: "03" },
  {
    selector: ".r5 .panel:nth-child(2)",
    slug: "virginia-ice-cream",
    upload: "02",
  },
  {
    selector: ".r7 .panel:nth-child(3)",
    slug: "pinnacle-yatirim",
    upload: "01",
  },
];

async function writePanel(master, index, project) {
  const panel = await sharp(master)
    .extract({ left: index * 1080, top: 0, width: 1080, height: 1440 })
    .png()
    .toBuffer();

  await sharp(panel).toFile(
    path.join(output, `panel-${index + 1}-${project.slug}.png`),
  );
  await sharp(panel)
    .extract({ left: 0, top: 45, width: 1080, height: 1350 })
    .jpeg({ quality: 94, chromaSubsampling: "4:4:4" })
    .toFile(path.join(output, `upload-${project.upload}-${project.slug}.jpg`));

  return panel;
}

async function writePreview(panels) {
  const width = 400;
  const height = 500;
  const gap = 14;
  const margin = 24;
  const inputs = await Promise.all(
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
      inputs.map((input, index) => ({
        input,
        left: margin + index * (width + gap),
        top: margin,
      })),
    )
    .jpeg({ quality: 90 })
    .toFile(path.join(output, "preview-instagram-grid.jpg"));
}

(async () => {
  fs.mkdirSync(output, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 3240, height: 1440 } });
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

  await page.evaluate(({ projectSelectors, virginiaDesktopUrl }) => {
    const panels = projectSelectors.map(({ selector }) => {
      const panel = document.querySelector(selector);
      if (!panel) throw new Error(`Panel bulunamadi: ${selector}`);
      return panel.cloneNode(true);
    });

    const row = document.createElement("section");
    row.className = "row r5 corrected-showcase";
    panels.forEach((panel, index) => {
      panel.querySelector(".series").textContent = "Project Showcase / 01";
      panel.querySelector(".top b").textContent = `0${index + 1} / 03`;
      panel.querySelector(".footer span").textContent = "pitonstudios.com";
      row.appendChild(panel);
    });

    panels[1].querySelector(".desktop img").src = virginiaDesktopUrl;
    panels[2].querySelector(".collab")?.remove();

    const dataLine = document.createElement("div");
    dataLine.className = "data-line";
    row.appendChild(dataLine);

    document.body.replaceChildren(row);
    document.body.style.height = "1440px";
    row.style.top = "0";
  }, {
    projectSelectors: projects,
    virginiaDesktopUrl: pathToFileURL(virginiaDesktop).href,
  });

  await page.evaluate(async () => {
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

  const master = await page.locator(".corrected-showcase").screenshot({
    type: "png",
    animations: "disabled",
  });
  await sharp(master).toFile(path.join(output, "master-3240x1440.png"));

  const panels = [];
  for (let index = 0; index < projects.length; index += 1) {
    panels.push(await writePanel(master, index, projects[index]));
  }
  await writePreview(panels);
  await browser.close();
})();
