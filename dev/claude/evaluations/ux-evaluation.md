# UX Evaluation Guide (Nielsen's Heuristics + Gestalt Principles)

## Purpose

Evaluate onboarding screens against 18 universal UX principles with calibrated scoring anchors.
Every score must cite the principle key and authoritative source.

## Scoring System

- ✅ **2 points**: Fully meets criterion
- ⚠️ **1 point**: Partially meets criterion
- ❌ **0 points**: Does not meet criterion
- **N/A**: Not applicable (design-only evaluation — code-dependent criteria)

When scoring N/A, adjust denominator. Report total as X/Y where Y excludes N/A criteria.

---

## Nielsen's Heuristics

### NH§1 — Show System Status

**Source:** [Nielsen, 1994 — Visibility of System Status]
**Look for:** Progress indicators, step counters, loading states, confirmation feedback, state transitions
**Platform notes:** iOS uses haptic feedback + system bar indicators; Android uses Snackbar + Material progress components

- ✅ 2: Step counter visible + current step highlighted + total steps shown + loading states present + actions produce visible feedback
- ⚠️ 1: Some status shown but incomplete — title exists without progress indicator, OR progress shown without total steps, OR loading state missing on async actions
- ❌ 0: No indication of where user is in process, no feedback on actions, silent state transitions

### NH§2 — Match Between System and Real World

**Source:** [Nielsen, 1994 — Match Between System and Real World]
**Look for:** Plain language, no technical jargon, mental model alignment, culturally appropriate icons, logical information ordering
**Platform notes:** iOS uses behavioral metaphors (swipe = flick away); Android uses spatial metaphors (elevation, surfaces)

- ✅ 2: All labels/copy in user's language, concepts map to real-world expectations, no jargon, logical process order
- ⚠️ 1: Mostly clear but some technical terms, unclear labels, or jargon that non-tech users won't understand
- ❌ 0: Technical jargon, confusing terminology, mismatched mental models, counter-intuitive process order

### NH§3 — User Control and Freedom

**Source:** [Nielsen, 1994 — User Control and Freedom]
**Look for:** Back navigation, skip/cancel options, undo capability, exit paths from every screen, no dead ends
**Platform notes:** iOS has system swipe-from-left-edge back gesture; Android has system back button/gesture with predictive back animation

- ✅ 2: Clear back navigation + skip option on non-essential steps + cancel available + no forced flows without exit
- ⚠️ 1: Back navigation exists but skip option missing on optional steps, OR exit path requires multiple actions
- ❌ 0: Forced flow with no skip/exit, back button missing or clears data, dead-end screens
- **N/A when:** Design-only evaluation — back navigation behavior requires code inspection

### NH§4 — Consistency and Standards

**Source:** [Nielsen, 1994 — Consistency and Standards]
**Look for:** Platform convention compliance, consistent button styles, consistent terminology, consistent layout across screens
**Platform notes:** iOS: tab bar, navigation bar with back chevron, primary action right. Android: bottom nav/drawer, top app bar, FAB

- ✅ 2: Follows platform conventions + internally consistent button styles + same terminology throughout + consistent layout
- ⚠️ 1: Mostly consistent but some elements break pattern — mixed button styles OR inconsistent terminology OR platform convention violated once
- ❌ 0: Multiple platform convention violations, inconsistent button styles across screens, mixed terminology for same action

### NH§5 — Error Prevention

**Source:** [Nielsen, 1994 — Error Prevention]
**Look for:** Inline validation, type-specific keyboards, smart defaults, flexible input acceptance, disabled submit until valid
**Platform notes:** iOS: `.emailAddress`/`.phonePad` keyboard types. Android: `TextInputLayout` with helper text + input types

- ✅ 2: Inline validation on blur/type + appropriate keyboard types + smart defaults + constrained inputs where possible
- ⚠️ 1: Some validation present but not inline (only on submit), OR missing keyboard type optimization, OR no smart defaults
- ❌ 0: No validation until form submission, generic keyboard for all fields, no input constraints
- **N/A when:** Design-only evaluation — validation logic requires code inspection

### NH§6 — Recognition Rather Than Recall

