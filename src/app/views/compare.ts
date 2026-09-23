import {
  buildReport,
  foodProfile,
  metricKey,
  metricUnit,
  metricValue,
  type Metric,
  type Status,
} from '../../nutrition/index.js';
import { emptyState, valueDigits } from '../components.js';
import type { App } from '../context.js';
import { fmt, h } from '../dom.js';

let selected: Set<string> | undefined;

interface Row {
  label: string;
  metric?: Metric;
  value?: (p: ReturnType<typeof foodProfile>) => number | undefined;
  unit?: string;
}

const ROWS: Row[] = [
  { label: '칼로리', value: (p) => p.kcal, unit: 'kcal/100g' },
  { label: '수분', metric: { type: 'moisture' } },
  { label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' } },
  { label: '지방', metric: { type: 'per100kcal', nutrient: 'fat' } },
  { label: '탄수화물', metric: { type: 'per100kcal', nutrient: 'carb' } },
  { label: '단백질 칼로리 비율', metric: { type: 'energyPct', macro: 'protein' } },
  { label: '탄수화물 칼로리 비율', metric: { type: 'energyPct', macro: 'carb' } },
  { label: '인', metric: { type: 'per100kcal', nutrient: 'phosphorus' } },
  { label: '칼슘', metric: { type: 'per100kcal', nutrient: 'calcium' } },
  { label: '칼슘:인 비율', metric: { type: 'caP' } },
  { label: '마그네슘', metric: { type: 'per100kcal', nutrient: 'magnesium' } },
  { label: '나트륨', metric: { type: 'per100kcal', nutrient: 'sodium' } },
  { label: '칼륨', metric: { type: 'per100kcal', nutrient: 'potassium' } },
  { label: '타우린', metric: { type: 'per100kcal', nutrient: 'taurine' } },
  { label: '요오드 (건물 기준)', metric: { type: 'dmPpm', nutrient: 'iodine' } },
];

const STATUS_TEXT: Record<Status, string> = { good: '적정', caution: '주의', bad: '벗어남', unknown: '' };

export function compareView(app: App): HTMLElement {
  const { foods } = app.state;
  if (foods.length === 0) {
    return emptyState('비교할 사료가 없어요', '사료를 두 개 이상 등록하면 나란히 비교할 수 있어요.',
      h('button', { type: 'button', class: 'btn btn-primary', on: { click: () => app.go('foods') } }, '사료 등록하기'));
  }
  selected ??= new Set(foods.map((f) => f.id));
  for (const id of selected) if (!foods.some((f) => f.id === id)) selected.delete(id);

  const cat = app.activeCat();
  const chosen = foods.filter((f) => selected!.has(f.id));
  const columns = chosen.map((food) => {
    const p = foodProfile(food);
    const report = buildReport(cat?.conditions ?? [], p, {});
    const statusByMetric = new Map<string, Status>();
    for (const section of report.sections) {
      for (const r of section.results) statusByMetric.set(metricKey(r.rule.metric), r.status);
    }
    return { food, p, statusByMetric };
  });

  const picker = h(
    'fieldset',
    { class: 'picker' },
    h('legend', null, '비교할 사료'),
    foods.map((food) => {
      const box = h('input', { id: `cmp-${food.id}`, type: 'checkbox', checked: selected!.has(food.id) });
      box.addEventListener('change', () => {
        if (box.checked) selected!.add(food.id);
        else selected!.delete(food.id);
        app.rerender();
      });
      return h('div', { class: 'field-check' }, box, h('label', { for: box.id }, food.name));
    }),
  );

  const table = h(
    'div',
    { class: 'table-wrap' },
    h(
      'table',
      { class: 'compare-table' },
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, '100kcal당'), columns.map((c) => h('th', { scope: 'col', class: 'num' }, c.food.name)))),
      h(
        'tbody',
        null,
        ROWS.map((row) => {
          const unit = row.unit ?? (row.metric ? metricUnit(row.metric) : '');
          return h(
            'tr',
            null,
            h('th', { scope: 'row' }, row.label, h('span', { class: 'unit' }, ` ${unit}`)),
            columns.map((c) => {
              const value = row.metric ? metricValue(c.p, row.metric, {}) : row.value!(c.p);
              const status = row.metric ? c.statusByMetric.get(metricKey(row.metric)) : undefined;
              return h(
                'td',
                { class: `num${status ? ` cell-${status}` : ''}`, title: status ? STATUS_TEXT[status] : undefined },
                value === undefined ? '—' : fmt(value, valueDigits(value)),
                status && status !== 'unknown' && h('span', { class: 'sr-only' }, ` (${STATUS_TEXT[status]})`),
              );
            }),
          );
        }),
      ),
    ),
  );

  return h(
    'div',
    { class: 'compare' },
    h('header', { class: 'editor-head' },
      h('h2', null, '사료 나란히 비교'),
      h('p', { class: 'hint' }, cat
        ? `색은 ${cat.name}의 질환 기준 판정입니다 (사료 한 가지만 먹는다고 가정). 칼로리 기준으로 맞춰서 비교하므로 습식과 건식을 공정하게 비교할 수 있어요.`
        : '고양이를 선택하면 질환 기준에 따라 색으로 표시됩니다.')),
    picker,
    chosen.length === 0 ? h('p', { class: 'hint' }, '비교할 사료를 선택하세요.') : table,
    h('ul', { class: 'legend' },
      h('li', null, h('span', { class: 'swatch cell-good', 'aria-hidden': 'true' }), '적정'),
      h('li', null, h('span', { class: 'swatch cell-caution', 'aria-hidden': 'true' }), '주의'),
      h('li', null, h('span', { class: 'swatch cell-bad', 'aria-hidden': 'true' }), '기준 벗어남')),
  );
}
