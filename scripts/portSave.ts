/**
 * - `node scripts/portSave.ts [product]` · the rehearsal copy's own edits, saved
 * - the diff from its `product` tag: product files only, every linked file aside
 * - written to ports/<product>/port.patch; one that no longer applies fails loudly
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
  HERE,
  lastLinked,
  LINKED_HOMES,
  linkedFiles,
  PRODUCT_REPO,
  repoAt,
} from './repos.ts';

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
    ...LINKED_HOMES.flatMap(([, at]) => (at ? [`:!${at}`] : [])),
    // a linked file is this repository's: a write through its link is no port
    ...linkedFiles().map(([, at]) => `:!${at}`),
    // one the last rehearsal linked, that design/ moved since: its old path is no port either
    ...lastLinked(COPY).map((at) => `:!${at}`),
    // one the last rehearsal linked, that design/ moved since: its old path is no port either
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
