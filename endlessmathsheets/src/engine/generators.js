// Problem generators. Each one takes (rng, params, count) and returns problems.
// Problem shapes:
//   arith   { op, nums: [str], ans: str }            stacked or in a row
//   div     { dividend, divisor, q, r, rmode }        long division or in a row
//   line    { parts: [token] }                        in a row only
//   clock   { h, m, mode }                            clock face
// Every problem has a `key` used to avoid repeats on the same sheet.

import { gcd, lcm, carryCount, borrowCount, fmtInt, fmtDec, MINUS, TIMES, DIVIDE } from './numbers.js';
import { N, O, X, P, S, F, B, U } from './tokens.js';

const span = ([lo, hi]) => hi - lo + 1;
const inRange = (v, r) => !r || (v >= r[0] && v <= r[1]);
const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

// Draw `count` problems from a finite list. Repeats only after the whole list is used.
function drawPool(pool, count, rng, ordered = false) {
  if (!pool.length) return [];
  const out = [];
  let batch = ordered ? pool.slice() : rng.shuffle(pool);
  let i = 0;
  while (out.length < count) {
    if (i >= batch.length) {
      batch = rng.shuffle(pool);
      if (batch.length > 1 && batch[0].key === out[out.length - 1].key) {
        [batch[0], batch[1]] = [batch[1], batch[0]];
      }
      i = 0;
    }
    out.push(batch[i++]);
  }
  return out;
}

// Call make() until we have `count` distinct problems (or give up and allow repeats).
function collect(count, make) {
  const out = [];
  const seen = new Set();
  let tries = 0;
  while (out.length < count && tries < count * 300) {
    tries++;
    const p = make();
    if (!p || seen.has(p.key)) continue;
    seen.add(p.key);
    out.push(p);
  }
  tries = 0;
  while (out.length < count && tries < count * 300) {
    tries++;
    const p = make();
    if (p && p.key !== out[out.length - 1]?.key) out.push(p);
  }
  return out;
}

function enumerate(ranges, cb, acc = []) {
  if (acc.length === ranges.length) return cb(acc.slice());
  const [lo, hi] = ranges[acc.length];
  for (let v = lo; v <= hi; v++) {
    acc.push(v);
    enumerate(ranges, cb, acc);
    acc.pop();
  }
}

// ---------- whole-number arithmetic ----------

const addProblem = (nums) => ({
  type: 'arith',
  op: '+',
  nums: nums.map(String),
  ans: String(nums.reduce((s, n) => s + n, 0)),
  key: nums.join('+'),
});

function genAdd(rng, p, count) {
  const k = p.addends || 2;
  const ranges = [p.a, p.b, p.c || p.b].slice(0, k);
  const ok = (nums) => {
    if (!inRange(nums.reduce((s, n) => s + n, 0), p.sum)) return false;
    if (p.regroup === 'none' && carryCount(nums) > 0) return false;
    if (p.regroup === 'required' && carryCount(nums) === 0) return false;
    return true;
  };
  if (ranges.reduce((s, r) => s * span(r), 1) <= 6000) {
    const pool = [];
    enumerate(ranges, (nums) => ok(nums) && pool.push(addProblem(nums)));
    return drawPool(pool, count, rng);
  }
  return collect(count, () => {
    const nums = ranges.map((r) => rng.int(r[0], r[1]));
    return ok(nums) ? addProblem(nums) : null;
  });
}

const subProblem = (a, b) => ({
  type: 'arith',
  op: MINUS,
  nums: [String(a), String(b)],
  ans: String(a - b),
  key: `${a}-${b}`,
});

