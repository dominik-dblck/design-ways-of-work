/**
 * - `emptied` · a folder made new, below the one it is held within, or refused
 * - `belowOf` · where a folder stands within another, links followed; null outside
 */
import fs from 'node:fs';
import path from 'node:path';

// where a path really is, links followed: its nearest existing folder's real path, then the rest
const realOf = (folder: string): string =>
  fs.existsSync(folder)
    ? fs.realpathSync(folder)
    : path.join(realOf(path.dirname(folder)), path.basename(folder));

// '' for the folder itself, its path below it, or null: a `..`, a link out or another drive is outside
function belowOf({
  within,
  folder,
}: {
  readonly within: string;
  readonly folder: string;
}): string | null {
  const below = path.relative(
    realOf(path.resolve(within)),
    realOf(path.resolve(folder)),
  );
  const isAbove = below === '..' || below.startsWith(`..${path.sep}`);
  return isAbove || path.isAbsolute(below) ? null : below;
}

// below the folder that holds it alone: that folder itself or one outside never reaches the removal
function emptied({
  within,
  folder,
}: {
  readonly within: string;
  readonly folder: string;
}): string {
  const below = belowOf({ within, folder });
  if (below === null || below === '')
    throw new Error(`${folder} is not below ${within}: nothing removed`);
  fs.rmSync(folder, { recursive: true, force: true });
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

export { belowOf, emptied };
