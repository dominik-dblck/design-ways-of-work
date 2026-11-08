/**
 * - `componentFolders` · ls-lint's rules for a component's folder, under each root
 * - `TIERS` · the atomic tiers, each a folder of components
 * - its file and barrel at its root, its parts in the shape's folders
 */
import type { FolderRules } from './fileRules.ts';

const TIERS = ['atoms', 'molecules', 'organisms', 'templates'];
const ANY_TIER = `{${TIERS.join(',')}}`;
const SHAPE_FOLDERS = [
  'components',
  'hooks',
  'utils',
  'types',
  'constants',
  'providers',
  'services',
];
const NEVER = 'regex:a^';
const NOTHING: FolderRules = { '.dir': NEVER, '.*': 'exists:0' };

// a part's own name is ESLint's to read (`wow/file-names-its-purpose`): here any name, a source alone
const A_PART: FolderRules = {
  '.tsx': 'regex:.*',
  '.ts': 'regex:.*',
  '.*': 'exists:0',
};

// one root's folders: a component, a stray folder in it, an atom's parts, the shape's depths
const foldersOf = (
  root: string,
): readonly (readonly [string, FolderRules])[] => {
  const shape = `${root}/${ANY_TIER}/*/{${SHAPE_FOLDERS.join(',')}}`;
  return [
    [
      `${root}/${ANY_TIER}/*`,
      {
        '.dir': `PascalCase | regex:${[...SHAPE_FOLDERS, '__tests__'].join('|')}`,
        '.tsx': 'regex:${0}',
        '.ts': 'regex:index',
        '.*': 'exists:0',
      },
    ],
    [`${root}/${ANY_TIER}/*/[A-Z]*`, NOTHING],
    [shape, { '.dir': 'kebab-case', ...A_PART }],
    [`${shape}/*`, { '.dir': 'kebab-case', ...A_PART }],
    [`${shape}/*/*`, A_PART],
    [`${root}/${ANY_TIER}/*/__tests__`, { '.*': 'regex:.*' }],
    // an atom has no parts: the later of two keys alike wins
    [`${root}/atoms/*/components`, NOTHING],
  ];
};

// a tier's own tests and a system's dotfiles stand outside every component
const componentFolders = (
  roots: readonly string[],
): {
  readonly folders: Readonly<Record<string, FolderRules>>;
  readonly ignore: readonly string[];
} => ({
  folders: Object.fromEntries(roots.flatMap(foldersOf)),
  ignore: roots.flatMap((root) => [`${root}/*/__tests__`, `${root}/**/.*`]),
});

export { componentFolders, TIERS };
