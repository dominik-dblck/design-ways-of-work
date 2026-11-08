/**
 * - `wowPlugin` · the way of working's own ESLint rules, where no plugin has one
 */
import { commentsAreInvariants } from './rules/commentsAreInvariants.ts';
import { dataIsReadonly } from './rules/dataIsReadonly.ts';
import { fileStatesItsJob } from './rules/fileStatesItsJob.ts';
import { noTicketNames } from './rules/noTicketNames.ts';
import { oneHomePerName } from './rules/oneHomePerName.ts';
import { readsNothingAtLoad } from './rules/readsNothingAtLoad.ts';
import type { CompatiblePlugin } from 'typescript-eslint';

const plugin = {
  meta: { name: 'wow' },
  rules: {
    'comments-are-invariants': commentsAreInvariants,
    'data-is-readonly': dataIsReadonly,
    'file-states-its-job': fileStatesItsJob,
    'no-ticket-names': noTicketNames,
    'one-home-per-name': oneHomePerName,
    'reads-nothing-at-load': readsNothingAtLoad,
  },
};

// typescript-eslint types its rules apart from ESLint's; ESLint reads the plugin as its own kind
const wowPlugin: CompatiblePlugin = plugin;

export { wowPlugin };
