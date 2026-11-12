// eslint.config.ts · the way of working's ESLint over the design project's TypeScript
import { scope } from './scope.ts';
import { eslintConfig } from './shared/lint/eslintConfig.ts';

export default eslintConfig(scope);