function acrossZeros(rng, p) {
  const D = rng.pick(p.digits || [3, 4]);
  let digits;
  if (D === 3) digits = [rng.int(1, 9), 0, rng.int(0, 8)];
  else digits = [rng.int(1, 9), rng.chance(0.5) ? 0 : rng.int(1, 9), 0, rng.int(0, 8)];
  const a = Number(digits.join(''));
  const aOnes = digits[digits.length - 1];
  for (let t = 0; t < 40; t++) {
    const bd = rng.chance(0.6) ? D : D - 1;
    const lo = 10 ** (bd - 1);
    const hi = Math.min(10 ** bd - 1, a - 1);
    if (lo > hi) continue;
    let b = rng.int(lo, hi);
    b = b - (b % 10) + rng.int(aOnes + 1, 9);
    if (b < a && b >= lo) return subProblem(a, b);
  }
  return null;
}

function genSub(rng, p, count) {
  if (p.acrossZeros) return collect(count, () => acrossZeros(rng, p));
  const ok = (a, b) => {
    if (b > a) return false;
    if (!inRange(a - b, p.diff)) return false;
    if (p.regroup === 'none' && borrowCount(a, b) > 0) return false;
    if (p.regroup === 'required' && borrowCount(a, b) === 0) return false;
    return true;
  };
  if (span(p.a) * span(p.b) <= 6000) {
    const pool = [];
    enumerate([p.a, p.b], ([a, b]) => ok(a, b) && pool.push(subProblem(a, b)));
    return drawPool(pool, count, rng);
  }
  return collect(count, () => {
    const a = rng.int(...p.a);
    const b = rng.int(...p.b);
    return ok(a, b) ? subProblem(a, b) : null;
  });
}

const mulProblem = (a, b) => ({
  type: 'arith',
  op: TIMES,
  nums: [String(a), String(b)],
  ans: String(a * b),
  key: `${a}x${b}`,
});

function genMul(rng, p, count) {
  if (p.tables) {
    const tables = p.tables.length ? p.tables : [2];
    const ordered = p.order === 'ordered';
    const pool = [];
    for (const t of tables) {
      for (let n = p.from ?? 0; n <= (p.upTo ?? 12); n++) {
        // A fact like 3 x 4 already appears as 4 x 3 when both tables are on.
        const swap = !ordered && !tables.includes(n) && rng.chance(0.5);
        pool.push(swap ? mulProblem(n, t) : mulProblem(t, n));
      }
    }
    return drawPool(pool, count, rng, ordered);
  }
  if (p.tens) {
    const pool = [];
    for (let a = 2; a <= 9; a++) {
      for (let m = 1; m <= 9; m++) pool.push(rng.chance(0.5) ? mulProblem(a, m * 10) : mulProblem(m * 10, a));
    }
    return drawPool(pool, count, rng);
  }
  return collect(count, () => {
    const a = rng.int(...p.a);
    const b = rng.int(...p.b);
    if (p.noTrailingZero && (a % 10 === 0 || b % 10 === 0)) return null;
    return mulProblem(a, b);
  });
}

const divProblem = (n, d, q, r, rmode) => ({
  type: 'div',
  dividend: String(n),
  divisor: String(d),
  q: String(q),
  r: String(r),
  rmode: !!rmode,
  key: `${n}/${d}`,
});

function longDivOne(rng, p) {
  const d = rng.int(...p.divisor);
  if (p.noRound && d % 10 === 0) return null;
  const lo = 10 ** (p.digits - 1);
  const hi = 10 ** p.digits - 1;
  const r = p.rem === 'required' ? rng.int(1, d - 1) : p.rem === 'none' ? 0 : rng.int(0, d - 1);
  const qlo = Math.max(2, Math.ceil((lo - r) / d));
  const qhi = Math.floor((hi - r) / d);
  if (qlo > qhi) return null;
  const q = rng.int(qlo, qhi);
  return divProblem(d * q + r, d, q, r, p.rem !== 'none');
}

function genDiv(rng, p, count) {
  if (p.divisors) {
    const divisors = p.divisors.length ? p.divisors : [2];
    const pool = [];
    for (const d of divisors) {
      for (let q = p.qFrom ?? 0; q <= (p.upTo ?? 10); q++) pool.push(divProblem(d * q, d, q, 0, false));
    }
    return drawPool(pool, count, rng, p.order === 'ordered');
  }
  if (p.factsRem) {
    const pool = [];
    for (let d = 2; d <= 9; d++) {
      for (let q = 1; q <= 9; q++) for (let r = 1; r < d; r++) pool.push(divProblem(d * q + r, d, q, r, true));
    }
    return drawPool(pool, count, rng);
  }
  return collect(count, () => longDivOne(rng, p));
}

