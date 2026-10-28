import test from 'node:test';
import assert from 'node:assert/strict';
import { makeRng } from '../src/engine/rng.js';
import { GENERATORS } from '../src/engine/generators.js';
import { carryCount, borrowCount, MINUS, TIMES, DIVIDE } from '../src/engine/numbers.js';
import { renderSheets, planLayout, toLine } from '../src/engine/render.js';

// ---- exact rational arithmetic for checking answers ----
const g = (a, b) => (b ? g(b, a % b) : Math.abs(a));
const R = (n, d = 1) => {
  if (d < 0) [n, d] = [-n, -d];
  const k = g(n, d) || 1;
  return { n: n / k, d: d / k };
};
const add = (a, b) => R(a.n * b.d + b.n * a.d, a.d * b.d);
const sub = (a, b) => R(a.n * b.d - b.n * a.d, a.d * b.d);
const mul = (a, b) => R(a.n * b.n, a.d * b.d);
const div = (a, b) => R(a.n * b.d, a.d * b.n);
const eq = (a, b) => a.n === b.n && a.d === b.d;

function parseNum(s) {
  s = s.replace(/[(),]/g, '').replace(MINUS, '-');
  const neg = s.startsWith('-');
  if (neg) s = s.slice(1);
  const [i, f = ''] = s.split('.');
  const v = R(Number(i + f), 10 ** f.length);
  return neg ? R(-v.n, v.d) : v;
}

const fracVal = (t) => add(R(Number(t.w || 0)), R(Number(t.n), Number(t.d)));

// Evaluate tokens (no blanks) with normal order of operations.
function evaluate(tokens) {
  const out = [];
  const ops = [];
  const prec = { '+': 1, [MINUS]: 1, [TIMES]: 2, [DIVIDE]: 2 };
  const apply = () => {
    const op = ops.pop();
    const b = out.pop();
    const a = out.pop();
    out.push(op === '+' ? add(a, b) : op === MINUS ? sub(a, b) : op === TIMES ? mul(a, b) : div(a, b));
  };
  for (const t of tokens) {
    if (t.t === 'n') out.push(parseNum(t.v));
    else if (t.t === 'f') out.push(fracVal(t));
    else if (t.t === 'p') out.push(R(Number(t.b) ** Number(t.e)));
    else if (t.t === 's') {
      const v = out.pop();
      out.push(R(v.n ** Number(t.v), v.d ** Number(t.v)));
    } else if (t.v === '(') ops.push('(');
    else if (t.v === ')') {
      while (ops[ops.length - 1] !== '(') apply();
      ops.pop();
    } else {
      while (ops.length && ops[ops.length - 1] !== '(' && prec[ops[ops.length - 1]] >= prec[t.v]) apply();
      ops.push(t.v);
    }
  }
  while (ops.length) apply();
  assert.equal(out.length, 1);
  return out[0];
}

// Fill each blank with its answer and check the sentence is true.
function checkLine(parts) {
  const fill = (t) => {
    if (t.t === 'b') return t.a;
    if (t.t === 'f' && (typeof t.n === 'object' || typeof t.d === 'object')) {
      const n = typeof t.n === 'object' ? t.n.a[0].v : t.n;
      const d = typeof t.d === 'object' ? t.d.a[0].v : t.d;
      return [{ ...t, n, d }];
    }
    return [t];
  };
  const circle = parts.find((t) => t.t === 'b' && t.s === 'circle');
  if (circle) {
    const i = parts.indexOf(circle);
    const a = evaluate(parts.slice(0, i));
    const b = evaluate(parts.slice(i + 1));
    const diff = sub(a, b).n;
    const sym = circle.a[0].v;
    assert.equal(sym, diff > 0 ? '>' : diff < 0 ? '<' : '=');
    return;
  }
  const under = parts.find((t) => t.t === 'u');
  if (under) {
    const point = under.v.indexOf('.');
    const digit = Number(under.v[under.i]);
    const exp = under.i < point ? point - under.i - 1 : point - under.i;
    const ans = parts[parts.length - 1].a[0].v;
    assert.ok(eq(parseNum(ans), exp >= 0 ? R(digit * 10 ** exp) : R(digit, 10 ** -exp)), `value of digit ${under.i} in ${under.v} is ${ans}`);
    return;
  }
  const arrow = parts.findIndex((t) => t.v === '→');
  if (arrow >= 0) {
    const n = parseNum(parts[0].v);
    const ans = parseNum(parts[arrow + 1].a[0].v);
    const label = parts.find((t) => t.t === 'x')?.v || '';
    const place = /thousand/.test(label) ? R(1000) : /hundredth/.test(label) ? R(1, 100) : /hundred/.test(label) ? R(100)
      : /tenth/.test(label) ? R(1, 10) : /whole/.test(label) ? R(1) : /ten/.test(label) ? R(10) : null;
    if (place) {
      const half = div(place, R(2));
      const d = sub(n, ans); // half-up rounding: -half <= d < half
      assert.ok(sub(d, half).n < 0 && add(d, half).n >= 0, `round ${parts[0].v} -> ${parts[arrow + 1].a[0].v}`);
      assert.equal(div(ans, place).d, 1, 'answer sits on the rounding place');
    }
    return;
  }
  const flat = parts.flatMap(fill);
  const segments = [[]];
  for (const t of flat) {
    if (t.t === 'o' && t.v === '=') segments.push([]);
    else segments[segments.length - 1].push(t);
  }
  const vals = segments.map(evaluate);
  for (const v of vals) assert.ok(eq(v, vals[0]), `not equal: ${JSON.stringify(parts)}`);
}

