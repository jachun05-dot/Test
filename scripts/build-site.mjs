// Copies the files the app needs into site/, ready to upload to any static host.
// Run after `tsc`. Usage: node scripts/build-site.mjs [public base URL]
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const out = 'site';
const files = ['index.html', 'styles.css', 'sw.js', 'manifest.webmanifest', 'icons', 'dist'];

if (!existsSync('dist/app/main.js')) {
  console.error('dist/ is missing. Run `npx tsc` first.');
  process.exit(1);
}
rmSync(out, { recursive: true, force: true });
for (const f of files) {
  cpSync(f, `${out}/${f}`, { recursive: true, filter: (src) => !src.endsWith('.map') });
}

// Link previews (KakaoTalk, Slack, etc.) need absolute URLs.
const base = (process.argv[2] || process.env.SITE_URL || '').replace(/\/+$/, '');
if (base) {
  const page = `${out}/index.html`;
  const html = readFileSync(page, 'utf8')
    .replace('content="icons/icon-512.png"', `content="${base}/icons/icon-512.png"`)
    .replace('<meta property="og:type"', `<meta property="og:url" content="${base}/" />\n    <meta property="og:type"`);
  writeFileSync(page, html);
}
console.log(`Built ${out}/${base ? ` for ${base}` : ''}`);
