// Worked examples for the worksheet kinds that are not column arithmetic:
// facts, missing numbers, number bonds, fractions, decimals, integers,
// rounding, comparing, clocks and order of operations. Every function checks
// its result against the answer key and returns null if it can't explain.
import { f, mx, clockFig } from './work.js';

const fmt = (n) => Number(n).toLocaleString('en-US', { maximumFractionDigits: 6 });
const num = (s) => Number(String(s).replace(/[(),\s]/g, '').replace(/−/g, '-'));
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const times = (q) => (q === 1 ? 'once' : q === 2 ? 'twice' : `${q} times`);
const neg = (n) => (n < 0 ? `−${fmt(-n)}` : fmt(n));
const par = (n) => (n < 0 ? `(${neg(n)})` : fmt(n));
const PL = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];
const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = (e) => String(e).split('').map((c) => SUP[c]).join('');

function ok(cond) {
  if (!cond) throw new Error('worked example disagrees with the answer key');
}

// ---------- facts ----------

function addFact(nums) {
  const v = nums.map(Number);
  if (v.length === 3) {
    const [x, y, z] = v;
    const s = x + y + z;
    const pairs = [[x, y, z], [x, z, y], [y, z, x]];
    const ten = pairs.find(([p, q]) => p + q === 10);
    if (ten) return [`Look for a pair that makes 10: ${ten[0]} + ${ten[1]} = 10.`, `Then add the last number: 10 + ${ten[2]} = ${s}.`];
    return [`Add the first two numbers: ${x} + ${y} = ${x + y}.`, `Then add the third: ${x + y} + ${z} = ${s}.`];
  }
  const [a, b] = v;
  const [big, small] = a >= b ? [a, b] : [b, a];
  const s = a + b;
  if (small === 0) return [`Adding 0 doesn't change a number, so ${a} + ${b} = ${s}.`];
  if (a === b && a <= 10) return [`${a} + ${b} is a double. Doubles are worth knowing by heart: ${a} + ${a} = ${s}.`];
  if (big - small === 1 && small >= 2 && big <= 10) return [`${a} + ${b} is a near double.`, `${small} + ${small} = ${2 * small}, and one more makes ${s}.`];
  if (big < 10 && s > 10) {
    const need = 10 - big;
    return [`Make ten: ${big} needs ${need} more to make 10.`, `Split ${small} into ${need} and ${small - need}.`, `${big} + ${need} = 10, and 10 + ${small - need} = ${s}.`];
  }
  if (big >= 10 && big < 100 && small < 10) {
    const ones = big % 10;
    if (ones + small < 10) return [`Add the ones: ${ones} + ${small} = ${ones + small}.`, `The tens don't change, so ${a} + ${b} = ${s}.`];
    const need = 10 - ones;
    return [`Count up to the next ten: ${big} + ${need} = ${big + need}.`, `That uses ${need} of the ${small}, so add the other ${small - need}: ${big + need} + ${small - need} = ${s}.`];
  }
  if (big < 100 && small >= 10) {
    const t = Math.floor(small / 10) * 10;
    return [`Add the tens of ${small} first: ${big} + ${t} = ${big + t}.`, `Then add the ones: ${big + t} + ${small - t} = ${s}.`];
  }
  if (small <= 3) return [`Start at ${big} and count on ${small}: ${Array.from({ length: small }, (_, i) => big + i + 1).join(', ')}.`, `So ${a} + ${b} = ${s}.`];
  return [`Start with the bigger number, ${big}, and count on ${small}.`, `${a} + ${b} = ${s}.`];
}

function subFact(a, b) {
  const d = a - b;
  if (b === 0) return [`Taking away 0 leaves the number the same: ${a} − 0 = ${a}.`];
  if (a === b) return [`Any number minus itself is 0: ${a} − ${b} = 0.`];
  if (a <= 10) return [`Think addition: ${b} + ? = ${a}.`, `${b} + ${d} = ${a}, so ${a} − ${b} = ${d}.`];
  if (b < 10 || (a < 20 && b <= 10)) {
    const ones = a % 10;
    if (b <= ones) return [`Take ${b} from the ones: ${ones} − ${b} = ${ones - b}.`, `The tens don't change, so ${a} − ${b} = ${d}.`];
    return [`Subtract down to the ten first: ${a} − ${ones} = ${a - ones}.`, `You still need to take away ${b - ones} more: ${a - ones} − ${b - ones} = ${d}.`];
  }
  if (a < 100 && b < 100) {
    const t = Math.floor(b / 10) * 10;
    return [`Subtract the tens first: ${a} − ${t} = ${a - t}.`, `Then subtract the ones: ${a - t} − ${b - t} = ${d}.`, `Check by adding: ${d} + ${b} = ${a}.`];
  }
  return null;
}

const STRAT = {
  2: (m, p) => `Times 2 is a double: ${m} + ${m} = ${p}.`,
  3: (m, p) => `Times 3 is a double plus one more group: ${2 * m} + ${m} = ${p}.`,
  4: (m, p) => `Times 4 is double, then double again: ${m} → ${2 * m} → ${p}.`,
  5: (m, p) => `Times 5 is half of times 10: ${m} × 10 = ${10 * m}, and half of ${10 * m} is ${p}.`,
  6: (m, p) => `Times 6 is times 5 plus one more group: ${5 * m} + ${m} = ${p}.`,
  7: (m, p) => `Times 7 is times 5 plus times 2: ${5 * m} + ${2 * m} = ${p}.`,
  8: (m, p) => `Times 8 is doubling three times: ${m} → ${2 * m} → ${4 * m} → ${p}.`,
  9: (m, p) => `Times 9 is times 10 minus one group: ${10 * m} − ${m} = ${p}.`,
  10: (m, p) => `Times 10 puts a zero on the end: ${m} × 10 = ${p}.`,
  11: (m, p) => (m <= 9 ? `Up to 11 × 9, times 11 writes the digit twice: ${p}.` : `Times 11 is times 10 plus one more group: ${10 * m} + ${m} = ${p}.`),
  12: (m, p) => `Times 12 is times 10 plus times 2: ${10 * m} + ${2 * m} = ${p}.`,
};

