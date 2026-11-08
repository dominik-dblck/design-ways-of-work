/**
 * - `edgeSectionsOf`, `whyOf` · a ticket's edges with their options, and its why
 */
import type { all as allTickets } from '../../../roadmaps/tickets.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Section } from './boardTypes.ts';

type BoardTicket = ReturnType<typeof allTickets>[number];
type Edge = BoardTicket['edges'][number];

// each option, the picked one marked; an edge without a pick is the PM's, or the contract's
function edgeLines(edge: Edge): readonly string[] {
  const { ticket: words } = BOARD_WORDS;
  const options = Object.entries(edge.options).map(
    ([letter, text]) =>
      `${letter}${letter === edge.pick ? ' ✓' : ''} · ${text}`,
  );
  const open = options.length ? words.pmDecides : words.contractOwes;
  return [
    edge.edge,
    ...options,
    edge.pick ? edge.why : `${open}${edge.why ? ` · ${edge.why}` : ''}`,
    ...(edge.into ? [`→ ${edge.into}`] : []),
  ];
}

const edgeSectionsOf = (edges: readonly Edge[]): readonly Section[] =>
  edges.map((edge) => ({
    label: `${BOARD_WORDS.ticket.edges} · ${BOARD_WORDS.ticket.on} ${edge.on}`,
    lines: edgeLines(edge),
  }));

// written for the PM: what is true today, after, what it unlocks, what it is not
function whyOf(why: BoardTicket['why']): readonly string[] {
  if (!why) return [];
  const { why: words } = BOARD_WORDS;
  return [
    why.oneLine,
    `${words.today} · ${why.today}`,
    `${words.after} · ${why.after}`,
    `${words.unlocks} · ${why.unlocks}`,
    `${words.not} · ${why.not}`,
    ...(why.replaced ? [`${words.replaced} · ${why.replaced}`] : []),
    ...(why.dsScan ? [`${words.dsScan} · ${why.dsScan}`] : []),
  ];
}

export { edgeSectionsOf, whyOf };
