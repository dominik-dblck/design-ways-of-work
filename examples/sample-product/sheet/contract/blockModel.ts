/**
 * - `blockModel` · the block model as data, its parts in key order
 * - `modelTypes` · its types, each a name and its src lines
 */
interface ModelType {
  readonly name: string;
  readonly src?: string | readonly string[];
}

const blockModel = { settled: [], types: [] } as const;

const modelTypes: readonly ModelType[] = blockModel.types;

export { blockModel, modelTypes };
