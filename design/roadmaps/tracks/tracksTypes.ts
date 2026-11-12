/**
 * - what a ticket's track row holds, and what reading it gives
 */
type Factors = Readonly<Record<string, number>>;

interface TrackRow {
  readonly track: string;
  readonly factors: Factors;
  readonly ended?: { readonly points: number; readonly factors: Factors };
  readonly override?: { readonly reason: string; readonly by: string };
  // stops the run after recon; a feature ticket alone carries it
  readonly reconStop?: boolean;
}

interface TrackReading {
  readonly track: string;
  readonly points: number;
  readonly byPoints: string;
  readonly factors: Factors;
  readonly override: TrackRow['override'] | null;
  readonly reconStop: boolean;
}

interface TrackFinding {
  readonly where: string;
  readonly text: string;
}

export type { TrackFinding, TrackReading, TrackRow };
