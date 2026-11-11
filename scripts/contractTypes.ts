/**
 * - `ContractRow` · a product's file the homes read, and what that read is
 */

interface ContractRow {
  // the file, at the path a product holds it
  readonly file: string;
  // registry: every product holds it · optional: one may hold it empty · plug: the product's own, read through `product.ts` · scope: its scope
  readonly kind: 'registry' | 'optional' | 'plug' | 'scope';
  readonly what: string;
}

export type { ContractRow };
