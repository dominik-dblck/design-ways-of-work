/**
 * - `wowPlugin` · the way of working's own ESLint rules, where no plugin has one
 * - and `no-restricted-syntax` again: `production-syntax`, `markup-syntax`
 */
import { commentsAreInvariants } from './rules/commentsAreInvariants.ts';
import { dataIsReadonly } from './rules/dataIsReadonly.ts';
import { fileNamesItsPurpose } from './rules/fileNamesItsPurpose.ts';
import { fileStatesItsJob } from './rules/fileStatesItsJob.ts';
import { hooksNamedForTheirFile } from './rules/hooksNamedForTheirFile.ts';
import { moleculesComposeOneMolecule } from './rules/moleculesComposeOneMolecule.ts';
import { noMockOfItsSubject } from './rules/noMockOfItsSubject.ts';
import { noTicketNames } from './rules/noTicketNames.ts';
import { oneCallStyle } from './rules/oneCallStyle.ts';
import { oneHomePerName } from './rules/oneHomePerName.ts';
import { partsServeTheirEntry } from './rules/partsServeTheirEntry.ts';
import { readsNothingAtLoad } from './rules/readsNothingAtLoad.ts';
import { reExportsInBarrels } from './rules/reExportsInBarrels.ts';
import type { Rule } from 'eslint';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import type { CompatiblePlugin } from 'typescript-eslint';

function coreRule(name: string): Rule.RuleModule {
  const rule = builtinRules.get(name);
  if (rule === undefined) throw new Error(`ESLint lost ${name}`);
  return rule;
}

// one rule key holds one option list a file: production and markup take keys of their own
const restrictedSyntax = coreRule('no-restricted-syntax');

const plugin = {
  meta: { name: 'wow' },
  rules: {
    'comments-are-invariants': commentsAreInvariants,
    'data-is-readonly': dataIsReadonly,
    'file-names-its-purpose': fileNamesItsPurpose,
    'file-states-its-job': fileStatesItsJob,
    'hooks-named-for-their-file': hooksNamedForTheirFile,
    'molecules-compose-one-molecule': moleculesComposeOneMolecule,
    'no-mock-of-its-subject': noMockOfItsSubject,
    'no-ticket-names': noTicketNames,
    'one-call-style': oneCallStyle,
    'one-home-per-name': oneHomePerName,
    'parts-serve-their-entry': partsServeTheirEntry,
    'markup-syntax': restrictedSyntax,
    'production-syntax': restrictedSyntax,
    'reads-nothing-at-load': readsNothingAtLoad,
    're-exports-in-barrels': reExportsInBarrels,
  },
};

// typescript-eslint types its rules apart from ESLint's; ESLint reads the plugin as its own kind
const wowPlugin: CompatiblePlugin = plugin;

export { wowPlugin };
