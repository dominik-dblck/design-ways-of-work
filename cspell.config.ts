// cspell.config.ts · cspell's config, from this repository's scope
import { cspellConfigOf } from './shared/lint/cspellConfig.ts';
import { scope } from './scope.ts';

export default cspellConfigOf(scope);
