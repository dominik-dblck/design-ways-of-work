/**
 * - `rules` · names: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from './ruleTypes.ts';

const rules: RuleFile = {
  title: 'Names',
  intro:
    "\nA name says what a thing holds or does. A\nfile's name says what it is for.\n",
  rows: [
    {
      rule: 'No ticket id, criterion, contract row, recon finding or decision date in an identifier or a comment.',
      gate: '`theCodeNamesNoTicket` · `commentsAreInvariants`',
      exceptions:
        "the sheet's data, whose strings are the specification · a part named for the epic it holds, its values and the names its entry imports of them (`receipts/E04Run.ts`, `E04_RUN_RECEIPTS`, D13)",
      why: "A ticket's number means nothing once it closes; the sheet holds the trail.",
    },
    {
      rule: 'A name says what it holds or does (`DOCUMENT_STATES`, `sheetView`, `moveOf`), never a placeholder (`x`, `data`, `ROWS`, `PART_ONE`); length is not the measure, what the name tells is.',
      gate: '`review` · ESLint `id-length` (at least 2 characters)',
      exceptions: '`_` for a parameter nobody reads',
      why: 'A name is documentation that cannot go stale; a placeholder sends the reader into the body.',
    },
    {
      rule: 'An entry is named for the module the others import (`sheet-status.ts`, namespace `SHEET_STATUS`); a part is camelCase, named for what it holds or does (`modelTerms.ts`, `scaleRules.ts`), or for the epic it holds (`E18.ts`).',
      gate: '`aFileNamesItsPurpose`',
      exceptions: '—',
      why: "The entry's name is its import path and its bundle's; the part's name says its job before it is opened.",
    },
    {
      rule: 'Types are `{area}Types.ts`, and a types file holds types alone; no `utils.ts`, `helpers.ts`, `common.ts`, `shared.ts` or `index.ts`.',
      gate: '`aFileNamesItsPurpose`',
      exceptions: '—',
      why: 'The suffix says the kind; a drawer name says none.',
    },
    {
      rule: "A value a part exports is UPPER_SNAKE (`TICKET_CHECKLIST`), a function camelCase (`judgePair`); an entry's API names are camelCase (`Plans.ticketChecklist`).",
      gate: '`aConstantIsUpperCase`',
      exceptions: 'none',
      why: 'At the call site the case says whether a name is read or called.',
    },
    {
      rule: 'An import names what it takes; an empty clause is removed.',
      gate: '`anImportTakesSomething`',
      exceptions: 'none',
      why: 'An empty clause loads a module for nothing and reads like a dependency that is not there.',
    },
    {
      rule: 'An import inside the homes is a relative path with its `.ts` extension (`./glossary/modelTerms.ts`).',
      gate: '`tsc` (`allowImportingTsExtensions`) · `anImportNamesItsExtension`',
      exceptions: '—',
      why: 'The build side imports the files as modules with no loader (D14).',
    },
    {
      rule: "A skill's `description` says what it does and when to use it (`Use when`), in at most 1024 characters; its `name` is its folder's (`design-{file}`).",
      gate: '`aSkillSaysWhatAndWhen`',
      exceptions: '—',
      why: 'Claude Code picks a skill by its description alone.',
    },
    {
      rule: 'A doc of the process (`CLAUDE.md`, a skill, a rule file) names a file by its repository path (`docs/process/plans.ts · RULES`), never by the name of the `.js` bundle the build writes from it; a published path says so (`project/tickets.js`).',
      gate: '`theDocsNameRealPaths`',
      exceptions:
        "the build side's documents, which name its repository's paths (O13)",
      why: 'The agent opens the file it reads about; a bundle is not in the repository.',
    },
  ],
  outro: '',
};

export { rules };
