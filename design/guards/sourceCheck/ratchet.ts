/**
 * - `frozen`, `BASELINE`, `ratchet` · the counts a copy kind may hold, only falling
 * - `copies`, `findingCounts`, `summary` · the findings that are copies, by kind
 */
import { targets } from './requirementReads.ts';
import { SCOPE } from './sourceScope.ts';
import type { SourceFinding } from './sourceCheckTypes.ts';

// the app outside the scope, frozen at its count: cleaned epic by epic, a number only goes down
const FROZEN: Readonly<Record<string, number>> = {
  'component without a drawing': 0,
  'sentence in code': 0,
  'sentence in code · banned word': 0,
  'sentence copied': 0,
  'banned word in code': 0,
  'drawing without a row': 15,
  'read upwards': 0,
  'sentence in an attribute': 29,
  'typed colour': 36,
  'branch on a type name': 5,
  'list held twice': 1,
  'sentence held twice': 14,
  'typed list': 1,
};

// the scope and the fixtures the build side ports, held to these counts
const BASELINE: Readonly<Record<string, number>> = {
  'status map': 0,
  'drawing without a row': 5,
  'read upwards': 0,
  'branch on a type name': 0,
  'typed list': 0,
  'typed colour': 0,
  'list held twice': 0,
  'sentence held twice': 0,
};

// off the ratchet by decision: the components' drawings, the plurals, the names to read
const INFO: readonly string[] = [
  'message without a drawing',
  'count without one',
];

function findingCounts(
  found: readonly SourceFinding[],
): Readonly<Record<string, number>> {
  const counts = new Map<string, number>();
  for (const one of found)
    counts.set(one.kind, (counts.get(one.kind) ?? 0) + 1);
  return Object.fromEntries(counts);
}

function copies(found: readonly SourceFinding[]): readonly SourceFinding[] {
  return found.filter((one) => !INFO.includes(one.kind));
}

const inScope = (file: string): boolean =>
  file === 'messages.js' || [...SCOPE, ...targets()].includes(file);

function overBase(
  found: readonly SourceFinding[],
  {
    base,
    tag,
  }: { readonly base: Readonly<Record<string, number>>; readonly tag: string },
): readonly string[] {
  return Object.entries(findingCounts(found))
    .filter(([kind, count]) => count > (base[kind] ?? 0))
    .map(([kind, count]) => `${tag}${kind} · ${count}, was ${base[kind] ?? 0}`);
}

function ratchet(found: readonly SourceFinding[]): readonly string[] {
  const counted = copies(found);
  return [
    ...overBase(
      counted.filter((one) => inScope(one.file)),
      { base: BASELINE, tag: '' },
    ),
    ...overBase(
      counted.filter((one) => !inScope(one.file)),
      { base: FROZEN, tag: 'frozen · ' },
    ),
  ];
}

function frozen(): Readonly<Record<string, number>> {
  return FROZEN;
}

function summary(
  found: readonly SourceFinding[],
): readonly { readonly what: string; readonly n: number }[] {
  const by = new Map<string, number>();
  for (const one of found) {
    const key = `${one.kind} · ${one.file}`;
    by.set(key, (by.get(key) ?? 0) + 1);
  }
  return [...by.keys()].sort().map((what) => ({ what, n: by.get(what) ?? 0 }));
}

export { BASELINE, copies, findingCounts, frozen, ratchet, summary };
