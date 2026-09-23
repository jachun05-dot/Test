import {
  MINERAL_KEYS,
  NUTRIENTS,
  buildReport,
  calciumPhosphorusRatio,
  dmPercent,
  dmPpm,
  energyPlan,
  foodProfile,
  kcalPerGram,
  per100kcal,
  perKgBodyWeight,
  profileOf,
  waterNeed,
  type DietItem,
  type NutrientKey,
} from '../../nutrition/index.js';
import { emptyState, energySplit, estimateNotes, reportView, stat, valueDigits } from '../components.js';
import type { App } from '../context.js';
import { fmt, h, readNumber, replaceChildren, uid } from '../dom.js';
import type { DietPlan, StoredCat, StoredFood } from '../store.js';

function planFor(app: App, cat: StoredCat): DietPlan {
  const existing = app.state.diets[cat.id];
  if (existing) return existing;
  const plan: DietPlan = { mode: 'share', meals: 2, rows: [] };
  app.state.diets[cat.id] = plan;
  return plan;
}

export function dietView(app: App): HTMLElement {
  const cat = app.activeCat();
  if (!cat) {
    return emptyState('먼저 고양이를 등록하세요', '체중과 질환을 알아야 하루 급여량과 판정을 계산할 수 있어요.',
      h('button', { type: 'button', class: 'btn btn-primary', on: { click: () => app.go('cats') } }, '고양이 등록하기'));
  }
  const foods = app.state.foods;
  if (foods.length === 0) {
    return emptyState('먼저 사료를 등록하세요', '포장지 성분표를 입력하면 식단을 계산할 수 있어요.',
      h('button', { type: 'button', class: 'btn btn-primary', on: { click: () => app.go('foods') } }, '사료 등록하기'));
  }

  const plan = planFor(app, cat);
  plan.rows = plan.rows.filter((r) => foods.some((f) => f.id === r.foodId));
  const energy = energyPlan(cat);
  const results = h('div', { class: 'diet-results', 'aria-live': 'polite' });
  const rowsHost = h('div', { class: 'diet-rows' });

  const recompute = () => {
    app.persist();
    renderResults(app, results, cat, plan, foods, energy.kcalPerDay);
    renderRowAmounts(rowsHost, plan, foods, energy.kcalPerDay);
  };

  const modeSwitch = h(
    'div',
    { class: 'segmented', role: 'radiogroup', 'aria-label': '급여량 계산 방식' },
    (['share', 'grams'] as const).map((mode) =>
      h(
        'button',
        {
          type: 'button',
          role: 'radio',
          'aria-checked': String(plan.mode === mode),
          class: plan.mode === mode ? 'is-on' : '',
          on: {
            click: () => {
              if (plan.mode === mode) return;
              // Carry the current amounts across so switching modes doesn't lose the diet.
              const amounts = computeItems(plan, foods, energy.kcalPerDay);
              const total = amounts.reduce((s, x) => s + foodProfile(x.food).kcal * (x.grams / 100), 0);
              plan.rows.forEach((row, i) => {
                const item = amounts[i];
                if (!item) return;
                row.grams = Math.round(item.grams);
                row.share = total > 0 ? Math.round((foodProfile(item.food).kcal * (item.grams / 100) / total) * 100) : row.share;
              });
              plan.mode = mode;
              app.commit();
            },
          },
        },
        mode === 'share' ? '칼로리 비율로 자동 계산' : '급여량(g) 직접 입력',
      ),
    ),
  );

  const meals = h('input', { id: 'diet-meals', type: 'number', inputmode: 'numeric', min: '1', max: '12', value: String(plan.meals) });
  meals.addEventListener('input', () => {
    const n = readNumber(meals);
    if (n !== undefined && n >= 1 && n <= 12) {
      plan.meals = Math.round(n);
      recompute();
    }
  });

  for (const row of plan.rows) rowsHost.appendChild(rowEditor(app, plan, row, foods, recompute));

  const addRow = h(
    'button',
    {
      type: 'button',
      class: 'btn btn-ghost',
      on: {
        click: () => {
          const unused = foods.find((f) => !plan.rows.some((r) => r.foodId === f.id)) ?? foods[0]!;
          const remaining = Math.max(0, 100 - plan.rows.reduce((s, r) => s + r.share, 0));
          plan.rows.push({ foodId: unused.id, share: plan.rows.length === 0 ? 100 : remaining, grams: 50 });
          app.commit();
        },
      },
    },
    '+ 사료 추가',
  );

  const layout = h(
    'div',
    { class: 'diet' },
    h(
      'section',
      { class: 'diet-plan', 'aria-labelledby': 'diet-plan-title' },
      h('header', { class: 'editor-head' },
        h('h2', { id: 'diet-plan-title' }, `${cat.name}의 하루 식단`),
        h('p', { class: 'target-line' },
          '하루 목표 ', h('b', { class: 'num' }, `${fmt(energy.kcalPerDay, 0)} kcal`), ` · ${energy.explanation}`),
      ),
      h('div', { class: 'diet-controls' }, modeSwitch,
        h('div', { class: 'field field-inline' }, h('label', { for: 'diet-meals' }, '하루 급여 횟수'), meals)),
      rowsHost,
      addRow,
    ),
    results,
  );

  recompute();
  return layout;
}

