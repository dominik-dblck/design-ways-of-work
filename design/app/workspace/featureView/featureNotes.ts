/**
 * - `notesViewOf` · an epic's notebook, each line as head, source and points
 */
import { notesOf } from '../../../roadmaps/notes.ts';
import type { NoteLine, NotePoint, NotesView } from './featureTypes.ts';

// a notebook line opens on its head in bold, between two pairs of stars
const HEAD = /^\*\*(.+?)\*\*\s*/;
// its points are joined by a middle dot, never one inside brackets or bold
const POINT = ' · ';

// a word in bold inside a point stays bold: the pick a line names, say
const STRONG = /\*\*(.+?)\*\*/;

const pointOf = (text: string): NotePoint =>
  text
    .split(STRONG)
    .map((part, at) => ({ text: part, strong: at % 2 === 1 }))
    .filter((part) => part.text !== '');

// a point never ends inside a bracket, nor inside a bold span
function pointsOf(text: string): readonly string[] {
  const points: string[] = [];
  let depth = 0;
  let isBold = false;
  let from = 0;
  for (let at = 0; at < text.length; at += 1) {
    const char = text[at];
    if (char === '(') depth += 1;
    if (char === ')') depth = Math.max(0, depth - 1);
    if (text.startsWith('**', at)) {
      isBold = !isBold;
      at += 1;
    } else if (depth === 0 && !isBold && text.startsWith(POINT, at)) {
      points.push(text.slice(from, at));
      from = at + POINT.length;
    }
  }
  points.push(text.slice(from));
  return points.map((one) => one.trim()).filter(Boolean);
}

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
