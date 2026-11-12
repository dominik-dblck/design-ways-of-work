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
    file: 'roadmaps/backlog.ts',
    kind: 'registry',
    what: 'the backlog and its epics',
  },
  { file: 'roadmaps/edges.ts', kind: 'registry', what: 'a ticket’s edges' },
  {
    file: 'roadmaps/features.ts',
    kind: 'registry',
    what: 'the features’ steps',
  },
  { file: 'roadmaps/findings.ts', kind: 'registry', what: 'the findings' },
  { file: 'roadmaps/ideas.ts', kind: 'registry', what: 'the ideas' },
  { file: 'roadmaps/notes.ts', kind: 'registry', what: 'an epic’s notes' },
  {
    file: 'roadmaps/notes/frozenNotebooks.ts',
    kind: 'registry',
    what: 'each closed notebook’s pin, and where a notebook stands',
  },
  { file: 'roadmaps/receipts.ts', kind: 'registry', what: 'the receipts' },
  { file: 'roadmaps/templates.ts', kind: 'registry', what: 'an epic’s files' },
  {
    file: 'roadmaps/tickets.ts',
    kind: 'registry',
    what: 'the tickets and their status',
  },
  {
    file: 'roadmaps/tickets/ticketStatus.ts',
    kind: 'registry',
    what: 'each ticket’s status, the one field written by hand',
  },
  { file: 'roadmaps/tracks.ts', kind: 'optional', what: 'the tracks' },
  { file: 'scope.ts', kind: 'scope', what: 'what the repository names once' },
  { file: 'sheet/cases/journeys.ts', kind: 'registry', what: 'the journeys' },
  {
    file: 'sheet/cases/testCases.ts',
    kind: 'registry',
    what: 'the test cases',
  },
  {
    file: 'sheet/contract/blockModel.ts',
    kind: 'registry',
    what: 'the contract’s model: its types, each a name and its source',
  },
  {
    file: 'sheet/contract/commands.ts',
    kind: 'registry',
    what: 'the commands',
  },
  {
    file: 'sheet/contract/ports.ts',
    kind: 'optional',
    what: 'the contract’s ports',
  },
  { file: 'sheet/contract/queries.ts', kind: 'registry', what: 'the queries' },
  {
    file: 'sheet/contract/refusals.ts',
    kind: 'registry',
    what: 'the refusals',
  },
  {
    file: 'sheet/logic/capabilities.ts',
    kind: 'registry',
    what: 'the capabilities',
  },
  {
    file: 'sheet/model/directory.ts',
    kind: 'registry',
    what: 'the people and the roles',
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
  { file: 'sheet/words/glossary.ts', kind: 'registry', what: 'the glossary' },
  { file: 'sheet/words/messages.ts', kind: 'registry', what: 'the messages' },
];

export { CONTRACT };
