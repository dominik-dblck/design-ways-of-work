/**
 * - `BANNED_EXTENSIONS` · the files a repository of this way of working never holds, and why
 * - `FolderRules`, `fileLintConfig` · ls-lint's config: the bans in every folder, then a repository's naming
 */
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

const fileLintConfig = (
  folders: Readonly<Record<string, FolderRules>>,
  ignore: readonly string[],
): FileLintConfig => ({
  ls: {
    ...BANS,
    '**': BANS,
    ...Object.fromEntries(
      Object.entries(folders).map(([folder, rules]) => [
        folder,
        { ...rules, ...BANS },
      ]),
    ),
  },
  ignore,
});

export { BANNED_EXTENSIONS, fileLintConfig };
export type { FolderRules };
