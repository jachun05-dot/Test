// HTML templates for every page type. Pure functions: data in, HTML string out.
import { esc, toLine } from '../engine/render.js';
import { makeWorksheet, formatsFor } from '../engine/index.js';
import { hashString, seedToCode, makeRng } from '../engine/rng.js';
import { GENERATORS } from '../engine/generators.js';
import { CONTROLS, FORMAT_LABELS } from '../content/worksheets.js';

const FONTS =
  'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Lexend:wght@400;500;600&display=swap';

const gradeLabel = (g) => (g === 'K' ? 'K' : String(g));
export function gradeText(grades) {
  if (!grades.length) return '';
  const first = gradeLabel(grades[0]);
  const last = gradeLabel(grades[grades.length - 1]);
  if (grades.length === 1) return grades[0] === 'K' ? 'Kindergarten' : `Grade ${first}`;
  return `Grades ${first}–${last}`;
}

// ---------- links ----------

// In preview builds every link is relative and points at index.html files,
// so the site works from any folder. In production, links are root-relative.
export function linker(currentPath, preview) {
  const depth = currentPath.split('/').filter(Boolean).length;
  return (target) => {
    if (!preview) return target;
    const [path, hash = ''] = target.split('#');
    const up = '../'.repeat(depth);
    let rel = up + path.replace(/^\//, '');
    if (rel === '' || rel.endsWith('/')) rel += 'index.html';
    return rel + (hash ? `#${hash}` : '');
  };
}

// ---------- shared chrome ----------

const LOGO = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><rect x="9" y="4" width="25" height="31" rx="3" class="lm-back"/><rect x="5" y="8" width="25" height="31" rx="3" class="lm-front"/><path d="M10 17h15M10 23h15M10 29h9" class="lm-rule"/><path d="M8.5 8v31" class="lm-margin"/></svg>`;

function header(ctx) {
  const L = ctx.link;
  const nav = [
    ['/addition/', 'Addition'],
    ['/subtraction/', 'Subtraction'],
    ['/multiplication/', 'Multiplication'],
    ['/division/', 'Division'],
    ['/fractions/', 'Fractions'],
    ['/#topics', 'All topics'],
  ];
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap head-in">
<a class="brand" href="${L('/')}">${LOGO}<span>Endless Math Sheets</span></a>
<nav class="nav" aria-label="Topics"><ul>${nav.map(([h, t]) => `<li><a href="${L(h)}"${ctx.section && h === `/${ctx.section}/` ? ' aria-current="true"' : ''}>${t}</a></li>`).join('')}</ul></nav>
</div></header>`;
}

function footer(ctx) {
  const L = ctx.link;
  const cats = ctx.categories.map((c) => `<li><a href="${L(`/${c.slug}/`)}">${esc(c.name)}</a></li>`).join('');
  const grades = ctx.grades.map((g) => `<li><a href="${L(`/${g.slug}/`)}">${esc(g.name)}</a></li>`).join('');
  return `<footer class="site-footer"><div class="wrap foot-in">
<div class="foot-brand"><a class="brand" href="${L('/')}">${LOGO}<span>Endless Math Sheets</span></a>
<p>Free printable math worksheets with answer keys. A new set of problems every time you click.</p></div>
<nav aria-label="Topics"><h2>Topics</h2><ul>${cats}</ul></nav>
<nav aria-label="Grades"><h2>Grades</h2><ul>${grades}</ul></nav>
<nav aria-label="Site"><h2>Site</h2><ul><li><a href="${L('/about/')}">About</a></li><li><a href="${L('/contact/')}">Contact</a></li><li><a href="${L('/privacy/')}">Privacy</a></li><li><a href="${L('/terms/')}">Terms</a></li></ul></nav>
</div><div class="wrap foot-legal"><p>&copy; ${ctx.year} Endless Math Sheets. Free for home and classroom use. Common Core State Standards codes are shown for reference only.</p></div></footer>`;
}

