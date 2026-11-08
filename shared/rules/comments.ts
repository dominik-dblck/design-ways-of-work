/**
 * - `shared` · comments: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'The file\'s header (`responsibility.md`) is the one comment that says what a file does.', why: 'Said once at the top, it is not said again above every function.', design: { gate: '`aFileStatesItsJob`', exceptions: '—' }, build: { gate: '`aFileStatesItsJob`', exceptions: '—' } },
  { rule: 'A JSDoc past the header is one line, directly above an export, stating a contract its name and type do not show: what `null` means, a unit, what the server checks again. It never restates the name or the type.', why: 'It shows on hover wherever the export is used; a restated name is noise the hover repeats.', design: { gate: '`commentsAreInvariants`', exceptions: 'tests · generated files' }, build: { gate: '`commentsAreInvariants` (one line, above an export) · `review` (a contract, not a restatement)', exceptions: 'tests · generated files · the files on its list, which only shrink' } },
  { rule: 'A `//` comment is one line about the code under it, saying what breaks if it is undone.', why: 'It is the one question nothing else in the repository answers.', design: { gate: '`commentsAreInvariants`', exceptions: 'tests · generated files' }, build: { gate: '`commentsAreInvariants`', exceptions: 'tests · generated files · the files on its list, which only shrink' } },
  { rule: 'A file carries at most 10 comment lines outside its header.', why: 'Past ten, a file is being explained rather than written.', design: { gate: '`commentsAreInvariants`', exceptions: 'tests · generated files' }, build: { gate: '`commentsAreInvariants`', exceptions: 'tests · generated files · the files on its list, which only shrink' } },
  { rule: 'No date, ticket, review, stage or chronicle in a comment.', why: 'Narration reads as authoritative and goes stale the first time somebody edits without adding to it.', design: { gate: '`commentsAreInvariants`', exceptions: 'a part named for the epic it holds names that epic (D13)' }, build: { gate: '`commentsAreInvariants` · `theCodeNamesNoTicket`', exceptions: '—' } },
  { rule: 'A file still written in the old style is cleaned when it is edited: delete rather than preserve, shorten what is worth keeping.', why: 'Each edit shrinks the debt instead of carrying it forward.', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`review`', exceptions: '—' } },
  { rule: 'An ESLint directive is one line naming its rule, its reason after `--` (`// eslint-disable-next-line id-length -- colour channels`); it is not counted in the ten.', why: 'An exception is read where it is made, and one whose rule no longer fires goes.', design: { gate: 'ESLint `@eslint-community/eslint-comments/require-description` · `reportUnusedDisableDirectives: "error"`', exceptions: '—' }, build: { gate: 'ESLint `@eslint-community/eslint-comments/require-description` · `reportUnusedDisableDirectives: "error"`', exceptions: '—' } },
];

export { shared };
