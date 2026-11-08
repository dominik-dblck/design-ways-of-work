/**
 * - `runFileLint` · ls-lint over a repository: its config written from fileRules.ts, never kept as YAML
 * - JSON is YAML: the config is printed to a temporary file, read once and removed
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
  const run = spawnSync(
    path.join(root, 'node_modules', '.bin', 'ls-lint'),
    ['-config', config, '-workdir', root],
    { stdio: 'inherit' },
  );
  fs.rmSync(config);
  return run.status ?? 1;
}

export { runFileLint };
