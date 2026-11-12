/**
 * - `refusalRows`, `byKey`, `bySubject`, `takes`, `refusalCoverage` · every refusal
 * - `refusalSentence`, `refusalSentenceFor`, `contract` · its sentence, its contract
 * - `actorKey`, `actorKeys`, `sharedKey`, `tiers`, `orderCheck` · 403s, the order
 */
import { BY_KEY, line, REFUSALS, takes } from './refusals/refusalCatalog.ts';
import { orderCheck } from './refusals/refusalOrder.ts';
import {
  ACTOR_KEY,
  REFUSAL_CONTRACT,
  SHARED_KEY,
  TIER,
  actorKey,
} from './refusals/refusalRows.ts';
import { say } from './refusals/refusalSentences.ts';
import type {
  RefusalCoverage,
  RefusalSubject,
  RefusalView,
} from './refusals/refusalsTypes.ts';
import * as COMMANDS from './commands.ts';

function all(): readonly RefusalView[] {
  return REFUSALS.map((refusal) => ({
    key: refusal.key,
    subject: refusal.subject,
    line: line(refusal.key),
    takes: takes(refusal.key),
    fix: refusal.fix,
    from: refusal.from,
    quoted: false,
    note: refusal.note,
    empty: refusal._empty,
  }));
}

function bySubject(): readonly RefusalSubject[] {
  const rows = all();
  const subjects = [...new Set(rows.map((row) => row.subject))];
  return subjects.map((subject) => ({
    subject,
    refusals: rows.filter((row) => row.subject === subject),
  }));
}

// both ways: every key a command names exists here, and every key here is reached by a command
function coverage(): RefusalCoverage {
  const used = new Set<string>();
  const unknown: string[] = [];
  for (const command of COMMANDS.all ?? []) {
    for (const key of command.refuses) {
      if (BY_KEY[key]) used.add(key);
      else unknown.push(`${command.id} → ${key}`);
    }
    const reached = actorKey(command);
    if (reached && BY_KEY[reached]) used.add(reached);
  }
  return {
    total: REFUSALS.length,
    quoted: 0,
    recoverable: REFUSALS.filter((refusal) => refusal.fix).length,
    templated: REFUSALS.filter((refusal) => takes(refusal.key).length).length,
    used: used.size,
    unused: REFUSALS.filter((refusal) => !used.has(refusal.key)).map(
      (refusal) => refusal.key,
    ),
    unknown,
  };
}

export {
  orderCheck,
  TIER as tiers,
  ACTOR_KEY as actorKeys,
  actorKey,
  SHARED_KEY as sharedKey,
  all as refusalRows,
  BY_KEY as byKey,
  line as refusalSentence,
  say as refusalSentenceFor,
  takes,
  bySubject,
  coverage as refusalCoverage,
  REFUSAL_CONTRACT as contract,
};
