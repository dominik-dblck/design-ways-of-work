/**
 * - `Scales`, `Theme`, `Themes`, `ScanContext` · what a scan reads off the CSS
 * - `Rule`, `Hit`, `Push`, `ScanFile`, `SpecMap` · a rule, a hit, a file, the map
 * - `Drift`, `ScanCounts`, `ScanResult` · what a run gives
 */
interface Scales {
  readonly heights: readonly number[];
  readonly glyphs: readonly number[];
  readonly marks: readonly number[];
  readonly radii: Readonly<Record<string, number>>;
  readonly radiusValues: readonly number[];
  readonly zIndex: readonly number[];
  // hex → token name, for the hex rule
  readonly named: Readonly<Record<string, string>>;
  readonly paperPadMenu: string | null;
  readonly paperPadPopover: string | null;
}

type Theme = Readonly<Record<string, string | undefined>>;

interface Themes {
  readonly light: Theme;
  readonly dark: Theme;
}

interface ScanContext {
  // the map's shapes, or null when no map was passed
  readonly known: readonly string[] | null;
  readonly themes: Themes;
  readonly vars: Readonly<Record<string, string>>;
}

// a hit is located by its index at scan time, never carried: a line number goes stale within a session
interface Hit {
  readonly value: string;
  readonly want: string;
  readonly at: number;
}

type Push = (hit: Hit) => void;

// each rule carries because: the thing it caught the day it was written · a rule with no evidence is a rule nobody can argue with, which is how a scan grows noise
interface Rule {
  readonly id: string;
  readonly what: string;
  readonly because: string;
  readonly exemptFiles?: readonly string[];
  readonly fingerprints?: null;
  readonly chromeAware?: boolean;
  readonly run: (text: string, reading: RuleReading) => void;
}

interface RuleReading {
  readonly scales: Scales;
  readonly push: Push;
  readonly ctx: ScanContext;
}

interface Drift {
  readonly rule: string;
  readonly file: string;
  value: string;
  readonly want: string;
  readonly line: number;
  files?: readonly string[];
}

interface ScanFile {
  readonly name: string;
  readonly text: string;
}

interface ScanCounts {
  readonly files: number;
  findings: number;
}

interface ScanResult {
  readonly findings: readonly Drift[];
  readonly byRule: Readonly<Record<string, readonly Drift[]>>;
  readonly counts: ScanCounts;
  readonly rules: readonly Rule[];
  readonly scales: Scales;
  readonly mapped: boolean;
}

interface SpecMap {
  readonly rows?: readonly { readonly fingerprints?: readonly string[] }[];
}

export type {
  Drift,
  Hit,
  Push,
  Rule,
  Scales,
  ScanContext,
  ScanCounts,
  ScanFile,
  ScanResult,
  SpecMap,
  Theme,
  Themes,
};
