/**
 * - `notesOf` · one open epic's notebook, or null when it has none
 * - a notebook is ours only: never on a read list, never named in a pack
 */
import { NOTES } from './notes/notesRows.ts';
import type { EpicNotes } from './notes/notesTypes.ts';

const notesOf = (epic: string): EpicNotes | null =>
  NOTES.find((one) => one.epic === epic) ?? null;

export { notesOf };
export type * from './notes/notesTypes.ts';
