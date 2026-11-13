/**
 * - `MODES_LABEL` · eagle-design's modes page cites its label by the new key (W116)
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// the home asks `modes.label` now; the product's words stay as written
const MODES_LABEL: Migration = {
  release: '1.4.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: 'docs/process/documentSlots/modesCites.ts',
      from: "  'modes.eyebrow':",
      to: "  'modes.label':",
    },
  ],
  tree: null,
};

export { MODES_LABEL };
