// "Worked example" section for worksheet pages: one problem of the page's own
// kind, drawn with work.js and explained step by step. Text is built from the
// numbers, so it always matches the figure.
import { esc } from '../engine/render.js';
import { addWork, subWork, mulWork, divWork, decWork, busWork, addManyWork } from './work.js';
import { moreExample } from './explain2.js';

const PL = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands', 'millions'];
const ONE = ['one', 'ten', 'hundred', 'thousand', 'ten thousand', 'hundred thousand', 'million'];
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const fmt = (n) => Number(n).toLocaleString('en-US');
const times = (q) => (q === 1 ? 'once' : q === 2 ? 'twice' : `${q} times`);

function addSteps(a, b, uk) {
  const A = String(a);
  const B = String(b);
  const n = Math.max(A.length, B.length);
  const verb = uk ? 'exchange' : 'regroup';
  const out = [];
  let c = 0;
  for (let k = 0; k < n; k++) {
    const da = A[A.length - 1 - k];
    const db = B[B.length - 1 - k];
    const parts = [c ? String(c) : null, da ?? null, db ?? null].filter((x) => x !== null);
    const sum = c + +(da || 0) + +(db || 0);
    let t = parts.length === 1 ? `${cap(PL[k])}: bring down the ${parts[0]}.` : `${cap(PL[k])}: ${parts.join(' + ')} = ${sum}.`;
    c = Math.floor(sum / 10);
    if (parts.length > 1) t += c ? ` Write ${sum % 10} and ${verb} ${c} ${ONE[k + 1]} into the ${PL[k + 1]} column.` : ` Write ${sum}.`;
    out.push(t);
  }
  if (c) out.push(`The ${uk ? "exchanged" : "regrouped"} ${ONE[n]} has no column of its own, so it becomes the first digit of the answer.`);
  return out;
}

function addManySteps(nums, uk) {
  const strs = nums.map(String);
  const n = Math.max(...strs.map((x) => x.length));
  const verb = uk ? 'exchange' : 'regroup';
  const out = [];
  let c = 0;
  for (let k = 0; k < n; k++) {
    const digits = strs.map((x) => x[x.length - 1 - k]).filter((d) => d !== undefined);
    const parts = [...(c ? [String(c)] : []), ...digits];
    const sum = c + digits.reduce((t, d) => t + +d, 0);
    c = Math.floor(sum / 10);
    out.push(`${cap(PL[k])}: ${parts.join(' + ')} = ${sum}.${c ? ` Write ${sum % 10} and ${verb} ${c} ${ONE[k + 1]}${c > 1 ? 's' : ''} into the ${PL[k + 1]} column.` : ` Write ${sum}.`}`);
  }
  if (c) out.push(`Write the ${uk ? 'exchanged' : 'regrouped'} ${c} at the front of the answer.`);
  out.push(`The answer is ${fmt(nums.reduce((t, x) => t + x, 0))}.`);
  return out;
}

function subSteps(a, b, uk) {
  const A = String(a).split('').map(Number);
  const Braw = String(b);
  const B = Braw.padStart(A.length, '0').split('').map(Number);
  const top = [...A];
  const verb = uk ? 'an exchange' : 'a regroup';
  const out = [];
  const L = A.length;
  for (let i = L - 1; i >= 0; i--) {
    const k = L - 1 - i;
    const hasB = k < Braw.length;
    let t = `${cap(PL[k])}: `;
    if (top[i] < B[i]) {
      let j = i - 1;
      while (top[j] === 0) j--;
      const kj = L - 1 - j;
      if (j === i - 1) {
        t += `${top[i]} − ${B[i]} needs ${verb}. Take 1 ${ONE[kj]} from the ${PL[kj]} (${top[j]} becomes ${top[j] - 1}), which gives the ${PL[k]} 10 more: ${top[i] + 10}. `;
      } else {
        t += `${top[i]} − ${B[i]} needs ${verb}, but the ${PL[k + 1]} digit is 0. Go to the ${PL[kj]}: ${top[j]} becomes ${top[j] - 1}, each 0 in between becomes 9, and the ${PL[k]} become ${top[i] + 10}. `;
      }
      top[j] -= 1;
      for (let m = j + 1; m < i; m++) top[m] = 9;
      top[i] += 10;
    }
    if (!hasB) {
      if (i === 0 && top[i] === 0) continue;
      t += `there is nothing to subtract, so bring down the ${top[i]}.`;
    } else {
      t += `${top[i]} − ${B[i]} = ${top[i] - B[i]}.`;
    }
    out.push(t);
  }
  return out;
}

