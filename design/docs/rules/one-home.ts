/**
 * - `rules` · one home: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/one-home.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: 'A fact is written in one place, and\neverything else reads it from there (rule:one-source-of-truth).',
  rows: [
    { rule: 'Every folder has its place: a home of `tools/layout.ts`, a folder on the way to one, the folder of a module straight in a home that bundles, or one of the repository\'s own (`OWN_FOLDERS`, `tools/layout/folderRules.ts`); any other folder fails.', gate: '`lint:files`', exceptions: '`legacy/` and `poc/` until they retire; `node_modules/`, `dist/`, `.artifact/`, `.git/`', why: 'A file is found where the tree says it is, and a new folder is a decision written in the layout, never one that appears.' },
    { rule: 'An entry re-exports its own parts only, never another entry\'s or another entry\'s part.', gate: 'ESLint `wow/parts-serve-their-entry`', exceptions: '—', why: 'A second door to one name is a second home for it.' },
    { rule: 'A sentence a person sees is written once, in `sheet/words/messages.ts` or a type\'s `messages-{type}.js`; a fact the sheet holds is read from its home, never typed again.', gate: '`checks:gate`', exceptions: 'the words of a test\'s expected value, named in `source-check`', why: { shared: 'sentenceOnce' } },
    { rule: 'A rule\'s text lives in `docs/process/plans.ts · RULES` alone: a skill or `CLAUDE.md` names it, never copies it.', gate: '`aRuleIsNamedNeverCopied`', exceptions: '—', why: 'Two copies of a rule drift, and the session follows whichever it read last.' },
  ],
  outro: '',
});

export { rules };
