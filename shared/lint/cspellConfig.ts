/**
 * - `cspellConfigOf` · cspell's config from a scope: files it spells, words it takes
 * - `Language` · a language some files are also written in, by its dictionary
 */
import type { CSpellUserSettings } from 'cspell';
import { testsOf } from '../repoScope.ts';
import type { RepoScope } from '../repoScope.ts';
import { WOW_WORDS } from './wowWords.ts';

// each language a scope's files may also be written in, by the package that holds its dictionary
const DICTIONARIES = {
  pl: '@cspell/dict-pl_pl/cspell-ext.json',
} as const;

type Language = keyof typeof DICTIONARIES;

// what code is written in beside English: its languages, its runtime, its libraries' names
const CODE = ['softwareTerms', 'typescript', 'node', 'npm', 'html', 'css'];

// a character a URL escapes (`%2F`): its digits are never a word's start
const A_PERCENT_ESCAPE = /%[0-9A-Fa-f]{2}/g;

const OWN = new Set(WOW_WORDS.map((word) => word.toLowerCase()));

// a reviewed word the way of working holds, in any case, moves to its one home; a computed one is taken once
function wordsOf({
  computed,
  reviewed,
}: RepoScope['spelling']): readonly string[] {
  const twice = reviewed.filter((word) => OWN.has(word.toLowerCase()));
  if (twice.length)
    throw new Error(
      `cspell: ${twice.join(', ')} is the way of working's own word (shared/lint/wowWords.ts), never the scope's too`,
    );
  return [
    ...WOW_WORDS,
    ...reviewed,
    ...computed.filter((word) => !OWN.has(word.toLowerCase())),
  ];
}

// a file a generator writes is spelled at its source; a `!` among its globs keeps a file hand-written
const writtenOff = (scope: RepoScope): CSpellUserSettings['overrides'] =>
  scope.generators
    .flatMap((one) => one.writes)
    .map((glob) => ({
      filename: glob.replace(/^!/, ''),
      enabled: glob.startsWith('!'),
    }));

const cspellConfigOf = (scope: RepoScope): CSpellUserSettings => {
  const { files, onPurpose, alsoIn } = scope.spelling;
  return {
    version: '0.2',
    language: 'en,en-GB',
    dictionaries: CODE,
    // a language's dictionary, imported for every file, speaks only where an override names its language
    import: [...new Set(alsoIn.map((one) => DICTIONARIES[one.language]))],
    words: [...wordsOf(scope.spelling)],
    ignoreRegExpList: [A_PERCENT_ESCAPE, ...onPurpose].map((one) =>
      one.toString(),
    ),
    files: files.filter((glob) => !glob.startsWith('!')),
    // a product's tree in its product, a test once data names its words
    ignorePaths: [
      ...scope.ignores,
      ...scope.productTrees,
      ...scope.generated,
      ...testsOf(scope),
      ...files
        .filter((glob) => glob.startsWith('!'))
        .map((glob) => glob.slice(1)),
    ],
    enableGlobDot: true,
    useGitignore: true,
    overrides: [
      ...(writtenOff(scope) ?? []),
      ...alsoIn.map((one) => ({
        filename: [...one.files],
        language: `en,en-GB,${one.language}`,
        words: [...one.words],
      })),
    ],
  };
};

export { cspellConfigOf };
export type { Language };
