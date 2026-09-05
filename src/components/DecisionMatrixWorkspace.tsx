import {
  Download,
  Plus,
  RotateCcw,
  Scale,
  Trash2,
  Trophy,
} from 'lucide-react';
import { useMemo } from 'react';
import {
  calculateDecisionMatrix,
  createId,
  normalizeCriterionWeight,
  normalizeOptionScore,
} from '../domain/calculator';
import { createDefaultDecisionMatrix } from '../domain/defaults';
import type {
  DecisionCriterion,
  DecisionMatrixState,
  DecisionOption,
  TinyLocale,
} from '../domain/types';
import '../styles.css';

export interface DecisionMatrixWorkspaceProps {
  locale: TinyLocale;
  value: DecisionMatrixState;
  onChange(value: DecisionMatrixState): void;
  onExport?(): void;
}

const copy = {
  fa: {
    title: 'ماتریس تصمیم',
    subtitle: 'گزینه‌ها را با معیارهای وزن‌دار مقایسه کن و نتیجه را شفاف ببین.',
    decisionTitle: 'عنوان تصمیم',
    criteria: 'معیارها',
    options: 'گزینه‌ها',
    weight: 'وزن',
    score: 'امتیاز',
    addCriterion: 'افزودن معیار',
    addOption: 'افزودن گزینه',
    results: 'نتیجه',
    winner: 'پیشنهاد اول',
    totalWeight: 'جمع وزن‌ها',
    export: 'خروجی JSON',
    reset: 'بازنشانی نمونه',
    remove: 'حذف',
    criterionName: 'نام معیار',
    optionName: 'نام گزینه',
    noCriteria: 'حداقل یک معیار اضافه کن.',
    noOptions: 'حداقل یک گزینه اضافه کن.',
    weightHint: 'بهتر است جمع وزن معیارها ۱۰۰ باشد؛ محاسبه در هر صورت نرمال می‌شود.',
    points: 'از ۱۰',
    rank: 'رتبه',
  },
  en: {
    title: 'Decision Matrix',
    subtitle: 'Compare options with weighted criteria and make the result explainable.',
    decisionTitle: 'Decision title',
    criteria: 'Criteria',
    options: 'Options',
    weight: 'Weight',
    score: 'Score',
    addCriterion: 'Add criterion',
    addOption: 'Add option',
    results: 'Results',
    winner: 'Top recommendation',
    totalWeight: 'Total weight',
    export: 'Export JSON',
    reset: 'Reset sample',
    remove: 'Remove',
    criterionName: 'Criterion name',
    optionName: 'Option name',
    noCriteria: 'Add at least one criterion.',
    noOptions: 'Add at least one option.',
    weightHint: 'A total weight of 100 is recommended; scoring is normalized either way.',
    points: 'out of 10',
    rank: 'Rank',
  },
} as const;