function checkProblem(p) {
  if (p.type === 'arith') {
    const nums = p.nums.map(parseNum);
    let v = nums[0];
    for (const x of nums.slice(1)) v = p.op === '+' ? add(v, x) : p.op === MINUS ? sub(v, x) : mul(v, x);
    assert.ok(eq(v, parseNum(p.ans)), `${p.nums.join(p.op)} = ${p.ans}`);
    assert.ok(parseNum(p.ans).n >= 0);
  } else if (p.type === 'div') {
    const back = add(mul(parseNum(p.q), parseNum(p.divisor)), parseNum(p.r));
    assert.ok(eq(back, parseNum(p.dividend)), `${p.dividend} / ${p.divisor}`);
    assert.ok(Number(p.r) < Number(p.divisor));
  } else if (p.type === 'line') checkLine(p.parts);
  else if (p.type === 'clock') {
    assert.ok(p.h >= 1 && p.h <= 12 && p.m >= 0 && p.m < 60);
  }
}

const SEEDS = [1, 2, 3, 42, 777, 123456, 99999];

function run(gen, params, count = 40) {
  const all = [];
  for (const s of SEEDS) {
    const list = GENERATORS[gen].generate(makeRng(s), params, count);
    assert.equal(list.length, count, `${gen} returned ${list.length} of ${count}`);
    list.forEach(checkProblem);
    all.push(...list);
  }
  return all;
}

test('addition respects regrouping rules', () => {
  const none = run('add', { a: [100, 999], b: [100, 999], regroup: 'none' });
  for (const p of none) assert.equal(carryCount(p.nums.map(Number)), 0);
  const req = run('add', { a: [10, 99], b: [10, 99], regroup: 'required' });
  for (const p of req) assert.ok(carryCount(p.nums.map(Number)) > 0);
  const within = run('add', { a: [0, 10], b: [0, 10], sum: [0, 10] });
  for (const p of within) assert.ok(Number(p.ans) <= 10);
  const three = run('add', { addends: 3, a: [1, 9], b: [1, 9], c: [1, 9], sum: [3, 20] });
  for (const p of three) assert.equal(p.nums.length, 3);
});

test('subtraction never goes negative and respects regrouping', () => {
  const none = run('sub', { a: [10, 99], b: [10, 99], regroup: 'none', diff: [1, 99] });
  for (const p of none) assert.equal(borrowCount(Number(p.nums[0]), Number(p.nums[1])), 0);
  const req = run('sub', { a: [100, 999], b: [100, 999], regroup: 'required', diff: [1, 999] });
  for (const p of req) assert.ok(borrowCount(Number(p.nums[0]), Number(p.nums[1])) > 0);
  const zeros = run('sub', { acrossZeros: true, digits: [3, 4] });
  for (const p of zeros) {
    const a = p.nums[0];
    assert.equal(a[a.length - 2], '0', `${a} has a zero in the tens place`);
    assert.ok(Number(p.nums[1].slice(-1)) > Number(a.slice(-1)));
  }
  run('sub', { a: [0, 20], b: [0, 10], diff: [0, 10] }, 100);
});

test('multiplication facts and multi-digit', () => {
  const t7 = run('mul', { tables: [7], from: 1, upTo: 12 }, 20);
  for (const p of t7) assert.ok(p.nums.includes('7'));
  const ordered = GENERATORS.mul.generate(makeRng(5), { tables: [3], from: 1, upTo: 12, order: 'ordered' }, 12);
  assert.deepEqual(ordered.map((p) => p.nums[1]), ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
  run('mul', { tables: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], from: 0, upTo: 10 }, 100);
  run('mul', { tens: true });
  const big = run('mul', { a: [11, 99], b: [11, 99], noTrailingZero: true }, 12);
  for (const p of big) assert.ok(!p.nums.some((n) => n.endsWith('0')));
});

