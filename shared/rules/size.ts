/**
 * - `shared` · size: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: SharedRules<never> = {
  title: 'Size',
  opening: 'Limits count code: blank lines and comments do not count.',
  rows: [
    { rule: 'A file holds at most 200 lines of code.', why: 'A file past 200 lines holds a second job; the split is where that job gets its name.', design: { gate: 'ESLint `max-lines`', exceptions: 'tests · generated files' }, build: { gate: 'ESLint `max-lines`', exceptions: 'tests · fixtures · generated files · `eslint-suppressions.json`, which only shrinks' } },
    { rule: 'A function holds at most 40 lines of code, a React component included.', why: 'Past 40 lines a function is read by scrolling; its steps want names of their own.', design: { gate: 'ESLint `max-lines-per-function`', exceptions: 'tests' }, build: { gate: 'ESLint `max-lines-per-function`', exceptions: 'tests · `eslint-suppressions.json`' } },
    { rule: 'A function\'s cognitive complexity (SonarJS\'s measure: a branch weighs more the deeper it nests) is at most 15.', why: 'Past fifteen a function is run in the head to be read; early returns or a lookup table read at a glance.', design: { gate: 'ESLint `sonarjs/cognitive-complexity`', exceptions: 'tests' }, build: { gate: 'ESLint `complexity`', exceptions: 'tests · `eslint-suppressions.json` · until its port, where SonarJS\'s measure at 15 replaces it, its tree measured first' } },
    { rule: 'A block nests at most 3 deep.', why: 'A fourth level is a function that has not been extracted yet.', design: { gate: 'ESLint `max-depth`', exceptions: 'tests' }, build: { gate: 'ESLint `max-depth`', exceptions: 'tests · `eslint-suppressions.json`' } },
    { rule: 'A file read whole when it loads (a skill, an entry it hands off to, a command) holds at most 2000 words, and one read on every turn (`CLAUDE.md`) at most 1000: the scope\'s `instructions` name them.', why: 'A file read whole costs its words in context each time it loads; the work gets what is left.', design: { gate: '`everySkillIsShort`', exceptions: '—' }, build: { gate: '`everySkillIsShort`', exceptions: 'the files on its list, whose counts only fall' } },
    { rule: 'A file read on demand that runs past 100 lines opens with `## Contents`.', why: 'A long file is often read in part; its contents show the whole scope to a partial read.', design: { gate: '`everySkillIsShort`', exceptions: '—' }, build: { gate: '`everySkillIsShort`', exceptions: 'the files on its list, which leave it once they have one' } },
    { rule: 'A rule file in `docs/rules/` holds at most 200 lines.', why: 'A rule file is loaded by every review of its layer; past 200 lines it holds two concerns.', design: { gate: '`everyRuleHasAGate`', exceptions: '—' }, build: { gate: '`everyRuleHasAGate`', exceptions: '—' } },
  ],
  whys: {},
};

export { shared };
