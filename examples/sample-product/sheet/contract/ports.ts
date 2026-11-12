/**
 * - `all` · each destination's port: what the product sends, what comes back
 */
interface PortOperation {
  readonly id: string;
  readonly name: string;
  readonly way: 'ask' | 'tell';
  readonly sends: string;
  readonly answers: string | null;
  readonly usedBy: readonly string[];
  readonly cites: readonly string[];
  readonly note: string;
}

interface DestinationPort {
  readonly destination: string;
  readonly epic: string;
  readonly ticket: string;
  readonly operations: readonly PortOperation[];
}

const all: readonly DestinationPort[] = [];

export { all };
export type { DestinationPort };
