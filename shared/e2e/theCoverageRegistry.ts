/**
 * - `createCoverageRegistry`, `CoverageRegistry` · the flows a run covered
 * - printed as a table once the run ends, the uncovered beside them
 */
const RULE = '='.repeat(80);
const THIN = '-'.repeat(80);
const ID_COLUMN = 68;

export type CoverageRegistry<FlowId extends string> = {
  readonly register: (flowId: FlowId) => void;
  readonly printCoverageTable: (title: string) => void;
};

// the table's lines: the count, then each flow covered or not, by id
const tableOf = <FlowId extends string>(
  everyFlowId: readonly FlowId[],
  {
    title,
    covered,
  }: { readonly title: string; readonly covered: ReadonlySet<FlowId> },
): readonly string[] => {
  const total = everyFlowId.length;
  const count = everyFlowId.filter((flowId) => covered.has(flowId)).length;
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  return [
    `\n${RULE}`,
    `${title} · flow coverage`,
    RULE,
    `\nflows ${total} | covered ${count} | not covered ${total - count} | ${percentage}%\n`,
    THIN,
    ...[...everyFlowId]
      .sort()
      .map(
        (flowId) =>
          `| ${flowId.padEnd(ID_COLUMN)} | ${covered.has(flowId) ? 'covered    ' : 'not covered'} |`,
      ),
    `${THIN}\n`,
  ];
};

// the registry a screen's flows report to: every flow it may print, the lines going to `logger`
export const createCoverageRegistry = <FlowId extends string>(
  everyFlowId: readonly FlowId[],
  logger: (line: string) => void = console.log,
): CoverageRegistry<FlowId> => {
  const covered = new Set<FlowId>();
  return {
    register: (flowId) => {
      covered.add(flowId);
      logger(`registered ${flowId}`);
    },
    printCoverageTable: (title) => {
      for (const line of tableOf(everyFlowId, { title, covered })) logger(line);
    },
  };
};