function crumbs(ctx, items) {
  const L = ctx.link;
  const parts = items.map(([href, name], i) =>
    i === items.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${L(href)}">${esc(name)}</a></li>`,
  );
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${parts.join('')}</ol></nav>`;
}

function breadcrumbLd(ctx, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: ctx.site.url + href })),
  };
}

function adSlot(ctx, name) {
  const a = ctx.site.adsense;
  if (!a.client || !a.slots[name]) return '';
  return `<div class="ad ad-${name}" aria-label="Advertisement"><ins class="adsbygoogle" style="display:block" data-ad-client="${esc(a.client)}" data-ad-slot="${esc(a.slots[name])}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;
}

// Production self-hosts the fonts (see fonts.css). The preview build uses Google Fonts,
// the only font host the preview sandbox allows.
function fontLinks(ctx) {
  if (ctx.preview) {
    return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">`;
  }
  return ctx.preloadFonts.map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin>`).join('\n');
}

const jsonScript = (id, data) =>
  `<script type="application/json" id="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

// Full page. In preview mode the home page drops its document wrapper, because
// the artifact host adds its own.
export function page(ctx, { title, description, path, main, jsonld = [], scripts = '', bare = false, bodyClass = '' }) {
  const L = ctx.link;
  const canonical = ctx.site.url + path;
  const ads = ctx.site.adsense.client
    ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(ctx.site.adsense.client)}" crossorigin="anonymous"></script>`
    : '';
  const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Endless Math Sheets">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ctx.site.url}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1f4fbf">
<link rel="icon" href="${L('/favicon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${L('/apple-touch-icon.png')}">
${fontLinks(ctx)}
<link rel="stylesheet" href="${L('/assets/site.css')}?v=${ctx.version}">
<style id="page-size">@page{size:letter;margin:0.5in}</style>
${jsonld.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('\n')}
${ads}`;
  const body = `${header(ctx)}
${main}
${footer(ctx)}
${scripts}`;
  if (bare) return `${head}\n<meta name="claude:viewport-fit-sides" content="cover">\n<div class="${bodyClass || 'page'}">\n${body}\n</div>\n`;
  return `<!doctype html>
<html lang="en">
<head>
${head}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
</body>
</html>
`;
}

// ---------- worksheet helpers ----------

export function defaultSeed(ws) {
  return hashString(ws.slug) % 2176782336;
}

export function worksheetConfig(ws, site) {
  return {
    slug: ws.slug,
    gen: ws.gen,
    params: ws.params,
    format: ws.format,
    formats: ws.formats,
    layout: ws.layout,
    count: ws.count,
    counts: ws.counts,
    sheet: ws.sheet,
    instr: ws.instr,
    site: site.domain,
    controls: ws.controls.map((id) => CONTROLS[id]),
    seed: defaultSeed(ws),
  };
}

function exampleText(ws) {
  const p = GENERATORS[ws.gen].generate(makeRng(defaultSeed(ws) + 7), ws.params, 1)[0];
  if (!p) return '';
  if (p.type === 'clock') return `${p.h}:${String(p.m).padStart(2, '0')}`;
  const parts = toLine(p);
  // A blank before "=" is a missing-number problem: show the whole sentence with "?".
  const eqAt = parts.findIndex((t) => t.v === '=');
  const missing = parts.some((t, i) => t.t === 'b' && i < eqAt);
  const out = [];
  for (const t of parts) {
    if (t.t === 'b' && (t.s === 'circle' || missing)) out.push('?');
    else if (t.t === 'b') break;
    else if (!missing && (t.v === '=' || t.v === '\u2192')) break;
    else if (t.t === 'f') {
      const part = (x) => (typeof x === 'object' ? '?' : x);
      out.push(`${t.w ? `${t.w} ` : ''}${part(t.n)}/${part(t.d)}`);
    } else if (t.t === 'p') out.push(`${t.b}^${t.e}`);
    else if (t.t === 's') out[out.length - 1] += `^${t.v}`;
    else if (t.t !== 'x') out.push(t.v);
  }
  return out.join(' ').replace(/\( /g, '(').replace(/ \)/g, ')').replace(/\^(\d)/g, (m, d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
}

function card(ctx, ws, { showCat = false } = {}) {
  const L = ctx.link;
  const cat = ctx.catBySlug[ws.cat];
  return `<li><a class="card" href="${L(`/${ws.slug}/`)}">
<span class="card-title">${esc(showCat ? ws.title.replace(/ Worksheets.*$/, '') : ws.card)}</span>
<span class="card-ex" aria-hidden="true">${esc(exampleText(ws))}</span>
<span class="card-meta">${esc(gradeText(ws.grades))}${showCat ? ` · ${esc(cat.name)}` : ''}</span>
</a></li>`;
}

function metaDescription(ws) {
  const base = `Free printable ${ws.title.replace(/ Worksheets/, ' worksheets').replace(/^./, (c) => c.toLowerCase())} with answer keys. ${ws.onSheet}`;
  if (base.length <= 160) return base;
  const cut = base.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function controlField(spec, value) {
  const name = spec.id;
  if (spec.type === 'chips') {
    const chosen = new Set((value || []).map(String));
    return `<fieldset class="field"><legend>${esc(spec.label)}</legend><div class="chips">${spec.options
      .map(([v, label]) => `<label class="chip"><input type="checkbox" name="${name}" value="${v}"${chosen.has(String(v)) ? ' checked' : ''}><span>${esc(label)}</span></label>`)
      .join('')}</div></fieldset>`;
  }
  return `<div class="field"><label for="o-${name}">${esc(spec.label)}</label><select id="o-${name}" name="${name}">${spec.options
    .map(([v, label]) => `<option value="${v}"${String(v) === String(value) ? ' selected' : ''}>${esc(label)}</option>`)
    .join('')}</select></div>`;
}

function optionsForm(ws, cfg, preview) {
  const formats = formatsFor(cfg);
  const fields = [];
  fields.push(`<div class="field"><label for="o-title">Title on the sheet</label><input id="o-title" name="title" type="text" maxlength="60" value="${esc(ws.sheet)}"></div>`);
  fields.push(`<div class="field"><label for="o-count">Problems</label><select id="o-count" name="count">${ws.counts
    .map((n) => `<option value="${n}"${n === ws.count ? ' selected' : ''}>${n}</option>`)
    .join('')}</select></div>`);
  if (formats.length > 1) {
    fields.push(`<fieldset class="field"><legend>Layout</legend><div class="seg-radio">${formats
      .map((f) => `<label><input type="radio" name="format" value="${f}"${f === ws.format ? ' checked' : ''}><span>${FORMAT_LABELS[f]}</span></label>`)
      .join('')}</div></fieldset>`);
  }
  for (const id of ws.controls) fields.push(controlField(CONTROLS[id], ws.params[CONTROLS[id].id]));
  fields.push(`<div class="field"><label for="o-paper">Paper</label><select id="o-paper" name="paper"><option value="letter" selected>US Letter</option><option value="a4">A4</option></select></div>`);
  fields.push(`<div class="field checks"><label class="check"><input type="checkbox" name="key" id="o-key" checked><span>Print the answer key</span></label><label class="check"><input type="checkbox" name="name" id="o-name" checked><span>Name and date line</span></label></div>`);
  fields.push(`<div class="field code"><span>Sheet code <b id="sheet-code">${seedToCode(cfg.seed)}</b></span><button type="button" class="link-btn" id="btn-link">Copy link to this sheet</button><span class="status" id="status" role="status" aria-live="polite"></span></div>`);
  return `<form id="opts" class="opts-form" autocomplete="off">${fields.join('')}</form>`;
}

export function worksheetPage(ctx, ws) {
  const L = ctx.link;
  const cat = ctx.catBySlug[ws.cat];
  const cfg = worksheetConfig(ws, ctx.site);
  const path = `/${ws.slug}/`;
  const { html } = makeWorksheet(cfg, { seed: cfg.seed, count: ws.count, format: ws.format, params: {} });
  const crumbItems = [['/', 'Home'], [`/${cat.slug}/`, cat.name], [path, ws.card]];
  const stdText = ws.std.join(', ');
  const related = ctx.worksheets.filter((w) => w.cat === ws.cat && w.slug !== ws.slug);
  const idx = ctx.worksheets.filter((w) => w.cat === ws.cat).indexOf(ws);
  const siblings = ctx.worksheets.filter((w) => w.cat === ws.cat);
  const near = [siblings[idx - 1], siblings[idx + 1]].filter(Boolean);
  const relatedList = [...near, ...related.filter((w) => !near.includes(w))].slice(0, 8);
  const printBtn = ctx.preview
    ? '<span class="preview-note">Printing works on the live site</span>'
    : '<button type="button" class="btn btn-primary" id="btn-print"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/></svg>Print</button>';
  const main = `<main id="main" class="wrap ws-page">
${crumbs(ctx, crumbItems)}
<header class="ws-head">
<h1>${esc(ws.title)}</h1>
<p class="lede">${esc(ws.intro)}</p>
<ul class="chips-static"><li>${esc(gradeText(ws.grades))}</li><li>Common Core ${esc(stdText)}</li><li>Answer key included</li></ul>
</header>
${adSlot(ctx, 'top')}
<section class="gen" id="maker" aria-label="Worksheet maker">
<div class="gen-bar">
<button type="button" class="btn" id="btn-new"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>New worksheet</button>
${printBtn}
<div class="seg" role="group" aria-label="Show on screen"><button type="button" data-view="sheet" aria-pressed="true">Worksheet</button><button type="button" data-view="key" aria-pressed="false">Answer key</button></div>
</div>
<div class="gen-body">
<details class="opts" open><summary>Customize</summary>${optionsForm(ws, cfg, ctx.preview)}</details>
<div class="stage"><div class="sheets" id="sheets" data-view="sheet" data-paper="letter" data-print-key="1">${html}</div></div>
</div>
</section>
<div class="ws-below">
<article class="prose">
<h2>What's on this worksheet</h2>
<p>${esc(ws.onSheet)} Each sheet comes with an answer key on a separate page.</p>
<h2>Teaching tips</h2>
<ul>${ws.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
<h2>How to use this worksheet maker</h2>
<p>Press <b>New worksheet</b> for a fresh set of problems, then <b>Print</b>. To save a PDF instead, choose "Save as PDF" in the print window. Every sheet has a short code in the bottom corner. Copy the link to a sheet and you can print exactly the same problems again later, which is handy for retakes and for sharing with other teachers.</p>
<p class="std">Common Core alignment: <b>${esc(stdText)}</b> (${esc(gradeText(ws.grades))}).</p>
</article>
${adSlot(ctx, 'bottom')}
<section class="related" aria-labelledby="rel-h"><h2 id="rel-h">More ${esc(cat.name.toLowerCase())} worksheets</h2><ul class="cards">${relatedList.map((w) => card(ctx, w)).join('')}</ul>
<p class="more"><a href="${L(`/${cat.slug}/`)}">All ${esc(cat.name.toLowerCase())} worksheets</a></p></section>
</div>
</main>`;
  const jsonld = [
    breadcrumbLd(ctx, crumbItems),
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: ws.title,
      description: ws.intro,
      url: ctx.site.url + path,
      learningResourceType: 'Worksheet',
      isAccessibleForFree: true,
      educationalLevel: gradeText(ws.grades),
      inLanguage: 'en',
      educationalAlignment: ws.std.map((s) => ({
        '@type': 'AlignmentObject',
        alignmentType: 'teaches',
        educationalFramework: 'Common Core State Standards',
        targetName: s,
      })),
    },
  ];
  const scripts = `${jsonScript('ws-config', cfg)}\n<script type="module" src="${L('/assets/js/app.js')}?v=${ctx.version}"></script>`;
  return page(ctx, {
    title: `${ws.title} (Free, Printable)`,
    description: metaDescription(ws),
    path,
    main,
    jsonld,
    scripts,
    bodyClass: 'has-maker',
  });
}

// ---------- hubs ----------

export function categoryPage(ctx, cat) {
  const path = `/${cat.slug}/`;
  const list = ctx.worksheets.filter((w) => w.cat === cat.slug);
  const crumbItems = [['/', 'Home'], [path, cat.name]];
  const groups = cat.groups
    .map((g) => {
      const items = list.filter((w) => w.group === g);
      if (!items.length) return '';
      const heading = cat.groups.length > 1 ? `<h2>${esc(g)}</h2>` : '';
      return `<section class="ws-group">${heading}<ul class="cards">${items.map((w) => card(ctx, w)).join('')}</ul></section>`;
    })
    .join('');
  const main = `<main id="main" class="wrap hub">
${crumbs(ctx, crumbItems)}
<header class="hub-head"><h1>${esc(cat.title)}</h1><p class="lede">${esc(cat.lede)}</p><p class="count">${list.length} worksheet makers · answer keys included · no sign-up</p></header>
${groups}
${adSlot(ctx, 'bottom')}
<div class="hub-guide">
<article class="prose"><h2>Teaching ${esc(cat.name.toLowerCase())}, step by step</h2>${cat.guide.map((p) => `<p>${esc(p)}</p>`).join('')}</article>
<section class="faq prose" aria-labelledby="faq-h"><h2 id="faq-h">Questions</h2>${cat.faq.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('')}</section>
</div>
</main>`;
  const jsonld = [
    breadcrumbLd(ctx, crumbItems),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: cat.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
  return page(ctx, {
    title: `${cat.title} (Free, Printable)`,
    description: `${cat.title.replace(' Worksheets', ' worksheets')}: ${list.length} free printable worksheet makers with answer keys. ${cat.lede}`.slice(0, 160),
    path,
    main,
    jsonld,
  });
}

export function gradePage(ctx, grade) {
  const path = `/${grade.slug}/`;
  const list = ctx.worksheets.filter((w) => w.grades.includes(grade.key));
  const crumbItems = [['/', 'Home'], [path, grade.title.replace(' Worksheets', '')]];
  const byCat = ctx.categories
    .map((c) => {
      const items = list.filter((w) => w.cat === c.slug);
      if (!items.length) return '';
      return `<section class="ws-group"><h2>${esc(c.name)}</h2><ul class="cards">${items.map((w) => card(ctx, w)).join('')}</ul></section>`;
    })
    .join('');
  const others = ctx.grades
    .filter((g) => g.key !== grade.key)
    .map((g) => `<li><a href="${ctx.link(`/${g.slug}/`)}">${esc(g.name)}</a></li>`)
    .join('');
  const main = `<main id="main" class="wrap hub">
${crumbs(ctx, crumbItems)}
<header class="hub-head"><h1>${esc(grade.title)}</h1><p class="lede">${esc(grade.intro)}</p><p class="count">${list.length} worksheet makers for ${esc(grade.name.toLowerCase())}</p></header>
${byCat}
${adSlot(ctx, 'bottom')}
<nav class="grade-strip" aria-label="Other grades"><h2>Other grades</h2><ul>${others}</ul></nav>
</main>`;
  return page(ctx, {
    title: `${grade.title} (Free, Printable)`,
    description: `Free printable ${grade.name.toLowerCase()} math worksheets with answer keys: ${list.length} worksheet makers that create a new set of problems every time.`,
    path,
    main,
    jsonld: [breadcrumbLd(ctx, crumbItems)],
  });
}

// ---------- home ----------

export function homePage(ctx) {
  const L = ctx.link;
  const demoWs = ctx.worksheets.find((w) => w.slug === 'addition/2-digit-with-regrouping');
  const demoCfg = { ...worksheetConfig(demoWs, ctx.site) };
  const demo = makeWorksheet(demoCfg, { seed: demoCfg.seed, count: 20, format: 'vertical', params: {} });
  const firstSheet = demo.html.slice(0, demo.html.indexOf('<section class="sheet is-key">'));
  const topicTiles = ctx.categories
    .map((c) => {
      const list = ctx.worksheets.filter((w) => w.cat === c.slug);
      const ex = exampleText(list.find((w) => w.slug === c.tile) || list[0]);
      return `<li><a class="tile" href="${L(`/${c.slug}/`)}"><span class="tile-name">${esc(c.name)}</span><span class="tile-ex" aria-hidden="true">${esc(ex)}</span><span class="tile-count">${list.length} worksheets</span></a></li>`;
    })
    .join('');
  const gradeLinks = ctx.grades
    .map((g) => `<li><a class="grade-btn" href="${L(`/${g.slug}/`)}"><span class="g-num">${esc(g.short)}</span><span>${esc(g.name)}</span></a></li>`)
    .join('');
  const popularSlugs = [
    'multiplication/facts-0-12',
    'addition/2-digit-with-regrouping',
    'subtraction/3-digit-with-regrouping',
    'division/long-division-3-digit-by-1-digit',
    'multiplication/7-times-table',
    'fractions/adding-unlike-denominators',
    'telling-time/5-minutes',
    'multiplication/100-facts-timed-test',
  ];
  const popular = popularSlugs.map((s) => ctx.worksheets.find((w) => w.slug === s)).filter(Boolean);
  const main = `<main id="main">
<section class="hero"><div class="wrap hero-in">
<div class="hero-copy">
<p class="eyebrow">Free printable math worksheets</p>
<h1>A new worksheet <mark>every time</mark> you click.</h1>
<p class="lede">${ctx.worksheets.length} worksheet makers from kindergarten to 7th grade. Pick a skill, choose how many problems, and print it with an answer key. No sign-up, no limits.</p>
<div class="hero-cta"><a class="btn btn-primary" href="#topics">Browse topics</a><a class="btn" href="${L('/multiplication/facts-0-10/')}">Multiplication facts</a></div>
</div>
<div class="hero-demo" data-demo>
<div class="demo-bar"><span class="demo-label">Live example: 2-digit addition</span><button type="button" class="btn btn-small" id="demo-new">New problems</button></div>
<div class="sheets demo-sheets" id="demo-sheets" data-view="sheet" data-paper="letter">${firstSheet}</div>
${jsonScript('demo-config', demoCfg)}
</div>
</div></section>
<section class="wrap home-sec" id="topics" aria-labelledby="topics-h"><h2 id="topics-h">Topics</h2><ul class="tiles">${topicTiles}</ul></section>
<section class="wrap home-sec" aria-labelledby="grades-h"><h2 id="grades-h">Worksheets by grade</h2><ul class="grade-row">${gradeLinks}</ul></section>
<section class="wrap home-sec features" aria-labelledby="why-h"><h2 id="why-h">Made for printing</h2>
<ul class="feature-list">
<li><h3>Never the same sheet twice</h3><p>Every click makes a new set of problems that follows the skill exactly, such as two-digit addition where every problem needs regrouping.</p></li>
<li><h3>Answer key on its own page</h3><p>The key prints after the worksheet, so you can hand out the problems and keep the answers.</p></li>
<li><h3>Letter or A4, any number of problems</h3><p>Choose the paper size and the number of problems. Spacing and font size adjust so every page stays easy to read.</p></li>
<li><h3>Reprint any sheet</h3><p>Each sheet has a short code. Save the link and print the same problems again for a retake or another class.</p></li>
</ul></section>
<section class="wrap home-sec" aria-labelledby="pop-h"><h2 id="pop-h">Popular worksheets</h2><ul class="cards">${popular.map((w) => card(ctx, w, { showCat: true })).join('')}</ul></section>
</main>`;
  const jsonld = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Endless Math Sheets', url: `${ctx.site.url}/` },
  ];
  const scripts = `<script type="module" src="${L('/assets/js/app.js')}?v=${ctx.version}"></script>`;
  return page(ctx, {
    title: 'Endless Math Sheets: Free Printable Math Worksheets With Answer Keys',
    description: `Free printable math worksheets for kindergarten to 7th grade. ${ctx.worksheets.length} worksheet makers create a new sheet every click, each with an answer key.`,
    path: '/',
    main,
    jsonld,
    scripts,
    bare: ctx.preview,
  });
}

// ---------- simple pages ----------

export function textPage(ctx, { path, title, heading, description, body }) {
  const main = `<main id="main" class="wrap text-page"><article class="prose"><h1>${esc(heading)}</h1>${body}</article></main>`;
  return page(ctx, { title, description, path, main });
}

export function notFoundPage(ctx) {
  const L = ctx.link;
  const main = `<main id="main" class="wrap text-page"><article class="prose"><h1>That page isn't here</h1><p>The link may be old or mistyped. Try one of these instead:</p><ul>${ctx.categories
    .map((c) => `<li><a href="${L(`/${c.slug}/`)}">${esc(c.title)}</a></li>`)
    .join('')}</ul></article></main>`;
  return page(ctx, { title: 'Page not found | Endless Math Sheets', description: 'This page could not be found.', path: '/404', main });
}
