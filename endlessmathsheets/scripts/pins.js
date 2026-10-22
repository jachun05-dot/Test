// Renders Pinterest pin images (1000x1500) and a bulk-upload CSV.
// Needs Playwright with Chromium. Run after `npm run build`:
//   node scripts/pins.js [first-publish-date YYYY-MM-DD]
// Images go to src/static/pins/ (deployed at /pins/...), the CSV to pinterest-pins.csv.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.js';
import { WORKSHEETS } from '../src/content/worksheets.js';
import { PINS, PIN_BOARD } from '../src/content/pins.js';
import { worksheetConfig, gradeText } from '../src/site/pages.js';
import { makeWorksheet } from '../src/engine/index.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'src/static/pins');

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    if (process.env.PLAYWRIGHT_MODULE) return import(process.env.PLAYWRIGHT_MODULE);
    throw new Error('Playwright is not installed. Run `npm i -D playwright` or set PLAYWRIGHT_MODULE.');
  }
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const fileName = (pin) => `${pin.slug.replace(/\//g, '-')}.jpg`;

function pinHtml(pin) {
  const ws = WORKSHEETS.find((w) => w.slug === pin.slug);
  if (!ws) throw new Error(`No worksheet ${pin.slug}`);
  const cfg = worksheetConfig(ws, site);
  const { html } = makeWorksheet(cfg, { seed: 424242, count: ws.count, format: ws.format, params: {} });
  const cut = html.indexOf('<section class="sheet is-key">');
  const front = html.slice(0, html.indexOf('</section>') + 10);
  const key = html.slice(cut, html.indexOf('</section>', cut) + 10);
  const len = pin.title.length;
  const size = len <= 24 ? 104 : len <= 32 ? 92 : len <= 40 ? 82 : 74;
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/assets/site.css"><style>
html,body{margin:0;width:1000px;height:1500px;overflow:hidden;background:#fff}
.pin{position:relative;width:1000px;height:1500px;overflow:hidden;
 background:linear-gradient(90deg,transparent 62px,#e0746b 62px 65px,transparent 65px),repeating-linear-gradient(180deg,transparent 0 47px,#cbdaf0 47px 49px),#fff}
.top{position:absolute;inset:0 0 auto 0;height:560px;background:${pin.color};color:#fff;padding:40px 70px 56px 100px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.label{display:inline-block;background:#f6b81a;color:#241b00;font:800 30px/1 var(--font-display);letter-spacing:.07em;text-transform:uppercase;padding:13px 18px 12px;border-radius:10px}
.title{font:800 ${size}px/1.02 var(--font-display);letter-spacing:-.02em;margin:30px 0 0;text-wrap:balance;max-width:820px}
.sub{font:700 38px/1.25 var(--font-body);margin-top:24px;max-width:600px;opacity:.95}
.s{position:absolute;width:690px}
.s .sheet{box-shadow:0 18px 50px rgb(22 32 58/.28);border-radius:4px}
.s-key{left:250px;top:640px;transform:rotate(4deg)}
.s-front{left:105px;top:615px;transform:rotate(-2.5deg)}
.sticker{position:absolute;right:52px;top:478px;width:210px;height:210px;border-radius:50%;background:#f6b81a;color:#241b00;display:grid;place-items:center;text-align:center;
 font:800 31px/1.05 var(--font-display);transform:rotate(11deg);box-shadow:0 10px 30px rgb(0 0 0/.25);z-index:3;letter-spacing:-.01em}
.foot{position:absolute;left:0;right:0;bottom:0;height:124px;background:#16203a;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 56px 0 100px;z-index:4;font:700 36px var(--font-body)}
.foot .b{display:flex;align-items:center;gap:16px}
.foot svg{width:52px;height:52px}
.foot .g{background:#fff;color:#16203a;border-radius:999px;padding:8px 22px;font-size:30px}
</style></head><body><div class="pin">
<div class="s s-key sheets" data-paper="letter" data-view="key">${key}</div>
<div class="s s-front sheets" data-paper="letter" data-view="sheet">${front}</div>
<div class="top"><span class="label">Free printable</span><h1 class="title">${esc(pin.title)}</h1><p class="sub">${esc(pin.sub)}</p></div>
<div class="sticker">Answer<br>key<br>included</div>
<div class="foot"><span class="b"><svg viewBox="0 0 40 40"><rect x="9" y="3" width="26" height="32" rx="4" fill="#f6b81a"/><rect x="4" y="7" width="26" height="31" rx="4" fill="#fff" stroke="#fff" stroke-width="1"/><path d="M10 17h14M10 23h14M10 29h8" stroke="#1f4fbf" stroke-width="2.5" stroke-linecap="round"/><path d="M8 8v29" stroke="#e0746b" stroke-width="1.6"/></svg>${site.domain}</span><span class="g">${esc(gradeText(ws.grades))}</span></div>
</div></body></html>`;
}

const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;

async function main() {
  const start = process.argv[2] || new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const pages = new Map(PINS.map((pin, i) => [`/_pin/${i}`, pinHtml(pin)]));
  const TYPES = { '.css': 'text/css', '.woff2': 'font/woff2', '.js': 'text/javascript' };
  const server = createServer(async (req, res) => {
    const path = new URL(req.url, 'http://x').pathname;
    if (pages.has(path)) {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end(pages.get(path));
    }
    try {
      const file = join(DIST, path);
      await stat(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;

  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1500 } });
  await mkdir(OUT, { recursive: true });
  for (let i = 0; i < PINS.length; i++) {
    await page.goto(`http://localhost:${port}/_pin/${i}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(OUT, fileName(PINS[i])), type: 'jpeg', quality: 88 });
  }
  await browser.close();
  server.close();

  // One pin a day at 01:00 UTC (evening in the US).
  const rows = [['Title', 'Media URL', 'Pinterest board', 'Thumbnail', 'Description', 'Link', 'Publish date', 'Keywords']];
  PINS.forEach((pin, i) => {
    const date = new Date(`${start}T01:00:00Z`);
    date.setUTCDate(date.getUTCDate() + i);
    rows.push([
      pin.pinTitle,
      `${site.url}/pins/${fileName(pin)}`,
      PIN_BOARD,
      '',
      pin.description,
      `${site.url}/${pin.slug}/`,
      date.toISOString().slice(0, 19),
      pin.keywords,
    ]);
  });
  await writeFile(join(ROOT, 'pinterest-pins.csv'), rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n');
  console.log(`Rendered ${PINS.length} pins into src/static/pins/ and wrote pinterest-pins.csv (first pin ${start}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
