/**
 * - `movedGroups`, `GroupMove` · each group whose form differs among the three
 * - a moved group's rows: a leaf's path, its three values, the side that moved it
 */
import { digestOf } from './normalForms.ts';

// each group's form by its name: the agreed one, the release's, the build side's code
type Forms = Readonly<Record<string, unknown>>;
type Side = 'design' | 'build' | 'both';

interface MovedRow {
  readonly path: readonly string[];
  readonly agreed: unknown;
  readonly release: unknown;
  readonly ours: unknown;
  readonly moved: Side;
}

// a leaf, its path beside it, so the map's key (the path in JSON) is never read back
interface Leaf {
  readonly path: readonly string[];
  readonly form: unknown;
}

interface GroupMove {
  readonly group: string;
  readonly rows: readonly MovedRow[];
}

// an object's parts by key, an array's by place, anything else none
function partsOf(form: unknown): readonly (readonly [string, unknown])[] {
  if (typeof form !== 'object' || form === null) return [];
  if (Array.isArray(form))
    return form.map((one: unknown, index) => [String(index), one] as const);
  return Object.entries(form);
}

// a form's leaves, an empty one a leaf; keyed by path in JSON, so `kind.unknown` stays one key
function leavesOf(
  form: unknown,
  at: readonly string[] = [],
): ReadonlyMap<string, Leaf> {
  const entries = partsOf(form);
  if (entries.length === 0)
    return new Map([[JSON.stringify(at), { path: at, form }]]);
  return new Map(
    entries.flatMap(([key, one]) => [...leavesOf(one, [...at, key])]),
  );
}

const same = (one: unknown, other: unknown): boolean =>
  JSON.stringify(one) === JSON.stringify(other);

// the release moved off the agreed form, the build side did, or both did
function movedBy(row: Omit<MovedRow, 'moved' | 'path'>): Side {
  const hasDesignMoved = !same(row.release, row.agreed);
  const hasBuildMoved = !same(row.ours, row.agreed);
  if (hasDesignMoved && hasBuildMoved) return 'both';
  return hasDesignMoved ? 'design' : 'build';
}

function rowsOf(
  forms: readonly [unknown, unknown, unknown],
): readonly MovedRow[] {
  const [agreed, release, ours] = forms.map((form) => leavesOf(form));
  const paths = [
    ...new Set(
      [agreed, release, ours].flatMap((leaves) => [...(leaves?.keys() ?? [])]),
    ),
  ].sort();
  return paths.flatMap((key) => {
    const leaves = [agreed, release, ours].map((side) => side?.get(key));
    const path = leaves.find((leaf) => leaf !== undefined)?.path ?? [];
    const [atAgreed, atRelease, atOurs] = leaves.map((leaf) => leaf?.form);
    const atPath = { agreed: atAgreed, release: atRelease, ours: atOurs };
    return same(atPath.release, atPath.agreed) &&
      same(atPath.ours, atPath.agreed)
      ? []
      : [{ path, ...atPath, moved: movedBy(atPath) }];
  });
}

// a group listed when its three digests are not one; reports, never refuses
function movedGroups(sides: {
  readonly agreed: Forms;
  readonly release: Forms;
  readonly ours: Forms;
}): readonly GroupMove[] {
  const groups = [
    ...new Set(Object.values(sides).flatMap((forms) => Object.keys(forms))),
  ].sort();
  return groups.flatMap((group) => {
    const forms = [
      sides.agreed[group],
      sides.release[group],
      sides.ours[group],
    ] as const;
    return new Set(forms.map(digestOf)).size === 1
      ? []
      : [{ group, rows: rowsOf(forms) }];
  });
}

export { movedGroups };
export type { GroupMove };
