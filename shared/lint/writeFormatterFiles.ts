/**
 * - `node shared/lint/writeFormatterFiles.ts --out <folder>` · prettier's own files
 * - `.prettierrc.json` and `.prettierignore`, written from the scope, never by hand
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { scope } from '../../scope.ts';
import { prettierConfigOf, prettierIgnoreOf } from './prettierConfig.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error(
    'writeFormatterFiles · `--out <folder>` names where it writes',
  );
fs.writeFileSync(
  path.join(out, '.prettierrc.json'),
  `${JSON.stringify(prettierConfigOf(scope), null, 2)}\n`,
);
fs.writeFileSync(path.join(out, '.prettierignore'), prettierIgnoreOf(scope));
