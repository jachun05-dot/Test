// Worked examples for the teaching guides. Each layout is computed from the
// numbers (carries, regrouping, long division steps), and every function checks
// its own answer, so a guide can never show wrong arithmetic.
import { esc, clockSvg } from '../engine/render.js';

const MINUS = '−';
const TIMES = '×';

function check(ok, what) {
  if (!ok) throw new Error(`Worked example is wrong: ${what}`);
}

// A row is an array of cells { t, c }. place() writes text so its last
// character lands in column `right`.
const blankRow = (w) => Array.from({ length: w }, () => ({ t: '', c: [] }));
function place(row, right, text, cls = []) {
  const s = String(text);
  if (right - s.length + 1 < 0) throw new Error(`Worked example does not fit: ${s}`);
  for (let i = 0; i < s.length; i++) {
    const cell = row[right - s.length + 1 + i];
    cell.t = s[i];
    cell.c.push(...cls);
  }
}

function figure(rows, label, caption, cw = '') {
  const w = rows[0].length;
  const cells = rows
    .map((r) => r.map((x) => `<span${x.c.length ? ` class="${x.c.join(' ')}"` : ''}>${x.pre ? `<small class="cr">${esc(x.pre)}</small>` : ''}${esc(x.t)}</span>`).join(''))
    .join('');
  return `<figure class="work"><div class="wg" style="--w:${w}${cw ? `;--cw:${cw}` : ''}" role="img" aria-label="${esc(label)}">${cells}</div>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
}

const fmt = (n) => n.toLocaleString('en-US');

// Column addition with the regrouped digits written above.
export function addWork(a, b, caption = '') {
  const A = String(a);
  const B = String(b);
  const S = String(a + b);
  const n = Math.max(A.length, B.length, S.length);
  const w = n + 1;
  const carry = Array(n + 1).fill(0);
  for (let k = 0; k < n; k++) {
    const da = +(A[A.length - 1 - k] || 0);
    const db = +(B[B.length - 1 - k] || 0);
    carry[k + 1] = Math.floor((da + db + carry[k]) / 10);
  }
  const top = blankRow(w);
  const width = Math.max(A.length, B.length);
  for (let k = 1; k < width; k++) if (carry[k]) place(top, w - 1 - k, carry[k], ['cy']);
  const r1 = blankRow(w);
  place(r1, w - 1, A);
  const r2 = blankRow(w);
  place(r2, 0, '+', ['op']);
  place(r2, w - 1, B);
  r2.forEach((x) => x.c.push('ul'));
  const r3 = blankRow(w);
  place(r3, w - 1, S, ['an']);
  return figure([top, r1, r2, r3], `${fmt(a)} plus ${fmt(b)} equals ${fmt(a + b)}`, caption);
}

// Column subtraction. Regrouped digits are crossed out and the new values
// written above them.
export function subWork(a, b, caption = '') {
  check(a > b, `${a} - ${b}`);
  const A = String(a).split('').map(Number);
  const B = String(b).padStart(A.length, '0').split('').map(Number);
  const top = [...A];
  const changed = new Set();
  for (let i = A.length - 1; i >= 0; i--) {
    if (top[i] >= B[i]) continue;
    let j = i - 1;
    while (top[j] === 0) j--;
    top[j] -= 1;
    changed.add(j);
    for (let k = j + 1; k < i; k++) {
      top[k] = 9;
      changed.add(k);
    }
    top[i] += 10;
    changed.add(i);
  }
  const diff = Number(top.map((t, i) => t - B[i]).join(''));
  check(diff === a - b, `${a} - ${b}`);
  const w = A.length + 1;
  const r0 = blankRow(w);
  // One cell per column, even when the regrouped value has two digits (12).
  for (const k of changed) Object.assign(r0[k + 1], { t: String(top[k]), c: ['cy'] });
  const r1 = blankRow(w);
  A.forEach((d, k) => place(r1, k + 1, d, changed.has(k) ? ['st'] : []));
  const r2 = blankRow(w);
  place(r2, 0, MINUS, ['op']);
  place(r2, w - 1, String(b));
  r2.forEach((x) => x.c.push('ul'));
  const r3 = blankRow(w);
  place(r3, w - 1, String(a - b), ['an']);
  return figure([r0, r1, r2, r3], `${fmt(a)} minus ${fmt(b)} equals ${fmt(a - b)}`, caption);
}

// Multiplication. A one-digit multiplier shows the carried digits; a longer
// one shows each partial product, with placeholder zeros highlighted.
export function mulWork(a, b, caption = '') {
  const A = String(a);
  const B = String(b);
  const P = String(a * b);
  const rows = [];
  if (B.length === 1) {
    const w = Math.max(A.length, P.length) + 1;
    const top = blankRow(w);
    let c = 0;
    for (let k = 0; k < A.length; k++) {
      c = Math.floor((+A[A.length - 1 - k] * b + c) / 10);
      if (c && k < A.length - 1) place(top, w - 2 - k, c, ['cy']);
    }
    rows.push(top);
    const r1 = blankRow(w);
    place(r1, w - 1, A);
    const r2 = blankRow(w);
    place(r2, 0, TIMES, ['op']);
    place(r2, w - 1, B);
    r2.forEach((x) => x.c.push('ul'));
    const r3 = blankRow(w);
    place(r3, w - 1, P, ['an']);
    rows.push(r1, r2, r3);
  } else {
    const parts = B.split('').reverse().map((d, r) => a * +d * 10 ** r);
    check(parts.reduce((s, p) => s + p, 0) === a * b, `${a} x ${b}`);
    const w = Math.max(A.length, ...parts.map((p) => String(p).length), P.length) + 1;
    const r1 = blankRow(w);
    place(r1, w - 1, A);
    const r2 = blankRow(w);
    place(r2, 0, TIMES, ['op']);
    place(r2, w - 1, B);
    r2.forEach((x) => x.c.push('ul'));
    rows.push(r1, r2);
    parts.forEach((p, r) => {
      const row = blankRow(w);
      const s = p === 0 ? '0'.repeat(r + 1) : String(p);
      place(row, w - 1, s);
      for (let z = 0; z < r; z++) row[w - 1 - z].c.push('hl');
      if (r === parts.length - 1) {
        place(row, 0, '+', ['op']);
        row.forEach((x) => x.c.push('ul'));
      }
      rows.push(row);
    });
    const total = blankRow(w);
    place(total, w - 1, P, ['an']);
    rows.push(total);
  }
  return figure(rows, `${fmt(a)} times ${fmt(b)} equals ${fmt(a * b)}`, caption);
}

// Long division (or the bus stop layout, which is the same bracket in the UK).
// Returns the figure plus the list of steps so the text can describe them.
export function divWork(n, d, { uk = false, caption = '' } = {}) {
  const N = String(n);
  const D = String(d);
  const c0 = D.length;
  let pos = 0;
  let cur = +N[0];
  while (cur < d && pos < N.length - 1) cur = cur * 10 + +N[++pos];
  const q = {};
  const work = [];
  const steps = [];
  let rem = 0;
  let curText = String(cur);
  let first = true;
  for (;;) {
    if (!first) work.push({ right: pos, text: curText });
    first = false;
    if (cur < d) {
      q[pos] = 0;
      rem = cur;
      steps.push({ cur, qd: 0, prod: 0, rem: cur, last: true });
      break;
    }
    const qd = Math.floor(cur / d);
    q[pos] = qd;
    const prod = qd * d;
    work.push({ right: pos, text: String(prod), under: true });
    const r = cur - prod;
    if (pos === N.length - 1) {
      work.push({ right: pos, text: String(r) });
      rem = r;
      steps.push({ cur, qd, prod, rem: r, last: true });
      break;
    }
    pos++;
    const step = { cur, qd, prod, rem: r, down: N[pos], zeros: 0 };
    cur = r * 10 + +N[pos];
    curText = (r ? String(r) : '') + N[pos];
    while (cur < d && pos < N.length - 1) {
      q[pos] = 0;
      step.zeros++;
      cur = cur * 10 + +N[++pos];
      curText += N[pos];
    }
    step.next = cur;
    steps.push(step);
  }
  const qStr = Object.keys(q)
    .map(Number)
    .sort((x, y) => x - y)
    .map((k) => q[k])
    .join('');
  const quotient = Number(qStr);
  check(quotient * d + rem === n && rem < d, `${n} / ${d}`);
  const w = c0 + N.length + (rem ? 3 : 0);
  const qRow = blankRow(w);
  for (const k of Object.keys(q)) place(qRow, c0 + Number(k), q[k], ['an']);
  if (rem) Object.assign(qRow[w - 2], { t: `${uk ? 'r' : 'R'}${rem}`, c: ['an', 'rm'] });
  const dRow = blankRow(w);
  place(dRow, c0 - 1, D);
  place(dRow, c0 + N.length - 1, N);
  for (let i = 0; i < N.length; i++) dRow[c0 + i].c.push('ov');
  dRow[c0].c.push('bl');
  const rows = [qRow, dRow];
  for (const wk of work) {
    const row = blankRow(w);
    place(row, c0 + wk.right, wk.text, wk.under ? ['ul'] : []);
    rows.push(row);
  }
  const label = `${fmt(n)} divided by ${fmt(d)} equals ${fmt(quotient)}${rem ? ` remainder ${rem}` : ''}`;
  return { html: figure(rows, label, caption), quotient, rem, steps };
}

// Inline fractions and mixed numbers for running text.
export const f = (n, d) => `<span class="fr"><span class="fr-n">${n}</span><span class="fr-d">${d}</span></span>`;
export const mx = (w, n, d) => `<span class="mx">${w}${f(n, d)}</span>`;

export function clockFig(times, caption = '') {
  const items = times
    .map(([h, m]) => `<span class="cf-item">${clockSvg(h, m)}<span class="cf-t">${h}:${String(m).padStart(2, '0')}</span></span>`)
    .join('');
  return `<figure class="work clocks"><div class="cf">${items}</div>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
}

