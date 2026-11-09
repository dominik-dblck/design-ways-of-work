/**
 * - `node shared/lint/dedupe.ts [--list]` · the lockfile's duplicates merged
 * - each name onto its highest version; the check tools onto the fewest, one each
 * - `--list` says what merges, writing and refusing nothing: the test is the gate
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fixDuplicates, listDuplicates } from 'yarn-deduplicate';
import { PEERS } from './checkTools.ts';

const ROOT = process.cwd();
const LOCK = path.join(ROOT, 'yarn.lock');
const isList = process.argv.includes('--list');

// a pin beside a caret is no duplicate to the highest version: the fewest merge it, for the check tools alone
const PASSES = [
  {},
  {
    useMostCommon: true,
    includeScopes: PEERS.flatMap(({ family }) =>
      family === undefined ? [] : [family.replace(/\/$/, '')],
    ),
  },
  { useMostCommon: true, includePackages: PEERS.map(({ name }) => name) },
];

const before = fs.readFileSync(LOCK, 'utf8');
const after = PASSES.reduce((lock, options) => {
  for (const line of listDuplicates(lock, options)) console.log(line);
  return fixDuplicates(lock, options);
}, before);
if (!isList && after !== before) {
  fs.writeFileSync(LOCK, after);
  process.exit(
    spawnSync('yarn', ['install'], { cwd: ROOT, stdio: 'inherit' }).status ?? 1,
  );
}
