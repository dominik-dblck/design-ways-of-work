import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it, vi } from 'vitest';
import { isDue, migrated, migratedDue } from '../../scripts/migrated.ts';
import { NOTEBOOK_REGISTRY } from './notebookRegistry.ts';
import { scratchRepo } from './scratchRepo.ts';
import { callsIn, stubbed, stubEnv } from './stubs.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-migrated-'));
const wow = path.join(base, 'wow');
fs.mkdirSync(wow);

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a migration moves files of a repository, and their imports follow', () => {
  const clone = scratchRepo({ base, name: 'follows' });
  const read = (file: string): string =>
    fs.readFileSync(path.join(clone.root, file), 'utf8');
  clone.committed('logic/rows.ts', "import { cut } from './cut.ts';\n");
  clone.committed('logic/cut.ts', 'export const cut = 1;\n');
  clone.committed('logic.ts', "export { rows } from './logic/rows.ts';\n");
  clone.committed(
    'legacy/old.ts',
    "import { rows } from '../logic/rows.ts';\n",
  );
  clone.committed('words.ts', "'plans.js · A', 'plans.js · B'\n");
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  const said = migrated({
    root: clone.root,
    wow,
    migration: {
      release: '0.1.0',
      removes: [],
      moves: [
        ['logic/rows.ts', 'sheet/rows.ts'],
        ['logic/cut.ts', 'sheet/rows/cut.ts'],
      ],
      edits: [
        {
          file: 'logic.ts',
          from: "export { rows } from './sheet/rows.ts';\n",
          to: '',
        },
        {
          file: 'words.ts',
          from: 'plans.js',
          to: 'project.js',
          isEveryPlace: true,
        },
      ],
      tree: null,
    },
  });

  it('a moved file reads what moved with it, from where both stand now', () => {
    expect(read('sheet/rows.ts')).toBe(
      "import { cut } from './rows/cut.ts';\n",
    );
  });

  it('an edit reads the text the imports left, and what it writes is staged', () => {
    expect(read('logic.ts')).toBe('');
    expect(clone.git(['diff', '--cached', '--name-only'])).toContain(
      'logic.ts',
    );
  });

  it('an edit asked of every place writes each place its text stands', () => {
    expect(read('words.ts')).toBe("'project.js · A', 'project.js · B'\n");
  });

  it('what is kept as it was keeps its imports', () => {
    expect(read('legacy/old.ts')).toBe(
      "import { rows } from '../logic/rows.ts';\n",
    );
  });

  it('a move of what an epic’s notebook imports is refused before anything moves', () => {
    clone.committed(
      'roadmaps/E10/E10Notes.ts',
      "import { rows } from '../../sheet/rows.ts';\n",
    );
    const asked = (): string =>
      migrated({
        root: clone.root,
        wow,
        migration: {
          release: '0.1.0',
          removes: [],
          moves: [['sheet/rows.ts', 'sheet/table.ts']],
          tree: null,
        },
      });
    expect(asked).toThrow(
      'a notebook keeps its words and imports what the migration moves, so nothing moved: roadmaps/E10/E10Notes.ts',
    );
    expect(fs.existsSync(path.join(clone.root, 'sheet/rows.ts'))).toBe(true);
  });

  it('it says how many moved, followed and were edited', () => {
    expect(said).toBe(
      '0 removed, 2 moved, 2 following, 2 edited, 0 written, 0 homed',
    );
  });

  it('an edit whose text is not there once, or not there at all, stops the migration', () => {
    const stopped =
      (edit: { readonly isEveryPlace?: true }): (() => string) =>
      () =>
        migrated({
          root: clone.root,
          wow,
          migration: {
            release: '0.1.0',
            removes: [],
            moves: [],
            edits: [
              { file: 'sheet/rows.ts', from: 'nowhere', to: '', ...edit },
            ],
            tree: null,
          },
        });
    for (const edit of [{}, { isEveryPlace: true } as const])
      expect(stopped(edit)).toThrow(
        'sheet/rows.ts: the edit’s text stands 0 times',
      );
  });

  it('a checkout that lacks a file the migration takes is refused before anything moves', () => {
    const asked = (): string =>
      migrated({
        root: clone.root,
        wow,
        migration: {
          release: '0.1.0',
          removes: ['sheet/rows.ts'],
          moves: [['logic/gone.ts', 'sheet/gone.ts']],
          tree: null,
        },
      });
    expect(asked).toThrow(
      'the checkout lacks what the migration takes, so nothing moved: logic/gone.ts',
    );
    expect(fs.existsSync(path.join(clone.root, 'sheet/rows.ts'))).toBe(true);
  });

  it('a checkout missing any tracked file is refused, a file the migration never names too', () => {
    clone.committed('kept/built.ts', 'export const built = 1;\n');
    fs.unlinkSync(path.join(clone.root, 'kept/built.ts'));
    const asked = (): string =>
      migrated({
        root: clone.root,
        wow,
        migration: {
          release: '0.1.0',
          removes: [],
          moves: [['sheet/rows.ts', 'sheet/moved.ts']],
          tree: null,
        },
      });
    expect(asked).toThrow(
      'the checkout lacks what the migration takes, so nothing moved: kept/built.ts',
    );
    expect(fs.existsSync(path.join(clone.root, 'sheet/rows.ts'))).toBe(true);
    clone.git(['checkout', '--', 'kept/built.ts']);
  });
});

