import {
  buildReport,
  foodProfile,
  moisturePercent,
  per100kcal,
  type FoodLabel,
  type FoodType,
} from '../../nutrition/index.js';
import { energySplit, estimateNotes, nutrientTable, reportView, stat } from '../components.js';
import type { App } from '../context.js';
import { confirmButton, fmt, h, readNumber, replaceChildren, uid } from '../dom.js';

let editingId: string | 'new' | undefined;

type NumericField = Exclude<keyof FoodLabel, 'id' | 'name' | 'brand' | 'type' | 'source'>;

interface FieldSpec {
  key: NumericField;
  label: string;
  unit: string;
  required?: boolean;
  hint?: string;
}

const MAIN_FIELDS: FieldSpec[] = [
  { key: 'moisture', label: '수분', unit: '%', required: true },
  { key: 'protein', label: '조단백질', unit: '%', required: true },
  { key: 'fat', label: '조지방', unit: '%', required: true },
  { key: 'fiber', label: '조섬유', unit: '%', required: true },
  { key: 'ash', label: '조회분', unit: '%', hint: '없으면 비워두세요 (추정)' },
  { key: 'carb', label: '탄수화물', unit: '%', hint: '표기된 경우만' },
  { key: 'kcalPerKg', label: '칼로리', unit: 'kcal/kg', hint: 'kcal/100g이면 ×10' },
];

const MINERAL_FIELDS: FieldSpec[] = [
  { key: 'phosphorus', label: '인', unit: '%' },
  { key: 'calcium', label: '칼슘', unit: '%' },
  { key: 'magnesium', label: '마그네슘', unit: '%' },
  { key: 'sodium', label: '나트륨', unit: '%' },
  { key: 'potassium', label: '칼륨', unit: '%' },
  { key: 'taurine', label: '타우린', unit: '%' },
  { key: 'iodine', label: '요오드', unit: 'mg/kg' },
];

function blankFood(): FoodLabel {
  return { id: uid(), name: '', type: 'wet', moisture: 78, protein: 0, fat: 0, fiber: 0, source: 'user' };
}

export function foodsView(app: App): HTMLElement {
  const { foods } = app.state;
  if (editingId !== 'new' && !foods.some((f) => f.id === editingId)) editingId = foods[0]?.id;
  const isNew = editingId === 'new' || !editingId;
  const current = isNew ? blankFood() : foods.find((f) => f.id === editingId)!;

  const list = h(
    'nav',
    { class: 'side-list', 'aria-label': '사료 목록' },
    h('h2', { class: 'side-title' }, '내 사료'),
    h(
      'ul',
      null,
      foods.map((food) => {
        const p = foodProfile(food);
        const phos = per100kcal(p, 'phosphorus');
        return h(
          'li',
          null,
          h(
            'button',
            { type: 'button', class: `list-item${food.id === current.id ? ' is-active' : ''}`, on: { click: () => { editingId = food.id; app.rerender(); } } },
            h('span', { class: 'list-name' }, food.name),
            h(
              'span',
              { class: 'list-meta' },
              `${food.type === 'dry' ? '건식' : '습식'} · ${fmt(p.kcal, 0)} kcal/100g`,
              phos !== undefined ? ` · 인 ${fmt(phos, 0)} mg/100kcal` : '',
            ),
          ),
        );
      }),
    ),
    h('button', { type: 'button', class: 'btn btn-ghost', on: { click: () => { editingId = 'new'; app.rerender(); } } }, '+ 사료 추가'),
    h('p', { class: 'hint' }, '사료 검색 DB는 다음 단계에서 추가됩니다. 지금은 포장지 성분표를 직접 입력하세요.'),
  );

  return h('div', { class: 'split-layout' }, list, foodForm(app, current, isNew));
}

function numberInput(spec: FieldSpec, value: number | undefined): HTMLInputElement {
  return h('input', {
    id: `food-${spec.key}`,
    type: 'number',
    inputmode: 'decimal',
    step: 'any',
    min: '0',
    value: value?.toString() ?? '',
    required: spec.required,
  });
}

