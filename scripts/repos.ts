/**
 * - `HERE`, `BUILD_REPO` · this repository; the build one `dev/` is taken from
 * - `repoAt` · a repository handed in by its place among the arguments
 */
import path from 'node:path';
import { BUILD_SOURCE } from '../ports/consumers.ts';

const HERE = path.resolve(import.meta.dirname, '..');
// its path is ports/'s
const BUILD_REPO = path.resolve(HERE, BUILD_SOURCE);

const repoAt = (fallback: string, at = 0): string =>
  path.resolve(
    process.argv.slice(2).filter((arg) => !arg.startsWith('--'))[at] ??
      fallback,
  );

export { BUILD_REPO, HERE, repoAt };
