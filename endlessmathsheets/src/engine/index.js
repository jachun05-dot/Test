import { makeRng, seedToCode } from './rng.js';
import { GENERATORS } from './generators.js';
import { renderSheets } from './render.js';

export function formatsFor(cfg) {
  const gen = GENERATORS[cfg.gen];
  return cfg.formats || gen.formats;
}

export function instructionFor(cfg, params) {
  if (typeof cfg.instr === 'string') return cfg.instr;
  return cfg.instr.values[params[cfg.instr.by]] || cfg.instr.values.default;
}

// cfg: the page's worksheet definition. state: what the visitor picked.
export function makeWorksheet(cfg, state) {
  const params = { ...cfg.params, ...(state.params || {}) };
  const formats = formatsFor(cfg);
  const format = formats.includes(state.format) ? state.format : cfg.format || formats[0];
  const problems = GENERATORS[cfg.gen].generate(makeRng(state.seed), params, state.count);
  const layout = (cfg.layout && cfg.layout[format]) || {};
  return renderSheets(problems, {
    format,
    title: state.title || cfg.sheet,
    instructions: instructionFor(cfg, params),
    showName: state.name !== false,
    paper: state.paper || 'letter',
    code: seedToCode(state.seed),
    site: cfg.site,
    cols: layout.cols,
    rows: layout.rows,
  });
}
