/**
 * - `rules` · responsibility: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/responsibility.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: '',
  rows: [
    { rule: 'A file is read as one: its exported values, grouped by the production files that read them, are one job where a reader reads two of them, one uses the other, or both use a declaration the file keeps to itself; a file of two jobs or more is split.', gate: '`aFileIsReadAsOne`', exceptions: 'a group one file reads alone · types · the files on `readAsOne.json`, each with its why', why: 'Readers that never meet are two reasons to change kept in one file; a scan cannot see a subject, so the list says it where one holds.' },
    { rule: 'Each kind of code has its folder: rendering in `components/`, behaviour in `hooks/`, calls in `services/`, shared state in `providers/`, pure helpers in `utils/`, types in `types/`, words and values in `constants/`.', gate: '`aComponentFolderIsStructured` (the folders) · `review` (what lands in each)', exceptions: 'a component file holds its own props type', why: 'A file in the wrong folder is a file nobody looks for there.' },
    { rule: 'A screen holds no rule of the domain; it reads the domain\'s answer.', gate: '`theScreenReadsNoRules`', exceptions: '—', why: 'A rule copied onto a screen is decided twice, and the copies drift.' },
    { rule: 'Code one organism uses stays inside it; code several organisms use moves to the app folder of its kind; an entity\'s calls belong to `app/clients/{entity}/` from the first caller.', gate: '`aFileLivesWithItsOnlyUser`', exceptions: '—', why: 'A shared folder filled ahead of a second caller collects code nobody owns.' },
    { rule: 'A global folder (`app/services/`, `app/hooks/`) starts flat and groups a feature\'s files into a folder of their own once it holds several.', gate: '`review`', exceptions: '—', why: 'A flat folder reads at a glance until one feature crowds it.' },
  ],
  outro: '',
});

export { rules };
