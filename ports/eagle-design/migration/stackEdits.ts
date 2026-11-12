/**
 * - `STACK_EDITS` · the edits that name the stack the product is built on
 */
import type { MigrationEdit } from '../../../scripts/migrationTypes.ts';

const STACK_EDITS: readonly MigrationEdit[] = [
  {
    file: 'sheet/project.ts',
    from: ' * - `product`, `company`, `buildSide`, `referenceTools` · who, the tools they know\n',
    to: ' * - `product`, `company`, `buildSide`, `referenceTools`, `stack` · who, built how\n',
  },
  {
    file: 'sheet/project.ts',
    from: "const buildSide = 'CC';\n",
    to: "const buildSide = 'CC';\nconst stack = 'web';\n",
  },
  {
    file: 'sheet/project.ts',
    from: '  recordEras,\n  referenceTools,\n};\n',
    to: '  recordEras,\n  referenceTools,\n  stack,\n};\n',
  },
];

export { STACK_EDITS };
