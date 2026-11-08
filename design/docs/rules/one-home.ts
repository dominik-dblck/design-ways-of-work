/**
 * - `rules` · one home: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'One home',
  intro:
    '\nA fact is written in one place, and\neverything else reads it from there (rule:one-source-of-truth).\n',
  rows: [
    {
      rule: "A name a part exports is declared in one file; an entry's API names are what it exports, read through its namespace (`PLANS.all`, `LANGUAGES.all`).",
      gate: '`aNameHasOneHome`',
      exceptions: "an entry's API names",
      why: 'Two declarations of one name are two things a reader takes for one, or one thing written twice.',
    },
    {
      rule: "An entry re-exports its own parts only, never another entry's or another entry's part.",
      gate: '`aPartServesItsEntry`',
      exceptions: '—',
      why: 'A second door to one name is a second home for it.',
    },
    {
      rule: "A sentence a person sees is written once, in `sheet/words/messages.ts` or a type's `messages-{type}.js`; a fact the sheet holds is read from its home, never typed again.",
      gate: '`checks`',
      exceptions:
        "the words of a test's expected value, named in `source-check`",
      why: 'Two copies of a sentence are two places for it to differ.',
    },
    {
      rule: 'A block of code is written once: fifty tokens alike, in two files or twice in one, become one function, type or constant that both read.',
      gate: '`aBlockIsWrittenOnce`',
      exceptions:
        'imports · tests · generated files · a pair open on the sheet, named with its finding',
      why: 'Two copies of a rule change apart and the fix reaches one.',
    },
    {
      rule: 'No runtime import cycle.',
      gate: '`noImportCycles`',
      exceptions: 'type-only imports',
      why: 'A cycle lets load order decide what a module reads.',
    },
    {
      rule: 'A generated file is emitted from its source and never edited by hand: `dist/` by `yarn build`, a pack by `yarn cut-pack`.',
      gate: '`aGeneratedFileIsItsModule` (the emitted modules, the rule files, the skills, `tokens.ts`) · `review` (`dist/`, a pack)',
      exceptions: '—',
      why: 'A hand edit is lost on the next emit, or kept while its source says otherwise.',
    },
    {
      rule: 'A path a doc names in backticks exists; what the code lacks is removed from the doc, not kept as advice.',
      gate: '`theDocsNameRealPaths`',
      exceptions: 'a placeholder (`{name}`, `*`)',
      why: 'A doc that names a missing path sends its reader looking for nothing.',
    },
    {
      rule: "A sentence of the process is written once: in `CLAUDE.md`, a skill or a rule file, never in two; a rule's text lives in `docs/process/plans.ts · RULES` alone, and a skill names it.",
      gate: '`aSentenceIsWrittenOnce`',
      exceptions: '`legacy/`, the documents the skills were cut from',
      why: 'Two copies of a process line drift, and the session follows whichever it read last.',
    },
  ],
  outro: '',
};

export { rules };
