/**
 * - `rules` · size: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Size',
  intro: '\nLimits count code: blank lines and comments\ndo not count.\n',
  rows: [
    {
      rule: 'A file holds at most 200 lines of code, data included.',
      gate: 'ESLint `max-lines`',
      exceptions: 'tests · generated files',
      why: 'A file past 200 lines holds a second job; the split is where that job gets its name (D13).',
    },
    {
      rule: 'A function holds at most 40 lines of code.',
      gate: 'ESLint `max-lines-per-function`',
      exceptions: 'tests',
      why: 'Past 40 lines a function is read by scrolling; its steps want names of their own.',
    },
    {
      rule: "A function's complexity is at most 10.",
      gate: 'ESLint `complexity`',
      exceptions: 'tests',
      why: 'Past ten paths a function is run in the head to be read; early returns or a lookup table read at a glance.',
    },
    {
      rule: 'A block nests at most 3 deep.',
      gate: 'ESLint `max-depth`',
      exceptions: 'tests',
      why: 'A fourth level is a function that has not been extracted yet.',
    },
    {
      rule: 'A rule file in `docs/rules/` holds at most 200 lines.',
      gate: '`everyRuleHasAGate`',
      exceptions: '—',
      why: 'A rule file is loaded by every review of its layer; past 200 lines it holds two concerns.',
    },
    {
      rule: 'A skill holds at most 2000 words; `CLAUDE.md` at most 1000.',
      gate: '`everySkillIsShort`',
      exceptions: '—',
      why: 'A skill is read whole when it loads and `CLAUDE.md` on every turn: their words are the context they cost.',
    },
  ],
  outro: '',
};

export { rules };
