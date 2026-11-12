/**
 * - `PRODUCT_HALVES` · eagle-design's facts out of the homes, into its own files
 * - `trees/product-halves/` beside it · its open pairs, its lines of the criteria skill
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const SLOTS = 'docs/process/documentSlots.ts';

const PRODUCT_HALVES: Migration = {
  release: '0.16.0',
  removes: [],
  moves: [],
  edits: [
    // the push epic's stories wait for epics of their own: the board reads the row, never its id
    {
      file: 'roadmaps/backlog/lastEpics.ts',
      from: "    name: 'Push as a second channel',\n    group: 'deferred',\n",
      to: "    name: 'Push as a second channel',\n    group: 'deferred',\n    storiesWait: true,\n",
    },
    {
      file: SLOTS,
      from: "import { PUBLISH_CITES } from './documentSlots/publishCites.ts';\n",
      to: "import { PUBLISH_CITES } from './documentSlots/publishCites.ts';\nimport { CRITERIA_CITES } from './documentSlots/criteriaCites.ts';\n",
    },
    {
      file: SLOTS,
      from: '  ...PUBLISH_CITES,\n',
      to: '  ...PUBLISH_CITES,\n  ...CRITERIA_CITES,\n',
    },
  ],
  tree: 'ports/eagle-design/trees/product-halves',
};

export { PRODUCT_HALVES };
