import moduleManifest from '../../module.manifest';

export { moduleManifest };
export { DecisionMatrixWorkspace } from '../components/DecisionMatrixWorkspace';
export type { DecisionMatrixWorkspaceProps } from '../components/DecisionMatrixWorkspace';
export { calculateDecisionMatrix, createId } from '../domain/calculator';
export { createDefaultDecisionMatrix } from '../domain/defaults';
export type {
  BilingualLabel,
  CriterionContribution,
  DecisionCriterion,
  DecisionMatrixResult,
  DecisionMatrixState,
  DecisionOption,
  DecisionOptionResult,
  TinyLocale,
} from '../domain/types';

export interface TinyDecisionMatrixStoragePort {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}

export interface TinyDecisionMatrixDatePort {
  format(value: string | Date, locale: 'fa' | 'en', style?: 'short' | 'long'): string;
}

export interface TinyDecisionMatrixModuleContext {
  locale: 'fa' | 'en';
  direction: 'rtl' | 'ltr';
  storage: TinyDecisionMatrixStoragePort;
  date: TinyDecisionMatrixDatePort;
}

export function createTinyManagerModule() {
  let context: TinyDecisionMatrixModuleContext | null = null;

  return {
    manifest: moduleManifest,

    initialize(nextContext: TinyDecisionMatrixModuleContext) {
      context = nextContext;
    },

    getContext(): TinyDecisionMatrixModuleContext {
      if (!context) {
        throw new Error('Tiny Decision Matrix module has not been initialized.');
      }
      return context;
    },

    dispose() {
      context = null;
    },
  };
}
