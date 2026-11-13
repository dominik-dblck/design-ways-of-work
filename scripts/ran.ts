/**
 * - `stepIn` · a command run in a folder: one that fails stops the script, named
 */
import { spawnSync } from 'node:child_process';
import { childEnv } from './scratch.ts';

// a step that fails stops the run: what follows reads what it left
const stepIn =
  ({ root, label }: { readonly root: string; readonly label: string }) =>
  (command: string, args: readonly string[]): void => {
    const done = spawnSync(command, args, {
      cwd: root,
      env: childEnv(),
      stdio: 'inherit',
    });
    if (done.status === 0) return;
    console.log(`${label} · ${[command, ...args].join(' ')} · failed`);
    process.exit(done.status ?? 1);
  };

export { stepIn };