export function DecisionMatrixWorkspace({
  locale,
  value,
  onChange,
  onExport,
}: DecisionMatrixWorkspaceProps) {
  const t = copy[locale];
  const result = useMemo(() => calculateDecisionMatrix(value), [value]);

  const updateCriterion = (id: string, patch: Partial<DecisionCriterion>) => {
    onChange({
      ...value,
      criteria: value.criteria.map((criterion) =>
        criterion.id === id ? { ...criterion, ...patch } : criterion,
      ),
    });
  };

  const updateOption = (id: string, patch: Partial<DecisionOption>) => {
    onChange({
      ...value,
      options: value.options.map((option) =>
        option.id === id ? { ...option, ...patch } : option,
      ),
    });
  };

  const updateScore = (optionId: string, criterionId: string, score: number) => {
    const option = value.options.find((item) => item.id === optionId);
    if (!option) return;
    updateOption(optionId, {
      scores: {
        ...option.scores,
        [criterionId]: normalizeOptionScore(score),
      },
    });
  };

  const addCriterion = () => {
    const index = value.criteria.length + 1;
    const id = createId('criterion');
    onChange({
      ...value,
      criteria: [
        ...value.criteria,
        {
          id,
          name: { fa: `معیار ${index}`, en: `Criterion ${index}` },
          weight: 10,
        },
      ],
      options: value.options.map((option) => ({
        ...option,
        scores: { ...option.scores, [id]: 5 },
      })),
    });
  };

  const removeCriterion = (id: string) => {
    onChange({
      ...value,
      criteria: value.criteria.filter((criterion) => criterion.id !== id),
      options: value.options.map((option) => {
        const scores = { ...option.scores };
        delete scores[id];
        return { ...option, scores };
      }),
    });
  };

  const addOption = () => {
    const index = value.options.length + 1;
    const scores = Object.fromEntries(value.criteria.map((criterion) => [criterion.id, 5]));
    onChange({
      ...value,
      options: [
        ...value.options,
        {
          id: createId('option'),
          name: locale === 'fa' ? `گزینه ${index}` : `Option ${index}`,
          scores,
        },
      ],
    });
  };

  const removeOption = (id: string) => {
    onChange({ ...value, options: value.options.filter((option) => option.id !== id) });
  };

  return (
    <div className="tdm-workspace" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <header className="tdm-heading">
        <div className="tdm-heading-icon"><Scale size={22} /></div>
        <div className="tdm-heading-copy">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="tdm-heading-actions">
          <button type="button" className="tdm-button tdm-button-ghost" onClick={() => onChange(createDefaultDecisionMatrix())}>
            <RotateCcw size={16} />
            {t.reset}
          </button>
          {onExport && (
            <button type="button" className="tdm-button tdm-button-primary" onClick={onExport}>
              <Download size={16} />
              {t.export}
            </button>
          )}
        </div>
      </header>

      <label className="tdm-title-field">
        <span>{t.decisionTitle}</span>
        <input
          value={value.title}
          onChange={(event) => onChange({ ...value, title: event.target.value })}
          placeholder={t.decisionTitle}
        />
      </label>

      <div className="tdm-layout">
        <main className="tdm-editor">
          <section className="tdm-panel">
            <div className="tdm-panel-heading">
              <div>
                <span className="tdm-kicker">01</span>
                <h2>{t.criteria}</h2>
              </div>
              <button type="button" className="tdm-button tdm-button-soft" onClick={addCriterion}>
                <Plus size={16} />
                {t.addCriterion}
              </button>
            </div>

            {value.criteria.length === 0 ? (
              <div className="tdm-empty">{t.noCriteria}</div>
            ) : (
              <div className="tdm-criteria-list">
                {value.criteria.map((criterion) => (
                  <div className="tdm-criterion-row" key={criterion.id}>
                    <label className="tdm-field tdm-field-grow">
                      <span>{t.criterionName}</span>
                      <input
                        value={criterion.name[locale]}
                        onChange={(event) =>
                          updateCriterion(criterion.id, {
                            name: { ...criterion.name, [locale]: event.target.value },
                          })
                        }
                      />
                    </label>
                    <label className="tdm-field tdm-weight-field">
                      <span>{t.weight}</span>
                      <div className="tdm-number-input">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="1"
                          value={criterion.weight}
                          onChange={(event) =>
                            updateCriterion(criterion.id, {
                              weight: normalizeCriterionWeight(Number(event.target.value)),
                            })
                          }
                        />
                        <b>%</b>
                      </div>
                    </label>
                    <button
                      type="button"
                      className="tdm-icon-button tdm-danger-button"
                      aria-label={t.remove}
                      title={t.remove}
                      onClick={() => removeCriterion(criterion.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className={`tdm-weight-summary${result.totalWeight === 100 ? ' is-balanced' : ''}`}>
              <span>{t.totalWeight}</span>
              <strong>{result.totalWeight.toFixed(0)}%</strong>
              <small>{t.weightHint}</small>
            </div>
          </section>

          <section className="tdm-panel">
            <div className="tdm-panel-heading">
              <div>
                <span className="tdm-kicker">02</span>
                <h2>{t.options}</h2>
              </div>
              <button type="button" className="tdm-button tdm-button-soft" onClick={addOption}>
                <Plus size={16} />
                {t.addOption}
              </button>
            </div>

            {value.options.length === 0 ? (
              <div className="tdm-empty">{t.noOptions}</div>
            ) : (
              <div className="tdm-options-scroll">
                <table className="tdm-table">
                  <thead>
                    <tr>
                      <th>{t.optionName}</th>
                      {value.criteria.map((criterion) => (
                        <th key={criterion.id}>
                          <span>{criterion.name[locale]}</span>
                          <small>{criterion.weight}%</small>
                        </th>
                      ))}
                      <th aria-label={t.remove} />
                    </tr>
                  </thead>
                  <tbody>
                    {value.options.map((option) => (
                      <tr key={option.id}>
                        <td>
                          <input
                            className="tdm-table-name"
                            value={option.name}
                            onChange={(event) => updateOption(option.id, { name: event.target.value })}
                          />
                        </td>
                        {value.criteria.map((criterion) => (
                          <td key={criterion.id}>
                            <input
                              className="tdm-score-input"
                              type="number"
                              min="0"
                              max="10"
                              step="0.5"
                              aria-label={`${t.score}: ${criterion.name[locale]}`}
                              value={normalizeOptionScore(option.scores[criterion.id] ?? 0)}
                              onChange={(event) =>
                                updateScore(option.id, criterion.id, Number(event.target.value))
                              }
                            />
                          </td>
                        ))}
                        <td>
                          <button
                            type="button"
                            className="tdm-icon-button tdm-danger-button"
                            aria-label={t.remove}
                            title={t.remove}
                            onClick={() => removeOption(option.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>

        <aside className="tdm-results-panel">
          <div className="tdm-results-heading">
            <span className="tdm-kicker">03</span>
            <h2>{t.results}</h2>
          </div>

          {result.winner ? (
            <div className="tdm-winner-card">
              <div className="tdm-trophy"><Trophy size={22} /></div>
              <span>{t.winner}</span>
              <strong>{result.winner.optionName}</strong>
              <div className="tdm-winner-score">
                {result.winner.weightedScore.toFixed(2)} <small>{t.points}</small>
              </div>
            </div>
          ) : (
            <div className="tdm-empty">{t.noOptions}</div>
          )}

          <div className="tdm-ranking">
            {result.results.map((option) => (
              <article className="tdm-rank-row" key={option.optionId}>
                <div className="tdm-rank-number">{option.rank}</div>
                <div className="tdm-rank-content">
                  <div className="tdm-rank-title">
                    <strong>{option.optionName}</strong>
                    <span>{option.weightedScore.toFixed(2)}</span>
                  </div>
                  <div className="tdm-progress" aria-label={`${option.percentage.toFixed(0)}%`}>
                    <span style={{ width: `${Math.max(0, Math.min(100, option.percentage))}%` }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default DecisionMatrixWorkspace;
