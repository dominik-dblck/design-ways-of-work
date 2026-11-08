/**
 * - `guardRun` · every guard check over every file the guard lists
 * - `GuardRun` · the findings, their counts in the scope and outside
 */
import { ownText } from './bundleText.ts';
import type { Mirror } from './checkWorld.ts';
import * as CONTENT_CHECK from '../../sheet/logic/assembly/content-check.ts';
import * as CONTENT_TYPE_LOGIC from '../../sheet/logic/assembly/content-type-logic.ts';
import * as SOURCE_CHECK from '../source-check.ts';

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

const assemblyFinding = (row: string, text: string): Finding => ({
  kind: 'assembly',
  row,
  file: 'content-type-logic.js',
  line: 0,
  text,
});

// a type's parity with today: the lines that differ, when it differs
function parityLines(parity: unknown): readonly unknown[] {
  const lines: unknown = Reflect.get(Object(parity), 'lines');
  return Reflect.get(Object(parity), 'state') === 'differs' &&
    Array.isArray(lines)
    ? lines
    : [];
}

function assemblyFindings(guard: Guard): readonly Finding[] {
  const assembly = CONTENT_TYPE_LOGIC.assembly;
  const typed = assembly.types.flatMap((type) => {
    const built = assembly.assemble(type.slug);
    if (!built)
      throw new TypeError("Cannot read properties of null (reading 'issues')");
    return [
      ...built.issues.map((issue) =>
        assemblyFinding(
          'the skeleton’s slots (T28)',
          `${type.slug} · ${issue}`,
        ),
      ),
      ...parityLines(built.parity).map((one) =>
        assemblyFinding(
          'parity with today (T23)',
          `${type.slug} · ${String(one)}`,
        ),
      ),
    ];
  });
  return [
    ...typed,
    ...assembly
      .usage()
      .filter((use) => !use.ok)
      .map((use) =>
        assemblyFinding(
          'a part used twice (T23b)',
          `${use.key} used by ${use.by.length}`,
        ),
      ),
    ...assembly
      .conflicts()
      .map((one) => assemblyFinding('no field set by two parts (T23b)', one)),
    ...guard.contentCheck({ ContentCheck: CONTENT_CHECK }),
  ];
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

// the scan over the guard's list, the layered files and the components' spec
function guardFindings({
  mirror,
  guard,
  files,
  layered,
}: {
  readonly mirror: Mirror;
  readonly guard: Guard;
  readonly files: Texts;
  readonly layered: Texts;
}): readonly Finding[] {
  const spec = mirror.readOr('components.spec.json', null);
  const both = { ...files, ...layered };
  return [
    ...guard.scan(files),
    ...guard.layersCheck(layered),
    ...guard.branchesCheck(both),
    ...guard.twiceCheck(both),
    ...guard.aboutCheck({ ...both, 'components.spec.json': spec }),
    ...assemblyFindings(guard),
  ];
}

function guardRun(mirror: Mirror): GuardRun {
  const guard: Guard = SOURCE_CHECK;
  const readList = guard.readList();
  const files = textsOf(mirror, { files: readList, fallback: '' });
  const layered = textsOf(mirror, {
    files: Object.keys(guard.layers),
    fallback: null,
  });
  const found = guardFindings({ mirror, guard, files, layered });
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
      'components.spec.json': mirror.readOr('components.spec.json', null),
    },
  };
}

export { guardRun };
export type { GuardRun };
