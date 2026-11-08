/**
 * - `contentCheck` · the modules' and the delivery's checks, each line a finding
 */
import type { SourceFinding } from './sourceCheckTypes.ts';

type ContentWorld = {
  readonly ContentCheck?: { readonly contentFindings: () => readonly string[] };
};

function contentCheck(world?: ContentWorld | null): readonly SourceFinding[] {
  const check = world?.ContentCheck;
  if (!check) return [];
  return check.contentFindings().map((text) => ({
    kind: 'content',
    row: 'modules and delivery (T23, T28, T55)',
    file: 'content-check.js',
    line: 0,
    text,
  }));
}

export { contentCheck };
