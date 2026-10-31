// Worked examples in the teaching guides: the drawn digits must be right.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addWork, subWork, mulWork, divWork, decWork, busWork } from '../src/site/work.js';

const cells = (html, cls) => [...html.matchAll(new RegExp(`<span class="([^"]*\\b${cls}\\b[^"]*)">(?:<small class="cr">[^<]*</small>)?([^<]*)</span>`, 'g'))].map((m) => m[2]);
const carried = (html) => [...html.matchAll(/<small class="cr">([^<]*)<\/small>/g)].map((m) => m[1]);

test('subtraction shows each regrouped value in one column', () => {
  assert.deepEqual(cells(subWork(62, 27), 'cy'), ['5', '12']);
  assert.deepEqual(cells(subWork(523, 168), 'cy'), ['4', '11', '13']);
  assert.deepEqual(cells(subWork(400, 127), 'cy'), ['3', '9', '10']);
  assert.equal(cells(subWork(400, 127), 'an').join(''), '273');
});

test('addition and multiplication show carries and answers', () => {
  assert.deepEqual(cells(addWork(586, 275), 'cy'), ['1', '1']);
  assert.equal(cells(addWork(586, 275), 'an').join(''), '861');
  assert.deepEqual(cells(mulWork(47, 6), 'cy'), ['4']);
  assert.equal(cells(mulWork(36, 24), 'an').join(''), '864');
});

test('division layouts', () => {
  assert.equal(divWork(624, 6).quotient, 104);
  assert.equal(cells(divWork(485, 4).html, 'an').join(''), '121R1');
  const bus = busWork(7412, 9);
  assert.equal(cells(bus, 'an').join(''), '823r5');
  assert.deepEqual(carried(bus), ['7', '2', '3']);
  assert.equal(cells(decWork('8', '2.35', '-'), 'an').join(''), '5.65');
});

test('random worked examples check themselves', () => {
  let seed = 7;
  const rnd = (lo, hi) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return lo + (seed % (hi - lo + 1));
  };
  for (let i = 0; i < 400; i++) {
    const a = rnd(10, 99999);
    const b = rnd(1, a - 1);
    addWork(a, b);
    subWork(a, b);
    mulWork(rnd(2, 999), rnd(2, 99));
    divWork(rnd(10, 9999), rnd(2, 49));
    busWork(rnd(10, 9999), rnd(2, 9));
  }
});

test('worksheet worked examples hold for many random problems', async () => {
  const { WORKSHEETS } = await import('../src/content/worksheets.js');
  const { GENERATORS } = await import('../src/engine/generators.js');
  const { makeRng } = await import('../src/engine/rng.js');
  const { workedExample } = await import('../src/site/explain.js');
  let shown = 0;
  for (const ws of WORKSHEETS) {
    for (let seed = 1; seed <= 40; seed++) {
      const p = GENERATORS[ws.gen].generate(makeRng(seed * 7919), { ...ws.params }, ws.count)[0];
      const html = workedExample(ws, p);
      if (!html) continue;
      shown++;
      assert.ok(!/undefined|NaN|\[object/.test(html), `${ws.slug} seed ${seed}`);
    }
  }
  assert.ok(shown > 1000);
});
