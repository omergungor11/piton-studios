import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Official Fontshare CSS: https://api.fontshare.com/v2/css?f[]=nippo@500,700&display=swap
// Nippo permits self-hosting; Qurova DEMO is only for the local font comparison.
// Keep these font binaries out of the public repository.
const fonts = [
  {
    file: 'nippo-medium.woff2',
    url: 'https://cdn.fontshare.com/wf/CDTACYC4IPPNPYZXG4P4UHS7QK72WJY6/64YLI2LOSKHSMW7BAB55H3OT6QONCPIY/A33XXN3HW5OI7KZNTLP322IHAOQINDEQ.woff2',
  },
  {
    file: 'nippo-bold.woff2',
    url: 'https://cdn.fontshare.com/wf/AFAHDMOVBCROSSGE5GOSMLJMR75FYHZP/MX7VPGBDFGT7ERCST2IAA4LH5KO7BZNK/B3C3BZREKEN22Q6DYVZUXV3W4RJM63VW.woff2',
  },
  {
    file: 'qurova-demo-bold.otf',
    url: 'https://st.1001fonts.net/download/font/qurova-demo.bold.otf',
    signature: 'OTTO',
  },
];

const directory = new URL('../src/lib/fonts/', import.meta.url);
const isFont = (data, signature) => data.length > 1024 && data.subarray(0, 4).toString('ascii') === signature;

async function ensureFont({ file, url, signature = 'wOF2' }) {
  const target = new URL(file, directory);
  try {
    if (isFont(await readFile(target), signature)) return;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Font download failed (${response.status}): ${file}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (!isFont(data, signature)) throw new Error(`Invalid font response: ${file}`);

  const temporary = `${fileURLToPath(target)}.${process.pid}.tmp`;
  await writeFile(temporary, data);
  await rename(temporary, target);
  console.log(`Font ready: ${file} (${data.length} bytes)`);
}

await mkdir(directory, { recursive: true });
await Promise.all(fonts.map(ensureFont));
