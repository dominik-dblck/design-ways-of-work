/**
 * - `node scripts/verify.ts [product]` · the product on design/ against as it is
 * - a clone and a rehearsal copy run alike; outputs, dist/ and files compared
 * - a difference fails unless plan/expected-differences.tsv names it, with why
 */
import { execFileSync, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { HERE, PRODUCT_REPO, repoAt } from './repos.ts';

const SOURCE = repoAt(PRODUCT_REPO);
const RUNS = path.join(HERE, '.rehearsal');
const BASE = path.join(RUNS, 'base');
const LINKED = path.join(RUNS, path.basename(SOURCE));
const COMMANDS: readonly (readonly string[])[] = [
  ['build'],
  ['checks'],
  ['tsc'],
  ['lint'],
  ['test'],
  ['spec-check'],
  ['checks:gate'],
  ['ds-scan'],
];
const EXPECTED_FILE = path.join(HERE, 'plan', 'expected-differences.tsv');
const TIMING = [
  / · \d+ s$/gm,
  /^\s*(Start at|Duration) .*$/gm,
  /\d+(\.\d+)?m?s\b/g,
];

type Run = {
  readonly command: string;
  readonly status: number | null;
  readonly output: string;
};

function normalised(text: string): string {
  return TIMING.reduce(
    (out, pattern) => out.replace(pattern, ''),
    text.replaceAll(LINKED, '<root>').replaceAll(BASE, '<root>'),
  );
}

function runAll(root: string): readonly Run[] {
  return COMMANDS.map((args) => {
    const spawned = spawnSync('yarn', ['-s', ...args], {
      cwd: root,
      encoding: 'utf8',
      maxBuffer: 1 << 28,
    });
    const output = normalised(`${spawned.stdout}${spawned.stderr}`);
    fs.mkdirSync(path.join(RUNS, 'out'), { recursive: true });
    fs.writeFileSync(
      path.join(
        RUNS,
        'out',
        `${path.basename(root)}-${args.join('-').replace(':', '-')}.txt`,
      ),
      output,
    );
    return { command: args.join(' '), status: spawned.status, output };
  });
}

function hashes(folder: string): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  if (!fs.existsSync(folder)) return out;
  for (const entry of fs.readdirSync(folder, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!entry.isFile()) continue;
    const full = path.join(entry.parentPath, entry.name);
    out.set(
      path.relative(folder, full),
      crypto.createHash('sha256').update(contentOf(full)).digest('hex'),
    );
  }
  return out;
}

function written(root: string): ReadonlyMap<string, string> {
  const lines = execFileSync(
    'git',
    ['status', '--porcelain', '--untracked-files=all'],
    { cwd: root, encoding: 'utf8' },
  );
  const files = lines
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(3))
    .filter((file) => file !== 'node_modules');
  return new Map(files.map((file) => [file, contentOf(path.join(root, file))]));
}

function contentOf(file: string): string {
  if (!fs.existsSync(file)) return '<gone>';
  const bytes = fs.readFileSync(file);
  return file.endsWith('guard-map.json')
    ? bytes.toString('utf8').replace(/"at":"[^"]*"/, '"at":""')
    : bytes.toString('latin1');
}

function differences<T>(
  name: string,
  {
    base,
    linked,
  }: {
    readonly base: ReadonlyMap<string, T>;
    readonly linked: ReadonlyMap<string, T>;
  },
): readonly string[] {
  const keys = new Set([...base.keys(), ...linked.keys()]);
  return [...keys]
    .filter((key) => base.get(key) !== linked.get(key))
    .map((key) => `${name} · ${key}`);
}

function expectedDifferences(): ReadonlyMap<string, string> {
  if (!fs.existsSync(EXPECTED_FILE)) return new Map();
  const rows = fs
    .readFileSync(EXPECTED_FILE, 'utf8')
    .split('\n')
    .slice(1)
    .filter(Boolean);
  return new Map(
    rows.map((row) => {
      const [difference = '', because = ''] = row.split('\t');
      return [difference, because] as const;
    }),
  );
}

function prepare(): void {
  fs.rmSync(BASE, { recursive: true, force: true });
  execFileSync('git', ['clone', '-q', SOURCE, BASE]);
  fs.symlinkSync(
    path.join(SOURCE, 'node_modules'),
    path.join(BASE, 'node_modules'),
  );
  execFileSync(
    'node',
    [path.join(HERE, 'scripts', 'rehearse.ts'), SOURCE, LINKED],
    { stdio: 'inherit' },
  );
}

// each command's output and exit, the clone's against the copy's
function outputDifferences(
  base: readonly Run[],
  linked: readonly Run[],
): readonly string[] {
  return base.flatMap((run, at) => {
    const other = linked[at];
    if (other === undefined) return [`missing run · ${run.command}`];
    const isSame = run.status === other.status && run.output === other.output;
    console.log(
      `${isSame ? 'SAME' : 'DIFF'} · yarn ${run.command} · exit ${run.status}${isSame ? '' : ` → ${other.status}`}`,
    );
    // an exit that moved is its own difference: a row on a run's output never explains a failing run
    return [
      ...(run.output === other.output ? [] : [`output · yarn ${run.command}`]),
      ...(run.status === other.status
        ? []
        : [`exit · yarn ${run.command} · ${run.status} → ${other.status}`]),
    ];
  });
}

// each difference with the row that explains it; a row nothing matches is stale
function report(found: readonly string[]): boolean {
  const expected = expectedDifferences();
  const matches = (row: string, line: string): boolean =>
    row.endsWith('*') ? line.startsWith(row.slice(0, -1)) : line === row;
  const why = (line: string): string | undefined =>
    [...expected].find(([row]) => matches(row, line))?.[1];
  const unexplained = found.filter((line) => why(line) === undefined);
  const stale = [...expected.keys()].filter(
    (row) => !found.some((line) => matches(row, line)),
  );
  for (const line of found) {
    const because = why(line);
    console.log(
      `  ${because === undefined ? 'DIFF' : 'EXPECTED'} · ${line}${because === undefined ? '' : ` · ${because}`}`,
    );
  }
  for (const line of stale)
    console.log(`  STALE · ${line} · listed as expected, and the same now`);
  const isClean = unexplained.length === 0 && stale.length === 0;
  console.log(
    isClean
      ? `ALL SAME · ${path.basename(SOURCE)} on design/, ${expected.size} differences expected`
      : `${unexplained.length} unexplained, ${stale.length} stale`,
  );
  return isClean;
}

function main(): void {
  prepare();
  const found = [
    ...outputDifferences(runAll(BASE), runAll(LINKED)),
    ...differences('dist', {
      base: hashes(path.join(BASE, 'dist')),
      linked: hashes(path.join(LINKED, 'dist')),
    }),
    ...differences('written', { base: written(BASE), linked: written(LINKED) }),
  ];
  fs.writeFileSync(
    path.join(RUNS, 'out', 'differences.txt'),
    `${found.join('\n')}\n`,
  );
  process.exitCode = report(found) ? 0 : 1;
}

main();
