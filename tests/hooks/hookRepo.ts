/**
 * - `hookRepo` · a scratch repository that took the shared home, its tools stubs
 * - `ran` on it · a hook run there: its exit, what it printed, each tool's call
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { HERE } from '../../scripts/repos.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { scratchRepo } from '../scripts/scratchRepo.ts';
import type { ScratchRepo } from '../scripts/scratchRepo.ts';
import { callsIn, stubbed, stubEnv } from '../scripts/stubs.ts';

// what the hooks import by name: resolved here as an install would resolve them
const RESOLVED = [
  '@typescript-eslint/utils',
  'eslint',
  'minimatch',
  'prettier',
  'typescript',
];
const BINS = ['prettier', 'eslint', 'cspell'];

const SCOPE = `const scope = {
  ignores: ['fixtures/**'],
  checks: { commit: ['own:commit'], featureEnd: ['own:end'] },
};

export { scope };
`;

interface Hooked {
  readonly hook: string;
  readonly args?: readonly string[];
  // what the hook reads on its input
  readonly input?: string;
  // the tools, or the scripts yarn runs, that fail
  readonly red?: readonly string[];
  // what a failing one prints, and what it prints as an error
  readonly out?: string;
  readonly err?: string;
}

interface Said {
  readonly status: number | null;
  readonly stdout: string;
  readonly calls: readonly string[];
}

interface HookRepo extends ScratchRepo {
  readonly ran: (hooked: Hooked) => Said;
}

function hookRepo({
  base,
  name,
}: {
  readonly base: string;
  readonly name: string;
}): HookRepo {
  const repo = scratchRepo({ base, name });
  const modules = path.join(repo.root, 'node_modules');
  const yarnAt = path.join(modules, '.stubs');
  const calls = path.join(base, `${name}-calls.txt`);
  fs.cpSync(path.join(HERE, 'shared'), path.join(repo.root, 'shared'), {
    recursive: true,
  });
  stubbed(path.join(modules, '.bin'), BINS);
  stubbed(yarnAt, ['yarn']);
  for (const one of RESOLVED) {
    fs.mkdirSync(path.dirname(path.join(modules, one)), { recursive: true });
    fs.symlinkSync(
      path.join(HERE, 'node_modules', one),
      path.join(modules, one),
    );
  }
  fs.writeFileSync(
    path.join(repo.root, '.gitignore'),
    'node_modules/\nshared/\n',
  );
  fs.writeFileSync(
    path.join(repo.root, 'package.json'),
    '{ "type": "module" }\n',
  );
  fs.writeFileSync(path.join(repo.root, 'scope.ts'), SCOPE);
  repo.git(['add', '--', '.gitignore', 'package.json', 'scope.ts']);
  repo.git(['commit', '-q', '-m', 'a repository that took the shared home']);
  const ran = ({ hook, args = [], input = '', ...stubs }: Hooked): Said => {
    fs.writeFileSync(calls, '');
    const done = spawnSync(
      process.execPath,
      [path.join(repo.root, 'shared', 'hooks', hook), ...args],
      {
        cwd: repo.root,
        input,
        encoding: 'utf8',
        env: {
          ...childEnv(),
          ...stubEnv({ calls, ...stubs }),
          PATH: `${yarnAt}${path.delimiter}${process.env.PATH ?? ''}`,
        },
      },
    );
    return {
      status: done.status,
      stdout: `${done.stdout}${done.stderr}`,
      calls: callsIn(calls),
    };
  };
  return { ...repo, ran };
}

export { hookRepo };
