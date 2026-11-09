/**
 * - `scopeAt` · a repository's scope with nothing named, rooted where a test reads
 */
import type { RepoScope } from '../../shared/repoScope.ts';

const scopeAt = (root: string, named: Partial<RepoScope> = {}): RepoScope => ({
  root,
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
  ...named,
});

export { scopeAt };