function mulFact(a, b, table) {
  const p = a * b;
  if (a === 0 || b === 0) return [`Anything times 0 is 0: ${a} × ${b} = 0.`];
  if (a === 1 || b === 1) return [`Anything times 1 is itself: ${a} × ${b} = ${p}.`];
  const za = a >= 10 && a % 10 === 0;
  const zb = b >= 10 && b % 10 === 0;
  if ((za || zb) && !(a === 10 || b === 10)) {
    const [t, o] = za ? [a, b] : [b, a];
    return [`${t} is ${t / 10} tens.`, `${o} × ${t / 10} = ${o * (t / 10)}, so ${o} × ${t / 10} tens = ${o * (t / 10)} tens.`, `${o * (t / 10)} tens is ${fmt(p)}.`];
  }
  let k = table && (a === table || b === table) ? table : null;
  if (!k) for (const c of [10, 2, 5, 9, 11, 4, 3, 6, 8, 12, 7]) if (a === c || b === c) { k = c; break; }
  if (!k || !STRAT[k]) return null;
  const m = a === k ? b : a;
  return [`To work out ${a} × ${b}, use the ${k}s.`, STRAT[k](m, p), `So ${a} × ${b} = ${p}.`];
}

function divFact(n, d, q, r) {
  ok(q * d + r === n && r < d);
  if (r) return [`Find the biggest multiple of ${d} that isn't more than ${n}: ${d} × ${q} = ${q * d}.`, `${n} − ${q * d} = ${r} is left over.`, `So ${n} ÷ ${d} = ${q} R${r}.`];
  return [`Think multiplication: ${d} × ? = ${n}.`, `${d} × ${q} = ${n}, so ${n} ÷ ${d} = ${q}.`];
}

// ---------- token helpers ----------

const blankVal = (t) => (t.t === 'b' ? t.a : null);
function eqTokens(parts) {
  // a flat list of numbers, operators and one blank, e.g. 8 + [2] = 10
  return parts.map((t) => (t.t === 'n' ? { n: num(t.v) } : t.t === 'o' ? { o: t.v } : t.t === 'b' && t.a.length === 1 && t.a[0].t === 'n' ? { n: num(t.a[0].v), blank: true } : { other: true }));
}

function missingFact(parts) {
  const t = eqTokens(parts);
  if (t.length !== 5 || t.some((x) => x.other)) return null;
  const [x, op, y, eq, z] = t;
  if (eq.o !== '=') return null;
  const ans = [x, y, z].find((q) => q.blank).n;
  if (op.o === '+') {
    ok(x.n + y.n === z.n);
    const known = x.blank ? y.n : x.n;
    return [`Think: ${known} plus what makes ${z.n}?`, `Subtract to find it: ${z.n} − ${known} = ${ans}.`, `Check: ${x.n} + ${y.n} = ${z.n}.`];
  }
  if (op.o === '×') {
    ok(x.n * y.n === z.n);
    const known = x.blank ? y.n : x.n;
    if (known === 0) return null;
    return [`Think: ${known} times what makes ${z.n}?`, `Divide to find it: ${z.n} ÷ ${known} = ${ans}.`, `Check: ${x.n} × ${y.n} = ${z.n}.`];
  }
  return null;
}

function bondFact(parts, total) {
  const t = eqTokens(parts);
  if (t.some((x) => x.other)) return null;
  const nums = t.filter((x) => 'n' in x);
  const blank = nums.find((x) => x.blank);
  const known = nums.filter((x) => !x.blank && x.n !== total);
  if (!blank || known.length !== 1) return null;
  const k = known[0].n;
  const ans = blank.n;
  ok(k + ans === total);
  const ops = t.filter((x) => x.o).map((x) => x.o);
  const lines = [];
  if (ops.includes('−')) lines.push(`Subtracting from ${total} is the same as finding the number bond: ${k} + ? = ${total}.`);
  if (total === 10) lines.push(`${k} and ${ans} make 10. Use a ten frame or count on from ${k}: ${k} + ${ans} = 10.`);
  else if (total === 20) {
    if (k >= 10) lines.push(`${k} is 10 and ${k - 10}. ${k - 10} and ${10 - (k - 10)} make 10, so ${k} and ${ans} make 20.`);
    else lines.push(`${k} and ${10 - k} make 10, and another 10 makes 20, so ${k} and ${ans} make 20.`);
  } else if (total === 100) {
    if (k % 10 === 0) lines.push(`${k / 10} tens and ${ans / 10} tens make 10 tens, so ${k} and ${ans} make 100.`);
    else {
      const next = Math.ceil(k / 10) * 10;
      lines.push(`Count on to the next ten: ${k} + ${next - k} = ${next}.`, `Then on to 100: ${next} + ${100 - next} = 100.`, `Altogether that's ${next - k} + ${100 - next} = ${ans}.`);
    }
  } else return null;
  lines.push(`The missing number is ${ans}.`);
  return lines;
}

// ---------- fractions ----------