// Several generators on one sheet, shuffled together.
function genMixed(rng, p, count) {
  const parts = p.ops;
  const k = parts.length;
  const counts = parts.map((_, i) => Math.floor(count / k) + (i < count % k ? 1 : 0));
  const lists = parts.map((part, i) => GENERATORS[part.gen].generate(rng, part.params, counts[i]));
  const order = rng.shuffle(lists.flatMap((l, i) => l.map(() => i)));
  const idx = parts.map(() => 0);
  return order.map((i) => lists[i][idx[i]++]);
}

function genMissing(rng, p, count) {
  const pool = [];
  const add = (parts, key) => pool.push({ type: 'line', parts, key });
  const ops = p.ops || ['+'];
  if (ops.includes('+')) {
    for (let a = 0; a <= p.max; a++) {
      for (let b = 0; a + b <= p.max; b++) {
        if (a + b === 0) continue;
        add([N(a), O('+'), B(N(b)), O('='), N(a + b)], `${a}+_${b}`);
        add([B(N(a)), O('+'), N(b), O('='), N(a + b)], `_${a}+${b}`);
      }
    }
  }
  if (ops.includes(TIMES)) {
    for (let a = p.lo; a <= p.hi; a++) {
      for (let b = p.lo; b <= p.hi; b++) {
        add([N(a), O(TIMES), B(N(b)), O('='), N(a * b)], `${a}x_${b}`);
        add([B(N(a)), O(TIMES), N(b), O('='), N(a * b)], `_${a}x${b}`);
      }
    }
  }
  return drawPool(pool, count, rng);
}

// Number bonds: pairs that make a total, in four layouts (UK Year 1 to 3).
function genBonds(rng, p, count) {
  const T = p.total;
  const step = p.pairs === 'tens' ? 10 : p.pairs === 'fives' ? 5 : 1;
  const pool = [];
  for (let a = 0; a <= T; a += step) {
    const b = T - a;
    pool.push({ type: 'line', parts: [N(a), O('+'), B(N(b)), O('='), N(T)], key: `${a}+_` });
    pool.push({ type: 'line', parts: [B(N(a)), O('+'), N(b), O('='), N(T)], key: `_+${b}` });
    pool.push({ type: 'line', parts: [N(T), O('='), N(a), O('+'), B(N(b))], key: `=${a}+_` });
    pool.push({ type: 'line', parts: [N(T), O(MINUS), N(a), O('='), B(N(b))], key: `${T}-${a}` });
  }
  return drawPool(pool, count, rng);
}

// ---------- fractions ----------

const properN = (rng, d) => rng.int(1, d - 1);

function simplestProper(rng, dRange) {
  for (;;) {
    const d = rng.int(...dRange);
    const n = properN(rng, d);
    if (gcd(n, d) === 1) return { n, d };
  }
}

// Answer tokens for n/d: "raw = simplest" when the raw form can be simplified.
function fracAnswer(n, d, showRaw = true) {
  const g = gcd(n, d);
  const sn = n / g;
  const sd = d / g;
  let final;
  if (sd === 1) final = [N(sn)];
  else if (sn > sd) final = [F(sn % sd, sd, Math.floor(sn / sd))];
  else final = [F(sn, sd)];
  if (showRaw && (g !== 1 || n > d)) return [F(n, d), O('='), ...final];
  return final;
}

const fracTok = (f) => (f.w ? F(f.n, f.d, f.w) : F(f.n, f.d));
const improperN = (f) => (f.w || 0) * f.d + f.n;

