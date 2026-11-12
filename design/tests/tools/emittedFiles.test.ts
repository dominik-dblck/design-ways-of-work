import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { present } from '../../tools/layout/emittedFiles.ts';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'design-emitted-'));
fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs', 'held.ts'), 'export {};\n');

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

interface Row {
  readonly module: string;
  readonly optional?: true;
}

const rowOf = (module: string, optional?: true): Row =>
  optional ? { module, optional } : { module };

describe('the build prints what a product holds, and refuses what it lacks', () => {
  it('a row the product holds prints; an optional one it lacks is left out', () => {
    const rows = [rowOf('docs/held.ts'), rowOf('dev/map.ts', true)];
    expect(present(rows, root, (one) => one.module)).toEqual([
      rowOf('docs/held.ts'),
    ]);
  });

  it('a row it lacks that is not optional stops the build, naming its file', () => {
    const rows = [rowOf('docs/held.ts'), rowOf('docs/gone.ts')];
    expect(() => present(rows, root, (one) => one.module)).toThrow(
      'docs/gone.ts · the build prints it, and the product holds none',
    );
  });
});
