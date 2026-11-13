# design-ways-of-work

The way of working more than one product runs: rules, checks, tools, skills and a design system.
A repository takes it at a tag; nothing of it enters that repository's history.

- `CLAUDE.md` · how to work here: the role, the PM's rules, the commands
- `plan/state.md` · where it stands now, what is open, what is missing
- `decisions/register.ts` · the PM's decisions on how it works

## What it holds

- `design/`, `dev/`, `shared/`, `design-system/` · the four homes a repository takes, each at the path it reads it from
- `ports/consumers.ts` · the repositories that take it
- `releases/changelog.ts` · the release in hand, each release put out, and each output a release means to move
- `scripts/` · its own tools: the gate, the release, the moves and renames by script
- `tests/` · its rules' tests, its tools' tests, and the hooks, the gate and the release run on scratch repositories
- `legacy/` · what retired, kept as it ran

## How a repository takes it

1. Its `package.json` pins a tag of this repository as a git dependency, and names the homes it takes in `wow.takes`.
2. An install unpacks the four homes and the manifest alone: `.gitattributes` cuts the rest from the archive.
3. Its `postinstall` runs `shared/take/takeWow.ts`: each file of the homes it names is written onto its own paths,
   recorded by digest, and hidden from its git. A file it edited is never overwritten: the take stops.
4. To move to a later tag it runs the migrations its row names first, `node scripts/migrate.ts <name> <checkout>`
   from this repository at the tag, its checkout on the branch `ports/consumers.ts` names for it (any other
   stops), then moves the pin and installs, then checks: a check between the two can be
   red, as the migrated files and the taken ones meet only once the install lands. The row says what else it does.

A build repository takes by commit instead (W113): no dependency, no `postinstall`.

1. Its `package.json` names `wow.takes`, `wow.commits: true` and `wow.remote`, this repository's address.
2. `node shared/take/takeWow.ts --tag v1.2.3 --sha <its commit>` clones the tag aside and runs that tag's own
   take, only if the clone stands on the commit named: a tag is a name that can move. The files and `wow.lock`
   (the commit, then each file's digest) go into its next commit, its code owners reviewing. A take of the same
   tag again reads the commit from the lock. The first take runs the script from a clone of the tag:
   `node <clone>/shared/take/takeWow.ts --from <clone>`.
3. `node shared/take/takeWow.ts --check` reads the lock alone, so its CI needs no access here: a taken file
   edited or gone is red.

A new design product is written by `yarn spawn design <path> <Product> --company <Company>` (`scripts/spawn.ts`):
the sample at the version's tag, its names filled in, pinned to that tag, installed, its first commit through its
hooks, then its feature tier. Its row in `ports/consumers.ts` follows, so the gate tries it.

## What holds a change here

- `yarn hooks` · once a clone: git then runs the checks at each commit and each push; no install sets them
- a commit · the commit tier on the files it touches, and the tree where a check costs seconds
- a push · the feature tier, when it carries a commit the remote lacks: the tree whole, then
  - `yarn test:mechanism` · the release and the gate, as scripts, on a scratch way of working
  - `yarn sample` (`scripts/sample.ts`) · `examples/sample-product`, a product that names none, built from nothing on
    the homes in hand: its generated files current (`--emit` writes them), then its feature tier
  - `yarn fresh` (`scripts/fresh.ts`) · its own checks on a fresh clone of the commit: red on a file only this machine holds
  - `yarn consumers` (`scripts/consumers.ts`) · the gate: the commit tried on a fresh clone of each repository that
    takes it, against the same clone on its pinned tag. A difference is a row of the release in hand, or red.
- `yarn release` · the release in hand put out: its row, its version, `main` pushed past the gate, then its tag

```
yarn hooks
yarn check:feature
yarn release
```
