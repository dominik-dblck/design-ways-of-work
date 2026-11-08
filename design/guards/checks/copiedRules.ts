/**
 * - `copiedRulesLine` · a rule's sentence copied from plans into CLAUDE.md
 */
import { lineOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import * as PLANS from '../../docs/process/plans.ts';

// a rule's text lives in plans.js alone: CLAUDE.md and design-side.md name the rules
function copiedRulesLine(mirror: Mirror): string {
  const rules = PLANS.rules;
  const sentences = rules
    .flatMap((rule) => rule.says.split(/(?<=[.:])\s+/))
    .map((one) => one.trim())
    .filter((one) => one.length > 60);
  const copied = ['CLAUDE.md', 'design-side.md'].flatMap((file) => {
    const text = mirror.read(file);
    return sentences
      .filter((one) => text.includes(one.slice(0, 60)))
      .map((one) => `${file} · ${one.slice(0, 50)}`);
  });
  let said = 'plans.js · Plans.rules not read';
  if (rules.length)
    said = copied.length
      ? copied.slice(0, 3).join(' | ')
      : `${rules.length} rules in plans.js, none copied`;
  return lineOf('rules copied', {
    ok: rules.length > 0 && !copied.length,
    text: said,
  });
}

export { copiedRulesLine };
