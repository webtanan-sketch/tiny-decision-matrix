import { describe, expect, it } from 'vitest';
import { calculateDecisionMatrix, normalizeOptionScore } from './calculator';
import type { DecisionMatrixState } from './types';

const state: DecisionMatrixState = {
  title: 'Vendor selection',
  criteria: [
    { id: 'price', name: { fa: 'قیمت', en: 'Price' }, weight: 40 },
    { id: 'quality', name: { fa: 'کیفیت', en: 'Quality' }, weight: 60 },
  ],
  options: [
    { id: 'a', name: 'Vendor A', scores: { price: 9, quality: 6 } },
    { id: 'b', name: 'Vendor B', scores: { price: 6, quality: 9 } },
  ],
};

describe('calculateDecisionMatrix', () => {
  it('ranks options using normalized weighted averages', () => {
    const result = calculateDecisionMatrix(state);

    expect(result.totalWeight).toBe(100);
    expect(result.winner?.optionId).toBe('b');
    expect(result.results[0]?.weightedScore).toBeCloseTo(7.8, 5);
    expect(result.results[0]?.percentage).toBeCloseTo(78, 5);
    expect(result.results[1]?.weightedScore).toBeCloseTo(7.2, 5);
  });

  it('clamps scores to the supported zero-to-ten range', () => {
    expect(normalizeOptionScore(12)).toBe(10);
    expect(normalizeOptionScore(-4)).toBe(0);
  });

  it('returns zero scores when total criterion weight is zero', () => {
    const zeroWeight: DecisionMatrixState = {
      ...state,
      criteria: state.criteria.map((criterion) => ({ ...criterion, weight: 0 })),
    };

    const result = calculateDecisionMatrix(zeroWeight);
    expect(result.results.every((option) => option.weightedScore === 0)).toBe(true);
  });
});
