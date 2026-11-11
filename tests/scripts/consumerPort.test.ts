import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { portFaults } from '../../scripts/consumerPort.ts';
import type { Consumer } from '../../scripts/consumerTypes.ts';
import type { Carried } from '../../scripts/portTypes.ts';
import { scratchRepo } from './scratchRepo.ts';

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-port-'));
const wow = path.join(base, 'wow');

afterAll(() => {
  fs.rmSync(base, { recursive: true, force: true });
});

describe('a repository whose work lands on a branch that takes nothing yet', () => {
  const product = scratchRepo({ base, name: 'product' });
  // before the port: a file a home will hold, one the port moves as it is, one it moves and rewrites, one it leaves
  product.committed('tools/check.ts', 'a check\n');
  product.committed('data/guard-map.json', '{ "files": ["one", "two"] }\n');
  product.committed('sheet/gate-rules.ts', 'rows\n');
  const shared = product.committed('sheet/kept.ts', 'kept\n');
  product.git(['checkout', '-q', '-b', 'port']);
  product.git(['rm', '-q', 'tools/check.ts']);
  fs.mkdirSync(path.join(product.root, 'legacy'));
  product.git(['mv', 'data/guard-map.json', 'legacy/guard-map.json']);
  product.git(['rm', '-q', 'sheet/gate-rules.ts']);
  product.committed('sheet/gateRules.ts', 'the same rows, written anew\n');
  product.git(['checkout', '-q', 'main']);
  fs.mkdirSync(wow, { recursive: true });
  // the map names the move git cannot read: the file was rewritten as it moved
  fs.writeFileSync(
    path.join(wow, 'moves.tsv'),
    '# from\tto\nsheet/gate-rules.ts\tsheet/gateRules.ts\n',
  );
  const faults = (carried: readonly Carried[] = []): readonly string[] => {
    const consumer: Consumer = {
      name: 'product',
      path: path.relative(wow, product.root),
      ref: 'port',
      commands: [],
      folders: [],
      migration: null,
      port: { trunk: 'main', base: shared, moves: 'moves.tsv', carried },
    };
    return portFaults({ consumer, wow });
  };
  const blobOf = (file: string): string =>
    product.git(['rev-parse', `main:${file}`]);

  it('a branch that holds the trunk whole, and a trunk that moved nothing, is no fault', () => {
    expect(faults()).toEqual([]);
  });

  it('a trunk past the branch is named with its count', () => {
    product.committed('sheet/kept.ts', 'kept, and more\n');
    product.committed('sheet/gate-rules.ts', 'rows, and one more\n');
    product.committed('data/guard-map.json', '{ "files": ["one"] }\n');
    expect(faults()).toEqual([
      'main stands 3 commits past port: the branch takes them first',
    ]);
  });

  it('a trunk change to a file the branch holds at neither path is asked for, until it is carried', () => {
    product.committed('tools/check.ts', 'a check, mended\n');
    const asked =
      'main changed tools/check.ts, a file the way of working holds now: carry the change into its home, then name it in ports/';
    expect(faults()).toContain(asked);
    expect(faults().filter((one) => one.includes(' changed '))).toEqual([
      asked,
    ]);
    const carried = [
      { file: 'tools/check.ts', blob: blobOf('tools/check.ts'), how: 'a home' },
    ];
    expect(faults(carried).filter((one) => one.includes(' changed '))).toEqual(
      [],
    );
    product.committed('tools/check.ts', 'a check, mended again\n');
    expect(faults(carried)).toContain(asked);
  });

  it('a branch that took the trunk stands behind it no more', () => {
    product.git(['checkout', '-q', 'port']);
    product.git(['merge', '-q', '-s', 'ours', '-m', 'the trunk taken', 'main']);
    product.git(['checkout', '-q', 'main']);
    expect(faults().filter((one) => one.includes(' stands '))).toEqual([]);
  });
});
