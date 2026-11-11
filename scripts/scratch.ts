/**
 * - `SCRATCH` · the folder the gate builds its clones in, the one it empties
 * - `emptied` · a folder below a scratch, made new; a path outside is refused
 */
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';

const SCRATCH = path.join(HERE, '.consumers');

// below the scratch alone: the scratch itself, a `..` or another drive never reaches the removal
function emptied({
  scratch,
  folder,
}: {
  readonly scratch: string;
  readonly folder: string;
}): string {
  const below = path.relative(path.resolve(scratch), path.resolve(folder));
  if (below === '' || below.startsWith('..') || path.isAbsolute(below))
    throw new Error(`${folder} is not below ${scratch}: nothing removed`);
  fs.rmSync(folder, { recursive: true, force: true });
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

export { emptied, SCRATCH };
