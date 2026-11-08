/**
 * - `rules` · size: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Size',
  intro: '\nLimits count code: blank lines and comments do not count.\n',
  rows: [
    { rule: 'A file holds at most 200 lines of code.', gate: 'ESLint `max-lines`', exceptions: 'tests · fixtures · generated files · `eslint-suppressions.json`, which only shrinks', why: 'A file past 200 lines holds a second job; the split is where that job gets its name.' },
    { rule: 'A function holds at most 40 lines of code, a React component included.', gate: 'ESLint `max-lines-per-function`', exceptions: 'tests · `eslint-suppressions.json`', why: 'Past 40 lines a function is read by scrolling; its steps want names of their own.' },
    { rule: 'A function\'s complexity is at most 10.', gate: 'ESLint `complexity`', exceptions: 'tests · `eslint-suppressions.json`', why: 'Past ten paths a function is run in the head to be read; early returns or a lookup table read at a glance.' },
    { rule: 'A block nests at most 3 deep.', gate: 'ESLint `max-depth`', exceptions: 'tests · `eslint-suppressions.json`', why: 'A fourth level is a function that has not been extracted yet.' },
    { rule: 'A skill\'s entry (`SKILL.md`, `_shared.md`, a command) holds at most 2000 words.', gate: '`everySkillIsShort`', exceptions: 'the files on its list, which only shrink · the ticket skills also keep their pipeline\'s 100 lines', why: 'An entry is read whole on every run, and its words are context the work does not get.' },
    { rule: 'A file an entry loads that runs past 100 lines opens with `## Contents`.', gate: '`everySkillIsShort`', exceptions: 'the files on its list, which leave it once they have one', why: 'A long file is often read in part; its contents show the whole scope to a partial read.' },
    { rule: 'An entry links every file it loads directly, one level deep.', gate: '`anEntryLinksWhatItLoads`', exceptions: '—', why: 'A file reached through another file is read in part, and what it holds is missed.' },
    { rule: 'A rule file in `docs/rules/` holds at most 200 lines.', gate: '`everyRuleHasAGate`', exceptions: '—', why: 'A rule file is loaded by every review of its layer; past 200 lines it holds two concerns.' },
  ],
  outro: '',
};

export { rules };
