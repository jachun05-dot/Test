// Turns problems into printable sheet HTML. Sizes are in em (scaled by --fs) and
// cqw (percent of the sheet width), so one layout works on screen and on paper.

import { N, O, X, B } from './tokens.js';
import { MINUS, TIMES } from './numbers.js';
import { THEMES, svgIcon } from './themes.js';

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ESC[c]);
const r2 = (n) => Math.round(n * 100) / 100;

// Printable area of each paper size with 0.5in margins (width / height).
export const PAPERS = {
  letter: { ratio: 7.5 / 9.95, css: 'letter' },
  a4: { ratio: 184.6 / 270, css: 'A4' },
};

// ---------- measuring (em) ----------

const DIGIT = 0.62;
const GAP = 0.28;
const NUM_W = 1.55; // room for the problem number

function strW(s) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch >= '0' && ch <= '9') w += DIGIT;
    else if (ch === '.' || ch === ',') w += 0.28;
    else if (ch === '(' || ch === ')') w += 0.36;
    else if (ch === MINUS) w += 0.62;
    else w += 0.55;
  }
  return w;
}

const partW = (x) => (typeof x === 'object' ? blankW(x, true) : strW(x));
const fracW = (t) => Math.max(partW(t.n), partW(t.d)) + 0.25 + (t.w ? strW(t.w) + 0.12 : 0);

function tokW(t, bw = 0) {
  switch (t.t) {
    case 'n':
    case 'u': return strW(t.v);
    case 'o': return t.v === '(' || t.v === ')' ? 0.36 : 0.85;
    case 'x': return t.v.length * 0.47;
    case 'p': return strW(t.b) + strW(t.e) * 0.65;
    case 's': return strW(t.v) * 0.65;
    case 'f': return fracW(t);
    case 'b': return t.s === 'circle' ? blankW(t) : Math.max(blankW(t), bw);
    default: return 0;
  }
}

function blankW(t, inner = false) {
  if (t.s === 'circle') return 1.5;
  const ans = t.a.reduce((s, x) => s + tokW(x), 0) + (t.a.length - 1) * GAP;
  return Math.max(inner ? 1.5 : 2.4, ans + (inner ? 0.5 : 0.9));
}

const lineW = (parts, bw) => parts.reduce((s, t) => s + tokW(t, bw), 0) + (parts.length - 1) * GAP;

// Widest answer blank on the sheet. Every blank gets this width so its length
// does not hint at the answer.
function sheetBlankWidth(problems, format) {
  let w = 0;
  for (const p of problems) {
    if (kindOf(p, format) !== 'h') continue;
    for (const t of toLine(p)) if (t.t === 'b' && t.s !== 'circle') w = Math.max(w, blankW(t));
  }
  return w;
}
const hasFrac = (parts) => parts.some((t) => t.t === 'f' || (t.t === 'b' && t.a.some((x) => x.t === 'f')));

export function toLine(p) {
  if (p.type === 'line') return p.parts;
  if (p.type === 'arith') {
    const parts = [];
    p.nums.forEach((n, i) => {
      if (i) parts.push(O(p.op));
      parts.push(N(n));
    });
    return [...parts, O('='), B(N(p.ans))];
  }
  if (p.type === 'div') {
    const parts = [N(p.dividend), O('÷'), N(p.divisor), O('='), B(N(p.q))];
    if (p.rmode) parts.push(X('R'), B(N(p.r)));
    return parts;
  }
  return [];
}

function vGrid(p) {
  const parts = [...p.nums, p.ans].map((s) => {
    const [i, f = ''] = s.split('.');
    return { i, f, point: s.includes('.') };
  });
  return {
    parts,
    intLen: Math.max(...parts.map((x) => x.i.length)),
    fracLen: Math.max(...parts.map((x) => x.f.length)),
  };
}

function kindOf(p, format) {
  if (p.type === 'clock') return 'c';
  if (p.type === 'arith' && format === 'vertical') return 'v';
  if (p.type === 'div' && format === 'longdiv') return 'd';
  return 'h';
}

