/**
 * - `homes`, `Home`, `ROOT`, `filesOf`, `emitted`, `Emitted` · homes, files, JSON
 * - `publishedOf`, `sourceOf`, `pageOf`, `Page` · paths out and back, pages
 * - `isEntry`, `entryOfPart`, `entryOfModule`, `importsOfEntry` · modules
 */
import fs from 'node:fs';
import path from 'node:path';
import { emitted, isADocument } from './layout/emittedFiles.ts';
import { importedEntries } from './layout/moduleImports.ts';
import { ROOT } from './root.ts';
import type { Emitted } from './layout/emittedFiles.ts';

interface Home {
  readonly source: string;
  readonly published: string | null;
  readonly bundles: boolean;
}

// the homes whose `.ts` straight inside are sheet entries, each bundled with the folder of its name
const SHEET_HOMES: readonly string[] = [
  'sheet',
  'sheet/words',
  'sheet/contract',
  'sheet/model',
  'sheet/logic',
  'sheet/logic/approval',
  'sheet/logic/translation',
  'sheet/logic/delivery',
  'sheet/logic/assembly',
  'sheet/logic/document',
  'sheet/logic/agent',
  'sheet/screens',
  'sheet/cases',
  'sheet/samples',
  'roadmaps',
  'docs/process',
  'guards',
  'app/workspace',
  'app/styles',
];

// the homes copied as they are: [repository folder, folder in dist/project/]
const FILE_HOMES: readonly (readonly [string, string])[] = [
  ['records', ''],
  ['guards/__snapshots__', 'scraps'],
  ['public/assets', 'assets'],
  ['fixtures/packs', 'packs'],
  ['fixtures/screens', 'screens'],
];

// the homes only run or read, never bundled nor published: the checks' parts, the rules, the skills
const RUN_HOMES: readonly string[] = [
  'guards/checks',
  'docs/rules',
  'docs/skills',
  'docs/documents',
  'dev',
  'shared',
];

// the React code: a `.tsx` straight in `app/pages` is a page, bundled with all it imports; its theme
const REACT_HOMES: readonly string[] = [
  'app/pages',
  'app/components',
  'app/theme',
];

// an epic's own folder, its notebook published flat beside the sheet
const EPIC_FOLDER = /^E\d{2}$/;

function epicHomes(): readonly Home[] {
  const roadmaps = path.join(ROOT, 'roadmaps');
  if (!fs.existsSync(roadmaps)) return [];
  return fs
    .readdirSync(roadmaps, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && EPIC_FOLDER.test(entry.name))
    .map((entry) => ({
      source: `roadmaps/${entry.name}`,
      published: '',
      bundles: false,
    }));
}

let known: readonly Home[] | null = null;

function homes(): readonly Home[] {
  known ??= [
    ...SHEET_HOMES.map((source) => ({ source, published: '', bundles: true })),
    ...FILE_HOMES.map(([source, published]) => ({
      source,
      published,
      bundles: false,
    })),
    ...[...RUN_HOMES, ...REACT_HOMES].map((source) => ({
      source,
      published: null,
      bundles: false,
    })),
    ...epicHomes(),
  ];
  return known;
}

const inside = (file: string, folder: string): boolean =>
  folder === '' || file === folder || file.startsWith(`${folder}/`);

function homeOf(file: string): Home | null {
  return (
    homes()
      .filter((home) => inside(file, home.source))
      .sort((one, two) => two.source.length - one.source.length)[0] ?? null
  );
}

const joined = (folder: string, rest: string): string =>
  folder && rest ? `${folder}/${rest}` : folder || rest;

function publishedOf(file: string): string | null {
  const home = homeOf(file);
  if (home?.published == null) return null;
  return joined(home.published, file.slice(home.source.length + 1));
}

// a published path back to the repository: the file or folder there, else the one place a new one may go
function sourceOf(published: string): string | null {
  const candidates = homes()
    .flatMap((home) =>
      home.published !== null && inside(published, home.published)
        ? [
            joined(
              home.source,
              published.slice(home.published.length).replace(/^\//, ''),
            ),
          ]
        : [],
    )
    .filter((file) => publishedOf(file) === published);
  const there = candidates.find((file) => fs.existsSync(path.join(ROOT, file)));
  if (there !== undefined) return there;
  const prefixed = candidates.filter((file) => homeOf(file)?.published);
  return prefixed.length === 1 ? (prefixed[0] ?? null) : null;
}

const SYSTEM_FILE = /^\.DS_Store$/;

function walk(folder: string): readonly string[] {
  const full = path.join(ROOT, folder);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && !SYSTEM_FILE.test(entry.name))
    .map((entry) =>
      path
        .relative(ROOT, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join('/'),
    );
}

function filesOf(): readonly string[] {
  return [...new Set(homes().flatMap((home) => walk(home.source)))].sort();
}

const isSource = (file: string): boolean =>
  file.endsWith('.ts') && !/\.(d|test)\.ts$/.test(file);

// a path's place under its home, when the home bundles: [the first folder or file, what is below it]
function underABundlingHome(file: string): readonly string[] | null {
  const home = homeOf(file);
  return home?.bundles && isSource(file)
    ? file.slice(home.source.length + 1).split('/')
    : null;
}

// an entry, by its path alone: a `.ts` straight in a bundling home, no declaration, no test, no data
function isEntry(file: string): boolean {
  return underABundlingHome(file)?.length === 1 && !isADocument(file);
}

// the entry a part serves, by path: beside its first folder; in an epic's folder, the one its name ends with
function entryOfPart(file: string): string | null {
  const home = homeOf(file);
  const kind = /[a-z\d]([A-Z][a-z]+)\.ts$/.exec(file)?.[1];
  if (home && EPIC_FOLDER.test(path.posix.basename(home.source)))
    return isSource(file) && kind ? `roadmaps/${kind.toLowerCase()}.ts` : null;
  const steps = underABundlingHome(file);
  if (!steps || steps.length < 2 || !home) return null;
  return `${home.source}/${steps[0] ?? ''}.ts`;
}

const entryOfModule = (file: string): string =>
  isEntry(file) ? file : (entryOfPart(file) ?? file);

function importsOfEntry(entry: string): readonly string[] {
  const files = filesOf().filter(
    (file) => file.endsWith('.ts') && entryOfModule(file) === entry,
  );
  return importedEntries(files, { root: ROOT, entryOf: entryOfModule });
}

interface Page {
  readonly script: string;
  readonly shell: string;
  readonly title: string;
}

const A_PAGE = /^app\/pages\/([a-z][a-z\d-]*)\.tsx$/;

// a page's bundle is its file's name and `-page`, never a module's; its shell and title, the name in capitals
function pageOf(file: string): Page | null {
  const name = A_PAGE.exec(file)?.[1];
  if (name === undefined) return null;
  const title = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return { script: `${name}-page.js`, shell: `${title}.html`, title };
}

export {
  emitted,
  entryOfModule,
  entryOfPart,
  filesOf,
  homes,
  importsOfEntry,
  isEntry,
  pageOf,
  publishedOf,
  ROOT,
  sourceOf,
};
export type { Emitted, Page };
