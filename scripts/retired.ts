/**
 * - `isRetired` · a build-side `.claude/` path the PM retired: legacy/ holds it
 */
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from './repos.ts';

// what the PM retired of the build side's `.claude/`, kept as it was taken
const RETIRED = path.join(HERE, 'legacy', 'dev', 'claude');

const held = (...parts: readonly string[]): boolean =>
  fs.existsSync(path.join(RETIRED, ...parts));

// a skill goes with its whole folder, a file it holds or not; anything else by its own file
const isRetired = (claudePath: string): boolean => {
  if (!claudePath.startsWith('.claude/')) return false;
  const [, kind, name = ''] = claudePath.split('/');
  if (kind === 'skills' && name !== '') return held('skills', name);
  return (
    !claudePath.endsWith('/') && held(claudePath.replace(/^\.claude\//, ''))
  );
};

export { isRetired };
