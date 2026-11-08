---
name: evaluate-onboarding-ux
description: Evaluate onboarding screens against 27 UX criteria (Nielsen + Gestalt + Best Practices). Human-in-the-loop, gated per phase. Per-platform scoring with calibrated anchors and data-backed severity. Use when user asks to evaluate, audit, or review onboarding UX.
---

# Evaluate Onboarding UX

You evaluate onboarding screens against 27 UX criteria using scientific-grade methodology. Every score cites an authoritative source. Severity comes from data, not opinion. **The human leads — you run one gate at a time and wait for approval before the next.**

## Core Rule: Evidence-Backed Scores

Every score MUST cite evidence:

| Claim type          | Required evidence                                               |
| ------------------- | --------------------------------------------------------------- |
| "Score ✅ 2"        | Observation + pattern anchor match + source citation            |
| "Score ⚠️ 1"        | Observation + what's missing vs anchor + source citation        |
| "Score ❌ 0"        | Observation + what's absent + source citation                   |
| "Score N/A"         | Reason (design-only, not applicable) + adjusted denominator     |
| "High impact issue" | DataSignal from session data (error rate, dropout rate)         |
| "Unknown impact"    | No session data — state "Unknown — visual/code assessment only" |

If you cannot cite evidence for a score, mark it "Unverified" and ask user to confirm.

---

## Gate Protocol — human-in-the-loop, every phase

**This skill runs ONE gate at a time. Never run multiple phases in a single turn. Never produce a full evaluation autonomously.**

For every gate:

1. Do the gate's work.
2. **Present** the output to the user inline, concise.
3. **STOP.** Ask for approval or changes.
4. **Wait** for explicit approval ("ok" / "approved" / "next" / edits). Silence is not approval.
5. Only then: (a) **write this gate's approved output into the report file** (see Incremental report), (b) mark the gate's task `completed`, (c) start the next gate.

Hard rules:

- No skipping ahead. No "I'll do G4–G6 then check in."
- If the user changes a score / number / scope, apply it and **re-present** before moving on — and update the report if that gate was already written.
- **The user owns the data (G3) and the SQL (G8)** — you propose, the human decides. Never invent a dropout/error rate. Never present un-validated SQL as fact.

### Incremental report — build as you go

The report is **not** written once at the end — it is built gate-by-gate so it is always current and survives an interrupted session:

- On **G1 approval**, create the report file `ux-evaluations/{flow}/{screen}/{date}-{screen}-ux-evaluation.md` (`{flow}` = the journey, e.g. `onboarding`) with the full skeleton (template in G9) + fill header + `## Scope`.
- On **every later gate's approval**, write that gate's approved output into its report section before starting the next gate.
- **G9 finalizes** (totals, summary, history) — it does not write from scratch.

---

## MANDATORY FIRST ACTION — CREATE ONE TASK PER GATE

Create these 9 tasks using TaskCreate, chained sequentially with `addBlockedBy` (each blocked by the previous):

```
Task 1 (G1): "Inputs & scope"          → collect inputs, confirm platform(s) + mode
Task 2 (G2): "We-are-here map"          → funnel location + data sources
Task 3 (G3): "Data signals"             → dropout/error numbers, HUMAN-OWNED
Task 4 (G4): "Nielsen pass"             → 10 scores
Task 5 (G5): "Gestalt pass"             → 8 scores
Task 6 (G6): "Best-practices pass"      → 9 scores
Task 7 (G7): "Priority + root cause"    → issues table + hypothesis
Task 8 (G8): "Validation query (human-led)" → logic proposal, human validates schema
Task 9 (G9): "Finalize report + history" → totals, summary, history (sections already written incrementally)
```

A gate's task is marked `completed` **only after the user approves that gate** (per Gate Protocol). If one platform only, G4–G6 score that platform alone.

---

## G1 — Inputs & Scope

Ask the user for each input source. Not all required — skill adapts to what's available.

### Figma Design

