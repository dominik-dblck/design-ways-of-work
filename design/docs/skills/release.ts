/**
 * - `skill` · design-release: what it does, when to use it, its sections
 */
import type { SkillFile } from './skillTypes.ts';

const skill: SkillFile = {
  title: 'design-release · a release to the build side',
  description:
    "Releases a commit to the build side: the tag, the full sha and every file's sha256 in the message, and a commit that is never rewritten. Use when the PM says to release.",
  intro: "A release goes out only with the PM's word (D6).",
  sections: [
    {
      heading: 'Steps',
      lead: null,
      first: 1,
      lines: [
        'A release is a pushed commit on `main`: tag it `release-<yyyy-mm-dd>-<n>` and name it in the message as `release <full sha>`, with the sha256 of every file the message is about (`shasum -a 256 <its repository path>`).',
        'Its record is `records/release-<version>.md`: write its head (the title, What it carries), then `yarn release:record <version>` writes every module the build side reads (`sheet/project.ts` · buildReads) with every module they import, and every file of each, each with its digest, and reads them back from the tree. Nothing below the head is written by hand.',
        "The build side reads `git cat-file blob <sha>:{file}`, the path from the repository's root, and nothing it was not named; it takes a digest from a record alone.",
      ],
    },
    {
      heading: 'Never',
      lead: null,
      first: null,
      lines: [
        'A released commit is never rewritten: no amend, rebase or force push on `main`, no gc that drops it. A run may hold a sha for days.',
      ],
    },
  ],
};

export { skill };
