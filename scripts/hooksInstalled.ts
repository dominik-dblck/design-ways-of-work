/**
 * - `hooksInstalled` · whether git runs a checkout's hooks, set by `yarn hooks`
 * - no install script sets them: one here would run in every repository's install
 */
import { spawnSync } from 'node:child_process';
import { childEnv } from './scratch.ts';

const HOOKS = '.husky/_';

const hooksInstalled = (root: string): boolean =>
  spawnSync('git', ['config', 'core.hooksPath'], {
    cwd: root,
    encoding: 'utf8',
    env: childEnv(),
  }).stdout.trim() === HOOKS;

export { hooksInstalled };
