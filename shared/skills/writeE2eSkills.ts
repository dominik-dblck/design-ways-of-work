/**
 * - `node shared/skills/writeE2eSkills.ts --out <folder>` · a product's e2e skills
 * - written from the shared data and its scope's browser tier, never by hand
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { scope } from '../../scope.ts';
import { e2eSkillFiles } from './e2eSkills.ts';

const { out } = parseArgs({ options: { out: { type: 'string' } } }).values;
if (out === undefined)
  throw new Error('writeE2eSkills · `--out <folder>` names where it writes');
if ('none' in scope.browser)
  throw new Error(
    `writeE2eSkills · no browser tier, so no e2e skill: ${scope.browser.none}`,
  );
for (const [file, text] of e2eSkillFiles(scope.browser)) {
  fs.mkdirSync(path.dirname(path.join(out, file)), { recursive: true });
  fs.writeFileSync(path.join(out, file), text);
}
