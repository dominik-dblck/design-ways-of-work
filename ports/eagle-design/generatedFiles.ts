/**
 * - `GENERATED_FILES` · eagle-design's take of tsconfig.json written from its scope
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const SCOPE = 'scope.ts';

// its tsconfig written by the home's writer, its public/ an extra root; its ignore file as the writer now writes it, each line once
const GENERATED_FILES: Migration = {
  release: '0.12.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: SCOPE,
      from: "  backup: { remote: 'https://github.com/dominik-dblck/eagle-design.git' },\n",
      to: "  backup: { remote: 'https://github.com/dominik-dblck/eagle-design.git' },\n  // its TypeScript beyond the design layout: the assets' manifest\n  extraRoots: ['public'],\n",
    },
    {
      file: SCOPE,
      from: "      writes: ['.prettierignore'],\n    },\n",
      to: "      writes: ['.prettierignore'],\n    },\n    {\n      script: 'tools/writeTsconfig.ts',\n      args: [],\n      writes: ['tsconfig.json'],\n    },\n",
    },
  ],
  tree: 'ports/eagle-design/trees/generated-files',
};

export { GENERATED_FILES };
