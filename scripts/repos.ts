/**
 * - `HERE`, `PRODUCT_REPO`, `BUILD_REPO`, `repoAt` · the repositories; one handed in
 * - `LINKED_HOMES`, `linkedFiles` · the folders a product links in place, each file
 * - `linkedListOf`, `lastLinked` · what a copy's last rehearsal linked
 */
import fs from 'node:fs';
import path from 'node:path';
import { filesOfHomes, HOMES } from '../shared/take/takeHomes.ts';

const HERE = path.resolve(import.meta.dirname, '..');
const PRODUCT_REPO = path.join(HERE, '..', 'eagle-design');
const BUILD_REPO = path.join(HERE, '..', 'mailing-automation');

const repoAt = (fallback: string, at = 0): string =>
  path.resolve(
    process.argv.slice(2).filter((arg) => !arg.startsWith('--'))[at] ??
      fallback,
  );

// [folder here, folder in the product]: the take's own map, every home
const LINKED_HOMES: readonly (readonly [string, string])[] =
  Object.entries(HOMES);

// each file a product links, [its path here, its path in the product]
const linkedFiles = (): readonly (readonly [string, string])[] =>
  filesOfHomes({ source: HERE, homes: Object.keys(HOMES) });

// what a copy's last rehearsal linked, kept beside the copy's own history
const linkedListOf = (copy: string): string =>
  path.join(copy, '.git', 'info', 'linked');
const lastLinked = (copy: string): readonly string[] =>
  fs.existsSync(linkedListOf(copy))
    ? fs.readFileSync(linkedListOf(copy), 'utf8').split('\n').filter(Boolean)
    : [];

export {
  BUILD_REPO,
  HERE,
  lastLinked,
  LINKED_HOMES,
  linkedFiles,
  linkedListOf,
  PRODUCT_REPO,
  repoAt,
};
