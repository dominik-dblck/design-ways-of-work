/**
 * - `runFileLint` · ls-lint over a repository, its config written from fileRules.ts
 * - JSON is YAML: the config lives in a temporary file for one run, never kept
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileLintConfig } from './fileRules.ts';
import type { FolderRules } from './fileRules.ts';

function runFileLint({
  root,
  folders,
  ignore,
}: {
  readonly root: string;
  readonly folders: Readonly<Record<string, FolderRules>>;
  readonly ignore: readonly string[];
}): number {
  const config = path.join(os.tmpdir(), `ls-lint-${process.pid}.yml`);
  fs.writeFileSync(config, JSON.stringify(fileLintConfig(folders, ignore)));
  // the package's own entry, not its .bin link: it finds its binary beside itself
  const cli = path.join(
    root,
    'node_modules',
    '@ls-lint',
    'ls-lint',
    'bin',
    'cli.js',
  );
  const run = spawnSync(
    process.execPath,
    [cli, '-config', config, '-workdir', root],
    { stdio: 'inherit' },
  );
  fs.rmSync(config);
  return run.status ?? 1;
}

export { runFileLint };
