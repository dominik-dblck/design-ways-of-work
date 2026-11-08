You are performing an ARCHITECTURE REVIEW for this project (Next.js App Router).

Focus on architecture consistency, component boundaries, data flow, and framework standards.

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before reading ANYTHING below, create these tasks using TaskCreate:

1. "Classify layers touched by PR"
2. "Load the rule files of the touched layers (their `review` rows) and the pipeline's patterns"
3. "Load relevant knowledge base sections (where applicable)"
4. "Sweep every new or changed type for a tighter form — primitives last"
5. "Review code against the loaded rows"
6. "Validate the rest of types-eval.md"
7. "Validate tests against tests-eval.md"
8. "Validate UX against ux-eval.md (UI diffs only)"
9. "Check the cross-cutting smells no gate holds: the header, a comment that could be a type"
10. "Write findings with citations"
11. "Present architecture summary + findings"

If TaskCreate is unavailable, write the task list as a markdown checklist in your first message instead.

If you have not created tasks, STOP. Go back and create them.

Mark each task `in_progress` when you begin it. Mark it `completed` when done.

---

Scope:

- Review ONLY the current branch changes versus **`feature/deblock-content`** — the working
  integration branch, the one every ticket branch is cut from and merged back into. `main` is
  behind it by whole epics, so a diff against `main` reviews work that was already reviewed and
  reports it all over again
- The diff to read: `git diff feature/deblock-content...HEAD`, plus the working tree — a ticket
  is reviewed before it is committed, so uncommitted files are part of it. On
  `feature/deblock-content` itself, diff against `main`
- Do NOT speculate about code not shown
- Maximum 25 findings total (prioritize highest impact)

Authoritative Guides (these override generic best practices):

- `docs/rules/README.md` — every rule of the repository, one file per concern, and which file a
  change loads. A row's gate is a scan, an ESLint rule or `review`; **a reviewer reads only the
  `review` rows**, because the suite already holds the rest
- The four patterns the ticket pipeline names, until its sync moves them into `docs/rules/`:
  `.claude/patterns/mui7.md`, `nextjs-app-router.md`, `tanstack-query.md`, `domain-testing.md`

**IMPORTANT — Loading strategy:**

- Do NOT read every rule file upfront. That wastes context.
- First classify which layers the PR touches (Step 0).
- Then read ONLY the rule files whose row in `docs/rules/README.md` names what the diff touches.

**IMPORTANT — Citation requirement:**

- Every finding MUST cite the specific source: the file and the rule.
- Format: `[docs/rules/components.md → a component file holds one component]` or
  `[patterns/mui7.md → Token Safety]`
- If a finding is not grounded in any guide, do not include it.
- No finding without a citation. No citation without reading the source.

**IMPORTANT — Uncertainty handling:**

- If a finding is uncertain (could be a violation or could be intentional), mark it as `[Uncertain]` with a question for the author rather than a directive.
- Do not guess about code you cannot see. If context is missing, say so explicitly with what you'd need: "Insufficient context for [area] — to review this, I would need to see [specific file/type/service]."

---

# STEP 0 — Classify and Load

### 0a. Identify touched layers

Which layers does this PR affect? Read them off `docs/rules/README.md`, whose last column says
which change loads which file: components, pages and endpoints, services and clients, state,
constants, styling, scripts, `packages/domain`, tests. Every change to production code also loads
the code-wide files that column names.

### 0b. Load the rule files and the pipeline's patterns

For each rule file the diff touches, read its `review` rows. Then the pipeline's patterns:

| Layer touched                   | Pattern                |
| ------------------------------- | ---------------------- |
| UI components, styling          | `mui7.md`              |
| Pages, layouts, endpoints       | `nextjs-app-router.md` |
| Services, clients, queries      | `tanstack-query.md`    |
| `packages/domain`, a test of it | `domain-testing.md`    |

### 0c. Load relevant knowledge base sections

Where applicable to the PR's scope, load relevant sections from the knowledge base:

- `knowledge/ai/mindmaps/` — concise mind maps covering architecture patterns, AI tooling, and best practices
- `knowledge/ai/original_source/` — full source articles for deeper context

Only load knowledge base content that is directly relevant to the layers and rules touched by the PR. Do not load speculatively.

### 0d. Identify context gaps

Before reviewing, ask: **"What do I NOT know about this PR that I should know to avoid a wrong finding?"**

If you can't see the service being called, the types being used, the provider being consumed, or the route being modified — say so. Missing context is not a violation.

Only apply strict checks to touched layers to reduce noise.

---

# STEP 1 — Can the types be tighter?

**The first thing checked, and it runs whether or not the ticket asked for strong typing.** Nothing
in a ticket has to say "use strong types" for a loose one to be a finding — a primitive standing
where the set of values is knowable is a violation on its own.