function fracOne(rng, p) {
  const dRange = p.d || [2, 12];
  const op = p.op;
  let A;
  let Bf;
  if (p.mixed) {
    const d = rng.int(...dRange);
    A = { w: rng.int(1, 9), n: properN(rng, d), d };
    Bf = { w: rng.int(1, 9), n: properN(rng, d), d };
    if (op === '-' && improperN(A) <= improperN(Bf)) [A, Bf] = [Bf, A];
    if (improperN(A) === improperN(Bf)) return null;
  } else if (p.like) {
    const d = rng.int(...dRange);
    A = { n: properN(rng, d), d };
    Bf = { n: properN(rng, d), d };
    if (op === '-') {
      if (A.n === Bf.n) return null;
      if (A.n < Bf.n) [A, Bf] = [Bf, A];
    }
  } else if (p.whole) {
    const f = simplestProper(rng, dRange);
    const w = rng.int(2, 12);
    const fracFirst = rng.chance(0.5);
    const parts = fracFirst ? [F(f.n, f.d), O(TIMES), N(w)] : [N(w), O(TIMES), F(f.n, f.d)];
    return { type: 'line', parts: [...parts, O('='), B(fracAnswer(f.n * w, f.d))], key: `${f.n}/${f.d}x${w}${fracFirst}` };
  } else {
    A = simplestProper(rng, dRange);
    Bf = simplestProper(rng, dRange);
    if (A.n === Bf.n && A.d === Bf.d) return null;
    if (op === '+' || op === '-') {
      if (A.d === Bf.d || lcm(A.d, Bf.d) > (p.maxL || 60)) return null;
      if (op === '-' && A.n * Bf.d < Bf.n * A.d) [A, Bf] = [Bf, A];
    }
  }
  const nA = improperN(A);
  const nB = improperN(Bf);
  let n;
  let d;
  if (op === '+' || op === '-') {
    d = lcm(A.d, Bf.d);
    const sign = op === '+' ? 1 : -1;
    n = nA * (d / A.d) + sign * nB * (d / Bf.d);
  } else if (op === TIMES) {
    n = nA * nB;
    d = A.d * Bf.d;
  } else {
    n = nA * Bf.d;
    d = A.d * nB;
  }
  if (n <= 0) return null;
  const sym = op === '-' ? MINUS : op;
  return {
    type: 'line',
    parts: [fracTok(A), O(sym), fracTok(Bf), O('='), B(fracAnswer(n, d, !p.mixed))],
    key: `${A.w || 0}_${A.n}/${A.d}${op}${Bf.w || 0}_${Bf.n}/${Bf.d}`,
  };
}

const genFrac = (rng, p, count) => collect(count, () => fracOne(rng, p));

function genFracSimplify(rng, p, count) {
  return collect(count, () => {
    const f = simplestProper(rng, [2, 12]);
    const k = rng.int(2, Math.max(2, Math.min(9, Math.floor(72 / f.d))));
    return {
      type: 'line',
      parts: [F(f.n * k, f.d * k), O('='), B(F(f.n, f.d))],
      key: `${f.n * k}/${f.d * k}`,
    };
  });
}

function genFracEquiv(rng, p, count) {
  return collect(count, () => {
    const f = simplestProper(rng, [2, 12]);
    const k = rng.int(2, Math.max(2, Math.min(10, Math.floor(100 / f.d))));
    const missTop = rng.chance(0.65);
    const right = missTop ? F(B(N(f.n * k)), f.d * k) : F(f.n * k, B(N(f.d * k)));
    return { type: 'line', parts: [F(f.n, f.d), O('='), right], key: `${f.n}/${f.d}k${k}${missTop}` };
  });
}

function genFracCompare(rng, p, count) {
  return collect(count, () => {
    let a;
    let b;
    if (rng.chance(0.15)) {
      const f = simplestProper(rng, [2, 6]);
      const k = rng.int(2, 4);
      a = { n: f.n, d: f.d };
      b = { n: f.n * k, d: f.d * k };
      if (rng.chance(0.5)) [a, b] = [b, a];
    } else {
      const d1 = rng.int(2, 12);
      const d2 = rng.int(2, 12);
      a = { n: properN(rng, d1), d: d1 };
      b = { n: properN(rng, d2), d: d2 };
      if (a.n === b.n && a.d === b.d) return null;
    }
    const l = a.n * b.d;
    const r = b.n * a.d;
    const sym = l > r ? '>' : l < r ? '<' : '=';
    return { type: 'line', parts: [F(a.n, a.d), B(O(sym), 'circle'), F(b.n, b.d)], key: `${a.n}/${a.d}?${b.n}/${b.d}` };
  });
}

