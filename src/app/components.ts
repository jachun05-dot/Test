import {
  ATWATER,
  MINERAL_KEYS,
  NUTRIENTS,
  dmPercent,
  dmPpm,
  energyPercent,
  per100kcal,
  type NutrientKey,
  type Profile,
  type Range,
  type Report,
  type RuleResult,
  type Status,
} from '../nutrition/index.js';
import { fmt, h } from './dom.js';

export function rangeText(range: Range): string {
  const { min, max } = range;
  if (min !== undefined && max !== undefined) return `${fmt(min, 2)}–${fmt(max, 2)}`;
  if (min !== undefined) return `${fmt(min, 2)} 이상`;
  if (max !== undefined) return `${fmt(max, 2)} 이하`;
  return '—';
}

export function statusLabel(result: RuleResult): string {
  const [up, down] = result.rule.metric.type === 'kcalVsTarget' ? ['많음', '적음'] : ['높음', '낮음'];
  switch (result.status) {
    case 'good':
      return '적정';
    case 'caution':
      return result.direction === 'high' ? `조금 ${up}` : `조금 ${down}`;
    case 'bad':
      return result.direction === 'high' ? up : down;
    case 'unknown':
      return '정보 없음';
  }
}

export function pill(status: Status, label: string): HTMLElement {
  return h('span', { class: `pill pill-${status}` }, h('span', { class: 'dot', 'aria-hidden': 'true' }), label);
}

export function valueDigits(value: number): number {
  const abs = Math.abs(value);
  return abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
}

function resultRow(result: RuleResult): HTMLElement {
  return h(
    'tr',
    null,
    h('th', { scope: 'row' }, h('span', { class: 'rule-label' }, result.rule.label), h('span', { class: 'rule-why' }, result.rule.why)),
    h(
      'td',
      { class: 'num' },
      result.value === undefined ? '—' : fmt(result.value, valueDigits(result.value)),
      h('span', { class: 'unit' }, ` ${result.unit}`),
    ),
    h('td', { class: 'num range' }, rangeText(result.rule.good)),
    h('td', { class: 'status-cell' }, pill(result.status, statusLabel(result))),
  );
}

export function reportView(report: Report, opts: { showNotes?: boolean } = {}): HTMLElement {
  const showNotes = opts.showNotes ?? true;
  const all = report.sections.flatMap((s) => s.results);
  const count = (status: Status) => all.filter((r) => r.status === status).length;

  return h(
    'div',
    { class: 'report' },
    h(
      'div',
      { class: 'report-summary' },
      pill('good', `적정 ${count('good')}`),
      pill('caution', `주의 ${count('caution')}`),
      pill('bad', `벗어남 ${count('bad')}`),
      count('unknown') > 0 && pill('unknown', `정보 없음 ${count('unknown')}`),
    ),
    report.conflicts.length > 0 &&
      h(
        'div',
        { class: 'callout callout-caution', role: 'note' },
        h('strong', null, '질환 간 권장 사항이 서로 다릅니다'),
        h('ul', null, report.conflicts.map((c) => h('li', null, c))),
      ),
    report.sections.map((section) =>
      section.results.length === 0 && !showNotes
        ? null
        : h(
            'section',
            { class: 'cond' },
            h(
              'header',
              { class: 'cond-head' },
              h('h3', null, section.name),
              section.variantLabel && h('span', { class: 'chip' }, section.variantLabel),
            ),
            h('p', { class: 'cond-summary' }, section.summary),
            section.results.length > 0 &&
              h(
                'div',
                { class: 'table-wrap' },
                h(
                  'table',
                  { class: 'result-table' },
                  h('thead', null, h('tr', null, h('th', { scope: 'col' }, '항목'), h('th', { scope: 'col', class: 'num' }, '현재'), h('th', { scope: 'col', class: 'num' }, '권장'), h('th', { scope: 'col' }, '판정'))),
                  h('tbody', null, section.results.map(resultRow)),
                ),
              ),
            showNotes && section.notes.length > 0 && h('ul', { class: 'notes' }, section.notes.map((n) => h('li', null, n))),
            showNotes && h('p', { class: 'sources' }, '근거: ', section.sources.join(' · ')),
          ),
    ),
  );
}

