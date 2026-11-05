// The Worker redirects www, adds security headers and accepts CSP reports.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
import HEADERS from '../src/generated-headers.js';

const env = { ASSETS: { fetch: async () => new Response('file', { headers: { 'content-type': 'text/html' } }) } };

test('www redirects permanently to the bare domain, keeping path and query', async () => {
  const res = await worker.fetch(new Request('https://www.endlessmathsheets.com/fractions/?p=a4'), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://endlessmathsheets.com/fractions/?p=a4');
});

test('files come from the static assets with every security header', async () => {
  const res = await worker.fetch(new Request('https://endlessmathsheets.com/sitemap.xml'), env);
  assert.equal(await res.text(), 'file');
  for (const [k, v] of Object.entries(HEADERS)) assert.equal(res.headers.get(k), v);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.match(res.headers.get('strict-transport-security'), /max-age=63072000/);
});

test('CSP stays report-only and allows AdSense and the inline script hash', () => {
  const csp = HEADERS['Content-Security-Policy-Report-Only'];
  assert.ok(csp, 'report-only policy present');
  assert.equal(HEADERS['Content-Security-Policy'], undefined);
  assert.match(csp, /pagead2\.googlesyndication\.com/);
  assert.match(csp, /static\.cloudflareinsights\.com/);
  assert.match(csp, /'sha256-[A-Za-z0-9+/=]+'/);
  assert.equal(HEADERS['Cross-Origin-Opener-Policy'], 'same-origin-allow-popups');
});

test('CSP reports are accepted', async () => {
  const res = await worker.fetch(new Request('https://endlessmathsheets.com/csp-report', { method: 'POST', body: JSON.stringify({ 'csp-report': { 'blocked-uri': 'https://x.test/a.js' } }) }), env);
  assert.equal(res.status, 204);
  assert.equal((await worker.fetch(new Request('https://endlessmathsheets.com/csp-report'), env)).status, 405);
});
