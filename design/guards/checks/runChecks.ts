/**
 * - `guardRun` · every guard check over every file the guard lists
 * - `GuardRun` · the findings, their counts in the scope and outside
 */
import { ownText } from './bundleText.ts';
import type { Mirror } from './checkWorld.ts';
import * as SOURCE_CHECK from '../sourceCheck.ts';

type Guard = typeof SOURCE_CHECK;
type Finding = ReturnType<Guard['scan']>[number];
type Texts = Parameters<Guard['scan']>[0];

interface GuardRun {
  readonly guard: Guard;
  readonly found: readonly Finding[];
  readonly inScope: Readonly<Record<string, number>>;
  readonly rest: Readonly<Record<string, number>>;
  readonly ratchet: readonly string[];
  readonly layered: Texts;
  readonly list: readonly string[];
  readonly fileTexts: Texts;
}

function counted(
  found: readonly Finding[],
  inside: (file: string) => boolean,
): Readonly<Record<string, number>> {
  const counts = new Map<string, number>();
  for (const one of found.filter((each) => inside(each.file)))
    counts.set(one.kind, (counts.get(one.kind) ?? 0) + 1);
  return Object.fromEntries(counts);
}

function textsOf(
  mirror: Mirror,
  {
    files,
    fallback,
  }: { readonly files: readonly string[]; readonly fallback: string | null },
): Texts {
  return Object.fromEntries(
    files.map((file) => [file, ownText(file, mirror.readOr(file, fallback))]),
  );
}

// the scan over the guard's list and the layered files, the product's own findings last
function guardFindings({
  guard,
  files,
  layered,
  own,
}: {
  readonly guard: Guard;
  readonly files: Texts;
  readonly layered: Texts;
  readonly own: () => readonly Finding[];
}): readonly Finding[] {
  const both = { ...files, ...layered };
  return [
    ...guard.scan(files),
    ...guard.layersCheck(layered),
    ...guard.branchesCheck(both),
    ...guard.twiceCheck(both),
    ...guard.aboutCheck(both),
    ...own(),
  ];
}

// the product's own findings come from its entry point, never from a file read here
function guardRun(
  mirror: Mirror,
  own: () => readonly Finding[] = () => [],
): GuardRun {
  const guard: Guard = SOURCE_CHECK;
  const readList = guard.readList();
  const files = textsOf(mirror, { files: readList, fallback: '' });
  const layered = textsOf(mirror, {
    files: Object.keys(guard.layers),
    fallback: null,
  });
  const found = guardFindings({ guard, files, layered, own });
  const scope = new Set([...guard.scope, ...guard.targets(), 'messages.js']);
  return {
    guard,
    found,
    inScope: counted(found, (file) => scope.has(file)),
    rest: counted(found, (file) => !scope.has(file)),
    ratchet: guard.ratchet(found),
    layered,
    list: readList,
    fileTexts: {
      ...files,
    },
  };
}

export { guardRun };
export type { GuardRun };
