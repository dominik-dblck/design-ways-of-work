/**
 * - `rules` · constants: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/constants.ts';

const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: 'Here: URLs, route paths, keys, the words a person reads.',
  rows: [
    { rule: "`app/constants/` is flat, one file per feature (`refusalKindsConstants.ts`, `documentWords.ts`); a component's own constants sit in its `constants/` (`names.md`).", gate: '`theMapIsTheTree` (no sub-folder) · `aComponentFolderIsStructured`', exceptions: '—', why: "A constant is found by its feature's name, in one place." },
    { rule: 'A URL the browser calls is in `frontendApiConstants.ts` (`one-home.md`); one the server calls outside the app goes to `backendApiConstants.ts`, written the day there is one, and reads `process.env` on the server only.', gate: '`aUrlIsWrittenOnce`', exceptions: '—', why: "Each side knows its next hop, and no browser bundle carries a server's address." },
    { rule: "A page's path is in `appRoutesConstants.ts`.", gate: '`urlsForMapsEveryTarget` · `review`', exceptions: '—', why: 'A link and a redirect cannot point at two spellings of one page.' },
  ],
  outro: '',
});

export { rules };
