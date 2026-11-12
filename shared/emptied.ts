/**
 * - `emptied` · a folder made new, below the one it is held within, or refused
 */
import fs from 'node:fs';
import path from 'node:path';

// below the folder that holds it alone: that folder itself, a `..` or another drive never reaches the removal
function emptied({
  within,
  folder,
}: {
  readonly within: string;
  readonly folder: string;
}): string {
  const below = path.relative(path.resolve(within), path.resolve(folder));
  if (below === '' || below.startsWith('..') || path.isAbsolute(below))
    throw new Error(`${folder} is not below ${within}: nothing removed`);
  fs.rmSync(folder, { recursive: true, force: true });
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

export { emptied };
