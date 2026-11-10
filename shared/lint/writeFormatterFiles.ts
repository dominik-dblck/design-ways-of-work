/**
 * - `node shared/lint/writeFormatterFiles.ts --out <folder>` · prettier's ignores
 * - `.prettierignore` from the scope, never by hand (options: prettier.config.ts)
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { scope } from '../../scope.ts';
import { prettierIgnoreOf } from './prettierConfig.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error(
    'writeFormatterFiles · `--out <folder>` names where it writes',
  );
fs.writeFileSync(path.join(out, '.prettierignore'), prettierIgnoreOf(scope));
