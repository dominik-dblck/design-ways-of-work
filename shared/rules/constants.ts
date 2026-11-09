/**
 * - `shared` · constants: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

const shared: SharedRules<never> = {
  title: 'Constants',
  opening: 'Values the code reads and never computes.',
  rows: [
    { rule: "A word a person reads is a constant (`{name}Words.ts`) or the domain's own sentence, never a literal in the markup (its text, a string child, a label a reader hears) nor in a component's other files (a label in a constants file, an adapter's button); a key the code compares, looks up or types closed is no word, and a style is styling's; a table of words (`…_WORDS`) is declared in a words file, `{name}Words.ts` or a words home the repository names.", why: 'A word is changed in one place and reads the same on every screen.', design: { gate: "ESLint `wow/markup-syntax` (a word in the markup) · ESLint `wow/words-live-in-a-words-file` (a word in a component's other files) · ESLint `wow/production-syntax` (a words table)", exceptions: '—' }, build: { gate: '`aWordIsNotInTheMarkup` · `copyLivesInAWordsFile` · `theWordsFollowTheGlossary`', exceptions: 'until its port, where ESLint `wow/words-live-in-a-words-file` replaces `copyLivesInAWordsFile` (its 19 words in 6 files moved there)' } },
    { rule: 'A count picks its form in one function: a noun with its count, or two whole sentences where the verb moves with the count.', why: 'No page reads "1 blocks".', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`aCountIsReadOnce`', exceptions: '—' } },
  ],
  whys: {},
};

export { shared };
