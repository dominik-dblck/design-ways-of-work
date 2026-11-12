/**
 * - `requirements` · the product's requirements by area, collected one by one
 */
interface Requirement {
  readonly id: string;
  readonly text: string;
  readonly from: string;
  readonly ref: string;
  readonly sheet: string;
  readonly note: string;
  readonly replaces: readonly string[];
}

const requirements: readonly {
  readonly area: string;
  readonly items: readonly Requirement[];
}[] = [];

export { requirements };
