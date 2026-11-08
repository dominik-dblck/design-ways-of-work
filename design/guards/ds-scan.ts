/**
 * - `run` · where wireframes drift from the DS · `{ files, tokensCss, dsCss, map }`
 * - its answer names each rule, with the drift it caught the day it was written
 * - the scales come off tokens.css and colors_and_type.css, never a list here
 */
import { contrast, hex, ink, micro, role } from './ds-scan/colourRules.ts';
import type {
  Drift,
  Rule,
  Scales,
  ScanContext,
  ScanCounts,
  ScanFile,
  ScanResult,
  SpecMap,
} from './ds-scan/dsScanTypes.ts';
import {
  chromeRanges,
  cssParses,
  inChrome,
  isBoardPage,
  lineOf,
  stripComments,
} from './ds-scan/fileScope.ts';
import { pair } from './ds-scan/pairRule.ts';
import { cssVars, scalesFrom } from './ds-scan/scales.ts';
import {
  glyph,
  height,
  literal,
  mark,
  radius,
  zindex,
} from './ds-scan/scaleRules.ts';
import { shape } from './ds-scan/shapeRule.ts';
import {
  ghostLine,
  hover,
  legend,
  paper,
  specWidth,
  wash,
} from './ds-scan/surfaceRules.ts';
import { tint, tintLogic, tintUnknown } from './ds-scan/tintRules.ts';
import { themes } from './ds-scan/tokenGraph.ts';

const RULES: readonly Rule[] = [
  height,
  glyph,
  mark,
  radius,
  hex,
  zindex,
  literal,
  role,
  ink,
  micro,
  contrast,
  tintLogic,
  tintUnknown,
  specWidth,
  ghostLine,
  hover,
  wash,
  legend,
  pair,
  tint,
  shape,
  paper,
];

interface Tally {
  readonly findings: Drift[];
  readonly byRule: Record<string, Drift[]>;
  readonly counts: ScanCounts;
  // kind → file → its row · a shape is a finding only once three files draw it
  readonly shapeHits: Record<string, Record<string, Drift>>;
}

function record(tally: Tally, row: Drift): void {
  tally.findings.push(row);
  tally.byRule[row.rule].push(row);
  tally.counts.findings += 1;
}

// a shape a page draws counts once per page, so what repeats across pages shows
function holdShape(
  tally: Tally,
  { base, row }: { readonly base: string; readonly row: Drift },
): void {
  tally.shapeHits[row.value] = tally.shapeHits[row.value] ?? {};
  tally.shapeHits[row.value][base] = row;
}

function scanFile(
  file: ScanFile,
  {
    scales,
    ctx,
    tally,
  }: {
    readonly scales: Scales;
    readonly ctx: ScanContext;
    readonly tally: Tally;
  },
): void {
  const base = String(file.name).replace(/\.dc\.html$/, '');
  if (isBoardPage(base)) return;
  const chrome = chromeRanges(file.text);
  // the same length as the file, so a hit's index still maps to the real line
  const scannable = stripComments(file.text);
  for (const rule of RULES) {
    if (rule.exemptFiles?.includes(base)) continue;
    rule.run(scannable, {
      scales,
      push: (hit) => {
        if (rule.chromeAware !== false && inChrome(chrome, hit.at)) return;
        const row: Drift = {
          rule: rule.id,
          file: file.name,
          value: hit.value,
          want: hit.want,
          line: lineOf(file.text, hit.at),
        };
        if (rule.id === 'shape') holdShape(tally, { base, row });
        else record(tally, row);
      },
      ctx,
    });
  }
}

// one or two drawings is a drawing
function settleShapes(tally: Tally): void {
  for (const [kind, byFile] of Object.entries(tally.shapeHits)) {
    const inFiles = Object.keys(byFile);
    if (inFiles.length < 3) continue;
    const row = byFile[inFiles[0]];
    row.files = inFiles;
    row.value = `${kind} · ${inFiles.length} files`;
    record(tally, row);
  }
}

function knownOf(map: SpecMap | null | undefined): string[] | null {
  if (!map?.rows) return null;
  return [...new Set(map.rows.flatMap((row) => row.fingerprints ?? []))];
}

// without a map the shape rule stays quiet
function run({
  files,
  tokensCss,
  dsCss,
  map,
}: {
  readonly files: readonly ScanFile[];
  readonly tokensCss?: string | null;
  readonly dsCss?: string | null;
  readonly map?: SpecMap | null;
}): ScanResult {
  const cssBad = cssParses(tokensCss || '');
  if (cssBad.length)
    throw new Error(`ds-scan · tokens.css is not CSS · ${cssBad.join(' · ')}`);
  const css = `${tokensCss || ''}\n${dsCss || ''}`;
  const scales = scalesFrom(css);
  const known = knownOf(map);
  const ctx: ScanContext = { known, themes: themes(css), vars: cssVars(css) };
  const tally: Tally = {
    findings: [],
    byRule: Object.fromEntries(RULES.map((rule) => [rule.id, []])),
    counts: { files: files.length, findings: 0 },
    shapeHits: {},
  };
  for (const file of files) scanFile(file, { scales, ctx, tally });
  settleShapes(tally);
  return {
    findings: tally.findings,
    byRule: tally.byRule,
    counts: tally.counts,
    rules: RULES,
    scales,
    mapped: Boolean(known),
  };
}

export { run };