const DEN = { 2: 'halves', 3: 'thirds', 4: 'fourths', 5: 'fifths', 6: 'sixths', 7: 'sevenths', 8: 'eighths', 9: 'ninths', 10: 'tenths', 11: 'elevenths', 12: 'twelfths', 13: 'thirteenths', 14: 'fourteenths', 15: 'fifteenths', 16: 'sixteenths', 17: 'seventeenths', 18: 'eighteenths', 19: 'nineteenths', 20: 'twentieths' };
const operand = (t) => (t.t === 'f' && typeof t.n === 'number' && typeof t.d === 'number' ? { w: t.w ? Number(t.w) : 0, n: t.n, d: t.d } : t.t === 'n' ? { w: num(t.v), n: 0, d: 1, whole: true } : null);
const show = (x) => (x.whole ? fmt(x.w) : x.w ? mx(x.w, x.n, x.d) : f(x.n, x.d));
const improper = (x) => [x.w * x.d + x.n, x.d];
const eqv = ([a, b], [c, d]) => a * d === b * c;

function finish(N, D) {
  const out = [];
  const g = gcd(N, D);
  let n = N / g;
  const d = D / g;
  if (g > 1) out.push(`Simplify: ${N} and ${D} can both be divided by ${g}, so ${f(N, D)} = ${d === 1 ? n : f(n, d)}.`);
  if (d !== 1 && n > d) {
    const q = Math.floor(n / d);
    n -= q * d;
    out.push(`As a mixed number: ${f(n + q * d, d)} = ${mx(q, n, d)}.`);
  }
  return out;
}

function answerOf(parts) {
  const b = parts.find((t) => t.t === 'b');
  if (!b) return null;
  const last = b.a[b.a.length - 1];
  const x = operand(last);
  return x ? improper(x) : null;
}

function fracOp(parts) {
  if (parts.length < 5) return null;
  const x = operand(parts[0]);
  const y = operand(parts[2]);
  const op = parts[1].v;
  if (!x || !y) return null;
  const [an, ad] = improper(x);
  const [bn, bd] = improper(y);
  let N;
  let D;
  const lines = [];
  if (op === '+' || op === '−') {
    const sgn = op === '+' ? 1 : -1;
    const word = op === '+' ? 'Add' : 'Subtract';
    if ((x.w || y.w) && op === '+' && !x.whole && !y.whole && x.d === y.d) {
      const fn = x.n + y.n;
      const d = x.d;
      const ws = x.w + y.w;
      lines.push(`Add the whole numbers: ${x.w} + ${y.w} = ${ws}.`, `Add the fractions: ${f(x.n, d)} + ${f(y.n, d)} = ${f(fn, d)}.`);
      const carry = Math.floor(fn / d);
      const rem = fn % d;
      if (carry) lines.push(`${f(fn, d)} makes ${rem ? mx(carry, rem, d) : `${carry} whole`}, so carry ${carry} to the whole numbers: ${ws} + ${carry} = ${ws + carry}.`);
      const g = gcd(rem, d);
      if (rem && g > 1) lines.push(`Simplify the fraction: ${f(rem, d)} = ${f(rem / g, d / g)}.`);
      const total = ws + carry;
      lines.push(`The answer is ${rem ? mx(total, rem / g, d / g) : total}.`);
      ok(eqv([an + bn, d], answerOf(parts)));
      return lines;
    } else if (x.w || y.w) {
      lines.push(`Write each mixed number as an improper fraction: ${show(x)} = ${f(an, ad)} and ${show(y)} = ${f(bn, bd)}.`);
      const L = (ad * bd) / gcd(ad, bd);
      if (ad !== bd) lines.push(`Use the common denominator ${L}: ${f(an * (L / ad), L)} ${op} ${f(bn * (L / bd), L)}.`);
      N = an * (L / ad) + sgn * bn * (L / bd);
      D = L;
      lines.push(`${word} the numerators: ${f(N, D)}.`);
    } else if (ad === bd) {
      N = an + sgn * bn;
      D = ad;
      lines.push(`The denominators are the same, so ${word.toLowerCase()} the numerators and keep the denominator: ${an} ${op} ${bn} = ${N}, giving ${f(N, D)}.`);
    } else {
      const L = (ad * bd) / gcd(ad, bd);
      lines.push(`The denominators are different. The least common denominator of ${ad} and ${bd} is ${L}.`);
      lines.push(`Rewrite both fractions: ${f(an, ad)} = ${f(an * (L / ad), L)} and ${f(bn, bd)} = ${f(bn * (L / bd), L)}.`);
      N = an * (L / ad) + sgn * bn * (L / bd);
      D = L;
      lines.push(`${word} the numerators: ${an * (L / ad)} ${op} ${bn * (L / bd)} = ${N}, giving ${f(N, D)}.`);
    }
  } else if (op === '×') {
    if (x.whole || y.whole) {
      const [fr, w] = x.whole ? [y, x.w] : [x, y.w];
      N = fr.n * w;
      D = fr.d;
      lines.push(`Multiply the numerator by the whole number and keep the denominator: ${fr.n} × ${w} = ${N}, giving ${f(N, D)}.`);
    } else {
      N = an * bn;
      D = ad * bd;
      lines.push(`Multiply the numerators: ${an} × ${bn} = ${N}. Multiply the denominators: ${ad} × ${bd} = ${D}.`, `That gives ${f(N, D)}.`);
    }
  } else if (op === '÷') {
    N = an * bd;
    D = ad * bn;
    lines.push(`To divide by a fraction, multiply by its reciprocal: flip ${f(bn, bd)} to ${f(bd, bn)}${bn === 1 ? `, which is ${bd}` : ''}.`, `${f(an, ad)} × ${f(bd, bn)} = ${f(N, D)}.`);
  } else return null;
  if (N <= 0) return null;
  const ans = answerOf(parts);
  ok(ans && eqv([N, D], ans));
  lines.push(...finish(N, D));
  return lines;
}

