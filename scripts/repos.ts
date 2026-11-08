/**
 * - `HERE`, `PRODUCT_REPO`, `BUILD_REPO` · this repository, the two it came from
 * - `repoAt` · the repository a script is handed: its nth bare argument, or default
 * - `LINKED_HOMES`, `linkedFiles` · the folders a product links in place, each file
 */
import fs from 'node:fs';
import path from 'node:path';

const HERE = path.resolve(import.meta.dirname, '..');
const PRODUCT_REPO = path.join(HERE, '..', 'eagle-design');
const BUILD_REPO = path.join(HERE, '..', 'mailing-automation');

const repoAt = (fallback: string, at = 0): string =>
  path.resolve(
    process.argv.slice(2).filter((arg) => !arg.startsWith('--'))[at] ??
      fallback,
  );

// [folder here, folder in the product]: design/ lands on the product's own paths
const LINKED_HOMES: readonly (readonly [string, string])[] = [
  ['design', ''],
  ['dev', 'dev'],
  ['shared', 'shared'],
  ['design-system', 'design-system'],
];

function filesUnder(folder: string): readonly string[] {
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name !== '.DS_Store')
    .map((entry) =>
      path.relative(folder, path.join(entry.parentPath, entry.name)),
    );
}

// each file a product links, [its path here, its path in the product]
const linkedFiles = (): readonly (readonly [string, string])[] =>
  LINKED_HOMES.flatMap(([home, at]) =>
    filesUnder(path.join(HERE, home)).map(
      (file) => [path.join(HERE, home, file), path.join(at, file)] as const,
    ),
  );

export { BUILD_REPO, HERE, LINKED_HOMES, linkedFiles, PRODUCT_REPO, repoAt };