export function energySplit(p: Profile): HTMLElement {
  const parts = (['protein', 'fat', 'carb'] as const).map((macro) => ({
    macro,
    pct: energyPercent(p, macro) ?? 0,
  }));
  return h(
    'figure',
    { class: 'split' },
    h('figcaption', null, '칼로리 구성'),
    h(
      'div',
      { class: 'split-bar', role: 'img', 'aria-label': parts.map((x) => `${NUTRIENTS[x.macro].label} ${fmt(x.pct, 0)}%`).join(', ') },
      parts.map((x) => h('span', { class: `seg seg-${x.macro}`, style: `width:${x.pct}%` })),
    ),
    h(
      'ul',
      { class: 'split-legend' },
      parts.map((x) =>
        h('li', null, h('span', { class: `swatch seg-${x.macro}`, 'aria-hidden': 'true' }), `${NUTRIENTS[x.macro].label} `, h('b', { class: 'num' }, `${fmt(x.pct, 0)}%`)),
      ),
    ),
  );
}

/** Per-nutrient table: as fed, dry matter, per 100 kcal. */
export function nutrientTable(p: Profile): HTMLElement {
  const keys: NutrientKey[] = ['protein', 'fat', 'carb', 'fiber', 'ash', ...MINERAL_KEYS];
  const scale = 100 / p.grams;
  const rows = keys
    .filter((key) => p.nutrients[key] !== undefined)
    .map((key) => {
      const meta = NUTRIENTS[key];
      const grams = p.nutrients[key]! * scale;
      const asFed = meta.labelUnit === 'mg/kg' ? grams * 1e4 : grams;
      const dm = meta.labelUnit === 'mg/kg' ? dmPpm(p, key) : dmPercent(p, key);
      const perKcal = per100kcal(p, key);
      return h(
        'tr',
        null,
        h('th', { scope: 'row' }, meta.label, key === 'carb' && p.estimated.carb && h('span', { class: 'tag' }, '추정'), key === 'ash' && p.estimated.ash && h('span', { class: 'tag' }, '추정')),
        h('td', { class: 'num' }, fmt(asFed, 2), h('span', { class: 'unit' }, ` ${meta.labelUnit}`)),
        h('td', { class: 'num' }, fmt(dm, 2), h('span', { class: 'unit' }, meta.labelUnit === 'mg/kg' ? ' mg/kg' : ' %')),
        h('td', { class: 'num' }, perKcal === undefined ? '—' : fmt(perKcal, valueDigits(perKcal)), h('span', { class: 'unit' }, ` ${meta.unit}`)),
      );
    });

  return h(
    'div',
    { class: 'table-wrap' },
    h(
      'table',
      { class: 'data-table' },
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, '성분'), h('th', { scope: 'col', class: 'num' }, '성분표(급여 상태)'), h('th', { scope: 'col', class: 'num' }, '건물 기준'), h('th', { scope: 'col', class: 'num' }, '100kcal당'))),
      h('tbody', null, rows),
    ),
  );
}

export function estimateNotes(p: Profile): HTMLElement | null {
  const notes: string[] = [];
  if (p.estimated.kcal) notes.push(`칼로리가 표기되지 않아 성분으로 추정했습니다 (단백질·탄수화물 ${ATWATER.protein}, 지방 ${ATWATER.fat} kcal/g).`);
  if (p.estimated.carb) notes.push('탄수화물은 100%에서 나머지 성분을 빼서 추정했습니다.');
  if (p.estimated.ash) notes.push('회분이 표기되지 않아 일반적인 값(건식 7%, 습식 2%)으로 가정했습니다.');
  notes.push(...p.warnings);
  return notes.length ? h('ul', { class: 'fine-print' }, notes.map((n) => h('li', null, n))) : null;
}

export function emptyState(title: string, body: string, action?: HTMLElement): HTMLElement {
  return h('div', { class: 'empty' }, h('h2', null, title), h('p', null, body), action);
}

export function stat(label: string, value: string, unit: string, tag?: string): HTMLElement {
  return h(
    'div',
    { class: 'stat' },
    h('span', { class: 'stat-label' }, label, tag && h('span', { class: 'tag' }, tag)),
    h('span', { class: 'stat-value num' }, value, h('span', { class: 'unit' }, ` ${unit}`)),
  );
}
