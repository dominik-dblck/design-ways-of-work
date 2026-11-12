import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { since, writtenIn } from '../../scripts/digests.ts';
import { migrated } from '../../scripts/migrated.ts';
import { NOTEBOOK_REGISTRY } from './notebookRegistry.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-written-'));
const wow = path.join(base, 'wow');

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('what the runs wrote in a clone, a migration left out', () => {
  const clone = scratchRepo({ base, name: 'clone' });
  const at = (file: string): string => path.join(clone.root, file);
  clone.committed('kept.txt', 'kept\n');
  clone.committed('leaves.txt', 'leaves\n');
  clone.committed('moves.txt', 'moves\n');
  clone.committed(NOTEBOOK_REGISTRY.file, NOTEBOOK_REGISTRY.text);
  fs.mkdirSync(path.join(wow, 'tree', 'folder'), { recursive: true });
  fs.writeFileSync(path.join(wow, 'tree', 'folder', 'asked.txt'), 'asked\n');
  const said = migrated({
    root: clone.root,
    wow,
    migration: {
      release: '0.1.0',
      removes: ['leaves.txt'],
      moves: [['moves.txt', 'held/moves.txt']],
      tree: 'tree',
    },
  });
  const before = writtenIn(clone.root);

  it('a migration removes, moves and writes through the index, and says how many', () => {
    expect(said).toBe('1 removed, 1 moved, 0 following, 0 edited, 1 written');
    expect(clone.git(['ls-files'])).toBe(
      [
        'folder/asked.txt',
        'held/moves.txt',
        'kept.txt',
        NOTEBOOK_REGISTRY.file,
      ].join('\n'),
    );
    expect([...before.keys()].sort()).toEqual([
      'folder/asked.txt',
      'held/moves.txt',
      'leaves.txt',
      'moves.txt',
    ]);
  });

  it('with no run after it, the runs wrote nothing', () => {
    expect([...since(before, writtenIn(clone.root))]).toEqual([]);
  });

  it('a file a run writes is theirs: a new one, a kept one, one the migration wrote', () => {
    fs.writeFileSync(at('new.txt'), 'new\n');
    fs.writeFileSync(at('kept.txt'), 'rewritten\n');
    fs.writeFileSync(at('folder/asked.txt'), 'answered\n');
    expect([...since(before, writtenIn(clone.root)).keys()].sort()).toEqual([
      'folder/asked.txt',
      'kept.txt',
      'new.txt',
    ]);
  });

  it('a file a run puts back as committed is named too', () => {
    clone.git(['reset', '-q', 'HEAD', '--', 'leaves.txt']);
    clone.git(['checkout', '-q', '--', 'leaves.txt']);
    expect(since(before, writtenIn(clone.root)).get('leaves.txt')).toBe(
      '<as committed>',
    );
  });
});
