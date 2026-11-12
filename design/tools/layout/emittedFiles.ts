/**
 * - `emitted`, `Emitted`, `isADocument` · what the build prints, where; a document
 * - the product's JSON and documents, a rule file as markdown, a skill as SKILL.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../root.ts';
import { buildReads } from '../../sheet/project.ts';

interface Emitted {
  readonly module: string;
  readonly name: string;
  readonly fixture: string;
  readonly print: 'json' | 'rules' | 'skill' | 'document';
}

// a module whose data the build prints, committed so a release's commit holds it
const EMITTED: readonly Emitted[] = [
  // the markdown the build side reads, at the paths it reads them
  {
    module: 'docs/documents/ticket-pipeline.ts',
    name: 'ticketPipeline',
    fixture: 'docs/process/ticket-pipeline.md',
    print: 'document',
  },
  {
    module: 'docs/documents/new-project.ts',
    name: 'newProject',
    fixture: 'docs/process/new-project.md',
    print: 'document',
  },
  {
    module: 'dev/map.ts',
    name: 'directoryMap',
    fixture: 'dev/map.md',
    print: 'document',
  },
];

// a folder whose every data file prints as one markdown file: [its export, how it prints, where]
const DATA_FOLDERS: readonly (readonly [
  string,
  string,
  Emitted['print'],
  (base: string) => string,
])[] = [
  ['docs/rules', 'rules', 'rules', (base) => `docs/rules/${base}.md`],
  ['dev/rules', 'rules', 'rules', (base) => `dev/rules/${base}.md`],
  [
    'docs/skills',
    'skill',
    'skill',
    (base) => `.claude/skills/design-${base}/SKILL.md`,
  ],
];

// every data file of the folders, a type file left out, with the markdown it prints as
function dataFiles(): readonly Emitted[] {
  return DATA_FOLDERS.flatMap(([folder, name, print, fixtureOf]) => {
    const full = path.join(ROOT, folder);
    if (!fs.existsSync(full)) return [];
    return fs
      .readdirSync(full)
      .filter((file) => file.endsWith('.ts') && !file.endsWith('Types.ts'))
      .sort()
      .map((file) => ({
        module: `${folder}/${file}`,
        name,
        fixture: fixtureOf(file.replace(/\.ts$/, '')),
        print,
      }));
  });
}

// what the product's build side reads, each export printed at its path: its data as JSON, its documents as markdown
const productPrints = (): readonly Emitted[] => [
  ...buildReads.json.map((one) => ({ ...one, print: 'json' as const })),
  ...buildReads.documents.map((one) => ({
    ...one,
    print: 'document' as const,
  })),
];

// a module that is a document prints as markdown and is no entry of its own
const isADocument = (file: string): boolean =>
  [...EMITTED, ...buildReads.documents].some((one) => one.module === file);

// the build side's tree (`dev/`) stands only in a product that takes it: a module it lacks prints nothing
const emitted = (): readonly Emitted[] => [
  ...EMITTED.filter((one) => fs.existsSync(path.join(ROOT, one.module))),
  ...productPrints(),
  ...dataFiles(),
];

export { emitted, isADocument };
export type { Emitted };
