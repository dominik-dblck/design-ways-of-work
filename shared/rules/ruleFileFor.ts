/**
 * - `ruleFileFor` · a side's rule file: what both sides share, then its own
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';
import type { SharedRules, Side, SideRow } from './sharedRuleTypes.ts';

interface SideFile<W extends string> {
  readonly side: Side;
  readonly shared: SharedRules<W>;
  readonly intro: string;
  readonly rows: readonly SideRow<W>[];
  readonly outro: string;
}

// a shared reason no row of the side names, or one a row writes out in words: the shared part would lie
function whyFaults<W extends string>({
  side,
  shared,
  rows,
}: SideFile<W>): readonly string[] {
  const named = new Set<string>(
    rows.flatMap(({ why }) => (typeof why === 'string' ? [] : [why.shared])),
  );
  const written = new Set(
    rows.flatMap(({ why }) => (typeof why === 'string' ? [why] : [])),
  );
  return Object.entries<string>(shared.whys).flatMap(([key, why]) => [
    ...(named.has(key)
      ? []
      : [`${shared.title}: no ${side} row names the shared reason ${key}`]),
    ...(written.has(why)
      ? [`${shared.title}: a ${side} row writes out the shared reason ${key}`]
      : []),
  ]);
}

// the title and the opening both sides share, the shared rows with the side's gate, then the side's own
function ruleFileFor<W extends string>(file: SideFile<W>): RuleFile {
  const faults = whyFaults(file);
  if (faults.length > 0) throw new Error(faults.join('\n'));
  const { side, shared, intro, rows, outro } = file;
  return {
    title: shared.title,
    intro: `\n${[shared.opening, intro].filter((part) => part !== '').join(' ')}\n`,
    rows: [
      ...shared.rows.map((one) => ({
        rule: one.rule,
        gate: one[side].gate,
        exceptions: one[side].exceptions,
        why: one.why,
      })),
      ...rows.map((row) => ({
        ...row,
        why:
          typeof row.why === 'string' ? row.why : shared.whys[row.why.shared],
      })),
    ],
    outro,
  };
}

export { ruleFileFor };