// Difficulty by grade for mixed-number conversions: denominator and whole-number ranges.
const FRAC_LEVELS = {
  4: { d: [2, 6], w: [1, 5] },
  5: { d: [2, 12], w: [1, 9] },
  6: { d: [2, 20], w: [1, 12] },
};
const fracLevel = (p) => FRAC_LEVELS[p.level] || FRAC_LEVELS[5];

function genFracToMixed(rng, p, count) {
  const L = fracLevel(p);
  return collect(count, () => {
    const d = rng.int(...L.d);
    const n = rng.int(d + 1, d * (L.w[1] + 1) - 1);
    if (gcd(n, d) !== 1) return null;
    return { type: 'line', parts: [F(n, d), O('='), B(F(n % d, d, Math.floor(n / d)))], key: `${n}/${d}` };
  });
}

function genFracToImproper(rng, p, count) {
  const L = fracLevel(p);
  return collect(count, () => {
    const f = simplestProper(rng, L.d);
    const w = rng.int(...L.w);
    return { type: 'line', parts: [F(f.n, f.d, w), O('='), B(F(w * f.d + f.n, f.d))], key: `${w}_${f.n}/${f.d}` };
  });
}

// ---------- decimals ----------

// A decimal whose last digit is not zero, as { v, dp } (v scaled by 10^dp).
function decNum(rng, w, dp) {
  const scale = 10 ** dp;
  let frac = rng.int(1, scale - 1);
  if (frac % 10 === 0) frac += rng.int(1, 9);
  return { v: rng.int(w[0], w[1]) * scale + frac, dp };
}

function genDecAddSub(rng, p, count) {
  return collect(count, () => {
    let a = decNum(rng, p.w, rng.pick(p.dp));
    let b = decNum(rng, p.w, rng.pick(p.dp));
    const D = Math.max(a.dp, b.dp);
    let A = a.v * 10 ** (D - a.dp);
    let Bv = b.v * 10 ** (D - b.dp);
    if (p.op === '-') {
      if (A === Bv) return null;
      if (A < Bv) {
        [a, b] = [b, a];
        [A, Bv] = [Bv, A];
      }
    }
    const res = p.op === '-' ? A - Bv : A + Bv;
    return {
      type: 'arith',
      op: p.op === '-' ? MINUS : '+',
      nums: [fmtDec(a.v, a.dp), fmtDec(b.v, b.dp)],
      ans: fmtDec(res, D),
      key: `${a.v}e${a.dp}${p.op}${b.v}e${b.dp}`,
    };
  });
}

function genDecMul(rng, p, count) {
  return collect(count, () => {
    const a = decNum(rng, [0, 20], rng.pick([1, 2]));
    const b = rng.chance(0.5) ? { v: rng.int(2, 9), dp: 0 } : decNum(rng, [0, 9], 1);
    const prod = fmtDec(a.v * b.v, a.dp + b.dp, true);
    const first = rng.chance(0.75);
    const x = fmtDec(a.v, a.dp);
    const y = fmtDec(b.v, b.dp);
    return {
      type: 'line',
      parts: [N(first ? x : y), O(TIMES), N(first ? y : x), O('='), B(N(prod))],
      key: `${x}x${y}`,
      work: 1.6,
    };
  });
}

function genDecDiv(rng, p, count) {
  return collect(count, () => {
    const q = decNum(rng, [0, 20], rng.pick([1, 2]));
    const d = rng.int(2, 9);
    const v = q.v * d;
    if (v % 10 === 0) return null;
    return divProblem(fmtDec(v, q.dp), d, fmtDec(q.v, q.dp), 0, false);
  });
}

