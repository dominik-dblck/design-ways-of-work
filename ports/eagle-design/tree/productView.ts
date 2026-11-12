/**
 * - `productView` · what this product plugs into its pages: pure code, in a browser
 * - read by what it runs alone, never by a module one of them imports
 */
import { count as roleCount } from './sheet/logic/approval/roleCombinations.ts';
import { stateIndex } from './sheet/logic/approval/scenes.ts';
import type { ProductView } from './tools/productTypes.ts';

const productView: ProductView = {
  statesOf: (epic) => stateIndex().filter((one) => one.epic === epic).length,
  // a combinations row names its counter by the file it counts
  counters: { 'roleCombinations.ts': roleCount },
};

export { productView };
