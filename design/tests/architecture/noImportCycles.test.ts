/**
 * - `docs/rules/one-home.md`: no runtime import cycle among the sheet's files
 */
import { describe, expect, it } from 'vitest';
import { importsOf, productionSources } from './tree.ts';
import type { Source } from './tree.ts';

function cyclesIn(sources: readonly Source[]): readonly string[] {
  const edges = new Map(
    sources.map((source) => [
      source.path,
      importsOf(source)
        .filter((one) => !one.typeOnly)
        .map((one) => one.to),
    ]),
  );
  const found = new Set<string>();
  const done = new Set<string>();
  const walk = (file: string, trail: readonly string[]): void => {
    const at = trail.indexOf(file);
    if (at >= 0) {
      const ring = trail.slice(at);
      const first = ring.indexOf([...ring].sort()[0]);
      const turned = [...ring.slice(first), ...ring.slice(0, first)];
      found.add([...turned, turned[0]].join(' → '));
      return;
    }
    if (done.has(file)) return;
    for (const next of edges.get(file) ?? []) walk(next, [...trail, file]);
    done.add(file);
  };
  for (const file of edges.keys()) walk(file, []);
  return [...found];
}

describe('no import cycles', () => {
  it('a cycle is found, a type-only import closes none', () => {
    expect(
      cyclesIn([
        { path: 'sheet/words/a.ts', text: "import { B } from './b.ts';" },
        { path: 'sheet/words/b.ts', text: "import { A } from './a.ts';" },
        { path: 'sheet/words/c.ts', text: "import type { A } from './a.ts';" },
      ]),
    ).toEqual(['sheet/words/a.ts → sheet/words/b.ts → sheet/words/a.ts']);
  });

  it('the sheet has no runtime cycle', () => {
    expect(cyclesIn(productionSources())).toEqual([]);
  });
});