test('division facts, remainders and long division', () => {
  run('div', { divisors: [7], qFrom: 1, upTo: 12 }, 20);
  const rem = run('div', { factsRem: true }, 20);
  for (const p of rem) assert.ok(Number(p.r) > 0);
  const none = run('div', { digits: 3, divisor: [2, 9], rem: 'none' }, 12);
  for (const p of none) {
    assert.equal(p.r, '0');
    assert.equal(p.dividend.length, 3);
  }
  const two = run('div', { digits: 4, divisor: [11, 99], noRound: true, rem: 'any' }, 9);
  for (const p of two) {
    assert.equal(p.dividend.length, 4);
    assert.ok(Number(p.divisor) % 10 !== 0);
  }
});

test('mixed operations and missing numbers', () => {
  const mixed = run('mixed', {
    ops: [
      { gen: 'add', params: { a: [0, 20], b: [0, 20], sum: [0, 20] } },
      { gen: 'sub', params: { a: [0, 20], b: [0, 20] } },
      { gen: 'mul', params: { tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], from: 0, upTo: 10 } },
      { gen: 'div', params: { divisors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], qFrom: 0, upTo: 10 } },
    ],
  }, 30);
  assert.ok(mixed.some((p) => p.type === 'div'));
  run('missing', { ops: ['+'], max: 20 });
  run('missing', { ops: [TIMES], lo: 1, hi: 10 });
  for (const [total, pairs] of [[10], [20], [100, 'tens'], [100, 'fives'], [100, 'any']]) {
    const bonds = run('bonds', { total, pairs }, 40);
    for (const p of bonds) assert.ok(p.parts.some((t) => t.t === 'n' && t.v === String(total)), `bond to ${total}`);
  }
});

test('fraction answers are exact and simplified', () => {
  for (const op of ['+', '-']) {
    run('frac', { op, like: true, d: [2, 12] });
    run('frac', { op, like: false, d: [2, 12] });
    run('frac', { op, mixed: true, d: [2, 12] });
  }
  run('frac', { op: TIMES, d: [2, 12] });
  run('frac', { op: TIMES, whole: true, d: [2, 12] });
  run('frac', { op: DIVIDE, d: [2, 12] });
  run('fracSimplify', {});
  run('fracEquiv', {});
  run('fracCompare', {});
  run('fracToMixed', {});
  run('fracToImproper', {});
  for (const level of [4, 5, 6]) {
    const maxD = { 4: 6, 5: 12, 6: 20 }[level];
    for (const p of run('fracToMixed', { level }, 32)) assert.ok(Number(p.parts[0].d) <= maxD);
    for (const p of run('fracToImproper', { level }, 32)) assert.ok(Number(p.parts[0].d) <= maxD);
  }
});

test('decimals, integers, rounding, comparing', () => {
  run('decAddSub', { op: '+', w: [0, 99], dp: [1, 2] });
  run('decAddSub', { op: '-', w: [0, 99], dp: [1, 2] });
  run('decMul', {});
  run('decPlace', {}, 40);
  const dd = run('decDiv', {}, 12);
  for (const p of dd) assert.ok(p.dividend.includes('.'));
  for (const place of ['whole', 'tenth', 'hundredth', 'mixed']) run('decRound', { place });
  for (const op of ['+', MINUS, TIMES, DIVIDE]) run('int', { op, range: op === '+' || op === MINUS ? [-20, 20] : [-12, 12] });
  for (const place of [10, 100, 1000, 'mixed']) run('round', { place });
  run('compare', { range: [0, 100] });
  run('compare', { range: [1000, 999999] });
});

test('clocks, order of operations and powers', () => {
  for (const step of [60, 30, 15, 5, 1]) {
    const c = run('clock', { step, mode: 'read' }, 12);
    for (const p of c) assert.equal(p.m % step, 0);
  }
  run('orderOps', { exponents: false });
  run('orderOps', { exponents: true });
  run('powers', {}, 30);
});

test('same seed gives the same sheet', () => {
  const a = GENERATORS.add.generate(makeRng(9), { a: [10, 99], b: [10, 99], regroup: 'required' }, 20);
  const b = GENERATORS.add.generate(makeRng(9), { a: [10, 99], b: [10, 99], regroup: 'required' }, 20);
  assert.deepEqual(a, b);
});

test('sheets render with an answer key for every page', () => {
  const problems = GENERATORS.add.generate(makeRng(3), { a: [10, 99], b: [10, 99] }, 30);
  const { html, pages } = renderSheets(problems, { format: 'vertical', title: 'T', instructions: 'Add.', code: 'X1' });
  assert.equal(pages, 2);
  assert.equal((html.match(/class="sheet"/g) || []).length, 2);
  assert.equal((html.match(/class="sheet is-key"/g) || []).length, 2);
  const plan = planLayout(problems, 'vertical', {});
  assert.ok(plan.fs >= 3, `font size ${plan.fs}`);
  assert.ok(toLine(problems[0]).length >= 4);
});
