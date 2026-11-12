/**
 * - `knipConfig` · knip from a scope: a file, an export or a type nobody reads
 * - its entries: the scope's, its starts, generators, hooks' runs, the files taken
 * - and the browser tier's face, the files of `shared/e2e/` a product's flows import
 */
import fs from 'node:fs';
import path from 'node:path';
import type { KnipConfig } from 'knip';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import { takenFiles } from '../take/takeRecord.ts';

// `node` or `tsx`, its flags, a quote, the project's own folder named by Claude Code, then the file
const A_RUN =
  /\b(?:node|tsx)(?:\s+--?\S+)*\s+["']?(?:\$\{?CLAUDE_PROJECT_DIR\}?["']?\/)?([\w./-]+\.(?:ts|mts|js|mjs))\b/g;
const SETTINGS = ['settings.json', 'settings.local.json'];
// the root's own files: each tool's config, the scope, and what a product plugs in, where one does
const CONFIGS = [
  '*.config.{ts,mts}',
  'scope.ts',
  'product.ts',
  'productView.ts',
];

// every string a parsed settings file holds: a command, unescaped
function stringsIn(setting: unknown): readonly string[] {
  if (typeof setting === 'string') return [setting];
  return typeof setting === 'object' && setting !== null
    ? Object.values(setting).flatMap(stringsIn)
    : [];
}

// a git hook's lines, each file of .husky/ beside its `_` folder
function gitHookLines(root: string): readonly string[] {
  const folder = path.join(root, '.husky');
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => fs.readFileSync(path.join(folder, entry.name), 'utf8'));
}

// a hook's command runs a file no script names: knip reads no Claude Code settings, nor a git hook's own lines
function hookRuns(root: string): readonly string[] {
  const text = [
    ...SETTINGS.map((name) => path.join(root, '.claude', name))
      .filter((file) => fs.existsSync(file))
      .flatMap((file) => stringsIn(JSON.parse(fs.readFileSync(file, 'utf8')))),
    ...gitHookLines(root),
  ].join('\n');
  return [...new Set([...text.matchAll(A_RUN)].map(([, file]) => file ?? ''))];
}

// knip's settings as an object: its config may also be a function, which a scope never is
type KnipSettings = Exclude<KnipConfig, (...args: readonly never[]) => unknown>;

// the browser tier's face, what a product's flows import, its skills' writer, the take a product's install runs and the user hooks' installer: an entry wherever shared/ is held
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
  .concat(
    'shared/skills/writeE2eSkills.ts',
    'shared/take/takeWow.ts',
    'shared/user-hooks/installUserHooks.ts',
  );

// a file the take wrote is the way of working's: a product judges its own code, never a home's
const takenCode = (root: string): readonly string[] =>
  fs.existsSync(path.join(root, '.git'))
    ? [...takenFiles(root).keys()].filter((file) =>
        /\.(?:ts|tsx|mts)$/.test(file),
      )
    : [];

const knipConfig = (scope: RepoScope): KnipSettings => ({
  entry: [
    ...scope.entries,
    ...takenCode(scope.root),
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
