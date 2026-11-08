/**
 * - `rules` · types: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/types.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'design',
  shared,
  intro: '',
  rows: [
    { rule: 'A type takes the highest rung its set of values allows: a literal union (`\'page\' \\| \'spec\'`, `keyof typeof THE_TABLE`), then a narrowing tied to a sibling (`Record<GroupId, …>`), then a primitive, left for a value that is open (a sentence, an id the sheet mints).', gate: '`review`', exceptions: '—', why: { shared: 'highestRung' } },
    { rule: 'No cast (`as`, `<T>`).', gate: 'ESLint `consistent-type-assertions` (`assertionStyle: "never"`)', exceptions: '`as const` · tests', why: { shared: 'noCast' } },
    { rule: 'No `@ts-ignore`; `@ts-expect-error` stands only in a `*.test-d.ts`, where it is the proof.', gate: 'ESLint `ban-ts-comment`', exceptions: '—', why: 'An error silenced in production code is an error nobody reads.' },
    { rule: 'A rule or a checklist line is `{ id, says, why }` in an array, its id a kebab-case key that says what it does, cited as rule:{key}; a decision or a finding is cited by its number (`D25`, `O17`); a table the code reads by key is a `Record` (D26, D29).', gate: '`checks` (each key once, each run of numbers without a gap) · `aCitedRowExists`', exceptions: 'a decision’s own words, dated, which may cite a rule by its old number', why: 'A citation by place points at the wrong row the day one is inserted above it, and a key says what it points at.' },
    { rule: 'A file reads another module by import, typed by that module, never off `globalThis`: no file declares a global.', gate: '`review`', exceptions: '—', why: 'An import is the module itself, never undefined, and its type cannot drift from it.' },
  ],
  outro: '',
});

export { rules };
