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
- eagle-design: its `main` takes the tags, each by its migrations; it holds v1.0.0 since 614cb70, taken on
  `port/wow` and fast-forwarded. The gate tries `main` with no port: the port's files are in `legacy/`.
- argus-design: not spawned yet; its stack is decided, the one this repository defines (W24).
- `examples/sample-product`: the smallest product, naming none; `yarn sample` builds it from nothing on the
  tree's homes and runs its feature tier, ten of ten green; this repository's feature tier runs it. It takes
  no `dev/`, as a new design product does not.
- The build side: `dev/` is copied from its repository by script and taken by eagle-design alone; its port is
  parked. Its theme, atoms and molecules are held here since W110 (`ports/build-theme/held.ts`);
  `yarn sync:theme <sha>` copies a move's seeds alone, W114's skeleton, the sha and each file recorded in
  `ports/build-theme/taken.ts`. A sha reaches this side only past the build side's own gate:
  its architecture review, then this repository's sample run on a mirror. That mirror reads
  `scripts/syncTheme.ts`, `scripts/sample.ts`, `scripts/repos.ts` and `ports/consumers.ts`; a change to
  their shape is told to eagle-dev first.

## What holds a change

- A commit: the commit tier (`yarn check:chunk`), by pre-commit and by the Stop hook.
- A push: the feature tier (`yarn check:feature`), by pre-push, only for a commit the remote lacks under that
  ref, and only from a clean checkout that stands on the commit pushed. It ends with the release's and the
  gate's tests on scratch repositories, this repository's own checks on a fresh clone, then the gate.
- A release: `yarn release`, one command; up to and with 1.0.0 this session's call once its checks are
  green (W30).

## Open for the PM

One point: W112's timing, as eagle-dev relayed the PM's word (a product builds a missing piece without asking
first, asks only "do you have something like it?" during the work, and proposes it once, at its pull request),
waits for the PM's yes here. v1.2.0 is out: the WCAG fixes and the committed take (W113).

The PM's word of 13 Nov (W114): the app's skeleton joins the shared components, so a new app starts with it. The
build side frees its seven (AppShell, SideNav, LoginForm, SignedOutScreen, Breadcrumbs, PageHeader,
PersonaStrip) of the product, its binding kept in its own wrappers; they are copied here at its two reviewed
shas. v1.3.0 goes out without them, as eagle-dev waits on its tag to stamp the skeleton's first sha: D108,
D109, `Heading`, the pages as templates and the sync's seeds; the skeleton goes out as v1.4.0 (W115).
v1.3.1, on the PM's A for a third release that day, lets the build side's `atoms/Link` come with the second sha.
That sha, 2fee0535, is copied: the seven and what they read stand in the design home, out with v1.4.0.

The PM's word of 13 Nov (W116), picked on the proposal page "Atoms to merge": no capitals, and three names,
each one thing (Heading, Text, Label); Eyebrow and SectionHead retired, one Slider, one dot. All in v1.4.0,
out at aba1fce with the skeleton; eagle-design takes it, eagle-dev at its own take of the design system.

The PM's word of 13 Nov on shared components (W110): after v1.1.0 this repository holds the
theme, atoms and molecules, a product keeps and extends its own and asks for one to be shared; and (W111) both
repositories of every product, design and build, take a tag, the run's stages 5 to 7 following the PM's
architecture. The PM's word of 13 Nov on the icons (W109): `lucide-react` alone, and no SVG file; eagle-design
names its last 8 icon paths for `lucide-react`, the build's SVG writer retires, and `lucide-static` leaves
every repository by migration, in v1.1.0 with the molecules.

The PM's word of 13 Nov (W104) settled the rest: the relayed rules stand with three more, this session talks to
the build side's session directly, `.rehearsal/` is in this machine's Trash, and a product's board, pages and
props get a check part (a task after v1.0.0). Task 23 is closed by v0.21.0: the build side's theme and atoms
copied at eagle-dev's eed29307 on `feature/W26-shared-theme`, after its architecture review, nothing merged
there. The PM's word of 13 Nov puts the build side's architecture guard on the homes before v1.0.0 (W105, the
run's task 25): its first half is out in v0.22.0 (the homes are the tree, one home per name on this
repository's code, a sha synced only reviewed); in its second half one home per name is a shared test every
product runs (v0.23.0), and the rows held by `review` get their skill, `design-review`. The PM's word of 13 Nov
(W108): v1.0.0 goes out without molecules, and the build side's plain molecules follow as v1.1.0, moved in one
batch by eagle-dev. Heavy runs take turns on the machine through `~/.claude/hooks/machineLock.py` (W106), installed here.

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
  as the migration does: the clone's tsc shows it. It also follows a relative path inside a string of code,
  a test's planted import text too: such a text is mended after the move.
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
- D96 to D99 of eagle-design join the register: its `main` is fast-forwarded, nothing holds them now.
