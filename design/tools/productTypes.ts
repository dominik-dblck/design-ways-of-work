/**
 * - `Product` · what a product plugs into the way of working, in its `product.ts`
 * - `CheckPart` · a part of the checks: its lines over the built mirror
 * - `ProductScreens` · part w's screens: each swept, each seen in the editor
 */
import type { Mirror } from '../guards/checks/checkWorld.ts';
import type { MapMove, SourceFinding } from '../guards/sourceCheck.ts';

type CheckPart = (mirror: Mirror) => readonly string[];

interface FrameGap {
  readonly what: string;
  readonly why?: string;
}

// a wireframe as the sweep reads it: the error its view throws, or the gaps it leaves
interface SweptFrame {
  readonly num: string;
  readonly error?: string;
  readonly gaps?: readonly FrameGap[];
}

interface ProductScreens {
  readonly sweep: () => readonly SweptFrame[];
  // one wireframe as the editor shows it, by its number
  readonly editorView: (num: string) => unknown;
}

// code alone: a registry's rows stand at the registry's path, the names in `sheet/project.ts`
interface Product {
  // its own parts of the checks, each by its letter; a standard part keeps its letter
  readonly checkParts: Readonly<Record<string, CheckPart>>;
  // the order a full run takes the parts in, when not the standard ones first
  readonly checkOrder?: readonly string[];
  // part a's last lines: the product's own checks, after the standard ones
  readonly guardLines?: CheckPart;
  // the guard's findings over the product's own logic, after its scan's
  readonly guardFindings?: () => readonly SourceFinding[];
  // the facts the architecture map draws as moving from file to file
  readonly mapMoves?: () => readonly MapMove[];
  readonly screens?: ProductScreens;
}

export type { CheckPart, Product, ProductScreens };
