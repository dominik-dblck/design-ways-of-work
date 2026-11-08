/**
 * - `scopeAt` · a repository's scope with nothing named, rooted where a test reads
 */
import type { RepoScope } from '../../shared/repoScope.ts';

const scopeAt = (root: string, named: Partial<RepoScope> = {}): RepoScope => ({
  root,
  ignores: [],
  production: [],
  generated: [],
  react: [],
  entries: [],
  parts: [],
  mutable: {},
  families: [],
  brands: [],
  words: [],
  markup: [],
  barrels: [],
  tests: [],
  owners: {},
  starts: [],
  names: [],
  typesOnly: [],
  components: [],
  renderers: [],
  generators: [],
  instructions: { skills: [], whole: [], onDemand: [], everyTurn: [] },
  sentences: { code: [], prose: [] },
  ...named,
});

export { scopeAt };
