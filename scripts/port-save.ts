/**
 * - `node scripts/port-save.ts [product]` · saves the rehearsal copy's own edits as the port
 * - the diff from the copy's `product` tag to its working tree: product files only, links never move
 * - written to ports/<product>/port.patch, which rehearse.ts applies; a patch that no longer applies fails loudly
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const PRODUCT = path.basename(
  path.resolve(process.argv[2] ?? path.join(HERE, '..', 'eagle-design')),
);
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