function fracEquiv(parts) {
  const a = parts[0];
  const b = parts[2];
  const val = (v) => (typeof v === 'number' ? { v } : v && v.t === 'b' ? { v: num(v.a[0].v), blank: true } : null);
  const bn = val(b.n);
  const bd = val(b.d);
  if (!bn || !bd || typeof a.n !== 'number') return null;
  ok(a.n * bd.v === a.d * bn.v);
  if (bn.blank) {
    if (bd.v >= a.d) return [`Compare the denominators: ${a.d} × ${bd.v / a.d} = ${bd.v}.`, `Do the same to the numerator: ${a.n} × ${bd.v / a.d} = ${bn.v}.`, `So ${f(a.n, a.d)} = ${f(bn.v, bd.v)}.`];
    return [`Compare the denominators: ${a.d} ÷ ${a.d / bd.v} = ${bd.v}.`, `Do the same to the numerator: ${a.n} ÷ ${a.d / bd.v} = ${bn.v}.`, `So ${f(a.n, a.d)} = ${f(bn.v, bd.v)}.`];
  }
  if (bn.v >= a.n) return [`Compare the numerators: ${a.n} × ${bn.v / a.n} = ${bn.v}.`, `Do the same to the denominator: ${a.d} × ${bn.v / a.n} = ${bd.v}.`, `So ${f(a.n, a.d)} = ${f(bn.v, bd.v)}.`];
  return [`Compare the numerators: ${a.n} ÷ ${a.n / bn.v} = ${bn.v}.`, `Do the same to the denominator: ${a.d} ÷ ${a.n / bn.v} = ${bd.v}.`, `So ${f(a.n, a.d)} = ${f(bn.v, bd.v)}.`];
}

function fracSimplify(parts) {
  const a = operand(parts[0]);
  const ans = answerOf(parts);
  if (!a || !ans) return null;
  const g = gcd(a.n, a.d);
  ok(eqv([a.n, a.d], ans) && g > 1);
  return [`Find the greatest common factor of ${a.n} and ${a.d}: it's ${g}.`, `Divide both by ${g}: ${a.n} ÷ ${g} = ${a.n / g} and ${a.d} ÷ ${g} = ${a.d / g}.`, `So ${f(a.n, a.d)} = ${a.d / g === 1 ? a.n / g : f(a.n / g, a.d / g)} in simplest form.`];
}

const HTML_SIGN = { '<': '&lt;', '>': '&gt;', '=': '=' };
function fracCompare(parts) {
  const a = operand(parts[0]);
  const b = operand(parts[2]);
  const sign = parts[1].a && parts[1].a[0].v;
  if (!a || !b || !sign) return null;
  const l = a.n * b.d;
  const r = b.n * a.d;
  const raw = l > r ? '>' : l < r ? '<' : '=';
  ok(raw === sign);
  const s = HTML_SIGN[raw];
  if (a.d === b.d) return [`The denominators are the same, so compare the numerators: ${a.n} ${s} ${b.n}.`, `So ${f(a.n, a.d)} ${s} ${f(b.n, b.d)}.`];
  if (a.n === b.n) return [`The numerators are the same, so compare the size of the pieces: ${a.d < b.d ? `${a.d}ths are bigger than ${b.d}ths` : `${a.d}ths are smaller than ${b.d}ths`}.`.replace(/(\d)ths/g, (m, d) => `${d}${{ 2: 'nds', 3: 'rds' }[d] || 'ths'}`), `So ${f(a.n, a.d)} ${s} ${f(b.n, b.d)}.`];
  const L = (a.d * b.d) / gcd(a.d, b.d);
  return [`Use a common denominator, ${L}: ${f(a.n, a.d)} = ${f(a.n * (L / a.d), L)} and ${f(b.n, b.d)} = ${f(b.n * (L / b.d), L)}.`, `Compare the numerators: ${a.n * (L / a.d)} ${s} ${b.n * (L / b.d)}.`, `So ${f(a.n, a.d)} ${s} ${f(b.n, b.d)}.`];
}

function fracToMixed(parts) {
  const a = operand(parts[0]);
  const ans = answerOf(parts);
  if (!a || !ans) return null;
  const q = Math.floor(a.n / a.d);
  const r = a.n % a.d;
  ok(eqv([a.n, a.d], ans));
  const lines = [`Divide the numerator by the denominator: ${a.n} ÷ ${a.d} = ${q}${r ? ` remainder ${r}` : ''}.`];
  if (!r) lines.push(`There is no remainder, so ${f(a.n, a.d)} = ${q}.`);
  else lines.push(`${q} is the whole number and the remainder ${r} is the new numerator: ${f(a.n, a.d)} = ${mx(q, r, a.d)}.`, `Check: ${q} × ${a.d} + ${r} = ${a.n}.`);
  return lines;
}

function fracToImproper(parts) {
  const a = operand(parts[0]);
  const ans = answerOf(parts);
  if (!a || !ans || !a.w) return null;
  const N = a.w * a.d + a.n;
  ok(eqv([N, a.d], ans));
  return [`Multiply the whole number by the denominator: ${a.w} × ${a.d} = ${a.w * a.d}. That's how many ${DEN[a.d] || 'pieces'} are in ${a.w} whole${a.w === 1 ? '' : 's'}.`, `Add the numerator: ${a.w * a.d} + ${a.n} = ${N}.`, `Keep the denominator, so ${mx(a.w, a.n, a.d)} = ${f(N, a.d)}.`];
}

// ---------- decimals ----------

