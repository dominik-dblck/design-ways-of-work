/**
 * - `codeScan`, `ownModules`, `twiceCheck`, `fileHeads` · copies
 * - `componentChecks`, `projectCheck`, `pageScripts`, `architecture` · the views
 * - `sourceLayers`, `requirementReads`, `ratchet`, `sourceScope` · layers, counts
 */
export { architecture } from './source-check/architecture.ts';
export { scan, scanAll } from './source-check/codeScan.ts';
export {
  MODULE_ENTRIES as moduleEntries,
  MODULE_IMPORTS as moduleImports,
  ownModulesText,
} from './source-check/ownModules.ts';
export { componentsCheck, propsCheck } from './source-check/componentChecks.ts';
export { projectCheck } from './source-check/projectCheck.ts';
export { aboutCheck } from './source-check/fileHeads.ts';
export {
  contentCheck,
  moduleNeeds,
  pageScriptsCheck,
} from './source-check/pageScripts.ts';
export {
  BASELINE as baseline,
  copies,
  findingCounts,
  frozen,
  ratchet,
  summary,
} from './source-check/ratchet.ts';
export { readList, targets } from './source-check/requirementReads.ts';
export {
  branchesCheck,
  LAYERS as layers,
  layersCheck,
  readsOf,
} from './source-check/sourceLayers.ts';
export { MAP as map, SCOPE as scope } from './source-check/sourceScope.ts';
export { twiceCheck } from './source-check/twiceCheck.ts';
