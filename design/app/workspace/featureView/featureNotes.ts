/**
 * - `notesViewOf` · an epic's notebook, each line as head, source and points
 */
import { notesOf } from '../../../roadmaps/notes.ts';
import { pointsOf } from '../textPoints.ts';
import type { NoteLine, NotePoint, NotesView } from './featureTypes.ts';

// a notebook line opens on its head in bold, between two pairs of stars
const HEAD = /^\*\*(.+?)\*\*\s*/;

// a word in bold inside a point stays bold: the pick a line names, say
const STRONG = /\*\*(.+?)\*\*/;

const pointOf = (text: string): NotePoint =>
  text
    .split(STRONG)
    .map((part, at) => ({ text: part, strong: at % 2 === 1 }))
    .filter((part) => part.text !== '');

// a first point wholly in brackets is the line's source: who decided it, and when
function noteLineOf(line: string): NoteLine {
  const head = HEAD.exec(line);
  const points = pointsOf(head ? line.slice(head[0].length) : line);
  const first = points[0] ?? '';
  const source = head && /^\(.*\)$/.test(first) ? first.slice(1, -1) : null;
  return {
    head: head?.[1] ?? null,
    source,
    points: (source === null ? points : points.slice(1)).map(pointOf),
  };
}

function notesViewOf(epic: string): NotesView | null {
  const notes = notesOf(epic);
  if (!notes) return null;
  return {
    lede: notes.lede,
    sections: notes.sections.map((section) => ({
      title: section.title,
      lines: section.lines.map(noteLineOf),
    })),
  };
}

export { notesViewOf };
