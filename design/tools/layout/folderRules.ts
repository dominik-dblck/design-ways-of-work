/**
 * - `folderRules` · ls-lint's rules for every folder, from the homes and its own
 * - a folder is a home, on the way to one, an entry's, or the repository's own
 */
import path from 'node:path';
import type { FolderRules } from '../../shared/lint/fileRules.ts';
import { emitted, filesOf, homes, isEntry } from '../layout.ts';

// the folders beside the homes: run or read, never published, holding no home's files
const OWN_FOLDERS = [
  'tools',
  'tests',
  '.claude',
  '.husky',
  'design-system',
  'notes',
];
const ANY_NAME: FolderRules = { '.dir': 'regex:.*' };

const parentOf = (folder: string): string =>
  folder.includes('/') ? folder.slice(0, folder.lastIndexOf('/')) : '';
const escaped = (name: string): string =>
  name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// a home that bundles names its folders, its child homes and its entries'; any other home is free below
function folderRules(): Readonly<Record<string, FolderRules>> {
  // a module straight in a bundling home has its folder: an entry, or one written as JSON
  const entries = [
    ...filesOf().filter(isEntry),
    ...emitted().map((one) => one.module),
  ].map((file) => file.replace(/\.ts$/, ''));
  const free = [
    ...homes()
      .filter((home) => !home.bundles)
      .map((home) => home.source),
    ...OWN_FOLDERS,
    ...entries,
  ];
  const named = [...homes().map((home) => home.source), ...free];
  // the root, each folder on the way to a named one, and each home that bundles
  const ways = named.flatMap((folder) =>
    folder.split('/').map((_step, at, steps) => steps.slice(0, at).join('/')),
  );
  const held = [
    ...new Set([...ways, ...named.filter((one) => !free.includes(one))]),
  ].filter((folder) => !free.includes(folder));
  const childrenOf = (folder: string): readonly string[] => [
    ...new Set(
      [...named, ...ways]
        .filter((one) => one !== '' && parentOf(one) === folder)
        .map((one) => path.posix.basename(one)),
    ),
  ];
  return Object.fromEntries([
    ...held.map((folder) => [
      folder,
      {
        '.dir': `regex:^(?:${[...(folder === '' ? [] : [path.posix.basename(folder)]), ...childrenOf(folder)].map(escaped).join('|')})$`,
      },
    ]),
    ...free.map((folder) => [folder, ANY_NAME]),
  ]);
}

export { folderRules };