describe('a migration is due on a repository pinned before its release', () => {
  const asking = {
    release: '0.4.0',
    removes: [],
    moves: [],
    tree: null,
  } as const;

  it.each([
    ['0.3.0', true],
    ['0.4.0', false],
    ['0.10.0', false],
    ['0.3.12', true],
    ['0.4', false],
    ['0.3', true],
  ])('pinned on %s, due: %s', (pinned, isAsked) => {
    expect(isDue(asking, pinned)).toBe(isAsked);
  });

  it('a version that is not numbers and dots is refused, never ordered', () => {
    expect(() => isDue(asking, '0.5.0-rc.1')).toThrow(
      '0.5.0-rc.1: a version is numbers and dots',
    );
  });
});

describe('a repository takes each migration its pin is before, in release order', () => {
  const clone = scratchRepo({ base, name: 'due' });
  clone.committed('a.ts', 'export const a = 1;\n');
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  const moving = (release: string, to: string) =>
    ({
      release,
      removes: [],
      moves: [['a.ts', to]],
      tree: null,
    }) as const;

  it('a migration the pin took is said and skipped; a later one runs', () => {
    expect(
      migratedDue({
        root: clone.root,
        wow,
        migrations: [moving('0.10.0', 'b.ts'), moving('0.9.0', 'c.ts')],
        pinned: '0.9.0',
      }),
    ).toEqual([
      "migrated · nothing: its pin, v0.9.0, took v0.9.0's",
      'migrated · 0 removed, 1 moved, 0 following, 0 edited, 0 written, 0 homed, for v0.10.0',
    ]);
    expect(fs.existsSync(path.join(clone.root, 'b.ts'))).toBe(true);
  });

  it('a repository no migration asks anything of is told so', () => {
    expect(
      migratedDue({ root: clone.root, wow, migrations: [], pinned: '0.9.0' }),
    ).toEqual(['migrated · nothing: the release in hand asks none']);
  });
});

