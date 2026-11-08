/**
 * - `TRACES`, `AN_EPIC`, `MONTHS` · a chronicle's marks: date, ticket, stage, epic
 * - `epicOfFile` · the epic a part is named for, its names and comments may carry
 */

const MONTHS = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
const AN_EPIC = /(?<![\w#-])E\d{2}(?!\d)/g;
const TRACES: readonly (readonly [string, RegExp])[] = [
  ['a date', new RegExp(`\\b\\d{1,2} (?:${MONTHS})\\b`)],
  ['a ticket', /\bT-E\d{2}-\d{2}\b/],
  ['a criterion', /\bcriteri(?:on|a) \d|\bc\d{1,2}[a-z]? ·/i],
  ['a decision', /\(PM\b|\bPM, \d/],
  [
    'a stage',
    /\b(?:RED|GREEN)\b|\b(?:recon|contract|review|snapshot|regression)\b[^\n]{0,12}?\b[QFNDC]\d+\b/,
  ],
  [
    'a row, an edge or a finding',
    /\brows? \d+[a-z]?\b|\bfindings? \d|\bthe edge on\b|\bedges? \d|\bchecklist line \d/i,
  ],
];

// a part named for its epic is `{home}/{epic}{What}.ts`; any other holds none
const epicOfFile = (file: string): string | null =>
  /\/(E\d{2})[A-Za-z]*\.ts$/.exec(file)?.[1] ?? null;

export { AN_EPIC, epicOfFile, MONTHS, TRACES };
