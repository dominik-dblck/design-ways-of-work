/**
 * - `node tools/emitInto.ts --out <folder>` · each emitted text, under a folder
 * - the generators' check mode: the shared test compares the folder with the tree
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { emittedTexts } from './emit.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error('emit-into · `--out <folder>` names where it writes');
for (const [file, text] of await emittedTexts()) {
  const to = path.join(out, file);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.writeFileSync(to, text);
}
