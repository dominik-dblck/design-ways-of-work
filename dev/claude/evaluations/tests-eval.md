# Tests Evaluation Checklist

Validation criteria for unit test quality and coverage. Loaded by validation subagents during the TEST phase.
The rules are `docs/rules/tests.md`; this file is how a review checks a diff against them.

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before validating, create a task for EACH criterion using TaskCreate:

1. "Check: every test file runs successfully"
2. "Check: run coverage, report uncovered lines"
3. "Check: every `review` row of `docs/rules/tests.md`, one task per row"
4. "Check: verify everything from implementation is covered"
5. "Check: report coverage gaps to user"

If TaskCreate is unavailable, write the task list as a markdown checklist in your first message instead.

Mark each task `in_progress` when checking, `completed` when verified. Cite the row broken: `[docs/rules/tests.md → {rule}]`.

---

## Criteria

- Every test file runs successfully (`yarn test {file}`)
- Run coverage for created test files — report uncovered lines
- Every row of `docs/rules/tests.md` whose gate is `review`; a row broken is a finding
- Agent goes through each test and verifies everything from the implementation is covered
- If coverage gaps found: report to user, iterate if needed (human decides)
