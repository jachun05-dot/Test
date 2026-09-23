import type { ConditionId } from './energy.js';
import type { NutrientKey } from './nutrients.js';

export type Metric =
  | { type: 'per100kcal'; nutrient: NutrientKey }
  | { type: 'dmPpm'; nutrient: NutrientKey }
  | { type: 'energyPct'; macro: 'protein' | 'fat' | 'carb' }
  | { type: 'moisture' }
  | { type: 'caP' }
  /** Daily kcal fed as % of the energy target. Only meaningful for a whole diet. */
  | { type: 'kcalVsTarget' };

export interface Range {
  min?: number;
  max?: number;
}

export interface Rule {
  id: string;
  label: string;
  metric: Metric;
  good: Range;
  /** Wider band that is acceptable with care; outside it is flagged. */
  caution?: Range;
  why: string;
}

export interface Variant {
  id: string;
  label: string;
}

export interface Condition {
  id: ConditionId;
  name: string;
  summary: string;
  variants?: Variant[];
  rules: (variant: string | undefined) => Rule[];
  notes: (variant: string | undefined) => string[];
  sources: string[];
}

const moisture: Rule = {
  id: 'moisture',
  label: '수분',
  metric: { type: 'moisture' },
  good: { min: 70 },
  caution: { min: 40 },
  why: '수분 섭취를 늘리면 신장·요로 부담이 줄어듭니다. 습식 위주 급여가 유리합니다.',
};

/**
 * AAFCO adult maintenance minimums for cats (per 1000 kcal ME, shown per 100 kcal).
 * Applied unless a selected condition sets its own target for the same metric.
 */
