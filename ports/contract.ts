/**
 * - `CONTRACT` · each file of a product the homes read, and what that read is
 * - a path is the contract: a product moves a registry only with a release of this
 * - computed by `scripts/productReads.ts`; a test holds the rows to the reads
 */
import type { ContractRow } from '../scripts/contractTypes.ts';

const CONTRACT: readonly ContractRow[] = [
  {
    file: 'app/styles/componentsSpec.ts',
    kind: 'registry',
    what: 'the components’ spec',
  },
  {
    file: 'app/styles/productTokens.ts',
    kind: 'optional',
    what: 'the product’s own tokens',
  },
  { file: 'app/styles/tokens.ts', kind: 'registry', what: 'the tokens' },
  {
    file: 'docs/process/decisions.ts',
    kind: 'registry',
    what: 'the decisions',
  },
  {
    file: 'docs/process/documentSlots.ts',
    kind: 'registry',
    what: 'its own texts the home’s documents ask for by key: a lesson’s reason, a date, an example',
  },
  {
    file: 'docs/process/projectPlan.ts',
    kind: 'registry',
    what: 'the spec’s files, the first read, the fact combinations, the drift guards and the decided points',
  },
  {
    file: 'guards/__snapshots__/wireframesSnapshot.ts',
    kind: 'optional',
    what: 'the wireframes as last checked, held with the wireframes',
  },
  {
    file: 'product.ts',
    kind: 'product',
    what: 'what the product plugs in: code alone, read by what it runs',
  },
  {
    file: 'productView.ts',
    kind: 'product',
    what: 'what the product plugs into its pages: pure code, read in a browser too',
  },
  {
    file: 'roadmaps/backlog/backlogRows.ts',
    kind: 'registry',
    what: 'the epics, their groups and the open questions, gathered',
  },
  { file: 'roadmaps/edges.ts', kind: 'registry', what: 'a ticket’s edges' },
  { file: 'roadmaps/findings.ts', kind: 'registry', what: 'the findings' },
  { file: 'roadmaps/ideas.ts', kind: 'registry', what: 'the ideas' },
  {
    file: 'roadmaps/ids.ts',
    kind: 'registry',
    what: 'every id the backlog and the tickets hold, written by the build',
  },
  {
    file: 'roadmaps/notes/frozenNotebooks.ts',
    kind: 'registry',
    what: 'each closed notebook’s pin, and where a notebook stands',
  },
  {
    file: 'roadmaps/notes/notesRows.ts',
    kind: 'registry',
    what: 'each open epic’s notebook, gathered',
  },
  { file: 'roadmaps/receipts.ts', kind: 'registry', what: 'the receipts' },
  {
    file: 'roadmaps/tickets/checklistRead.ts',
    kind: 'registry',
    what: 'per ticket, the checklist lines read by hand',
  },
  {
    file: 'roadmaps/tickets/commandStates.ts',
    kind: 'registry',
    what: 'each command’s ticket, folded, landed or pending',
  },
  {
    file: 'roadmaps/tickets/pointerRows.ts',
    kind: 'registry',
    what: 'the files a pointer may name, and their readers',
  },
  {
    file: 'roadmaps/tickets/ticketRows.ts',
    kind: 'registry',
    what: 'the tickets, gathered by epic',
  },
  {
    file: 'roadmaps/tickets/ticketStatus.ts',
    kind: 'registry',
    what: 'each ticket’s status, the one field written by hand',
  },
  {
    file: 'roadmaps/tracks/ticketTracks.ts',
    kind: 'optional',
    what: 'the tracks',
  },
  { file: 'scope.ts', kind: 'scope', what: 'what the repository names once' },
  {
    file: 'sheet/cases/journeys/journeyRows.ts',
    kind: 'registry',
    what: 'the journeys, their walked prints and the states they walk, gathered',
  },
  {
    file: 'sheet/cases/sharedCases/sharedCaseRows.ts',
    kind: 'registry',
    what: 'what every endpoint of a kind answers, and the count of its roles',
  },
  {
    file: 'sheet/cases/testCases/caseReachRows.ts',
    kind: 'registry',
    what: 'the refusals a client mints and those a screen shows',
  },
  {
    file: 'sheet/contract/blockModel.ts',
    kind: 'registry',
    what: 'the contract’s model: its types, each a name and its source',
  },
  {
    file: 'sheet/contract/commands/commandRows.ts',
    kind: 'registry',
    what: 'the commands, the turns nobody asks, the agent’s, the contract every command carries, gathered',
  },
  {
    file: 'sheet/contract/events/eventRows.ts',
    kind: 'registry',
    what: 'the events by group, who acts, who is told, and each event’s producers, gathered',
  },
  {
    file: 'sheet/contract/ports.ts',
    kind: 'optional',
    what: 'the contract’s ports',
  },
  {
    file: 'sheet/contract/queries/queryRows.ts',
    kind: 'registry',
    what: 'the queries, the stores they read and the contract every query carries, gathered',
  },
  {
    file: 'sheet/contract/refusals/refusalRows.ts',
    kind: 'registry',
    what: 'the refusals, the order they are read in, the actors’ keys and the contract, gathered',
  },
  {
    file: 'sheet/logic/capabilities.ts',
    kind: 'registry',
    what: 'the capabilities',
  },
  {
    file: 'sheet/model/directory/people.ts',
    kind: 'registry',
    what: 'the people and the roles, as the roster writes them',
  },
  {
    file: 'sheet/model/languages.ts',
    kind: 'registry',
    what: 'the languages the product offers, and their names',
  },
  {
    file: 'sheet/project.ts',
    kind: 'registry',
    what: 'its names, what its build side reads and its records’ eras: data alone, no import',
  },
  {
    file: 'sheet/requirements.ts',
    kind: 'registry',
    what: 'the requirements, each with the code it retires',
  },
  { file: 'sheet/rules.ts', kind: 'registry', what: 'the rules’ rows' },
  {
    file: 'sheet/screens/wireframes.ts',
    kind: 'optional',
    what: 'the screens and their wireframes',
  },
  {
    file: 'sheet/screens/wireframes/writtenScreens.ts',
    kind: 'optional',
    what: 'the screens written by hand, and their families',
  },
  {
    file: 'sheet/words/glossary/glossaryRows.ts',
    kind: 'registry',
    what: 'the glossary’s terms, open and deferred, gathered',
  },
  { file: 'sheet/words/messages.ts', kind: 'registry', what: 'the messages' },
  {
    file: 'sheet/words/messages/messageRows.ts',
    kind: 'registry',
    what: 'the messages’ rows, refusals’ lines, walked and usage tables, word forms and the readers’ shapes, gathered',
  },
  {
    file: 'sheet/words/messages/wordRows.ts',
    kind: 'registry',
    what: 'the screen’s words: statuses, legends, fills, hints, labels and hovers',
  },
];

export { CONTRACT };
