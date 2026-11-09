/**
 * - `tiersOf`, `Tier` · a vitest config's tiers: each project's folder and name
 * - `Helpers` · where a helper two tiers share lives, or none and why
 */
// a tier: the folder its files start from, and its name
type Tier = readonly [folder: string, name: string];

interface HelperTiers {
  readonly root: string;
  // a vitest project's, read by `tiersOf`, and the browser tier's own root
  readonly tiers: readonly Tier[];
  readonly exemptions: readonly {
    readonly file: string;
    readonly why: string;
  }[];
}

// none: why a repository's tests share no helper, which the gate says as it skips
type Helpers = HelperTiers | { readonly none: string };

const A_WILDCARD = /[*{[?]/;

const isProject = (
  project: unknown,
): project is {
  readonly test: { readonly name: string; readonly include: string[] };
} => {
  const test: unknown =
    typeof project === 'object' && project !== null
      ? Reflect.get(project, 'test')
      : undefined;
  return (
    typeof test === 'object' &&
    test !== null &&
    typeof Reflect.get(test, 'name') === 'string' &&
    [Reflect.get(test, 'include')]
      .flat()
      .every((glob) => typeof glob === 'string')
  );
};

// each project's folder, its include read up to the first wildcard, its name before a `:`
function tiersOf(config: unknown): readonly Tier[] {
  const test: unknown =
    typeof config === 'object' && config !== null
      ? Reflect.get(config, 'test')
      : undefined;
  const projects: unknown =
    typeof test === 'object' && test !== null
      ? Reflect.get(test, 'projects')
      : undefined;
  return [projects]
    .flat()
    .filter(isProject)
    .flatMap(({ test: { name, include } }) =>
      include.map((glob): Tier => {
        const wild = glob.search(A_WILDCARD);
        const head = wild === -1 ? glob : glob.slice(0, wild);
        return [
          head.slice(0, head.lastIndexOf('/') + 1),
          name.split(':')[0] ?? name,
        ];
      }),
    );
}

export { tiersOf };
export type { Helpers, Tier };
