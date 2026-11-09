/**
 * - `shared` · checks: title, opening, rules and reasons both sides share
 */
import type { SharedRules } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: SharedRules<never> = {
  title: 'Checks',
  opening: 'Which tool holds a rule, and what keeps the tools one system.',
  rows: [
    { rule: 'A rule is held by the tool that reads its kind of fact: what one TypeScript file shows by ESLint (a rule or a shape of the way of working\'s plugin, reported as the code is written); what needs many files, running code or a file that is not TypeScript by a test, shared when the rule is; a file\'s name or path by ls-lint, an unused export or file by knip, a guarantee of the language by tsc, a generated file by its generator\'s check mode.', why: 'A rule reported where the code is written is fixed in the same place; each kind of fact has the one tool that reads it.', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`review`', exceptions: '—' } },
    { rule: 'A rule across files is an ESLint rule only when it indexes the program once (`wow/one-home-per-name`); any other is a shared test.', why: 'ESLint reads one file at a time; an index built once a run is the one read across files it holds cheaply.', design: { gate: '`review`', exceptions: '—' }, build: { gate: '`review`', exceptions: '—' } },
    { rule: 'A rule is one row naming its one gate, in `shared/rules/` when it is generic and in the product\'s rules when not; a rule moving between gates names until when.', why: 'Two gates for one rule drift apart, and a rule with none holds nothing.', design: { gate: '`everyRuleHasAGate`', exceptions: '—' }, build: { gate: '`everyRuleHasAGate`', exceptions: 'a build-side gate of a shared row names its test until its port (phase 9)' } },
    { rule: 'A repository names its code once, in its `scope.ts` (a `RepoScope`): its ESLint config, its shared tests and its tools read that one file, and a field holds one list for one job.', why: 'A list written twice drifts, and lint and a test then disagree on what a file is.', design: { gate: '`tsc` · `review`', exceptions: '—' }, build: { gate: '`review`', exceptions: 'until its port (phase 9), its lists live in its own config and tests' } },
    { rule: 'A tool takes its exceptions one way, the same in every repository: ESLint a directive with its reason (`comments.md`) or `eslint-suppressions.json`, a test the way of working\'s one baseline (`tests.md`); never a list a check invents for itself.', why: 'What is let through is found in one place, in every repository.', design: { gate: 'ESLint `require-description` · `review`', exceptions: '—' }, build: { gate: '`review`', exceptions: 'its `mutableByDesign.json` until its port, where it becomes the scope\'s `mutable`' } },
    { rule: 'A lint rule or shape of the way of working is proven by its RuleTester cases, those that must fire and those that must pass, one for each case of the test it replaced.', why: 'A gate never seen red is no gate.', design: { gate: '`review`', exceptions: 'the way of working\'s own `test:rules` runs them, in its repository' }, build: { gate: '`review`', exceptions: 'the way of working\'s own `test:rules` runs them, in its repository' } },
    { rule: 'A finding says in one sentence what a person writes instead, names its rule file (`(docs/rules/names.md)`), and points at what it fired on.', why: 'The fix is made where the finding is read.', design: { gate: '`review`', exceptions: 'the way of working\'s own `test:rules` reads each message' }, build: { gate: '`review`', exceptions: '—' } },
    { rule: 'Code meets SonarJS\'s recommended rules too, less those `shared/lint/sonarRules.ts` turns off, each with its reason: `OFF` everywhere, `OFF_IN_TESTS` in tests.', why: 'It reads what a reviewer misses: a regular expression that backtracks, a value written and never read, a collection that is always empty.', design: { gate: 'ESLint `sonarjs/*`', exceptions: '—' }, build: { gate: '`review`', exceptions: 'until its port, where the package joins its `package.json` on the PM\'s word' } },
    { rule: 'The way of working names no product: a blank repository spawned from its template, with an empty `scope.ts` and an empty rules file, passes every shared check from its first day.', why: 'What a product needs is its own; the way of working is the same for every product.', design: { gate: '`theWayOfWorkingNamesNoProduct` · `review`', exceptions: 'the spawn check comes with the template (phase 7)' }, build: { gate: '`review`', exceptions: 'the spawn check comes with the template (phase 7)' } },
  ],
  whys: {},
};

export { shared };
