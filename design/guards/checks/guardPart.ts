/**
 * - `guardPart` · part a: the guard's map and ratchet, screens' keys, copied rules,
 * - the words' checks, the pools and Measure.run
 */
import { capabilitiesLine } from './capabilitiesCheck.ts';
import { lineOf } from './checkWorld.ts';
import { decisionsLine } from './decisionsCheck.ts';
import { modesLine } from './modesCheck.ts';
import { rulesLine } from './rulesCheck.ts';
import type { Mirror } from './checkWorld.ts';
import { measureLines } from './measureCheck.ts';
import { copiedRulesLine } from './copiedRules.ts';
import { poolsLine } from './parsePools.ts';
import { guardRun } from './runChecks.ts';
import type { GuardRun } from './runChecks.ts';
import * as CONTENT_TYPE_LOGIC from '../../sheet/logic/assembly/content-type-logic.ts';
import * as MESSAGES from '../../sheet/words/messages.ts';
import * as MESSAGES_CONTENT from '../../sheet/words/messages-content.ts';
import * as WIREFRAMES from '../../sheet/screens/wireframes.ts';

// the architecture map's data: this run's findings, never counted again
function mapLine(run: GuardRun, mirror: Mirror): string {
  const drawn = run.guard.architecture(run.found, {
    texts: { ...run.fileTexts, ...run.layered },
    names: run.list,
    moves: CONTENT_TYPE_LOGIC.factMoves(),
    layerNames: Reflect.get(CONTENT_TYPE_LOGIC, 'layers'),
  });
  const map = {
    ...drawn,
    at: new Date().toISOString(),
    ratchet: {
      baseline: run.guard.baseline,
      now: run.inScope,
      frozen: run.guard.frozen(),
      rest: run.rest,
    },
  };
  mirror.save('scraps/guard-map.json', JSON.stringify(map));
  return lineOf('architecture map', {
    ok: map.files.length > 0,
    text: `${map.files.length} files · ${map.links.length} links · ${map.quiet.length} read, nothing to draw · scraps/guard-map.json`,
  });
}

// a screen is named by its key, its number wireframes.js' alone: every backlog screen a key
function screenKeysLine(mirror: Mirror): string {
  const keys: Readonly<Record<string, unknown>> = WIREFRAMES.byKey;
  const family: Readonly<Record<string, unknown>> = WIREFRAMES.family;
  const bad = (mirror.read('backlog.js').match(/screens:\s*\[[^\]]*\]/g) ?? [])
    .flatMap((list) => list.match(/'([^']+)'/g) ?? [])
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
  const typeWords = MESSAGES_CONTENT.typeWordsCheck();
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
    lineOf('MessagesContent.typeWordsCheck', {
      ok: !typeWords.length,
      text: typeWords.join(' | ') || '0',
    }),
  ];
}

function guardPart(mirror: Mirror): readonly string[] {
  const run = guardRun(mirror);
  return [
    mapLine(run, mirror),
    lineOf('ratchet', {
      ok: !run.ratchet.length,
      text: run.ratchet.length ? JSON.stringify(run.ratchet) : '0',
    }),
    screenKeysLine(mirror),
    copiedRulesLine(mirror),
    capabilitiesLine(mirror),
    decisionsLine(),
    modesLine(mirror),
    rulesLine(),
    ...countLines(run),
    poolsLine(mirror),
    ...measureLines(mirror),
  ];
}

export { guardPart };
