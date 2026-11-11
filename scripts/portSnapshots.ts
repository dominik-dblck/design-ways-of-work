/**
 * - `snapshotTaken` · a snapshot as a port takes its trunk: three ways, key by key
 * - `moduleValue` · a snapshot module's one export, read back from its text
 */

interface Sides {
  // the base, the trunk's and the port's own
  readonly was: unknown;
  readonly trunk: unknown;
  readonly ours: unknown;
  // the trunk's, its names as after the port
  readonly named: (taken: unknown) => unknown;
}

const isKeyed = (
  snapshot: unknown,
): snapshot is Readonly<Record<string, unknown>> =>
  typeof snapshot === 'object' && snapshot !== null && !Array.isArray(snapshot);

const keyOf = (snapshot: unknown, key: string): unknown =>
  isKeyed(snapshot) ? snapshot[key] : undefined;

// what the trunk left as the base keeps the port's value, which the PM accepted there; anything else is the trunk's
const oneTaken = ({ was, trunk, ours, named }: Sides): unknown =>
  JSON.stringify(trunk) === JSON.stringify(was) && ours !== undefined
    ? ours
    : named(trunk);

// a snapshot of keys is taken key by key; one of a single text or list, whole
function snapshotTaken(sides: Sides): unknown {
  const { was, trunk, ours, named } = sides;
  if (!isKeyed(trunk)) return oneTaken(sides);
  return Object.fromEntries(
    Object.entries(trunk).map(([key, held]) => [
      key,
      oneTaken({
        was: keyOf(was, key),
        trunk: held,
        ours: keyOf(ours, key),
        named,
      }),
    ]),
  );
}

// as the checks write it: `export const name: unknown = <json>;`
const moduleValue = (module: string): unknown =>
  JSON.parse(module.slice(module.indexOf('= ') + 2, module.lastIndexOf(';')));

export { moduleValue, snapshotTaken };
