/**
 * - `leavesOf` · every string of messages.js with a space in it, by its path
 * - `normalized`, `wordFinding` · a sentence as the checks compare it, a finding
 */
import type { SourceFinding, Leaf } from './sourceCheckTypes.ts';

interface Place {
  readonly path: string;
  readonly key: string | number;
  readonly siblings: readonly string[] | null;
}

// an object met twice is walked once, at its first path; a situation's lines are the table's
function leavesOf(root: unknown): readonly Leaf[] {
  const seen = new Set<unknown>();
  const leaves: Leaf[] = [];
  const visit = (value: unknown, place: Place): void => {
    if (typeof value === 'string') {
      if (/\s/.test(value)) leaves.push({ ...place, text: value });
      return;
    }
    if (value === null || typeof value !== 'object' || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) {
      value.forEach((item: unknown, index) =>
        visit(item, {
          path: `${place.path}[${index}]`,
          key: index,
          siblings: null,
        }),
      );
      return;
    }
    const keys = Object.keys(value);
    for (const [key, item] of Object.entries(value))
      if (key !== 'bySituation')
        visit(item, {
          path: place.path ? `${place.path}.${key}` : key,
          key,
          siblings: keys,
        });
  };
  visit(root, { path: '', key: '', siblings: null });
  return leaves;
}

function normalized(text: unknown): string {
  return String(text)
    .toLowerCase()
    .replace(/\\u00b7|\\u2014|[·—,.:;!?’'"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordFinding(
  kind: string,
  {
    file,
    index,
    text,
  }: { readonly file: string; readonly index: number; readonly text: unknown },
): SourceFinding {
  return {
    kind,
    row: 'sentences a person sees',
    file,
    line: index + 1,
    text: String(text).slice(0, 160),
  };
}

export { leavesOf, normalized, wordFinding };
