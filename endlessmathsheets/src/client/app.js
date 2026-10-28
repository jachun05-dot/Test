// Worksheet maker in the browser. The page ships with a pre-rendered sheet;
// this script regenerates it when the visitor changes an option.
import { makeWorksheet } from './engine/index.js';
import { randomSeed, seedToCode, codeToSeed } from './engine/rng.js';
import { PAPERS } from './engine/render.js';

const $ = (sel, root = document) => root.querySelector(sel);
const FORMAT_CODES = { vertical: 'v', horizontal: 'h', longdiv: 'l', clock: 'c' };
const FORMAT_FROM_CODE = Object.fromEntries(Object.entries(FORMAT_CODES).map(([k, v]) => [v, k]));

function readJson(id) {
  const el = document.getElementById(id);
  if (!el) return null;
  try {
    return JSON.parse(el.textContent);
  } catch {
    return null;
  }
}

function setPageSize(paper) {
  const style = document.getElementById('page-size');
  if (style) style.textContent = `@page{size:${(PAPERS[paper] || PAPERS.letter).css};margin:0.5in}`;
}

function initMaker(root, cfg) {
  const sheets = $('#sheets', root);
  const form = $('#opts', root);
  const codeEl = $('#sheet-code', root);
  const status = $('#status', root);

  const state = {
    seed: cfg.seed,
    count: cfg.count,
    format: cfg.format,
    title: '',
    key: true,
    name: true,
    paper: cfg.paper || 'letter',
    params: {},
  };

  // Restore from the URL (?s=CODE&n=20&f=v ...)
  const q = new URLSearchParams(location.search);
  const hadQuery = [...q.keys()].length > 0;
  if (q.has('s')) {
    const s = codeToSeed(q.get('s'));
    if (s !== null) state.seed = s;
  }
  if (q.has('n') && cfg.counts.includes(Number(q.get('n')))) state.count = Number(q.get('n'));
  if (q.has('f') && FORMAT_FROM_CODE[q.get('f')]) state.format = FORMAT_FROM_CODE[q.get('f')];
  if (q.has('t')) state.title = q.get('t').slice(0, 60);
  if (q.get('k') === '0') state.key = false;
  if (q.get('nm') === '0') state.name = false;
  if (q.get('p') === 'a4' || q.get('p') === 'letter') state.paper = q.get('p');
  for (const c of cfg.controls) {
    if (!q.has(c.id)) continue;
    const allowed = c.options.map(([v]) => String(v));
    if (c.type === 'chips') {
      const vals = q.get(c.id).split(',').filter((v) => allowed.includes(v)).map(Number);
      if (vals.length) state.params[c.id] = vals;
    } else if (allowed.includes(q.get(c.id))) {
      const opt = c.options.find(([v]) => String(v) === q.get(c.id))[0];
      state.params[c.id] = opt;
    }
  }

  function syncForm() {
    form.elements.count.value = String(state.count);
    if (form.elements.format) {
      for (const r of form.querySelectorAll('input[name="format"]')) r.checked = r.value === state.format;
    }
    form.elements.title.value = state.title || cfg.sheet;
    form.elements.key.checked = state.key;
    form.elements.name.checked = state.name;
    form.elements.paper.value = state.paper;
    for (const c of cfg.controls) {
      const v = state.params[c.id] ?? cfg.params[c.id];
      if (c.type === 'chips') {
        const set = new Set((v || []).map(String));
        for (const box of form.querySelectorAll(`input[name="${c.id}"]`)) box.checked = set.has(box.value);
      } else if (form.elements[c.id]) form.elements[c.id].value = String(v);
    }
  }

  function readForm(changed) {
    state.count = Number(form.elements.count.value);
    const fmt = form.querySelector('input[name="format"]:checked');
    if (fmt) state.format = fmt.value;
    const t = form.elements.title.value.trim();
    state.title = t && t !== cfg.sheet ? t : '';
    state.key = form.elements.key.checked;
    state.name = form.elements.name.checked;
    state.paper = form.elements.paper.value;
    for (const c of cfg.controls) {
      if (c.type === 'chips') {
        const boxes = [...form.querySelectorAll(`input[name="${c.id}"]`)];
        let vals = boxes.filter((b) => b.checked).map((b) => Number(b.value));
        if (!vals.length && changed && changed.name === c.id) {
          changed.checked = true; // keep at least one
          vals = [Number(changed.value)];
        }
        state.params[c.id] = vals;
      } else {
        const raw = form.elements[c.id].value;
        state.params[c.id] = c.options.find(([v]) => String(v) === raw)[0];
      }
    }
  }

  function writeUrl() {
    const p = new URLSearchParams();
    p.set('s', seedToCode(state.seed));
    if (state.count !== cfg.count) p.set('n', String(state.count));
    if (state.format !== cfg.format) p.set('f', FORMAT_CODES[state.format]);
    if (state.title) p.set('t', state.title);
    if (!state.key) p.set('k', '0');
    if (!state.name) p.set('nm', '0');
    if (state.paper !== (cfg.paper || 'letter')) p.set('p', state.paper);
    for (const c of cfg.controls) {
      const v = state.params[c.id];
      if (v === undefined) continue;
      const def = cfg.params[c.id];
      const same = Array.isArray(v) ? JSON.stringify(v) === JSON.stringify(def) : v === def;
      if (!same) p.set(c.id, Array.isArray(v) ? v.join(',') : String(v));
    }
    try {
      history.replaceState(null, '', `${location.pathname}?${p.toString()}`);
    } catch {
      /* some embedded viewers block history changes */
    }
  }

  function render() {
    const { html } = makeWorksheet(cfg, state);
    sheets.innerHTML = html;
    sheets.dataset.paper = state.paper;
    sheets.dataset.printKey = state.key ? '1' : '0';
    codeEl.textContent = seedToCode(state.seed);
    setPageSize(state.paper);
  }

  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('change', (e) => {
    readForm(e.target);
    render();
    writeUrl();
  });
  let typing;
  form.elements.title.addEventListener('input', () => {
    clearTimeout(typing);
    typing = setTimeout(() => {
      readForm();
      render();
      writeUrl();
    }, 250);
  });

  $('#btn-new', root).addEventListener('click', () => {
    state.seed = randomSeed();
    render();
    writeUrl();
  });
  const printBtn = $('#btn-print', root);
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  for (const b of root.querySelectorAll('.seg [data-view]')) {
    b.addEventListener('click', () => {
      sheets.dataset.view = b.dataset.view;
      for (const o of root.querySelectorAll('.seg [data-view]')) o.setAttribute('aria-pressed', String(o === b));
    });
  }

  $('#btn-link', root).addEventListener('click', async () => {
    writeUrl();
    try {
      await navigator.clipboard.writeText(location.href);
      status.textContent = 'Link copied';
    } catch {
      status.textContent = location.href;
    }
    setTimeout(() => {
      status.textContent = '';
    }, 4000);
  });

  syncForm();
  if (hadQuery) render();
}

function initDemo(box, cfg) {
  const sheets = $('#demo-sheets', box);
  $('#demo-new', box).addEventListener('click', () => {
    const { html } = makeWorksheet(cfg, { seed: randomSeed(), count: 20, format: 'vertical', params: {} });
    sheets.innerHTML = html.slice(0, html.indexOf('<section class="sheet is-key">'));
  });
}

const maker = document.getElementById('maker');
const cfg = readJson('ws-config');
if (maker && cfg) initMaker(maker, cfg);

const demo = document.querySelector('[data-demo]');
const demoCfg = readJson('demo-config');
if (demo && demoCfg) initDemo(demo, demoCfg);
