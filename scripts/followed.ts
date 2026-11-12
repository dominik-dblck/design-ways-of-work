/**
 * - `followed`, `TEXT` · a tree's files a move rewrites, and the kinds read as text
 * - a doc whose paths are checked follows; any other prose names what was
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type { RepoScope } from '../shared/repoScope.ts';
import { isNamedBy } from '../shared/tests/globs.ts';

const TEXT = /\.(ts|tsx|mts|md|json|yml|yaml|tsv|txt)$/;
const PROSE = /\.md$/;

const hasScope = (loaded: unknown): loaded is { readonly scope: RepoScope } =>
  typeof loaded === 'object' && loaded !== null && 'scope' in loaded;

// the tree's tracked text, but what it keeps as it was: a note, a record, a port
async function followed({
  root,
  isKept,
}: {
  readonly root: string;
  readonly isKept: (file: string) => boolean;
}): Promise<readonly string[]> {
  const loaded: unknown = await import(
    pathToFileURL(path.join(root, 'scope.ts')).href
  );
  if (!hasScope(loaded)) throw new Error(`no scope in ${root}/scope.ts`);
  const { docs } = loaded.scope.namedPaths;
  return execFileSync('git', ['ls-files', '-z'], {
    cwd: root,
    encoding: 'utf8',
  })
    .split('\0')
    .filter((file) => TEXT.test(file) && !isKept(file))
    .filter((file) => !PROSE.test(file) || isNamedBy(file, docs));
}

export { followed, TEXT };
