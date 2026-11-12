/**
 * - `EMITTED`, `emitted`, `Emitted` · the data the build prints, and where
 * - the product's JSON, a rule file and a document as markdown, a skill as SKILL.md
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
    module: 'docs/documents/agent-instructions.ts',
    name: 'agentInstructions',
    fixture: 'docs/process/agent-instructions.md',
    print: 'document',
  },
  {
    module: 'docs/documents/new-project.ts',
    name: 'newProject',
    fixture: 'docs/process/new-project.md',
    print: 'document',
  },
  {
    module: 'docs/documents/api-convention.ts',
    name: 'apiConvention',
    fixture: 'sheet/contract/api-convention.md',
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

// the data the product's build side reads by blob, each export printed as JSON at its path
const productJson = (): readonly Emitted[] =>
  buildReads.json.map(({ module, name, fixture }) => ({
    module,
    name,
    fixture,
    print: 'json',
  }));

const emitted = (): readonly Emitted[] => [
  ...EMITTED,
  ...productJson(),
  ...dataFiles(),
];

export { EMITTED, emitted };
export type { Emitted };
