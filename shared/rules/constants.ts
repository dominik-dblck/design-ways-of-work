/**
 * - `shared` · constants: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A word a person reads is a constant (`{name}Words.ts`) or the domain\'s own sentence, never a literal in the markup (its text, a string child, a label a reader hears); a table of words (`…_WORDS`) is declared in a words file, `{name}Words.ts` or a words home the repository names.', why: 'A word is changed in one place and reads the same on every screen.', design: { gate: 'ESLint `wow/markup-syntax` (a word in the markup) · `wow/production-syntax` (a words table)', exceptions: '—' }, build: { gate: '`aWordIsNotInTheMarkup` · `copyLivesInAWordsFile` · `theWordsFollowTheGlossary`', exceptions: '—' } },
  { rule: 'A count picks its form in one function: a noun with its count, or two whole sentences where the verb moves with the count.', why: 'No page reads "1 blocks".', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`aCountIsReadOnce`', exceptions: '—' } },
];

export { shared };
