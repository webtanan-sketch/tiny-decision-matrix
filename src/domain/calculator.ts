import type {
  CriterionContribution,
  DecisionMatrixResult,
  DecisionMatrixState,
  DecisionOptionResult,
} from './types';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export const normalizeCriterionWeight = (value: number): number => clamp(value, 0, 100);
export const normalizeOptionScore = (value: number): number => clamp(value, 0, 10);

export function calculateDecisionMatrix(state: DecisionMatrixState): DecisionMatrixResult {
  const criteria = state.criteria.map((criterion) => ({
    ...criterion,
    weight: normalizeCriterionWeight(criterion.weight),
  }));

  const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);

  const unsorted: Omit<DecisionOptionResult, 'rank'>[] = state.options.map((option) => {
    const contributions: CriterionContribution[] = criteria.map((criterion) => {
      const score = normalizeOptionScore(option.scores[criterion.id] ?? 0);
      return {
        criterionId: criterion.id,
        weight: criterion.weight,
        score,
        weightedValue: criterion.weight * score,
      };
    });

    const totalWeightedValue = contributions.reduce(
      (sum, contribution) => sum + contribution.weightedValue,
      0,
    );

    const weightedScore = totalWeight > 0 ? totalWeightedValue / totalWeight : 0;

    return {
      optionId: option.id,
      optionName: option.name,
      weightedScore,
      percentage: weightedScore * 10,
      contributions,
    };
  });

  const sorted = [...unsorted].sort((left, right) => {
    if (right.weightedScore !== left.weightedScore) {
      return right.weightedScore - left.weightedScore;
    }
    return left.optionName.localeCompare(right.optionName);
  });

  const results: DecisionOptionResult[] = sorted.map((result, index) => ({
    ...result,
    rank: index + 1,
  }));

  return {
    totalWeight,
    results,
    winner: results[0] ?? null,
  };
}

export function createId(prefix: string): string {
  const cryptoObject = typeof globalThis !== 'undefined' ? globalThis.crypto : undefined;
  if (cryptoObject?.randomUUID) return `${prefix}-${cryptoObject.randomUUID()}`;
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
