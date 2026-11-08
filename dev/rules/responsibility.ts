/**
 * - `rules` · responsibility: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Responsibility',
  intro: '\nA file does one job, and its first lines say which.\n',
  rows: [
    { rule: 'A production file, under `app/`, `packages/` or `scripts/`, opens with a header of 1–3 bullets, each at most 80 characters.', gate: '`aFileStatesItsJob`', exceptions: 'barrels · a `route.ts` that only re-exports · generated files · tests', why: 'A fourth bullet is the file\'s second job showing; the split goes there.' },
    { rule: 'Each bullet names, in backticks, the exports it describes; every exported value is in a bullet, and every name in backticks exists in the file.', gate: '`aFileStatesItsJob`', exceptions: 'exported types, the vocabulary the bullets are written in', why: 'A rename or a new export turns the gate red instead of leaving the header to lie.' },
    { rule: 'A file exports at most 15 values.', gate: '`aFileStatesItsJob`', exceptions: 'exported types · barrels · generated files', why: 'Past 15 a file is a catalogue, and three bullets cannot say what it is.' },
    { rule: 'A value a production file exports is read by another file: imported by name, or with its module whole (`* as`, `export *`, `import()`, a glob); one only its own file reads is not exported.', gate: '`anExportIsRead`', exceptions: 'what Next reads off a file by its name (a route\'s verbs, a page\'s `metadata`) · a default · generated files', why: 'An export no file imports is a door to nothing: its reader takes it for part of the file\'s offer.' },
    { rule: 'A file is read as one: its exported values, grouped by the production files that read them, are one job where a reader reads two of them, one uses the other, or both use a declaration the file keeps to itself; a file of two jobs or more is split.', gate: '`aFileIsReadAsOne`', exceptions: 'a group one file reads alone · types · the files on `readAsOne.json`, each with its why', why: 'Readers that never meet are two reasons to change kept in one file; a scan cannot see a subject, so the list says it where one holds.' },
    { rule: 'Each kind of code has its folder: rendering in `components/`, behaviour in `hooks/`, calls in `services/`, shared state in `providers/`, pure helpers in `utils/`, types in `types/`, words and values in `constants/`.', gate: '`aComponentFolderIsStructured` (the folders) · `review` (what lands in each)', exceptions: 'a component file holds its own props type', why: 'A file in the wrong folder is a file nobody looks for there.' },
    { rule: 'A screen holds no rule of the domain; it reads the domain\'s answer.', gate: '`theScreenReadsNoRules`', exceptions: '—', why: 'A rule copied onto a screen is decided twice, and the copies drift.' },
    { rule: 'Code one organism uses stays inside it; code several organisms use moves to the app folder of its kind; an entity\'s calls belong to `app/clients/{entity}/` from the first caller.', gate: '`aFileLivesWithItsOnlyUser`', exceptions: '—', why: 'A shared folder filled ahead of a second caller collects code nobody owns.' },
    { rule: 'A global folder (`app/services/`, `app/hooks/`) starts flat and groups a feature\'s files into a folder of their own once it holds several.', gate: '`review`', exceptions: '—', why: 'A flat folder reads at a glance until one feature crowds it.' },
  ],
  outro: '',
};

export { rules };
