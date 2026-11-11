/**
 * - `CONTRACT` · each file of a product the homes read, and what that read is
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
    file: 'guards/__snapshots__/wireframesSnapshot.ts',
    kind: 'registry',
    what: 'the wireframes as last checked',
  },
  {
    file: 'guards/checks/contentTypePart.ts',
    kind: 'plug',
    what: 'a check part of the product’s own',
  },
  {
    file: 'guards/checks/measureCheck.ts',
    kind: 'plug',
    what: 'the product’s half of Measure',
  },
  {
    file: 'guards/checks/parsePools.ts',
    kind: 'plug',
    what: 'a check part of the product’s own',
  },
  {
    file: 'guards/checks/rulesParts.ts',
    kind: 'plug',
    what: 'the rules’ check parts',
  },
  {
    file: 'guards/checks/sentencesPart.ts',
    kind: 'plug',
    what: 'the sentences’ check part',
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
  { file: 'roadmaps/receipts.ts', kind: 'registry', what: 'the receipts' },
  { file: 'roadmaps/templates.ts', kind: 'registry', what: 'an epic’s files' },
  {
    file: 'roadmaps/tickets.ts',
    kind: 'registry',
    what: 'the tickets and their status',
  },
  {
    file: 'roadmaps/tickets/ticketStatus.ts',
    kind: 'plug',
    what: 'the status labels, the product’s words',
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
    kind: 'plug',
    what: 'a model of the product’s own',
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
    file: 'sheet/logic/approval/approvalLogic.ts',
    kind: 'plug',
    what: 'logic of the product’s own',
  },
  {
    file: 'sheet/logic/approval/roleCombinations.ts',
    kind: 'plug',
    what: 'logic of the product’s own',
  },
  {
    file: 'sheet/logic/approval/scenes.ts',
    kind: 'plug',
    what: 'logic of the product’s own',
  },
  {
    file: 'sheet/logic/assembly/contentCheck.ts',
    kind: 'plug',
    what: 'logic of the product’s own',
  },
  {
    file: 'sheet/logic/assembly/contentTypeLogic.ts',
    kind: 'plug',
    what: 'logic of the product’s own',
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
    file: 'sheet/model/fieldKinds.ts',
    kind: 'plug',
    what: 'a model of the product’s own',
  },
  {
    file: 'sheet/project.ts',
    kind: 'registry',
    what: 'its names, and what its build side reads',
  },
  { file: 'sheet/rules.ts', kind: 'registry', what: 'the rules’ rows' },
  {
    file: 'sheet/samples/blocks.ts',
    kind: 'plug',
    what: 'samples of the product’s own',
  },
  {
    file: 'sheet/screens/screenView.ts',
    kind: 'plug',
    what: 'a view part of the product’s own',
  },
  {
    file: 'sheet/screens/wireframes.ts',
    kind: 'registry',
    what: 'the screens and their wireframes',
  },
  { file: 'sheet/words/glossary.ts', kind: 'registry', what: 'the glossary' },
  { file: 'sheet/words/messages.ts', kind: 'registry', what: 'the messages' },
  {
    file: 'sheet/words/messagesContent.ts',
    kind: 'registry',
    what: 'the messages’ content',
  },
];

export { CONTRACT };
