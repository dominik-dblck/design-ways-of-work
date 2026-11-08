// eslint.config.ts · the way of working's ESLint over this repository's own code; design/ is linted in a product
import { eslintConfig } from './shared/lint/eslintConfig.ts';

export default eslintConfig({
  root: import.meta.dirname,
  ignores: [
    'node_modules/**',
    '.rehearsal/**',
    'design/**',
    'dev/**',
    'shared/rules/**',
    'legacy/**',
  ],
  production: ['scripts/**/*.ts', 'shared/**/*.ts', 'design-system/**/*.ts'],
  generated: [],
  react: [],
  entries: [],
  parts: [],
});
