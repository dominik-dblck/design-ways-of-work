/**
 * - `TRACES`, `AN_EPIC` · the marks of a chronicle: a date, a ticket, a stage, an epic
 * - read where words must hold without their history: comments, rules
 */

const MONTHS = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
const AN_EPIC = /(?<![\w#-])E\d{2}(?!\d)/g;
const TRACES: readonly (readonly [string, RegExp])[] = [
  ['a date', new RegExp(`\\b\\d{1,2} (?:${MONTHS})\\b`)],
  ['a ticket', /\bT-E\d{2}-\d{2}\b/],
  ['a criterion', /\bcriteri(?:on|a) \d|\bc\d{1,2}[a-z]? ·/i],
  ['a decision', /\(PM\b|\bPM, \d/],
  ['a stage', /\b(?:RED|GREEN)\b|\brecon [QF]\d+\b/],
];

export { AN_EPIC, TRACES };
