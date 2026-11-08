---
name: evaluate-app-ux
description: Evaluate one screen of the working app (no onboarding) against Nielsen NH§1–10 and Gestalt GP§1–8, plus an accessibility pass (OP§8 + WCAG 2.2 on the web), scored per role from screenshots of the running screen. Human-in-the-loop, one gate per turn. Use when asked to evaluate, audit or review a screen's UX in the app.
---

# Evaluate App UX

You evaluate **one screen of the app** against 18 UX criteria and an accessibility pass. Every score
cites a source and the evidence it rests on: a screenshot of the running screen or a fact measured in
the browser. **The human leads: one gate per turn, and nothing moves on without their approval.**

**What the scores stand on:**

- **roles** · the screens draw differently for each reader (a content manager with or without the
  seat, Product, Legal, a language's reviewer), so every score has a column per role in scope
- **the document's lifecycle** · where the screen sits is the document's state and who is on it
- **screenshots taken by a harness** · the running screen in each state, for each role
- **no data-backed severity** · there is no analytics source, so impact is "Unknown" unless the human
  gives an observation with its source

## Core Rule: Evidence-Backed Scores

| Claim            | Required evidence                                                           |
| ---------------- | --------------------------------------------------------------------------- |
| "Score ✅ 2"     | Observation + the anchor it matches + source citation + screenshot or fact  |
| "Score ⚠️ 1"     | Observation + what is missing against the anchor + citation + evidence      |
| "Score ❌ 0"     | Observation + what is absent + citation + evidence                          |
| "Score N/A"      | Why it does not apply to this screen or role + the adjusted denominator     |
| "Impact: …"      | An observation the human confirmed in G1, with its source (`user_provided`) |
| "Unknown impact" | No confirmed observation · "visual/code assessment only"                    |

Evidence is a screenshot number (`#07`) or a measured fact (`facts.json → focus.outlineColor`). A
score whose evidence you have not looked at is not a score: mark it "Unverified" and say so. **Never
write "unchanged" or "as before" about a screenshot you did not open.**

---

## Gate Protocol

**One gate per turn. Never two phases in one turn. Never the whole evaluation on your own.**

For every gate:

1. Do the gate's work.
2. **Present** its output inline, short.
3. **STOP.** Ask for approval or changes.
4. **Wait** for an explicit answer ("ok", "next", edits). Silence is not approval.
5. Then: write the gate's approved output into the report, mark its task `completed`, start the next.

- A changed score, scope or role is applied and **presented again** before moving on, and the report
  updated if that gate was already written.
- **The human owns the observations** (G1) · you never invent an impact, a frequency or a complaint.

### The report is built as you go

- On **G1's approval**, create `ux-evaluations/app/{screen}/{date}-{screen}-ux-evaluation.md` with the
  whole skeleton (template under G7), the header and `## Scope`.
- On **every later approval**, write that gate's section before starting the next gate.
- **G7 finalizes** (totals, summary, history). It writes nothing from scratch.

---

## MANDATORY FIRST ACTION — ONE TASK PER GATE

Create seven tasks with TaskCreate, each blocked by the one before (`addBlockedBy`):

```
Task 1 (G1): "Scope"                       → screen, roles, states, viewport, observations
Task 2 (G2): "Where it sits + screenshots" → lifecycle, role × state matrix, the harness run
Task 3 (G3): "Nielsen pass"                → 10 scores per role
Task 4 (G4): "Gestalt pass"                → 8 scores per role
Task 5 (G5): "Accessibility pass"          → OP§8 per role + the WCAG 2.2 table
Task 6 (G6): "Priority + root cause"       → issues table, role differences, hypothesis
Task 7 (G7): "Finalize report + history"   → totals, summary, history
```

A task is `completed` only after the human approves its gate. If TaskCreate is unavailable, write the
seven as a checklist in the first message.

---

## G1 — Scope

Settle, and ask for what you cannot find:

- **The screen** · its route (`app/**/page.tsx`), its organism (`app/components/organisms/{Feature}/`)
  and its test ids (`e2e/testingIds/`). Grep for them before asking.
- **The roles in scope** · every reader the screen draws differently for. Read it off the code (the
  bar's roles, `reviewsAlone`, the seat) and the design project's role matrix the sheet cache holds;
  propose the list, the human trims it. A visitor with no session is a role when the screen has a
  signed-out face.
- **The states** · default, loading, empty, pending (a press on its way), refused, failed (no
  network), success, and the document's own (DRAFT, IN REVIEW, READY TO SEND, SENT, in the trash)
  where the screen draws them.
- **Viewport and mode** · 1280 × 800, light, Chromium unless the human asks for more. Say what is left
  out.
- **The wireframes** · the screen's rows in `components.spec.json` and the wireframes the sheet cache
  (`.sheet-cache/`) holds for it. Say which are missing and which render as templates without data.
- **Observations** · ask the human for anything seen in real use ("the marketers miss the strip",
  "Legal asked twice where to sign") and **where it comes from** (a person, a Slack thread, a call).
  Each becomes a `user_provided` signal. None → every impact in G6 is "Unknown", and say so now.

**GATE G1 — present + STOP.** The screen, the roles, the states, the viewport, the wireframes found
and missing, the observations. **On approval:** create the report with its skeleton and `## Scope`.

---

## G2 — Where it sits + screenshots

1. **The lifecycle** · a one-line map of the document's states (DRAFT → IN REVIEW → READY TO SEND →
   SENT, the trash beside them) with the states this screen is reached in marked, and who is on it in
   each.
2. **The role × state matrix** · a table, one cell per role and state in scope: the screenshot that
   shows it, or why the cell cannot exist (Product never sees the strip's popover, a SENT document has
   no Actions).
3. **The harness** · a Playwright spec in the scratchpad, never committed:
   - its own config extending the repository's `playwright.config.ts` (testDir, globalSetup,
     `webServer.cwd` set to the repository), `node_modules` linked from the repository
   - sessions through `e2e/asTheSignedInPerson.ts`, elements through `e2e/testingIds/` alone, the
     document built through the e2e desks over HTTP, as the flows build theirs
   - `content_test` only, never the dev database · before the run: `pgrep -fl "[p]laywright test"`
     and no vitest running (a vitest run resets `content_test`), port 3000 free, and the run prefixed
     `AUTH_GOOGLE_ID=e2e-cookie-mode`
   - a lost answer by `page.route(…, route => route.abort('internetdisconnected'))`, a pending one by
     holding the route until the shot is taken, time by `page.clock`
   - one numbered PNG per matrix cell, and a `facts.json` of what a picture cannot show: target sizes
     (`getBoundingClientRect`), the focus ring's computed style and its contrast against the ground,
     `aria-*` and accessible names, the URLs a navigation passes through
