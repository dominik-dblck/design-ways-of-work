// prettier.config.ts · the formatter's options, read off this repository's scope; what it leaves is .prettierignore
import { scope } from './scope.ts';
import { prettierConfigOf } from './shared/lint/prettierConfig.ts';

export default prettierConfigOf(scope);
