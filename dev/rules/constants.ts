/**
 * - `rules` · constants: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Constants',
  intro: '\nValues the code reads and never computes: URLs, route paths, keys, the words a person reads.\n',
  rows: [
    { rule: '`app/constants/` is flat, one file per feature (`refusalKindsConstants.ts`, `documentWords.ts`); a component\'s own constants sit in its `constants/` (`names.md`).', gate: '`theMapIsTheTree` (no sub-folder) · `aComponentFolderIsStructured`', exceptions: '—', why: 'A constant is found by its feature\'s name, in one place.' },
    { rule: 'A URL the browser calls is in `frontendApiConstants.ts` (`one-home.md`); one the server calls outside the app goes to `backendApiConstants.ts`, written the day there is one, and reads `process.env` on the server only.', gate: '`aUrlIsWrittenOnce`', exceptions: '—', why: 'Each side knows its next hop, and no browser bundle carries a server\'s address.' },
    { rule: 'A page\'s path is in `appRoutesConstants.ts`.', gate: '`urlsForMapsEveryTarget` · `review`', exceptions: '—', why: 'A link and a redirect cannot point at two spellings of one page.' },
    { rule: 'A word a person reads is a constant (`{name}Words.ts`) or the domain\'s own sentence, never a literal in the markup (its text, a string child, a label a reader hears); a table of words (`…_WORDS`) is declared in a Words file.', gate: '`aWordIsNotInTheMarkup` · `copyLivesInAWordsFile` · `theWordsFollowTheGlossary`', exceptions: '—', why: 'A word is changed in one place and reads the same on every screen.' },
    { rule: 'A count picks its form in `byCount` alone: a noun with its count is data, `countedNoun(count, { one, many })` with the nouns in the words table; a sentence whose verb or pronoun moves with the count is two whole sentences, `byCount(count, { one, many })`.', gate: '`aCountIsReadOnce`', exceptions: '—', why: 'No screen reads "1 blocks", and a form is changed where the noun is written.' },
  ],
  outro: '',
};

export { rules };
