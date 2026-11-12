/**
 * - `HOME_FACTS` · eagle-design's take of the facts two homes held: its files
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const SLOTS = 'docs/process/documentSlots.ts';
const PEOPLE = 'sheet/model/directory/people.ts';

// the source check's map and the publish skill's address leave the homes for the product's files; the roles' key, read by no home now, leaves the people's exports
const HOME_FACTS: Migration = {
  release: '0.10.0',
  removes: [],
  moves: [],
  edits: [
    {
      file: SLOTS,
      from: "import { MODES_CITES } from './documentSlots/modesCites.ts';",
      to: "import { MODES_CITES } from './documentSlots/modesCites.ts';\nimport { PUBLISH_CITES } from './documentSlots/publishCites.ts';",
    },
    {
      file: SLOTS,
      from: '  ...MODES_CITES,\n',
      to: '  ...MODES_CITES,\n  ...PUBLISH_CITES,\n',
    },
    {
      file: PEOPLE,
      from: " * - `PersonId`, `RoleKey`, `RULES_INITIALS` · the cast's ids, the roles, the aliases",
      to: " * - `PersonId`, `RULES_INITIALS` · the cast's ids, the rules' aliases",
    },
    {
      file: PEOPLE,
      from: 'export type { ApprovalGate, PersonId, RoleKey };',
      to: 'export type { ApprovalGate, PersonId };',
    },
  ],
  tree: 'ports/eagle-design/trees/home-facts',
};

export { HOME_FACTS };
