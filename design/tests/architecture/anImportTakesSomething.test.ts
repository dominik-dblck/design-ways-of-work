/**
 * - `docs/rules/names.md`: an import names what it takes, never an empty clause
 */
import { describe, expect, it } from 'vitest';
import { productionSources } from './tree.ts';
import type { Source } from './tree.ts';

const AN_EMPTY_CLAUSE = /^\s*(?:import|export)\s+(?:type\s+)?\{\s*\}\s*from\b/m;

const emptyIn = (sources: readonly Source[]): readonly string[] =>
  sources
    .filter((source) => AN_EMPTY_CLAUSE.test(source.text))
    .map((source) => source.path);

describe('an import takes something', () => {
  it('an empty clause is found, a named one passes', () => {
    expect(
      emptyIn([
        { path: 'a.ts', text: "import type {} from './x.ts';" },
        { path: 'b.ts', text: "import { X } from './x.ts';" },
      ]),
    ).toEqual(['a.ts']);
  });

  it('no file imports nothing', () => {
    expect(emptyIn(productionSources())).toEqual([]);
  });
});
