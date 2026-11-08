/**
 * - `rules` · names: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/names.ts';
import type { RuleFile } from './ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Names',
  intro: '\nA name says what a thing holds or does. A\nfile\'s name says what it is for.\n',
  rows: [
    ...rowsFor('design', shared),
    { rule: 'An entry is named for the module the others import (`sheet-status.ts`, namespace `SHEET_STATUS`); a part is camelCase, named for what it holds or does (`modelTerms.ts`, `scaleRules.ts`), or for the epic it holds (`E18.ts`).', gate: '`aFileNamesItsPurpose`', exceptions: '—', why: 'The entry\'s name is its import path and its bundle\'s; the part\'s name says its job before it is opened.' },
    { rule: 'Types are `{area}Types.ts`, and a types file holds types alone; no `utils.ts`, `helpers.ts`, `common.ts`, `shared.ts` or `index.ts`.', gate: '`aFileNamesItsPurpose`', exceptions: '—', why: 'The suffix says the kind; a drawer name says none.' },
    { rule: 'A value a part exports is UPPER_SNAKE (`TICKET_CHECKLIST`), a function camelCase (`judgePair`); an entry\'s API names are camelCase (`Plans.ticketChecklist`).', gate: '`aConstantIsUpperCase`', exceptions: 'none', why: 'At the call site the case says whether a name is read or called.' },
    { rule: 'An import inside the homes is a relative path with its `.ts` extension (`./glossary/modelTerms.ts`).', gate: '`tsc` (`allowImportingTsExtensions`) · ESLint `import-x/extensions`', exceptions: '—', why: 'The build side imports the files as modules with no loader (D14).' },
    { rule: 'A doc of the process (`CLAUDE.md`, a skill, a rule file) names a file by its repository path (`docs/process/plans.ts · RULES`), never by the name of the `.js` bundle the build writes from it; a published path says so (`project/tickets.js`).', gate: '`theDocsNameRealPaths`', exceptions: 'the build side\'s documents, which name its repository\'s paths (O13)', why: 'The agent opens the file it reads about; a bundle is not in the repository.' },
  ],
  outro: '',
};

export { rules };
