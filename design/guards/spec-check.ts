/**
 * - `run` · components.spec.json holds together: logs each finding, throws if any
 * - `SpecRow` · a row of the components spec
 * - a run that prints nothing has not run · each check is a drift already seen
 */
import {
  changedFindings,
  ownerFindings,
  scopeFindings,
} from './spec-check/ownerChecks.ts';
import {
  partsFindings,
  stateFindings,
  tokenFindings,
  wrapperFindings,
} from './spec-check/rowChecks.ts';
import type { ScriptIo, Spec, TieredRow } from './spec-check/specCheckTypes.ts';
import { TOKEN_NAMES } from '../app/styles/tokens.ts';

// every token design-system/ and the product declare, by the name a spec row cites
const declaredTokens = (): Set<string> => new Set(Object.values(TOKEN_NAMES));

function rowsOf(spec: Spec): TieredRow[] {
  return [
    ...spec.atoms.map((row) => ({ ...row, tier: 'atoms' as const })),
    ...spec.molecules.map((row) => ({ ...row, tier: 'molecules' as const })),
    ...spec.organisms.map((row) => ({ ...row, tier: 'organisms' as const })),
  ];
}

function duplicateIds(rows: readonly TieredRow[]): string[] {
  const seen = new Set<string>();
  return rows.flatMap((row) => {
    const wasSeen = seen.has(row.id);
    seen.add(row.id);
    return wasSeen ? [`7 · duplicate id ${row.id}`] : [];
  });
}

function countsOf(spec: Spec): Record<string, number> {
  const tokens = new Set(
    [...JSON.stringify(spec).matchAll(/--[\w-]+/g)].map((found) => found[0]),
  );
  return {
    atoms: spec.atoms.length,
    molecules: spec.molecules.length,
    organisms: spec.organisms.length,
    tokens: tokens.size,
  };
}

async function run(io: ScriptIo): Promise<void> {
  const spec: Spec = JSON.parse(await io.readFile('components.spec.json'));
  const declared = declaredTokens();
  const rows = rowsOf(spec);
  const organisms = new Set(spec.organisms.map((row) => row.id));
  const findings = [
    ...duplicateIds(rows),
    ...partsFindings(rows, spec),
    ...tokenFindings(rows, declared),
    ...stateFindings(spec),
    ...rows.flatMap(wrapperFindings),
    ...rows.flatMap((row) => scopeFindings(row, organisms)),
    ...rows.flatMap(ownerFindings),
    ...rows.flatMap(changedFindings),
  ];
  io.log(
    `spec-check · ${JSON.stringify(countsOf(spec))} · ${findings.length ? `${findings.length} findings` : 'clean'}`,
  );
  findings.forEach((finding) => io.log(`  ${finding}`));
  if (findings.length)
    throw new Error(`spec-check · ${findings.length} findings`);
}

export { run };
export type { SpecRow } from './spec-check/specCheckTypes.ts';
