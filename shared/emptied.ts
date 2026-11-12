/**
 * - `emptied` · a folder made new, below the one it is held within, or refused
 */
import fs from 'node:fs';
import path from 'node:path';

// where a path really is, links followed: its nearest existing folder's real path, then the rest
const realOf = (folder: string): string =>
  fs.existsSync(folder)
    ? fs.realpathSync(folder)
    : path.join(realOf(path.dirname(folder)), path.basename(folder));

// below the folder that holds it alone: that folder itself, a `..`, a link out or another drive never reaches the removal
function emptied({
  within,
  folder,
}: {
  readonly within: string;
  readonly folder: string;
}): string {
  const below = path.relative(
    realOf(path.resolve(within)),
    realOf(path.resolve(folder)),
  );
  const isAbove = below === '..' || below.startsWith(`..${path.sep}`);
  if (below === '' || isAbove || path.isAbsolute(below))
    throw new Error(`${folder} is not below ${within}: nothing removed`);
  fs.rmSync(folder, { recursive: true, force: true });
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

export { emptied };
