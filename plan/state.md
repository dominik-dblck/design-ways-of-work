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
- eagle-design: its branch `port/wow` takes the tags, each by its migrations (v0.18.0 at 04628ac);
  v0.19.0 is out for it to take. Its `main` still runs on its own copies and takes the port's line at stage 3
  (its fast-forward is the PM's word). The gate tries `port/wow`, taking `main` by the port's script.
- argus-design: not spawned yet; its stack is decided, the one this repository defines (W24).
- `examples/sample-product`: the smallest product, naming none; `yarn sample` builds it from nothing on the
  tree's homes and runs its feature tier, ten of ten green; this repository's feature tier runs it. It takes
  no `dev/`, as a new design product does not.
- The build side: `dev/` is copied from its repository by script and taken by eagle-design alone; its port is
  parked.

## What holds a change

- A commit: the commit tier (`yarn check:chunk`), by pre-commit and by the Stop hook.
- A push: the feature tier (`yarn check:feature`), by pre-push, only for a commit the remote lacks under that
  ref, and only from a clean checkout that stands on the commit pushed. It ends with the release's and the
  gate's tests on scratch repositories, this repository's own checks on a fresh clone, then the gate.
- A release: `yarn release`, one command; up to and with 1.0.0 this session's call once its checks are
  green (W30).

## Open for the PM

1. `CLAUDE.md` says icons come from `lucide-static`; the build side's atoms draw with `lucide-react` behind
   one wrapper (eagle-design's D10: a static page reads the first, a React component the second). The rule's
   words: one package, or the split. The copy carries `lucide-react` meanwhile.

The PM's word of 13 Nov (W104) settled the rest: the relayed rules stand with three more, this session talks to
the build side's session directly, `.rehearsal/` is in this machine's Trash, and a product's board, pages and
props get a check part (a task after v1.0.0). Task 23 has its sha: eagle-dev's 1491dd3d on
`feature/W26-shared-theme`, read by `git archive`, nothing merged.

## Known gaps

- `dev/` is Eagle's build side as its repository wrote it, names and all; a new design product takes none of
  it until the build side's port (the plan's stage 4) makes it any product's.
- A home's export no product reads is found by no check: knip in a product reads the taken files as entries.
- A commit pushed straight to `main` from a clone with no hooks is checked by nothing here: a branch
  protection on the remote alone closes that.
- Two user hooks stay outside: `slackAtStop.py` holds a person's Slack id, `peerReview.py` this repository's
  path and its peer by name. Each becomes a home once that data moves to a local file it reads. Where a hook
  is wired is each repository's own `settings.local.json`: this repository's runs the bars, not the mode.
- A port that takes its trunk takes the trunk's generated copies too (`vendor/wow/`, the emitted skills):
  the port's build writes them back from its pin, so they settle at the next take. `scripts/portMerge.ts`
  could keep the port's side for what a build writes.
- `scripts/move.ts` keeps a product's notebooks as written but does not refuse a move of what one imports,
  as the migration does: the clone's tsc shows it.
- A halt explains a file by the command that first wrote it: a new file of a halted `yarn build` passes as
  the halt's, not as its own.
- The gate reads a trunk's change to a home against the port's first base, so a change the port merged
  before the home was taken asks a carried row it does not need. A base per home (the trunk commit the port
  held when the home was taken) would be exact.
- The event row's grammar holds three of a product's columns (an agent's API, a batch, a Slack line) and
  the directory's gates are a product's approval model (a role's gate, one per offered language); a
  product with neither fills them with nothing. Changing the row breaks each product's rows: settled when
  a second product writes events.
- A home reads a few of a product's rows by key (the words' empty pill) and asks a fixed count of cells
  (three and one per reader): the contract's rows say so, no check holds a product to them yet.
- A split's proof (each export's output dumped before and after, each import classed home or rows, lint
  with no suppression) is a script each side writes again; one product-agnostic tool here, its digest
  carried by the migration, would give both sides the same proof.
- The register is not shipped: a product reads a home's W id only by its own row that names it (`heldBy`),
  and a moved row's words stand twice, the product's row and the register's. Once `decisions/` ships in the
  package, a moved row shrinks to `{ id, heldBy }` and the product's board and decisions check read its words
  through `heldBy`: the register alone holds them.
- D96 to D101 of eagle-design wait on the PM's fast-forward of its `main`; D96 to D99 then join the register.