function foodForm(app: App, food: FoodLabel, isNew: boolean): HTMLElement {
  const name = h('input', { id: 'food-name', type: 'text', value: food.name, placeholder: '예: ○○ 키드니 케어 파우치', autocomplete: 'off' });
  const brand = h('input', { id: 'food-brand', type: 'text', value: food.brand ?? '', placeholder: '선택', autocomplete: 'off' });
  const type = h(
    'select',
    { id: 'food-type' },
    h('option', { value: 'wet', selected: food.type === 'wet' }, '습식 (캔·파우치)'),
    h('option', { value: 'dry', selected: food.type === 'dry' }, '건식 (사료 알갱이)'),
  );

  const inputs = new Map<NumericField, HTMLInputElement>();
  const fieldGrid = (specs: FieldSpec[]) =>
    h(
      'div',
      { class: 'grid-label' },
      specs.map((spec) => {
        const input = numberInput(spec, food[spec.key] as number | undefined);
        inputs.set(spec.key, input);
        return h(
          'div',
          { class: 'field field-compact' },
          h('label', { for: input.id }, spec.label, spec.required && h('span', { class: 'req', 'aria-hidden': 'true' }, ' *')),
          h('div', { class: 'input-unit' }, input, h('span', null, spec.unit)),
          spec.hint && h('p', { class: 'hint' }, spec.hint),
        );
      }),
    );

  const errors = h('p', { class: 'form-error', role: 'alert' });
  const analysis = h('div', { class: 'analysis', 'aria-live': 'polite' });

  const draft = (): FoodLabel => {
    const next: FoodLabel = {
      id: food.id,
      source: 'user',
      name: name.value.trim(),
      brand: brand.value.trim() || undefined,
      type: type.value as FoodType,
      moisture: 0,
      protein: 0,
      fat: 0,
      fiber: 0,
    };
    for (const [key, input] of inputs) {
      const value = readNumber(input);
      if (value !== undefined) (next as unknown as Record<string, number>)[key] = value;
    }
    return next;
  };

  const refresh = () => renderAnalysis(app, analysis, draft());

  const form = h(
    'form',
    {
      class: 'editor',
      novalidate: true,
      on: {
        input: refresh,
        change: refresh,
        submit: (event: Event) => {
          event.preventDefault();
          const next = draft();
          const problem = validate(next, inputs);
          errors.textContent = problem ?? '';
          if (problem) return;
          const { foods } = app.state;
          const index = foods.findIndex((f) => f.id === next.id);
          if (index >= 0) foods[index] = next;
          else foods.push(next);
          editingId = next.id;
          app.commit();
          app.toast(`${next.name}을(를) 저장했습니다`);
        },
      },
    },
    h('header', { class: 'editor-head' }, h('h2', null, isNew ? '새 사료' : food.name)),
    h(
      'div',
      { class: 'editor-body' },
      h(
        'div',
        { class: 'editor-fields' },
        h(
          'fieldset',
          null,
          h('legend', null, '사료 정보'),
          h('div', { class: 'grid-2' },
            h('div', { class: 'field' }, h('label', { for: 'food-name' }, '이름'), name),
            h('div', { class: 'field' }, h('label', { for: 'food-brand' }, '브랜드'), brand),
            h('div', { class: 'field' }, h('label', { for: 'food-type' }, '종류'), type),
          ),
        ),
        h(
          'fieldset',
          null,
          h('legend', null, '등록성분 (포장지 표기 그대로)'),
          h('p', { class: 'hint' }, '포장지의 "등록성분량" 숫자를 그대로 넣으세요. 최소·최대 표기도 그대로 쓰면 됩니다.'),
          fieldGrid(MAIN_FIELDS),
        ),
        h(
          'fieldset',
          null,
          h('legend', null, '미네랄 (표기된 것만)'),
          h('p', { class: 'hint' }, '비워둔 항목은 "정보 없음"으로 표시되고 계산에서 빠집니다. 없으면 제조사에 문의하면 대부분 알려줍니다.'),
          fieldGrid(MINERAL_FIELDS),
        ),
        errors,
        h(
          'div',
          { class: 'actions' },
          h('button', { type: 'submit', class: 'btn btn-primary' }, isNew ? '사료 추가' : '저장'),
          !isNew &&
            confirmButton('삭제', '한 번 더 누르면 삭제됩니다', () => {
              app.state.foods = app.state.foods.filter((f) => f.id !== food.id);
              for (const plan of Object.values(app.state.diets)) {
                plan.rows = plan.rows.filter((r) => r.foodId !== food.id);
              }
              editingId = undefined;
              app.commit();
              app.toast(`${food.name}을(를) 삭제했습니다`);
            }),
        ),
      ),
      analysis,
    ),
  );
  // Inputs are created while building the form, so the first analysis has to wait until now.
  refresh();
  return form;
}

function validate(food: FoodLabel, inputs: Map<NumericField, HTMLInputElement>): string | undefined {
  if (!food.name) return '사료 이름을 입력하세요.';
  for (const key of ['moisture', 'protein', 'fat', 'fiber'] as const) {
    if (readNumber(inputs.get(key)!) === undefined) return `${MAIN_FIELDS.find((f) => f.key === key)!.label} 값을 입력하세요.`;
  }
  if (food.moisture >= 100) return '수분은 100% 미만이어야 합니다.';
  for (const [key, input] of inputs) {
    const v = readNumber(input);
    if (v !== undefined && v < 0) return '음수는 입력할 수 없습니다.';
    if (v !== undefined && key !== 'kcalPerKg' && key !== 'iodine' && v > 100) return '% 값은 100을 넘을 수 없습니다.';
  }
  if (food.kcalPerKg !== undefined && (food.kcalPerKg < 300 || food.kcalPerKg > 6500)) {
    return '칼로리는 kcal/kg 단위입니다. 포장지에 kcal/100g으로 적혀 있으면 10을 곱하세요.';
  }
  return undefined;
}

function renderAnalysis(app: App, target: HTMLElement, food: FoodLabel): void {
  const hasBasics = food.protein + food.fat + food.fiber > 0 && food.moisture < 100;
  if (!hasBasics) {
    replaceChildren(target, h('p', { class: 'hint' }, '성분을 입력하면 건물 기준·100kcal당 수치와 질환 기준 판정이 여기에 바로 나타납니다.'));
    return;
  }
  const p = foodProfile(food);
  const cat = app.activeCat();
  const report = buildReport(cat?.conditions ?? [], p, {});

  replaceChildren(
    target,
    h(
      'div',
      { class: 'stat-row' },
      stat('칼로리', `${fmt(p.kcal, 0)}`, 'kcal/100g', p.estimated.kcal ? '추정' : undefined),
      stat('수분', `${fmt(moisturePercent(p), 0)}`, '%'),
      stat('건물(수분 제외)', `${fmt(p.dryMatter, 0)}`, 'g/100g'),
    ),
    energySplit(p),
    nutrientTable(p),
    estimateNotes(p),
    h(
      'div',
      { class: 'report-head' },
      h('h3', null, cat ? `${cat.name}의 질환 기준으로 보면` : '기본 영양 기준으로 보면'),
      h('p', { class: 'hint' }, '사료 한 가지만 먹는다고 가정한 판정입니다. 섞어 먹이면 "식단 분석"에서 확인하세요.'),
    ),
    reportView(report, { showNotes: false }),
  );
}
