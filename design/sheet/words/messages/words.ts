/**
 * - `STATUS_WORDS`, `LEGEND_WORDS`, `FILL_TEXT` · a status's words, legend, fills
 * - `HINT`, `LABEL`, `HOVER`, `label` · a dot's hint, a button's label, its hover
 */
import {
  FILL_TEXT,
  HINT,
  HOVER,
  LABEL,
  LEGEND_WORDS,
  STATUS_WORDS,
} from './wordRows.ts';

function label(key: string): string {
  const found = LABEL[key];
  if (found === undefined) throw new Error(`messages.ts · no label ${key}`);
  return found;
}

export { FILL_TEXT, HINT, HOVER, LABEL, LEGEND_WORDS, STATUS_WORDS, label };
