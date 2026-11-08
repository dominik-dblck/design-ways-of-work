# Domain Testing — event-sourced rules

Project-specific. `docs/rules/tests.md` holds the generic rules (AAA, behaviour over
implementation, import the real function, every test must be able to fail) and they all still
apply. This file covers what an event-sourced domain needs on top, and it is the file that wins
where the two disagree.

Everything is TypeScript under `strict`. A test is production code: `types-eval.md` applies to it
in full — no `any`, no casting without a justifying comment, fixtures typed rather than inlined as
loose objects, and no `@ts-expect-error` **in production code or in a runtime test**.

In a `*.test-d.ts` it is the opposite: there it is **required**, because the assertion is that the
compiler refuses. A brand with no `@ts-expect-error` proving it rejects the swap is a brand nobody
checked — see the `types` project below.

## Three tiers, and the suite says which is which

| Tier               | Runs against                                       | Database   | Where                          |
| ------------------ | -------------------------------------------------- | ---------- | ------------------------------ |
| **domain**         | the in-memory store                                | never      | `packages/domain/**/*.test.ts` |
| **store contract** | both store implementations, in-memory and Postgres | yes, in CI | one suite, run twice           |
| **endpoint**       | the API over HTTP                                  | yes        | `app/**/__tests__/`            |

`types` — added at T-E00-15, the ninth project at the time — runs no test at run time at all:
`typecheck.enabled` over `tests/types/**/*.test-d.ts`, so `expectTypeOf` and `@ts-expect-error` are
what pass or fail. It exists because the brands are phantom — `BlockId` and `RevId` are the same
string to every run-time check ever written, and a suite that cannot tell them apart cannot say
whether a brand landed on a field or only near it.

**Three tiers and 13 vitest projects, and both numbers are right.** `app` and `architecture`
hold code the tiers do not describe, and `seed` — added at T-E00-11 — holds the one kind of domain
test that needs a real store handed to it: the seed writes eight documents and reads them back as
sets, and no file under `packages/domain` may import a store implementation (T-E00-02 criterion 1).
So it lives in `tests/seed/**/*.test.ts`, takes `createMemoryStore` from a tier that may open one,
and passes it in as an argument. **Not** in `tests/store-contract` — that folder holds one file both
implementations run whole and its exact-list guard stays exact — and **not** in `tests/postgres`,
which skips without a database. `docs/rules/tests.md` has the full table.

A domain test that needs a database is in the wrong tier or the code under it took a dependency it
should not have. The domain suite must run with no database available at all — that is the test of
the store interface, not a convenience.

**The store contract suite is written once and parameterised over the implementation.** A
difference between in-memory and Postgres is a failing test, never a note in a readme.

## What a domain test may import

- the module under test, and anything else inside `packages/domain`
- a fixture from the repository
- **a shared test fixture under `tests/helpers/`, by relative path** — added T-E01-02. A port's tests
  need the one roster every tier shares (`tests/helpers/theRoster.ts`), and a second roster written
  inside `packages/domain` is the second thing that can disagree with the first. The path is
  relative and not `@domain/*`: `packages/domain/tsconfig.json` carries `paths: {}`, so the alias
  makes `tsc --noEmit -p packages/domain` fail with `TS2307` the moment a domain test uses it —
  measured, T-E01-02 · recon
- nothing else. No `next`, no `react`, no database driver, no `@/app/*`

The store, the session and every port arrive as arguments. If a test has to reach for a global to
make the code work, the code is wrong, not the test.

## Event sourcing — the assertions that are specific to this system

- **Replay is deterministic.** The same log replayed twice is deep-equal. Assert on the state, not
  on the order the replay visited things in.
- **Snapshot equals full replay.** After every append, the stored snapshot and a fresh replay of
  the whole log are deep-equal. This is the assertion that catches a snapshot nudged forward
  instead of rebuilt.
- **An empty log replays to an empty state**, not to a default-shaped object.
- **`replay(log, upTo)` stopped at a version cut** gives the state as it stood at that version.
- **Seq is assigned by the append, never by the caller.** Two appends cannot both claim one.
- **`at` comes from the server clock and `by` from the session.** A test that passes either in a
  request body is asserting the wrong thing — the point is that a caller cannot state them.
- **The seed is events, never state.** A test that starts from a stored state contradicts the
  architecture and will keep passing while the replay is broken.
- **A key that does not exist throws.** Never resolves to a neighbour, never returns undefined.

