/**
 * - `node scripts/sample.ts [--emit] [script…]` · the sample on the homes in hand
 * - from nothing; its generated files and a home's emitted ones current
 * - `--emit` writes them; else its scripts, by default its build and checks
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';
import { emptied } from '../shared/emptied.ts';
import { stepIn } from './ran.ts';
import { childEnv, SCRATCH } from './scratch.ts';

const SAMPLE = path.join(HERE, 'examples', 'sample-product');
const DESIGN = path.join(HERE, 'design');
const ROOT = path.join(SCRATCH, 'sample');
// git's names for the sample's one commit: no person's
const AUTHOR = ['-c', 'user.name=sample', '-c', 'user.email=sample@invalid'];
const ran = stepIn({ root: ROOT, label: 'sample' });

// what the generators changed or added: the taken files are git's excluded ones
const changedFiles = (): readonly string[] =>
  execFileSync(
    'git',
    ['status', '--porcelain', '-z', '--untracked-files=all'],
    { cwd: ROOT, encoding: 'utf8', env: childEnv() },
  )
    .split('\0')
    .filter(Boolean)
    .map((line) => line.slice(3));

// a design home's file the sample's build wrote otherwise: the home holds a stale emit
const staleHomeFiles = (): readonly string[] =>
  execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard', '.'],
    { cwd: DESIGN, encoding: 'utf8', env: childEnv() },
  )
    .split('\0')
    .filter(Boolean)
    .filter((file) => {
      const built = path.join(ROOT, file);
      return (
        fs.existsSync(built) &&
        !fs.readFileSync(built).equals(fs.readFileSync(path.join(DESIGN, file)))
      );
    });

emptied({ within: SCRATCH, folder: ROOT });
fs.cpSync(SAMPLE, ROOT, { recursive: true });
ran('git', ['init', '-q']);
ran('git', ['add', '-A']);
ran('git', [...AUTHOR, 'commit', '-q', '--no-gpg-sign', '-m', 'the sample']);
ran('yarn', [
  'install',
  '--frozen-lockfile',
  '--ignore-scripts',
  '--prefer-offline',
  '--silent',
]);
ran(process.execPath, [
  path.join(HERE, 'shared', 'take', 'takeWow.ts'),
  '--from',
  HERE,
]);
ran(process.execPath, ['tools/writeGenerated.ts']);
const changed = changedFiles();
const isEmit = process.argv.includes('--emit');
for (const file of changed) {
  if (isEmit)
    fs.cpSync(path.join(ROOT, file), path.join(SAMPLE, file), {
      recursive: true,
    });
  console.log(`sample · ${isEmit ? 'written' : 'stale'} · ${file}`);
}
if (isEmit) {
  ran('yarn', ['-s', 'build']);
  for (const file of staleHomeFiles()) {
    fs.copyFileSync(path.join(ROOT, file), path.join(DESIGN, file));
    console.log(`sample · written · design/${file}`);
  }
  process.exit(0);
}
if (changed.length > 0) {
  console.log('sample · its generated files are stale: yarn sample --emit');
  process.exit(1);
}
const named = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
for (const script of named.length === 0 ? ['build', 'check:feature'] : named)
  ran('yarn', ['-s', script]);
const stale = staleHomeFiles();
for (const file of stale) console.log(`sample · stale · design/${file}`);
if (stale.length > 0) {
  console.log("sample · a home's emitted file is stale: yarn sample --emit");
  process.exit(1);
}
console.log('sample · green');
