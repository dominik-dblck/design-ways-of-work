/**
 * - `knipConfig` · knip from a scope: a file, an export or a type nobody reads
 * - its entries: the scope's, what it starts from, its generators, its hooks' runs
 * - and the browser tier's face, the files of `shared/e2e/` a product's flows import
 */
import fs from 'node:fs';
import path from 'node:path';
import type { KnipConfig } from 'knip';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';

// `node` or `tsx`, its flags, a quote, the project's own folder named by Claude Code, then the file
const A_RUN =
  /\b(?:node|tsx)(?:\s+--?\S+)*\s+["']?(?:\$\{?CLAUDE_PROJECT_DIR\}?["']?\/)?([\w./-]+\.(?:ts|mts|js|mjs))\b/g;
const SETTINGS = ['settings.json', 'settings.local.json'];
// the root's own files: each tool's config, the scope, and what a product plugs in, where one does
const CONFIGS = ['*.config.{ts,mts}', 'scope.ts', 'product.ts'];

// every string a parsed settings file holds: a command, unescaped
function stringsIn(setting: unknown): readonly string[] {
  if (typeof setting === 'string') return [setting];
  return typeof setting === 'object' && setting !== null
    ? Object.values(setting).flatMap(stringsIn)
    : [];
}

// a hook's command runs a file no script names: knip reads no Claude Code settings
function hookRuns(root: string): readonly string[] {
  const text = SETTINGS.map((name) => path.join(root, '.claude', name))
    .filter((file) => fs.existsSync(file))
    .flatMap((file) => stringsIn(JSON.parse(fs.readFileSync(file, 'utf8'))))
    .join('\n');
  return [...new Set([...text.matchAll(A_RUN)].map(([, file]) => file ?? ''))];
}

// knip's settings as an object: its config may also be a function, which a scope never is
type KnipSettings = Exclude<KnipConfig, (...args: readonly never[]) => unknown>;

// the browser tier's face, what a product's flows import, its skills' writer and the take a product's install runs: an entry wherever shared/ is held
const BROWSER_FACE = [
  'asserting',
  'clicking',
  'colours',
  'dragging',
  'flowPaths',
  'runCategorisedTests',
  'theDefinitions',
  'theFlowCatalog',
  'theFlowShapes',
  'theRuntime',
  'theScreenSuite',
  'waiting',
]
  .map((name) => `shared/e2e/${name}.ts`)
  .concat('shared/skills/writeE2eSkills.ts', 'shared/take/takeWow.ts');

const knipConfig = (scope: RepoScope): KnipSettings => ({
  entry: [
    ...scope.entries,
    ...BROWSER_FACE,
    ...scope.starts,
    ...scope.generators.map(({ script }) => script),
    ...hookRuns(scope.root),
    ...CONFIGS,
  ],
  project: [...scope.production, ...testsOf(scope), ...CONFIGS],
  ignore: [...scope.ignores, ...scope.productTrees, ...scope.generated],
  // the way of working, which a product's install takes by path, and ls-lint, which runFileLint runs by its binary's path: no import names either
  ignoreDependencies: ['design-ways-of-work', '@ls-lint/ls-lint'],
});

export { knipConfig };
