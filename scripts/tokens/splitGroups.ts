/**
 * - `splitGroups` · each group, part or token to its home by plan/token-split.tsv, the rows read in order
 * - a part whose heading has a row leaves its group as a group of its own; a token row joins a home's last group
 * - a group no row names, a row that names nothing and a cut group that holds a token are refused
 */
import type { SheetGroup, SheetPart, Source } from './sheetTypes.ts';

interface SplitRow {
  readonly from: Source;
  readonly key: string;
  readonly home: string;
}

type Homes = Map<string, SheetGroup[]>;

const tokensOf = (group: SheetGroup): number =>
  group.parts.reduce((sum, part) => sum + part.tokens.length, 0);

function placeParts(
  group: SheetGroup,
  rows: readonly SplitRow[],
  { homes, used }: { readonly homes: Homes; readonly used: Set<SplitRow> },
): SheetGroup {
  const kept: SheetPart[] = [];
  for (const part of group.parts) {
    const row = rows.find(
      (one) => one.from === group.source && part.note?.startsWith(one.key),
    );
    if (!row || part.note === null) {
      kept.push(part);
      continue;
    }
    used.add(row);
    const moved: SheetGroup = {
      source: group.source,
      title: part.note,
      intro: '',
      darkNotes: [],
      parts: [{ note: null, tokens: part.tokens }],
    };
    homes.set(row.home, [...(homes.get(row.home) ?? []), moved]);
  }
  return { ...group, parts: kept };
}

function moveTokens(
  rows: readonly SplitRow[],
  { homes, used }: { readonly homes: Homes; readonly used: Set<SplitRow> },
): void {
  for (const row of rows.filter((one) => one.key.startsWith('--'))) {
    const part = [...homes.values()]
      .flat()
      .flatMap((group) => group.parts)
      .find((one) => one.tokens.some((token) => token.name === row.key));
    const at = part?.tokens.findIndex((token) => token.name === row.key) ?? -1;
    const [token] = part?.tokens.splice(at, 1) ?? [];
    const last = homes.get(row.home)?.at(-1);
    if (!token || !last)
      throw new Error(`${row.key} · no token, or no home ${row.home}`);
    last.parts.push({ note: null, tokens: [token] });
    used.add(row);
  }
}

function splitGroups(
  groups: readonly SheetGroup[],
  rows: readonly SplitRow[],
): ReadonlyMap<string, readonly SheetGroup[]> {
  const homes: Homes = new Map();
  const used = new Set<SplitRow>();
  for (const group of groups) {
    const row = rows.find(
      (one) => one.from === group.source && group.title.startsWith(one.key),
    );
    if (!row)
      throw new Error(`${group.source} · ${group.title} · no row names it`);
    used.add(row);
    const placed = placeParts(group, rows, { homes, used });
    homes.set(row.home, [...(homes.get(row.home) ?? []), placed]);
  }
  moveTokens(rows, { homes, used });
  const unused = rows.filter((row) => !used.has(row));
  if (unused.length)
    throw new Error(
      `rows naming nothing · ${unused.map((row) => row.key).join(' · ')}`,
    );
  const cut = (homes.get('cut') ?? []).filter((group) => tokensOf(group) > 0);
  if (cut.length)
    throw new Error(`a cut group holds tokens · ${cut[0]?.title}`);
  return homes;
}

export { splitGroups };
export type { SplitRow };
