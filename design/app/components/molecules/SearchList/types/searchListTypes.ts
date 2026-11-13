/**
 * - `SearchListProps` · a search over named rows, one picked
 * - `SearchListItem` · a row: name, line under it, what trails it, its hover card
 * - `SearchListMeta` · how the line under a name reads: a label, or an address
 */
export type SearchListMeta = 'label' | 'address';

export type SearchListItem<Id extends string = string> = {
  readonly id: Id;
  readonly name: string;
  readonly meta: string;
  readonly trailing?: React.ReactNode;
  // drawn beside the row while it is hovered
  readonly card?: React.ReactElement;
};

/** A hover tells the parent, which may hand the hovered row its card. */
export type SearchListProps<Id extends string = string> = {
  readonly items: readonly SearchListItem<Id>[];
  readonly value: Id | null;
  readonly query: string;
  readonly placeholder: string;
  readonly empty: string;
  readonly meta?: SearchListMeta;
  // a failed read, drawn where the rows would be
  readonly failed?: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly pending?: boolean;
  readonly onQuery: (query: string) => void;
  readonly onPick: (id: Id) => void;
  readonly onHover?: (id: Id | null) => void;
  readonly testId?: string;
  readonly searchTestId?: string;
  readonly rowTestId?: string;
};
