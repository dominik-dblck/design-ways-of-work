# Architecture Evaluation Checklist

Validation criteria for structural correctness and convention adherence. Loaded by validation subagents during architecture review.

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before validating, create a task for EACH criterion using TaskCreate:

1. "Check: file placement follows docs/rules/ and docs/map.md"
2. "Check: naming follows organism prefix convention"
3. "Check: services — single async function per file"
4. "Check: API routes — two-file pattern"
5. "Check: constants split — frontend vs backend"
6. "Check: types defined before implementation"
7. "Check: no circular dependencies"
8. "Check: server/client boundary respected"
9. "Check: follows relevant .claude/patterns/"
10. "Check: validates against knowledge base where applicable"
11. "Check: DB migrations are numbered .sql files in db/migrations/"

If TaskCreate is unavailable, write the task list as a markdown checklist in your first message instead.

Mark each task `in_progress` when checking, `completed` when verified. Cite source for each: `[architecture-eval.md → {criterion}]`.

---

## Criteria

- File placement follows `docs/rules/responsibility.md` and `docs/map.md`
- Naming follows organism prefix convention (where applicable)
- Services: single async function per file (`{verb}{Noun}Service.ts`)
- API routes: two-file pattern (`route.ts` + `{action}Route.ts`)
- Constants split: frontend vs backend
- Types defined before implementation
- No circular dependencies
- Comments are invariants, never chronicles — `docs/rules/comments.md`. Flag a comment
  that says what the code does, when it changed, who changed it, or which ticket, criterion, edge
  or review asked for it, a quoted criterion included: `git log` and the work trail answer those.
  `tests/architecture/commentsAreInvariants.test.ts` holds it over the whole tree
- Server/client boundary respected
- Follows relevant `.claude/patterns/` for touched layers
- Where applicable: validates against knowledge base (loaded selectively from `knowledge/`)
- DB migrations: one numbered `.sql` file per change in `db/migrations/` (`003_….sql`), idempotent so a second run changes nothing, applied as the owner by `scripts/migrate.ts`; there is no ledger table
