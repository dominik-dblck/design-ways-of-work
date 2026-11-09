/**
 * - `planTake` · what a take writes, removes and refuses, from the digests
 * - a taken file is the tag’s, byte for byte
 * - an edit since the take, or a product file in its place, is never overwritten
 */

type Digests = ReadonlyMap<string, string>;

interface Refusal {
  readonly file: string;
  readonly why: string;
}

interface Plan {
  readonly writes: readonly string[];
  readonly removes: readonly string[];
  readonly refusals: readonly Refusal[];
}

// a file the product tracks is its own, whatever its bytes: wow's files never enter its history
function wantedStep({
  file,
  wanted,
  recorded,
  onDisk,
  isTracked,
}: {
  readonly file: string;
  readonly wanted: string;
  readonly recorded: string | undefined;
  readonly onDisk: string | undefined;
  readonly isTracked: boolean;
}): 'write' | 'keep' | Refusal {
  if (isTracked)
    return { file, why: 'tracked by the product: git rm --cached it first' };
  if (onDisk === undefined || (onDisk !== wanted && onDisk === recorded))
    return 'write';
  if (onDisk === wanted) return 'keep';
  return {
    file,
    why:
      recorded === undefined
        ? 'a file of the product stands in its place'
        : 'edited since the last take',
  };
}

// a file the last take wrote and the tag no longer has goes, unless someone edited it since
function goneStep({
  file,
  recorded,
  onDisk,
}: {
  readonly file: string;
  readonly recorded: string;
  readonly onDisk: string | undefined;
}): 'remove' | 'keep' | Refusal {
  if (onDisk === undefined) return 'keep';
  if (onDisk === recorded) return 'remove';
  return {
    file,
    why: 'edited since the last take, and the tag has it no more',
  };
}

function planTake({
  wanted,
  recorded,
  onDisk,
  tracked,
}: {
  readonly wanted: Digests;
  readonly recorded: Digests;
  readonly onDisk: Digests;
  readonly tracked: ReadonlySet<string>;
}): Plan {
  const writes: string[] = [];
  const removes: string[] = [];
  const refusals: Refusal[] = [];
  for (const [file, digest] of wanted) {
    const step = wantedStep({
      file,
      wanted: digest,
      recorded: recorded.get(file),
      onDisk: onDisk.get(file),
      isTracked: tracked.has(file),
    });
    if (step === 'write') writes.push(file);
    else if (step !== 'keep') refusals.push(step);
  }
  for (const [file, digest] of recorded) {
    if (wanted.has(file)) continue;
    const step = goneStep({ file, recorded: digest, onDisk: onDisk.get(file) });
    if (step === 'remove') removes.push(file);
    else if (step !== 'keep') refusals.push(step);
  }
  return { writes, removes, refusals };
}

export { planTake };
export type { Plan };
