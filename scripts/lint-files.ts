/**
 * - `node scripts/lint-files.ts` · no style, page or JavaScript file in this tree
 * - its own folders named by its rules; design/ and dev/ keep a product's names
 */
import { runFileLint } from '../shared/lint/runFileLint.ts';
import { HERE } from './repos.ts';

const ENTRY_OR_PART = 'kebab-case | camelCase';

process.exitCode = runFileLint({
  root: HERE,
  folders: {
    scripts: { '.ts': ENTRY_OR_PART },
    shared: { '.ts': ENTRY_OR_PART },
    'design-system': {
      '.ts': 'camelCase',
      '.md': 'kebab-case',
      '.ttf': 'regex:[A-Z][A-Za-z]+-[A-Z][A-Za-z]+',
    },
    tests: {
      '.ts': 'camelCase',
      '.test.ts': 'camelCase',
      '.json': 'camelCase',
    },
    plan: { '.md': 'kebab-case', '.tsv': 'kebab-case' },
    ports: { '.patch': 'kebab-case' },
  },
  ignore: ['node_modules', '.rehearsal', '.git'],
});