// Decimal addition or subtraction with the points lined up. Zeros added to
// make the places match are highlighted.
export function decWork(a, b, op = '+', caption = '') {
  const places = (x) => (x.includes('.') ? x.split('.')[1].length : 0);
  const dp = Math.max(places(a), places(b));
  const toInt = (x) => {
    const [w, fr = ''] = x.split('.');
    return Number(w + fr.padEnd(dp, '0'));
  };
  const ai = toInt(a);
  const bi = toInt(b);
  const ri = op === '+' ? ai + bi : ai - bi;
  check(ri >= 0, `${a} ${op} ${b}`);
  const asDec = (i) => {
    const s = String(i).padStart(dp + 1, '0');
    return `${s.slice(0, -dp)}.${s.slice(-dp)}`;
  };
  const written = (x) => {
    const [w, fr = ''] = x.split('.');
    return { text: `${w}.${fr.padEnd(dp, '0')}`, added: dp - fr.length + (x.includes('.') ? 0 : 1) };
  };
  const A = written(a);
  const B = written(b);
  const R = asDec(ri);
  check(Math.abs(Number(R) - (op === '+' ? Number(a) + Number(b) : Number(a) - Number(b))) < 1e-9, `${a} ${op} ${b}`);
  const w = Math.max(A.text.length, B.text.length, R.length) + 1;
  const mark = (row, x) => {
    place(row, w - 1, x.text);
    for (let z = 0; z < x.added; z++) row[w - 1 - z].c.push('hl');
  };
  const r1 = blankRow(w);
  mark(r1, A);
  const r2 = blankRow(w);
  place(r2, 0, op === '+' ? '+' : MINUS, ['op']);
  mark(r2, B);
  r2.forEach((x) => x.c.push('ul'));
  const r3 = blankRow(w);
  place(r3, w - 1, R, ['an']);
  return figure([r1, r2, r3], `${a} ${op === '+' ? 'plus' : 'minus'} ${b} equals ${R}`, caption);
}

