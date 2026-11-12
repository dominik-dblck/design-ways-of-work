/**
 * - `assemblyFindings` · the content types' assembly, as source guard findings
 * - each type's slots and parity, a part used twice, the content's checks
 */
import { contentCheck } from '../sourceCheck.ts';
import type { SourceFinding } from '../sourceCheck.ts';
import * as CONTENT_CHECK from '../../sheet/logic/assembly/contentCheck.ts';
import * as CONTENT_TYPE_LOGIC from '../../sheet/logic/assembly/contentTypeLogic.ts';

const assemblyFinding = (row: string, text: string): SourceFinding => ({
  kind: 'assembly',
  row,
  file: 'contentTypeLogic.js',
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

function assemblyFindings(): readonly SourceFinding[] {
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
    ...contentCheck({ ContentCheck: CONTENT_CHECK }),
  ];
}

export { assemblyFindings };
