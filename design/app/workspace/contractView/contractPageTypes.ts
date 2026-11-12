/**
 * - `ContractPageView`, `ContractStat`, `LegendItem` · the page, a number, a key
 */
import type { CodeLine, EndpointCode, EndpointState } from './contractTypes.ts';

// one number on top, and the line that says what it counts
interface ContractStat {
  readonly id: EndpointState | 'endpoints' | 'noRow';
  readonly value: string;
  readonly note: string;
}

// how a typed, a drafted and an untyped name look in the code, and what each means
interface LegendItem {
  readonly state: EndpointState;
  readonly sample: CodeLine;
  readonly note: string;
}

interface ContractPageView {
  readonly stats: readonly ContractStat[];
  readonly legend: readonly LegendItem[];
  readonly states: readonly {
    readonly id: EndpointState | null;
    readonly label: string;
  }[];
  readonly epics: readonly string[];
  // the shared types bare, and with the notes the model writes beside them
  readonly shared: {
    readonly bare: readonly CodeLine[];
    readonly notes: readonly CodeLine[];
  };
  readonly endpoints: readonly EndpointCode[];
}

export type { ContractPageView, ContractStat, LegendItem };
