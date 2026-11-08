/**
 * - `HERE`, `PRODUCT_REPO`, `BUILD_REPO` · this repository, and the two it was taken from
 * - `repoAt` · a repository a script is handed: the nth argument that is not a flag, or the default
 * - `LINKED_HOMES` · this repository's folders a product links in place, and where
 */
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

export { BUILD_REPO, HERE, LINKED_HOMES, PRODUCT_REPO, repoAt };
