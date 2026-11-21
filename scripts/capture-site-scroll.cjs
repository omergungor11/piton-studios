// Canlı bir siteyi masaüstü + mobil görünümde yumuşak kaydırarak kare kare kaydeder.
// Çıktı: <outDir>/desktop/f-0000.jpg ... ve <outDir>/mobile/f-0000.jpg ...
// Kullanım: node scripts/capture-site-scroll.cjs <url> <outDir> [kareSayısı=228] [masaüstüPx=2600] [mobilPx=3000]
// Playwright projede bağımlılık değildir; NODE_PATH ile verin (bkz. render-ai-entegrasyon-ad.cjs başlığı).
const { chromium } = require("playwright-core");
const path = require("path");
const fs = require("fs");

const [url, outDir, framesArg, desktopArg, mobileArg] = process.argv.slice(2);
if (!url || !outDir) {
  console.error("Kullanım: capture-site-scroll.cjs <url> <outDir> [kare] [masaüstüPx] [mobilPx]");
  process.exit(1);
}
const frames = Number(framesArg || 228);

const targets = [
  { name: "desktop", distance: Number(desktopArg || 2600), viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  {
    name: "mobile",
    distance: Number(mobileArg || 3000),
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  },
];

// Başta ve sonda yavaşlayan kaydırma (smootherstep)
const ease = (p) => p * p * p * (p * (p * 6 - 15) + 10);

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const { name, distance, ...opts } of targets) {
    const dir = path.join(outDir, name);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    const ctx = await browser.newContext({ ...opts, locale: "tr-TR" });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(4000);
    // Çerez banner'ı varsa kapat (yoksa sessizce geç)
    await page
      .getByRole("button", { name: /kabul et|accept/i })
      .first()
      .click({ timeout: 3000 })
      .catch(() => {});

    // Ön tur: tembel yüklenen görseller ve görünürlük animasyonları kayıttan önce tamamlansın
    for (let y = 0; y <= distance + 900; y += 300) {
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    for (let i = 0; i < frames; i += 1) {
      const y = Math.round(ease(i / (frames - 1)) * distance);
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(30);
      await page.screenshot({
        path: path.join(dir, `f-${String(i).padStart(4, "0")}.jpg`),
        type: "jpeg",
        quality: 88,
      });
    }
    console.log(`${name}: ${frames} kare, ${distance}px`);
    await ctx.close();
  }
  await browser.close();
})();
