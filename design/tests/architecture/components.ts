/**
 * - `placeOf`, `Place` · a component file's tier and component, read from its folder
 * - `componentSources` · a tier folder's sources, its tests aside
 * - `composedBy` · the other components a source imports, each with the import that does
 */
import { importsOf, textsUnder } from './tree.ts';
import type { Source } from './tree.ts';

const TIERS = ['atoms', 'molecules', 'organisms', 'templates'] as const;

type Tier = (typeof TIERS)[number];

type Place = { readonly tier: Tier; readonly name: string };

const A_COMPONENT = /^app\/components\/([a-z]+)\/([^/.]+)(?:\/|$)/;
const A_TEST = /\.test\.tsx?$/;

/** The tier and component of a path under `app/components/{tier}/{Name}` · null anywhere else. */
function placeOf(file: string): Place | null {
  const match = A_COMPONENT.exec(file);
  const tier = TIERS.find((one) => one === match?.[1]);
  const name = match?.[2];
  return tier && name ? { tier, name } : null;
}

function componentSources(): readonly Source[] {
  return TIERS.flatMap((tier) =>
    textsUnder(`app/components/${tier}`, ['.ts', '.tsx']),
  ).filter((source) => !A_TEST.test(source.path));
}

/** Each import of a source that reaches `app/components/` outside its own component's folder. */
function composedBy(
  source: Source,
): readonly { readonly to: string; readonly place: Place | null }[] {
  const own = placeOf(source.path);
  const home = own ? `app/components/${own.tier}/${own.name}` : null;
  return importsOf(source)
    .filter(
      ({ to }) =>
        to.startsWith('app/components/') &&
        to !== home &&
        !to.startsWith(`${home ?? '\0'}/`),
    )
    .map(({ to }) => ({ to, place: placeOf(to) }));
}

export { componentSources, composedBy, placeOf };
export type { Place };