4. **Read every screenshot** before the gate · each one opened, one line on what it shows.

**GATE G2 — present + STOP.** The lifecycle line, the matrix with its screenshot numbers, the
screenshot folder, and any cell the harness could not reach and why. Confirm before scoring.

---

## G3 — Nielsen's Heuristics (NH§1–NH§10)

1. Read `.claude/evaluations/ux-evaluation.md`, its Nielsen section · the anchors are there, not here.
2. Score each criterion **per role in scope**, roles side by side:
   - **Score** ✅ 2 / ⚠️ 1 / ❌ 0 / N/A
   - **Justification** · what the screenshot or the fact shows, against the anchor
   - **Recommendation** · one concrete change, or "—" at 2
   - **Citation** · `[NH§{N}; Nielsen, 1994 — {Principle}]`
   - **Evidence** · `#{screenshot}` or `facts.json → {key}`

**GATE G3 — present + STOP.** The 10-row table. Apply edits and present again if any change.

---

## G4 — Gestalt Principles (GP§1–GP§8)

1. Read `.claude/evaluations/ux-evaluation.md`, its Gestalt section.
2. Score each of the 8 per role, as G3. Citations: `[GP§{N}; {Author, Year} — {Principle}]`.

**GATE G4 — present + STOP.** The 8-row table.

---

## G5 — Accessibility (OP§8 + WCAG 2.2, web)

1. Read **only** the `OP§8 — Accessibility` section of `.claude/evaluations/onboarding-practices.md` ·
   it is the one criterion of that rubric that is not about onboarding. Score it per role, as G3,
   citing `[OP§8; W3C — WCAG 2.2]`. Read its mobile notes as their web equivalents.
2. Under it, the web checks it rests on, one row each, pass / fail / N/A **with the measured value**:

| WCAG 2.2 SC                  | What is measured                                                     |
| ---------------------------- | -------------------------------------------------------------------- |
| 2.1.1 Keyboard               | every press reachable and operable by Tab, Enter, Space, Escape      |
| 2.4.3 Focus Order            | Tab walks the screen in reading order                                |
| 2.4.7 Focus Visible · 1.4.11 | a focus ring on every control, its contrast ≥ 3:1 against the ground |
| 2.5.8 Target Size (Minimum)  | every target ≥ 24 × 24 CSS px, or the spacing exception, measured    |
| 1.4.3 Contrast (Minimum)     | text ≥ 4.5:1, large text ≥ 3:1, from computed colours                |
| 1.4.1 Use of Color           | no state carried by colour alone (dots, chips, red fields)           |
| 4.1.2 Name, Role, Value      | every control has an accessible name and its state (`aria-*`)        |
| 3.3.1 Error Identification   | a refused value is named in text, tied to its field                  |
| 4.1.3 Status Messages        | a notice or a pending state is announced without moving focus        |

A value no tool here can measure (a screen reader's actual reading) is "not measured", never a pass.
A finding outside the screen's own code (the theme's focus token) is listed under "for the design
system", not scored against the screen.

**GATE G5 — present + STOP.** The OP§8 row and the WCAG table.