// Value of an underlined digit, e.g. the 7 in 45.372 is 0.07.
function genDecPlace(rng, p, count) {
  return collect(count, () => {
    const wd = rng.int(1, 3);
    const dp = rng.int(2, 3);
    const whole = rng.int(10 ** (wd - 1), 10 ** wd - 1);
    let frac = rng.int(1, 10 ** dp - 1);
    if (frac % 10 === 0) frac += rng.int(1, 9);
    const s = `${whole}.${String(frac).padStart(dp, '0')}`;
    const point = s.indexOf('.');
    // Mostly decimal places, sometimes a whole-number place.
    const i = rng.chance(0.75) ? rng.int(point + 1, s.length - 1) : rng.int(0, point - 1);
    const digit = s[i];
    if (digit === '0') return null;
    const value = i < point ? digit + '0'.repeat(point - i - 1) : `0.${'0'.repeat(i - point - 1)}${digit}`;
    return { type: 'line', parts: [U(s, i), O('\u2192'), B(N(value))], key: `${s}@${i}` };
  });
}

const PLACE_DP = { whole: 0, tenth: 1, hundredth: 2 };
const PLACE_LABEL = { whole: 'whole number', tenth: 'tenth', hundredth: 'hundredth' };

function genDecRound(rng, p, count) {
  return collect(count, () => {
    const place = p.place === 'mixed' ? rng.pick(['whole', 'tenth', 'hundredth']) : p.place;
    const x = decNum(rng, [0, 99], 3);
    const f = 10 ** (3 - PLACE_DP[place]);
    const rounded = Math.floor((x.v + f / 2) / f);
    return {
      type: 'line',
      parts: [N(fmtDec(x.v, 3)), X(`(${PLACE_LABEL[place]})`), O('→'), B(N(fmtDec(rounded, PLACE_DP[place])))],
      key: `${x.v}${place}`,
    };
  });
}

// ---------- integers, rounding, comparing ----------

const intTok = (n, paren) => N(n < 0 && paren ? `(${fmtInt(n)})` : fmtInt(n));

function genInt(rng, p, count) {
  const [lo, hi] = p.range;
  const nz = () => {
    for (;;) {
      const v = rng.int(lo, hi);
      if (v !== 0) return v;
    }
  };
  return collect(count, () => {
    const op = p.op;
    let a;
    let b;
    let ans;
    if (op === DIVIDE) {
      b = nz();
      ans = nz();
      a = b * ans;
    } else {
      a = nz();
      b = nz();
      ans = op === '+' ? a + b : op === MINUS ? a - b : a * b;
    }
    if (a > 0 && b > 0) return null;
    return {
      type: 'line',
      parts: [intTok(a, false), O(op), intTok(b, true), O('='), B(N(fmtInt(ans)))],
      key: `${a}${op}${b}`,
    };
  });
}

const PLACE_NAME = { 10: 'ten', 100: 'hundred', 1000: 'thousand' };
const ROUND_RANGE = { 10: [11, 999], 100: [101, 9999], 1000: [1001, 99999] };

function genRound(rng, p, count) {
  return collect(count, () => {
    const place = p.place === 'mixed' ? rng.pick([10, 100, 1000]) : p.place;
    const n = p.place === 'mixed' ? rng.int(1001, 99999) : rng.int(...ROUND_RANGE[place]);
    if (n % place === 0) return null;
    const ans = Math.floor((n + place / 2) / place) * place;
    const parts = [N(fmtInt(n, true))];
    if (p.place === 'mixed') parts.push(X(`(nearest ${PLACE_NAME[place]})`));
    parts.push(O('→'), B(N(fmtInt(ans, true))));
    return { type: 'line', parts, key: `${n}r${place}` };
  });
}

