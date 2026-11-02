// The Worker redirects www to the bare domain and serves everything else as files.
import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';

const env = { ASSETS: { fetch: async () => new Response('file') } };

test('www redirects permanently to the bare domain, keeping path and query', async () => {
  const res = await worker.fetch(new Request('https://www.endlessmathsheets.com/fractions/?p=a4'), env);
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('location'), 'https://endlessmathsheets.com/fractions/?p=a4');
});

test('the bare domain is served from static files', async () => {
  const res = await worker.fetch(new Request('https://endlessmathsheets.com/sitemap.xml'), env);
  assert.equal(await res.text(), 'file');
});
