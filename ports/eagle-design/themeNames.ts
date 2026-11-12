/**
 * - `THEME_NAMES` · eagle-design's take of the names the theme frees
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const TICKET_EXPAND = 'roadmaps/tickets/ticketExpand.ts';

// the expected files' text reads `expectedText`: the theme's typography holds `text`
const THEME_NAMES: Migration = {
  release: '0.5.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: TICKET_EXPAND,
      from: "import { reads, text } from '../../guards/expectedFiles.ts';",
      to: "import { reads, expectedText } from '../../guards/expectedFiles.ts';",
    },
    {
      file: TICKET_EXPAND,
      from: '.join(text(ticket, SPEC))',
      to: '.join(expectedText(ticket, SPEC))',
    },
  ],
  tree: null,
};

export { THEME_NAMES };