describe('a file a home holds from a release on leaves the repository’s index, kept on disk', () => {
  const clone = scratchRepo({ base, name: 'homed' });
  const home = path.join(base, 'homing');
  const typesAt = 'roadmaps/edges/edgeTypes.ts';
  const types = 'export type Edge = string;\n';
  fs.mkdirSync(path.join(home, 'design', 'roadmaps', 'edges'), {
    recursive: true,
  });
  fs.writeFileSync(path.join(home, 'design', typesAt), types);
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  const homing = (): string =>
    migrated({
      root: clone.root,
      wow: home,
      migration: {
        release: '0.1.0',
        removes: [],
        moves: [],
        homed: [typesAt],
        tree: null,
      },
    });

  it('a copy that differs from the home is refused, nothing moved', () => {
    clone.committed(typesAt, 'export type Edge = number;\n');
    expect(homing).toThrow(
      `a file a home now holds differs from the home, so nothing moved: ${typesAt}`,
    );
    expect(clone.git(['ls-files', typesAt])).toBe(typesAt);
  });

  it('a copy that is the home’s leaves the index and stays on disk', () => {
    clone.committed(typesAt, types);
    expect(homing()).toBe(
      '0 removed, 0 moved, 0 following, 0 edited, 0 written, 1 homed',
    );
    expect(clone.git(['ls-files', typesAt])).toBe('');
    expect(fs.readFileSync(path.join(clone.root, typesAt), 'utf8')).toBe(types);
  });
});

describe('a package the homes read is added as yarn adds it', () => {
  const clone = scratchRepo({ base, name: 'added' });
  const bin = path.join(base, 'added-bin');
  const calls = path.join(base, 'added-calls.txt');
  stubbed(bin, ['yarn']);
  fs.writeFileSync(calls, '');
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  clone.committed('package.json', '{ "name": "a" }\n');
  clone.committed('yarn.lock', '');

  it('each at its version, exact, no script of the repository run', () => {
    vi.stubEnv('PATH', `${bin}${path.delimiter}${String(process.env.PATH)}`);
    for (const [name, setting] of Object.entries(stubEnv({ calls })))
      vi.stubEnv(name, setting);
    expect(
      migrated({
        root: clone.root,
        wow,
        migration: {
          release: '0.1.0',
          removes: [],
          moves: [],
          dependencies: { 'lucide-react': '1.69.0' },
          tree: null,
        },
      }),
    ).toBe(
      '0 removed, 0 moved, 0 following, 0 edited, 0 written, 0 homed, 1 added',
    );
    vi.unstubAllEnvs();
    expect(callsIn(calls)).toEqual([
      'yarn add --exact --ignore-scripts --silent lucide-react@1.69.0',
    ]);
  });
});

describe('a package no home reads any longer is removed as yarn removes it', () => {
  const clone = scratchRepo({ base, name: 'dropped' });
  const bin = path.join(base, 'dropped-bin');
  const calls = path.join(base, 'dropped-calls.txt');
  stubbed(bin, ['yarn']);
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  clone.committed('yarn.lock', '');
  const dropping = (): string => {
    fs.writeFileSync(calls, '');
    vi.stubEnv('PATH', `${bin}${path.delimiter}${String(process.env.PATH)}`);
    for (const [name, setting] of Object.entries(stubEnv({ calls })))
      vi.stubEnv(name, setting);
    const said = migrated({
      root: clone.root,
      wow: base,
      migration: {
        release: '0.1.0',
        removes: [],
        moves: [],
        dropped: ['lucide-static'],
        tree: null,
      },
    });
    vi.unstubAllEnvs();
    return said;
  };

  it('one the manifest holds: removed, no script of the repository run', () => {
    clone.committed(
      'package.json',
      '{ "name": "a", "dependencies": { "lucide-static": "1.69.0" } }\n',
    );
    expect(dropping()).toBe(
      '0 removed, 0 moved, 0 following, 0 edited, 0 written, 0 homed, 1 dropped',
    );
    expect(callsIn(calls)).toEqual([
      'yarn remove --ignore-scripts --silent lucide-static',
    ]);
  });

  it('one the manifest no longer holds: nothing run', () => {
    clone.committed('package.json', '{ "name": "a" }\n');
    expect(dropping()).toBe(
      '0 removed, 0 moved, 0 following, 0 edited, 0 written, 0 homed',
    );
    expect(callsIn(calls)).toEqual([]);
  });
});
