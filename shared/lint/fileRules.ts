/**
 * - `fileLintConfig` · ls-lint's config: no style, page or script file in a folder
 * - `FolderRules` · a repository's naming of its folders, a key covering those below
 * - each folder gets one rule set, its most specific key's: ls-lint picks no glob
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

const BANS: FolderRules = Object.fromEntries(
  BANNED_EXTENSIONS.map(({ extension }) => [extension, 'exists:0']),
);

type Folders = Readonly<Record<string, FolderRules>>;

const covers = (key: string, folder: string): boolean =>
  minimatch(folder, key) || minimatch(folder, `${key}/**`);

// every folder of the tree, an ignored one and all below it left out
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

// the most specific key covering a folder, the later of two alike; the bans always
function rulesOf(folder: string, folders: Folders): FolderRules {
  const depth = (key: string): number => key.split('/').length;
  const [, rules] = Object.entries(folders)
    .filter(([key]) => covers(key, folder))
    .reduce<readonly [number, FolderRules]>(
      (best, [key, own]) => (depth(key) >= best[0] ? [depth(key), own] : best),
      [0, {}],
    );
  return rules;
}

// each folder keyed by its own path: ls-lint reads a key as a path before a glob
const fileLintConfig = ({
  root,
  folders,
  ignore,
}: {
  readonly root: string;
  readonly folders: Folders;
  readonly ignore: readonly string[];
}): FileLintConfig => ({
  ls: {
    ...bansIn(root, ''),
    ...Object.fromEntries(
      foldersUnder(root, ignore).map((folder) => [
        folder,
        { ...rulesOf(folder, folders), ...bansIn(root, folder) },
      ]),
    ),
  },
  ignore,
});

export { fileLintConfig };
export type { FolderRules };
