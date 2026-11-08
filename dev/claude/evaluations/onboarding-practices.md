# Onboarding Best Practices Evaluation Guide

## Purpose

Evaluate onboarding screens against 9 domain-specific best practices with calibrated scoring anchors.
Every score must cite the practice key and authoritative source.

## Scoring System

- ✅ **2 points**: Fully meets criterion
- ⚠️ **1 point**: Partially meets criterion
- ❌ **0 points**: Does not meet criterion
- **N/A**: Not applicable (e.g., personalization not relevant for single-path flows)

When scoring N/A, adjust denominator. Report total as X/Y where Y excludes N/A criteria.

---

## Best Onboarding Practices

### OP§1 — Clear Onboarding Flow

**Source:** [NNGroup — Mobile-App Onboarding: Components and Techniques; Apple HIG — Onboarding]
**Look for:** Step-by-step progression, visible progress indicator with total steps, consistent transition direction, skip option, landing on actionable screen after completion

- ✅ 2: Progress indicator on every screen + total steps visible + consistent transitions + skip option present + flow ends on actionable screen + within 3-5 screens
- ⚠️ 1: Some progress shown but incomplete — missing total steps, OR skip option hidden, OR inconsistent transitions, OR >5 screens without justification
- ❌ 0: No progress indicator, no skip option, unbounded flow (steps added dynamically), or flow ends on non-actionable screen

### OP§2 — Contextual Information

**Source:** [NNGroup — Onboarding Tutorials vs. Contextual Help; NNGroup — Progressive Disclosure]
**Look for:** Information presented at point of need (pull revelations), tooltips/coach marks on complex features, progressive disclosure (essential first, advanced on demand), no front-loaded tutorials for standard features

- ✅ 2: Help appears in context when feature first used + tooltips on complex fields + dismissible AND recallable + no upfront tutorial for standard patterns
- ⚠️ 1: Some contextual help but not comprehensive — tooltips present but not on all complex fields, OR help not recallable after dismissal, OR some front-loaded instructions
- ❌ 0: All instructions front-loaded in tutorial, no contextual help at point of need, information requires memorization from previous screens

### OP§3 — Minimize Distractions

**Source:** [NNGroup — Mobile-App Onboarding; Apple HIG — Onboarding; Hick's Law]
**Look for:** One primary action per screen, no competing CTAs of equal weight, no rating prompts/non-essential requests during onboarding, no decorative clutter competing with function

- ✅ 2: One clear primary CTA per screen + no non-essential prompts during flow + no decorative elements competing with function + whitespace used effectively
- ⚠️ 1: Primary action identifiable but competing elements present — secondary CTAs similar visual weight, OR some non-essential content in flow, OR decorative elements mildly distracting
- ❌ 0: Multiple competing CTAs of equal weight, rating/notification prompts during onboarding, decorative elements overwhelm functional content

### OP§4 — User-Friendly Language

**Source:** [Nielsen, 1994 — NH§2; Apple HIG — Writing Guidelines; Material Design — Communication Principles]
**Look for:** User's language (not system jargon), action-oriented framing (user accomplishments not system capabilities), consistent terminology across screens, plain-language error messages

- ✅ 2: All copy in user's language + instructions framed as user goals + consistent terminology throughout + error messages plain and constructive
- ⚠️ 1: Mostly user-friendly but some jargon, OR framing inconsistent (mixes user goals and system descriptions), OR terminology varies between screens
- ❌ 0: Technical jargon, system-oriented language, inconsistent terminology, error codes in messages

### OP§5 — Engagement and Motivation

**Source:** [Apple HIG — Onboarding; NNGroup — Mobile-App Onboarding; Material Design — M3 Expressive]
**Look for:** Interactive elements (user performs actions, not just reads), progress provides sense of achievement, reason given for data collection, visual delight without sacrificing function

- ✅ 2: Interactive elements present (choices, actions) + progress indicator provides achievement sense + data collection explains "why" + visual design is engaging without distraction
- ⚠️ 1: Some interactive elements but mostly passive (reading/watching), OR no explanation for data collection, OR visually dull without engagement cues
- ❌ 0: Entirely passive experience (text walls, static carousels), no sense of progress or achievement, data collection feels extractive

### OP§6 — Personalization

**Source:** [NNGroup — Mobile-App Onboarding (Customization); Apple HIG — Onboarding; Material Design — Self-Select Model]
**Look for:** Data collection justified by clear benefit to user, choices visibly impact subsequent experience, preferences that can be inferred deferred, sign-in delayed until necessary

- ✅ 2: Data collection has clear user benefit explained + choices visibly affect next experience + sign-in deferred until necessary + system settings used where possible (locale, accessibility)
- ⚠️ 1: Some data collection justified but some not — preferences gathered that could be inferred, OR sign-in required too early, OR choices don't visibly impact experience
- ❌ 0: Data collected without justification, forced sign-in before value shown, visual customization asked during onboarding, or preferences with no visible impact

### OP§7 — Feedback and Guidance

**Source:** [NNGroup — Onboarding Tutorials vs. Contextual Help; Material Design — Communication Patterns]
**Look for:** Immediate feedback on actions (confirmation, error, state change), inline validation, success states visible, guidance available at each step without leaving flow

- ✅ 2: Every action produces visible feedback + inline validation on form fields + success states clearly shown + error states with recovery guidance + guidance available without leaving flow
- ⚠️ 1: Some feedback present but gaps — validation only on submit (not inline), OR success states unclear, OR error guidance missing recovery path
- ❌ 0: No feedback on actions, no validation feedback, errors silent or only in logs, no guidance available

### OP§8 — Accessibility

**Source:** [W3C — WCAG 2.2 Mobile Guidance; Apple HIG — Accessibility; Material Design — Accessible Design]
**Look for:** Touch targets meet platform minimums, contrast meets WCAG AA, screen reader labels present, focus order logical, error identification accessible
**Platform notes:** iOS: ≥44x44pt, VoiceOver labels, Dynamic Type support. Android: ≥48x48dp, TalkBack content descriptions, sp for text

- ✅ 2: Touch targets meet platform minimums + contrast ≥4.5:1 (AA) for text + screen reader labels on all interactive elements + logical focus order + errors identified without color alone
- ⚠️ 1: Most targets adequate but some too small, OR contrast borderline on some elements, OR some screen reader labels missing, OR focus order partially logical
- ❌ 0: Touch targets below minimums, contrast fails AA, no screen reader support, no logical focus order

### OP§9 — Testing and Iteration

**Source:** [NNGroup — How to Conduct a Heuristic Evaluation; EvAlignUX CHI 2025]
**Look for:** Evidence of user testing (A/B variants, iterative improvements), design patterns suggest tested conventions, severity of issues appropriately weighted
**Note:** This criterion is often assessed from design maturity signals rather than direct observation

- ✅ 2: Design follows well-tested platform conventions + evidence of iteration (A/B variants, polished edge cases) + error states comprehensive + accessibility addressed
- ⚠️ 1: Follows conventions but some rough edges — missing edge case handling, OR accessibility partially addressed, OR error states incomplete
- ❌ 0: Design ignores platform conventions, no evidence of testing (broken layouts, missing states, accessibility absent)
