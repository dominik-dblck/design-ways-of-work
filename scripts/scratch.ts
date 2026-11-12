/**
 * - `SCRATCH` · the folder clones are built in, its checks named by the scope
 * - `childEnv` · a child's environment: none of git's names for this repository
 */
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { HERE } from './repos.ts';

const SCRATCH = path.join(HERE, '.consumers');

// the names git itself lists as one repository's: a hook holds them, and a clone would follow them here
const LOCAL_TO_A_REPOSITORY = new Set(
  execFileSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean),
);

const childEnv = (env: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv =>
  Object.fromEntries(
    Object.entries(env).filter(([name]) => !LOCAL_TO_A_REPOSITORY.has(name)),
  );

export { childEnv, SCRATCH };
