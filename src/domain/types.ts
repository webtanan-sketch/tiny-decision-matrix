export type TinyLocale = 'fa' | 'en';

export interface BilingualLabel {
  fa: string;
  en: string;
}

export interface DecisionCriterion {
  id: string;
  name: BilingualLabel;
  weight: number;
}

export interface DecisionOption {
  id: string;
  name: string;
  scores: Record<string, number>;
}

export interface DecisionMatrixState {
  title: string;
  criteria: DecisionCriterion[];
  options: DecisionOption[];
}

export interface CriterionContribution {
  criterionId: string;
  weight: number;
  score: number;
  weightedValue: number;
}

export interface DecisionOptionResult {
  optionId: string;
  optionName: string;
  weightedScore: number;
  percentage: number;
  rank: number;
  contributions: CriterionContribution[];
}

export interface DecisionMatrixResult {
  totalWeight: number;
  results: DecisionOptionResult[];
  winner: DecisionOptionResult | null;
}
