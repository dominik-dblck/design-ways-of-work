/**
 * - `MIGRATION` · what eagle-design does to take the release in hand
 * - `tree/` beside it · its own files the release asks for, at its paths
 */
import type { Migration } from '../../scripts/migrationTypes.ts';

const APPROVAL = 'sheet/logic/approval/approvalLogic';
const LOGIC_TYPES = `${APPROVAL}/approvalLogicTypes.ts`;

// the requirements' types, cut from the logic's: they go with the rows to the registry
const REQUIREMENT_TYPES = `// [id, text, who said it, when, how it stands against the sheet, the note, the code it retires]
type RequirementRow = readonly [
  id: string,
  text: string,
  from: string,
  ref?: string,
  sheet?: string,
  note?: string,
  replaces?: readonly string[],
];

interface Requirement {
  readonly id: string;
  readonly text: string;
  readonly from: string;
  readonly ref: string;
  readonly sheet: string;
  readonly note: string;
  readonly replaces: readonly string[];
}

`;

// the JSON its build side reads by blob, from the modules that hold the data
const JSON_FIXTURES = [
  {
    module: 'sheet/contract/blockModel.ts',
    name: 'blockModel',
    fixture: 'fixtures/data/block-model.json',
  },
  {
    module: 'app/styles/componentsSpec.ts',
    name: 'componentsSpec',
    fixture: 'fixtures/data/components.spec.json',
  },
  {
    module: 'docs/process/modes.ts',
    name: 'modesPage',
    fixture: 'fixtures/data/modes.json',
  },
] as const;

const MIGRATION: Migration = {
  removes: [],
  moves: [
    [`${APPROVAL}/requirementRows.ts`, 'sheet/requirements.ts'],
    [`${APPROVAL}/requirementsCut.ts`, 'sheet/requirements/requirementsCut.ts'],
  ],
  edits: [
    {
      file: `${APPROVAL}.ts`,
      from: ' * - `sceneFor`, `sceneParity`, `requirements` · screens, their parity, the asks\n',
      to: ' * - `sceneFor`, `sceneParity` · screens and their parity\n',
    },
    {
      file: `${APPROVAL}.ts`,
      from: "export { REQUIREMENTS as requirements } from '../../requirements.ts';\n",
      to: '',
    },
    {
      file: LOGIC_TYPES,
      from: ' * - `RequirementRow`, `Requirement` · a requirement as written and as read\n',
      to: '',
    },
    { file: LOGIC_TYPES, from: REQUIREMENT_TYPES, to: '' },
    { file: LOGIC_TYPES, from: '  Requirement,\n  RequirementRow,\n', to: '' },
    {
      file: 'sheet/requirements.ts',
      from: " * - `REQUIREMENTS` · the playground's requirements",
      to: " * - `requirements` · the playground's requirements",
    },
    {
      file: 'sheet/requirements.ts',
      from: `import type { Requirement, RequirementRow } from './logic/approval/approvalLogic/approvalLogicTypes.ts';`,
      to: `import type {
  Requirement,
  RequirementRow,
} from './requirements/requirementTypes.ts';`,
    },
    {
      file: 'sheet/requirements.ts',
      from: 'export { REQUIREMENTS };',
      to: 'export { REQUIREMENTS as requirements };',
    },
    {
      file: 'sheet/requirements/requirementsCut.ts',
      from: `from '../logic/approval/approvalLogic/approvalLogicTypes.ts';`,
      to: `from './requirementTypes.ts';`,
    },
    {
      file: 'sheet/project.ts',
      from: '  readonly files: readonly string[];\n',
      to: `  readonly files: readonly string[];
  readonly json: readonly {
    readonly module: string;
    readonly name: string;
    readonly fixture: string;
  }[];
`,
    },
    {
      file: 'sheet/project.ts',
      from: "  files: ['docs/process/ticket-pipeline.md'],\n",
      to: `  files: ['docs/process/ticket-pipeline.md', '${JSON_FIXTURES[0].fixture}'],
  // the JSON the build prints for it, each from a module's export
  json: [
${JSON_FIXTURES.map(
  (one) => `    {
      module: '${one.module}',
      name: '${one.name}',
      fixture: '${one.fixture}',
    },
`,
).join('')}  ],
`,
    },
    {
      file: 'scope.ts',
      from: "        'sheet/contract/*.md',\n",
      to: "        'sheet/contract/*.md',\n        'fixtures/data/*.json',\n",
    },
    {
      file: '.prettierignore',
      from: 'sheet/contract/*.md\n',
      to: 'sheet/contract/*.md\nfixtures/data/*.json\n',
    },
    {
      file: 'scope.ts',
      from: `import { buildReads } from './sheet/project.ts';
import {
  emitted,
  entryOfPart,
  filesOf,
  isEntry,
  pageOf,
} from './tools/layout.ts';
`,
      to: `import { entryOfPart, filesOf, isEntry } from './tools/layout.ts';
import { readStarts } from './tools/readStarts.ts';
`,
    },
    {
      file: 'scope.ts',
      from: `  starts: [
    ...filesOf().filter((file) => pageOf(file) !== null),
    ...emitted().map((one) => one.module),
    ...Object.keys(buildReads.names),
  ],
`,
      to: '  starts: readStarts(),\n',
    },
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
  ],
  tree: 'ports/eagle-design/tree',
};

export { MIGRATION };
