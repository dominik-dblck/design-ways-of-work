/**
 * - `movedGroups`, `GroupMove` · each group whose form differs among the three
 * - a moved group's rows: a leaf's path, its three values, the side that moved it
 */
import { digestOf } from './normalForms.ts';

// each group's form by its name: the agreed one, the release's, the build side's code
type Forms = Readonly<Record<string, unknown>>;
type Side = 'design' | 'build' | 'both';

interface MovedRow {
  readonly path: string;
  readonly agreed: unknown;
  readonly release: unknown;
  readonly ours: unknown;
  readonly moved: Side;
}

interface GroupMove {
  readonly group: string;
  readonly rows: readonly MovedRow[];
}

// a form's leaves by path, an object's by key and an array's by place: `Approve.body.0`
function leavesOf(form: unknown, at = ''): ReadonlyMap<string, unknown> {
  if (typeof form !== 'object' || form === null) return new Map([[at, form]]);
  const entries = Array.isArray(form)
    ? form.map((one: unknown, index) => [String(index), one] as const)
    : Object.entries(form);
  return new Map(
    entries.flatMap(([key, one]) => [
      ...leavesOf(one, at === '' ? key : `${at}.${key}`),
    ]),
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
  return paths.flatMap((path) => {
    const atPath = {
      agreed: agreed?.get(path),
      release: release?.get(path),
      ours: ours?.get(path),
    };
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
