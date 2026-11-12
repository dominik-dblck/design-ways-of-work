/**
 * - `PLAN_EDITS` · the edits that follow the plan's lists and the standing words
 */
import type { MigrationEdit } from '../../../scripts/migrationTypes.ts';

// its rows that point at a list the product's plan holds now: each pointer names the module it moved to
const PLAN_POINTERS: readonly (readonly [string, string])[] = [
  ['roadmaps/backlog/lastEpics.ts', 'DECISIONS'],
  ['roadmaps/E00/E00Edges.ts', 'SPEC'],
  ['roadmaps/E00/E00EdgeTickets.ts', 'GUARDS'],
  ['roadmaps/E00/E00EdgeTickets.ts', 'DECISIONS'],
  ['roadmaps/E00/E00StoreTickets.ts', 'DECISIONS'],
  ['roadmaps/E02/E02Tickets.ts', 'DECISIONS'],
  ['roadmaps/E06/E06Tickets.ts', 'DECISIONS'],
  ['roadmaps/E09/E09Edges.ts', 'COMBINATIONS'],
  ['roadmaps/receipts/firstCaveats.ts', 'DECISIONS'],
  ['roadmaps/receipts/laterCaveats.ts', 'DECISIONS'],
];

const PLAN_EDITS: readonly MigrationEdit[] = [
  {
    file: 'roadmaps/tickets/ticketContext.ts',
    from: "import * as PLANS from '../../docs/process/plans.ts';\n",
    to: "import * as PLANS from '../../docs/process/plans.ts';\nimport { projectContext } from '../../docs/process/projectPlan.ts';\n",
  },
  {
    file: 'roadmaps/tickets/ticketContext.ts',
    from: '    project: PLANS.projectContext,\n',
    to: '    project: projectContext,\n',
  },
  ...PLAN_POINTERS.map(([file, name]) => ({
    file,
    from: `plans.js · ${name}`,
    to: `projectPlan.js · ${name}`,
    isEveryPlace: true as const,
  })),
  {
    file: 'sheet/contract/dbSchema/dbDecision.ts',
    from: 'plans.ts · DECISIONS',
    to: 'projectPlan.ts · DECISIONS',
  },
  ...['fileFlow', 'typeChain'].map((part) => ({
    file: `sheet/logic/assembly/contentTypeLogic/${part}.ts`,
    from: "from '../../../../app/workspace/sheetStatus.ts';\n",
    to: "from '../sheetStatus.ts';\n",
  })),
];

export { PLAN_EDITS };
