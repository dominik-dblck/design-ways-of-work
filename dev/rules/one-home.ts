/**
 * - `rules` · one home: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'One home',
  intro: '\nA fact is written in one place, and everything else reads it from there.\n',
  rows: [
    { rule: 'An exported name is declared in one file.', gate: '`aNameHasOneHome`', exceptions: 'an HTTP verb in a `route.ts` · `default`', why: 'Two declarations of one name are two things a reader takes for one, or one thing written twice.' },
    { rule: '`export … from` stands only in a barrel (`index.ts`), and a barrel re-exports its own folder, never another barrel.', gate: '`reExportsLiveInBarrels`', exceptions: 'a `route.ts` re-exporting its handler, the App Router\'s door', why: 'A re-export elsewhere is a second door to one name; a barrel of barrels loads everything behind it.' },
    { rule: 'A sentence is written once, in code and in the `.md` under `.claude/` and `docs/rules/`; a sentence the domain holds is read from the domain.', gate: '`aSentenceIsWrittenOnce` · `theWordsFollowTheGlossary`', exceptions: 'fixtures copied byte-exact from the design side', why: 'Two copies of a sentence are two places for it to differ.' },
    { rule: 'A label is written once: a string of twelve characters or more, opening with a capital and holding a space, in one production file; a member of a declared set (`z.enum`, a literal type, a key) is the set\'s.', gate: '`aLabelIsWrittenOnce`', exceptions: 'generated files, whose sheet copy holds them', why: 'A label under a sentence\'s six words differs between two copies as a sentence does; a set\'s member is checked by the compiler wherever it stands.' },
    { rule: 'A block of code is written once: fifty tokens alike, in two files or twice in one, become one function, type or constant that both read.', gate: '`aBlockIsWrittenOnce`', exceptions: 'imports · tests, fixtures and generated files', why: 'Two copies of a rule change apart and the fix reaches one; fifty tokens is jscpd\'s default, and a look-alike under it is judged by whether it is one rule.' },
    { rule: 'A shape is written once: an expression of twelve nodes or more, its local names and literals made alike and its property names kept, found in three files or more, becomes one function the files read.', gate: '`aShapeIsWrittenOnce`', exceptions: 'a shape holding JSX (the look\'s scans hold it) · literals alone (data) · a call or an object that only hands names on · `coincidentShapes.json`, each with its why', why: 'Under a block\'s fifty tokens a rule still parts from its copies; a comparator stood in seven files, none of them fifty tokens long.' },
    { rule: 'A URL is written once, in `frontendApiConstants.ts`; a path the domain holds (`ASSETS_PATH`) is read from the domain.', gate: '`aUrlIsWrittenOnce`', exceptions: '—', why: 'A URL written inline in a caller is the same fact in two places.' },
    { rule: 'No runtime import cycle.', gate: '`noImportCycles`', exceptions: 'type-only imports', why: 'A cycle lets load order decide behaviour, and a module mock does not survive it.' },
    { rule: 'A generated file is emitted from its source and never edited by hand.', gate: '`theEmittedFilesAreFresh` · `tokensAreGenerated` · `theBodiesAreEmitted` · `theQueryIdsAreEmitted` · `skillsAreGenerated`', exceptions: '—', why: 'A hand edit is lost on the next emit, or kept while its source says otherwise.' },
    { rule: 'A count a document states is checked against what it counts.', gate: '`statedCounts`', exceptions: '—', why: 'A stated count goes stale the day one more thing is added.' },
    { rule: 'A path a skill or a doc names in backticks exists; what the code lacks is removed from the doc, not kept as advice.', gate: '`theDocsNameRealPaths`', exceptions: 'a placeholder (`{name}`, `*`) · a doc a script renders · the entries on its list, which only shrink', why: 'A doc that names a missing path sends its reader looking for nothing.' },
  ],
  outro: '',
};

export { rules };
