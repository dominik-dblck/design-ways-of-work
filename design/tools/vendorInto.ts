/**
 * - `node tools/vendorInto.ts --out <folder>` · the vendored files, under a folder
 * - the generators' check mode: the shared test compares the folder with the tree
 */
import { parseArgs } from 'node:util';
import { writeVendored } from './build/vendored.ts';
import { ROOT } from './root.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error('vendor-into · `--out <folder>` names where it writes');
writeVendored({ root: ROOT, out });
