import { describe, expect, it } from 'vitest';
import { closed, treeOf } from '../../scripts/mapTree.ts';

// a map's tree block of the given lines under its root
const mapOf = (lines: readonly string[]): string =>
  ['# Map', '', '```', 'repo/', ...lines, '```', ''].join('\n');

// the tree's lines, those under a cut path gone, its branches drawn again
const cutTree = (lines: readonly string[], cut: string): readonly string[] =>
  closed(treeOf(mapOf(lines)).filter((line) => !line.path.startsWith(cut))).map(
    (line) => line.text,
  );

describe('a cut map closes its branches', () => {
  it('reads each folder with its path from the root', () => {
    expect(
      treeOf(mapOf(['├── app/', '│   └── api/', '└── docs/'])).map(
        (line) => line.path,
      ),
    ).toEqual(['app/', 'app/api/', 'docs/']);
  });

  it('a cut last sibling: the one before it closes', () => {
    expect(cutTree(['├── a/', '├── b/', '└── c/'], 'c/')).toEqual([
      '├── a/',
      '└── b/',
    ]);
  });

  it('a cut middle sibling: the others stand as they were', () => {
    expect(cutTree(['├── a/', '├── b/', '└── c/'], 'b/')).toEqual([
      '├── a/',
      '└── c/',
    ]);
  });

  it('a cut after a folder with children: it closes, and its bar ends beside them', () => {
    expect(
      cutTree(['├── a/', '│   ├── a1/', '│   └── a2/', '└── b/'], 'b/'),
    ).toEqual(['└── a/', '    ├── a1/', '    └── a2/']);
  });
});
