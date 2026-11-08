/**
 * - `requirementItems`, `decisionLines` · the requirements, their built lines
 * - `targets`, `readList` · the files a requirement retires code in, a run's files
 */
import { LAYERS } from './sourceLayers.ts';
import { SCOPE } from './sourceScope.ts';
import * as APPROVAL_LOGIC from '../../sheet/logic/approval/approval-logic.ts';

type Requirement =
  (typeof APPROVAL_LOGIC)['requirements'][number]['items'][number];

function requirementItems(): readonly Requirement[] {
  return APPROVAL_LOGIC.requirements.flatMap((area) => area.items);
}

// the requirements are the decisions' home: in the built file, the lines of their parts
function decisionLines(file: string, text: unknown): ReadonlySet<number> {
  const lines = new Set<number>();
  if (file !== 'approval-logic.js') return lines;
  let part = '';
  String(text)
    .split('\n')
    .forEach((line, index) => {
      const marker = /^\s*\/\/ [\w/-]+\/(\w+)\.ts$/.exec(line);
      if (marker) part = String(marker[1]);
      if (/^requirement(s\w*|Rows)$/.test(part)) lines.add(index);
    });
  return lines;
}

// the files a requirement's replaces names, beyond the scope
function targets(): readonly string[] {
  const files = requirementItems().flatMap((requirement) =>
    requirement.replaces.map((replaced) => String(replaced).split(' · ')[0] ?? ''),
  );
  return [...new Set(files.filter((file) => !SCOPE.includes(file)))];
}

// the scope, every layered file and the words' home, each once
function readList(): readonly string[] {
  return [
    ...new Set([
      ...SCOPE,
      ...targets(),
      ...Object.keys(LAYERS).filter((file) => file !== 'source-check.js'),
      'messages.js',
    ]),
  ];
}

export { decisionLines, readList, requirementItems, targets };
