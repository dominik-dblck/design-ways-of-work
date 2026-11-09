/**
 * - every row of the scope's `ruleFiles` names a gate that runs: a tier or a hook
 * - a rule file holds at most 200 lines; a known shortfall only shrinks
 */
import { ESLint } from 'eslint';
import type { Linter } from 'eslint';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { scope } from '../../scope.ts';
import { COMMIT, FEATURE_END } from '../checkTiers.ts';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import { heldToItsBaseline } from './baseline.ts';
import { filesNamedBy, globsNamingNothing } from './globs.ts';
import { linesIn } from './textSize.ts';

interface Table {
  readonly path: string;
  readonly text: string;
}

// what runs in a repository: ESLint's rules switched on, its linter options, its tests, its scripts
interface World {
  readonly eslintRules: ReadonlySet<string>;
  readonly lintOptions: ReadonlySet<string>;
  readonly testNames: ReadonlySet<string>;
  readonly scripts: ReadonlySet<string>;
}

const LONGEST = 200;
const THE_HEAD = /^\|\s*Rule\s*\|\s*Gate\s*\|\s*Exceptions\s*\|\s*Why\s*\|$/;
const A_TOKEN = /`([^`]+)`/;
const A_SOURCE = /\.tsx?$/;
// a test's name, as its file and a gate both write it: `x.test`, `x.test-d`, or `x`
const A_TEST_SUFFIX = /\.test(?:-d)?$/;
const A_SCRIPT = /^yarn /;
const NO_GATE = new Set(['', '—']);

// a row of a rule table: its rule's text, which names it, and its gate cell
interface Row {
  readonly rule: string;
  readonly gate: string;
}

// the rows of a file's one rule table
function rowsOf(text: string): readonly Row[] {
  const lines = text.split('\n');
  const start = lines.findIndex((line) => THE_HEAD.test(line.trim()));
  if (start === -1) return [];
  const rows: Row[] = [];
  for (const line of lines.slice(start + 2)) {
    if (!line.startsWith('|')) break;
    const cells = line.split(/(?<!\\)\|/);
    rows.push({ rule: cells[1]?.trim() ?? '', gate: cells[2]?.trim() ?? '' });
  }
  return rows;
}

// a segment's gate by its first backticked name, a bracketed note aside
const tokenOf = (segment: string): string | undefined =>
  A_TOKEN.exec(segment.replace(/\([^)]*\)/g, ''))?.[1];

// a gate cell's segment, and the name it gives its gate
interface Gate {
  readonly segment: string;
  readonly token: string;
}

// whether a segment's gate runs in the world: an ESLint rule or a plugin's (`plugin/*`), an option, a script, a test
function holds({ segment, token }: Gate, world: World): boolean {
  if (token === 'review') return true;
  if (segment.trim().startsWith('ESLint'))
    return [...world.eslintRules].some(
      (rule) =>
        rule === token ||
        rule.endsWith(`/${token}`) ||
        (token.endsWith('/*') && rule.startsWith(token.slice(0, -1))),
    );
  if (token.includes(': '))
    return world.lintOptions.has(token.split(':')[0] ?? '');
  return (
    world.scripts.has(token.replace(A_SCRIPT, '')) ||
    world.testNames.has(token.replace(A_TEST_SUFFIX, ''))
  );
}

// each gate that runs nothing and each row with none, by its row's rule; a file past its lines; never a count
function shortfallOf(table: Table, world: World): readonly string[] {
  const gates = rowsOf(table.text).flatMap(({ rule, gate }) => {
    const row = `${table.path} · ${rule}`;
    return NO_GATE.has(gate)
      ? [`${row} · no gate`]
      : gate.split(' · ').flatMap((segment) => {
          const token = tokenOf(segment);
          if (token === undefined) return [`${row} · names nothing`];
          return holds({ segment, token }, world) ? [] : [`${row} · ${token}`];
        });
  });
  const long =
    linesIn(table.text) > LONGEST
      ? [`${table.path} · over ${String(LONGEST)} lines`]
      : [];
  return [...new Set([...gates, ...long])];
}

// a script a git hook runs by name: `yarn -s lint:commit` in `commit-msg`
const A_HOOKED_SCRIPT = /\byarn (?:-s )?([\w:-]+)/g;

// the scripts that run with no one typing them: each tier's, and each a git hook names; one a person types is no gate
function scriptsThatRun(tree: RepoScope): readonly string[] {
  const hooks = path.join(tree.root, '.husky');
  const hooked = fs.existsSync(hooks)
    ? fs
        .readdirSync(hooks, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .flatMap((entry) => [
          ...fs
            .readFileSync(path.join(hooks, entry.name), 'utf8')
            .matchAll(A_HOOKED_SCRIPT),
        ])
        .flatMap(([, script]) => (script === undefined ? [] : [script]))
    : [];
  return [
    ...[...COMMIT, ...FEATURE_END].map((check) => check.script),
    ...tree.checks.commit,
    ...tree.checks.featureEnd,
    ...hooked,
  ];
}

const isOn = (setting: unknown): boolean => {
  const level: unknown = Array.isArray(setting) ? setting[0] : setting;
  return level !== 0 && level !== 'off' && level !== false;
};

// what runs, read off the tree: ESLint's config for every file it lints, so a rule on in one folder counts
async function worldOf(tree: RepoScope): Promise<World> {
  const eslint = new ESLint({ cwd: tree.root });
  const tests = filesNamedBy(tree, testsOf(tree));
  // each list on its own, so a `!` of one never takes another's files away
  const linted = [
    ...new Set(
      [tree.production, tree.react, testsOf(tree)].flatMap((globs) =>
        filesNamedBy(tree, globs),
      ),
    ),
  ];
  // an ignored file has no config
  const configs: readonly (Linter.Config | undefined)[] = await Promise.all(
    linted.map((file) => eslint.calculateConfigForFile(file)),
  );
  const found = configs.filter((one) => one !== undefined);
  const packageJson: { readonly scripts?: Readonly<Record<string, string>> } =
    JSON.parse(fs.readFileSync(path.join(tree.root, 'package.json'), 'utf8'));
  return {
    eslintRules: new Set(
      found.flatMap((one) =>
        Object.entries(one.rules ?? {}).flatMap(([rule, setting]) =>
          isOn(setting) ? [rule] : [],
        ),
      ),
    ),
    lintOptions: new Set(
      found.flatMap((one) =>
        Object.entries(one.linterOptions ?? {}).flatMap(([key, setting]) =>
          isOn(setting) ? [key] : [],
        ),
      ),
    ),
    testNames: new Set(
      tests
        .map((file) => path.posix.basename(file).replace(A_SOURCE, ''))
        .filter((name) => A_TEST_SUFFIX.test(name))
        .map((name) => name.replace(A_TEST_SUFFIX, '')),
    ),
    scripts: new Set(
      scriptsThatRun(tree).filter(
        (script) => packageJson.scripts?.[script] !== undefined,
      ),
    ),
  };
}

describe('every rule has a gate that runs', () => {
  const world: World = {
    eslintRules: new Set(['max-lines', 'wow/one-home-per-name']),
    lintOptions: new Set(['reportUnusedDisableDirectives']),
    testNames: new Set(['aFileStatesItsJob']),
    scripts: new Set(['tsc']),
  };
  const table = (...gates: readonly string[]): Table => ({
    path: 'docs/rules/planted.md',
    text: [
      '| Rule | Gate | Exceptions | Why |',
      '| - | - | - | - |',
      ...gates.map(
        (gate, at) => `| rule ${String(at + 1)} | ${gate} | — | why |`,
      ),
    ].join('\n'),
  });

  it('each kind of gate that runs passes; one that runs nothing, a row with none, a long file are found', () => {
    expect(
      shortfallOf(
        table(
          '`aFileStatesItsJob` · `review`',
          '`aFileStatesItsJob.test` (its suffix)',
          'ESLint `max-lines` · ESLint `one-home-per-name`',
          'ESLint (in `app/`) `max-lines`',
          '`tsc` (pre-commit) · `yarn tsc`',
          '`reportUnusedDisableDirectives: "error"`',
          'ESLint `no-console`',
          '`gone` (a note)',
          'a person',
          '—',
          '',
        ),
        world,
      ),
    ).toEqual([
      'docs/rules/planted.md · rule 7 · no-console',
      'docs/rules/planted.md · rule 8 · gone',
      'docs/rules/planted.md · rule 9 · names nothing',
      'docs/rules/planted.md · rule 10 · no gate',
      'docs/rules/planted.md · rule 11 · no gate',
    ]);
    const long = {
      path: 'docs/rules/long.md',
      text: `${table('`review`').text}\n${'\n'.repeat(LONGEST)}`,
    };
    expect(shortfallOf(long, world)).toEqual([
      `docs/rules/long.md · over ${String(LONGEST)} lines`,
    ]);
  });

  it('a table of another head, as an outro holds, is no rule table', () => {
    expect(rowsOf('| Script | Command |\n| - | - |\n| a | b |')).toEqual([]);
  });

  it('what runs is read off every file ESLint lints, and a script when a tier or a git hook runs it', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-gates-'));
    const planted: Readonly<Record<string, string>> = {
      'eslint.config.mjs': [
        'export default [',
        "  { ignores: ['ignored/**'] },",
        "  { files: ['**/*.ts'], rules: { 'no-debugger': 'off' } },",
        "  { files: ['**/*.ts'], linterOptions: { reportUnusedDisableDirectives: 'error' } },",
        "  { files: ['sub/**/*.ts'], rules: { 'no-console': 'error' } },",
        "  { files: ['tests/**/*.ts'], rules: { 'no-alert': 'error' } },",
        '];',
      ].join('\n'),
      'package.json':
        '{ "scripts": { "check": "x", "tsc": "x", "hooked": "x", "typed": "x" } }',
      '.husky/commit-msg': 'yarn -s hooked --edit "$1"',
      'a.ts': '',
      'sub/b.ts': '',
      'ignored/d.ts': '',
      'tests/c.test.ts': '',
    };
    for (const [file, text] of Object.entries(planted)) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), text);
    }
    try {
      // production leaves the tests out by its own `!`: the tests' list still reads them
      const world = await worldOf({
        ...scope,
        root,
        ignores: [],
        productTrees: [],
        production: ['**/*.ts', '!tests/**'],
        react: [],
        tests: [],
        checks: { commit: ['check'], featureEnd: [] },
      });
      expect(world).toEqual({
        eslintRules: new Set(['no-console', 'no-alert']),
        lintOptions: new Set(['reportUnusedDisableDirectives']),
        testNames: new Set(['c']),
        // `tsc` a tier's, `check` the scope's, `hooked` a hook's; `typed` only a person runs
        scripts: new Set(['tsc', 'check', 'hooked']),
      });
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('every glob of the scope names a rule file', () => {
    expect(globsNamingNothing(scope, scope.ruleFiles)).toEqual([]);
  });

  it('every rule of the scope names a gate that runs, beyond its baseline', async () => {
    const world = await worldOf(scope);
    const shortfall = filesNamedBy(scope, scope.ruleFiles).flatMap((file) =>
      shortfallOf(
        {
          path: file,
          text: fs.readFileSync(path.join(scope.root, file), 'utf8'),
        },
        world,
      ),
    );
    expect(heldToItsBaseline('everyRuleHasAGate', shortfall)).toEqual({
      added: [],
      fixed: [],
    });
  });
});
