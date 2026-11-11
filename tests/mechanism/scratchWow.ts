/**
 * - `scratchWow` · a scratch way of working: these scripts, a remote, a product
 * - `ran`, `inHand`, `held` on it · a script run there, the release, a remote ref
 * - `portsOf`, `contractOf` · its ports with a migration, its contract's registries
 */
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { Unreleased } from '../../scripts/changelogTypes.ts';
import type { Migration } from '../../scripts/migrationTypes.ts';
import { HERE } from '../../scripts/repos.ts';
import { childEnv } from '../../scripts/scratch.ts';
import { scratchRepo } from '../scripts/scratchRepo.ts';
import type { ScratchRepo } from '../scripts/scratchRepo.ts';
import { callsIn, stubbed, stubEnv } from '../scripts/stubs.ts';

const VERSION = '0.1.10';
// a product's own take, as one that takes the way of working writes it
const TAKE =
  'T=$(mktemp -d) && cp -R node_modules/design-ways-of-work/shared/take "$T" && node "$T/take/takeWow.ts"';

// the one repository a test's way of working names, and what the release in hand asks of it
const portsOf = (migration: Migration | null): string => `const CONSUMERS = [
  {
    name: 'product',
    path: '../product',
    ref: 'main',
    commands: [['says']],
    folders: [],
    migration: ${JSON.stringify(migration)},
    port: null,
  },
];
const BUILD_SOURCE = '../build';

export { BUILD_SOURCE, CONSUMERS };
`;

// the registries every product holds, and a part of its own it may lack
const contractOf = (registries: readonly string[]): string => {
  const rows = [
    ...registries.map((file) => ({
      file,
      kind: 'registry',
      what: 'a registry',
    })),
    { file: 'own.txt', kind: 'plug', what: 'a part of its own' },
  ];
  return `const CONTRACT = ${JSON.stringify(rows)};\n\nexport { CONTRACT };\n`;
};

const NOTHING_IN_HAND: Unreleased = {
  kind: 'minor',
  what: '',
  action: 'none: move the pin to the tag',
  rules: { added: [], changed: [], removed: [] },
  outputs: {},
};

interface Run {
  readonly script: string;
  readonly args?: readonly string[];
  // the yarn of this machine, as the gate needs it; else a stub behind the hooks
  readonly isReal?: boolean;
  // the scripts the stub yarn fails, and what it then prints
  readonly red?: readonly string[];
  readonly out?: string;
}

interface Ran {
  readonly status: number | null;
  readonly stdout: string;
  readonly calls: readonly string[];
}

interface ScratchWow {
  readonly wow: ScratchRepo;
  readonly product: ScratchRepo;
  // what a child of a test runs in: no name of git's, a yarn cache of its own
  readonly env: NodeJS.ProcessEnv;
  readonly ran: (run: Run) => Ran;
  readonly inHand: (next: Partial<Unreleased>) => void;
  // the commit a ref of the remote stands on, or none
  readonly held: (ref: string) => string;
}

const json = (held: unknown): string => `${JSON.stringify(held, null, 2)}\n`;

const changelog = (next: Unreleased): string =>
  `const NEXT = ${JSON.stringify(next)};\n\nconst RELEASES = [];\n\nexport { NEXT, RELEASES };\n`;

// the hooks git runs there: the commit's and the push's, as this repository's own
function hooked(wow: ScratchRepo): void {
  const hooks = path.join(wow.root, '.husky', '_');
  fs.mkdirSync(hooks, { recursive: true });
  fs.writeFileSync(path.join(hooks, '.gitignore'), '*\n');
  fs.writeFileSync(
    path.join(hooks, 'pre-commit'),
    '#!/bin/sh\nyarn -s check:chunk --staged --write\n',
    { mode: 0o755 },
  );
  fs.writeFileSync(
    path.join(hooks, 'pre-push'),
    `#!/bin/sh\n"${process.execPath}" scripts/prePush.ts "$@"\n`,
    { mode: 0o755 },
  );
  wow.git(['config', 'core.hooksPath', '.husky/_']);
  wow.git(['config', 'user.name', 'test']);
  wow.git(['config', 'user.email', 'test@local']);
  wow.git(['config', 'commit.gpgsign', 'false']);
}

