/**
 * - `docs/rules/`: every rule row names a gate that runs, and a rule file holds at most 200 lines
 */
import { ESLint } from 'eslint';
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ROOT, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const LONGEST = 200;
const THE_HEAD = /^\|\s*Rule\s*\|\s*Gate\s*\|\s*Exceptions\s*\|\s*Why\s*\|$/;
const A_TOKEN = /`([^`]+)`/;

type World = {
  readonly eslintRules: ReadonlySet<string>;
  readonly lintOptions: string;
  readonly testFiles: ReadonlySet<string>;
  readonly scripts: ReadonlySet<string>;
};

function gatesOf(source: Source): readonly string[] {
  const lines = source.text.split('\n');
  const start = lines.findIndex((line) => THE_HEAD.test(line.trim()));
  if (start === -1) return [];
  const rows: string[] = [];
  for (const line of lines.slice(start + 2)) {
    if (!line.startsWith('|')) break;
    rows.push(line.split(/(?<!\\)\|/)[2]?.trim() ?? '');
  }
  return rows;
}

function holds(segment: string, world: World): boolean {
  const named = A_TOKEN.exec(segment.replace(/\([^)]*\)/g, ''))?.[1];
  if (named === undefined) return false;
  if (named === 'review') return true;
  if (segment.trim().startsWith('ESLint'))
    return [...world.eslintRules].some(
      (rule) => rule === named || rule.endsWith(`/${named}`),
    );
  if (named.includes(': '))
    return world.lintOptions.includes(named.split(':')[0]);
  return world.scripts.has(named) || world.testFiles.has(`${named}.test`);
}

function shortfallOf(source: Source, world: World): readonly string[] {
  const gates = gatesOf(source).flatMap((cell) =>
    cell === '' || cell === '—'
      ? [`${source.path} · a row with no gate`]
      : cell
          .split(' · ')
          .filter((segment) => !holds(segment, world))
          .map((segment) => `${source.path} · ${segment}`),
  );
  const lines = source.text.split('\n').length;
  return lines > LONGEST
    ? [...gates, `${source.path} · ${lines} lines`]
    : gates;
}

async function theWorld(): Promise<World> {
  const eslint = new ESLint({ cwd: ROOT });
  // a rule runs on its kind of file: a module, a React page, a test
  const configs: readonly {
    rules?: Record<string, unknown>;
    linterOptions?: Record<string, unknown>;
  }[] = await Promise.all(
    ['docs/process/plans.ts', 'app/planted.tsx', 'tests/planted.test.ts'].map(
      (file) => eslint.calculateConfigForFile(file),
    ),
  );
  const [config] = configs;
  const on = configs
    .flatMap((one) => Object.entries(one.rules ?? {}))
    .filter(([, setting]) => {
      const level: unknown = Array.isArray(setting) ? setting[0] : setting;
      return level !== 0 && level !== 'off';
    });
  const read = (file: string): string =>
    fs.readFileSync(path.join(ROOT, file), 'utf8');
  const packageJson: { scripts?: Record<string, string> } = JSON.parse(
    read('package.json'),
  );
  return {
    eslintRules: new Set(on.map(([rule]) => rule)),
    // what ESLint runs with, wherever the config spells it
    lintOptions: JSON.stringify(config?.linterOptions ?? {}),
    testFiles: new Set(
      textsUnder('tests', ['.test.ts']).map((one) =>
        path.posix.basename(one.path, '.ts'),
      ),
    ),
    scripts: new Set(Object.keys(packageJson.scripts ?? {})),
  };
}

describe('every rule has a gate', () => {
  const world: World = {
    eslintRules: new Set(['max-lines']),
    lintOptions: "linterOptions: { reportUnusedDisableDirectives: 'error' }",
    testFiles: new Set(['aFileStatesItsJob.test']),
    scripts: new Set(['tsc']),
  };
  const table = (...gates: readonly string[]): Source => ({
    path: 'docs/rules/planted.md',
    text: [
      '| Rule | Gate | Exceptions | Why |',
      '| - | - | - | - |',
      ...gates.map((gate) => `| a rule | ${gate} | — | why |`),
    ].join('\n'),
  });

  it('a gate that does not run and a row with none are found; each kind that runs passes', () => {
    expect(
      shortfallOf(
        table(
          '`aFileStatesItsJob` · `review`',
          'ESLint `max-lines`',
          '`tsc` (pre-commit)',
          '`gone`',
          '—',
        ),
        world,
      ),
    ).toEqual([
      'docs/rules/planted.md · `gone`',
      'docs/rules/planted.md · a row with no gate',
    ]);
  });

  it('every rule in docs/rules/ has a gate that runs', async () => {
    const world = await theWorld();
    const files = textsUnder('docs/rules', ['.md']).filter(
      (one) => !one.path.endsWith('README.md'),
    );
    expect(files.length, 'the rule files are read').toBe(12);
    expect(files.flatMap((file) => shortfallOf(file, world))).toEqual([]);
  });
});
