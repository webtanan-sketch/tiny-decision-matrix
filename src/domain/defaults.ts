import type { DecisionMatrixState } from './types';

export const createDefaultDecisionMatrix = (): DecisionMatrixState => ({
  title: 'Supplier selection',
  criteria: [
    {
      id: 'price',
      name: { fa: 'قیمت', en: 'Price' },
      weight: 35,
    },
    {
      id: 'quality',
      name: { fa: 'کیفیت', en: 'Quality' },
      weight: 40,
    },
    {
      id: 'delivery',
      name: { fa: 'زمان تحویل', en: 'Delivery' },
      weight: 25,
    },
  ],
  options: [
    {
      id: 'vendor-a',
      name: 'Vendor A',
      scores: { price: 9, quality: 7, delivery: 6 },
    },
    {
      id: 'vendor-b',
      name: 'Vendor B',
      scores: { price: 7, quality: 9, delivery: 9 },
    },
    {
      id: 'vendor-c',
      name: 'Vendor C',
      scores: { price: 8, quality: 8, delivery: 7 },
    },
  ],
});
