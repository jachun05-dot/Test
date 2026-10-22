import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}

test('site builds and every page is valid', () => {
  execFileSync('node', [join(ROOT, 'scripts/build.js')], { stdio: 'pipe' });
  const files = htmlFiles(DIST).filter((f) => !f.endsWith('404.html'));
  assert.ok(files.length >= 130, `only ${files.length} pages`);

  const titles = new Map();
  const broken = [];
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    const rel = file.slice(DIST.length);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${rel}: missing title`);
    assert.ok(!titles.has(title), `${rel}: duplicate title "${title}" (also ${titles.get(title)})`);
    titles.set(title, rel);
    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
    assert.ok(desc.length >= 50 && desc.length <= 170, `${rel}: description length ${desc.length}`);
    assert.match(html, /<link rel="canonical" href="https:\/\/[^"]+\/"/, `${rel}: canonical`);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${rel}: exactly one h1`);
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const target = join(DIST, href, href.endsWith('/') ? 'index.html' : '');
      if (!existsSync(target)) broken.push(`${rel} -> ${href}`);
    }
    for (const [, src] of html.matchAll(/src="(\/[^"?]*)/g)) {
      if (!existsSync(join(DIST, src))) broken.push(`${rel} -> ${src}`);
    }
  }
  assert.deepEqual(broken, [], 'broken internal links');

  const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, files.length, 'sitemap lists every page');
  assert.match(readFileSync(join(DIST, 'robots.txt'), 'utf8'), /Sitemap: https:\/\//);
});