**Source:** [Nielsen, 1994 — Recognition Rather Than Recall]
**Look for:** Visible options over hidden menus, contextual hints, placeholder text, labels with icons, visible navigation
**Platform notes:** Both platforms deprecated hamburger menu as primary nav; both favor visible tab/bottom navigation with labels

- ✅ 2: All navigation visible + contextual hints on inputs + previous selections visible in multi-step flows + icons have labels
- ⚠️ 1: Navigation visible but some inputs lack hints, OR previous step data not shown in later steps, OR icons without labels
- ❌ 0: Hidden navigation (hamburger-only), no contextual hints, user must remember info from previous screens

### NH§7 — Flexibility and Efficiency of Use

**Source:** [Nielsen, 1994 — Flexibility and Efficiency of Use]
**Look for:** Autofill support, keyboard shortcuts (tablet), smart defaults, skip options for power users, progressive disclosure
**Platform notes:** iOS: 3D Touch/Haptic Touch quick actions. Android: App Shortcuts, widget system

- ✅ 2: Autofill enabled + smart defaults reduce input + skip available for experienced users + progressive disclosure of advanced options
- ⚠️ 1: Some autofill support but not all fields, OR no skip option, OR advanced options hidden with no way to access
- ❌ 0: No autofill, no smart defaults, all users forced through identical lengthy flow
- **N/A when:** Design-only evaluation — autofill/keyboard behavior requires code inspection

### NH§8 — Aesthetic and Minimalist Design

**Source:** [Nielsen, 1994 — Aesthetic and Minimalist Design]
**Look for:** Clear visual hierarchy, one primary action per screen, adequate whitespace, no decorative clutter competing with function
**Platform notes:** iOS: deference (UI behind content), blur/transparency. Android: elevation/shadow for hierarchy, Dynamic Color

- ✅ 2: Clear visual hierarchy + one primary CTA per screen + adequate whitespace + every element serves a purpose
- ⚠️ 1: Generally clean but some competing elements — multiple CTAs of equal weight, OR insufficient whitespace, OR decorative elements distract
- ❌ 0: Cluttered screen with no hierarchy, multiple competing actions, decorative elements overwhelm functional ones

### NH§9 — Help Users Recognize and Recover from Errors

**Source:** [Nielsen, 1994 — Help Users Recognize, Diagnose, and Recover from Errors]
**Look for:** Plain-language error messages, specific problem identification, constructive recovery suggestions, visual error treatment
**Platform notes:** iOS: UIAlertController + inline text, modal approach. Android: TextInputLayout error state + Snackbar, non-modal approach

- ✅ 2: Error messages in plain language + specific to the problem + include actionable fix suggestion + visually prominent (color, icon, proximity)
- ⚠️ 1: Error messages present but generic ("Something went wrong"), OR no fix suggestion, OR error not visually prominent
- ❌ 0: No error messages, technical error codes shown, or errors only in console/logs
- **N/A when:** Design-only evaluation — error states require code/interaction inspection

### NH§10 — Help and Documentation

**Source:** [Nielsen, 1994 — Help and Documentation]
**Look for:** Tooltips, contextual help, FAQ accessibility, help is task-focused and searchable, help available without leaving flow
**Platform notes:** iOS: TipKit framework for contextual tips. Android: Material tooltips, coach marks

- ✅ 2: Contextual help available at point of need + tooltips on complex fields + help accessible without leaving onboarding flow
- ⚠️ 1: Help exists but not contextual — separate FAQ/help section only, OR tooltips missing on complex fields
- ❌ 0: No help available, no tooltips, no contextual guidance

---

## Gestalt Principles

### GP§1 — Grouping and Proximity

**Source:** [Wertheimer, 1923 — Law of Proximity]
**Look for:** Related elements grouped with tight spacing, labels adjacent to fields, logical content groups separated by whitespace
**Platform notes:** Both platforms use card/container patterns for grouping; iOS uses section headers in lists; Android uses Material cards

- ✅ 2: Related elements clearly grouped + labels directly adjacent to fields + distinct groups separated by whitespace or dividers
- ⚠️ 1: Some grouping present but inconsistent — labels distant from fields, OR ambiguous spacing between groups
- ❌ 0: Elements equidistant with no grouping, labels far from fields, no visual separation between content groups

### GP§2 — Consistency and Similarity

**Source:** [Wertheimer, 1923 — Law of Similarity]
**Look for:** Same-function elements share visual style, different-function elements look different, consistent interactive element styling

