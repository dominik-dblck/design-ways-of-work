import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { isDue, migrated } from '../../scripts/migrated.ts';
import { scratchRepo } from './scratchRepo.ts';

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

  it('it says how many moved, followed and were edited', () => {
    expect(said).toBe('0 removed, 2 moved, 2 following, 2 edited, 0 written');
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
