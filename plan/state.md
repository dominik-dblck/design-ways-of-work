# State · design-ways-of-work

What is true now, and nothing else. It is mended in the commit that changes what it says.
A past log stands in `plan/log/` as it was written: its paths and its plans are that day's.

## Where to read what

- How it works: `README.md`. How to work in it: `CLAUDE.md`.
- The version: `package.json`. Each release and what it moved: `releases/changelog.ts`.
- The plan in force: `plan/argus-first.md`, accepted for the design side; the build side is parked.
- The run in hand: `plan/run-11-nov.md`. Its table is the progress; its calls each say why and how to undo.
- The PM's decisions: `decisions/register.ts`.
- The review behind the plan: `plan/review-11-nov.md`, dated 11 Nov; the plan replaces its sections 7 and 8.
- A sketch for the parked build side: `plan/browser-tier.md`.

## Who takes it

- `ports/consumers.ts` names each repository the gate tries, and the branch it tries.
- eagle-design: its branch `port/wow` takes the tag v0.5.0 (d81fcef, its session's, not pushed yet); its
  `main` still runs on its own copies. The gate tries it on its newest `main` (W22): each clone takes the
  trunk by the port's script. A migration is in hand: v0.6.0 homes the roadmap's sixteen readers, its gate
  green on 2c6ccc0 (twenty differences, each expected).
- argus-design: not spawned yet; its stack is decided, the one this repository defines (W24).
- The build side: `dev/` is copied from its repository by script; its port is parked.

## What holds a change

- A commit: the commit tier (`yarn check:chunk`), by pre-commit and by the Stop hook.
- A push: the feature tier (`yarn check:feature`), by pre-push, only for a commit the remote lacks under that
  ref, and only from a clean checkout that stands on the commit pushed. It ends with the release's and the
  gate's tests on scratch repositories, this repository's own checks on a fresh clone, then the gate.
- A release: `yarn release`, one command, on the PM's word.

## Open for the PM

1. The rules in `CLAUDE.md` reached this session relayed, on 11 Nov: read once, confirm or strike.
2. A word to talk to the build side's session, before its stage starts.
3. v0.6.0, a major (the roadmap's readers homed; the cases' join it if they land first): out on the PM's
   word. eagle-design takes it after, in one commit with its pin.
4. `.rehearsal/` on this machine's disk, 191 MB of the extraction's copies, ignored by git: remove or keep.
5. Three rules eagle-design says the PM holds there and `CLAUDE.md` lacks: never `BASELINES=write`; a pushed
   commit is never rewritten (no amend, rebase or force push on `main`); a secret is never pasted or printed.
   This session keeps the last two already. None is written into `CLAUDE.md` on a product session's word.
6. On eagle-design's `main` the checks run three parts the port took out with the pages (the list, the pages,
   the props). Whether a product's board, pages and props get a check part again, in TypeScript.
7. The build side's theme freed of its app (W26 step 3: the preference attribute in a file of its own, the
   batch and sent chips out of the shared theme): eagle-dev asks the PM's yes in its own session, after its
   audit fix. Task 19 waits on it.

## Known gaps

- The homes still name Eagle: its ids, names and paths, in the files the plan counted. The plan's stage 2.
- A change that holds no file still runs prettier and cspell with no file named, green by accident.
  A home (`shared/checkTiers.ts`): stage 2.
- `design/tools/build.ts` removes its output folder with all it holds, outside the guard. A home: stage 2.
- The checks that clone are a list in `scripts/scratch.ts`; a field of the scope would change a home's type:
  stage 2.
- A commit pushed straight to `main` from a clone with no hooks is checked by nothing here: a branch
  protection on the remote alone closes that.
- The hooks outside every repository (the work mode, the run bars) are not versioned or tested here.
- A port that takes its trunk takes the trunk's generated copies too (`vendor/wow/`, the emitted skills):
  the port's build writes them back from its pin, so they settle at the next take. `scripts/portMerge.ts`
  could keep the port's side for what a build writes.
- `scripts/move.ts` keeps a product's notebooks as written but does not refuse a move of what one imports,
  as the migration does: the clone's tsc shows it.
- A halt explains a file by the command that first wrote it: a new file of a halted `yarn build` passes as
  the halt's, not as its own.