> Provide Figma frame URL or paste screenshot of the screen to evaluate.

### Web Code (this repo's default platform)

> Provide path to the screen implementation — the route (`app/**/page.tsx`), the organism under
> `app/components/organisms/{Feature}/`, and any form/validation schema in `packages/domain/{area}/`.

### Android Code (only if a mobile client is in scope)

> Provide path to Android screen implementation (layout XML / Compose file + ViewModel/Fragment).

### iOS Code (only if a mobile client is in scope)

> Provide path to iOS screen implementation (SwiftUI view / UIKit ViewController).

### Screen States

> Provide screenshots showing all screen states: default, error, loading, success, empty.

### Analytics / Session Data (user provides + skill enriches)

> Provide any of: session replay observations, dropout rate, error rates, specific session IDs,
> and **the name of the source** (PostHog, GA4, Datadog, a SQL view, a CSV export…).
> The skill will propose data in G3 — but you confirm the numbers there. First runs are human-led.

**Mode:**

- **Design-only:** if no code provided, code-dependent criteria (NH§3, NH§5, NH§7, NH§9) scored N/A. Header notes "Design-only evaluation — code criteria excluded." Denominator adjusted.
- **Platforms:** confirm which platform(s) are in scope (`web` is this repo's default; `android` / `ios` only if a mobile client exists).
- **No analytics source:** the skill still runs. G2 uses a user-supplied or hand-drawn funnel, G3 records "no data", G7 severity becomes "Unknown impact", G8 is skipped. Say this out loud in G1 so the user knows what they lose.

**GATE G1 — present + STOP.** Summarize: screen under evaluation, platform(s), mode (full/design-only), what data exists vs missing. Ask the user to confirm scope. **On approval:** create the report file with the full skeleton (template in G9) + fill header + `## Scope`, then proceed to G2.

---

## G2 — "We are here" map

Orient before evaluating: where does this step sit in the journey, and how big is its drop vs every other step? This frames the whole evaluation and prevents judging a screen out of context.

1. **Canonical step order** — establish the ordered list of funnel steps. In order of preference:
   - a machine-readable SSOT in this repo (a step-enum / funnel-anchor constant in `packages/domain/` or `app/constants/`) — grep for it before asking;
   - the analytics tool's own funnel definition (PostHog funnel, GA4 exploration);
   - the user typing the steps out. **Never invent step order** — a wrong order invalidates the whole map.
2. **Per-step dropout as % of total sessions** — from whatever analytics source the user named in G1:
   - **Denominator** = all funnel entrants for the window, returning/re-entry sessions excluded (see "Why % of total" below).
   - **Numerator** = sessions whose last reached step is the step in question.
   - Per step: `dropped_at_step / denominator`.
   - **Read the denominator from a single field the source gives you — never hand-derive it by adding/subtracting per-category counts.** Category counts overlap and double-count.
3. **Reason split at the target step** — if the source classifies dropout reasons, break the target step down by reason, each as **% of total**. No classifier → skip, and say so.
4. **Draw the map** — ASCII funnel in canonical order, bars scaled to **% of total sessions**, each row `% (n/total)`. Target step tagged `◄ WE ARE HERE`; reason split beneath. Note position (e.g. "6th of 19") + dropout rank.
5. **State your data sources** — tool/query used, the exclusions applied, the total denominator, the `as-of` date.

### Rules for pulling the numbers

Whatever the source is, these hold:

1. **Name the source and the exact query in the report.** A number without a reproducible query is not evidence — it is an anecdote. If you ran a CLI, paste the command; if a dashboard, name the view + filters.
2. **Prod, not local.** Never report a figure from a local/dev database or seeded fixture as a production signal. If the only reachable data is local, label it `local data — not production`.
3. **Read the exclusion flags, don't compute around them.** Most analytics tools have first-class toggles for returning users / re-entries / completed sessions. Set the toggle; do not subtract by hand.
4. **One denominator for the whole evaluation.** G2, G3 and G8 must all divide by the same population, or the percentages stop being comparable.

If no analytics source exists, say so in one line, draw the map from the step order alone (no bars), and move to G3 with "no data".

### Why % of total, returning excluded

- **% of total sessions, not raw counts** — raw counts aren't comparable across steps or runs; a step's _share of all traffic_ is the portable severity signal stakeholders act on.
- **Returning users excluded** — app-reopen / already-used / redirected returners aren't fresh funnel entrants; counting them inflates the denominator and distorts every step's %. Mirrors the dashboard funnel's default `app_reopen` exclusion + dedup toggle.

**GATE G2 — present + STOP.** Show the map (% of total, returning excluded) + one-line read (position, rank, the focus reason's % of total) + data sources (endpoints, exclusion, total, as-of). Confirm right screen + map correct → write to report Journey Map.

---

## G3 — Data Signals (HUMAN-OWNED)

The numbers that back severity in G7 come from here — and **the human owns them.** You propose; the human confirms or corrects.

1. **Propose candidate signals** — from the same source and the same denominator as G2, expressed as **% of total sessions with returning users excluded**. Present each as a _proposal_, with the query/filters used next to it.
2. **Never invent a rate.** No measured value → present as "no data — Unknown impact," not a guess. An estimate presented as a measurement poisons every severity call downstream.
3. **Ask the user to confirm or correct** each number. The user may supply metrics you cannot reach (error rates from another tool, a figure from the validated query once G8 is approved).

**GATE G3 — present + STOP.** Present the proposed data signals table (signal · % of total (n/total) · source + query · verified?). Ask the user to confirm/correct. Only confirmed numbers may be used as `DataSignal` in later gates.

---

## G4 — Nielsen's Heuristics (NH§1–NH§10)

1. Read `.claude/evaluations/ux-evaluation.md` — Nielsen's Heuristics section.
2. Score each of 10 criteria for the in-scope platform(s). For 2 platforms, score both side-by-side in the same table.
   - **Score:** ✅ 2 / ⚠️ 1 / ❌ 0 / N/A
   - **Justification:** what you observed, matched against the scoring anchor
   - **Recommendation:** specific improvement (or "—" if score is 2)
   - **Citation:** `[NH§{N}; Nielsen, 1994 — {Principle Name}]`
   - **Data Signal:** only a G3-confirmed signal, or null

**GATE G4 — present + STOP.** Show the 10-row table. Ask the user to review/adjust scores. Apply edits and re-present if changed.

---

## G5 — Gestalt Principles (GP§1–GP§8)

1. Read `.claude/evaluations/ux-evaluation.md` — Gestalt Principles section.
2. Score each of 8 criteria — same format as G4. Citations: `[GP§{N}; {Author, Year} — {Principle Name}]`.

**GATE G5 — present + STOP.** Show the 8-row table. Ask the user to review/adjust.

---

## G6 — Best Onboarding Practices (OP§1–OP§9)

1. Read `.claude/evaluations/onboarding-practices.md`.
2. Score each of 9 criteria — same format. Citations: `[OP§{N}; {Source}]`.
   Mind platform-specific differences — web: keyboard navigation, visible focus ring, 24×24 CSS px minimum target (WCAG 2.2 SC 2.5.8), browser back/refresh, responsive breakpoints. Mobile: swipe-back vs system back, 44pt vs 48dp targets, VoiceOver vs TalkBack.

**GATE G6 — present + STOP.** Show the 9-row table. Ask the user to review/adjust.

---

## G7 — Priority Issues + Root Cause

### Platform comparison (if 2 platforms)

Table showing ONLY criteria where scores differ:

```markdown
| Criteria          | Web  | Android | Difference                                        |
| ----------------- | ---- | ------- | ------------------------------------------------- |
| NH§3 User Control | ✅ 2 | ⚠️ 1    | Web has browser back; Android missing in-app back |
```

If single platform or all scores identical, state so.

### Priority Issues (data-backed severity)

Classify using G3-confirmed DataSignal only:

```
Confirmed data:
  error_rate > 15%    → "High impact — measurable error rate"
  dropout_rate > 10%  → "High impact — measurable dropout"
  Both                → "Critical — measurable error + dropout"
No confirmed data:
  → "Unknown impact — visual/code assessment only"
```

```markdown
| #   | Issue               | Criteria | Data Signal                      | Impact | Platforms |
| --- | ------------------- | -------- | -------------------------------- | ------ | --------- |
| 1   | No input validation | NH§5     | 23% error rate (33/142 sessions) | High   | Both      |
```

### Root Cause Hypothesis

Behavioral explanation connecting confirmed data + UX findings + (if available) code inspection. **Make this rich** — the priority issues and the root cause have to be detailed enough that a testable hypothesis can be derived from them without rereading the whole audit.

**GATE G7 — present + STOP.** Show comparison + priority table + root cause. Ask the user to confirm. These feed the brief.

---

## G8 — Production Validation Query — HUMAN-LED

The G3 numbers came from a dashboard or API. This gate produces a **reproducible query** that any stakeholder can re-run, measuring the **same population and the same dropout definition** — so its output reconciles with G2/G3 instead of quietly disagreeing.

You do **not** write final SQL as fact. Prod view and column names are not verifiable from here. You propose logic grounded in the real classification rules; the human validates the names and signs off.

**Skip this gate entirely** if the project has no queryable analytics store (mark task `completed` with reason "no queryable source"). Do not fabricate a schema to fill the section.

1. **Anchor on the real dropout definition first** (cite sources) — find how the target dropout reason is actually classified in this codebase, so the query replicates it rather than guessing:
   - the classifier / state machine that decides the reason (grep for the reason string, the step enum, the status union type);
   - the **signals** it reads (step markers, last-reached step, consent/verification state) and the DB fields behind them;
   - build the query conditions to mirror those exact rules. If the rules live only in a person's head, say so and ask.
2. **Propose logic only** (no committed SQL):
   - **Baseline (denominator):** total sessions, returning users excluded — **same basis as G2/G3**.
   - **"Reached {step}" / "Completed {step}" conditions** — from the step markers/signals in step 1.
   - **Reason condition** — the rule(s) that define the target reason (from step 1).
   - Target metrics: step-level dropout AND funnel-level (% of total), grouped by month, 365-day window, single-pass conditional aggregation (`FILTER (WHERE …)` on Postgres).
3. **Ask the human to validate** exact table/view + column names against the real prod schema. The human may paste the schema, correct names, or write/approve the SQL.
4. **Only after human sign-off** does the query enter the report, tagged `human-validated {date}`; otherwise `DRAFT — unverified, do not run` (logic-only).

**GATE G8 — present + STOP.** Present the dropout definition you found (with citation) + the logic proposal built on it + the open schema questions (which table? which columns?). Wait for the human to validate or provide the SQL before writing it anywhere.

---

## G9 — Finalize Report + History

The report file already exists — its gate sections were filled incrementally as each gate (G1–G8) was approved. G9 only finalizes:

1. **Compute totals** — fill the Evaluation header scores + Summary line from the approved G4–G6 tables.
2. **Verify** every gate section is present and matches what the user approved (no placeholders left).
3. **Update history:** `ux-evaluations/{flow}/{screen}/{screen}-ux-evaluation-history.md` (create with header if missing, append a row).
4. **Present summary + path**, ask if any final adjustments.

### Report template

```markdown
# UX Evaluation: {Screen Name}

**Date:** {YYYY-MM-DD}
**Evaluator:** Claude (evaluate-onboarding-ux skill)
**Mode:** {Full | Design-only}
**Inputs:** {Figma, web/Android/iOS code, screenshots, analytics data — what was provided}

## Scope

{platforms, mode (full/design-only), per-platform evidence + caveats — from G1}

## Journey Map — "we are here"

{the approved G2 ASCII map + position/rank read + data sources & as-of}

## Input Data Summary

- **Data signals (user-confirmed, G3):** {signal · value · source}
- **Actual dropout screen:** {resolved via funnel — may differ from reported step}
- **Top finding:** {key behavioral observation}
- **Typical user profile:** {where they came from, session duration, steps completed, device/viewport}

---

## Evaluation ({score}/{max} — {percent}%)

### Nielsen's Heuristics ({score}/{max})

| #   | Criteria | Score | Justification | Recommendation | Source | Data Signal |
| --- | -------- | ----- | ------------- | -------------- | ------ | ----------- |

### Gestalt Principles ({score}/{max})

| #   | Criteria | Score | Justification | Recommendation | Source | Data Signal |
| --- | -------- | ----- | ------------- | -------------- | ------ | ----------- |

### Best Onboarding Practices ({score}/{max})

| #   | Criteria | Score | Justification | Recommendation | Source | Data Signal |
| --- | -------- | ----- | ------------- | -------------- | ------ | ----------- |

---

## Summary

- **Overall:** {score}/{max} ({percent}%) | Nielsen {n}/{m}, Gestalt {n}/{m}, Practices {n}/{m}

## Priority Issues

| #   | Issue | Criteria | Data Signal | Impact | Recommendation |
| --- | ----- | -------- | ----------- | ------ | -------------- |

## Root Cause Hypothesis

{the approved G7 hypothesis}

---

## Production Validation Query

**Status:** {human-validated {date} | DRAFT — unverified, do not run}

{the query the human validated in G8, OR the logic-only proposal if not yet validated}

Signal: {the DB field that distinguishes "completed this step" from "dropped here"}
```

### History header (create if missing)

```markdown
# UX Evaluation History: {Screen Name}

| Date | {Platform A} | {Platform B} | Nielsen (A/B) | Gestalt (A/B) | Practices (A/B) | Notes |
| ---- | ------------ | ------------ | ------------- | ------------- | --------------- | ----- |
```

**GATE G9 — present + STOP.** Show overall scores, top-3 priority issues, path to report. Ask: "Any final adjustments?"

---

## Citation Format

Every score in every table MUST use this format:

```
[NH§1; Nielsen, 1994 — Visibility of System Status]
[GP§3; Wertheimer, 1923 — Law of Continuity]
[OP§8; W3C — WCAG 2.2 Mobile Guidance]
```

No score without citation. This is non-negotiable.

---

## Contract Types (reference)

These define the logical structure of the evaluation report:

```typescript
type UxCategory = 'nielsen' | 'gestalt' | 'onboarding';
type Platform = 'android' | 'ios' | 'web';
type Score = 0 | 1 | 2;

type NielsenKey =
  | 'NH§1'
  | 'NH§2'
  | 'NH§3'
  | 'NH§4'
  | 'NH§5'
  | 'NH§6'
  | 'NH§7'
  | 'NH§8'
  | 'NH§9'
  | 'NH§10';
type GestaltKey =
  'GP§1' | 'GP§2' | 'GP§3' | 'GP§4' | 'GP§5' | 'GP§6' | 'GP§7' | 'GP§8';
type OnboardingKey =
  | 'OP§1'
  | 'OP§2'
  | 'OP§3'
  | 'OP§4'
  | 'OP§5'
  | 'OP§6'
  | 'OP§7'
  | 'OP§8'
  | 'OP§9';

type DataSignal =
  | {
      readonly type: 'error_rate';
      readonly rate: number;
      readonly errorCount: number;
      readonly sessionCount: number;
    }
  | {
      readonly type: 'dropout_rate';
      // rate = % of TOTAL sessions, returning users EXCLUDED — same denominator as G2/G3
      readonly rate: number;
      readonly screenName: string;
    }
  | { readonly type: 'user_provided'; readonly description: string }
  | null;
```

---

## Before Finishing

Check TaskList. If any gate task is not `completed`, do not finish — either run that gate (present + get approval) or explain to the user why it was skipped. Never close out with gates silently unaddressed.