function genCompare(rng, p, count) {
  const [lo, hi] = p.range;
  const commas = hi >= 10000;
  return collect(count, () => {
    const a = rng.int(lo, hi);
    let b;
    const r = rng.next();
    if (r < 0.12) b = a;
    else if (r < 0.45) {
      const s = String(a);
      const i = rng.int(0, s.length - 2);
      const swapped = s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2);
      b = swapped[0] === '0' || swapped === s ? a + rng.int(1, 9) : Number(swapped);
    } else if (r < 0.7) b = a + rng.pick([-1, 1]) * rng.int(1, Math.max(2, Math.floor((hi - lo) / 50)));
    else b = rng.int(lo, hi);
    if (b < lo || b > hi) return null;
    const sym = a > b ? '>' : a < b ? '<' : '=';
    return {
      type: 'line',
      parts: [N(fmtInt(a, commas)), B(O(sym), 'circle'), N(fmtInt(b, commas))],
      key: `${a}?${b}`,
    };
  });
}

// ---------- time ----------

function genClock(rng, p, count) {
  const step = Number(p.step) || 5;
  const pool = [];
  for (let h = 1; h <= 12; h++) {
    for (let m = 0; m < 60; m += step) pool.push({ type: 'clock', h, m, mode: p.mode || 'read', key: `${h}:${m}` });
  }
  return drawPool(pool, count, rng);
}

// ---------- order of operations and exponents ----------

const OOO = [
  (r) => { const a = r.int(2, 20), b = r.int(2, 9), c = r.int(2, 9); return [[N(a), O('+'), N(b), O(TIMES), N(c)], a + b * c]; },
  (r) => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(1, a * b); return [[N(a), O(TIMES), N(b), O(MINUS), N(c)], a * b - c]; },
  (r) => { const a = r.int(2, 12), b = r.int(2, 12), c = r.int(2, 9); return [[O('('), N(a), O('+'), N(b), O(')'), O(TIMES), N(c)], (a + b) * c]; },
  (r) => { const b = r.int(5, 20), c = r.int(1, b - 1), a = r.int(2, 9); return [[N(a), O(TIMES), O('('), N(b), O(MINUS), N(c), O(')')], a * (b - c)]; },
  (r) => { const c = r.int(2, 9), q = r.int(2, 10), a = r.int(1, 30); return [[N(a), O('+'), N(c * q), O(DIVIDE), N(c)], a + q]; },
  (r) => { const c = r.int(2, 9), q = r.int(2, 10), a = r.int(1, c * q - 1); return [[O('('), N(a), O('+'), N(c * q - a), O(')'), O(DIVIDE), N(c)], q]; },
  (r) => { const a = r.int(2, 9), b = r.int(2, 9), c = r.int(2, 9), d = r.int(2, 9); return [[N(a), O(TIMES), N(b), O('+'), N(c), O(TIMES), N(d)], a * b + c * d]; },
  (r) => { const b = r.int(2, 9), c = r.int(2, 9), a = r.int(b * c, b * c + 30); return [[N(a), O(MINUS), N(b), O(TIMES), N(c)], a - b * c]; },
  (r) => { const a = r.int(2, 30), b = r.int(2, 9), c = r.int(4, 15), d = r.int(1, c - 1); return [[N(a), O('+'), N(b), O(TIMES), O('('), N(c), O(MINUS), N(d), O(')')], a + b * (c - d)]; },
  (r) => { const c = r.int(2, 6), q = r.int(2, 9), a = r.int(2, 9); return [[N(c * q), O(DIVIDE), N(c), O(TIMES), N(a)], q * a]; },
  (r) => { const a = r.int(10, 40), b = r.int(1, 9), c = r.int(1, 9); return [[N(a), O(MINUS), N(b), O('+'), N(c)], a - b + c]; },
];

