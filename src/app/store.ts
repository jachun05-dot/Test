import type { Cat, FoodLabel } from '../nutrition/index.js';

export interface DietRow {
  foodId: string;
  /** Share of daily calories (%) when the plan is in "share" mode. */
  share: number;
  /** Grams per day when the plan is in "grams" mode. */
  grams: number;
}

export interface DietPlan {
  mode: 'share' | 'grams';
  meals: number;
  rows: DietRow[];
}

export interface LogEntry {
  id: string;
  catId: string;
  date: string;
  weightKg: number;
  kcal: number;
  targetKcal: number;
  items: { name: string; grams: number }[];
  note?: string;
}

export type StoredCat = Cat & { example?: boolean };
export type StoredFood = FoodLabel & { example?: boolean };

export interface State {
  version: 1;
  cats: StoredCat[];
  foods: StoredFood[];
  diets: Record<string, DietPlan>;
  logs: LogEntry[];
  activeCatId?: string;
}

const STORAGE_KEY = 'nyang-diet:v1';

function exampleState(): State {
  const catId = 'example-cat';
  return {
    version: 1,
    activeCatId: catId,
    cats: [
      {
        id: catId,
        example: true,
        name: '예시) 나비',
        weightKg: 4.2,
        ageMonths: 156,
        neutered: true,
        bcs: 4,
        goal: 'auto',
        conditions: [{ id: 'ckd', variant: '2' }],
      },
    ],
    foods: [
      {
        id: 'example-renal-wet',
        example: true,
        source: 'user',
        name: '예시) 신장 케어 습식',
        type: 'wet',
        moisture: 78,
        protein: 8.5,
        fat: 6,
        fiber: 0.5,
        ash: 1.2,
        phosphorus: 0.12,
        calcium: 0.18,
        magnesium: 0.015,
        sodium: 0.08,
        potassium: 0.22,
        taurine: 0.06,
        kcalPerKg: 1050,
      },
      {
        id: 'example-adult-dry',
        example: true,
        source: 'user',
        name: '예시) 일반 성묘 건식',
        type: 'dry',
        moisture: 10,
        protein: 34,
        fat: 15,
        fiber: 3,
        ash: 7.5,
        phosphorus: 1.1,
        calcium: 1.3,
        magnesium: 0.1,
        sodium: 0.45,
        potassium: 0.8,
        taurine: 0.2,
        kcalPerKg: 3900,
      },
      {
        id: 'example-lowcarb-wet',
        example: true,
        source: 'user',
        name: '예시) 저탄수 습식',
        type: 'wet',
        moisture: 80,
        protein: 12,
        fat: 5,
        fiber: 0.8,
        ash: 2,
        phosphorus: 0.3,
        kcalPerKg: 950,
      },
    ],
    diets: {
      [catId]: {
        mode: 'share',
        meals: 3,
        rows: [
          { foodId: 'example-renal-wet', share: 80, grams: 0 },
          { foodId: 'example-adult-dry', share: 20, grams: 0 },
        ],
      },
    },
    logs: [],
  };
}

function isState(value: unknown): value is State {
  const v = value as State | null;
  return !!v && v.version === 1 && Array.isArray(v.cats) && Array.isArray(v.foods) && Array.isArray(v.logs);
}

export function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isState(parsed)) return { ...parsed, diets: parsed.diets ?? {} };
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data); fall back to examples.
  }
  return exampleState();
}

export function saveState(state: State): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function exportState(state: State): string {
  return JSON.stringify(state, null, 2);
}

export function importState(text: string): State {
  const parsed: unknown = JSON.parse(text);
  if (!isState(parsed)) throw new Error('백업 형식이 아닙니다. "데이터 백업"에서 복사한 내용을 그대로 붙여넣어 주세요.');
  return { ...parsed, diets: parsed.diets ?? {} };
}

export function resetToExamples(): State {
  return exampleState();
}