function rowEditor(app: App, plan: DietPlan, row: DietPlan['rows'][number], foods: StoredFood[], recompute: () => void): HTMLElement {
  const key = uid();
  const select = h('select', { id: `row-food-${key}`, 'aria-label': '사료' }, foods.map((f) => h('option', { value: f.id, selected: f.id === row.foodId }, f.name)));
  select.addEventListener('change', () => { row.foodId = select.value; recompute(); });

  const amountInput =
    plan.mode === 'share'
      ? h('input', { id: `row-amount-${key}`, type: 'number', inputmode: 'decimal', min: '0', max: '100', step: '1', value: String(row.share) })
      : h('input', { id: `row-amount-${key}`, type: 'number', inputmode: 'decimal', min: '0', step: '1', value: String(row.grams) });
  amountInput.addEventListener('input', () => {
    const v = readNumber(amountInput) ?? 0;
    if (plan.mode === 'share') row.share = Math.max(0, v);
    else row.grams = Math.max(0, v);
    recompute();
  });

  return h(
    'div',
    { class: 'diet-row' },
    h('div', { class: 'field' }, h('label', { for: select.id }, '사료'), select),
    h('div', { class: 'field field-amount' },
      h('label', { for: amountInput.id }, plan.mode === 'share' ? '칼로리 비율' : '하루 급여량'),
      h('div', { class: 'input-unit' }, amountInput, h('span', null, plan.mode === 'share' ? '%' : 'g'))),
    h('p', { class: 'row-amount num', 'data-row': String(plan.rows.indexOf(row)) }),
    h('button', {
      type: 'button',
      class: 'btn btn-icon',
      'aria-label': '이 사료 빼기',
      on: { click: () => { plan.rows.splice(plan.rows.indexOf(row), 1); app.commit(); } },
    }, '×'),
  );
}

function computeItems(plan: DietPlan, foods: StoredFood[], targetKcal: number): DietItem[] {
  return plan.rows.flatMap((row) => {
    const food = foods.find((f) => f.id === row.foodId);
    if (!food) return [];
    if (plan.mode === 'grams') return [{ food, grams: row.grams }];
    const perGram = kcalPerGram(foodProfile(food));
    return [{ food, grams: perGram > 0 ? (targetKcal * row.share) / 100 / perGram : 0 }];
  });
}

function renderRowAmounts(host: HTMLElement, plan: DietPlan, foods: StoredFood[], targetKcal: number): void {
  const items = computeItems(plan, foods, targetKcal);
  host.querySelectorAll<HTMLElement>('.row-amount').forEach((el) => {
    const item = items[Number(el.dataset.row)];
    if (!item) return;
    const kcal = foodProfile(item.food).kcal * (item.grams / 100);
    el.textContent = plan.mode === 'share'
      ? `하루 ${fmt(item.grams, 0)} g · 한 끼 ${fmt(item.grams / plan.meals, 0)} g`
      : `${fmt(kcal, 0)} kcal · 한 끼 ${fmt(item.grams / plan.meals, 0)} g`;
  });
}