## Refusals

A refused command is a first-class result, not an exception to be caught loosely. Every refusal
test asserts four things:

1. the **rule key** that fired
2. the **sentence** a person sees — verbatim, copied from `refusals.js` into the ticket's
   `contract.md` at the minute it was read
3. the **current stream version**, so a caller can read again
4. what would make the same call pass

And one negative: **the log did not grow.** A refusal that appends anything is a bug the sentence
will not reveal.

**Since T-E00-10 all four are on the value.** A rule answers
`{ ok: false, kind: 'rule', key, line, firedOn, streamVersion, fix }` — the envelope
`glossary · Refusal` names, built in the domain and not at the edge. So a domain test asserts all
four and the log; T-E00-13 maps the envelope to a status and adds nothing to it.

It was `{ ok: false, key, sentence }` and no more until then — T-E00-06 criterion 10 — and the two
field names moved: `sentence` is now `line`. A test written against the old shape is asserting a
value nothing produces.

**One line per key.** A key with two sentences, chosen by which fills arrive, is not a thing:
T-E00-06 wrote one under `approval.version_moved`, nothing ever asserted it, and T-E00-10 deleted
it and rewrote the line to be true under both fills. If a sentence is only true for some of the
facts that can fire it, the sentence is wrong — not the key.

Never assert on a substring of the sentence. Either the wording is the contract or it is not, and
here it is: three readers depend on it, one of them an agent that cannot ask a question.

## Stream version

Every command test has a stale-version case: a command carrying a version older than the log is
refused with 409 and appends nothing, and one carrying a newer version is refused the same way —
nobody can have read a state that does not exist.

The concurrency test is not optional and not an integration test: two writers on the same stream
version, one gets 200, the other 409, and the log grew by exactly one event.

## Fixtures from the design project

The specification is read where it sits. A ticket whose tests need a spec file as data names it,
and only that one is copied into the repository as a fixture. Nothing is copied on speculation.

**A copied fixture is the assertion, not the input.** Replaying the seed has to reproduce the
document the design project drew — so the fixture is what the test compares against, and the input
is the event list. A test that loads the fixture as its starting state has inverted the whole
arrangement.

Copy verbatim. A reformatted or hand-tidied fixture is a fixture that no longer matches what the
design project renders, and the mismatch will be blamed on the code.

## The run

The 99-step run in `events.js` is one acceptance test, not ninety-nine. It replays as commands and
has to produce the same events in the same order. It belongs to E10 and is the test that says the
domain is finished.

Per-step assertions live in the tickets that own each command. The run asserts the whole, not the
parts — otherwise a change to one command breaks it in ninety places and nobody reads the failure.

## Coverage as a question, not a number

No percentage target. Two questions instead, both answerable:

1. Does every acceptance criterion on the ticket have exactly one test? (`contract.md` answers it)
2. Does every event key have a payload type and at least one test that appends it?
   (`Events.coverage()` answers the first half)

A criterion with no test is unfinished work. A test with no criterion is scope nobody asked for.

## A scan proves it can go red, and the proof is never planted

A fitness function that walks a folder answers an empty list when the folder is not there, and an
empty list passes every assertion. So a scan is two claims held apart, never one:

- **its walk reaches a file you can name** — `expect(paths).toContain('app/api/directory/route.ts')`
- **its predicate fires on a synthetic `{ path, text }`** — the `Source` shape `sourcesUnder` returns,
  built in the test rather than read off disk

**Nothing is ever planted on disk.** Several suites walk `app/`, `tests/` and `packages/` at once and
vitest runs files in parallel, so a file that exists for a few milliseconds is a red they take in
turns. `plans.js · RULES` carries the rule; this is where the next scan author reads it.

**And the synthetic text is a shared resource too.** Measured twice on T-E01-03, in one file:

| What was written                                                            | What read it                                                                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `import { s } from '@store/createPostgresStore';` inside a control's `text` | `storeHandedIn.test.ts` walks `tests/`, matched the specifier, and added the control's file to its exact list |
| a **comment** explaining the line above                                     | the same scan — `importsIn` reads the raw file, and a comment is text                                         |

The fix is to assemble what the control must contain — `['@store', 'createPostgresStore'].join('/')`
— so nothing in the file writes it whole and the predicate still sees it whole at run time. The rule
generalises: **a control that writes down the thing another scan looks for is a plant, whether it
lands on disk, in a string, or in a comment.**
