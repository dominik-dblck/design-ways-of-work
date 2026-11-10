/**
 * - `Spec`, `SpecRow`, `SpecPart`, `Tier`, `TieredRow` · the spec's rows by tier
 * - `ScriptIo` · what a run is handed: a log
 */
interface SpecPart {
  readonly atom?: string;
  readonly molecule?: string;
  readonly organism?: string;
  readonly variant?: string;
}

interface SpecRow {
  readonly [field: string]: unknown;
  readonly id: string;
  readonly parts?: readonly SpecPart[];
  readonly notes?: string;
  readonly layout?: string;
  readonly wrapper?: string;
  readonly scope?: string;
  readonly ownedBy?: string;
  readonly changedIn?: readonly string[];
  readonly live?: string | null;
  readonly variants?: Readonly<
    Record<string, Readonly<Record<string, unknown>>>
  >;
  readonly interactive?: boolean;
  readonly skip?: readonly string[];
}

type Tier = 'atoms' | 'molecules' | 'organisms';

type TieredRow = SpecRow & { readonly tier: Tier };

interface Spec {
  readonly atoms: readonly SpecRow[];
  readonly molecules: readonly SpecRow[];
  readonly organisms: readonly SpecRow[];
  readonly states: { readonly canon?: readonly string[] };
}

interface ScriptIo {
  log(...parts: readonly unknown[]): void;
}

export type { ScriptIo, Spec, SpecPart, SpecRow, TieredRow };