function renderResults(app: App, target: HTMLElement, cat: StoredCat, plan: DietPlan, foods: StoredFood[], targetKcal: number): void {
  const items = computeItems(plan, foods, targetKcal);
  if (items.length === 0 || items.every((i) => i.grams <= 0)) {
    replaceChildren(target, h('p', { class: 'hint' }, '사료를 추가하면 하루 섭취량과 질환 기준 판정이 여기에 나타납니다.'));
    return;
  }

  const p = profileOf(items);
  const report = buildReport(cat.conditions, p, { targetKcal });
  const water = waterNeed(cat.weightKg);
  const shareTotal = plan.rows.reduce((s, r) => s + r.share, 0);
  const caP = calciumPhosphorusRatio(p);

  replaceChildren(
    target,
    plan.mode === 'share' && Math.round(shareTotal) !== 100 &&
      h('div', { class: 'callout callout-caution', role: 'note' },
        `칼로리 비율의 합이 ${fmt(shareTotal, 0)}%입니다. 100%가 되도록 맞추면 목표 칼로리와 일치합니다.`),
    h(
      'div',
      { class: 'stat-row' },
      stat('급여 칼로리', fmt(p.kcal, 0), `kcal (목표의 ${fmt((p.kcal / targetKcal) * 100, 0)}%)`, p.estimated.kcal ? '일부 추정' : undefined),
      stat('하루 총 급여량', fmt(p.grams, 0), `g · 한 끼 ${fmt(p.grams / plan.meals, 0)} g`),
      stat('음식으로 먹는 수분', fmt(p.water, 0), `mL / 필요량 약 ${fmt(water.target, 0)} mL`),
      stat('칼슘 : 인', caP === undefined ? '—' : fmt(caP, 2), ': 1'),
    ),
    energySplit(p),
    intakeTable(p, cat.weightKg),
    p.missing.length > 0 &&
      h('p', { class: 'fine-print' },
        `${p.missing.map((k) => NUTRIENTS[k].label).join(', ')} 정보가 없는 사료가 있어 해당 성분은 합계에서 뺐습니다. 일부만 더하면 실제보다 적게 보이기 때문입니다.`),
    estimateNotes(p),
    h('div', { class: 'report-head' }, h('h3', null, '질환 기준 판정'),
      h('p', { class: 'hint' }, '섞어 먹이는 식단 전체를 기준으로 판정합니다.')),
    reportView(report),
    h('div', { class: 'actions' },
      h('button', {
        type: 'button',
        class: 'btn btn-primary',
        on: {
          click: () => {
            app.state.logs.push({
              id: uid(),
              catId: cat.id,
              date: new Date().toISOString().slice(0, 10),
              weightKg: cat.weightKg,
              kcal: p.kcal,
              targetKcal,
              items: items.map((i) => ({ name: i.food.name, grams: Math.round(i.grams) })),
            });
            app.persist();
            app.toast('오늘 식단을 기록에 저장했습니다');
          },
        },
      }, '오늘 식단 기록하기')),
  );
}

function intakeTable(p: ReturnType<typeof profileOf>, weightKg: number): HTMLElement {
  const keys: NutrientKey[] = ['protein', 'fat', 'carb', 'fiber', ...MINERAL_KEYS];
  return h(
    'div',
    { class: 'table-wrap' },
    h(
      'table',
      { class: 'data-table' },
      h('caption', null, '하루 섭취량'),
      h('thead', null, h('tr', null,
        h('th', { scope: 'col' }, '성분'),
        h('th', { scope: 'col', class: 'num' }, '하루'),
        h('th', { scope: 'col', class: 'num' }, '체중 1kg당'),
        h('th', { scope: 'col', class: 'num' }, '100kcal당'),
        h('th', { scope: 'col', class: 'num' }, '건물 기준'))),
      h('tbody', null,
        keys.filter((k) => p.nutrients[k] !== undefined).map((key) => {
          const meta = NUTRIENTS[key];
          const daily = p.nutrients[key]! * meta.fromGrams;
          const perKg = perKgBodyWeight(p, key, weightKg);
          const perKcal = per100kcal(p, key);
          const dm = meta.labelUnit === 'mg/kg' ? dmPpm(p, key) : dmPercent(p, key);
          return h('tr', null,
            h('th', { scope: 'row' }, meta.label),
            h('td', { class: 'num' }, fmt(daily, valueDigits(daily)), h('span', { class: 'unit' }, ` ${meta.unit}`)),
            h('td', { class: 'num' }, perKg === undefined ? '—' : fmt(perKg, valueDigits(perKg)), h('span', { class: 'unit' }, ` ${meta.unit}`)),
            h('td', { class: 'num' }, perKcal === undefined ? '—' : fmt(perKcal, valueDigits(perKcal)), h('span', { class: 'unit' }, ` ${meta.unit}`)),
            h('td', { class: 'num' }, fmt(dm, 2), h('span', { class: 'unit' }, meta.labelUnit === 'mg/kg' ? ' mg/kg' : ' %')));
        })),
    ),
  );
}
