export type NutrientKey =
  | 'protein'
  | 'fat'
  | 'fiber'
  | 'ash'
  | 'carb'
  | 'phosphorus'
  | 'calcium'
  | 'magnesium'
  | 'sodium'
  | 'potassium'
  | 'taurine'
  | 'iodine';

export interface NutrientMeta {
  label: string;
  /** Unit used for per-100kcal and per-day amounts. */
  unit: 'g' | 'mg' | 'µg';
  /** Multiplier converting grams into `unit`. */
  fromGrams: number;
  /** Unit printed on pet food labels. */
  labelUnit: '%' | 'mg/kg';
}

export const NUTRIENTS: Record<NutrientKey, NutrientMeta> = {
  protein: { label: '단백질', unit: 'g', fromGrams: 1, labelUnit: '%' },
  fat: { label: '지방', unit: 'g', fromGrams: 1, labelUnit: '%' },
  fiber: { label: '섬유', unit: 'g', fromGrams: 1, labelUnit: '%' },
  ash: { label: '회분', unit: 'g', fromGrams: 1, labelUnit: '%' },
  carb: { label: '탄수화물', unit: 'g', fromGrams: 1, labelUnit: '%' },
  phosphorus: { label: '인', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  calcium: { label: '칼슘', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  magnesium: { label: '마그네슘', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  sodium: { label: '나트륨', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  potassium: { label: '칼륨', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  taurine: { label: '타우린', unit: 'mg', fromGrams: 1e3, labelUnit: '%' },
  iodine: { label: '요오드', unit: 'µg', fromGrams: 1e6, labelUnit: 'mg/kg' },
};

export const MACRO_KEYS = ['protein', 'fat', 'fiber', 'ash', 'carb'] as const;
export const MINERAL_KEYS = [
  'phosphorus',
  'calcium',
  'magnesium',
  'sodium',
  'potassium',
  'taurine',
  'iodine',
] as const;

export type OptionalNutrientKey = (typeof MINERAL_KEYS)[number];

/** Label value → grams per 100 g of food as fed. */
export function labelToGramsPer100g(key: NutrientKey, value: number): number {
  return NUTRIENTS[key].labelUnit === 'mg/kg' ? value * 1e-4 : value;
}

/** Modified Atwater factors (kcal ME per gram), NRC 2006 / AAFCO. */
export const ATWATER = { protein: 3.5, fat: 8.5, carb: 3.5 } as const;
