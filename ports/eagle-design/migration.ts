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
  ],
  tree: 'ports/eagle-design/tree',
};

export { MIGRATION };
