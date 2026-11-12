/**
 * - `scopeAt` · a repository's scope with nothing named, rooted where a test reads
 */
import type { RepoScope } from '../../shared/repoScope.ts';

const scopeAt = (root: string, named: Partial<RepoScope> = {}): RepoScope => ({
  root,
  backup: { none: 'a test scope' },
  extraRoots: [],
  ignores: [],
  productTrees: [],
  ruleFiles: [],
  namedPaths: { docs: [], roots: [] },
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
  namedWaits: [],
  helpers: { none: 'a test scope' },
  owners: {},
  starts: [],
  names: [],
  nameCases: [],
  typesOnly: [],
  components: [],
  renderers: [],
  generators: [],
  checks: { commit: [], featureEnd: [] },
  runsCode: {},
  tables: [],
  unformatted: {},
  instructions: { skills: [], whole: [], onDemand: [], everyTurn: [] },
  sentences: { code: [], prose: [] },
  spelling: {
    files: [],
    computed: [],
    reviewed: [],
    onPurpose: [],
    alsoIn: [],
  },
  browser: { none: 'a test scope' },
  ...named,
});

export { scopeAt };
