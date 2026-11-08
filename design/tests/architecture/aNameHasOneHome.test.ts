/**
 * - `docs/rules/one-home.md`: a name a part exports is declared in one file
 */
import { describe, expect, it } from 'vitest';
import { heldToItsBaseline } from './baseline.ts';
import { exportedNamesOf } from './fileSyntax.ts';
import { isEntry, isSheet, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

function twiceIn(sources: readonly Source[]): readonly string[] {
  const homes = new Map<string, string[]>();
  for (const source of sources.filter(
    (one) => isSheet(one.path) && !isEntry(one.path),
  ))
    for (const name of exportedNamesOf(source))
      homes.set(name, [...(homes.get(name) ?? []), source.path]);
  return [...homes]
    .filter(([, files]) => files.length > 1)
    .map(([name, files]) => `${name} · ${files.join(', ')}`);
}

describe('a name has one home', () => {
  it('a name two parts export is found; one entry name beside a part passes', () => {
    expect(
      twiceIn([
        {
          path: 'sheet/words/a/x.ts',
          text: 'export const ROWS = 1;\nexport type Row = 1;',
        },
        { path: 'sheet/words/b/y.ts', text: 'export const ROWS = 2;' },
        { path: 'sheet/words/a.ts', text: 'export const Row = 3;' },
      ]),
    ).toEqual(['ROWS · sheet/words/a/x.ts, sheet/words/b/y.ts']);
  });

  it('no name beyond the baseline has two homes', () => {
    expect(
      heldToItsBaseline('aNameHasOneHome', twiceIn(productionSources())),
    ).toEqual({ added: [], fixed: [] });
  });
});
