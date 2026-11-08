/**
 * - `rules` · constants: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Constants',
  intro:
    '\nValues the code reads and never\ncomputes: the words a person reads, the keys a page switches on.\n',
  rows: [
    {
      rule: "A word a page shows is the sheet's (a `words` table, `sheet/words/messages.ts`, the glossary's screen words), never a literal in the markup.",
      gate: '`review`',
      exceptions: '—',
      why: 'A word is changed in one place and reads the same on every page.',
    },
    {
      rule: 'A table of words is a part of its own (`pageWords.ts`) whose values are UPPER_SNAKE, read through its entry.',
      gate: '`aConstantIsUpperCase`',
      exceptions: '—',
      why: 'The case says a value is read, not called.',
    },
    {
      rule: 'A count picks its form in one function: a noun with its count, or two whole sentences where the verb moves with the count.',
      gate: '`review`',
      exceptions: '—',
      why: 'No page reads "1 blocks".',
    },
  ],
  outro: '',
};

export { rules };
