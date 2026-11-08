/**
 * - `sectionIn`, `Found` · a term's section across a sheet's sources, an exact
 * - block first and the epic's first, else a heading, with its source
 * - `declaredName` · a global's name, through the entry's exports, as declared
 */
import { sectionOf } from './fileSections.ts';
import type { Source } from './packSources.ts';
import type { Asked, TsSection } from './tsSections.ts';

interface Found {
  readonly source: Source;
  readonly section: TsSection;
}

// the entry's exports: each name the global offers, and the name its source declares
function exportedAs(entry: Source): ReadonlyMap<string, string> {
  const named = new Map<string, string>();
  for (const block of entry.text.matchAll(/export\s*\{([^}]*)\}/g))
    for (const one of String(block[1]).split(',')) {
      const [local, shown] = one.trim().split(/\s+as\s+/);
      if (local) named.set(shown ?? local, local);
    }
  return named;
}

// an old table's name (KINDS) is the global's lower-case one (kinds)
function declaredName(sources: readonly Source[], want: string): string | null {
  const entry = sources[0];
  if (!entry || !/\.ts$/.test(entry.path) || !/^\w+$/.test(want)) return null;
  const named = exportedAs(entry);
  const isUpper = /^[A-Z][A-Z0-9_]*$/.test(want);
  const local =
    named.get(want) ?? (isUpper ? named.get(want.toLowerCase()) : undefined);
  return local !== undefined && local !== want ? local : null;
}

function foundIn(sources: readonly Source[], asked: Asked): Found | null {
  const hits = sources.flatMap((source) => {
    const section = sectionOf(source, asked);
    return section ? [{ source, section }] : [];
  });
  const exact = hits.filter((hit) => hit.section.exact);
  const mine = exact.find(
    (hit) =>
      asked.epic !== null &&
      String(hit.section.text.split('\n')[0]).includes(`epic: '${asked.epic}'`),
  );
  return (
    mine ??
    exact[0] ??
    hits.find((hit) => hit.section.to - hit.section.from >= 2) ??
    null
  );
}

function sectionIn(sources: readonly Source[], asked: Asked): Found | null {
  const found = foundIn(sources, asked);
  if (found?.section.exact) return found;
  const local = declaredName(sources, asked.want);
  const declared =
    local === null ? null : foundIn(sources, { ...asked, want: local });
  return declared?.section.exact ? declared : found;
}

export { declaredName, sectionIn };
export type { Found };
