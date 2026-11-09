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
        { folders: FOLDERS, ignore: [], cases: [] },
      ),
    ).toEqual([
      'app/api/[id]/Bad_Name.ts',
      'app/components/inner/lower.ts',
      'app/deep/deeper/Also_Bad.ts',
    ]);
  });

  it("a folder no key covers takes the root's rules, keyed ''", () => {
    expect(
      lintedTree(['app/x.ts', 'stray/y.ts', 'notes/z.md'], {
        folders: { '': { '.dir': 'regex:^(?:app|notes)$' }, ...FOLDERS },
        ignore: [],
        cases: [],
      }),
    ).toEqual(['stray']);
  });

  it('a style, a page and a script are banned in every folder, found by their folder, an ignored one aside', () => {
    expect(
      lintedTree(['app/deep/look.css', 'notes/page.html', 'dist/bundle.js'], {
        folders: FOLDERS,
        ignore: ['dist'],
        cases: [],
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
          cases: [],
        },
      ),
    ).toEqual(['.', 'tools']);
  });

  it("a route folder's own rule holds, its brackets read as its name", () => {
    expect(
      lintedTree(['app/api/[id]/route.ts', 'app/api/i/route.ts'], {
        folders: { ...FOLDERS, 'app/api/*': { '.ts': 'exists:0' } },
        ignore: [],
        cases: [],
      }),
    ).toEqual(['app/api/[id]', 'app/api/i']);
  });
  it("a file's case is its kind's, at the root and below: code camel, a view Pascal too, prose kebab, a fixed name, a partial", () => {
    expect(
      lintedTree(
        [
          'Bad-Root.ts',
          'goodRoot.ts',
          'notes/fine.ts',
          'notes/not-fine.ts',
          'notes/Card.tsx',
          'notes/README.md',
          'notes/_one-part.md',
          'notes/Some_Doc.md',
          'notes/aCase.test.ts',
          'notes/A-Case.test.ts',
        ],
        { folders: {}, ignore: [], cases: [] },
      ),
    ).toEqual([
      'Bad-Root.ts',
      'notes/A-Case.test.ts',
      'notes/Some_Doc.md',
      'notes/not-fine.ts',
    ]);
  });

  it("a scope's case adds its form where its folders hold it, or a kind of its own", () => {
    expect(
      lintedTree(
        [
          'rules/one-home.ts',
          'other/one-home.ts',
          'rules/aSwitch.off.test.ts',
          'rules/A-Switch.off.test.ts',
        ],
        {
          folders: {},
          ignore: [],
          cases: [
            {
              folders: ['rules'],
              kinds: { '.ts': 'kebab-case', '.off.test.ts': 'camelCase' },
              why: 'a rule file by its key',
            },
          ],
        },
      ),
    ).toEqual(['other/one-home.ts', 'rules/A-Switch.off.test.ts']);
  });

  it('a folder that rules every kind itself keeps its own: the case adds no kind it bans', () => {
    expect(
      lintedTree(['shape/Card.tsx', 'shape/notes.md', 'free/notes.md'], {
        folders: { shape: { '.tsx': 'PascalCase', '.*': 'exists:0' } },
        ignore: [],
        cases: [],
      }),
    ).toEqual(['shape']);
  });
});
