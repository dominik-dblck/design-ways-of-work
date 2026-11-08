// eslint.config.ts · the way of working's ESLint over this repository's own code; design/ is linted in a product
import { scope } from './scope.ts';
import { eslintConfig } from './shared/lint/eslintConfig.ts';

export default eslintConfig(scope);
