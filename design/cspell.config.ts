// cspell.config.ts · cspell's config over the design project, from its scope
import { cspellConfigOf } from './shared/lint/cspellConfig.ts';
import { scope } from './scope.ts';

export default cspellConfigOf(scope);
