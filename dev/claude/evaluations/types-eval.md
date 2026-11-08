# Types Evaluation Checklist

Validation criteria for type safety and schema correctness. Loaded by validation subagents during the TYPES and TEST phases.
The rules are `docs/rules/types.md`; this file is how a review goes looking for them.

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before validating, create a task for EACH criterion using TaskCreate:

1. "Sweep: every new or changed type — can it be tighter? Primitives last"
2. "Check: every `review` row of `docs/rules/types.md`, one task per row"
3. "Check: yarn tsc — zero errors"

If TaskCreate is unavailable, write the task list as a markdown checklist in your first message instead.

Mark each task `in_progress` when checking, `completed` when verified. Cite the row broken: `[docs/rules/types.md → {rule}]`.

---

## The first pass — can the type be tighter?

**Run this before anything else, and run it whether or not the ticket asked for strong typing.**
No requirement has to say "use strong types" for a loose one to be a finding. The burden is on the
primitive to justify itself, not on the reviewer to prove a narrower form exists.

Take every type the diff adds or changes and ask one question of each field: **what is the full set
of values this can hold?** If that set is knowable, a primitive is a violation. Then take the
highest rung the set allows, by the ladder in `docs/rules/types.md` (its first row), and mint a
brand only where that file's brand rows allow it.

**Where they hide.** A `Record<string, T>` whose keys a `keyof` already knows. A row carrying its
own key typed as `string`. A parameter only ever called with literals. A `firedOn` / `payload` /
`meta` field typed as the union of every shape rather than the one its discriminant selects. A
test roster of key strings typed `readonly string[]`.

**Go looking — do not wait to notice.** At criterion 7 of 11 this missed both a
`Readonly<Record<string, Refusal>>` over 46 known keys and a `Refusal.key: string` on rows filed
under those keys, on T-E00-10; a person found them afterwards.

---

## Criteria

Every row of `docs/rules/types.md` whose gate is `review`; a row broken is a finding. The rows with
a scan or an ESLint gate are the suite's, and `yarn tsc` is the last check.
