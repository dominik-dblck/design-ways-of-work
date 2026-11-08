/**
 * - `componentFolders` · ls-lint's rules for a component's folder, under each root
 * - its file and barrel at its root, its parts named for it in the shape's folders
 */
import type { FolderRules } from './fileRules.ts';

const TIERS = '{atoms,molecules,organisms,templates}';
const SHAPE = [
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

// a part carries its component's name, read `up` folders above the file
const named = (up: number): FolderRules => ({
  '.tsx': `regex:(?i).*\${${String(up)}}.*`,
  '.ts': `regex:(?i).*\${${String(up)}}.*`,
  '.*': 'exists:0',
});

// one root's folders: a component, a stray folder in it, an atom's parts, the shape's depths
const foldersOf = (
  root: string,
): readonly (readonly [string, FolderRules])[] => {
  const shape = `${root}/${TIERS}/*/{${SHAPE.join(',')}}`;
  return [
    [
      `${root}/${TIERS}/*`,
      {
        '.dir': `PascalCase | regex:${[...SHAPE, '__tests__'].join('|')}`,
        '.tsx': 'regex:${0}',
        '.ts': 'regex:index',
        '.*': 'exists:0',
      },
    ],
    [`${root}/${TIERS}/*/[A-Z]*`, NOTHING],
    [shape, { '.dir': 'kebab-case', ...named(1) }],
    [`${shape}/*`, { '.dir': 'kebab-case', ...named(2) }],
    [`${shape}/*/*`, named(3)],
    [`${root}/${TIERS}/*/__tests__`, { '.*': 'regex:.*' }],
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

export { componentFolders };