function mulSteps(a, b) {
  const A = String(a);
  const B = String(b);
  if (B.length === 1) {
    const out = [];
    let c = 0;
    for (let k = 0; k < A.length; k++) {
      const d = +A[A.length - 1 - k];
      const p = d * b;
      const v = p + c;
      let t = `${b} × ${d} = ${p}${c ? `, plus the carried ${c} makes ${v}` : ''}.`;
      if (k === A.length - 1) t += ` Write ${v}.`;
      else t += v >= 10 ? ` Write ${v % 10} and carry ${Math.floor(v / 10)}.` : ` Write ${v}.`;
      c = Math.floor(v / 10);
      out.push(`${cap(PL[k])}: ${t}`);
    }
    return out;
  }
  const rows = B.split('').reverse().map((d, r) => ({ d: +d, r, v: a * +d * 10 ** r }));
  const out = rows.map(({ d, r, v }) =>
    r === 0
      ? `Multiply ${fmt(a)} by the ones digit: ${fmt(a)} × ${d} = ${fmt(v)}.`
      : `Multiply by the ${PL[r]} digit, ${d}. Write ${r === 1 ? 'a placeholder 0' : `${r} placeholder zeros`} first, then ${fmt(a)} × ${d} = ${fmt(a * d)}, so the row reads ${fmt(v)}.`,
  );
  out.push(`Add the rows: ${rows.map((x) => fmt(x.v)).join(' + ')} = ${fmt(a * b)}.`);
  return out;
}

function divSteps(n, d, uk) {
  const N = String(n);
  const out = [];
  let pos = 0;
  let cur = +N[0];
  while (cur < d && pos < N.length - 1) cur = cur * 10 + +N[++pos];
  if (pos > 0) out.push(`${d} doesn't go into ${N.slice(0, pos)}, so start with ${cur}.`);
  for (;;) {
    const q = Math.floor(cur / d);
    const prod = q * d;
    const r = cur - prod;
    let t = `${d} goes into ${cur} ${times(q)} (${q} × ${d} = ${prod}). Write ${q} in the answer. ${cur} − ${prod} = ${r}.`;
    if (pos === N.length - 1) {
      t += r ? ` No digits are left, so ${r} is the remainder.` : ' Nothing is left over.';
      out.push(t);
      break;
    }
    pos++;
    cur = r * 10 + +N[pos];
    t += ` Bring down the ${N[pos]} to make ${cur}.`;
    while (cur < d && pos < N.length - 1) {
      t += ` ${d} doesn't go into ${cur}, so write 0 in the answer and bring down the ${N[pos + 1]} to make ${cur * 10 + +N[pos + 1]}.`;
      cur = cur * 10 + +N[++pos];
    }
    if (cur < d) {
      t += ` ${d} doesn't go into ${cur}, so write 0 in the answer. No digits are left, so ${cur} is the remainder.`;
      out.push(t);
      break;
    }
    out.push(t);
  }
  const q = Math.floor(n / d);
  const r = n % d;
  out.push(`The answer is ${fmt(q)}${r ? ` ${uk ? 'r' : 'R'}${r}` : ''}. Check: ${fmt(q)} × ${d}${r ? ` + ${r}` : ''} = ${fmt(n)}.`);
  return out;
}

function busSteps(n, d) {
  const N = String(n).split('').map(Number);
  const out = [];
  let cur = 0;
  let started = false;
  N.forEach((digit, i) => {
    const v = cur * 10 + digit;
    const q = Math.floor(v / d);
    const r = v % d;
    const last = i === N.length - 1;
    let t;
    if (!q && !started && !last) t = `${d} into ${v} doesn't go, so carry the ${v} to the next digit to make ${v * 10 + N[i + 1]}.`;
    else {
      started = true;
      t = `${d} into ${v} goes ${times(q)}${q ? ` (${q} × ${d} = ${q * d})` : ''}`;
      if (last) t += `. Write ${q} on top.${r ? ` ${r} is left over, and that is the remainder.` : ' Nothing is left over.'}`;
      else t += r ? `, with ${r} left over. Write ${q} on top and carry the ${r} to make ${r * 10 + N[i + 1]}.` : `. Write ${q} on top.`;
    }
    out.push(t);
    cur = r;
  });
  const q = Math.floor(n / d);
  const r = n % d;
  out.push(`The answer is ${fmt(q)}${r ? ` r${r}` : ''}. Check: ${fmt(q)} × ${d}${r ? ` + ${r}` : ''} = ${fmt(n)}.`);
  return out;
}

