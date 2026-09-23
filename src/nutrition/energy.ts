export type ConditionId =
  | 'ckd'
  | 'diabetes'
  | 'urinary'
  | 'hyperthyroid'
  | 'obesity'
  | 'underweight'
  | 'heart'
  | 'gi'
  | 'liver'
  | 'pancreatitis';

export interface ConditionSelection {
  id: ConditionId;
  /** CKD stage, urinary stone type, etc. */
  variant?: string;
}

export type Goal = 'auto' | 'maintain' | 'lose' | 'gain' | 'recovery';

export interface Cat {
  id: string;
  name: string;
  weightKg: number;
  ageMonths: number;
  neutered: boolean;
  /** Body condition score on the 9-point scale. */
  bcs: number;
  /** Overrides the BCS-based estimate. */
  idealWeightKg?: number;
  goal: Goal;
  /** Overrides the automatically chosen MER factor. */
  merFactor?: number;
  conditions: ConditionSelection[];
}

/** Resting energy requirement (kcal/day). */
export function rer(weightKg: number): number {
  return 70 * Math.pow(weightKg, 0.75);
}

/**
 * Ideal weight from a 9-point BCS: each point away from 5 is roughly 10% of
 * body weight (WSAVA body condition score chart).
 */
export function estimateIdealWeight(weightKg: number, bcs: number): number {
  const score = Math.min(9, Math.max(1, Math.round(bcs)));
  return weightKg / (1 + 0.1 * (score - 5));
}

export function idealWeight(cat: Cat): number {
  return cat.idealWeightKg ?? estimateIdealWeight(cat.weightKg, cat.bcs);
}

export function resolveGoal(cat: Cat): Exclude<Goal, 'auto'> {
  if (cat.goal !== 'auto') return cat.goal;
  const has = (id: ConditionId) => cat.conditions.some((c) => c.id === id);
  if (has('obesity') || cat.bcs >= 7) return 'lose';
  if (has('underweight') || cat.bcs <= 3) return 'gain';
  return 'maintain';
}

export interface EnergyPlan {
  goal: Exclude<Goal, 'auto'>;
  basisWeightKg: number;
  rer: number;
  factor: number;
  kcalPerDay: number;
  explanation: string;
}

const GOAL_LABEL: Record<Exclude<Goal, 'auto'>, string> = {
  maintain: '체중 유지',
  lose: '체중 감량',
  gain: '체중 증량',
  recovery: '회복기(입원·질병)',
};

/**
 * Daily energy target. Factors follow the 2021 AAHA Nutrition and Weight
 * Management Guidelines / WSAVA: neutered adult 1.2, intact 1.4, weight loss
 * 0.8 × RER at ideal weight, kittens 2.5–3.0.
 */
export function energyPlan(cat: Cat): EnergyPlan {
  const goal = resolveGoal(cat);
  let basisWeightKg = cat.weightKg;
  let factor: number;
  let explanation: string;

  if (cat.ageMonths < 4) {
    factor = 3.0;
    explanation = '4개월 미만 자묘: RER × 3.0';
  } else if (cat.ageMonths < 12) {
    factor = 2.5;
    explanation = '12개월 미만 자묘: RER × 2.5';
  } else if (goal === 'lose') {
    basisWeightKg = idealWeight(cat);
    factor = 0.8;
    explanation = '감량: 이상 체중 기준 RER × 0.8';
  } else if (goal === 'gain') {
    basisWeightKg = idealWeight(cat);
    factor = 1.2;
    explanation = '증량: 이상 체중 기준 RER × 1.2';
  } else if (goal === 'recovery') {
    factor = 1.0;
    explanation = '회복기: 현재 체중 기준 RER × 1.0';
  } else {
    factor = cat.neutered ? 1.2 : 1.4;
    explanation = cat.neutered ? '중성화 성묘 유지: RER × 1.2' : '중성화 안 한 성묘 유지: RER × 1.4';
  }

  if (cat.merFactor !== undefined && cat.merFactor > 0) {
    factor = cat.merFactor;
    explanation = `직접 입력한 계수: RER × ${factor}`;
  }

  const base = rer(basisWeightKg);
  return {
    goal,
    basisWeightKg,
    rer: base,
    factor,
    kcalPerDay: base * factor,
    explanation: `${GOAL_LABEL[goal]} — ${explanation}`,
  };
}

/** Typical total daily water need for cats: about 50 mL/kg (range 40–60). */
export function waterNeed(weightKg: number): { min: number; target: number; max: number } {
  return { min: 40 * weightKg, target: 50 * weightKg, max: 60 * weightKg };
}
