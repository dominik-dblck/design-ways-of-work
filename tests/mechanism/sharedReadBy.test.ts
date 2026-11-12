import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { sharedReadBy } from './sharedReadBy.ts';

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wow-shared-read-'));

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

const planted = (file: string, text: string): void => {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
  fs.writeFileSync(path.join(root, file), text);
};

describe('the scratch copy holds each shared file its scripts read', () => {
  it('a new import of a shared file is followed, through it, and nothing outside the copy', () => {
    planted(
      'scripts/run.ts',
      "import { a } from '../shared/a.ts';\nimport { s } from '../scope.ts';\n",
    );
    planted('shared/a.ts', "export { b as a } from './lint/b.ts';\n");
    planted('shared/lint/b.ts', "const c = await import('../c.ts');\n");
    planted('shared/c.ts', "import './d.ts';\nexport const c = 1;\n");
    planted('shared/d.ts', 'console.log(1);\n');
    planted('shared/unread.ts', 'export const unread = 1;\n');
    planted('scope.ts', "import { unread } from './shared/unread.ts';\n");
    expect(sharedReadBy(root, ['scripts/run.ts'])).toEqual(
      ['shared/a.ts', 'shared/c.ts', 'shared/d.ts', 'shared/lint/b.ts'].map(
        (file) => path.normalize(file),
      ),
    );
  });
});
