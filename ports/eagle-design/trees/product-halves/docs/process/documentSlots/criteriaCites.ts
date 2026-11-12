/**
 * - `CRITERIA_CITES` · the lines the criteria skill asks this product for
 */
const CRITERIA_CITES: Readonly<Record<string, string>> = {
  'criteria.parts':
    'A campaign is a folder of documents in the UI: `folder-*` / `document-*` parts are global, the organism hands them their words. `rule:campaign-is-a-folder`',
  'criteria.roles':
    'Who writes what and who sees what are the product’s rules (`sheet/rules/`), read before a criterion that touches them. `rule:a-block-has-no-owner, rule:every-role-sees-everything`',
  'criteria.model': [
    'Block ids: read rule:short-random-block-ids in `sheet/rules/architectureRules.ts` (short, random, who mints them)',
    'A command’s route stands on a typed row: its ticket types `sheet/contract/commands.ts · body` (`field: Type`, `writes`) at refinement; prose has no route. `rule:command-body-is-typed`',
  ].join('\n'),
  'criteria.refusals':
    'A 403 names who can: one refusal key per actor set, its sentence on the sheet at the first command with that set. `rule:refusal-per-actor-set`',
  'criteria.reads': [
    'A stated read is checked in the decide at version_moved’s tier; the claim stays the guard in the write; a version alone is a rule. `rule:decide-checks-the-stated-read`',
    'A refusal with a line shows where the press was: in its window with what was typed, or as the notification when there is no window. `rule:refusal-shows-where-pressed`',
    'A list page is one statement on current snapshots; a stale one heals once, apart and uncounted. `rule:one-statement-per-page`',
  ].join('\n'),
};

export { CRITERIA_CITES };
