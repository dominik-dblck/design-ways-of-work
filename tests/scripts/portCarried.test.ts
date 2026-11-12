import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { carriedDropped } from '../../scripts/portCarried.ts';
import { gitAt, ruledOn, unmerged } from '../../scripts/portSettle.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-carried-'));

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a port takes its trunk: a change a home holds is left to the home', () => {
  const product = scratchRepo({ base, name: 'product' });
  const at = (file: string): string => path.join(product.root, file);
  product.committed('views/board.ts', 'a board\n');
  product.git(['checkout', '-q', '-b', 'port']);
  product.git(['rm', '-q', 'views/board.ts']);
  product.git(['commit', '-q', '-m', 'a home holds the board']);
  product.git(['checkout', '-q', 'main']);
  product.committed('views/board.ts', 'a board, with its progress\n');
  product.committed('views/progress.ts', 'the progress\n');
  product.committed('views/own.ts', 'the product’s own\n');
  const git = gitAt(product.root);
  const blobOf = (file: string): string => git(['rev-parse', `main:${file}`]);
  const port = {
    trunk: 'main',
    base: '',
    moves: '',
    carried: ['views/board.ts', 'views/progress.ts'].map((file) => ({
      file,
      blob: blobOf(file),
      how: 'carried',
    })),
    kept: [],
    rewritten: [],
    names: [],
  };
  product.git(['checkout', '-q', 'port']);
  git(['merge', '--no-commit', '--no-ff', 'main'], { mayFail: true });
  const said = unmerged(git).map(
    (conflict) =>
      ruledOn({ conflict, git, root: product.root, port, moves: [] }).says,
  );
  const dropped = carriedDropped(git, port);

  it('a changed file whose row names the trunk’s blob is not laid anywhere', () => {
    expect(said).toEqual([
      'CARRIED · views/board.ts · its home holds the change',
    ]);
    expect(fs.existsSync(at('views/board.ts'))).toBe(false);
  });

  it('a file the trunk added with a row leaves the merge; one without stays the product’s', () => {
    expect(dropped).toEqual([
      'CARRIED · views/progress.ts · the trunk added it, its home holds it',
    ]);
    expect(fs.existsSync(at('views/progress.ts'))).toBe(false);
    expect(git(['ls-files', '--', 'views/own.ts'])).toBe('views/own.ts');
  });
});
