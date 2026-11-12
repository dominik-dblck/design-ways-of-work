/**
 * - `ROADMAP_READERS` · eagle-design's take of the roadmap's readers, homes from now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// split from the rows it gathers on its own tree first: the readers, at the paths the product held them
const ROADMAP_READERS: Migration = {
  release: '0.6.0',
  removes: [],
  moves: [],
  homed: [
    'roadmaps/backlog.ts',
    'roadmaps/notes.ts',
    'roadmaps/templates.ts',
    'roadmaps/templates/epicFiles.ts',
    'roadmaps/tickets.ts',
    'roadmaps/tickets/commandTickets.ts',
    'roadmaps/tickets/pointerResolve.ts',
    'roadmaps/tickets/receiptFlags.ts',
    'roadmaps/tickets/ticketBoard.ts',
    'roadmaps/tickets/ticketContext.ts',
    'roadmaps/tickets/ticketExpand.ts',
    'roadmaps/tickets/ticketKinds.ts',
    'roadmaps/tickets/ticketList.ts',
    'roadmaps/tickets/ticketViews.ts',
    'roadmaps/tickets/ticketsTypes.ts',
    'roadmaps/tracks.ts',
  ],
  tree: null,
};

export { ROADMAP_READERS };
