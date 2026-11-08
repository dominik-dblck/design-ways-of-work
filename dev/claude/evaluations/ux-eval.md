# UX Evaluation Checklist

Validation criteria for user-facing UI quality. Loaded during architecture review **only when the change touches user-facing UI** (a page, an organism, a form, an error state, a loading state).

Not a replacement for `/evaluate-onboarding-ux`. This is the **fast gate** — 12 checks on a diff. The full 27-criteria scored audit (Nielsen NH§1–10 + Gestalt GP§1–8 + Onboarding OP§1–9, with per-criterion anchors and data-backed severity) lives in `/evaluate-onboarding-ux` and is run per screen, not per PR.

**Skip entirely** for backend-only, config-only, or test-only changes. Say so in one line rather than scoring N/A twelve times.

## MANDATORY FIRST ACTION — CREATE TASKS NOW

Before validating, create a task for EACH criterion using TaskCreate:

1. "Check: every async action has a visible loading state"
2. "Check: every failure path renders a user-readable message"
3. "Check: form validation is inline, not submit-only"
4. "Check: inputs have correct type + autocomplete + label association"
5. "Check: no dead ends — every state has an exit or retry"
6. "Check: empty states are designed, not blank"
7. "Check: copy is in user language, no jargon or error codes"
8. "Check: one primary action per view"
9. "Check: keyboard navigable + visible focus ring"
10. "Check: interactive targets meet 24x24 CSS px minimum"
11. "Check: related controls grouped by proximity, consistent alignment"
12. "Check: no layout shift on load (reserved space for async content)"

If TaskCreate is unavailable, write the task list as a markdown checklist in your first message instead.

Mark each task `in_progress` when checking, `completed` when verified. Cite source for each: `[ux-eval.md → {criterion}]` plus the underlying principle key: `[NH§1]`, `[GP§3]`, `[OP§8]`.

---

## Criteria

### System status `[NH§1]`

- Every async action (mutation, navigation, upload) renders a pending state. TanStack Query `isPending` wired to the UI, not swallowed.
- No silent success — a completed action produces visible confirmation.
- No layout shift when async content arrives — reserve height/skeleton rather than letting content pop in `[GP§8]`.

### Error handling & recovery `[NH§9]`

- Every failure path renders a message a non-technical user can act on. No raw `error.message`, no HTTP status codes, no stack traces in the UI.
- Error copy says what happened **and** what to do next.
- Retry or exit is available from every error state — no dead ends `[NH§3]`.

### Error prevention `[NH§5]`

- Validation is inline (on blur / on change), not only on submit. Zod schema reused between form and server — one source of truth.
- Inputs declare correct `type` and `autoComplete`. Every input has an associated `<label>` (or `aria-label` when visually label-less).
- Destructive actions require confirmation.

### Empty & edge states `[NH§1, GP§4]`

- Zero-data states are designed: what this is, why it is empty, what to do. Not a blank region.
- Boundary states covered: loading, empty, error, partial, success.

### Language `[NH§2, OP§4]`

- Copy uses the user's vocabulary. No internal domain jargon, enum values, or field names leaking into visible text.
- Terminology consistent across the flow — the same thing has the same name on every screen `[NH§4]`.

### Focus & hierarchy `[NH§8, GP§6, OP§3]`

- One primary action per view. Secondary actions visually subordinate, not equal weight.
- Nothing decorative competes with the primary action for attention.

### Accessibility `[OP§8]`

- Fully operable by keyboard: logical tab order, no focus traps, visible focus indicator (do not remove `:focus-visible` outline without replacing it).
- Interactive targets at least 24×24 CSS px (WCAG 2.2 SC 2.5.8). Prefer 44×44 for primary touch actions.
- Colour is never the sole carrier of meaning — pair with text or icon (WCAG 1.4.1).
- Text contrast at least 4.5:1 (3:1 for large text). MUI theme palette values checked, not assumed.

### Visual grouping `[GP§1, GP§2, GP§5]`

- Related controls grouped by proximity; unrelated ones separated. Spacing comes from the MUI theme scale, not ad-hoc pixel values.
- Alignment consistent across steps of the same flow — a centred step 1 followed by a left-aligned step 2 reads as instability.
- Components of the same role look the same across the app `[NH§4]`.

---

## Sources

- Nielsen NH§1–10, Gestalt GP§1–8 and Onboarding OP§1–9, with their scoring anchors · the rubrics
  `/evaluate-onboarding-ux` loads
- `knowledge/ux/mindmaps/ux-principles.md` — theory, research basis, common violations
- `knowledge/ux/mindmaps/onboarding-best-practices.md` — onboarding research evidence + anti-patterns
- `knowledge/ux/original_source/w3c-wcag22-mobile.md` — WCAG 2.2 requirements
