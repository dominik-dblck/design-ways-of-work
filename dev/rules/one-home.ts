/**
 * - `rules` · one home: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/one-home.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'One home',
  intro: '\nA fact is written in one place, and everything else reads it from there.\n',
  rows: [
    ...rowsFor('build', shared),
    { rule: 'A sentence is written once, in code and in the `.md` under `.claude/` and `docs/rules/`; a sentence the domain holds is read from the domain.', gate: '`aSentenceIsWrittenOnce` · `theWordsFollowTheGlossary`', exceptions: 'fixtures copied byte-exact from the design side', why: 'Two copies of a sentence are two places for it to differ.' },
    { rule: 'A label is written once: a string of twelve characters or more, opening with a capital and holding a space, in one production file; a member of a declared set (`z.enum`, a literal type, a key) is the set\'s.', gate: '`aLabelIsWrittenOnce`', exceptions: 'generated files, whose sheet copy holds them', why: 'A label under a sentence\'s six words differs between two copies as a sentence does; a set\'s member is checked by the compiler wherever it stands.' },
    { rule: 'A shape is written once: an expression of twelve nodes or more, its local names and literals made alike and its property names kept, found in three files or more, becomes one function the files read.', gate: '`aShapeIsWrittenOnce`', exceptions: 'a shape holding JSX (the look\'s scans hold it) · literals alone (data) · a call or an object that only hands names on · `coincidentShapes.json`, each with its why', why: 'Under a block\'s fifty tokens a rule still parts from its copies; a comparator stood in seven files, none of them fifty tokens long.' },
    { rule: 'A URL is written once, in `frontendApiConstants.ts`; a path the domain holds (`ASSETS_PATH`) is read from the domain.', gate: '`aUrlIsWrittenOnce`', exceptions: '—', why: 'A URL written inline in a caller is the same fact in two places.' },
    { rule: 'A count a document states is checked against what it counts.', gate: '`statedCounts`', exceptions: '—', why: 'A stated count goes stale the day one more thing is added.' },
  ],
  outro: '',
};

export { rules };
