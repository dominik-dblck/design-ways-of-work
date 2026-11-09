/**
 * - `runFileLint` · ls-lint over a repository, its config written from fileRules.ts
 * - a scope's name cases and component shape join; what git ignores is skipped
 * - JSON is YAML: the config lives in a temporary file for one run, never kept
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { RepoScope } from '../repoScope.ts';
import { componentFolders } from './componentFolders.ts';
import { fileLintConfig } from './fileRules.ts';
import type { FolderRules } from './fileRules.ts';

// what git ignores, `.gitignore` its one home: a path as ls-lint reads a glob, its brackets literal
const ignoredByGit = (root: string): readonly string[] =>
  execFileSync(
    'git',
    [
      'ls-files',
      '-z',
      '--others',
      '--ignored',
      '--exclude-standard',
      '--directory',
    ],
    { cwd: root, encoding: 'utf8' },
  )
    .split('\0')
    .filter((entry) => entry !== '')
    .map((entry) => entry.replace(/\/$/, '').replace(/[[\]{}*?]/g, '\\$&'));

// the repository's own folders, and every component tree's shape
function configOf({
  scope,
  folders,
  ignore,
}: {
  readonly scope: RepoScope;
  readonly folders: Readonly<Record<string, FolderRules>>;
  readonly ignore: readonly string[];
}): string {
  const shaped = componentFolders(scope.components);
  return JSON.stringify(
    fileLintConfig({
      root: scope.root,
      folders: { ...folders, ...shaped.folders },
      ignore: [...ignore, ...ignoredByGit(scope.root), ...shaped.ignore],
      cases: scope.nameCases,
    }),
  );
}

function runFileLint(wanted: Parameters<typeof configOf>[0]): number {
  const { root } = wanted.scope;
  const config = path.join(os.tmpdir(), `ls-lint-${process.pid}.yml`);
  fs.writeFileSync(config, configOf(wanted));
  // the package's own entry, not its .bin link: it finds its binary beside itself
  const cli = path.join(root, 'node_modules/@ls-lint/ls-lint/bin/cli.js');
  const run = spawnSync(
    process.execPath,
    [cli, '-config', config, '-workdir', root],
    { encoding: 'utf8' },
  );
  fs.rmSync(config);
  // ls-lint prints in its map's order: sorted, a run reads the same twice
  const found = `${run.stdout}${run.stderr}`
    .split('\n')
    .filter((line) => line.trim() !== '')
    .sort();
  if (found.length > 0) process.stderr.write(`${found.join('\n')}\n`);
  return run.status ?? 1;
}

export { runFileLint };
