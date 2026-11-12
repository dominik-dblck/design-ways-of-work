/**
 * - `sharedReadBy` · the files under `shared/` a set of files imports, followed through
 */
import fs from 'node:fs';
import path from 'node:path';

// a relative import, static or dynamic
const IMPORTED = /(?:\bfrom|\bimport\s*\()\s*'(\.{1,2}\/[^']+)'/g;
// what a scratch copy of this repository holds of its own code: its scripts and its shared folder
const FOLLOWED = ['scripts', 'shared'];

const isFollowed = (file: string): boolean =>
  FOLLOWED.some((folder) => file.startsWith(`${folder}${path.sep}`));

/** Each file under `shared/` the starts import, and what those import in turn, by path from the root. */
function sharedReadBy(
  root: string,
  starts: readonly string[],
): readonly string[] {
  const seen = new Set<string>();
  const follow = (file: string): void => {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    for (const [, named = ''] of text.matchAll(IMPORTED)) {
      const target = path.normalize(path.join(path.dirname(file), named));
      const isNew =
        !seen.has(target) &&
        isFollowed(target) &&
        fs.existsSync(path.join(root, target));
      if (isNew) {
        seen.add(target);
        follow(target);
      }
    }
  };
  starts.forEach(follow);
  return [...seen]
    .filter((file) => file.startsWith(`shared${path.sep}`))
    .sort();
}

export { sharedReadBy };
