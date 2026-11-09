/**
 * - `lonelyHelpersIn` · each helper fewer than two tiers import, and the tiers that do
 */
import ts from 'typescript';
import type { Tier } from '../testTiers.ts';

interface Source {
  readonly file: string;
  readonly text: string;
}

// what a helper is read against: its folder, the tiers, its exemptions, and a file's imports resolved
interface Against {
  readonly root: string;
  readonly tiers: readonly Tier[];
  readonly exempt: readonly string[];
  readonly resolve: (specifier: string, file: string) => string | null;
}

const importsIn = (text: string): readonly string[] =>
  ts.preProcessFile(text, true, true).importedFiles.map((one) => one.fileName);

function lonelyHelpersIn(
  sources: readonly Source[],
  { root, tiers, exempt, resolve }: Against,
): readonly string[] {
  const deepestFirst = [...tiers].sort(
    ([one], [other]) => other.length - one.length,
  );
  const tierOf = (file: string): string =>
    deepestFirst.find(([folder]) => file.startsWith(folder))?.[1] ?? file;
  const isAHelper = (file: string): boolean => file.startsWith(`${root}/`);
  const by = new Map<string, ReadonlySet<string>>();
  for (const { file, text } of sources.filter((one) => !isAHelper(one.file)))
    for (const target of importsIn(text).map((one) => resolve(one, file)))
      if (target !== null && isAHelper(target))
        by.set(target, new Set([...(by.get(target) ?? []), tierOf(file)]));
  return sources
    .map(({ file }) => file)
    .filter((file) => isAHelper(file) && !exempt.includes(file))
    .filter((helper) => (by.get(helper)?.size ?? 0) < 2)
    .map(
      (helper) =>
        `${helper} · ${[...(by.get(helper) ?? [])].sort().join(', ') || 'no tier'}`,
    )
    .sort();
}

export { lonelyHelpersIn };
