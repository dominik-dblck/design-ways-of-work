/**
 * - `componentOf`, `carriesItsName` · the component a part serves; its name in it
 * - `DRAWERS`, `wordsOwed` · a name that says where; a drawer folder's closing words
 */
import path from 'node:path';
import { TIERS } from './componentFolders.ts';

const DRAWERS = ['utils', 'helpers', 'common', 'shared'];
const DRAWER_WORDS: Readonly<Record<string, readonly string[]>> = {
  utils: ['Utils', 'Adapters'],
  constants: ['Constants', 'Words'],
  types: ['Types', 'Answers'],
  providers: ['Provider'],
  services: ['Service'],
};
const PURPOSED = ['utils'];

// the component a part serves, under one of the scope's roots at any depth; null for its own file, its tests
function componentOf(
  file: string,
  components: readonly string[],
): string | null {
  const root = components.find((one) => file.startsWith(`${one}/`));
  if (root === undefined) return null;
  const [tier = '', component = '', folder = '', ...rest] = file
    .slice(root.length + 1)
    .split('/');
  return TIERS.includes(tier) && folder !== '__tests__' && rest.length > 0
    ? component
    : null;
}

// a part's stem holds its component's name, in any case
const carriesItsName = (stem: string, component: string): boolean =>
  stem.toLowerCase().includes(component.toLowerCase());

// the words a stem owes its folder: none when it ends with one, after a purpose where one is due
function wordsOwed({
  file,
  stem,
  component,
}: {
  readonly file: string;
  readonly stem: string;
  readonly component: string | null;
}): readonly string[] {
  const folder = path.posix.basename(path.posix.dirname(file));
  const words = DRAWER_WORDS[folder] ?? [];
  const isHeld = words.some((word) => {
    const before = stem.slice(0, -word.length).toLowerCase();
    return (
      stem.endsWith(word) &&
      (!PURPOSED.includes(folder) ||
        (before !== '' && before !== component?.toLowerCase()))
    );
  });
  return isHeld ? [] : words;
}

export { carriesItsName, componentOf, DRAWERS, wordsOwed };
