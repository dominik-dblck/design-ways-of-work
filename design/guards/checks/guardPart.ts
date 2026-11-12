/**
 * - `guardPart` · part a: the guard's map and ratchet, screens' keys, copied rules,
 * - the words' checks, then the product's own lines
 */
import { capabilitiesLine } from './capabilitiesCheck.ts';
import { lineOf } from './checkWorld.ts';
import { decisionsLine } from './decisionsCheck.ts';
import { modesLine } from './modesCheck.ts';
import { rulesLine } from './rulesCheck.ts';
import { snapshotText } from './snapshotModule.ts';
import type { Mirror } from './checkWorld.ts';
import { guardRun } from './runChecks.ts';
import type { GuardRun } from './runChecks.ts';
import type { Product } from '../../tools/productTypes.ts';
import * as CONTENT_TYPE_LOGIC from '../../sheet/logic/assembly/contentTypeLogic.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';
import * as WIREFRAMES from '../../sheet/screens/wireframes.ts';

// what part a takes from the product, handed in by the entry point
type GuardPlugs = Pick<Product, 'guardFindings' | 'guardLines' | 'mapMoves'>;

// the architecture map's data: this run's findings, never counted again
function mapLine(
  run: GuardRun,
  {
    mirror,
    moves,
  }: { readonly mirror: Mirror; readonly moves: GuardPlugs['mapMoves'] },
): string {
  const drawn = run.guard.architecture(run.found, {
    texts: { ...run.fileTexts, ...run.layered },
    names: run.list,
    ...(moves === undefined ? {} : { moves: moves() }),
    layerNames: Reflect.get(CONTENT_TYPE_LOGIC, 'layers'),
  });
  const map = {
    ...drawn,
    ratchet: {
      baseline: run.guard.baseline,
      now: run.inScope,
      frozen: run.guard.frozen(),
      rest: run.rest,
    },
  };
  mirror.save('scraps/guardMap.ts', snapshotText('guardMap', map));
  return lineOf('architecture map', {
    ok: map.files.length > 0,
    text: `${map.files.length} files · ${map.links.length} links · ${map.quiet.length} read, nothing to draw · scraps/guardMap.ts`,
  });
}

// a screen is named by its key, its number wireframes.js' alone: every backlog screen a key
function screenKeysLine(mirror: Mirror): string {
  const keys: Readonly<Record<string, unknown>> = WIREFRAMES.byKey;
  const family: Readonly<Record<string, unknown>> = WIREFRAMES.family;
  const bad = (mirror.read('backlog.js').match(/screens:\s*\[[^\]]*\]/g) ?? [])
    .flatMap((screensLine) => screensLine.match(/'([^']+)'/g) ?? [])
    .map((quoted) => quoted.slice(1, -1))
    .filter((key) => !keys[key] && !family[key] && key !== 'all')
    .map((key) => `backlog ${key}`);
  return lineOf('screen keys', {
    ok: !bad.length,
    text: bad.length
      ? bad.slice(0, 8).join(' · ')
      : `${Object.keys(keys).length} screens, every reference a key`,
  });
}

function countLines(run: GuardRun): readonly string[] {
  const kind = (name: string): readonly string[] =>
    run.found.filter((one) => one.kind === name).map((one) => one.text);
  const words = MESSAGES.messageRowsCheck();
  return [
    lineOf('layers', {
      ok: true,
      text: `${kind('read upwards').length} reads upwards (held by the ratchet)`,
    }),
    lineOf('type-name branches', {
      ok: true,
      text: `${kind('branch on a type name').length} (held by the ratchet)`,
    }),
    lineOf('content-check', {
      ok: !kind('content').length,
      text: kind('content').join(' | ') || '0',
    }),
    lineOf('Messages.messageRowsCheck', {
      ok: !words.length,
      text: words.join(' | ') || '0',
    }),
  ];
}

function guardPart(mirror: Mirror, plugs: GuardPlugs = {}): readonly string[] {
  const run = guardRun(mirror, plugs.guardFindings);
  return [
    mapLine(run, { mirror, moves: plugs.mapMoves }),
    lineOf('ratchet', {
      ok: !run.ratchet.length,
      text: run.ratchet.length ? JSON.stringify(run.ratchet) : '0',
    }),
    screenKeysLine(mirror),
    capabilitiesLine(mirror),
    decisionsLine(),
    modesLine(mirror),
    rulesLine(),
    ...countLines(run),
    ...(plugs.guardLines?.(mirror) ?? []),
  ];
}

export { guardPart };
