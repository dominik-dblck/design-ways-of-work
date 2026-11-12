/**
 * - `emitted`, `Emitted`, `isADocument` · what the build prints, where; a document
 * - `present` · the rows a product holds: an optional one it lacks left out, another refused
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
  // the build side's tree (`dev/`), which a product holds only once it takes it
  readonly optional?: true;
}

// each row whose file the product holds; one it lacks prints nothing when optional, and stops the build when not
function present<Row extends { readonly optional?: true }>(
  rows: readonly Row[],
  root: string,
  fileOf: (row: Row) => string,
): readonly Row[] {
  return rows.filter((row) => {
    if (fs.existsSync(path.join(root, fileOf(row)))) return true;
    if (row.optional) return false;
    throw new Error(
      `${fileOf(row)} · the build prints it, and the product holds none`,
    );
  });
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
    optional: true,
  },
];

// a folder whose every data file prints as one markdown file
interface DataFolder {
  readonly folder: string;
  readonly name: string;
  readonly print: Emitted['print'];
  readonly fixtureOf: (base: string) => string;
  readonly optional?: true;
}

const DATA_FOLDERS: readonly DataFolder[] = [
  {
    folder: 'docs/rules',
    name: 'rules',
    print: 'rules',
    fixtureOf: (base) => `docs/rules/${base}.md`,
  },
  {
    folder: 'dev/rules',
    name: 'rules',
    print: 'rules',
    fixtureOf: (base) => `dev/rules/${base}.md`,
    optional: true,
  },
  {
    folder: 'docs/skills',
    name: 'skill',
    print: 'skill',
    fixtureOf: (base) => `.claude/skills/design-${base}/SKILL.md`,
  },
];

// every data file of the folders, a type file left out, with the markdown it prints as
function dataFiles(): readonly Emitted[] {
  return present(DATA_FOLDERS, ROOT, (one) => one.folder).flatMap(
    ({ folder, name, print, fixtureOf }) => {
      const full = path.join(ROOT, folder);
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
    },
  );
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

const emitted = (): readonly Emitted[] => [
  ...present(EMITTED, ROOT, (one) => one.module),
  ...productPrints(),
  ...dataFiles(),
];

export { emitted, isADocument, present };
export type { Emitted };
