import { describe, expect, it } from 'vitest';
import { lintedTree } from './lintedTree.ts';

const FOLDERS = {
  app: { '.ts': 'camelCase' },
  'app/components': { '.ts': 'PascalCase' },
};

describe("a repository's folder rules", () => {
  it('a key covers the folders below it, the most specific key wins, a route folder is read as named', () => {
    expect(
      lintedTree(
        [
          'app/api/[id]/route.ts',
          'app/api/[id]/Bad_Name.ts',
          'app/deep/deeper/Also_Bad.ts',
          'app/components/Mark.ts',
          'app/components/inner/lower.ts',
        ],
        { folders: FOLDERS, ignore: [] },
      ),
    ).toEqual([
      'app/api/[id]/Bad_Name.ts',
      'app/components/inner/lower.ts',
      'app/deep/deeper/Also_Bad.ts',
    ]);
  });

  it('a style, a page and a script are banned in every folder, found by their folder, an ignored one aside', () => {
    expect(
      lintedTree(['app/deep/look.css', 'notes/page.html', 'dist/bundle.js'], {
        folders: FOLDERS,
        ignore: ['dist'],
      }),
    ).toEqual(['app/deep', 'notes']);
  });

  it('a name of many dots is banned by its last extension, at the root and below', () => {
    expect(
      lintedTree(
        ['eslint.config.js', 'tools/a.b.c.mjs', 'tools/fine.config.ts'],
        {
          folders: FOLDERS,
          ignore: [],
        },
      ),
    ).toEqual(['.', 'tools']);
  });

  it("a route folder's own rule holds, its brackets read as its name", () => {
    expect(
      lintedTree(['app/api/[id]/route.ts', 'app/api/i/route.ts'], {
        folders: { ...FOLDERS, 'app/api/*': { '.ts': 'exists:0' } },
        ignore: [],
      }),
    ).toEqual(['app/api/[id]', 'app/api/i']);
  });
});
