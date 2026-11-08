/**
 * - `lintedTree` · ls-lint's findings on a tree of empty files it makes and removes
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileLintConfig } from '../../shared/lint/fileRules.ts';
import type { FolderRules } from '../../shared/lint/fileRules.ts';

const CLI = path.join(
  import.meta.dirname,
  '../../node_modules/@ls-lint/ls-lint/bin/cli.js',
);

// a tree of its own outside the repository: ls-lint reads names alone
function lintedTree(
  files: readonly string[],
  {
    folders,
    ignore,
  }: {
    readonly folders: Readonly<Record<string, FolderRules>>;
    readonly ignore: readonly string[];
  },
): readonly string[] {
  const tree = fs.mkdtempSync(path.join(os.tmpdir(), 'linted-tree-'));
  for (const file of files) {
    fs.mkdirSync(path.dirname(path.join(tree, file)), { recursive: true });
    fs.writeFileSync(path.join(tree, file), '');
  }
  const config = path.join(tree, 'ls-lint.yml');
  fs.writeFileSync(
    config,
    JSON.stringify(fileLintConfig({ root: tree, folders, ignore })),
  );
  const run = spawnSync(
    process.execPath,
    [CLI, '-config', config, '-workdir', tree],
    { encoding: 'utf8' },
  );
  fs.rmSync(tree, { recursive: true });
  return `${run.stdout}${run.stderr}`
    .split('\n')
    .filter((line) => line.includes(' failed for '))
    .map((line) => line.slice(0, line.indexOf(' failed for ')))
    .sort();
}

export { lintedTree };
