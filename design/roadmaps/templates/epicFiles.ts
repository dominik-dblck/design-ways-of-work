/**
 * - `EPIC_FILES` · the files an epic's folder starts with, each with its registry
 */
import type { EpicFile, EpicStart } from './templatesTypes.ts';

const head = (line: string): string => `/**\n * - ${line}\n */\n`;

// a single-quoted string as prettier writes it
const quoted = (text: string): string =>
  text.replaceAll('\\', '\\\\').replaceAll("'", "\\'");

const ticketsText = ({ id }: EpicStart): string =>
  `${head(`\`${id}_TICKETS\` · ${id}'s written tickets: none until its refinement writes one`)}import type { AuthoredRow } from '../tickets/ticketsTypes.ts';\n\nconst ${id}_TICKETS: readonly AuthoredRow[] = [];\n\nexport { ${id}_TICKETS };\n`;

const edgesText = ({ id }: EpicStart): string =>
  `${head(`\`${id}_EDGES\` · ${id}'s edges by ticket: the cases its criteria do not name`)}import type { TicketEdge } from '../edges/edgeTypes.ts';\nimport type { TicketKeyed } from '../ids.ts';\n\nconst ${id}_EDGES: Readonly<Record<string, readonly TicketEdge[]>> = {} satisfies TicketKeyed;\n\nexport { ${id}_EDGES };\n`;

const receiptsText = ({ id }: EpicStart): string =>
  `${head(`\`${id}_RECEIPTS\` · what ${id}'s closed tickets reported: criteria, tests, skips`)}import type { TicketKeyed } from '../ids.ts';\nimport type { Receipt } from '../receipts/receiptsTypes.ts';\n\nconst ${id}_RECEIPTS: Readonly<Record<string, Receipt>> = {} satisfies TicketKeyed;\n\nexport { ${id}_RECEIPTS };\n`;

const notesText = ({ id, name }: EpicStart): string =>
  `${head(`\`${id}_NOTES\` · ${id}'s notebook: the reasoning behind its picks, ours only`)}import type { EpicNotes } from '../notes/notesTypes.ts';\n\nconst ${id}_NOTES: EpicNotes = {\n  epic: '${id}',\n  title: '${quoted(`${id} · ${name} · feature notebook`)}',\n  lede: [],\n  sections: [],\n};\n\nexport { ${id}_NOTES };\n`;

const EPIC_FILES: readonly EpicFile[] = [
  {
    kind: 'Tickets',
    registry: 'roadmaps/tickets/ticketRows.ts',
    item: 'spread',
    text: ticketsText,
  },
  {
    kind: 'Edges',
    registry: 'roadmaps/edges.ts',
    item: 'spread',
    text: edgesText,
  },
  {
    kind: 'Receipts',
    registry: 'roadmaps/receipts.ts',
    item: 'spread',
    text: receiptsText,
  },
  {
    kind: 'Notes',
    registry: 'roadmaps/notes/notesRows.ts',
    item: 'value',
    text: notesText,
  },
];

export { EPIC_FILES };
