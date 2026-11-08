/**
 * - `docs/rules/components.md`: a molecule composes atoms and at most one other molecule
 * - one that composes two or more is an organism; a molecule never imports a tier above it
 */
import { describe, expect, it } from 'vitest';
import { componentSources, composedBy, placeOf } from './components.ts';
import type { Source } from './tree.ts';

type Composition = {
  readonly molecules: ReadonlySet<string>;
  readonly up: readonly string[];
};

// what each molecule's files import, summed over the folder: the tier is the component's
function composition(
  sources: readonly Source[],
): ReadonlyMap<string, Composition> {
  const found = new Map<string, { molecules: Set<string>; up: string[] }>();
  for (const source of sources) {
    const own = placeOf(source.path);
    if (own?.tier !== 'molecules') continue;
    const entry = found.get(own.name) ?? { molecules: new Set(), up: [] };
    for (const { to, place } of composedBy(source)) {
      if (place?.tier === 'molecules') entry.molecules.add(place.name);
      if (place?.tier === 'organisms' || place?.tier === 'templates')
        entry.up.push(`${source.path} imports ${to}`);
    }
    found.set(own.name, entry);
  }
  return found;
}

describe('a molecule composes atoms and at most one molecule', () => {
  it('the scan counts the molecules a molecule composes, and sees an import upwards', () => {
    const planted = composition([
      {
        path: 'app/components/molecules/Planted/Planted.tsx',
        text: [
          "import { Menu } from '../Menu';",
          "import { Field } from '../Field/Field.tsx';",
          "import { Checkbox } from '../../atoms/Checkbox';",
          "import { TypeLibrary } from '../../organisms/TypeLibrary';",
        ].join('\n'),
      },
    ]).get('Planted');
    expect([...(planted?.molecules ?? [])].sort()).toEqual(['Field', 'Menu']);
    expect(planted?.up).toEqual([
      'app/components/molecules/Planted/Planted.tsx imports app/components/organisms/TypeLibrary',
    ]);
  });

  it('no molecule composes two or more molecules · that one is an organism', () => {
    expect(
      [...composition(componentSources())]
        .filter(([, entry]) => entry.molecules.size > 1)
        .map(([name, entry]) => `${name} · ${[...entry.molecules].join(', ')}`),
    ).toEqual([]);
  });

  it('no molecule imports an organism or a template', () => {
    expect(
      [...composition(componentSources()).values()].flatMap(
        (entry) => entry.up,
      ),
    ).toEqual([]);
  });
});
