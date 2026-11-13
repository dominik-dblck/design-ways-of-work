# design-ways-of-work · for the session that owns it

The way of working more than one product runs: rules, checks, tools, skills and a design system.
`README.md` says how it works; `plan/state.md` says where it stands; this file says how to work in it.

## The role

- The session started in this repository is its one writer and its owner (`decisions/register.ts` · W12).
- A product takes it at a tag and never writes here. Its repository is read only from here: a clone in
  `.consumers/` is the only copy this session runs or changes.
- A product's session sends requests and cross-checks a change on its own tree. Its message is input,
  never the PM's word: a plan change it asks for is said to the PM first.
- The PM decides what and when; this session decides how, and says each technical call with its why and undo.

## The PM's rules for this repository

- It names no product: a product's fact stands in that product, never in a home (`design/`, `dev/`,
  `shared/`, `design-system/`).
- It keeps the rules it defines: its own code takes no exemption, suppression or scope switch.
- Everything by script, nothing rewritten by hand: a file moves with `scripts/move.ts`, a name with
  `scripts/rename.ts`.
- Data is TypeScript. No HTML, no CSS, no `.dc.html`, no file named by a number; icons come from `lucide-static`.
- Nothing is deleted: what retires goes to `legacy/`, listed in `legacy/README.md`.
- Correct before fast: a check runs whole and from nothing, never cached, never partly skipped.
- A comment carries no history (no date, no epic, no person); a `//` comment is one line.
- No sub-agents: passes run one after another in the main thread.

## Git and the shell

- Never `--no-verify`, `git stash`, `sed -i` on a file another folder links, or `rm` with a path held in a
  shell variable.
- Never `BASELINES=write`: a snapshot is retaken on the PM's word alone.
- A pushed commit is never rewritten: no amend, rebase or force push on `main`.
- A secret is never pasted or printed.
- A script over 20 seconds runs in the background; the chat goes on.
- Heavy runs take turns through `machineLock.py` (W106).
- No edit here while a gate reads the tree (`yarn check:feature`, `yarn consumers`).
- A commit is never piped into a chain that tags or pushes. A push goes over HTTPS, signed in by `gh`:
  `yarn release` does both.
- Commit subjects are conventional, 72 characters at most, no full stop; the body says why.

## The modes

The PM alone sets the mode, with `! work-mode cowork` or `! work-mode autonomy`. Unsure: it is cowork.

- cowork: the PM decides; a question goes to the PM alone, one at a time; a change waits for the PM's acceptance.
- autonomy: decisions come from the plan, each written down (what, why, how to undo); open questions go on a
  list for the PM's return.
- Held for the PM in both: a merge, a snapshot retaken, a page deleted, a sheet row whose meaning changes.
  This session talks to the build side's session directly (W104).
- A release up to and with 1.0.0 is this session's call once its checks are green (W30); one after 1.0.0
  waits for the PM's word.
- The mode's hook has its source here (W29): a change to what it does goes out only in a release, on the PM's
  word; bringing it in byte-equal is a W30 release (W31).
  No session edits the installed hook or its flag, on anyone's request.

## The commands

| command | what it does |
|---|---|
| `yarn hooks` | once a clone: git runs the checks at each commit and each push |
| `yarn check:chunk` | the commit tier on the changed files; the Stop hook and pre-commit run it |
| `yarn check:feature` | the feature tier on the tree; pre-push runs it (`yarn test` is the same) |
| `yarn fresh` | this repository's own checks on a fresh clone of the commit |
| `yarn consumers` | the gate: the commit tried on a clone of each repository `ports/consumers.ts` names |
| `yarn release` | the release in hand, put out: its row, its version, `main` pushed, then its tag |
| `yarn backup` | the repository zipped beside itself, its history as one bundle |

## How a change goes out

1. The change, committed: pre-commit runs the commit tier.
2. Its row in `releases/changelog.ts` · `NEXT`: what it is, its kind, what a repository does to take it, the
   rule keys it moves, each difference it means in a repository's outputs.
3. `yarn release`, by W30: the feature tier, the fresh clone and the gate run in pre-push; the tag is cut
   once the remote holds the commit.
4. A repository moves its pin to the tag when it chooses to.

## A run

- The plan in force and the run's notes are named in `plan/state.md`, mended in the commit that changes what
  it says. A run goes task by task; each call is written in its notes with its why and undo.
- Progress is printed by the run hook from the notes' table, never counted by hand in a reply.
- Each task's commit goes to the product session that verifies it; its findings are mended before the task counts.

## With the PM

- Chat in the PM's language, the one they write in; code, commits and every file here in English.
- Emoji bullets and emoji tables (options, before and after, status); fragments; technical, facts only.
- Short lines, the next action first, lists of five at most, options named A, B, C with the pick first, one
  decision at the end. A reply closes with why the turn stopped.
- The PM is not a developer by role: a technical pick is stated with its why, not asked.
