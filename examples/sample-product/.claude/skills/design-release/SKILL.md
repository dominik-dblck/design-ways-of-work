---
name: design-release
description: "Releases a commit to the build side: the tag, the full sha and every file's sha256 in the message, and a commit that is never rewritten. Use when the PM says to release."
---

<!-- Written by `yarn build` from `docs/skills/release.ts`: edit the data, never this file. -->

# design-release · a release to the build side

A release goes out only with the PM's word (W36).

## Steps

1. A release is a pushed commit on `main`: tag it `release-<yyyy-mm-dd>-<what>`, `<what>` one to three lowercase words joined by hyphens, saying what the release does, and name it in the message as `release <full sha>`, with the sha256 of every file the message is about (`shasum -a 256 <its repository path>`).
2. Its record is `records/release-<version>.md`: write its head (the title, What it carries), then `yarn release:record <version>` writes every module the build side reads (`sheet/project.ts` · buildReads) with every module they import, and every file of each, each with its digest, and reads them back from the tree. Nothing below the head is written by hand.
3. The build side reads `git cat-file blob <sha>:{file}`, the path from the repository's root, and nothing it was not named; it takes a digest from a record alone.

## Never

- A released commit is never rewritten: no amend, rebase or force push on `main`, no gc that drops it. A run may hold a sha for days.
