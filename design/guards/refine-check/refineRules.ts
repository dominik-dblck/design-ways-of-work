/**
 * - `TEST`, `EXISTS`, `SHAPE`, `NUMBER`, `DATE`, `LOSER`, `WHY` · line patterns
 * - `JOURNEY`, `NOTEBOOK`, `PATH`, `MAX_CRITERION`, `testClause` · the rest of them
 */
import { buildSide } from '../../sheet/project.ts';

export const MAX_CRITERION = 600;
// rule:criterion-says-what-file-holds · holds, never exists
export const EXISTS =
  /\b(exists?|already (exists?|stands?|holds?|carries)|before this ticket)\b/i;
// a test asserts a value or a mechanism, never a shape a reader can see: these words in a test clause are a shape being parsed
export const SHAPE =
  /\b(DOM order|in (DOM )?order|order (of|equal)|props (equal|match)|equals? the (props|layout) line|layout(’|')s? \[|sits (top|left|right|bottom)|at the muiPath|parsed? (the|its) (props|layout|muiPath))\b/i;
export const TEST = /\btest\s*(\(|:)/;
// rule:a-count-carries-its-date · a count, which needs the date it was counted
export const NUMBER =
  /\b(\d{1,3}|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty(-\w+)?|thirty(-\w+)?|forty(-\w+)?|fifty(-\w+)?)\b(?=\s+(rows?|keys?|criteria|tests?|files?|rules?|columns?|fields?|events?|shapes?|wrappers?|components?|glyphs?|icons?|steps?|cases?|edges?|projects?|pools?|people|roster))/i;
export const DATE = /\b\d{1,2} Sep\b|\d{4}-\d{2}-\d{2}|Measure\.run\(\)/;
// rule:decide-one-point-at-a-time · history in a criterion
export const LOSER = new RegExp(
  `\\b(withdrawn|the earlier (pick|wording)|not ${buildSide}.s [AB]\\b|the 1\\d Sep wording|used to (say|read))\\b`,
  'i',
);
export const WHY = ['today', 'after', 'unlocks', 'not', 'oneLine'] as const;
// rule:journeys-in-one-grammar · a journey's grammar, steps split on →, one step allowed
export const JOURNEY = /^J\d+ · [^·]+ · .+ · test \(e2e, Playwright\): .+/;
// rule:no-notebook-in-the-pack · a feature notebook is never in a pack
export const NOTEBOOK =
  /\bfeatures?(-E\d\d)?\.md\b|\bE\d\d[A-Za-z]*Notes\.ts\b|\bnotes\.[tj]s\b/;
// rule:why-for-the-pm · no paths in why
export const PATH = /\b(app|scripts|tests|packages|docs|\.claude)\/[\w.<>/-]+/;

export function testClause(criterion: string): string {
  const parts = criterion.split(/\btest(?:\s*\([^)]*\))?\s*:/i);
  return parts.length > 1 ? parts.slice(1).join(' ') : '';
}