const PLACES_R = ['tenths', 'hundredths', 'thousandths'];
function decPlace(parts) {
  const u = parts.find((t) => t.t === 'u');
  const b = parts.find((t) => t.t === 'b');
  if (!u || !b) return null;
  const v = u.v;
  const i = u.i;
  const digit = Number(v[i]);
  const point = v.includes('.') ? v.indexOf('.') : v.length;
  let place;
  let value;
  if (i < point) {
    const k = point - 1 - i;
    place = PL[k];
    value = String(digit * 10 ** k);
  } else {
    const k = i - point;
    place = PLACES_R[k - 1];
    value = `0.${'0'.repeat(k - 1)}${digit}`;
  }
  ok(num(b.a[0].v) === num(value));
  return [`Find the place of the underlined digit: the ${digit} in ${v} is in the ${place} place.`, `Its value is ${digit} ${place.replace(/s$/, digit === 1 ? '' : 's')}, which is ${value}.`];
}

const dp = (s) => (s.includes('.') ? s.split('.')[1].length : 0);
const est = (x) => (x >= 1 ? Math.round(x) : Math.round(x * 10) / 10);
function decMul(parts) {
  const [x, , y] = parts;
  const b = parts.find((t) => t.t === 'b');
  if (x.t !== 'n' || y.t !== 'n' || !b) return null;
  const a = x.v;
  const c = y.v;
  const ai = num(a.replace('.', ''));
  const ci = num(c.replace('.', ''));
  const places = dp(a) + dp(c);
  const prod = ai * ci;
  const s = String(prod).padStart(places + 1, '0');
  const ans = places ? `${s.slice(0, -places)}.${s.slice(-places)}` : s;
  ok(Math.abs(num(ans) - num(b.a[0].v)) < 1e-9);
  return [`Multiply as if there were no decimal points: ${fmt(ai)} × ${fmt(ci)} = ${fmt(prod)}.`, `Count the decimal places in the two numbers: ${dp(a)} + ${dp(c)} = ${places}.`, `Give the answer ${places} decimal place${places === 1 ? '' : 's'}: ${a} × ${c} = ${b.a[0].v}.`, `Estimate to check: ${a} × ${c} is about ${fmt(est(num(a)))} × ${fmt(est(num(c)))} = ${fmt(Math.round(est(num(a)) * est(num(c)) * 100) / 100)}, which is close.`];
}

function decDiv(p) {
  const n = p.dividend;
  const d = Number(p.divisor);
  const places = dp(n);
  const ni = num(n.replace('.', ''));
  if (ni % d) return null;
  const qi = ni / d;
  const s = String(qi).padStart(places + 1, '0');
  const q = places ? `${s.slice(0, -places)}.${s.slice(-places)}` : s;
  ok(num(q) === num(p.q));
  return [`Divide as if there were no decimal point: ${fmt(ni)} ÷ ${d} = ${fmt(qi)}.`, `Put the decimal point in the answer straight above the point in ${n}: ${p.q}.`, `Check by multiplying: ${p.q} × ${d} = ${n}.`];
}

function decRound(parts) {
  const v = parts[0].v;
  const label = (parts.find((t) => t.t === 'x') || {}).v || '';
  const b = parts.find((t) => t.t === 'b');
  const k = /thousandth/.test(label) ? 3 : /hundredth/.test(label) ? 2 : /tenth/.test(label) ? 1 : /whole|one/.test(label) ? 0 : null;
  if (k === null || !b) return null;
  const [w, fr = ''] = v.split('.');
  const digits = (w + fr.padEnd(k + 1, '0')).replace(/\D/g, '');
  const keep = BigInt(digits.slice(0, w.length + k));
  const next = Number(digits[w.length + k]);
  const r = keep + (next >= 5 ? 1n : 0n);
  const rs = r.toString().padStart(k + 1, '0');
  const ans = k ? `${rs.slice(0, -k)}.${rs.slice(-k)}` : rs;
  ok(num(ans) === num(b.a[0].v));
  const placeName = k ? PLACES_R[k - 1].replace(/s$/, '') : 'whole number';
  const nextName = PLACES_R[k];
  return [`To round to the nearest ${placeName}, look at the ${nextName} digit: ${next}.`, next >= 5 ? `${next} is 5 or more, so round up.` : `${next} is 4 or less, so round down (keep the digit the same).`, `${v} rounds to ${b.a[0].v}.`];
}

// ---------- integers ----------

function intOp(parts) {
  if (parts.length < 5) return null;
  const a = num(parts[0].v);
  const b = num(parts[2].v);
  const op = parts[1].v;
  const ans = num(parts.find((t) => t.t === 'b').a[0].v);
  const A = Math.abs(a);
  const B = Math.abs(b);
  if (op === '+') {
    ok(a + b === ans);
    if (Math.sign(a) === Math.sign(b) || a === 0 || b === 0) return [`Both numbers have the same sign, so add their sizes: ${A} + ${B} = ${A + B}.`, `Keep the sign: ${neg(a)} + ${par(b)} = ${neg(ans)}.`];
    return [`The signs are different, so subtract the smaller size from the larger: ${Math.max(A, B)} − ${Math.min(A, B)} = ${Math.abs(ans)}.`, `The answer takes the sign of the number with the larger size, ${neg(A > B ? a : b)}: ${neg(ans)}.`];
  }
  if (op === '−') {
    ok(a - b === ans);
    return [`Subtracting a number is the same as adding its opposite: ${neg(a)} − ${par(b)} = ${neg(a)} + ${par(-b)}.`, `${neg(a)} + ${par(-b)} = ${neg(ans)}.`];
  }
  if (op === '×' || op === '÷') {
    const r = op === '×' ? a * b : a / b;
    ok(r === ans);
    const same = Math.sign(a) === Math.sign(b);
    return [`${op === '×' ? 'Multiply' : 'Divide'} the sizes: ${A} ${op} ${B} = ${Math.abs(ans)}.`, same ? 'The signs are the same, so the answer is positive.' : 'The signs are different, so the answer is negative.', `${neg(a)} ${op} ${par(b)} = ${neg(ans)}.`];
  }
  return null;
}

