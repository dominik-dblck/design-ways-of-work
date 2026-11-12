/**
 * - `Stack`, `StackKey` · what a product is built on, part by part; its key
 */

// one part of a stack: its name as a document says it, the packages that bring it
interface StackPart {
  readonly name: string;
  readonly packages: readonly string[];
}

interface Stack {
  readonly framework: StackPart;
  readonly view: StackPart;
  readonly components: StackPart;
  readonly queries: StackPart;
  readonly schemas: StackPart;
  readonly unitTests: StackPart;
  readonly browserTests: StackPart;
  readonly mutationTests: StackPart;
  readonly database: StackPart;
  readonly icons: StackPart;
  readonly charts: StackPart;
  // the design system its look is drawn from: a home of the way of working
  readonly designSystem: string;
}

type StackKey = 'web';

export type { Stack, StackKey };