// Short division (the bus stop method): remainders are carried as small digits.
export function busWork(n, d, caption = '') {
  const N = String(n).split('').map(Number);
  const D = String(d);
  const c0 = D.length;
  const q = [];
  const carries = [];
  let cur = 0;
  N.forEach((digit, i) => {
    const v = cur * 10 + digit;
    q.push(Math.floor(v / d));
    cur = v % d;
    if (i < N.length - 1) carries[i + 1] = cur;
  });
  const quotient = Number(q.join(''));
  check(quotient * d + cur === n, `${n} / ${d}`);
  const w = c0 + N.length + (cur ? 2 : 0);
  const qRow = blankRow(w);
  let started = false;
  q.forEach((digit, i) => {
    if (digit || started || i === N.length - 1) {
      started = true;
      place(qRow, c0 + i, digit, ['an']);
    }
  });
  if (cur) Object.assign(qRow[w - 1], { t: `r${cur}`, c: ['an', 'rm'] });
  const dRow = blankRow(w);
  place(dRow, c0 - 1, D);
  N.forEach((digit, i) => {
    const cell = dRow[c0 + i];
    cell.t = String(digit);
    cell.c.push('ov');
    if (carries[i]) cell.pre = String(carries[i]);
  });
  dRow[c0].c.push('bl');
  return figure([qRow, dRow], `${fmt(n)} divided by ${d} equals ${fmt(quotient)}${cur ? ` remainder ${cur}` : ''}`, caption, '1.45em');
}
