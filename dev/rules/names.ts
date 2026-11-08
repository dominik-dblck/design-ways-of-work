/**
 * - `rules` · names: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/names.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Names',
  intro: '\nA name says what a thing holds or does. A file\'s name says what it is for.\n',
  rows: [
    ...rowsFor('build', shared),
    { rule: 'A component\'s internal file carries the component\'s name: PascalCase for a component or a provider (`ItemListRow.tsx`, `ItemListProvider.tsx`), `use` + PascalCase for a hook (`useItemListFilters.ts`), camelCase for the rest (`itemListTypes.ts`, `itemListWords.ts`, `getItemListDataService.ts`, `useItemListQuery.ts`).', gate: '`aComponentFolderIsStructured`', exceptions: 'a global file under `app/`, named by its domain instead', why: 'At an import, the prefix says which component a file belongs to; two organisms can each have a `Header`.' },
    { rule: 'A service is `{verb}{Noun}Service.ts` and exports one function of that name.', gate: '`aServiceIsOneFunction`', exceptions: '`handleRouteService.ts`, the edge kernel, and its parts in `app/services/handleRoute/`, named by their job', why: 'The file\'s name is the function\'s name, so one search finds both.' },
    { rule: 'Types are `{area}Types.ts`, or `{area}Answers.ts` for what an endpoint answers; constants `{feature}Constants.ts`, copy `{name}Words.ts`; a provider `{Domain}Provider.tsx`; a route handler `{action}Route.ts`.', gate: '`aFileNamesItsPurpose`', exceptions: '—', why: 'The suffix says what kind of file it is before it is opened.' },
    { rule: 'A helper file is `{name}{Purpose}Utils.ts`, or `{name}{Purpose}Adapters.ts` for one that maps domain values to a component\'s props (`editorScreenImageUtils.ts`, `typeLibraryDocumentAdapters.ts`), wherever it lies. A purpose stands between the prefix and the suffix: never `typeLibraryUtils.ts`, `utils.ts`, `helpers.ts`, `common.ts`, `shared.ts`, or an `index.ts` that is not a barrel.', gate: '`aFileNamesItsPurpose`', exceptions: 'the 21 files on its list, which only shrink', why: 'The suffix says the kind, as `Types` and `Constants` do, even where no folder says it; the purpose says the job, so `typeLibraryUtils.ts` cannot become a drawer.' },
    { rule: 'A value a `Constants` or `Words` file exports is UPPER_SNAKE (`MOVE_LIST_SX`, `CONTROL_LABELS`); a function it exports is camelCase (`documentPathOf`), a component PascalCase.', gate: '`aConstantIsUpperCase`', exceptions: 'none', why: 'At the call site the case says whether a name is read or called; six of 379 values were camel and read like helpers.' },
    { rule: 'An import that leaves its unit reads the alias (`@/app/components/atoms/Text`, `@/tests/helpers/asCookie`); a relative path stays inside the unit (`./PlantedCell`, `../types/…`). A unit is a component\'s folder, `app/components/icons`, another top folder of `app/`, or the root files together. Inside `packages/domain` every import is relative: a package has no alias of its own.', gate: '`anImportLeavesByTheAlias`', exceptions: 'none', why: 'A component moved between layers keeps its own imports, one module has one spelling to grep and to scan, and the path says the layer; 393 relative imports into the layers stood beside 68 by the alias.' },
  ],
  outro: '',
};

export { rules };
