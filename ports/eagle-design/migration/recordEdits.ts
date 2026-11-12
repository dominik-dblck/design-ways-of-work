/**
 * - `RECORD_EDITS` · the edits that write the product's records' eras in its project
 */
import type { MigrationEdit } from '../../../scripts/migrationTypes.ts';

// the eras the home's record test held, moved as they stood
const RECORD_ERAS = `// its release records written before the tool's form: by hand, before the files read whole, before the port's rename
const recordEras: {
  readonly beforeTheTool: readonly string[];
  readonly beforeTheFiles: readonly string[];
  readonly beforeTheRename: readonly string[];
  readonly namedThen: Readonly<Record<string, string>>;
} = {
  beforeTheTool: [
    'release-3.md',
    'release-3-1.md',
    'release-3-2.md',
    'release-3-3.md',
    'release-3-3-1.md',
  ],
  beforeTheFiles: ['release-3-4.md'],
  beforeTheRename: [
    'release-3-4-1.md',
    'release-4.md',
    'release-4-1.md',
    'release-5.md',
    'release-5-1.md',
    'release-5-2.md',
    'release-5-3.md',
    'release-5-3-1.md',
  ],
  namedThen: {
    'fixtures/data/blockModel.json': 'fixtures/data/block-model.json',
  },
};

`;

const RECORD_EDITS: readonly MigrationEdit[] = [
  {
    file: 'sheet/project.ts',
    from: ' * - `buildPaths`, `buildReads` · its paths, and what it reads\n',
    to: ' * - `buildPaths`, `buildReads`, `recordEras` · its paths, its reads, its records\n',
  },
  {
    file: 'sheet/project.ts',
    from: '\nexport {\n  buildBranch,\n',
    to: `\n${RECORD_ERAS}export {\n  buildBranch,\n`,
  },
  {
    file: 'sheet/project.ts',
    from: '  product,\n  referenceTools,\n};\n',
    to: '  product,\n  recordEras,\n  referenceTools,\n};\n',
  },
];

export { RECORD_EDITS };
