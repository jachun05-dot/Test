import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildReport,
  calciumPhosphorusRatio,
  dmPercent,
  dmPpm,
  energyPercent,
  energyPlan,
  estimateIdealWeight,
  evaluateRule,
  foodProfile,
  getCondition,
  moisturePercent,
  per100kcal,
  perKgBodyWeight,
  profileOf,
  rer,
} from '../dist/nutrition/index.js';

const close = (actual, expected, eps = 1e-6) =>
  assert.ok(Math.abs(actual - expected) < eps, `expected ${expected}, got ${actual}`);

const dry = {
  id: 'dry',
  name: '건식 A',
  type: 'dry',
  moisture: 10,
  protein: 32,
  fat: 15,
  fiber: 3,
  ash: 7,
  phosphorus: 1.0,
  calcium: 1.2,
  source: 'user',
};

const wet = {
  id: 'wet',
  name: '습식 B',
  type: 'wet',
  moisture: 80,
  protein: 10,
  fat: 5,
  fiber: 1,
  ash: 2,
  source: 'user',
};

const cat = (overrides = {}) => ({
  id: 'c',
  name: '나비',
  weightKg: 4,
  ageMonths: 60,
  neutered: true,
  bcs: 5,
  goal: 'auto',
  conditions: [],
  ...overrides,
});

test('dry matter basis removes moisture', () => {
  const p = foodProfile({ ...wet, moisture: 78, protein: 11 });
  close(p.dryMatter, 22);
  close(dmPercent(p, 'protein'), 50);
});

test('carbohydrate is estimated by difference', () => {
  const p = foodProfile(dry);
  close(p.nutrients.carb, 33);
  assert.equal(p.estimated.carb, true);
});

test('calories use modified Atwater factors when the label has none', () => {
  const p = foodProfile(dry);
  close(p.kcal, 3.5 * 32 + 8.5 * 15 + 3.5 * 33);
  assert.equal(p.estimated.kcal, true);
});

test('per 100 kcal uses label calories when given', () => {
  const p = foodProfile({ ...dry, kcalPerKg: 4000 });
  close(p.kcal, 400);
  close(per100kcal(p, 'phosphorus'), 250);
  close(per100kcal(p, 'protein'), 8);
  assert.equal(p.estimated.kcal, false);
});

test('calorie split sums to 100%', () => {
  const p = foodProfile(dry);
  const total = ['protein', 'fat', 'carb'].reduce((sum, m) => sum + energyPercent(p, m), 0);
  close(total, 100);
  close(energyPercent(p, 'carb'), (3.5 * 33) / 355 * 100);
});

test('missing ash falls back to a typical value', () => {
  const p = foodProfile({ ...wet, ash: undefined });
  close(p.nutrients.ash, 2);
  assert.equal(p.estimated.ash, true);
});

test('components over 100% produce a warning and zero carbs', () => {
  const p = foodProfile({ ...dry, protein: 60, fat: 30 });
  assert.equal(p.nutrients.carb, 0);
  assert.equal(p.warnings.length, 1);
});

test('mixed diet sums absolute amounts', () => {
  const p = profileOf([
    { food: { ...dry, kcalPerKg: 4000 }, grams: 50 },
    { food: wet, grams: 85 },
  ]);
  close(p.grams, 135);
  close(p.water, 5 + 68);
  close(p.nutrients.protein, 16 + 8.5);
  close(p.kcal, 200 + (3.5 * 10 + 8.5 * 5 + 3.5 * 2) * 0.85);
  close(moisturePercent(p), (73 / 135) * 100);
});

test('a nutrient missing from one food is dropped rather than understated', () => {
  const p = profileOf([
    { food: dry, grams: 50 },
    { food: wet, grams: 85 },
  ]);
  assert.equal(p.nutrients.phosphorus, undefined);
  assert.ok(p.missing.includes('phosphorus'));
  assert.equal(per100kcal(p, 'phosphorus'), undefined);
});

test('iodine label mg/kg converts to dry-matter ppm', () => {
  const p = foodProfile({ ...dry, iodine: 0.3 });
  close(dmPpm(p, 'iodine'), 0.3 / 0.9);
});

test('calcium:phosphorus ratio and per-kg intake', () => {
  const p = profileOf([{ food: dry, grams: 50 }]);
  close(calciumPhosphorusRatio(p), 1.2);
  close(perKgBodyWeight(p, 'phosphorus', 4), (0.5 / 4) * 1000);
});

test('RER and ideal weight', () => {
  close(rer(4), 70 * Math.pow(4, 0.75));
  close(estimateIdealWeight(6, 7), 5);
  close(estimateIdealWeight(4, 3), 5);
});

test('energy plan chooses factors by life stage and goal', () => {
  close(energyPlan(cat()).factor, 1.2);
  close(energyPlan(cat({ neutered: false })).factor, 1.4);
  close(energyPlan(cat({ ageMonths: 6 })).factor, 2.5);

  const loss = energyPlan(cat({ weightKg: 6, bcs: 7 }));
  assert.equal(loss.goal, 'lose');
  close(loss.basisWeightKg, 5);
  close(loss.kcalPerDay, rer(5) * 0.8);

  close(energyPlan(cat({ merFactor: 1.6 })).factor, 1.6);
});

test('CKD stage 2 phosphorus rule grades good / caution / bad', () => {
  const rule = getCondition('ckd').rules('2').find((r) => r.id === 'phosphorus');
  const grade = (kcalPerKg) => evaluateRule(rule, foodProfile({ ...dry, kcalPerKg }), {});
  // 1.0% P → 250 mg/100kcal at 4000 kcal/kg
  assert.equal(grade(4000).status, 'caution');
  assert.equal(grade(4000).direction, 'high');
  assert.equal(grade(3000).status, 'bad'); // 333 mg/100kcal
  assert.equal(grade(7000).status, 'good'); // 143 mg/100kcal
});

test('condition rules replace the matching baseline rule', () => {
  const p = foodProfile(dry);
  const plain = buildReport([], p, {});
  const baselinePlain = plain.sections.find((s) => s.key === 'baseline');
  assert.ok(baselinePlain.results.some((r) => r.rule.id === 'phosphorus'));

  const ckd = buildReport([{ id: 'ckd', variant: '3' }], p, {});
  const baselineCkd = ckd.sections.find((s) => s.key === 'baseline');
  assert.ok(!baselineCkd.results.some((r) => r.rule.id === 'phosphorus'));
});

test('calorie-target rules only apply to a daily diet', () => {
  const p = foodProfile(dry);
  const single = buildReport([{ id: 'diabetes' }], p, {});
  assert.ok(!single.sections[0].results.some((r) => r.rule.metric.type === 'kcalVsTarget'));

  const daily = buildReport([{ id: 'diabetes' }], p, { targetKcal: 355 });
  const kcal = daily.sections[0].results.find((r) => r.rule.metric.type === 'kcalVsTarget');
  close(kcal.value, 100);
  assert.equal(kcal.status, 'good');
});

test('incompatible condition targets are reported', () => {
  const report = buildReport([{ id: 'ckd', variant: '3' }, { id: 'obesity' }], foodProfile(dry), {});
  assert.ok(report.conflicts.some((c) => c.startsWith('단백질')));
  assert.ok(report.conflicts.some((c) => c.includes('감량')));
});
