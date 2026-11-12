/**
 * - `node tools/writeGenerated.ts` · what the scope's generators own, written again
 */
import { spawnSync } from 'node:child_process';
import { scope } from '../scope.ts';

for (const { script, args } of scope.generators) {
  const run = spawnSync(
    process.execPath,
    [script, ...args, '--out', scope.root],
    { cwd: scope.root, stdio: 'inherit' },
  );
  if (run.status !== 0) {
    console.log(`writeGenerated · ${script} failed`);
    process.exitCode = 1;
  }
}