---

## G6 — Priority Issues + Root Cause

### Where the roles differ

Only the criteria whose scores differ between roles:

```markdown
| Criteria    | Content manager | Reviewer | Difference                                      |
| ----------- | --------------- | -------- | ----------------------------------------------- |
| NH§1 Status | ✅ 2            | ⚠️ 1     | the reviewer's first paint is the source's view |
```

All the same → say so in one line.

### Priority issues

```
A user_provided observation confirmed in G1 backs it → its impact as the observation states it, with the source
Nothing confirmed                                     → "Unknown impact — visual/code assessment only"
```

The path an issue sits on (the main path, a refusal, a lost answer, a way out) is written beside it
as information. It is not a severity.

```markdown
| #   | Issue | Criteria | Roles | Path | Signal | Impact | Evidence |
| --- | ----- | -------- | ----- | ---- | ------ | ------ | -------- |
```

### Root cause hypothesis

What connects the issues · the code, the sheet's rule or the copy behind them, read in the files,
cited by path and line. Detailed enough that a fix or a test can be written from it without reading
the whole audit again.

**GATE G6 — present + STOP.** The role differences, the issues, the hypothesis.

---

## G7 — Finalize Report + History

1. Totals per category and per role from the approved G3–G5 tables.
2. Every section present and matching what was approved · no placeholder left.
3. History: `ux-evaluations/app/{screen}/{screen}-ux-evaluation-history.md` (created with its header
   when missing), one row appended.
4. Present the totals, the top three issues and the path.

### Report template

```markdown
# UX Evaluation: {Screen}

**Date:** {YYYY-MM-DD}
**Evaluator:** Claude (evaluate-app-ux)
**Roles:** {the roles in scope}
**Viewport / mode:** {1280 × 800, light, Chromium · what was left out}
**Screenshots:** {the folder, not committed}

## Scope

{G1: screen, roles, states, wireframes found and missing, observations and their sources}

## Where it sits

{G2: the lifecycle line, the role × state matrix with screenshot numbers}

---

## Evaluation ({score}/{max} — {percent}%, per role)

### Nielsen's Heuristics ({per role score}/{max})

| #   | Criteria | {Role A} | {Role B} | Justification | Recommendation | Source | Evidence |
| --- | -------- | -------- | -------- | ------------- | -------------- | ------ | -------- |

### Gestalt Principles ({per role score}/{max})

| #   | Criteria | {Role A} | {Role B} | Justification | Recommendation | Source | Evidence |
| --- | -------- | -------- | -------- | ------------- | -------------- | ------ | -------- |

### Accessibility ({per role score}/2)

| #   | Criteria | {Role A} | {Role B} | Justification | Recommendation | Source | Evidence |
| --- | -------- | -------- | -------- | ------------- | -------------- | ------ | -------- |

| WCAG 2.2 SC | Result | Measured | Evidence |
| ----------- | ------ | -------- | -------- |

For the design system: {findings outside the screen's code, or "none"}

---

## Summary

- **Overall, per role:** {role}: {score}/{max} ({percent}%) · Nielsen {n}/{m}, Gestalt {n}/{m}, Accessibility {n}/2

## Where the roles differ

{G6 table}

## Priority Issues

| #   | Issue | Criteria | Roles | Path | Signal | Impact | Evidence |
| --- | ----- | -------- | ----- | ---- | ------ | ------ | -------- |

## Root Cause Hypothesis

{G6}
```

### History header

```markdown
# UX Evaluation History: {Screen}

| Date | Roles | Nielsen (per role) | Gestalt (per role) | Accessibility (per role) | Notes |
| ---- | ----- | ------------------ | ------------------ | ------------------------ | ----- |
```

**GATE G7 — present + STOP.** Ask: "Any final adjustments?"

---

## Citation Format

```
[NH§1; Nielsen, 1994 — Visibility of System Status]
[GP§6; Rubin, 1915 — Figure-Ground]
[OP§8; W3C — WCAG 2.2] · SC 2.4.7
```

No score without its citation and its evidence.

## Contract Types (reference)

```typescript
type UxCategory = 'nielsen' | 'gestalt' | 'accessibility';
type Score = 0 | 1 | 2;
type NielsenKey = `NH§${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}`;
type GestaltKey = `GP§${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
type AccessibilityKey = 'OP§8';
type Evidence =
  | { readonly kind: 'screenshot'; readonly shot: number }
  | { readonly kind: 'fact'; readonly key: string; readonly value: string };
type Signal = {
  readonly type: 'user_provided';
  readonly observation: string;
  readonly source: string;
} | null;
```

## Never here

- No code change · an issue is fixed in a ticket or a fix of its own, after the report
- No screenshot committed, no harness file in the repository
- No severity without a confirmed observation behind it
- No gate run before the one before it was approved

## Before Finishing

Check the task list. A gate not `completed` is run (presented, approved) or its skipping explained to
the human. Never close with a gate silently left.
