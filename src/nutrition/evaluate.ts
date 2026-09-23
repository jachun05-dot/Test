import type { ConditionSelection } from './energy.js';
import {
  BASELINE,
  INTERACTION_NOTES,
  getCondition,
  type Metric,
  type Range,
  type Rule,
} from './guidelines.js';
import { NUTRIENTS } from './nutrients.js';
import {
  calciumPhosphorusRatio,
  dmPpm,
  energyPercent,
  moisturePercent,
  per100kcal,
  type Profile,
} from './profile.js';

export type Status = 'good' | 'caution' | 'bad' | 'unknown';

export interface RuleResult {
  rule: Rule;
  value: number | undefined;
  unit: string;
  status: Status;
  direction?: 'high' | 'low';
}

export interface EvalContext {
  /** Daily energy target; omit when evaluating a single food rather than a daily diet. */
  targetKcal?: number;
}

export function metricKey(metric: Metric): string {
  switch (metric.type) {
    case 'per100kcal':
    case 'dmPpm':
      return `${metric.type}:${metric.nutrient}`;
    case 'energyPct':
      return `energyPct:${metric.macro}`;
    default:
      return metric.type;
  }
}

export function metricUnit(metric: Metric): string {
  switch (metric.type) {
    case 'per100kcal':
      return `${NUTRIENTS[metric.nutrient].unit}/100kcal`;
    case 'dmPpm':
      return 'mg/kg DM';
    case 'energyPct':
      return '% 칼로리';
    case 'moisture':
      return '%';
    case 'caP':
      return ': 1';
    case 'kcalVsTarget':
      return '% (목표 대비)';
  }
}

export function metricValue(p: Profile, metric: Metric, ctx: EvalContext): number | undefined {
  switch (metric.type) {
    case 'per100kcal':
      return per100kcal(p, metric.nutrient);
    case 'dmPpm':
      return dmPpm(p, metric.nutrient);
    case 'energyPct':
      return energyPercent(p, metric.macro);
    case 'moisture':
      return moisturePercent(p);
    case 'caP':
      return calciumPhosphorusRatio(p);
    case 'kcalVsTarget':
      return ctx.targetKcal && ctx.targetKcal > 0 && p.kcal > 0
        ? (p.kcal / ctx.targetKcal) * 100
        : undefined;
  }
}

function inRange(value: number, range: Range | undefined): boolean {
  if (!range) return false;
  return (range.min === undefined || value >= range.min) && (range.max === undefined || value <= range.max);
}

export function evaluateRule(rule: Rule, p: Profile, ctx: EvalContext): RuleResult {
  const value = metricValue(p, rule.metric, ctx);
  const unit = metricUnit(rule.metric);
  if (value === undefined) return { rule, value, unit, status: 'unknown' };
  if (inRange(value, rule.good)) return { rule, value, unit, status: 'good' };

  const direction = rule.good.max !== undefined && value > rule.good.max ? 'high' : 'low';
  const status = inRange(value, rule.caution) ? 'caution' : 'bad';
  return { rule, value, unit, status, direction };
}

export interface Section {
  key: string;
  name: string;
  variantLabel?: string;
  summary: string;
  results: RuleResult[];
  notes: string[];
  sources: string[];
}

export interface Report {
  sections: Section[];
  conflicts: string[];
}

function applicable(rules: Rule[], ctx: EvalContext): Rule[] {
  return ctx.targetKcal ? rules : rules.filter((r) => r.metric.type !== 'kcalVsTarget');
}

export function buildReport(selections: ConditionSelection[], p: Profile, ctx: EvalContext): Report {
  const conditionSections: Section[] = [];
  const ruled: { conditionName: string; rule: Rule }[] = [];

  for (const selection of selections) {
    const condition = getCondition(selection.id);
    const rules = applicable(condition.rules(selection.variant), ctx);
    for (const rule of rules) ruled.push({ conditionName: condition.name, rule });
    conditionSections.push({
      key: selection.id,
      name: condition.name,
      variantLabel: condition.variants?.find((v) => v.id === selection.variant)?.label,
      summary: condition.summary,
      results: rules.map((rule) => evaluateRule(rule, p, ctx)),
      notes: condition.notes(selection.variant),
      sources: condition.sources,
    });
  }

  const covered = new Set(ruled.map(({ rule }) => metricKey(rule.metric)));
  const baselineRules = BASELINE.rules.filter((rule) => !covered.has(metricKey(rule.metric)));
  const baseline: Section = {
    key: 'baseline',
    name: BASELINE.name,
    summary: BASELINE.summary,
    results: baselineRules.map((rule) => evaluateRule(rule, p, ctx)),
    notes: BASELINE.notes,
    sources: BASELINE.sources,
  };

  return {
    sections: [...conditionSections, baseline],
    conflicts: findConflicts(selections, ruled),
  };
}

function findConflicts(
  selections: ConditionSelection[],
  ruled: { conditionName: string; rule: Rule }[],
): string[] {
  const conflicts: string[] = [];
  for (const a of ruled) {
    for (const b of ruled) {
      if (a.conditionName === b.conditionName) continue;
      if (metricKey(a.rule.metric) !== metricKey(b.rule.metric)) continue;
      const max = a.rule.good.max;
      const min = b.rule.good.min;
      if (max !== undefined && min !== undefined && max < min) {
        conflicts.push(
          `${a.rule.label}: ${a.conditionName}의 권장 상한(${max} ${metricUnit(a.rule.metric)})이 ` +
            `${b.conditionName}의 권장 하한(${min})보다 낮아 두 기준을 동시에 만족할 수 없습니다.`,
        );
      }
    }
  }

  const selected = new Set(selections.map((s) => s.id));
  for (const { ids, note } of INTERACTION_NOTES) {
    if (ids.every((id) => selected.has(id))) conflicts.push(note);
  }
  return conflicts;
}