// ---------- rounding and comparing ----------

function roundNum(p, parts) {
  const n = num(parts[0].v);
  const label = (parts.find((t) => t.t === 'x') || {}).v || '';
  const m = /r(\d+)$/.exec(p.key || '');
  const place = m ? Number(m[1]) : /thousand/.test(label) ? 1000 : /hundred/.test(label) ? 100 : /ten/.test(label) ? 10 : null;
  const b = parts.find((t) => t.t === 'b');
  if (!place || !b) return null;
  const lower = Math.floor(n / place) * place;
  const upper = lower + place;
  const digit = Math.floor((n % place) / (place / 10));
  const ans = digit >= 5 ? upper : lower;
  ok(ans === num(b.a[0].v));
  const k = Math.log10(place);
  return [`${fmt(n)} is between ${fmt(lower)} and ${fmt(upper)}.`, `Look at the ${PL[k - 1]} digit, the one just right of the ${PL[k]} place: ${digit}.`, digit >= 5 ? `${digit} is 5 or more, so round up to ${fmt(upper)}.` : `${digit} is 4 or less, so round down to ${fmt(lower)}.`];
}

function compareNums(parts) {
  const a = parts[0].v.replace(/,/g, '');
  const b = parts[2].v.replace(/,/g, '');
  const sign = parts[1].a && parts[1].a[0].v;
  const raw = num(a) > num(b) ? '>' : num(a) < num(b) ? '<' : '=';
  ok(raw === sign);
  const s = HTML_SIGN[raw];
  const A = fmt(num(a));
  const B = fmt(num(b));
  if (raw === '=') return [`Compare the digits from the left. Every digit matches, so ${A} = ${B}.`];
  if (a.length !== b.length) return [`${a.length > b.length ? A : B} has more digits, so it's the larger number.`, `${A} ${s} ${B}.`];
  const i = [...a].findIndex((c, j) => c !== b[j]);
  const place = PL[a.length - 1 - i];
  const lines = [`Both numbers have ${a.length} digits, so compare the digits from the left.`];
  if (i > 0) lines.push(`The digits match until the ${place} place.`);
  lines.push(`In the ${place} place, ${a[i]} ${s} ${b[i]}, so ${A} ${s} ${B}.`);
  return lines;
}

// ---------- clocks ----------

function clockRead(p, uk) {
  const { h, m } = p;
  const mm = String(m).padStart(2, '0');
  const next = (h % 12) + 1;
  const lines = [];
  if (p.mode === 'draw') {
    lines.push(`To show ${h}:${mm}, draw the long minute hand first. ${m === 0 ? 'It points straight up at 12.' : m % 5 === 0 ? `${m} minutes is ${m / 5} fives, so it points at the ${m / 5}.` : `It points ${m % 5} small marks past the ${Math.floor(m / 5) || 12}.`}`);
    lines.push(m === 0 ? `Draw the short hour hand pointing straight at the ${h}.` : `Draw the short hour hand between the ${h} and the ${next}${m >= 30 ? `, closer to the ${next}` : `, closer to the ${h}`}${m === 30 ? ' (halfway)' : ''}.`);
    return lines;
  }
  if (m === 0) lines.push(`The minute hand points straight up at 12, and the hour hand points at the ${h}. The time is ${h} o'clock, or ${h}:00.`);
  else {
    lines.push(`Read the hour hand first. It has passed the ${h} but not the ${next}, so the hour is ${h}.`);
    lines.push(m % 5 === 0 ? `The minute hand points at the ${m / 5}. Count by fives: ${m / 5} × 5 = ${m} minutes.` : `The minute hand is ${m % 5} small mark${m % 5 === 1 ? '' : 's'} past the ${Math.floor(m / 5) || 12}: ${Math.floor(m / 5) * 5} + ${m % 5} = ${m} minutes.`);
    lines.push(`The time is ${h}:${mm}.`);
    if (m === 15) lines.push(`You can also say quarter past ${h}.`);
    if (m === 30) lines.push(`You can also say half past ${h}.`);
    if (m === 45) lines.push(`You can also say quarter to ${next}.`);
  }
  return lines;
}

// ---------- order of operations ----------

