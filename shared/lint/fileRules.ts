/**
 * - `fileLintConfig` · ls-lint's config: case by kind; no style, page or script
 * - `FolderRules`, `NameCase` · a folder's rules by kind; a case a scope adds
 * - a folder takes its most specific key's rules over its kind's case
 */
import { minimatch } from 'minimatch';
import fs from 'node:fs';
import path from 'node:path';
interface Banned {
  readonly extension: string;
  readonly why: string;
}

// an extension → its ls-lint rule, as `'.ts': 'kebab-case | camelCase'`
type FolderRules = Readonly<Record<string, string>>;

// a name's case beyond its kind's, where its folders hold it: each kind's form added, or a kind of its own
interface NameCase {
  readonly folders: readonly string[];
  readonly kinds: FolderRules;
  readonly why: string;
}

interface FileLintConfig {
  readonly ls: Readonly<Record<string, FolderRules | string>>;
  readonly ignore: readonly string[];
}

const STYLES =
  'a style is TypeScript: a token of design-system/, read through the theme';
const PAGES =
  'a page is TSX; the build writes the HTML a browser opens, never a person';
const SCRIPTS = 'the code is TypeScript; what runs as JavaScript is built';

const BANNED_EXTENSIONS: readonly Banned[] = [
  { extension: '.css', why: STYLES },
  { extension: '.scss', why: STYLES },
  { extension: '.less', why: STYLES },
  { extension: '.html', why: PAGES },
  { extension: '.htm', why: PAGES },
  { extension: '.js', why: SCRIPTS },
  { extension: '.jsx', why: SCRIPTS },
  { extension: '.mjs', why: SCRIPTS },
  { extension: '.cjs', why: SCRIPTS },
];

// a name a tool or an agent opens by its convention, a file's (`README`) or a folder's (`.claude`, `__tests__`)
const FIXED = ['README', 'SKILL', 'CLAUDE', 'AGENTS'];
const CODE = 'camelCase';
const DATA = 'camelCase | regex:^(?:package|tsconfig|eslint-suppressions)$';
const KEBAB = 'kebab-case';
const VIEW = 'camelCase | PascalCase';
const PROSE = `kebab-case | regex:^_[a-z0-9]+(?:-[a-z0-9]+)*$ | regex:^(?:${FIXED.join('|')})$`;
const FOLDER = 'kebab-case | regex:^\\.[a-z]+$ | regex:^__[a-z]+__$';

// ls-lint reads a kind from a name's first dot, and `.ts` holds no `.test.ts`: each is its own
const CASE_BY_KIND: FolderRules = {
  '.dir': FOLDER,
  '.ts': CODE,
  '.mts': CODE,
  '.d.ts': CODE,
  '.test.ts': CODE,
  '.test-d.ts': CODE,
  '.spec.ts': CODE,
  '.config.ts': CODE,
  '.config.mts': CODE,
  '.tsx': VIEW,
  '.test.tsx': VIEW,
  '.md': PROSE,
  '.json': DATA,
  '.base.json': DATA,
  '.spec.json': DATA,
  '.tsv': KEBAB,
  '.patch': KEBAB,
  '.svg': KEBAB,
  '.png': KEBAB,
  '.ttf': KEBAB,
  '.woff2': KEBAB,
};

const BANS: FolderRules = Object.fromEntries(
  BANNED_EXTENSIONS.map(({ extension }) => [extension, 'exists:0']),
);

type Folders = Readonly<Record<string, FolderRules>>;

const covers = (key: string, folder: string): boolean =>
  minimatch(folder, key) || minimatch(folder, `${key}/**`);

function foldersUnder(root: string, ignore: readonly string[]): string[] {
  const walk = (at: string): string[] =>
    fs
      .readdirSync(path.join(root, at), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => (at === '' ? entry.name : `${at}/${entry.name}`))
      .filter((folder) => !ignore.some((glob) => covers(glob, folder)))
      .flatMap((folder) => [folder, ...walk(folder)]);
  return walk('');
}

// ls-lint reads a name's extension from its first dot: `a.config.mjs` is banned as `.config.mjs`
function bansIn(root: string, folder: string): FolderRules {
  const found = fs
    .readdirSync(path.join(root, folder), { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
    .map((entry) => entry.name.slice(entry.name.indexOf('.')))
    .filter((extension) =>
      BANNED_EXTENSIONS.some((banned) => extension.endsWith(banned.extension)),
    );
  return {
    ...BANS,
    ...Object.fromEntries(found.map((extension) => [extension, 'exists:0'])),
  };
}

const A_MODULE = /\.(?:ts|tsx|mts)$/;
const loose = (name: string): string => name.toLowerCase().replace(/[-_]/g, '');

// a folder beside a module of its name holds that module's parts: it takes the module's name as it is
function moduleNamed(root: string, folder: string): FolderRules {
  const name = path.posix.basename(folder);
  const module = fs
    .readdirSync(path.join(root, path.posix.dirname(folder)))
    .filter((file) => A_MODULE.test(file))
    .map((file) => file.replace(A_MODULE, ''))
    .find((stem) => loose(stem) === loose(name));
  return folder === '' || module === undefined
    ? {}
    : { '.dir': `regex:^${module.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$` };
}

// the most specific key covering a folder, the later of two alike, else the root's; the bans always
function rulesOf(folder: string, folders: Folders): FolderRules {
  const depth = (key: string): number => key.split('/').length;
  const [, rules] = Object.entries(folders)
    .filter(([key]) => covers(key, folder))
    .reduce<readonly [number, FolderRules]>(
      (best, [key, own]) => (depth(key) >= best[0] ? [depth(key), own] : best),
      [0, folders[''] ?? {}],
    );
  return rules;
}

// the kind's case, with the form of each scope's case covering the folder
const caseOf = (folder: string, cases: readonly NameCase[]): FolderRules =>
  cases
    .filter((one) => one.folders.some((glob) => covers(glob, folder)))
    .flatMap((one) => Object.entries(one.kinds))
    .reduce<FolderRules>(
      (rules, [kind, form]) => ({
        ...rules,
        [kind]: rules[kind] === undefined ? form : `${rules[kind]} | ${form}`,
      }),
      CASE_BY_KIND,
    );

interface Wanted {
  readonly root: string;
  readonly folders: Folders;
  readonly ignore: readonly string[];
  readonly cases: readonly NameCase[];
}

// a folder that rules every kind (`.*`, a component's shape) keeps its own; any other its own over the case
function ruled(folder: string, wanted: Wanted): FolderRules {
  const own = rulesOf(folder, wanted.folders);
  return {
    ...(own['.*'] === undefined
      ? { ...caseOf(folder, wanted.cases), ...moduleNamed(wanted.root, folder) }
      : {}),
    ...own,
    ...bansIn(wanted.root, folder),
  };
}

// each folder keyed by its own path: ls-lint reads a key as a path before a glob
const fileLintConfig = (wanted: Wanted): FileLintConfig => ({
  ls: {
    ...ruled('', wanted),
    ...Object.fromEntries(
      foldersUnder(wanted.root, wanted.ignore).map((folder) => [
        folder,
        ruled(folder, wanted),
      ]),
    ),
  },
  ignore: wanted.ignore,
});

export { fileLintConfig };
export type { FolderRules, NameCase };
