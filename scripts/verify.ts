/**
 * - `node scripts/verify.ts [product]` · phase 7: the product on design/ equals the product as it is
 * - a clone of the product (base) and a rehearsal copy (linked) run the same commands
 * - every output, every file they write and dist/ compared; a difference fails
 * - unless plan/expected-differences.tsv names it, with why; a row no longer met fails too
 */
import { execFileSync, spawnSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const SOURCE = path.resolve(process.argv[2] ?? path.join(HERE, '..', 'eagle-design'));
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
const TIMING = [/ · \d+ s$/gm, /^\s*(Start at|Duration) .*$/gm, /\d+(\.\d+)?m?s\b/g];

type Run = { readonly command: string; readonly status: number | null; readonly output: string };

function normalised(text: string): string {
  return TIMING.reduce((out, pattern) => out.replace(pattern, ''), text.replaceAll(LINKED, '<root>').replaceAll(BASE, '<root>'));
}

function runAll(root: string): readonly Run[] {
  return COMMANDS.map((args) => {
    const result = spawnSync('yarn', ['-s', ...args], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
    const output = normalised(`${result.stdout}${result.stderr}`);
    fs.mkdirSync(path.join(RUNS, 'out'), { recursive: true });
    fs.writeFileSync(path.join(RUNS, 'out', `${path.basename(root)}-${args.join('-').replace(':', '-')}.txt`), output);
    return { command: args.join(' '), status: result.status, output };
  });
}

function hashes(folder: string): ReadonlyMap<string, string> {
  const out = new Map<string, string>();
  if (!fs.existsSync(folder)) return out;
  for (const entry of fs.readdirSync(folder, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const full = path.join(entry.parentPath, entry.name);
    out.set(path.relative(folder, full), crypto.createHash('sha256').update(contentOf(full)).digest('hex'));
  }
  return out;
}

function written(root: string): ReadonlyMap<string, string> {
  const lines = execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: root, encoding: 'utf8' });
  const files = lines.split('\n').filter(Boolean).map((line) => line.slice(3)).filter((file) => file !== 'node_modules');
  return new Map(files.map((file) => [file, contentOf(path.join(root, file))]));
}

function contentOf(file: string): string {
  if (!fs.existsSync(file)) return '<gone>';
  const bytes = fs.readFileSync(file);
  return file.endsWith('guard-map.json') ? bytes.toString('utf8').replace(/"at":"[^"]*"/, '"at":""') : bytes.toString('latin1');
}

function differences<T>(name: string, base: ReadonlyMap<string, T>, linked: ReadonlyMap<string, T>): readonly string[] {
  const keys = new Set([...base.keys(), ...linked.keys()]);
  return [...keys].filter((key) => base.get(key) !== linked.get(key)).map((key) => `${name} · ${key}`);
}

function expectedDifferences(): ReadonlyMap<string, string> {
  if (!fs.existsSync(EXPECTED_FILE)) return new Map();
  const rows = fs.readFileSync(EXPECTED_FILE, 'utf8').split('\n').slice(1).filter(Boolean);
  return new Map(rows.map((row) => row.split('\t') as [string, string]));
}

function prepare(): void {
  fs.rmSync(BASE, { recursive: true, force: true });
  execFileSync('git', ['clone', '-q', SOURCE, BASE]);
  fs.symlinkSync(path.join(SOURCE, 'node_modules'), path.join(BASE, 'node_modules'));
  execFileSync('node', [path.join(HERE, 'scripts', 'rehearse.ts'), SOURCE, LINKED], { stdio: 'inherit' });
}

function main(): void {
  prepare();
  const base = runAll(BASE);
  const linked = runAll(LINKED);
  const found = [
    ...base.flatMap((run, at) => {
      const other = linked[at];
      if (other === undefined) return [`missing run · ${run.command}`];
      const same = run.status === other.status && run.output === other.output;
      console.log(`${same ? 'SAME' : 'DIFF'} · yarn ${run.command} · exit ${run.status}${same ? '' : ` → ${other.status}`}`);
      return same ? [] : [`output · yarn ${run.command}`];
    }),
    ...differences('dist', hashes(path.join(BASE, 'dist')), hashes(path.join(LINKED, 'dist'))),
    ...differences('written', written(BASE), written(LINKED)),
  ];
  const expected = expectedDifferences();
  const unexplained = found.filter((line) => !expected.has(line));
  const stale = [...expected.keys()].filter((line) => !found.includes(line));
  for (const line of found) console.log(`  ${expected.has(line) ? 'EXPECTED' : 'DIFF'} · ${line}${expected.has(line) ? ` · ${expected.get(line)}` : ''}`);
  for (const line of stale) console.log(`  STALE · ${line} · listed as expected, and the same now`);
  const clean = unexplained.length === 0 && stale.length === 0;
  console.log(clean ? `ALL SAME · ${path.basename(SOURCE)} on design/, ${expected.size} differences expected` : `${unexplained.length} unexplained, ${stale.length} stale`);
  process.exitCode = clean ? 0 : 1;
}

main();
