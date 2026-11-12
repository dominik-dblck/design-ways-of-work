/**
 * - `CONTRACT_READERS` · eagle-design's take of the sheet's readers, homes now
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

// split from the rows it gathers on its own tree first: the readers, at the paths the product held them
const CONTRACT_READERS: Migration = {
  release: '0.8.0',
  removes: [],
  moves: [],
  homed: [
    'sheet/contract/commands.ts',
    'sheet/contract/commands/commandsTypes.ts',
    'sheet/contract/events.ts',
    'sheet/contract/events/eventsTypes.ts',
    'sheet/contract/queries.ts',
    'sheet/contract/queries/queriesTypes.ts',
    'sheet/contract/refusals.ts',
    'sheet/contract/refusals/refusalCatalog.ts',
    'sheet/contract/refusals/refusalOrder.ts',
    'sheet/contract/refusals/refusalSentences.ts',
    'sheet/contract/refusals/refusalsTypes.ts',
    'sheet/model/directory.ts',
    'sheet/model/directory/directoryTypes.ts',
    'sheet/screens/wireframes/screenRows.ts',
    'sheet/screens/wireframes/screenTypes.ts',
  ],
  tree: null,
};

export { CONTRACT_READERS };
