// scope.ts · the way of working's preset, and what this product names of its own
import type { RepoScope } from './shared/repoScope.ts';
import { SCOPE_PRESET } from './tools/scopePreset.ts';

const scope: RepoScope = {
  ...SCOPE_PRESET,
  backup: { none: 'a sample: nothing of it is kept' },
  browser: { none: 'a sample: no page of its own is run' },
};

export { scope };
