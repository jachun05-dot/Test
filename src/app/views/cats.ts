import {
  CONDITIONS,
  energyPlan,
  estimateIdealWeight,
  rer,
  waterNeed,
  type Cat,
  type ConditionSelection,
  type Goal,
} from '../../nutrition/index.js';
import type { App } from '../context.js';
import { confirmButton, fmt, h, readNumber, replaceChildren, uid } from '../dom.js';

let editingId: string | 'new' | undefined;

const BCS_LABELS: Record<number, string> = {
  1: '1 — 매우 마름',
  2: '2 — 마름',
  3: '3 — 약간 마름',
  4: '4 — 이상적(마른 편)',
  5: '5 — 이상적',
  6: '6 — 약간 과체중',
  7: '7 — 과체중',
  8: '8 — 비만',
  9: '9 — 고도 비만',
};

const GOAL_OPTIONS: [Goal, string][] = [
  ['auto', '자동 (체형점수·질환 기준)'],
  ['maintain', '체중 유지'],
  ['lose', '체중 감량'],
  ['gain', '체중 증량'],
  ['recovery', '회복기 (입원·질병)'],
];

function blankCat(): Cat {
  return { id: uid(), name: '', weightKg: 4, ageMonths: 36, neutered: true, bcs: 5, goal: 'auto', conditions: [] };
}

export function catsView(app: App): HTMLElement {
  const { cats } = app.state;
  if (editingId !== 'new' && !cats.some((c) => c.id === editingId)) editingId = app.activeCat()?.id;
  const current = editingId === 'new' || !editingId ? blankCat() : cats.find((c) => c.id === editingId)!;
  const isNew = editingId === 'new' || !editingId;

  const list = h(
    'nav',
    { class: 'side-list', 'aria-label': '고양이 목록' },
    h('h2', { class: 'side-title' }, '고양이'),
    h(
      'ul',
      null,
      cats.map((cat) =>
        h(
          'li',
          null,
          h(
            'button',
            {
              type: 'button',
              class: `list-item${cat.id === current.id ? ' is-active' : ''}`,
              on: { click: () => { editingId = cat.id; app.state.activeCatId = cat.id; app.commit(); } },
            },
            h('span', { class: 'list-name' }, cat.name),
            h('span', { class: 'list-meta' }, `${fmt(cat.weightKg, 2)} kg · ${ageText(cat.ageMonths)}`),
            cat.conditions.length > 0 &&
              h('span', { class: 'chips' }, cat.conditions.map((c) => h('span', { class: 'chip' }, shortCondition(c)))),
          ),
        ),
      ),
    ),
    h('button', { type: 'button', class: 'btn btn-ghost', on: { click: () => { editingId = 'new'; app.rerender(); } } }, '+ 고양이 추가'),
  );

  return h('div', { class: 'split-layout' }, list, catForm(app, current, isNew));
}

function ageText(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return y > 0 ? (m > 0 ? `${y}살 ${m}개월` : `${y}살`) : `${m}개월`;
}

function shortCondition(c: ConditionSelection): string {
  const condition = CONDITIONS.find((x) => x.id === c.id)!;
  const variant = condition.variants?.find((v) => v.id === c.variant)?.label;
  const name = condition.name.replace(/\s*\(.*\)$/, '');
  return variant ? `${name} ${variant}` : name;
}

function field(id: string, label: string, control: HTMLElement, hint?: string): HTMLElement {
  return h('div', { class: 'field' }, h('label', { for: id }, label), control, hint && h('p', { class: 'hint' }, hint));
}