function measure(p, format, bw = 0) {
  const kind = kindOf(p, format);
  if (kind === 'c') return { w: 6.2, h: 6.7 };
  if (kind === 'v') {
    const g = vGrid(p);
    const w = 0.85 + g.intLen * DIGIT + (g.fracLen ? 0.3 + g.fracLen * DIGIT : 0) + NUM_W;
    let h = (p.nums.length + 1) * 1.18 + 0.5;
    h += p.op === TIMES && p.nums[1].length > 1 ? (p.nums[1].length + 1) * 1.18 : 0.6;
    return { w, h };
  }
  if (kind === 'd') {
    const w = 0.5 + strW(p.divisor) + 0.6 + strW(p.dividend) + (p.rmode ? 0.3 + strW(`R${p.divisor}`) : 0.3) + NUM_W;
    const steps = Math.min(p.q.replace(/\D/g, '').length, 4);
    return { w, h: 2.8 + steps * 1.5 };
  }
  const parts = toLine(p);
  return { w: lineW(parts, bw) + NUM_W, h: (hasFrac(parts) ? 2.9 : 1.6) + (p.work || 0) };
}

function defaults(format, box) {
  if (format === 'vertical') {
    return { cols: box.w <= 5.4 ? 5 : box.w <= 6.9 ? 4 : 3, rows: box.h > 7 ? 3 : box.h > 5.2 ? 4 : 5, maxFs: 4.8 };
  }
  if (format === 'longdiv') return { cols: box.w <= 8.6 ? 3 : 2, rows: box.h > 7.6 ? 3 : 4, maxFs: 4.4 };
  if (format === 'clock') return { cols: 3, rows: 4, maxFs: 4.4 };
  const cols = box.w <= 7.4 ? 4 : box.w <= 10.6 ? 3 : box.w <= 17 ? 2 : 1;
  const rows = box.h > 3.4 ? 6 : box.h > 2 ? 8 : 10;
  return { cols, rows, maxFs: 3.8 };
}

// Sheet geometry in cqw. Keep in sync with .sheet styles in site.css.
const PAD_X = 6;
const PAD_TOP = 5.5;
const PAD_BOTTOM = 4;
const HEAD_NAME = 6.6;
const HEAD_REST = 13.2;
const FOOT = 4.2;
const COL_GAP = 3;
const ART = 10.2; // picture row on holiday sheets

export function planLayout(problems, format, o = {}) {
  const ratio = (PAPERS[o.paper] || PAPERS.letter).ratio;
  const gridW = 100 - 2 * PAD_X;
  const gridH = 100 / ratio - PAD_TOP - PAD_BOTTOM - (o.showName === false ? 0 : HEAD_NAME) - HEAD_REST - FOOT - (o.theme ? ART : 0);
  const bw = o.bw ?? sheetBlankWidth(problems, format);
  const box = problems.reduce(
    (m, p) => {
      const b = measure(p, format, bw);
      return { w: Math.max(m.w, b.w), h: Math.max(m.h, b.h) };
    },
    { w: 1, h: 1 },
  );
  const def = defaults(format, box);
  const cols = o.cols || def.cols;
  const maxRows = o.rows || def.rows;
  const perPage = cols * maxRows;
  const pages = Math.max(1, Math.ceil(problems.length / perPage));
  const rows = pages === 1 ? Math.max(1, Math.ceil(problems.length / cols)) : maxRows;
  const rowGap = rows > 14 ? 0.7 : rows > 8 ? 1.4 : 2.2;
  const cellW = (gridW - COL_GAP * (cols - 1)) / cols;
  const cellH = (gridH - rowGap * (rows - 1)) / rows;
  const fs = Math.min(def.maxFs, cellW / box.w, cellH / box.h);
  return { cols, rows, perPage, pages, fs: r2(fs), rowGap };
}

// ---------- problem HTML ----------

function tokHtml(t, key, bw = 0) {
  switch (t.t) {
    case 'n': return `<span class="tn">${esc(t.v)}</span>`;
    case 'u': return `<span class="tn">${esc(t.v.slice(0, t.i))}<u>${esc(t.v[t.i])}</u>${esc(t.v.slice(t.i + 1))}</span>`;
    case 'o': return `<span class="to${t.v === '(' ? ' tpo' : t.v === ')' ? ' tpc' : ''}">${esc(t.v)}</span>`;
    case 'x': return `<span class="tx">${esc(t.v)}</span>`;
    case 'p': return `<span class="tn">${esc(t.b)}<sup>${esc(t.e)}</sup></span>`;
    case 's': return `<sup class="ts">${esc(t.v)}</sup>`;
    case 'f': return fracHtml(t, key);
    case 'b': return blankHtml(t, key, false, bw);
    default: return '';
  }
}

function fracHtml(t, key) {
  const part = (x) => (typeof x === 'object' ? blankHtml(x, key, true) : esc(x));
  const f = `<span class="tf"><span>${part(t.n)}</span><span>${part(t.d)}</span></span>`;
  return t.w ? `<span class="tm"><span class="tn">${esc(t.w)}</span>${f}</span>` : f;
}