export const BASELINE = {
  name: '기본 영양 기준',
  summary: '건강한 성묘 기준 최소 영양 요구량(AAFCO)입니다. 질환 기준이 있는 항목은 질환 기준이 우선합니다.',
  rules: [
    { id: 'protein', label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' }, good: { min: 6.5 }, why: 'AAFCO 최소 65 g/1000kcal' },
    { id: 'fat', label: '지방', metric: { type: 'per100kcal', nutrient: 'fat' }, good: { min: 2.25 }, why: 'AAFCO 최소 22.5 g/1000kcal' },
    { id: 'calcium', label: '칼슘', metric: { type: 'per100kcal', nutrient: 'calcium' }, good: { min: 150 }, why: 'AAFCO 최소 1.5 g/1000kcal' },
    { id: 'phosphorus', label: '인', metric: { type: 'per100kcal', nutrient: 'phosphorus' }, good: { min: 125 }, why: 'AAFCO 최소 1.25 g/1000kcal' },
    { id: 'magnesium', label: '마그네슘', metric: { type: 'per100kcal', nutrient: 'magnesium' }, good: { min: 10 }, why: 'AAFCO 최소 0.1 g/1000kcal' },
    { id: 'sodium', label: '나트륨', metric: { type: 'per100kcal', nutrient: 'sodium' }, good: { min: 50 }, why: 'AAFCO 최소 0.5 g/1000kcal' },
    { id: 'potassium', label: '칼륨', metric: { type: 'per100kcal', nutrient: 'potassium' }, good: { min: 150 }, why: 'AAFCO 최소 1.5 g/1000kcal' },
    { id: 'taurine', label: '타우린', metric: { type: 'per100kcal', nutrient: 'taurine' }, good: { min: 50 }, caution: { min: 25 }, why: 'AAFCO 최소: 건식 25 mg, 습식 50 mg /100kcal' },
    { id: 'caP', label: '칼슘:인 비율', metric: { type: 'caP' }, good: { min: 0.9, max: 1.6 }, caution: { min: 0.7, max: 2.0 }, why: '대략 1:1 ~ 1.5:1 범위가 일반적입니다.' },
  ] satisfies Rule[] as Rule[],
  notes: ['자묘(성장기)는 단백질·칼슘·인 요구량이 더 높습니다.'],
  sources: ['AAFCO Dog and Cat Food Nutrient Profiles — 고양이 성묘 유지 최소 기준'],
};

const CKD_STAGES: Variant[] = [
  { id: '1', label: 'IRIS 1단계' },
  { id: '2', label: 'IRIS 2단계' },
  { id: '3', label: 'IRIS 3단계' },
  { id: '4', label: 'IRIS 4단계' },
];

const ckdPhosphorus: Record<string, Pick<Rule, 'good' | 'caution'>> = {
  '1': { good: { max: 250 }, caution: { max: 350 } },
  '2': { good: { max: 150 }, caution: { max: 250 } },
  '3': { good: { max: 125 }, caution: { max: 175 } },
  '4': { good: { max: 125 }, caution: { max: 175 } },
};

const ckdTargetSerumP: Record<string, string> = {
  '2': '2.7–4.5 mg/dL',
  '3': '2.7–5.0 mg/dL',
  '4': '2.7–6.0 mg/dL',
};

export const CONDITIONS: Condition[] = [
  {
    id: 'ckd',
    name: '만성 신장병 (CKD)',
    summary: '인 제한이 가장 중요하고, 단백질은 적당히, 나트륨은 과하지 않게, 수분은 충분히.',
    variants: CKD_STAGES,
    rules: (stage = '2') => {
      const early = stage === '1';
      const late = stage === '3' || stage === '4';
      return [
        {
          id: 'phosphorus',
          label: '인',
          metric: { type: 'per100kcal', nutrient: 'phosphorus' },
          ...ckdPhosphorus[stage]!,
          why: '인 제한은 CKD 진행을 늦추는 핵심 식이 조절입니다. 양호 범위는 시판 신장 처방식 수준입니다.',
        },
        {
          id: 'protein',
          label: '단백질',
          metric: { type: 'per100kcal', nutrient: 'protein' },
          good: early ? { min: 6.5 } : late ? { min: 6.5, max: 8.5 } : { min: 6.5, max: 9.5 },
          caution: early ? { min: 5.5 } : late ? { min: 5.5, max: 10 } : { min: 5.5, max: 11 },
          why: '과도한 단백질은 요독 물질을 늘리지만, 너무 적으면 근육이 빠집니다.',
        },
        {
          id: 'sodium',
          label: '나트륨',
          metric: { type: 'per100kcal', nutrient: 'sodium' },
          good: { max: early ? 150 : 100 },
          caution: { max: early ? 200 : 150 },
          why: '고나트륨은 고혈압과 신장 손상을 악화시킬 수 있습니다.',
        },
        {
          id: 'potassium',
          label: '칼륨',
          metric: { type: 'per100kcal', nutrient: 'potassium' },
          good: { min: 200 },
          caution: { min: 150 },
          why: 'CKD 고양이는 저칼륨혈증이 흔해 칼륨이 충분해야 합니다.',
        },
        moisture,
      ];
    },
    notes: (stage = '2') => [
      stage === '1'
        ? 'IRIS 1단계는 보통 식이 제한보다 모니터링이 우선이며, 혈중 인이 높으면 인 제한을 시작합니다.'
        : 'IRIS는 2단계부터 신장 처방식 급여를 권장합니다.',
      ...(ckdTargetSerumP[stage] ? [`IRIS 혈중 인 목표치: ${ckdTargetSerumP[stage]}`] : []),
      '식욕이 없을 때는 처방식보다 "먹는 것"이 우선입니다. 굶기지 말고 수의사와 상의하세요.',
      '식이만으로 혈중 인이 조절되지 않으면 인 결합제가 필요할 수 있습니다.',
    ],
    sources: [
      'IRIS Treatment Recommendations for CKD in Cats (2023)',
      '양호 범위 수치: 시판 신장 처방식의 일반적인 성분 범위(인 약 0.3–0.6% DM)',
    ],
  },
  {
    id: 'diabetes',
    name: '당뇨병',
    summary: '고단백·저탄수화물 식이와 일정한 급여량·시간이 핵심입니다.',
    rules: () => [
      {
        id: 'carb',
        label: '탄수화물 칼로리 비율',
        metric: { type: 'energyPct', macro: 'carb' },
        good: { max: 12 },
        caution: { max: 20 },
        why: '저탄수화물 식이는 혈당 조절과 관해(remission) 가능성을 높입니다.',
      },
      {
        id: 'proteinEnergy',
        label: '단백질 칼로리 비율',
        metric: { type: 'energyPct', macro: 'protein' },
        good: { min: 40 },
        caution: { min: 30 },
        why: '고단백 식이는 근육량 유지와 혈당 안정에 도움이 됩니다.',
      },
      {
        id: 'kcal',
        label: '급여 칼로리',
        metric: { type: 'kcalVsTarget' },
        good: { min: 90, max: 110 },
        caution: { min: 80, max: 120 },
        why: '인슐린 용량에 맞춰 매일 비슷한 칼로리를 먹이는 것이 중요합니다.',
      },
    ],
    notes: () => [
      '⚠ 인슐린 투여 중 저탄수 식이로 바꾸면 인슐린 필요량이 급격히 줄어 저혈당이 올 수 있습니다. 반드시 수의사와 상의 후 바꾸세요.',
      '비만이면 감량을 함께 진행합니다.',
    ],
    sources: ['AAHA Diabetes Management Guidelines for Dogs and Cats (2018)'],
  },
  {
    id: 'urinary',
    name: '하부요로질환 / 결석',
    summary: '결석 종류에 따라 조절할 미네랄이 다르고, 공통적으로 수분 섭취가 가장 중요합니다.',
    variants: [
      { id: 'struvite', label: '스트루바이트' },
      { id: 'oxalate', label: '칼슘 옥살레이트' },
      { id: 'fic', label: '특발성 방광염(FIC)' },
    ],
    rules: (type = 'fic') => {
      const rules: Rule[] = [moisture];
      if (type === 'struvite') {
        rules.push(
          { id: 'magnesium', label: '마그네슘', metric: { type: 'per100kcal', nutrient: 'magnesium' }, good: { max: 20 }, caution: { max: 30 }, why: '마그네슘은 스트루바이트 결석의 구성 성분입니다.' },
          { id: 'phosphorus', label: '인', metric: { type: 'per100kcal', nutrient: 'phosphorus' }, good: { max: 250 }, caution: { max: 300 }, why: '인도 스트루바이트 결석의 구성 성분입니다.' },
        );
      }
      if (type === 'oxalate') {
        rules.push({ id: 'calcium', label: '칼슘', metric: { type: 'per100kcal', nutrient: 'calcium' }, good: { max: 250 }, caution: { max: 350 }, why: '과도한 칼슘은 옥살레이트 결석 위험을 높입니다.' });
      }
      return rules;
    },
    notes: (type = 'fic') => [
      '결석 종류는 소변검사·결석 분석으로 확인해야 합니다. 종류에 따라 식이 방향이 반대일 수 있습니다.',
      ...(type === 'struvite' ? ['스트루바이트 용해식은 다른 음식 없이 단독 급여해야 효과가 있습니다.'] : []),
      ...(type === 'oxalate' ? ['칼슘 옥살레이트 결석은 식이로 녹지 않아 수술적 제거가 필요할 수 있습니다.'] : []),
      ...(type === 'fic' ? ['FIC는 스트레스 관리(환경 개선)가 식이만큼 중요합니다.'] : []),
      '목표: 소변 비중을 낮게 유지(고양이 약 1.030 미만).',
    ],
    sources: ['ACVIM Small Animal Consensus: Recommendations for the Treatment and Prevention of Uroliths (2016)'],
  },
  {
    id: 'hyperthyroid',
    name: '갑상선기능항진증',
    summary: '요오드 제한식 치료 중이면 요오드를 엄격히 제한하고, 아니면 체중·근육 회복이 목표입니다.',
    variants: [
      { id: 'standard', label: '약물/방사성요오드 치료' },
      { id: 'iodine', label: '요오드 제한식 치료' },
    ],
    rules: (type = 'standard') =>
      type === 'iodine'
        ? [
            { id: 'iodine', label: '요오드', metric: { type: 'dmPpm', nutrient: 'iodine' }, good: { max: 0.32 }, why: '요오드 제한식은 건물 기준 0.32 mg/kg 이하일 때 효과가 있습니다.' },
          ]
        : [
            { id: 'protein', label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' }, good: { min: 8 }, caution: { min: 6.5 }, why: '갑상선항진증은 근육 소실이 흔해 단백질이 충분해야 합니다.' },
            { id: 'kcal', label: '급여 칼로리', metric: { type: 'kcalVsTarget' }, good: { min: 95, max: 120 }, caution: { min: 85, max: 130 }, why: '빠진 체중을 회복할 만큼 충분히 먹어야 합니다.' },
          ],
    notes: (type = 'standard') => [
      ...(type === 'iodine'
        ? ['요오드 제한식은 간식·다른 사료를 조금만 섞어도 효과가 없어집니다. 단독 급여가 필수입니다.']
        : []),
      '갑상선 치료 후 가려져 있던 신장병이 드러날 수 있으니 신장 수치를 함께 확인하세요.',
    ],
    sources: [
      'Melendez et al. (2011), van der Kooij et al. (2014) — 요오드 제한식 연구',
      'AAHA Management of Hyperthyroidism in Cats (2016)',
    ],
  },
  {
    id: 'obesity',
    name: '비만',
    summary: '이상 체중 기준으로 칼로리를 줄이되, 근육 유지를 위해 단백질은 높게.',
    rules: () => [
      { id: 'kcal', label: '급여 칼로리', metric: { type: 'kcalVsTarget' }, good: { min: 90, max: 105 }, caution: { min: 80, max: 115 }, why: '감량 목표 칼로리(이상 체중 RER × 0.8)에 맞춰야 합니다.' },
      { id: 'protein', label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' }, good: { min: 9 }, caution: { min: 7.5 }, why: '칼로리를 줄여도 단백질 섭취량은 유지해야 근육이 빠지지 않습니다.' },
      { id: 'fat', label: '지방', metric: { type: 'per100kcal', nutrient: 'fat' }, good: { max: 4 }, caution: { max: 5 }, why: '지방은 칼로리 밀도가 높아 감량에 불리합니다.' },
    ],
    notes: () => [
      '감량 속도는 주당 체중의 0.5–2%가 적당합니다.',
      '⚠ 고양이는 갑자기 굶기면 지방간(간 리피도시스)이 올 수 있습니다. 급격한 감량은 피하세요.',
    ],
    sources: ['AAHA Weight Management Guidelines for Dogs and Cats (2014)', 'AAHA Nutrition and Weight Management Guidelines (2021)'],
  },
  {
    id: 'underweight',
    name: '저체중 / 체중 회복',
    summary: '에너지 밀도가 높은 식이로 충분한 칼로리를 먹이는 것이 목표입니다.',
    rules: () => [
      { id: 'kcal', label: '급여 칼로리', metric: { type: 'kcalVsTarget' }, good: { min: 95, max: 120 }, caution: { min: 85, max: 130 }, why: '이상 체중 기준 증량 칼로리를 충분히 먹어야 합니다.' },
      { id: 'protein', label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' }, good: { min: 8 }, caution: { min: 6.5 }, why: '근육 회복에 단백질이 필요합니다.' },
      { id: 'fat', label: '지방', metric: { type: 'per100kcal', nutrient: 'fat' }, good: { min: 4 }, caution: { min: 3 }, why: '지방이 많을수록 적은 양으로 칼로리를 채울 수 있습니다.' },
    ],
    notes: () => ['체중이 빠지는 원인 질환(갑상선, 신장, 당뇨, 종양 등)을 먼저 확인하세요.'],
    sources: ['AAHA Nutrition and Weight Management Guidelines (2021)'],
  },
  {
    id: 'heart',
    name: '심장병 (비대성 심근병증 등)',
    summary: '나트륨은 과하지 않게, 타우린은 충분히, 식욕 유지가 최우선입니다.',
    rules: () => [
      { id: 'sodium', label: '나트륨', metric: { type: 'per100kcal', nutrient: 'sodium' }, good: { max: 100 }, caution: { max: 150 }, why: '고나트륨은 체액 저류를 악화시킬 수 있습니다.' },
      { id: 'taurine', label: '타우린', metric: { type: 'per100kcal', nutrient: 'taurine' }, good: { min: 50 }, caution: { min: 25 }, why: '타우린 결핍은 확장성 심근병증의 원인입니다.' },
      { id: 'potassium', label: '칼륨', metric: { type: 'per100kcal', nutrient: 'potassium' }, good: { min: 150 }, why: '이뇨제 사용 시 칼륨이 부족해질 수 있습니다.' },
    ],
    notes: () => [
      '심장병 고양이는 체중·근육이 빠지기 쉬워(심장 악액질) 잘 먹는 것이 가장 중요합니다.',
      '고염분 간식(사람 음식 등)을 피하세요.',
    ],
    sources: ['ACVIM Consensus Statement: Feline Cardiomyopathies (2020)'],
  },
  {
    id: 'gi',
    name: '만성 소화기 질환 (IBD 등)',
    summary: '소화가 잘 되는 식이가 기본이며, 개체에 따라 지방에 민감할 수 있습니다.',
    rules: () => [
      { id: 'fat', label: '지방', metric: { type: 'per100kcal', nutrient: 'fat' }, good: { max: 6 }, caution: { max: 8 }, why: '일부 고양이는 고지방 식이에서 설사·구토가 심해집니다(개체차 큼).' },
    ],
    notes: () => [
      '가수분해 단백질 식이나 새로운 단백질 식이(한 번도 먹어보지 않은 단백질원)를 시도하기도 합니다.',
      '식이 시험은 보통 8주 이상 다른 음식 없이 진행합니다.',
    ],
    sources: ['WSAVA Global Nutrition Guidelines — 소화기 질환 식이 권고(개체별 반응 차이 큼)'],
  },
  {
    id: 'liver',
    name: '간 질환 / 지방간',
    summary: '충분한 칼로리와 단백질 공급이 치료의 핵심입니다.',
    rules: () => [
      { id: 'kcal', label: '급여 칼로리', metric: { type: 'kcalVsTarget' }, good: { min: 95, max: 115 }, caution: { min: 85, max: 125 }, why: '지방간은 칼로리 섭취 부족이 원인이자 악화 요인입니다.' },
      { id: 'protein', label: '단백질', metric: { type: 'per100kcal', nutrient: 'protein' }, good: { min: 8 }, caution: { min: 6.5 }, why: '간성뇌증이 없다면 단백질을 제한하지 않습니다.' },
    ],
    notes: () => [
      '스스로 먹지 않으면 급여관(튜브) 급식이 필요할 수 있습니다. 즉시 수의사와 상의하세요.',
      '간성뇌증(침 흘림, 이상 행동)이 있으면 단백질 조절이 필요할 수 있습니다.',
    ],
    sources: ['WSAVA Global Nutrition Guidelines', 'Center SA. Feline hepatic lipidosis (Vet Clin North Am, 2005)'],
  },
  {
    id: 'pancreatitis',
    name: '췌장염',
    summary: '빠른 영양 공급 재개가 중요합니다. 고양이는 개와 달리 저지방식의 근거가 제한적입니다.',
    rules: () => [
      { id: 'kcal', label: '급여 칼로리', metric: { type: 'kcalVsTarget' }, good: { min: 90, max: 115 }, caution: { min: 75, max: 125 }, why: '식욕부진이 길어지면 지방간 위험이 있습니다.' },
    ],
    notes: () => [
      '고양이 췌장염은 소화기 질환·담관염과 함께 오는 경우가 많습니다(삼중염).',
      '지방 제한 여부는 개체 반응에 따라 수의사가 판단합니다.',
    ],
    sources: ['Forman MA et al. ACVIM consensus statement on pancreatitis in cats (2021)'],
  },
];

export function getCondition(id: ConditionId): Condition {
  const condition = CONDITIONS.find((c) => c.id === id);
  if (!condition) throw new Error(`Unknown condition: ${id}`);
  return condition;
}

/** Known interactions that a numeric comparison alone would not explain. */
export const INTERACTION_NOTES: { ids: ConditionId[]; note: string }[] = [
  {
    ids: ['ckd', 'diabetes'],
    note: '신장병(단백질 적당히)과 당뇨(고단백·저탄수)는 단백질 방향이 다릅니다. 보통 인 제한을 우선하면서 탄수화물을 낮추는 절충안을 씁니다. 수의사와 우선순위를 정하세요.',
  },
  {
    ids: ['ckd', 'hyperthyroid'],
    note: '갑상선항진증 치료 후 신장 수치가 올라갈 수 있습니다. 두 질환을 함께 모니터링하세요.',
  },
  {
    ids: ['ckd', 'obesity'],
    note: '신장병 식이는 단백질을 제한하지만, 감량 중엔 근육 유지를 위해 단백질이 필요합니다. 감량 속도를 느리게 잡는 경우가 많습니다.',
  },
];