function catForm(app: App, cat: Cat, isNew: boolean): HTMLElement {
  const name = h('input', { id: 'cat-name', type: 'text', value: cat.name, placeholder: '예: 나비', required: true, autocomplete: 'off' });
  const weight = h('input', { id: 'cat-weight', type: 'number', inputmode: 'decimal', step: '0.01', min: '0.3', max: '15', value: String(cat.weightKg) });
  const years = h('input', { id: 'cat-years', type: 'number', inputmode: 'numeric', min: '0', max: '30', value: String(Math.floor(cat.ageMonths / 12)) });
  const months = h('input', { id: 'cat-months', type: 'number', inputmode: 'numeric', min: '0', max: '11', value: String(cat.ageMonths % 12) });
  const neutered = h('input', { id: 'cat-neutered', type: 'checkbox', checked: cat.neutered });
  const bcs = h('select', { id: 'cat-bcs' }, Object.entries(BCS_LABELS).map(([v, label]) => h('option', { value: v, selected: Number(v) === cat.bcs }, label)));
  const ideal = h('input', { id: 'cat-ideal', type: 'number', inputmode: 'decimal', step: '0.01', min: '0.3', max: '15', value: cat.idealWeightKg?.toString() ?? '', placeholder: '비워두면 자동 추정' });
  const goal = h('select', { id: 'cat-goal' }, GOAL_OPTIONS.map(([v, label]) => h('option', { value: v, selected: v === cat.goal }, label)));
  const factor = h('input', { id: 'cat-factor', type: 'number', inputmode: 'decimal', step: '0.05', min: '0.5', max: '4', value: cat.merFactor?.toString() ?? '', placeholder: '비워두면 자동' });

  const conditionInputs = CONDITIONS.map((condition) => {
    const selected = cat.conditions.find((c) => c.id === condition.id);
    const box = h('input', { id: `cond-${condition.id}`, type: 'checkbox', checked: !!selected });
    const variant = condition.variants
      ? h(
          'select',
          { id: `cond-${condition.id}-variant`, 'aria-label': `${condition.name} 세부 유형`, disabled: !selected },
          condition.variants.map((v) => h('option', { value: v.id, selected: v.id === (selected?.variant ?? defaultVariant(condition.id)) }, v.label)),
        )
      : undefined;
    box.addEventListener('change', () => { if (variant) variant.disabled = !box.checked; });
    return { condition, box, variant };
  });

  const errors = h('p', { class: 'form-error', role: 'alert' });
  const summary = h('aside', { class: 'energy-card', 'aria-live': 'polite' });

  const draft = (): Cat => ({
    ...cat,
    name: name.value.trim(),
    weightKg: readNumber(weight) ?? 0,
    ageMonths: (readNumber(years) ?? 0) * 12 + (readNumber(months) ?? 0),
    neutered: neutered.checked,
    bcs: Number(bcs.value),
    idealWeightKg: readNumber(ideal),
    goal: goal.value as Goal,
    merFactor: readNumber(factor),
    conditions: conditionInputs
      .filter((c) => c.box.checked)
      .map((c) => ({ id: c.condition.id, variant: c.variant?.value })),
  });

  const refresh = () => renderEnergy(summary, draft());
  refresh();

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
          const problem = validate(next);
          errors.textContent = problem ?? '';
          if (problem) return;
          const { cats } = app.state;
          const index = cats.findIndex((c) => c.id === next.id);
          const stored = { ...next, example: undefined };
          if (index >= 0) cats[index] = stored;
          else cats.push(stored);
          app.state.activeCatId = next.id;
          editingId = next.id;
          app.commit();
          app.toast(`${next.name} 정보를 저장했습니다`);
        },
      },
    },
    h('header', { class: 'editor-head' }, h('h2', null, isNew ? '새 고양이' : cat.name || '고양이 정보')),
    h(
      'div',
      { class: 'editor-body' },
      h(
        'div',
        { class: 'editor-fields' },
        h(
          'fieldset',
          null,
          h('legend', null, '기본 정보'),
          h('div', { class: 'grid-2' },
            field('cat-name', '이름', name),
            field('cat-weight', '현재 체중 (kg)', weight),
            h('div', { class: 'field' }, h('span', { class: 'label' }, '나이'), h('div', { class: 'inline' }, years, h('label', { for: 'cat-years' }, '살'), months, h('label', { for: 'cat-months' }, '개월'))),
            h('div', { class: 'field field-check' }, neutered, h('label', { for: 'cat-neutered' }, '중성화했어요')),
          ),
        ),
        h(
          'fieldset',
          null,
          h('legend', null, '체형과 목표'),
          h('div', { class: 'grid-2' },
            field('cat-bcs', '체형점수 (BCS, 9점 척도)', bcs, '갈비뼈가 쉽게 만져지고 허리가 보이면 4–5점입니다.'),
            field('cat-ideal', '이상 체중 (kg, 선택)', ideal, '수의사가 알려준 목표 체중이 있으면 입력하세요.'),
            field('cat-goal', '급여 목표', goal),
            field('cat-factor', '에너지 계수 직접 입력 (선택)', factor, '수의사가 정해준 계수가 있을 때만 입력하세요.'),
          ),
        ),
        h(
          'fieldset',
          null,
          h('legend', null, '진단받은 질환'),
          h('p', { class: 'hint' }, '여러 개를 선택할 수 있어요. 서로 권장 방향이 다르면 분석 화면에서 알려드립니다.'),
          h(
            'ul',
            { class: 'condition-list' },
            conditionInputs.map(({ condition, box, variant }) =>
              h('li', null, h('div', { class: 'field-check' }, box, h('label', { for: box.id }, condition.name)), variant),
            ),
          ),
        ),
        errors,
        h(
          'div',
          { class: 'actions' },
          h('button', { type: 'submit', class: 'btn btn-primary' }, isNew ? '고양이 추가' : '저장'),
          !isNew &&
            confirmButton('삭제', '한 번 더 누르면 삭제됩니다', () => {
              app.state.cats = app.state.cats.filter((c) => c.id !== cat.id);
              delete app.state.diets[cat.id];
              app.state.logs = app.state.logs.filter((l) => l.catId !== cat.id);
              if (app.state.activeCatId === cat.id) app.state.activeCatId = app.state.cats[0]?.id;
              editingId = app.state.activeCatId;
              app.commit();
              app.toast(`${cat.name}을(를) 삭제했습니다`);
            }),
        ),
      ),
      summary,
    ),
  );
  return form;
}