function opsTokens(parts) {
  const out = [];
  for (const t of parts) {
    if (t.t === 'b') break;
    if (t.t === 'n') out.push(num(t.v));
    else if (t.t === 'p') out.push({ pow: [num(t.b), num(t.e)] });
    else if (t.t === 's') out.push({ raise: num(t.v) });
    else if (t.t === 'o') {
      if (t.v === '=') break;
      out.push(t.v);
    } else return null;
  }
  return out;
}
const isNum = (x) => typeof x === 'number';
function exprText(tokens) {
  let out = '';
  for (const t of tokens) {
    if (t && typeof t === 'object' && t.raise !== undefined) {
      out += sup(t.raise);
      continue;
    }
    out += `${out ? ' ' : ''}${isNum(t) ? fmt(t) : t.pow ? `${t.pow[0]}${sup(t.pow[1])}` : t}`;
  }
  return out.replace(/\( /g, '(').replace(/ \)/g, ')');
}
// (expression)ⁿ: once the brackets are worked out, the result becomes a power.
function foldSup(t) {
  for (let i = 1; i < t.length; i++) if (t[i] && typeof t[i] === 'object' && t[i].raise !== undefined && isNum(t[i - 1])) t.splice(i - 1, 2, { pow: [t[i - 1], t[i].raise] });
  return t;
}
function evalSteps(tokens) {
  let t = [...tokens];
  const steps = [[exprText(t), '']];
  for (let guard = 0; guard < 30 && (t.length > 1 || !isNum(t[0])); guard++) {
    // innermost parentheses
    let lo = 0;
    let hi = t.length - 1;
    const open = t.lastIndexOf('(');
    let why = '';
    if (open >= 0) {
      const close = t.indexOf(')', open);
      lo = open + 1;
      hi = close - 1;
      why = 'Parentheses first: ';
    }
    const seg = t.slice(lo, hi + 1);
    let i = seg.findIndex((x) => x && x.pow);
    let res;
    let what;
    if (i >= 0) {
      const [b, e] = seg[i].pow;
      res = b ** e;
      what = `exponent, ${b}${sup(e)} = ${fmt(res)}`;
      seg.splice(i, 1, res);
    } else {
      i = seg.findIndex((x) => x === '×' || x === '÷');
      if (i < 0) i = seg.findIndex((x) => x === '+' || x === '−');
      if (i < 0) return null;
      const a = seg[i - 1];
      const b = seg[i + 1];
      const op = seg[i];
      res = op === '×' ? a * b : op === '÷' ? a / b : op === '+' ? a + b : a - b;
      if (!Number.isInteger(res)) return null;
      what = `${{ '×': 'multiply', '÷': 'divide', '+': 'add', '−': 'subtract' }[op]}, ${fmt(a)} ${op} ${fmt(b)} = ${fmt(res)}`;
      seg.splice(i - 1, 3, res);
    }
    if (open >= 0 && seg.length === 1) t.splice(open, hi - lo + 3, ...seg);
    else t.splice(lo, hi - lo + 1, ...seg);
    foldSup(t);
    steps.push([`= ${exprText(t)}`, (why + what).replace(/^./, (c) => c.toUpperCase())]);
  }
  return t.length === 1 && isNum(t[0]) ? { steps, value: t[0] } : null;
}

const eqs = (rows) => `<ol class="eqs">${rows.map(([ex, why]) => `<li><span class="ex">${ex}</span>${why ? `<span class="why">${why}</span>` : ''}</li>`).join('')}</ol>`;

export function orderOps(parts) {
  const tokens = opsTokens(parts);
  if (!tokens) return null;
  const r = evalSteps(tokens);
  const b = parts.find((t) => t.t === 'b');
  if (!r || !b) return null;
  ok(r.value === num(b.a[0].v));
  return { html: eqs(r.steps), lines: [`Work one step at a time: parentheses, then exponents, then multiplication and division from left to right, then addition and subtraction from left to right.`] };
}

function powers(parts) {
  const p = parts.find((t) => t.t === 'p');
  const b = parts.find((t) => t.t === 'b');
  if (!p || !b) return null;
  const base = num(p.b);
  const e = num(p.e);
  ok(base ** e === num(b.a[0].v));
  if (e === 1) return [`Any number to the power of 1 is itself: ${base}${sup(1)} = ${base}.`];
  if (e === 0) return [`Any nonzero number to the power of 0 is 1: ${base}${sup(0)} = 1.`];
  const running = [];
  let v = base;
  for (let k = 2; k <= e; k++) {
    v *= base;
    running.push(fmt(v));
  }
  return [`The exponent ${e} tells you to use ${base} as a factor ${e} times: ${base}${sup(e)} = ${Array(e).fill(base).join(' × ')}.`, `Multiply one step at a time: ${running.join(', ')}.`, `So ${base}${sup(e)} = ${fmt(base ** e)}.`];
}

// ---------- the problem itself, as shown on the sheet ----------

function problemText(p) {
  if (p.type === 'arith') return p.nums.map((x) => fmt(num(x))).join(` ${p.op} `);
  if (p.type === 'div') return `${p.dividend} ÷ ${p.divisor}`;
  if (p.type !== 'line') return '';
  let out = '';
  for (const t of p.parts) {
    let piece;
    if (t.t === 'n') piece = t.v;
    else if (t.t === 'o') piece = HTML_SIGN[t.v] || t.v;
    else if (t.t === 'x') piece = t.v;
    else if (t.t === 'p') piece = `${t.b}${sup(t.e)}`;
    else if (t.t === 's') {
      out += sup(t.v);
      continue;
    } else if (t.t === 'u') piece = `${t.v.slice(0, t.i)}<u>${t.v[t.i]}</u>${t.v.slice(t.i + 1)}`;
    else if (t.t === 'f') {
      const part = (v) => (typeof v === 'number' ? v : '?');
      piece = t.w ? mx(t.w, part(t.n), part(t.d)) : f(part(t.n), part(t.d));
    } else if (t.t === 'b') piece = '?';
    else piece = '';
    out += `${out ? ' ' : ''}${piece}`;
  }
  return out.replace(/\( /g, '(').replace(/ \)/g, ')');
}

// ---------- choosing a good example ----------

const PICK = {
  add: (p) => {
    const [a, b] = p.nums.map(Number);
    return p.nums.length === 3 ? 1 : Math.min(a, b) >= 2 && a !== b && a + b > 10 && Math.max(a, b) < 10 ? 3 : Math.min(a, b) >= 2 ? 2 : 0;
  },
  sub: (p) => {
    const [a, b] = p.nums.map(Number);
    return b >= 2 && b < 10 && a - b >= 2 && a > 10 && b > a % 10 ? 3 : b >= 2 && a !== b ? 2 : 0;
  },
  mul: (p) => {
    const [a, b] = p.nums.map(Number);
    return Math.min(a, b) >= 3 && a !== 10 && b !== 10 ? 2 : Math.min(a, b) >= 2 ? 1 : 0;
  },
  div: (p) => (Number(p.divisor) >= 3 && Number(p.q) >= 3 ? 2 : 1),
  generic: (p) => {
    const s = JSON.stringify(p);
    return /"v":"="/.test(s.replace(/"o","v":"="/g, '')) ? 0 : 1;
  },
};
function best(problems, score) {
  let top = problems[0];
  let s = -1;
  for (const p of problems) {
    let v;
    try {
      v = score(p);
    } catch {
      v = -1;
    }
    if (v > s) [top, s] = [p, v];
  }
  return top;
}

