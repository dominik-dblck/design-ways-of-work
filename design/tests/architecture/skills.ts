/**
 * - `theSkills`, `claudeMd` · each skill the build writes from `docs/skills/`, and `CLAUDE.md`, as `Source`
 */
import fs from 'node:fs';
import path from 'node:path';
import { emitted } from '../../tools/layout.ts';
import { ROOT } from './tree.ts';
import type { Source } from './tree.ts';

const read = (file: string): Source => ({
  path: file,
  text: fs.existsSync(path.join(ROOT, file))
    ? fs.readFileSync(path.join(ROOT, file), 'utf8')
    : '',
});

const theSkills = (): readonly Source[] =>
  emitted()
    .filter((one) => one.print === 'skill')
    .map((one) => read(one.fixture));

const claudeMd = (): Source => read('CLAUDE.md');

export { claudeMd, theSkills };
