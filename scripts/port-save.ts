/**
 * - `node scripts/port-save.ts [product]` · saves the rehearsal copy's own edits as the port
 * - the diff from the copy's `product` tag to its working tree: product files only, links never move
 * - written to ports/<product>/port.patch, which rehearse.ts applies; a patch that no longer applies fails loudly
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE, PRODUCT_REPO, repoAt } from './repos.ts';

const PRODUCT = path.basename(repoAt(PRODUCT_REPO));
const COPY = path.join(HERE, '.rehearsal', PRODUCT);
const PATCH = path.join(HERE, 'ports', PRODUCT, 'port.patch');

execFileSync('git', ['add', '-A'], { cwd: COPY });
const diff = execFileSync(
  'git',
  [
    'diff',
    '--cached',
    '--binary',
    'product',
    '--',
    '.',
    ':!guards/__snapshots__/guard-map.json',
  ],
  {
    cwd: COPY,
    encoding: 'utf8',
    maxBuffer: 1 << 28,
  },
);
fs.mkdirSync(path.dirname(PATCH), { recursive: true });
fs.writeFileSync(PATCH, diff);
const files = diff
  .split('\n')
  .filter((line) => line.startsWith('diff --git')).length;
console.log(`ports/${PRODUCT}/port.patch · ${files} files`);
