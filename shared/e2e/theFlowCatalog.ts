/**
 * - `FlowCatalogEntry`, `createFlowSteps` · a flow as its catalogue writes it
 * - `flowIdsOf`, `flowDataOf` · a catalogue's ids, and its flows in an order
 */
import type { FlowItemBase } from './theFlowShapes.ts';

// a flow as its catalogue writes it: the key it is filed under is its id
export type FlowCatalogEntry<
  UserType extends string,
  FlowCategory extends string,
> = Omit<FlowItemBase<string, UserType, FlowCategory>, 'id'>;

export const createFlowSteps = (steps: readonly string[]): string =>
  steps.join(' -> ');

// each key read back as itself: the ids object a screen's flows name their own by
const isIdsOf = <Catalog extends object>(
  ids: unknown,
  catalog: Catalog,
): ids is { readonly [Key in keyof Catalog]: Key } =>
  typeof ids === 'object' &&
  ids !== null &&
  Object.keys(catalog).every((key) => Reflect.get(ids, key) === key);

export const flowIdsOf = <
  Catalog extends Readonly<Record<string, FlowCatalogEntry<string, string>>>,
>(
  catalog: Catalog,
): { readonly [Key in keyof Catalog]: Key } => {
  const ids: unknown = Object.fromEntries(
    Object.keys(catalog).map((key) => [key, key]),
  );
  if (!isIdsOf(ids, catalog))
    throw new Error('a catalogue key reads back as another');
  return ids;
};

export const flowDataOf = <
  FlowId extends string,
  UserType extends string,
  FlowCategory extends string,
>(
  catalog: Readonly<Record<FlowId, FlowCatalogEntry<UserType, FlowCategory>>>,
  order?: readonly FlowId[],
): readonly FlowItemBase<FlowId, UserType, FlowCategory>[] => {
  const keys =
    order ??
    Object.keys(catalog).filter((key): key is FlowId => key in catalog);
  const absent = keys.filter((key) => !Object.hasOwn(catalog, key));
  if (absent.length > 0)
    throw new Error(
      `the flow order names keys the catalog does not hold: ${absent.join(', ')}`,
    );
  return keys.map((id) => ({ id, ...catalog[id] }));
};
