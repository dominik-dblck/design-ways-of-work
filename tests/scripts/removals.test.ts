import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { HERE } from '../../scripts/repos.ts';
import { childEnv } from '../../scripts/scratch.ts';

const GUARD = 'shared/emptied.ts';
// a folder removed with all it holds: by node, by a shell
const WITH_ALL_IT_HOLDS = [
  /\brm(?:dir)?Sync\([^;]*\brecursive\b/s,
  /\bfs\.rm\(/,
  /\brm\s+-\w*r/i,
];

// tracked or new, as the tree holds them: the scripts, the hooks and the homes; a test removes the folder it made
const scripts = execFileSync(
  'git',
  ['ls-files', '-z', '--cached', '--others', '--exclude-standard'].concat(
    'scripts',
    '.husky',
    'shared',
    'design',
    'dev',
    'design-system',
  ),
  { cwd: HERE, encoding: 'utf8', env: childEnv() },
)
  .split('\0')
  .filter(
    (file) =>
      file !== '' &&
      !file.endsWith('.test.ts') &&
      fs.existsSync(path.join(HERE, file)),
  );

const removesAll = (file: string): boolean => {
  const text = fs.readFileSync(path.join(HERE, file), 'utf8');
  return WITH_ALL_IT_HOLDS.some((pattern) => pattern.test(text));
};

describe('a script or a home removes a folder through the guard alone', () => {
  it('the guard is where the one removal stands', () => {
    expect(scripts).toContain(GUARD);
    expect(removesAll(GUARD)).toBe(true);
  });

  it('no other script or home removes a folder with all it holds', () => {
    expect(
      scripts.filter((file) => file !== GUARD && removesAll(file)),
    ).toEqual([]);
  });
});
