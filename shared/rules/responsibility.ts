/**
 * - `shared` · responsibility: the rules both sides keep, each side's gate beside it
 */
import type { SharedRule } from './sharedRuleTypes.ts';

// prettier-ignore
const shared: readonly SharedRule[] = [
  { rule: 'A production file opens with a header of 1–3 bullets, each at most 80 characters.', why: 'A fourth bullet is the file\'s second job showing; the split goes there.', design: { gate: '`aFileStatesItsJob`', exceptions: 'generated files · tests' }, build: { gate: '`aFileStatesItsJob`', exceptions: 'barrels · a `route.ts` that only re-exports · generated files · tests' } },
  { rule: 'Each bullet names, in backticks, the exports it describes; every exported value is in a bullet, and every name in backticks exists in the file.', why: 'A rename or a new export turns the gate red instead of leaving the header to lie.', design: { gate: '`aFileStatesItsJob`', exceptions: 'exported types, the vocabulary of the bullets' }, build: { gate: '`aFileStatesItsJob`', exceptions: 'exported types, the vocabulary the bullets are written in' } },
  { rule: 'A file exports at most 15 values.', why: 'Past 15 a file is a catalogue, and three bullets cannot say what it is.', design: { gate: '`aFileStatesItsJob`', exceptions: 'exported types · generated files · an entry passing on its parts\' values as its namespace, its bullets naming each part (D14)' }, build: { gate: '`aFileStatesItsJob`', exceptions: 'exported types · barrels · generated files' } },
  { rule: 'A value a production file exports is read by another file: imported by name, or with its module whole (`* as`, `export *`, `import()`, a glob); one only its own file reads is not exported.', why: 'An export no file imports is a door to nothing: its reader takes it for part of the file\'s offer.', design: { gate: '`anExportIsRead`', exceptions: 'a tool\'s export its `yarn` script runs · an entry\'s name the build side reads, listed in the scan at its sha (D14)' }, build: { gate: '`anExportIsRead`', exceptions: 'what Next reads off a file by its name (a route\'s verbs, a page\'s `metadata`) · a default · generated files' } },
];

export { shared };
