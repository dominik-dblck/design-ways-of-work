/**
 * - `node design-system/writeGuide.ts --out <folder>` · the guide from its data
 * - `design-system/guide.md`: edit `guide.ts`, never the file
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { guide } from './guide.ts';
import { guideText } from './guideText.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error('writeGuide · `--out <folder>` names where it writes');
const file = path.join(out, 'design-system', 'guide.md');
fs.mkdirSync(path.dirname(file), { recursive: true });
fs.writeFileSync(file, guideText(guide));
