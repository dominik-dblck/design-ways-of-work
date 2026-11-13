/**
 * - `SaveStateShown` · the save as it stands: saved at a time, on its way, refused
 * - `SaveStateKind` · which of those it is
 */
/** At is the draft's own time, none before the first save; taken carries the refusal. */
export type SaveStateShown =
  | { readonly state: 'saved'; readonly at?: string }
  | { readonly state: 'saving' | 'retrying' | 'lost' }
  | { readonly state: 'taken'; readonly takenLine: string };

export type SaveStateKind = SaveStateShown['state'];