// Returns { fig, items, extra } or null.
export function moreExample(ws, problems) {
  const r = explainOne(ws, problems);
  if (r && r.p && !r.fig) r.q = problemText(r.p);
  return r;
}

let chosen = null;
const pickFrom = (problems, score) => (chosen = best(problems, score));

function explainOne(ws, problems) {
  chosen = null;
  const res = explainInner(ws, problems);
  return res ? { ...res, p: chosen } : null;
}

function explainInner(ws, problems) {
  const uk = ws.locale === 'uk';
  const gen = ws.gen;
  const first = problems[0];
  const lines = (items) => (items ? { fig: '', items } : null);
  if (first.type === 'arith' && ws.format === 'horizontal') {
    const kind = { '+': 'add', '−': 'sub', '×': 'mul', '÷': 'div' };
    // mixed sheets: explain the first problem's kind, chosen well
    const p = pickFrom(problems, (q) => (q.op === '÷' ? 1 : PICK[kind[q.op]](q)));
    const [a, b] = p.nums.map(Number);
    ok(String(p.op === '+' ? p.nums.map(Number).reduce((s, x) => s + x, 0) : p.op === '−' ? a - b : p.op === '×' ? a * b : a / b) === String(p.ans).replace(/,/g, ''));
    if (p.op === '+') return lines(addFact(p.nums));
    if (p.op === '−') return lines(subFact(a, b));
    if (p.op === '×') {
      const m = /(\d+)-times-table/.exec(ws.slug);
      const table = m ? Number(m[1]) : null;
      const items = mulFact(a, b, table);
      if (!items) return null;
      let extra = '';
      if (table) {
        const rows = Array.from({ length: 12 }, (_, i) => `<li>${table} × ${i + 1} = ${table * (i + 1)}</li>`).join('');
        extra = `<h2>The ${table} times table</h2><ul class="tt-list">${rows}</ul>`;
      }
      return { fig: '', items, extra };
    }
    if (p.op === '÷') {
      const q = Math.floor(a / b);
      return lines(divFact(a, b, q, a - q * b));
    }
  }
  if (first.type === 'div' && ws.format === 'horizontal') {
    const p = pickFrom(problems, PICK.div);
    return lines(divFact(Number(p.dividend), Number(p.divisor), Number(p.q), Number(p.r)));
  }
  if (first.type === 'div' && gen === 'decDiv') return lines(decDiv(first));
  if (first.type === 'clock') {
    const p = pickFrom(problems, (q) => (q.m ? 1 : 0) + (q.m % 5 ? 0.5 : 0));
    return { fig: clockFig([[p.h, p.m]]), items: clockRead(p, uk) };
  }
  if (first.type !== 'line') return null;
  const p = pickFrom(problems, PICK.generic);
  const parts = p.parts;
  switch (gen) {
    case 'missing':
      return lines(missingFact(pickFrom(problems, (q) => (eqTokens(q.parts).some((t) => t.n === 0) ? 0 : 1)).parts));
    case 'bonds':
      return lines(bondFact(parts, num((/to-(\d+)/.exec(ws.slug) || [])[1])));
    case 'frac':
      return lines(fracOp(pickFrom(problems, (q) => (JSON.stringify(q.parts).includes('"w"') ? 2 : 1)).parts));
    case 'fracEquiv':
      return lines(fracEquiv(parts));
    case 'fracSimplify':
      return lines(fracSimplify(parts));
    case 'fracCompare':
      return lines(fracCompare(pickFrom(problems, (q) => (q.parts[0].d !== q.parts[2].d && q.parts[0].n !== q.parts[2].n ? 2 : 1)).parts));
    case 'fracToMixed':
      return lines(fracToMixed(parts));
    case 'fracToImproper':
      return lines(fracToImproper(parts));
    case 'decPlace':
      return lines(decPlace(pickFrom(problems, (q) => (q.parts[0].v.indexOf('.') < q.parts[0].i ? 2 : 1)).parts));
    case 'decMul':
      return lines(decMul(parts));
    case 'decRound':
      return lines(decRound(parts));
    case 'int':
      return lines(intOp(pickFrom(problems, (q) => (/−/.test(q.parts[0].v) || /−/.test(q.parts[2].v) ? 2 : 1) + (Math.abs(num(q.parts[2].v)) >= 2 && Math.abs(num(q.parts[0].v)) >= 2 ? 2 : 0)).parts));
    case 'round':
      return lines(roundNum(p, parts));
    case 'compare': {
      const q = pickFrom(problems, (x) => (x.parts[1].a[0].v === '=' ? 0 : x.parts[0].v.length === x.parts[2].v.length ? 2 : 1));
      return lines(compareNums(q.parts));
    }
    case 'orderOps': {
      const rank = (x) => {
        const j = JSON.stringify(x.parts);
        return (j.includes('"v":"("') ? 1 : 0) + (/"t":"[ps]"/.test(j) ? 2 : 0);
      };
      const ranked = [...problems].sort((x, y) => rank(y) - rank(x));
      for (const q of ranked) {
        const r = orderOps(q.parts);
        if (r) {
          chosen = q;
          return { fig: r.html, items: r.lines };
        }
      }
      return null;
    }
    case 'powers':
      return lines(powers(pickFrom(problems, (x) => (num(x.parts[0].e) >= 3 ? 1 : 0)).parts));
    default:
      return null;
  }
}
