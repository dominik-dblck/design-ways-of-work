/**
 * - `all` · how the product works, one capability at a time
 */
interface CapabilityStep {
  readonly says: string;
  readonly at: string;
}

interface Capability {
  readonly key: string;
  readonly name: string;
  readonly decides: string;
  readonly states: readonly string[];
  readonly rules: readonly string[];
  readonly walk: readonly CapabilityStep[];
  readonly examples: readonly string[];
}

const all: readonly Capability[] = [
  {
    key: 'first',
    name: 'The first capability',
    decides: 'what the first epic delivers',
    states: [],
    rules: [],
    walk: [],
    examples: [],
  },
];

export { all };