// Items are built here from numbers and fixed words (fractions as trusted HTML).
const list = (items) => (items.length ? `<ol>${items.map((t) => `<li>${t}</li>`).join('')}</ol>` : '');

// Returns '' when the page's problems have no worked layout.
// Prefer a problem that shows the sheet's skill: one that regroups, if any do.
function regroups(p) {
  if (p.type !== 'arith' || p.nums.length !== 2 || /\./.test(p.nums.join(''))) return 0;
  const [a, b] = p.nums;
  let n = 0;
  if (p.op === '+') {
    let c = 0;
    for (let k = 0; k < Math.max(a.length, b.length); k++) {
      c = Math.floor((+(a[a.length - 1 - k] || 0) + +(b[b.length - 1 - k] || 0) + c) / 10);
      n += c;
    }
  } else if (p.op === '−') {
    let borrow = 0;
    for (let k = 0; k < a.length; k++) {
      const top = +a[a.length - 1 - k] - borrow;
      borrow = top < +(b[b.length - 1 - k] || 0) ? 1 : 0;
      n += borrow;
    }
  } else if (p.op === '×') n = Math.min(a.length, b.length);
  return Math.min(n, 2);
}

export function workedExample(ws, problems) {
  const p = ws.format === 'vertical' ? problems.reduce((best, q) => (regroups(q) > regroups(best) ? q : best), problems[0]) : problems[0];
  const uk = ws.locale === 'uk';
  const intro = `<p>Here's how to solve a problem like the ones on this sheet, step by step.</p>`;
  let fig = '';
  let items = [];
  if (p.type === 'arith' && ws.format === 'vertical' && p.nums.length > 2 && p.op === '+' && !/\./.test(p.nums.join(''))) {
    const v = p.nums.map(Number);
    if (String(v.reduce((t, x) => t + x, 0)) !== String(p.ans).replace(/,/g, '')) throw new Error(`${ws.slug}: worked example disagrees with the answer key`);
    [fig, items] = [addManyWork(v), addManySteps(v, uk)];
  } else if (p.type === 'arith' && ws.format === 'vertical' && p.nums.length === 2) {
    const [x, y] = p.nums;
    if (/\./.test(x + y)) {
      const op = p.op === '+' ? '+' : '-';
      fig = decWork(x, y, op);
      items = [
        `Line up the decimal points, and write zeros so both numbers have the same number of decimal places.`,
        `${op === '+' ? 'Add' : 'Subtract'} as if they were whole numbers, starting from the right.`,
        `Bring the decimal point straight down into the answer: ${p.ans}.`,
      ];
    } else {
      const a = Number(x);
      const b = Number(y);
      if (p.op === '+') [fig, items] = [addWork(a, b), addSteps(a, b, uk)];
      else if (p.op === '−') [fig, items] = [subWork(a, b), subSteps(a, b, uk)];
      else if (p.op === '×') [fig, items] = [mulWork(a, b), mulSteps(a, b)];
      else return '';
      const ans = p.op === '+' ? a + b : p.op === '−' ? a - b : a * b;
      if (String(ans) !== String(p.ans).replace(/,/g, '')) throw new Error(`${ws.slug}: worked example disagrees with the answer key`);
      items.push(`The answer is ${fmt(ans)}.`);
    }
  } else if (p.type === 'div' && ws.format === 'longdiv' && !/\./.test(p.dividend)) {
    const n = Number(p.dividend);
    const d = Number(p.divisor);
    if (Math.floor(n / d) !== Number(p.q) || n % d !== Number(p.r)) throw new Error(`${ws.slug}: worked example disagrees with the answer key`);
    if (ws.slug === 'maths/short-division') [fig, items] = [busWork(n, d), busSteps(n, d)];
    else [fig, items] = [divWork(n, d, { uk }).html, divSteps(n, d, uk)];
  } else {
    const more = moreExample(ws, problems);
    if (!more) return '';
    const q = more.q ? `<p class="we-q">Problem: <b>${more.q}</b></p>` : '';
    return `<h2>Worked example</h2>${intro}${q}${more.fig}${list(more.items)}${more.extra || ''}`;
  }
  return `<h2>Worked example</h2>${intro}${fig}${list(items)}`;
}
