/**
 * - `rules` · comments: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Comments',
  intro: '\nThe default is none. The code and the file\'s header say what; `git log` and the work trail say when,\nwho and why it was asked for.\n',
  rows: [
    { rule: 'The file\'s header (`responsibility.md`) is the one comment that says what a file does.', gate: '`aFileStatesItsJob`', exceptions: '—', why: 'Said once at the top, it is not said again above every function.' },
    { rule: 'A JSDoc past the header is one line, directly above an export, stating a contract its name and type do not show: what `null` means, a unit, what the server checks again. It never restates the name or the type.', gate: '`commentsAreInvariants` (one line, above an export) · `review` (a contract, not a restatement)', exceptions: 'tests · generated files · the files on its list, which only shrink', why: 'It shows on hover wherever the export is used; a restated name is noise the hover repeats.' },
    { rule: 'A `//` comment is one line about the code under it, saying what breaks if it is undone.', gate: '`commentsAreInvariants`', exceptions: 'tests · generated files · the files on its list, which only shrink', why: 'It is the one question nothing else in the repository answers.' },
    { rule: 'A file carries at most 10 comment lines outside its header.', gate: '`commentsAreInvariants`', exceptions: 'tests · generated files · the files on its list, which only shrink', why: 'Past ten, a file is being explained rather than written.' },
    { rule: 'No date, ticket, review, stage or chronicle in a comment.', gate: '`commentsAreInvariants` · `theCodeNamesNoTicket`', exceptions: '—', why: 'Narration reads as authoritative and goes stale the first time somebody edits without adding to it.' },
    { rule: 'A file still written in the old style is cleaned when it is edited: delete rather than preserve, shorten what is worth keeping.', gate: '`review`', exceptions: '—', why: 'Each edit shrinks the debt instead of carrying it forward.' },
    { rule: 'An ESLint directive is one line naming its rule, its reason after `--` (`// eslint-disable-next-line id-length -- colour channels`); it is not counted in the ten.', gate: 'ESLint `@eslint-community/eslint-comments/require-description` · `reportUnusedDisableDirectives: "error"`', exceptions: '—', why: 'An exception is read where it is made, and one whose rule no longer fires goes.' },
  ],
  outro: '',
};

export { rules };
