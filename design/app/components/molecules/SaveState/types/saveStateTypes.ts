/**
 * - `SaveStateShown` · the save as it stands: saved at a time, on its way, refused
 * - `SaveStateKind` · which of those it is
 * - `SaveStateWords` · what the foot says, a product's own or Eagle's
 */
/** At is the draft's own time, none before the first save; taken carries the refusal. */
export type SaveStateShown =
  | { readonly state: 'saved'; readonly at?: string }
  | { readonly state: 'saving' | 'retrying' | 'lost' }
  | { readonly state: 'taken'; readonly takenLine: string };

export type SaveStateKind = SaveStateShown['state'];

/** Each state's line and the retry's word · a product passes its own, Eagle's are the default. */
export type SaveStateWords = {
  readonly saved: (at: string) => string;
  readonly unsaved: string;
  readonly saving: string;
  readonly retrying: string;
  readonly lost: string;
  readonly retry: string;
  readonly taken: (line: string) => string;
};
