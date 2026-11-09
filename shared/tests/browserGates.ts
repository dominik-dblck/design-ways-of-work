/**
 * - `unwalkedOf`, `rolesMissingOf` · the paths and the roles no flow takes
 * - `statusFaultsOf` · a status file's faults
 * - `dragsIn`, `reachesOut` · a file's own drags; the framework's imports past it
 */
import ts from 'typescript';
import { FLOW_PATHS } from '../e2e/flowPaths.ts';
import type { Catalog } from './browserScreens.ts';
import { codeOf } from './codeText.ts';
import {
  bulletsOf,
  firstCellsOf,
  sectionOf,
  subjectOf,
  unanswered,
} from './statusFile.ts';

const WAIVED = 'Paths no flow takes, and why';
const ROLES_WAIVED = 'Roles no flow takes, and why';
const ANSWERED = [
  'What no flow covers, and why',
  ROLES_WAIVED,
  WAIVED,
] as const;
const RED = 'Red on a planted fault, each flow once';
const NOT_YET = 'Not yet seen red';
const NOT_DONE = /^- \*\*done\*\* · not yet$/m;
const A_DISPATCHED_DRAG =
  /\bnew DragEvent\b|\.dispatchEvent\(\s*['"`]drag|\bdispatchDragEvent\b/;
// what the framework may import: node's builtins, Playwright, a file beside it
const ITS_OWN = /^(?:node:|@playwright\/test$|\.\/[^/]+$)/;

// the kinds of path no flow walks and the status waives none of, then each waiver naming no kind
const unwalkedOf = (catalog: Catalog, status: string): readonly string[] => {
  const walked = new Set(
    Object.values(catalog).flatMap((entry) => entry.paths),
  );
  const waived = bulletsOf(sectionOf(status, WAIVED)).map(subjectOf);
  return [
    ...FLOW_PATHS.filter((kind) => !walked.has(kind) && !waived.includes(kind)),
    ...waived
      .filter((kind) => !FLOW_PATHS.some((one) => one === kind))
      .map((kind) => `${kind} · a waiver of a kind FLOW_PATHS lacks`),
  ];
};

// the roles of the tier no flow takes and the status waives none of, then each waiver naming no role
function rolesMissingOf({
  roles,
  catalog,
  status,
}: {
  readonly roles: readonly string[];
  readonly catalog: Catalog;
  readonly status: string;
}): readonly string[] {
  const taken = new Set(Object.values(catalog).map(({ userType }) => userType));
  const waived = bulletsOf(sectionOf(status, ROLES_WAIVED)).map(subjectOf);
  return [
    ...roles.filter((role) => !taken.has(role) && !waived.includes(role)),
    ...waived
      .filter((role) => !roles.includes(role))
      .map((role) => `${role} · a waiver of a role the tier lacks`),
  ];
}

// a red table of one row a flow, a flow in both lists, done claimed while one was never seen red
function redFaultsOf(catalog: Catalog, status: string): readonly string[] {
  const red = firstCellsOf(sectionOf(status, RED));
  const notYet = bulletsOf(sectionOf(status, NOT_YET)).map(subjectOf);
  const listed = [...red, ...notYet].sort().join(', ');
  const keys = Object.keys(catalog).sort().join(', ');
  return [
    ...red
      .filter((flow) => notYet.includes(flow))
      .map((flow) => `${flow} · red and not yet both`),
    ...(listed === keys
      ? []
      : [`red and not yet list ${listed}, the catalogue ${keys}`]),
    ...(notYet.length > 0 && !NOT_DONE.test(status)
      ? ['done reads more than not yet']
      : []),
  ];
}

const statusFaultsOf = ({
  catalog,
  status,
  root,
}: {
  readonly catalog: Catalog;
  readonly status: string;
  readonly root: string;
}): readonly string[] => [
  ...ANSWERED.flatMap((heading) =>
    bulletsOf(sectionOf(status, heading)).map((bullet) =>
      unanswered(bullet, root),
    ),
  ).filter((why) => why !== null),
  ...redFaultsOf(catalog, status),
];

// the 1-based lines of a file's code that dispatch a drag themselves
const dragsIn = (text: string): readonly number[] =>
  codeOf(text)
    .split('\n')
    .flatMap((line, at) => (A_DISPATCHED_DRAG.test(line) ? [at + 1] : []));

const reachesOut = (text: string): readonly string[] =>
  ts
    .preProcessFile(text, true, true)
    .importedFiles.map((file) => file.fileName)
    .filter((specifier) => !ITS_OWN.test(specifier));

export { dragsIn, reachesOut, rolesMissingOf, statusFaultsOf, unwalkedOf };
