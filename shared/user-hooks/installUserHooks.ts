/**
 * - `node shared/user-hooks/installUserHooks.ts` · the user hooks to ~/.claude/hooks
 * - one absent is written, one byte-equal stays, one that differs is left as it is
 * - a change to what a hook does reaches a machine only by a release (W29)
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const HOOKS = ['workMode.py', 'runBars.py'];
const INSTALLED = path.join(os.homedir(), '.claude', 'hooks');

// the hook as it stands here, against the one the machine runs
function installed(name: string): string {
  const source = path.join(import.meta.dirname, name);
  const target = path.join(INSTALLED, name);
  if (!fs.existsSync(target)) {
    fs.mkdirSync(INSTALLED, { recursive: true });
    fs.copyFileSync(source, target);
    fs.chmodSync(target, fs.statSync(source).mode);
    return `${name} · written`;
  }
  if (fs.readFileSync(target).equals(fs.readFileSync(source)))
    return `${name} · as installed`;
  process.exitCode = 1;
  return `${name} · DIFFERS, left as installed: diff ${target} ${source}`;
}

for (const name of HOOKS) console.log(installed(name));