Load `.claude/evaluations/types-eval.md` and run its first pass, _The first pass — can the type be
tighter?_, over every type the diff adds or changes. It is a sweep, not a noticing: go field by
field and ask what the full set of values is, then take the highest rung of the ladder that set
allows. The burden is on the primitive to justify itself.

Flag violations with `[evaluations/types-eval.md → The first pass]`. The rest of that file is
STEP 3.

---

# STEP 2 — Review Against the Loaded Rows

For each loaded rule file, check the PR code against its `review` rows; a row broken is a finding.
For each loaded pattern, its "Must" and "Flag if" rules.

Do NOT restate a rule here. The rule files are the source of truth. Read them, apply them, cite them.

### Cross-cutting smells no gate can hold (always check)

Flag if you see:

- A file header whose bullets no longer say what the file does, or name an export the file has
  stopped exporting `[docs/rules/responsibility.md]`
- A comment that restates its name or type, or a `//` stating a contract a type could hold instead —
  "never empty", "one of these three" `[docs/rules/comments.md]` `[docs/rules/types.md]`

---

# STEP 3 — Validate the rest of types-eval.md

The tightening sweep already ran at STEP 1. This is the rest: every `review` row of
`docs/rules/types.md`, and `yarn tsc`.

- Apply them to any new or changed types in the PR.
- Flag violations as findings with citations to `[docs/rules/types.md → {rule}]`.

---

# STEP 4 — Validate Tests

If the PR introduces or modifies tests, validate them against `.claude/evaluations/tests-eval.md`.

- Load `tests-eval.md` and apply its criteria — the `review` rows of `docs/rules/tests.md` — to any
  new or changed tests in the PR.
- Flag violations as findings with citations to `[docs/rules/tests.md → {rule}]`.

---

# STEP 5 — Validate UX (UI diffs only)

If — and only if — the PR touches user-facing UI (a page, an organism, a form, an error or loading state), validate against `.claude/evaluations/ux-eval.md`.

- Load `ux-eval.md` and apply its 12 checks to the changed UI.
- Flag violations as findings, citing both the checklist and the principle: `[evaluations/ux-eval.md → {criterion}] [NH§1]`.
- Backend-only, config-only or test-only PR → skip this step in one line. Do not score N/A twelve times.
- This is the fast gate. A full scored audit of a screen is `/evaluate-app-ux`, or `/evaluate-onboarding-ux` for onboarding, not this review.

---

# OUTPUT FORMAT

---

## Architecture Summary

- **Layers touched:**
- **Patterns loaded:** the rule files and the pipeline's patterns
- **Context gaps** (what you couldn't see but would need to fully review):

---

## Findings

For each finding:

- **Source:** `[docs/rules/file.md → rule]` or `[patterns/file.md → Section Name]`
- **Severity:** `CRITICAL` | `HIGH` | `UNCERTAIN`
- **File:** `path/to/file.ts:line`
- **Rule:** one-line summary of the violated rule
- **Why:** one sentence on what breaks or what risk it creates
- **Fix hint:** what to do about it — or for `UNCERTAIN`, a question for the PR author

Rules:

- Every finding MUST have a `Source` citation from a rule file, a pattern or an evaluation
- `UNCERTAIN` findings are questions, not directives — use when the code might be intentional
- Do NOT tell me what is good, only flag violations and uncertainties
- Be DIRECT and SHORT on each point
- If no violations found, say "No violations found" — do not invent issues

---

## Then: the decision table, in the language of the conversation

The findings above are written for a reviewer. They are not what somebody decides from — a person
reading five `Source`/`Severity`/`Fix hint` blocks has to hold the whole diff in their head to know
what each one costs. So after the findings, and **always**, render one table.

**Write it in whatever language the conversation is in**, not in the language of the code. The
findings block stays in English — it cites English files and quotes English rules — and this table
is the part a person acts on, so it is in their words.

| Column             | What goes in it                                                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **#**              | the finding's number, and a marker for the ones that are not ordinary — `⛔` for `CRITICAL`, `❓` for `UNCERTAIN`                                     |
| **What it is**     | the thing itself in one sentence, with no jargon from the rule file · a reader who has not seen the diff has to understand what the code does         |
| **How it is now**  | what the code does today and what it costs — **the measured number where there is one**, never "may be slow" or "could break"                         |
| **How it will be** | what it looks like after the fix, concretely enough to recognise when it lands · for an `UNCERTAIN`, the decision and its two sides rather than a fix |

Then one line under the table: which findings collapse into one change, and which are decisions the
author has to make rather than work you can do. That line is what turns a list into a next action.

Keep the marker column honest — if nothing is `CRITICAL`, nothing gets `⛔`.

---

## Before Finishing

Check TaskList. If any task is not `completed`, do not finish — address remaining tasks or explain to user why they were skipped.

And check the table is there. Findings without it is a review nobody can act on.