function blankHtml(t, key, inner, bw = 0) {
  const circle = t.s === 'circle';
  const tall = !inner && t.a.some((x) => x.t === 'f');
  const cls = `tb${circle ? ' tbc' : ''}${tall ? ' tbt' : ''}${inner ? ' tbi' : ''}`;
  const width = circle ? '' : ` style="width:${r2(Math.max(blankW(t, inner), inner ? 0 : bw))}em"`;
  const ans = key ? `<span class="ka">${t.a.map((x) => tokHtml(x, false)).join('')}</span>` : '';
  return `<span class="${cls}"${width}>${ans}</span>`;
}

const renderLine = (parts, key, bw) => `<span class="ln">${parts.map((t) => tokHtml(t, key, bw)).join('')}</span>`;

function renderVertical(p, key, sheetMax) {
  const g = vGrid(p);
  const { parts } = g;
  // Use the widest problem on the sheet so every problem lines up the same way.
  const intLen = Math.max(g.intLen, sheetMax?.intLen || 0);
  const fracLen = Math.max(g.fracLen, sheetMax?.fracLen || 0);
  const cols = ['0.85em', `repeat(${intLen},0.62em)`];
  if (fracLen) cols.push('0.3em', `repeat(${fracLen},0.62em)`);
  const cells = (x) => {
    const out = [...x.i.padStart(intLen, ' ')];
    if (fracLen) out.push(x.point ? '.' : ' ', ...x.f.padEnd(fracLen, ' '));
    return out.map((c) => (c === ' ' ? '' : c));
  };
  let html = '';
  const last = parts.length - 2;
  parts.slice(0, -1).forEach((x, i) => {
    html += `<span class="vo">${i === last ? esc(p.op) : ''}</span>`;
    html += cells(x).map((c) => `<span>${esc(c)}</span>`).join('');
  });
  html += '<span class="vl"></span><span></span>';
  html += cells(parts[parts.length - 1]).map((c) => `<span class="ka">${key ? esc(c) : ''}</span>`).join('');
  return `<span class="v" style="grid-template-columns:${cols.join(' ')}">${html}</span>`;
}

function renderLongDiv(p, key, uk) {
  // The remainder column keeps its width on the worksheet too, so both pages line up.
  const R = uk ? 'r' : 'R'; // UK classrooms write remainders as "r"
  const rem = p.rmode ? `<span class="ldr ka" style="min-width:${r2(0.3 + strW(`R${p.divisor}`))}em">${key && p.r !== '0' ? `${R}${esc(p.r)}` : ''}</span>` : '';
  return (
    `<span class="ld${p.rmode ? ' ld-r' : ''}"><span class="ldq ka">${key ? esc(p.q) : ''}</span>${rem}` +
    `<span class="lds">${esc(p.divisor)}</span><span class="ldn">${esc(p.dividend)}</span></span>`
  );
}

// Clock face: ticks and numbers are the same for every clock.
const f1 = (n) => Math.round(n * 10) / 10;
const CLOCK_FACE = (() => {
  let minor = '';
  let major = '';
  for (let i = 0; i < 60; i++) {
    const a = (i * Math.PI) / 30;
    const r1 = i % 5 === 0 ? 82 : 87;
    const d = `M${f1(100 + r1 * Math.sin(a))} ${f1(100 - r1 * Math.cos(a))}L${f1(100 + 92 * Math.sin(a))} ${f1(100 - 92 * Math.cos(a))}`;
    if (i % 5 === 0) major += d;
    else minor += d;
  }
  let nums = '';
  for (let k = 1; k <= 12; k++) {
    const a = (k * Math.PI) / 6;
    nums += `<text x="${f1(100 + 68 * Math.sin(a))}" y="${f1(100 - 68 * Math.cos(a))}">${k}</text>`;
  }
  return (
    '<circle cx="100" cy="100" r="96" class="ck-rim"/>' +
    `<path d="${minor}" class="ck-mi"/><path d="${major}" class="ck-ma"/><g class="ck-n">${nums}</g>`
  );
})();

function hand(angleDeg, len) {
  const a = (angleDeg * Math.PI) / 180;
  return `M100 100L${f1(100 + len * Math.sin(a))} ${f1(100 - len * Math.cos(a))}`;
}