function defaultVariant(id: string): string | undefined {
  return { ckd: '2', urinary: 'fic', hyperthyroid: 'standard' }[id];
}

function validate(cat: Cat): string | undefined {
  if (!cat.name) return '이름을 입력하세요.';
  if (!(cat.weightKg >= 0.3 && cat.weightKg <= 15)) return '체중은 0.3–15 kg 사이로 입력하세요.';
  if (!(cat.ageMonths >= 0 && cat.ageMonths <= 360)) return '나이를 확인하세요.';
  if (cat.idealWeightKg !== undefined && !(cat.idealWeightKg >= 0.3 && cat.idealWeightKg <= 15)) return '이상 체중은 0.3–15 kg 사이로 입력하세요.';
  if (cat.merFactor !== undefined && !(cat.merFactor >= 0.5 && cat.merFactor <= 4)) return '에너지 계수는 0.5–4 사이로 입력하세요.';
  return undefined;
}

function renderEnergy(target: HTMLElement, cat: Cat): void {
  if (!(cat.weightKg > 0)) {
    replaceChildren(target, h('p', { class: 'hint' }, '체중을 입력하면 하루 필요 칼로리를 계산합니다.'));
    return;
  }
  const plan = energyPlan(cat);
  const water = waterNeed(cat.weightKg);
  const estimatedIdeal = estimateIdealWeight(cat.weightKg, cat.bcs);
  replaceChildren(
    target,
    h('p', { class: 'eyebrow' }, '하루 목표 칼로리'),
    h('p', { class: 'big-number' }, fmt(plan.kcalPerDay, 0), h('span', null, ' kcal')),
    h('p', { class: 'energy-why' }, plan.explanation),
    h(
      'dl',
      { class: 'kv' },
      h('dt', null, '기초 대사량 (RER)'),
      h('dd', { class: 'num' }, `${fmt(rer(plan.basisWeightKg), 0)} kcal`),
      h('dt', null, '계산 기준 체중'),
      h('dd', { class: 'num' }, `${fmt(plan.basisWeightKg, 2)} kg`),
      h('dt', null, '이상 체중'),
      h('dd', { class: 'num' }, cat.idealWeightKg ? `${fmt(cat.idealWeightKg, 2)} kg (입력값)` : `약 ${fmt(estimatedIdeal, 2)} kg (체형점수로 추정)`),
      h('dt', null, '하루 필요 수분'),
      h('dd', { class: 'num' }, `약 ${fmt(water.target, 0)} mL (${fmt(water.min, 0)}–${fmt(water.max, 0)})`),
    ),
    h('p', { class: 'fine-print' }, 'RER = 70 × 체중(kg)^0.75. 실제 필요량은 개체마다 ±20% 차이가 나므로, 2–4주마다 체중을 재서 조정하세요.'),
  );
}
