/**
 * - `partsFindings`, `tokenFindings`, `stateFindings`, `wrapperFindings` · rows
 * - `TICKET` · a ticket id's shape
 */
import type { Spec, SpecPart, TieredRow } from './specCheckTypes.ts';

const TICKET = /^T-E\d\d-\d\d$/;
const WRAPPER =
  /^app\/components\/(atoms|molecules|organisms)\/([A-Za-z0-9]+)\/([A-Za-z0-9]+)\.tsx$/;

// only an organism composes an organism, and never itself
function organismPart(
  row: TieredRow,
  { organism, spec }: { readonly organism: string; readonly spec: Spec },
): string[] {
  if (!spec.organisms.some((item) => item.id === organism)) {
    return [`1 · ${row.id} names organism "${organism}" — no such organism`];
  }
  if (organism === row.id) return [`1 · ${row.id} names itself`];
  if (row.tier !== 'organisms') {
    return [
      `1 · ${row.id} (${row.tier}) names organism "${organism}" — only an organism composes one`,
    ];
  }
  return [];
}

// a molecule or organism may compose a molecule by id, never itself
function moleculePart(
  row: TieredRow,
  { molecule, spec }: { readonly molecule: string; readonly spec: Spec },
): string[] {
  if (!spec.molecules.some((item) => item.id === molecule)) {
    return [`1 · ${row.id} names molecule "${molecule}" — no such molecule`];
  }
  return molecule === row.id ? [`1 · ${row.id} names itself as a part`] : [];
}

function partFindings(
  row: TieredRow,
  { part, spec }: { readonly part: SpecPart; readonly spec: Spec },
): string[] {
  if (part.organism)
    return organismPart(row, { organism: part.organism, spec });
  if (part.molecule)
    return moleculePart(row, { molecule: part.molecule, spec });
  const atom = spec.atoms.find((item) => item.id === part.atom);
  if (!atom) return [`1 · ${row.id} names part "${part.atom}" — no such atom`];
  const variants = atom.variants ?? {};
  if (part.variant && !variants[part.variant]) {
    return [
      `1 · ${row.id} part ${part.atom} variant "${part.variant}" — atom has ${Object.keys(variants).join(', ')}`,
    ];
  }
  return [];
}

function partsFindings(rows: readonly TieredRow[], spec: Spec): string[] {
  const above = rows.filter((row) => row.tier !== 'atoms');
  return [
    ...rows.flatMap((row) =>
      (row.parts ?? []).flatMap((part) => partFindings(row, { part, spec })),
    ),
    ...above
      .filter(
        (row) => !(row.parts ?? []).length && !/no parts/.test(row.notes || ''),
      )
      .map(
        (row) =>
          `1 · ${row.id} (${row.tier}) names no parts and its notes do not say why`,
      ),
    // a molecule says how its parts sit; prose in `as` is not a layout
    ...above
      .filter((row) => !(row.layout && row.layout.includes('[')))
      .map(
        (row) =>
          `1 · ${row.id} (${row.tier}) has no layout line with a [child list]`,
      ),
  ];
}

function walk(
  value: unknown,
  at: { path: string; rowId: string; declared: ReadonlySet<string> },
): string[] {
  if (typeof value === 'string') {
    const tokens = [...value.matchAll(/--[\w-]+/g)]
      .filter((found) => !at.declared.has(found[0]))
      .map(
        (found) =>
          `2 · ${at.rowId} · ${at.path} uses ${found[0]} — not declared in design-system/ or the product's tokens`,
      );
    const hex = value.match(/#[0-9a-f]{3,8}/i);
    const field = at.path.split('.').pop() ?? '';
    const loose =
      /#[0-9a-f]{3,8}\b/i.test(value) &&
      at.rowId !== 'gate-dot' &&
      !/^(notes|wireframe|props)$/.test(field);
    return [
      ...tokens,
      ...(loose && hex
        ? [`3 · ${at.rowId} · ${at.path} carries a hex: ${hex[0]}`]
        : []),
    ];
  }
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, inner]) =>
    walk(inner, { ...at, path: at.path ? `${at.path}.${key}` : key }),
  );
}

function tokenFindings(
  rows: readonly TieredRow[],
  declared: ReadonlySet<string>,
): string[] {
  return rows.flatMap((row) => {
    const rest = Object.fromEntries(
      Object.entries(row).filter(
        ([key]) => !['notes', 'wireframe', 'muiPath'].includes(key),
      ),
    );
    return walk(rest, { path: '', rowId: row.id, declared });
  });
}

function stateFindings(spec: Spec): string[] {
  const canon = spec.states.canon ?? [];
  return spec.atoms
    .filter((atom) => atom.interactive !== false)
    .flatMap((atom) =>
      Object.entries(atom.variants ?? {}).flatMap(([name, states]) => {
        const missing = canon.filter(
          (state) => !states[state] && !(atom.skip ?? []).includes(state),
        );
        return missing.length
          ? [
              `4 · ${atom.id} · ${name} lacks ${missing.join(', ')} — add the state or list it under "skip" with the reason in notes`,
            ]
          : [];
      }),
    );
}

function wrapperFindings(row: TieredRow): string[] {
  const found = String(row.wrapper || '').match(WRAPPER);
  if (!found)
    return [
      `5 · ${row.id} wrapper "${row.wrapper}" is not app/components/<tier>/<Name>/<Name>.tsx`,
    ];
  return [
    ...(found[2] !== found[3]
      ? [`5 · ${row.id} wrapper folder ${found[2]} ≠ file ${found[3]}`]
      : []),
    ...(found[1] !== row.tier
      ? [
          `5 · ${row.id} sits in spec.${row.tier} but its wrapper is under ${found[1]}`,
        ]
      : []),
  ];
}

export { partsFindings, stateFindings, TICKET, tokenFindings, wrapperFindings };
