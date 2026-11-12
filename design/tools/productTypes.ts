/**
 * - `Product` · what a product plugs into the way of working, in its `product.ts`
 * - `CheckPart`, `ProductScreens` · a part of the checks; part w's screens
 * - `ProductView`, `ProductFields` · what the pages plug in; an epic's fields
 */
import type {
  DocTypeView,
  FieldKindView,
  FieldOptionView,
} from '../app/workspace/featureFieldTypes.ts';
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

interface CombinationTally {
  readonly total: number;
  readonly byKind: Readonly<Record<string, number>>;
}

interface ProductFields {
  readonly kinds: readonly FieldKindView[];
  readonly options: readonly FieldOptionView[];
  readonly code: string;
  readonly docTypes: readonly DocTypeView[];
}

interface ProductScreens {
  readonly sweep: () => readonly SweptFrame[];
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

// pure code a browser runs, in the product's `productView.ts`: its pages read it, and the pack
interface ProductView {
  // how many states an epic names, for a count a criterion or a page holds against
  readonly statesOf?: (epic: string) => number;
  // each combinations file's counter, by the file a combinations row names
  readonly counters?: Readonly<Record<string, () => CombinationTally>>;
  readonly fieldsOf?: (epic: string) => ProductFields | undefined;
}

export type { CheckPart, Product, ProductFields, ProductScreens, ProductView };
