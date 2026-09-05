import { Github, Languages, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DecisionMatrixWorkspace } from '../components/DecisionMatrixWorkspace';
import { calculateDecisionMatrix } from '../domain/calculator';
import { createDefaultDecisionMatrix } from '../domain/defaults';
import type { DecisionMatrixState, TinyLocale } from '../domain/types';

const STATE_KEY = 'tiny-decision-matrix.state.v1';
const LOCALE_KEY = 'tiny-decision-matrix.locale';
const THEME_KEY = 'tiny-decision-matrix.theme';

type Theme = 'light' | 'dark';

const loadState = (): DecisionMatrixState => {
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return createDefaultDecisionMatrix();
    const parsed = JSON.parse(raw) as Partial<DecisionMatrixState>;
    if (!Array.isArray(parsed.criteria) || !Array.isArray(parsed.options)) {
      return createDefaultDecisionMatrix();
    }
    return {
      title: typeof parsed.title === 'string' ? parsed.title : '',
      criteria: parsed.criteria,
      options: parsed.options,
    };
  } catch {
    return createDefaultDecisionMatrix();
  }
};

const loadLocale = (): TinyLocale =>
  window.localStorage.getItem(LOCALE_KEY) === 'en' ? 'en' : 'fa';

const loadTheme = (): Theme =>
  window.localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';

function App() {
  const [locale, setLocale] = useState<TinyLocale>(loadLocale);
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [matrix, setMatrix] = useState<DecisionMatrixState>(loadState);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
    window.localStorage.setItem(LOCALE_KEY, locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(matrix));
  }, [matrix]);

  const exportJson = () => {
    const payload = {
      schema: 'tiny-decision-matrix',
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      matrix,
      result: calculateDecisionMatrix(matrix),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'tiny-decision-matrix.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tdm-standalone-shell">
      <header className="tdm-standalone-topbar">
        <a className="tdm-standalone-brand" href="https://github.com/webtanan-sketch/tinymanager" target="_blank" rel="noreferrer">
          <span className="tdm-mini-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>
            <strong>TinyManager</strong>
            <small>Decision Matrix</small>
          </span>
        </a>

        <div className="tdm-standalone-actions">
          <a
            className="tdm-shell-icon-button"
            href="https://github.com/webtanan-sketch/tiny-decision-matrix"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <Github size={18} />
          </a>
          <button
            className="tdm-shell-icon-button"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={locale === 'fa' ? 'تغییر پوسته' : 'Toggle theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="tdm-shell-language-button"
            type="button"
            onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')}
          >
            <Languages size={17} />
            {locale === 'fa' ? 'EN' : 'فا'}
          </button>
        </div>
      </header>

      <main className="tdm-standalone-content">
        <DecisionMatrixWorkspace
          locale={locale}
          value={matrix}
          onChange={setMatrix}
          onExport={exportJson}
        />
      </main>

      <footer className="tdm-standalone-footer">
        <span>TinyManager · Small tools. Better management.</span>
        <span>v0.1.0-alpha.1</span>
      </footer>
    </div>
  );
}

export default App;
