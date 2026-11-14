/**
 * - `BUILD_READS_IGNORED` · eagle-design's formatter leaves aside each JSON its build writes for the build side
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// the preset names `buildReads.json` in the scope's `generated`: `format:files` writes them under the tool-written files
const BUILD_READS_IGNORED: Migration = {
  release: '1.6.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: '.prettierignore',
      from: 'roadmaps/ids.ts\n.prettierignore\n',
      to: 'roadmaps/ids.ts\nfixtures/data/block-model.json\nfixtures/data/components.spec.json\nfixtures/data/modes.json\n.prettierignore\n',
    },
  ],
  tree: null,
};

export { BUILD_READS_IGNORED };
