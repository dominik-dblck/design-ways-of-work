/**
 * - `shared` · one home: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'An exported name — a value, a type, a component — is declared in one file.', why: 'Two declarations of one name are two things a reader takes for one, or one thing written twice.', design: { gate: 'ESLint `wow/one-home-per-name`', exceptions: 'an entry\'s API names · a family\'s one name, which its loader reads from every file (`rules`, `skill`, `shared`)' }, build: { gate: '`aNameHasOneHome`', exceptions: 'an HTTP verb in a `route.ts` · `default`' } },
  { rule: 'A block of code is written once: fifty tokens alike, in two files or twice in one, become one function, type or constant that both read.', why: 'Two copies of a rule change apart and the fix reaches one; fifty tokens is jscpd\'s default, and a look-alike under it is judged by whether it is one rule.', design: { gate: '`aBlockIsWrittenOnce`', exceptions: 'imports · tests · generated files · a pair open on the sheet, named with its finding' }, build: { gate: '`aBlockIsWrittenOnce`', exceptions: 'imports · tests, fixtures and generated files' } },
  { rule: 'No runtime import cycle.', why: 'A cycle lets load order decide behaviour, and a module mock does not survive it.', design: { gate: 'ESLint `import-x/no-cycle`', exceptions: 'type-only imports' }, build: { gate: '`noImportCycles`', exceptions: 'type-only imports' } },
  { rule: 'A generated file is emitted from its source and never edited by hand.', why: 'A hand edit is lost on the next emit, or kept while its source says otherwise.', design: { gate: '`aGeneratedFileIsItsModule` (the emitted modules, the rule files, the skills, `tokens.ts`) · `review` (`dist/`, a pack)', exceptions: '—' }, build: { gate: '`theEmittedFilesAreFresh` · `tokensAreGenerated` · `theBodiesAreEmitted` · `theQueryIdsAreEmitted` · `skillsAreGenerated`', exceptions: '—' } },
  { rule: 'A path a skill or a doc names in backticks exists; what the code lacks is removed from the doc, not kept as advice.', why: 'A doc that names a missing path sends its reader looking for nothing.', design: { gate: '`theDocsNameRealPaths`', exceptions: 'a placeholder (`{name}`, `*`)' }, build: { gate: '`theDocsNameRealPaths`', exceptions: 'a placeholder (`{name}`, `*`) · a doc a script renders · the entries on its list, which only shrink' } },
];

export { shared };
