/**
 * - `terms`, `uiRows` · one name per idea, and the screen words a check reads
 * - `open`, `deferred` · contradictions standing, and points decided as not now
 * - a rename is one edit, and the word it replaces stays findable
 */
import { DEFERRED, OPEN, TERMS } from './glossary/glossaryRows.ts';
import type { ScreenWordRow } from './glossary/glossaryTypes.ts';

function uiRows(): readonly ScreenWordRow[] {
  return TERMS.flatMap((term) =>
    (term.ui ?? []).map((row) => ({
      term: term.term,
      use: row.use,
      not: row.not,
      except: row.except,
      note: row.note ?? '',
    })),
  );
}

export { DEFERRED as deferred, OPEN as open, TERMS as terms, uiRows };
