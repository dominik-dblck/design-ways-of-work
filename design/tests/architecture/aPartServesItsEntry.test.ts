/**
 * - `docs/rules/responsibility.md`: a part is read by its entry and its siblings, never by another entry
 */
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { entryOf, importsOf, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

function reachesIn(
  source: Source,
  entryOfFile: (file: string) => string | null,
): readonly string[] {
  const mine = entryOfFile(source.path) ?? source.path;
  return importsOf(source)
    .filter((one) => {
      const owner = entryOfFile(one.to);
      return owner !== null && owner !== mine;
    })
    .map((one) => `${source.path} → ${one.to}`);
}

describe('a part serves its entry', () => {
  const owners = (file: string): string | null =>
    /^sheet\/words\/(a|b)\//.exec(file)
      ? `sheet/words/${file.split('/')[2]}.ts`
      : null;

  it("an entry reading another entry's part is found; its own part and another entry pass", () => {
    expect(
      reachesIn(
        {
          path: 'sheet/words/a.ts',
          text: "import { X } from './a/x.ts';\nimport { Y } from './b/y.ts';\nimport { b } from './b.ts';",
        },
        owners,
      ),
    ).toEqual(['sheet/words/a.ts → sheet/words/b/y.ts']);
    expect(
      reachesIn(
        { path: 'sheet/words/a/z.ts', text: "import { X } from './x.ts';" },
        owners,
      ),
    ).toEqual([]);
  });

  it('no file beyond the baseline reaches into another entry', () => {
    expect(
      heldToItsBaseline(
        'aPartServesItsEntry',
        productionSources().flatMap((source) => reachesIn(source, entryOf)),
      ),
    ).toEqual({ added: [], fixed: [] });
  });
});
