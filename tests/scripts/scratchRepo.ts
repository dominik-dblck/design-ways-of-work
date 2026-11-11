/**
 * - `scratchRepo` · a git repository in a temp folder, for one test file's cases
 * - its git runs with none of this repository's variables: a hook's never reach it
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { childEnv } from '../../scripts/scratch.ts';

interface ScratchRepo {
  readonly root: string;
  readonly git: (args: readonly string[]) => string;
  // a file written and committed: its commit
  readonly committed: (file: string, text: string) => string;
}

const AS_A_TEST = [
  '-c',
  'user.name=test',
  '-c',
  'user.email=test@local',
  '-c',
  'commit.gpgsign=false',
];

function scratchRepo({
  base,
  name,
  flags = [],
}: {
  readonly base: string;
  readonly name: string;
  readonly flags?: readonly string[];
}): ScratchRepo {
  const root = path.join(base, name);
  fs.mkdirSync(root, { recursive: true });
  const git = (args: readonly string[]): string =>
    execFileSync('git', [...AS_A_TEST, ...args], {
      cwd: root,
      encoding: 'utf8',
      env: childEnv(),
    }).trim();
  git(['init', '-q', '-b', 'main', ...flags]);
  const committed = (file: string, text: string): string => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), text);
    git(['add', '--', file]);
    git(['commit', '-q', '-m', `write ${file}`]);
    return git(['rev-parse', 'HEAD']);
  };
  return { root, git, committed };
}

export { scratchRepo };
