/**
 * - `ContractRow` · a product's file the homes read, and what that read is
 */

interface ContractRow {
  // the file, at the path a product holds it
  readonly file: string;
  // registry: every product holds it · optional: held with no row, never absent · scope: its scope · product: what it plugs in · plug: its own file a home still reads by its path
  readonly kind: 'registry' | 'optional' | 'plug' | 'scope' | 'product';
  readonly what: string;
}

export type { ContractRow };
