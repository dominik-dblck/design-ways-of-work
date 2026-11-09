/**
 * - `ScreenDefinitions`, `screenDefinitionsOf` · a screen's flow ids, in order
 */
import { flowDataOf } from './theFlowCatalog.ts';
import type { FlowCatalogEntry } from './theFlowCatalog.ts';

export type ScreenDefinitions<FlowId extends string> = {
  readonly screen: string;
  readonly allFlowIds: readonly FlowId[];
};

// a screen's definitions read off its catalogue: every flow id, in the catalogue's order
export const screenDefinitionsOf = <FlowId extends string>(
  screen: string,
  catalog: Readonly<Record<FlowId, FlowCatalogEntry<string, string>>>,
): ScreenDefinitions<FlowId> => ({
  screen,
  allFlowIds: flowDataOf(catalog).map((flow) => flow.id),
});