function renderClock(p, key) {
  const time = `${p.h}:${String(p.m).padStart(2, '0')}`;
  let hands = '';
  if (p.mode === 'read' || key) {
    const cls = p.mode === 'draw' ? 'ck-h ka' : 'ck-h';
    hands =
      `<g class="${cls}"><path d="${hand(((p.h % 12) + p.m / 60) * 30, 38)}" class="ck-hh"/>` +
      `<path d="${hand(p.m * 6, 55)}" class="ck-mh"/></g>`;
  }
  const svg = `<svg viewBox="0 0 200 200" class="ckf" aria-hidden="true">${CLOCK_FACE}${hands}<circle cx="100" cy="100" r="5" class="ck-c"/></svg>`;
  let label;
  if (p.mode === 'read') {
    label = key
      ? `<span class="ckl"><span class="ka">${time}</span></span>`
      : '<span class="ckl"><span class="ckb"></span><span>:</span><span class="ckb"></span></span>';
  } else label = `<span class="ckl"><span class="ckt">${time}</span></span>`;
  return `<span class="ck">${svg}${label}</span>`;
}

function cellHtml(p, n, format, key, vmax, bw, uk) {
  const kind = kindOf(p, format);
  let body;
  if (kind === 'c') body = renderClock(p, key);
  else if (kind === 'v') body = renderVertical(p, key, vmax);
  else if (kind === 'd') body = renderLongDiv(p, key, uk);
  else body = renderLine(toLine(p), key, bw);
  return `<div class="pb pb-${kind}"><span class="pn">${n}.</span>${body}</div>`;
}

// Long titles get a smaller size so they fit next to the score box or answer-key badge.
function titleSize(title, key, themed) {
  const len = title.length + (key ? 12 : 8) + (themed ? 3 : 0);
  return len > 52 ? ' sh-title-xs' : len > 40 ? ' sh-title-s' : '';
}

// Renders every worksheet page followed by the matching answer-key pages.
export function renderSheets(problems, o) {
  const bw = sheetBlankWidth(problems, o.format);
  const plan = planLayout(problems, o.format, { ...o, bw });
  const pages = [];
  for (let i = 0; i < problems.length; i += plan.perPage) pages.push(problems.slice(i, i + plan.perPage));
  const total = pages.length;
  const vmax = { intLen: 0, fracLen: 0 };
  for (const p of problems) {
    if (kindOf(p, o.format) !== 'v') continue;
    const g = vGrid(p);
    vmax.intLen = Math.max(vmax.intLen, g.intLen);
    vmax.fracLen = Math.max(vmax.fracLen, g.fracLen);
  }
  const sheet = (list, pi, key) => {
    const fields =
      o.showName !== false && !key
        ? '<div class="sh-fields"><span>Name</span><span class="sh-line"></span><span>Date</span><span class="sh-line sh-short"></span></div>'
        : '';
    const badge = key ? '<span class="sh-badge">Answer key</span>' : '';
    const score = key ? '' : `<span class="sh-score">Score <span class="sh-line sh-tiny"></span> / ${list.length}</span>`;
    const cells = list.map((p, j) => cellHtml(p, pi * plan.perPage + j + 1, o.format, key, vmax, bw, o.uk)).join('');
    const pageNote = total > 1 ? ` &middot; Page ${pi + 1} of ${total}` : '';
    // Holiday sheets get a frame, an icon by the title and a row of pictures in the footer.
    // Classes go on .sh-in so the <section class="sheet"> markup stays the same for every sheet.
    const theme = THEMES[o.theme];
    const inCls = `sh-in${theme ? ` th th-${o.theme}` : ''}${o.uk ? ' sh-uk' : ''}`;
    const icon = theme ? `<span class="sh-ticon">${svgIcon(theme.icon)}</span>` : '';
    const art = theme ? `<div class="sh-art">${theme.strip.map((b) => svgIcon(b)).join('')}</div>` : '';
    return (
      `<section class="sheet${key ? ' is-key' : ''}"><div class="${inCls}">` +
      `<header class="sh-head">${fields}<div class="sh-titlebar"><h2 class="sh-title${titleSize(o.title, key, !!theme)}">${badge}${icon}${esc(o.title)}</h2>${score}</div>` +
      `<p class="sh-instr">${esc(o.instructions)}</p></header>` +
      `<div class="sh-grid sh-${o.format}" style="--cols:${plan.cols};--rows:${plan.rows};--fs:${plan.fs};--gy:${plan.rowGap}">${cells}</div>` +
      art +
      `<footer class="sh-foot"><span>${esc(o.site || '')}</span><span>Sheet ${esc(o.code || '')}${pageNote}</span></footer>` +
      '</div></section>'
    );
  };
  const html = pages.map((l, i) => sheet(l, i, false)).join('') + pages.map((l, i) => sheet(l, i, true)).join('');
  return { html, plan, pages: total };
}