const OOO_EXP = [
  (r) => { const a = r.int(2, 9), b = r.int(1, 20); return [[P(a, 2), O('+'), N(b)], a * a + b]; },
  (r) => { const a = r.int(2, 5), b = r.int(2, 5), c = r.int(2, 5); return [[P(a, 3), O(MINUS), N(b), O(TIMES), N(c)], a ** 3 - b * c]; },
  (r) => { const a = r.int(1, 6), b = r.int(1, 5), c = r.int(2, 5); return [[O('('), N(a), O('+'), N(b), O(')'), S(2), O(TIMES), N(c)], (a + b) ** 2 * c]; },
  (r) => { const a = r.int(2, 9), b = r.int(2, 4), c = r.int(2, 6); return [[N(c), O(TIMES), P(b, 2), O('+'), N(a)], c * b * b + a]; },
  (r) => { const b = r.int(2, 5), q = r.int(2, 6), a = r.int(1, 15); return [[N(b * b * q), O(DIVIDE), P(b, 2), O('+'), N(a)], q + a]; },
  (r) => { const a = r.int(5, 12), b = r.int(1, a - 1), c = r.int(2, 3); return [[O('('), N(a), O(MINUS), N(b), O(')'), S(c)], (a - b) ** c]; },
  (r) => { const a = r.int(2, 4), b = r.int(2, 9), c = r.int(2, 9); return [[N(b), O('+'), P(a, 3), O(MINUS), N(c)], b + a ** 3 - c]; },
  (r) => { const a = r.int(2, 9), b = r.int(2, 6); return [[P(a, 2), O(MINUS), P(b, 2)], a * a - b * b]; },
];

function genOrderOps(rng, p, count) {
  const templates = p.exponents ? OOO_EXP.concat(OOO.slice(0, 4)) : OOO;
  return collect(count, () => {
    const [parts, value] = rng.pick(templates)(rng);
    if (value < 0 || value > 400 || !Number.isInteger(value)) return null;
    const key = parts.map((t) => t.v ?? `${t.b}^${t.e}`).join('');
    return { type: 'line', parts: [...parts, O('='), B(N(value))], key, work: 2.4 };
  });
}

function genPowers(rng, p, count) {
  const pool = [];
  for (let b = 2; b <= 12; b++) {
    for (let e = 2; e <= 6; e++) if (b ** e <= 10000) pool.push({ type: 'line', parts: [P(b, e), O('='), B(N(fmtInt(b ** e, true)))], key: `${b}^${e}` });
  }
  for (let e = 3; e <= 6; e++) pool.push({ type: 'line', parts: [P(10, e), O('='), B(N(fmtInt(10 ** e, true)))], key: `10^${e}` });
  return drawPool(pool, count, rng);
}

export const GENERATORS = {
  add: { formats: ['vertical', 'horizontal'], generate: genAdd },
  sub: { formats: ['vertical', 'horizontal'], generate: genSub },
  mul: { formats: ['horizontal', 'vertical'], generate: genMul },
  div: { formats: ['horizontal', 'longdiv'], generate: genDiv },
  mixed: { formats: ['horizontal', 'vertical'], generate: genMixed },
  missing: { formats: ['horizontal'], generate: genMissing },
  bonds: { formats: ['horizontal'], generate: genBonds },
  frac: { formats: ['horizontal'], generate: genFrac },
  fracSimplify: { formats: ['horizontal'], generate: genFracSimplify },
  fracEquiv: { formats: ['horizontal'], generate: genFracEquiv },
  fracCompare: { formats: ['horizontal'], generate: genFracCompare },
  fracToMixed: { formats: ['horizontal'], generate: genFracToMixed },
  fracToImproper: { formats: ['horizontal'], generate: genFracToImproper },
  decAddSub: { formats: ['vertical', 'horizontal'], generate: genDecAddSub },
  decMul: { formats: ['horizontal'], generate: genDecMul },
  decDiv: { formats: ['longdiv', 'horizontal'], generate: genDecDiv },
  decRound: { formats: ['horizontal'], generate: genDecRound },
  decPlace: { formats: ['horizontal'], generate: genDecPlace },
  int: { formats: ['horizontal'], generate: genInt },
  round: { formats: ['horizontal'], generate: genRound },
  compare: { formats: ['horizontal'], generate: genCompare },
  clock: { formats: ['clock'], generate: genClock },
  orderOps: { formats: ['horizontal'], generate: genOrderOps },
  powers: { formats: ['horizontal'], generate: genPowers },
};

export { range };
