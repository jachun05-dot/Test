// Builds the static site into dist/ (or dist-preview/ with --preview).
import { mkdir, rm, writeFile, readFile, copyFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import site from '../site.config.js';
import { CATEGORIES, CATEGORY_BY_SLUG } from '../src/content/categories.js';
import { WORKSHEETS } from '../src/content/worksheets.js';
import { GRADES } from '../src/content/grades.js';
import { YEARS } from '../src/content/years.js';
import { staticPages } from '../src/content/static.js';
import { linker, worksheetPage, categoryPage, gradePage, yearPage, homePage, textPage, notFoundPage } from '../src/site/pages.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const preview = process.argv.includes('--preview');
const OUT = join(ROOT, preview ? 'dist-preview' : 'dist');

async function write(rel, content) {
  const file = join(OUT, rel);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

async function copyDir(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    const src = join(from, entry.name);
    const dst = join(to, entry.name);
    if (entry.isDirectory()) await copyDir(src, dst);
    else await copyFile(src, dst);
  }
}

function checkContent() {
  const slugs = new Set();
  for (const w of WORKSHEETS) {
    if (slugs.has(w.slug)) throw new Error(`Duplicate slug ${w.slug}`);
    slugs.add(w.slug);
    if (!CATEGORY_BY_SLUG[w.cat]) throw new Error(`${w.slug}: unknown category ${w.cat}`);
    if (!CATEGORY_BY_SLUG[w.cat].groups.includes(w.group)) throw new Error(`${w.slug}: unknown group ${w.group}`);
    if (!w.counts.includes(w.count)) throw new Error(`${w.slug}: default count not in counts`);
    if (w.alt && !slugs.has(w.alt) && !WORKSHEETS.some((x) => x.slug === w.alt)) throw new Error(`${w.slug}: alt ${w.alt} not found`);
  }
}

async function main() {
  checkContent();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const fontsCss = await readFile(join(ROOT, 'src/site/fonts.css'), 'utf8');
  const css = (preview ? '' : fontsCss) + (await readFile(join(ROOT, 'src/site/site.css'), 'utf8'));
  // Preload the faces every page uses first: body text, headings and worksheet digits,
  // so text does not reflow (and push the page around) when a font arrives late.
  const preloadFonts = [...fontsCss.matchAll(/url\((\/fonts\/(?:atkinson-hyperlegible-386222|bricolage-grotesque-[a-f0-9]+|lexend-[a-f0-9]+)\.woff2)\)/g)].map((m) => m[1]);
  const app = await readFile(join(ROOT, 'src/client/app.js'), 'utf8');
  const version = createHash('sha1').update(css).update(app).digest('hex').slice(0, 8);

  await write('assets/site.css', css);
  await copyDir(join(ROOT, 'src/engine'), join(OUT, 'assets/js/engine'));
  await write('assets/js/app.js', app);
  await copyDir(join(ROOT, 'src/static'), OUT);
  if (preview) await rm(join(OUT, 'fonts'), { recursive: true, force: true });

  const updated = new Date().toISOString().slice(0, 10);
  const year = new Date().getFullYear();
  // hreflang: each UK page and its US twin point at each other.
  const alternates = {};
  for (const w of WORKSHEETS) {
    if (!w.alt) continue;
    const us = `/${w.alt}/`;
    const uk = `/${w.slug}/`;
    const set = [['en-us', us], ['en-gb', uk], ['en-au', uk], ['x-default', us]];
    alternates[w.slug] = set;
    alternates[w.alt] = set;
  }
  const base = { alternates, years: YEARS, site, categories: CATEGORIES, catBySlug: CATEGORY_BY_SLUG, worksheets: WORKSHEETS, grades: GRADES, version, preview, year, preloadFonts: [...new Set(preloadFonts)] };
  const ctxFor = (path, section) => ({ ...base, link: linker(path, preview), section });
  const pages = [];
  const add = async (path, html) => {
    pages.push(path);
    await write(path === '/' ? 'index.html' : `${path.slice(1)}index.html`, html);
  };

  await add('/', homePage(ctxFor('/')));
  for (const cat of CATEGORIES) await add(`/${cat.slug}/`, categoryPage(ctxFor(`/${cat.slug}/`, cat.slug), cat));
  for (const g of GRADES) await add(`/${g.slug}/`, gradePage(ctxFor(`/${g.slug}/`), g));
  for (const y of YEARS) await add(`/${y.slug}/`, yearPage(ctxFor(`/${y.slug}/`), y));
  for (const ws of WORKSHEETS) await add(`/${ws.slug}/`, worksheetPage(ctxFor(`/${ws.slug}/`, ws.cat), ws));
  for (const sp of staticPages(site, WORKSHEETS.length, updated)) await add(sp.path, textPage(ctxFor(sp.path), sp));
  await write('404.html', notFoundPage(ctxFor('/')));

  if (!preview) {
    const urls = pages
      .map((p) => `<url><loc>${site.url}${p}</loc><lastmod>${updated}</lastmod></url>`)
      .join('\n');
    await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
    await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
    if (site.adsense.client) {
      const pub = site.adsense.client.replace(/^ca-/, '');
      await write('ads.txt', `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
    }
  }
  console.log(`Built ${pages.length} pages into ${OUT.replace(ROOT + '/', '')}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
