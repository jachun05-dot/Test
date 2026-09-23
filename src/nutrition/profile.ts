import {
  ATWATER,
  MINERAL_KEYS,
  NUTRIENTS,
  labelToGramsPer100g,
  type NutrientKey,
  type OptionalNutrientKey,
} from './nutrients.js';

export type FoodType = 'dry' | 'wet';

/** Guaranteed analysis as printed on the package (as-fed basis). */
export interface FoodLabel {
  id: string;
  name: string;
  brand?: string;
  type: FoodType;
  moisture: number;
  protein: number;
  fat: number;
  fiber: number;
  ash?: number;
  /** Only when the label states it; otherwise estimated by difference. */
  carb?: number;
  phosphorus?: number;
  calcium?: number;
  magnesium?: number;
  sodium?: number;
  potassium?: number;
  taurine?: number;
  /** mg/kg as fed (= ppm). */
  iodine?: number;
  /** Metabolizable energy, kcal per kg as fed. */
  kcalPerKg?: number;
  source: 'user' | 'db';
}

/** Typical ash content used when the label omits it. */
export const DEFAULT_ASH: Record<FoodType, number> = { dry: 7, wet: 2 };

export interface DietItem {
  food: FoodLabel;
  grams: number;
}

/** Absolute amounts contained in a given quantity of food (or a mixed diet). */
export interface Profile {
  grams: number;
  water: number;
  dryMatter: number;
  kcal: number;
  /** Energy from modified Atwater factors; used for the calorie split. */
  atwaterKcal: number;
  nutrients: Partial<Record<NutrientKey, number>>;
  /** Optional nutrients that at least one food in the diet does not declare. */
  missing: OptionalNutrientKey[];
  estimated: { ash: boolean; carb: boolean; kcal: boolean };
  warnings: string[];
}

interface FoodPer100g {
  nutrients: Partial<Record<NutrientKey, number>>;
  kcal: number;
  atwaterKcal: number;
  estimated: Profile['estimated'];
  warnings: string[];
}

function per100g(food: FoodLabel): FoodPer100g {
  const warnings: string[] = [];
  const ashEstimated = food.ash === undefined;
  const ash = food.ash ?? DEFAULT_ASH[food.type];

  const declared = food.protein + food.fat + food.fiber + ash + food.moisture;
  const carbEstimated = food.carb === undefined;
  let carb = food.carb ?? 100 - declared;
  if (carb < 0) {
    warnings.push(
      `${food.name}: 성분 합계가 100%를 넘습니다 (${declared.toFixed(1)}%). 성분표 값을 확인하세요.`,
    );
    carb = 0;
  }

  const nutrients: Partial<Record<NutrientKey, number>> = {
    protein: food.protein,
    fat: food.fat,
    fiber: food.fiber,
    ash,
    carb,
  };
  for (const key of MINERAL_KEYS) {
    const value = food[key];
    if (value !== undefined) nutrients[key] = labelToGramsPer100g(key, value);
  }

  const atwaterKcal =
    ATWATER.protein * food.protein + ATWATER.fat * food.fat + ATWATER.carb * carb;
  const kcalEstimated = food.kcalPerKg === undefined;
  const kcal = kcalEstimated ? atwaterKcal : food.kcalPerKg! / 10;

  return {
    nutrients,
    kcal,
    atwaterKcal,
    estimated: { ash: ashEstimated, carb: carbEstimated, kcal: kcalEstimated },
    warnings,
  };
}

export function profileOf(items: DietItem[]): Profile {
  const active = items.filter((item) => item.grams > 0);
  const profile: Profile = {
    grams: 0,
    water: 0,
    dryMatter: 0,
    kcal: 0,
    atwaterKcal: 0,
    nutrients: {},
    missing: [],
    estimated: { ash: false, carb: false, kcal: false },
    warnings: [],
  };

  const missing = new Set<OptionalNutrientKey>();
  for (const { food, grams } of active) {
    const base = per100g(food);
    const scale = grams / 100;
    profile.grams += grams;
    profile.water += food.moisture * scale;
    profile.dryMatter += (100 - food.moisture) * scale;
    profile.kcal += base.kcal * scale;
    profile.atwaterKcal += base.atwaterKcal * scale;
    profile.estimated.ash ||= base.estimated.ash;
    profile.estimated.carb ||= base.estimated.carb;
    profile.estimated.kcal ||= base.estimated.kcal;
    profile.warnings.push(...base.warnings);

    for (const [key, value] of Object.entries(base.nutrients) as [NutrientKey, number][]) {
      profile.nutrients[key] = (profile.nutrients[key] ?? 0) + value * scale;
    }
    for (const key of MINERAL_KEYS) {
      if (base.nutrients[key] === undefined) missing.add(key);
    }
  }

  // A partial total would understate intake, so drop nutrients not declared by every food.
  for (const key of missing) delete profile.nutrients[key];
  profile.missing = [...missing];
  return profile;
}

export function foodProfile(food: FoodLabel): Profile {
  return profileOf([{ food, grams: 100 }]);
}

// ---- Derived metrics ----

/** Percent of dry matter. */
export function dmPercent(p: Profile, key: NutrientKey): number | undefined {
  const g = p.nutrients[key];
  return g === undefined || p.dryMatter <= 0 ? undefined : (g / p.dryMatter) * 100;
}

/** mg/kg of dry matter (ppm). */
export function dmPpm(p: Profile, key: NutrientKey): number | undefined {
  const g = p.nutrients[key];
  return g === undefined || p.dryMatter <= 0 ? undefined : (g / p.dryMatter) * 1e6;
}

/** Amount per 100 kcal ME, in the nutrient's display unit. */
export function per100kcal(p: Profile, key: NutrientKey): number | undefined {
  const g = p.nutrients[key];
  return g === undefined || p.kcal <= 0 ? undefined : (g / p.kcal) * 100 * NUTRIENTS[key].fromGrams;
}

/** Share of metabolizable energy from a macronutrient (%). */
export function energyPercent(p: Profile, macro: keyof typeof ATWATER): number | undefined {
  const g = p.nutrients[macro];
  return g === undefined || p.atwaterKcal <= 0
    ? undefined
    : ((g * ATWATER[macro]) / p.atwaterKcal) * 100;
}

export function moisturePercent(p: Profile): number | undefined {
  return p.grams > 0 ? (p.water / p.grams) * 100 : undefined;
}

export function calciumPhosphorusRatio(p: Profile): number | undefined {
  const ca = p.nutrients.calcium;
  const ph = p.nutrients.phosphorus;
  return ca === undefined || ph === undefined || ph <= 0 ? undefined : ca / ph;
}

/** Daily amount per kg body weight, in the nutrient's display unit. */
export function perKgBodyWeight(p: Profile, key: NutrientKey, weightKg: number): number | undefined {
  const g = p.nutrients[key];
  return g === undefined || weightKg <= 0 ? undefined : (g / weightKg) * NUTRIENTS[key].fromGrams;
}

export function kcalPerGram(p: Profile): number {
  return p.grams > 0 ? p.kcal / p.grams : 0;
}
