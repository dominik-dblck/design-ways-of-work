/**
 * - `skill` · design-publish: what it does, when to use it, its sections
 */
import type { SkillFile } from './skillTypes.ts';

const skill: SkillFile = {
  title: 'design-publish · the artifact',
  description:
    "Publishes the design project to the artifact, the PM's render and, until the switch commit lands, the release the build side reads: commit, build, one Artifact call, the tag. Use when a change has to reach the PM's view or the build side's read.",
  intro:
    "The artifact is the PM's render and the release the build side reads: `https://claude.ai/code/artifact/8b4b404b-411c-4d45-bf56-d453654b0289` (a Migrated Design artifact, its page list `legacy/compat.json`). What is not published, the build side does not see. Publishing goes only from here.",
  sections: [
    {
      heading: 'Steps',
      lead: null,
      first: 1,
      lines: [
        'Commit first. The files to publish are those `git diff --name-only <last published-* tag> HEAD` names in the homes, each at its published path (`tools/layout.ts · publishedOf`, under `project/`).',
        '`yarn build`, then one Artifact call: `url` as above, `root: "dist"`, `file_path: "dist/project/compat.json"` (always, unchanged unless pages are added, removed or reordered — keep its `report` as it is), `files:` every file changed, `{"project/tickets.js": "project/tickets.js"}`; a removed file `null`. Never write `index.html`, `SKILL.md` or `artifact-type/`.',
        'Tag the commit `published-<version id>` from the result.',
        'Refused with "You haven\'t viewed the latest version" (a new session, or after a compaction): a plain `read` of the url (no `path`/`paths`) counts as viewing it, a `paths` read does not; then publish again.',
      ],
    },
    {
      heading: 'Held',
      lead: null,
      first: null,
      lines: [
        'A sheet edit, its re-cut pack and its digests go out in the same move.',
        "A page removed is a deletion: only with the PM's word.",
      ],
    },
  ],
};

export { skill };
