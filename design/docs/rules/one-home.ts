/**
 * - `rules` · one home: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/one-home.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'One home',
  intro: '\nA fact is written in one place, and\neverything else reads it from there (rule:one-source-of-truth).\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'An entry re-exports its own parts only, never another entry\'s or another entry\'s part.', gate: '`aPartServesItsEntry`', exceptions: '—', why: 'A second door to one name is a second home for it.' },
    { rule: 'A sentence a person sees is written once, in `sheet/words/messages.ts` or a type\'s `messages-{type}.js`; a fact the sheet holds is read from its home, never typed again.', gate: '`checks`', exceptions: 'the words of a test\'s expected value, named in `source-check`', why: 'Two copies of a sentence are two places for it to differ.' },
    { rule: 'A sentence of the process is written once: in `CLAUDE.md`, a skill or a rule file, never in two; a rule\'s text lives in `docs/process/plans.ts · RULES` alone, and a skill names it.', gate: '`aSentenceIsWrittenOnce`', exceptions: '`legacy/`, the documents the skills were cut from', why: 'Two copies of a process line drift, and the session follows whichever it read last.' },
  ],
  outro: '',
};

export { rules };
