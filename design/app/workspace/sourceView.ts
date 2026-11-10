/**
 * - `standingOf` · the copies in the scope by kind, each beside its ratchet base
 * - `scanAll` · the source check over the published files, run by the page
 */
import {
  baseline,
  findingCounts,
  ratchet,
  scanAll,
} from '../../guards/sourceCheck.ts';

// a finding as the scan answers it, read off the guard's own entry
type SourceFinding = Awaited<ReturnType<typeof scanAll>>[number];

interface KindStanding {
  readonly kind: string;
  readonly n: number;
  readonly base: number;
}

interface SourceStanding {
  readonly copies: number;
  readonly rises: readonly string[];
  readonly kinds: readonly KindStanding[];
}

// the project's own two kinds stand outside the copies a feature answers for
const PROJECT_KINDS: readonly string[] = ['two versions', 'logic page'];

function standingOf(found: readonly SourceFinding[]): SourceStanding {
  const counts: Readonly<Record<string, number>> = findingCounts(found);
  const bases: Readonly<Record<string, number>> = baseline;
  const kinds = Object.keys({ ...bases, ...counts }).filter(
    (kind) => !PROJECT_KINDS.includes(kind),
  );
  return {
    copies: found.length,
    rises: ratchet(found),
    kinds: kinds.map((kind) => ({
      kind,
      n: counts[kind] ?? 0,
      base: bases[kind] ?? 0,
    })),
  };
}

export { scanAll, standingOf };
export type { KindStanding, SourceFinding, SourceStanding };