- ✅ 2: All same-function elements share color/shape/size + different functions visually distinct + consistent interactive styling throughout
- ⚠️ 1: Mostly consistent but some elements break pattern — one button styled differently, OR interactive and non-interactive elements too similar
- ❌ 0: No visual consistency across same-function elements, interactive elements indistinguishable from static ones

### GP§3 — Flow and Continuity

**Source:** [Wertheimer, 1923 — Law of Continuity]
**Look for:** Logical visual flow (top→bottom, left→right for LTR), eye movement guided title→input→CTA, step indicators showing progression

- ✅ 2: Clear visual flow from title to content to action + eye naturally follows intended path + step indicators maintain flow across screens
- ⚠️ 1: General flow exists but some disruptions — competing elements break reading path, OR step indicator disconnected from flow
- ❌ 0: No logical flow, elements scattered without directional guidance, user must search for next action

### GP§4 — Clarity and Closure

**Source:** [Wertheimer, 1923 — Law of Closure]
**Look for:** Well-defined interactive elements (buttons look clickable), clear boundaries, progress bars show completion trajectory
**Platform notes:** iOS: filled/tinted buttons for primary actions. Android: Material filled/outlined/text button hierarchy

- ✅ 2: Buttons clearly look clickable + input fields clearly defined + progress indicators show completion trajectory + all elements have clear boundaries
- ⚠️ 1: Most elements defined but some ambiguous — flat buttons that don't look tappable, OR text links indistinguishable from labels
- ❌ 0: Interactive elements not distinguishable from static ones, ambiguous boundaries, no visual affordance

### GP§5 — Balance and Symmetry

**Source:** [Arnheim, 1954 — Art and Visual Perception]
**Look for:** Balanced layout, consistent alignment, equal spacing, visual weight distributed evenly, no lopsided screens

- ✅ 2: Layout is balanced and harmonious + consistent alignment throughout + equal spacing between equivalent elements + centered or grid-aligned
- ⚠️ 1: Generally balanced but some asymmetry — uneven spacing, OR misaligned elements, OR one side visually heavier
- ❌ 0: Visually lopsided layout, inconsistent alignment, uneven spacing creating sense of disorder

### GP§6 — Focus and Contrast

**Source:** [Ware, 2012 — Information Visualization §3; Rubin, 1915 — Figure-Ground]
**Look for:** Primary CTA visually dominant, clear figure-ground separation, contrast ratio meets accessibility standards, modal overlays have clear depth
**Platform notes:** WCAG AA: ≥4.5:1 normal text, ≥3:1 large text. iOS 44pt / Android 48dp touch targets

- ✅ 2: Primary CTA has highest visual weight + clear figure-ground separation + contrast meets AA standards + modals have clear depth layer
- ⚠️ 1: CTA visible but not dominant — similar weight to secondary actions, OR contrast borderline, OR competing visual elements
- ❌ 0: CTA not distinguishable from other elements, low contrast fails AA, no clear visual hierarchy

### GP§7 — Law of Prägnanz (Simplicity)

**Source:** [Koffka, 1935 — Principles of Gestalt Psychology]
**Look for:** Simple shapes, clean lines, no unnecessary complexity, one concept per screen, progressive disclosure over information dumping

- ✅ 2: Interface is as simple as possible + one primary concept per screen + clean iconography + no unnecessary decorative complexity
- ⚠️ 1: Generally simple but some unnecessary complexity — too many options on one screen, OR complex icons, OR mixed visual styles
- ❌ 0: Information overload, multiple competing concepts per screen, unnecessarily complex visual elements

### GP§8 — Law of Common Fate

**Source:** [Wertheimer, 1923 — Law of Common Fate]
**Look for:** Related elements animate/move together, error fields grouped by animation, synchronized loading states, consistent transition directions
**Platform notes:** iOS: matched geometry effect, spring animations. Android: Material motion (shared axis, container transform)

- ✅ 2: Related elements animate together + error fields animate as group + loading states synchronized + transition directions consistent
- ⚠️ 1: Some motion grouping present but inconsistent — related elements animate at different speeds, OR transitions inconsistent between screens
- ❌ 0: No motion grouping, unrelated elements animate together, jarring/inconsistent transitions
