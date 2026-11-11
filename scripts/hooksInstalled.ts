/**
 * - `node scripts/hooksInstalled.ts` · git runs this repository's hooks, or red
 * - no install script sets them: one here would run in every repository's install
 */
import { spawnSync } from 'node:child_process';
import { HERE } from './repos.ts';
import { childEnv } from './scratch.ts';

const HOOKS = '.husky/_';

const set = spawnSync('git', ['config', 'core.hooksPath'], {
  cwd: HERE,
  encoding: 'utf8',
  env: childEnv(),
}).stdout.trim();
const isInstalled = set === HOOKS;
console.log(
  isInstalled
    ? `git runs this repository's hooks: core.hooksPath is ${HOOKS}`
    : `git runs no hook of this repository (core.hooksPath is '${set}'): run yarn hooks`,
);
process.exitCode = isInstalled ? 0 : 1;
