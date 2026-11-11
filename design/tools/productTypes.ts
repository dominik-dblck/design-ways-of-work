/**
 * - `Product` · what a product plugs into the way of working, in its `product.ts`
 * - `CheckPart` · a part of the checks: its lines over the built mirror
 */
import type { Mirror } from '../guards/checks/checkWorld.ts';

type CheckPart = (mirror: Mirror) => readonly string[];

// code alone: a registry's rows stand at the registry's path, the names in `sheet/project.ts`
interface Product {
  // its own parts of the checks, each by its letter; a standard part keeps its letter
  readonly checkParts: Readonly<Record<string, CheckPart>>;
  // the order a full run takes the parts in, when not the standard ones first
  readonly checkOrder?: readonly string[];
}

export type { CheckPart, Product };
