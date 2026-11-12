/**
 * - `requirementItems`, `decisionLines` · the requirements, their built lines
 * - `targets`, `readList` · the files a requirement retires code in, a run's files
 */
import { SOURCE_LAYERS } from './sourceLayers.ts';
import { SCOPE } from './sourceScope.ts';
import { requirements } from '../../sheet/requirements.ts';

type Requirement = (typeof requirements)[number]['items'][number];

// a requirement names the code it retires: the guard fails while that code stands
function requirementItems(): readonly Requirement[] {
  return requirements.flatMap((area) => area.items);
}

// the requirements are the decisions' home: their built file is their prose, every line of it
function decisionLines(file: string, text: unknown): ReadonlySet<number> {
  if (file !== 'requirements.js') return new Set();
  return new Set(String(text).split('\n').keys());
}

// the files a requirement's replaces names, beyond the scope
function targets(): readonly string[] {
  const files = requirementItems().flatMap((requirement) =>
    requirement.replaces.map(
      (replaced) => String(replaced).split(' · ')[0] ?? '',
    ),
  );
  return [...new Set(files.filter((file) => !SCOPE.includes(file)))];
}

// the scope, every layered file and the words' home, each once
function readList(): readonly string[] {
  return [
    ...new Set([
      ...SCOPE,
      ...targets(),
      ...Object.keys(SOURCE_LAYERS).filter((file) => file !== 'sourceCheck.js'),
      'messages.js',
    ]),
  ];
}

export { decisionLines, readList, requirementItems, targets };
