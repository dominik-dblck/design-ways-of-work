/**
 * - `EMITTED`, `emitted`, `Emitted` · the data the build prints, and where
 * - a JSON module, every rule file and document as its markdown, a skill as SKILL.md
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../root.ts';

interface Emitted {
  readonly module: string;
  readonly name: string;
  readonly fixture: string;
  readonly print: 'json' | 'rules' | 'skill' | 'document';
}

// a module whose data the build writes as JSON, committed so a release's commit holds it
const EMITTED: readonly Emitted[] = [
  {
    module: 'app/styles/components.spec.ts',
    name: 'componentsSpec',
    fixture: 'fixtures/data/components.spec.json',
    print: 'json',
  },
  {
    module: 'sheet/contract/block-model.ts',
    name: 'blockModel',
    fixture: 'fixtures/data/block-model.json',
    print: 'json',
  },
  {
    module: 'docs/process/modes.ts',
    name: 'modesPage',
    fixture: 'fixtures/data/modes.json',
    print: 'json',
  },
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
];

// a folder whose every data file prints as one markdown file: [its export, how it prints, where]
const DATA_FOLDERS: readonly (readonly [
  string,
  string,
  Emitted['print'],
  (base: string) => string,
])[] = [
  ['docs/rules', 'rules', 'rules', (base) => `docs/rules/${base}.md`],
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

const emitted = (): readonly Emitted[] => [...EMITTED, ...dataFiles()];

export { EMITTED, emitted };
export type { Emitted };
