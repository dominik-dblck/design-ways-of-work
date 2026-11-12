/**
 * - `of`, `all` · the mode a ticket runs in and the points that chose it
 * - `check` · a track below its points without an override, an unknown factor
 */
import { TRACK } from './tracks/ticketTracks.ts';
import type {
  TrackFinding,
  TrackReading,
  TrackRow,
} from './tracks/tracksTypes.ts';

// factor · points · what it means · reports is a count, the rest flags
const FACTORS: Readonly<Record<string, readonly [number, string]>> = {
  pattern: [
    3,
    'the first ticket of a pattern — the first command that appends, the first typed query params',
  ],
  model: [
    2,
    'moves the model, a type or the wire’s shape — blockModel.ts, events.js, the keys of an answer',
  ],
  infra: [
    2,
    'database, infra, session, permissions — migrations, test tiers, CI, auth',
  ],
  events: [1, 'appends to the log — a command that is not silent'],
  routes: [1, 'more than one route or command'],
  criteria: [1, 'more than eight criteria, counted at refinement'],
  spec: [1, 'new rows in componentsSpec.ts'],
  pm: [1, 'waits on a PM decision at refinement'],
  reports: [1, 'per re-port of a closed ticket'],
};

// first match from the top
const THRESHOLDS: readonly (readonly [number, string])[] = [
  [2, 'standard'],
  [0, 'fast'],
];
const ORDER: readonly string[] = ['fast', 'standard'];
// a done ticket keeps the track it ran on; no new row takes it
const HISTORY: readonly string[] = ['full'];

function score(id: string): number | null {
  const row = TRACK[id];
  if (!row) return null;
  return Object.entries(row.factors).reduce(
    (sum, [factor, count]) =>
      sum + (FACTORS[factor] ? FACTORS[factor][0] * count : 0),
    0,
  );
}

function byPoints(points: number): string {
  return THRESHOLDS.find(([from]) => points >= from)?.[1] ?? 'fast';
}

function trackOf(id: string): TrackReading | null {
  const row = TRACK[id];
  if (!row) return null;
  const points = score(id) ?? 0;
  return {
    track: row.track,
    points,
    byPoints: byPoints(points),
    factors: row.factors,
    override: row.override || null,
    reconStop: Boolean(row.reconStop),
  };
}

function shapeFindings(id: string, row: TrackRow): TrackFinding[] {
  const out: TrackFinding[] = Object.keys(row.factors)
    .filter((factor) => !FACTORS[factor])
    .map((factor) => ({ where: id, text: `unknown factor ${factor}` }));
  if (row.reconStop && row.track !== 'feature') {
    out.push({
      where: id,
      text: `reconStop on a ${row.track} ticket — only a feature ticket carries it`,
    });
  }
  return out;
}

// a track below its points needs an override with a reason and who decided; only upward needs none
function ladderFindings(id: string, row: TrackRow): TrackFinding[] {
  const out: TrackFinding[] = [];
  if (!ORDER.includes(row.track)) {
    out.push({ where: id, text: `unknown track ${row.track}` });
  }
  const points = score(id) ?? 0;
  const want = byPoints(points);
  const isOverridden = Boolean(row.override?.reason && row.override.by);
  if (ORDER.indexOf(row.track) < ORDER.indexOf(want) && !isOverridden) {
    out.push({
      where: id,
      text: `track ${row.track} is below its points (${points} → ${want}) and carries no override with reason and by`,
    });
  }
  return out;
}

// a feature ticket runs a whole epic, outside the points ladder; a history track keeps its row
function check(id: string): TrackFinding[] {
  const row = TRACK[id];
  if (!row) return [];
  const isOutside = row.track === 'feature' || HISTORY.includes(row.track);
  return [
    ...shapeFindings(id, row),
    ...(isOutside ? [] : ladderFindings(id, row)),
  ];
}

function all(): string[] {
  return Object.keys(TRACK);
}

export { all, check, trackOf as of };
