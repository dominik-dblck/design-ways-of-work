import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { migrated } from '../../scripts/migrated.ts';
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
  const said = migrated({
    root: clone.root,
    wow,
    migration: {
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

  it('what is kept as it was keeps its imports', () => {
    expect(read('legacy/old.ts')).toBe(
      "import { rows } from '../logic/rows.ts';\n",
    );
  });

  it('it says how many moved, followed and were edited', () => {
    expect(said).toBe('0 removed, 2 moved, 2 following, 1 edited, 0 written');
  });

  it('an edit whose text is not there once stops the migration', () => {
    expect(() =>
      migrated({
        root: clone.root,
        wow,
        migration: {
          removes: [],
          moves: [],
          edits: [{ file: 'sheet/rows.ts', from: 'nowhere', to: '' }],
          tree: null,
        },
      }),
    ).toThrow('sheet/rows.ts: the edit’s text stands 0 times');
  });
});
