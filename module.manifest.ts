export const moduleManifest = {
  id: 'tiny-decision-matrix',
  version: '0.1.0-alpha.1',
  name: {
    fa: 'ماتریس تصمیم',
    en: 'Decision Matrix',
  },
  description: {
    fa: 'مقایسه گزینه‌ها با معیارهای وزن‌دار و رتبه‌بندی شفاف.',
    en: 'Compare options using weighted criteria and transparent ranking.',
  },
  icon: 'Scale',
  route: '/modules/decision-matrix',
  repository: 'https://github.com/webtanan-sketch/tiny-decision-matrix',
  category: 'decisions',
  maturity: 'alpha',
  capabilities: {
    dashboardWidget: true,
    globalSearch: false,
    exportData: true,
    sharedPeople: false,
    sharedProjects: true,
    notifications: false,
  },
} as const;

export default moduleManifest;
