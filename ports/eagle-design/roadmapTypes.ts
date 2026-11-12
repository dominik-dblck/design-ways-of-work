/**
 * - `ROADMAP_TYPES` · eagle-design's take of the roadmap's types, homes from now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// the way of working's process, at the paths the product held them: no import moves
const ROADMAP_TYPES: Migration = {
  release: '0.5.0',
  removes: [],
  moves: [],
  homed: [
    'roadmaps/backlog/backlogTypes.ts',
    'roadmaps/edges/edgeTypes.ts',
    'roadmaps/ideas/ideasTypes.ts',
    'roadmaps/notes/notesTypes.ts',
    'roadmaps/receipts/receiptsTypes.ts',
    'roadmaps/receipts/repositoryState.ts',
    'roadmaps/templates/templatesTypes.ts',
    'roadmaps/tracks/tracksTypes.ts',
  ],
  tree: null,
};

export { ROADMAP_TYPES };
