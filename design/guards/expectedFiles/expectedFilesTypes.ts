/**
 * - `ExpectedTicket`, `ComponentsSpec` · a ticket and the spec's rows, as read here
 * - `ExpectedFile` · a path and why the run touches it
 */
import type { SpecRow } from '../specCheck.ts';

interface ExpectedTicket {
  readonly id: string;
  readonly epic: string;
  readonly touches?: readonly unknown[];
  readonly read?: readonly unknown[];
  readonly acceptance?: readonly unknown[];
}

type ComponentsSpec = Partial<
  Readonly<Record<'atoms' | 'molecules' | 'organisms', readonly SpecRow[]>>
>;

interface ExpectedFile {
  readonly path: string;
  readonly why: readonly string[];
}

export type { ComponentsSpec, ExpectedFile, ExpectedTicket };
