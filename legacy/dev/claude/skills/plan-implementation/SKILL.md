---
name: plan-implementation
description: Writes an implementation plan from an approved discovery doc. Does NOT write the orchestration file — produces a single implementation plan document only.
---

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before reading ANYTHING below, create tasks using TaskCreate:

1. "Load approved discovery doc (with evaluation) from path"
2. "Load patterns — .claude/patterns/ relevant to this feature"
3. "Load docs/rules/README.md — naming, file placement conventions"
4. "Explore references — read 1-2 existing examples per pattern in codebase"
5. "Define types — list every type/interface/schema needed, where they live, dependency order"
6. "Plan features — file-level design for every new/modified file with purpose and pattern citation"
7. "Plan tests — test strategy per component: what to test, which pattern, edge cases"
8. "Cross-reference — verify every item from discovery 'What Needs to Be Built' has file in plan"
9. "Write implementation plan → save to roadmaps/{epic}/{feature}/implementation.md"
10. "HANDOFF → user runs /architect-evaluate-plan"

Chain tasks sequentially with `addBlockedBy` so each blocked by previous.

If TaskCreate unavailable, write task list as markdown checklist in first message instead.

If you have not created tasks, STOP. Go back and create them.

Mark each task `in_progress` when you begin it. Mark `completed` when done.

---

> **Lane B only.** This skill is for E15 Frontend and work the design project does not specify.
> A domain ticket (E00 to E11) never goes through here: its acceptance criteria already are the
> discovery, the plan and the orchestration, and a second copy of them is a second thing to keep
> true. See `CLAUDE.md` — Workflow, two lanes.

## Purpose

Write detailed implementation plan from approved and evaluated discovery doc. Skill does NOT write orchestration file — produces single implementation plan capturing architecture decisions, file-level design, type definitions, dependency order.

**Pipeline position:**

```
... → /architect-evaluate-discovery → [YOU ARE HERE] → /architect-evaluate-plan → /plan-orchestration → ...
```

---

## What to Load

1. **Approved discovery doc** (with `## Evaluation` section) — already in conversation context, or read from path
2. `docs/rules/README.md` — naming conventions, directory layout, services pattern
3. The rule files `docs/rules/README.md` names for what the feature touches, and the one
   `.claude/patterns/` file the ticket pipeline names for that layer:

| Feature touches                 | Load this pattern      |
| ------------------------------- | ---------------------- |
| UI components, styling          | `mui7.md`              |
| Pages, layouts, endpoints       | `nextjs-app-router.md` |
| Services, clients, queries      | `tanstack-query.md`    |
| `packages/domain`, a test of it | `domain-testing.md`    |

Do NOT load every rule file — only relevant ones.

---

## Step 1 — Load Patterns and Explore References

1. Identify which areas feature touches (UI, routes, data fetching, state, etc.)
2. Load relevant pattern files using mapping table above
3. Read 1-2 existing codebase examples for each pattern:
   - Types (`packages/domain/{area}/` for a shape both sides read, an organism's `types/` for its props · `docs/rules/types.md`)
   - Services (`app/services/`)
   - Hooks (`app/hooks/`)
   - Provider + context patterns (`app/providers/`)
   - UI components (atoms, molecules, organisms)
   - API routes (`app/api/`)

---

## Step 2 — Define Types

List every type, interface, schema feature needs. Dedicated task because types must exist before anything depending on them.

**Types must be STRONG.** Non-negotiable:

- **No `any`** — ever
- **No `as` casting** — unless justified with comment explaining why
- **No bare `string` or `number`** when narrower type exists — use string literals, enums, branded types, union types. `string | number` last resort, not default.
- **Use discriminated unions** over optional fields — `{ type: 'error'; message: string } | { type: 'success'; data: T }` not `{ type?: string; message?: string; data?: T }`
- **Use `readonly`** for data that shouldn't mutate
- **Use `Record<SpecificKey, Value>`** not `Record<string, Value>` when keys known
- **Every field must have tightest possible type** — if value can only be `'pending' | 'active' | 'completed'`, say so — don't use `string`

For each type:

- **Name** and **file path** (e.g., `DocumentRow` in `packages/domain/documents/documentAnswers.ts`)
- **Fields** with exact types — write full type definition, not description
- **Which files import this type** — proves it's needed
- **Dependencies** — does this type extend or reference another?

Example output:

```typescript
// packages/domain/{area}/{area}Types.ts
type SkillType = 'creator' | 'gate' | 'executor' | 'advisor';
type Verdict = 'pass' | 'pass_with_notes' | 'fail';

interface EvaluationFinding {
  readonly criterion: string;
  readonly verdict: 'pass' | 'note' | 'fail';
  readonly assessment: string;
  readonly citation: string;
}
```

---

## Step 3 — Plan Features

File-level design for every new/modified file. Per file:

- **Path** — exact location following `docs/rules/README.md`
- **Purpose** — one sentence
- **Pattern** — which rule or pattern it follows, with citation: `[docs/rules/data.md → a service is one function]`. If no rule file is applicable (e.g., scripts/validation layer), cite the codebase reference file instead: `[follows enrichHandlerPattern.ts pattern]`
- **Imports** — concrete: "imports `DocumentRow` from `packages/domain/documents/documentAnswers.ts`", not "will use session types"
- **Exports** — what file provides to others
- **Integration points** — how connects to existing code
- **Server/client** — for Next.js app code, declare server or client. Verify no non-serializable data crosses boundary (functions, promises, Date objects). For scripts/, N/A. Follow `[patterns/nextjs-app-router.md → Server/Client Boundary]`

**File size and SRP constraint:** each file should be max ~200 lines, one function/check per file, single responsibility principle. If a planned file would exceed this, split into focused sub-files. Each file should do one thing well — atomic functions over monolithic modules.

Verify no circular import chains — if File A imports from File B and vice versa, restructure.

---

## Step 4 — Plan Tests

Test strategy per component. Per testable file:

- **Test file path** — e.g., `app/services/__tests__/resolveSessionService.test.ts`
- **What to test** — happy path, edge cases, error states
- **Test pattern** — which approach: unit, integration, component render
- **Mocking strategy** — what to mock, what to test real
- **N/A with reason** — if not testable (config-only, types-only, etc.)

---

## Step 5 — Write Implementation Plan

Write `roadmaps/{epic}/{feature}/implementation.md` with mandatory sections:

```markdown
# {Feature} — Implementation Plan

## Architecture Decisions

{decisions with rationale, grounded in discovery, cite KB}

## Types

{from Step 2 — every type/interface/schema with fields, paths, dependencies}

## Features

{from Step 3 — every file with path, purpose, pattern citation, imports, exports}

## Tests

{from Step 4 — test file per component, what to test, pattern, mocking}

## Dependency Order

{what must exist before what — types first, then shared, then specific}

## Edge Cases and Error Handling

{strategy per component}

## External Dependencies

{BE changes, APIs, third-party services}
```

This is **reference document** — describes what to build and why. Every proposed file must follow conventions from loaded patterns.

---

## Step 6 — Handoff

Tell user:

> Implementation plan written to `roadmaps/{epic}/{feature}/implementation.md`.
> Next step: run `/architect-evaluate-plan` to evaluate this plan against KB + patterns + web search.

---

## Before Finishing

Check TaskList. If any task not `completed`, do not finish — address remaining tasks or explain to user why skipped.