// this repository's scripts and its take, homes of its own, a manifest, the ports of a test
function written(wow: ScratchRepo): void {
  const at = (...steps: readonly string[]): string =>
    path.join(wow.root, ...steps);
  for (const folder of ['scripts', path.join('shared', 'take')])
    fs.cpSync(path.join(HERE, folder), at(folder), { recursive: true });
  for (const folder of ['design', 'ports', 'releases', 'node_modules'])
    fs.mkdirSync(at(folder));
  fs.symlinkSync(
    path.join(HERE, 'node_modules', 'prettier'),
    at('node_modules', 'prettier'),
  );
  fs.copyFileSync(path.join(HERE, '.gitattributes'), at('.gitattributes'));
  fs.writeFileSync(at('.gitignore'), 'node_modules/\n.consumers/\n');
  fs.writeFileSync(at('design', 'says.txt'), 'pinned\n');
  fs.writeFileSync(at('ports', 'consumers.ts'), portsOf(null));
  fs.writeFileSync(at('ports', 'contract.ts'), contractOf(['registry.txt']));
  fs.writeFileSync(at('releases', 'changelog.ts'), changelog(NOTHING_IN_HAND));
  fs.writeFileSync(
    at('package.json'),
    json({
      name: 'design-ways-of-work',
      version: VERSION,
      private: true,
      type: 'module',
    }),
  );
  wow.git(['add', '--all']);
  wow.git(['commit', '-q', '-m', 'a way of working']);
  wow.git(['tag', `v${VERSION}`]);
}

// a repository that takes two homes, pinned to the tag on the remote as a product pins it
function producing(base: string, remote: string): ScratchRepo {
  const product = scratchRepo({ base, name: 'product' });
  fs.writeFileSync(path.join(product.root, '.gitignore'), 'node_modules/\n');
  fs.writeFileSync(path.join(product.root, 'registry.txt'), 'no row yet\n');
  // a file a later release takes from it
  fs.writeFileSync(path.join(product.root, 'package-lock.json'), '{}\n');
  fs.writeFileSync(
    path.join(product.root, 'package.json'),
    json({
      name: 'product',
      version: '1.0.0',
      private: true,
      license: 'UNLICENSED',
      type: 'module',
      wow: { takes: ['design', 'shared'] },
      scripts: { wow: TAKE, postinstall: 'yarn -s wow', says: 'cat says.txt' },
      dependencies: {
        'design-ways-of-work': `git+file://${remote}#v${VERSION}`,
      },
    }),
  );
  product.git(['add', '--all']);
  product.git(['commit', '-q', '-m', 'a product']);
  return product;
}

function scratchWow({
  base,
  name,
}: {
  readonly base: string;
  readonly name: string;
}): ScratchWow {
  const home = path.join(base, name);
  const remote = path.join(home, 'remote.git');
  const calls = path.join(home, 'calls.txt');
  const yarnAt = path.join(home, 'stubs');
  const wow = scratchRepo({ base: home, name: 'wow' });
  const env = { ...childEnv(), YARN_CACHE_FOLDER: path.join(home, 'cache') };
  written(wow);
  hooked(wow);
  execFileSync('git', ['clone', '-q', '--bare', wow.root, remote], { env });
  wow.git(['remote', 'add', 'origin', remote]);
  stubbed(yarnAt, ['yarn']);
  return {
    wow,
    product: producing(home, remote),
    env,
    ran: ({ script, args = [], isReal = false, ...stubs }) => {
      fs.writeFileSync(calls, '');
      const done = spawnSync(
        process.execPath,
        [path.join('scripts', script), ...args],
        {
          cwd: wow.root,
          encoding: 'utf8',
          env: {
            ...env,
            ...stubEnv({ calls, ...stubs }),
            PATH: `${isReal ? '' : `${yarnAt}${path.delimiter}`}${process.env.PATH ?? ''}`,
          },
        },
      );
      return {
        status: done.status,
        stdout: `${done.stdout}${done.stderr}`,
        calls: callsIn(calls),
      };
    },
    inHand: (next) => {
      wow.committed(
        'releases/changelog.ts',
        changelog({ ...NOTHING_IN_HAND, ...next }),
      );
    },
    held: (ref) =>
      execFileSync('git', ['ls-remote', remote, ref], { encoding: 'utf8', env })
        .split('\t')[0]
        ?.trim() ?? '',
  };
}

export { contractOf, portsOf, scratchWow };
export type { ScratchWow };
