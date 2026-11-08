---
name: integrate-knowledge
description: Integrate a new knowledge base article (mind map) into the architect skill, its reference tables, and the pattern/eval files. Reads the new content, diffs against current state, classifies concepts, presents a plan, and implements on approval. Use when user says "integrate", "new article ready", or "add to knowledge base".
---

# Integrate Knowledge

You integrate new knowledge base articles into the skill ecosystem. You read, classify, plan, and implement — **always presenting the plan before changing anything.**

A mind map sitting in `knowledge/` that no skill references is dead weight. Your job is to make it reachable and to fold its durable lessons into the files skills actually load.

## Project Root

All paths relative to the project root, NOT `app/`.

## Workflow

### 1. Load Current State

Read these to understand what is already covered:

| File                                              | What it holds                                                              |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| `.claude/skills/architect/KNOWLEDGE-INDEX.md`     | **Tier 2 index** — every mind map + article, with "when to load"           |
| `.claude/skills/architect/REFERENCE.md`           | Design principles cheat sheet, organized by topic with KB citations        |
| `.claude/skills/architect/PLANNING-CHECKLISTS.md` | Creation checklists (agents/skills, tools, KB integration, reviews, infra) |
| `.claude/skills/architect/SKILL.md`               | Tier 1 compact domain summary + Design Principles (Top 5)                  |

Read `KNOWLEDGE-INDEX.md` **first and in full**. It is the single source of truth for what exists. Never rebuild that inventory from a `ls` — the index says what each file is _for_, which is what you need to judge overlap.

### 2. Read the New Content

Read the new mind map the user provides. Identify every concept, pattern, and principle it introduces.

If the user provides a full article instead of a mind map:

- Mind maps live in `knowledge/{domain}/mindmaps/` (see the domain table in `/create-mindmap`)
- No mind map exists → **stop and suggest `/create-mindmap` first.** Integrating from a raw article means classifying unfiltered detail, which is how implementation trivia leaks into `REFERENCE.md`.

### 3. Diff Against Current State

Compare new content against the four files from step 1. For each concept ask: **is this genuinely new, or already covered?**

- Already covered → skip (note in plan as "existing", with where it already lives)
- Covered but incomplete → flag for update, name what is missing
- Genuinely new → classify (step 4)
- Contradicts existing content → **flag it explicitly.** Do not silently overwrite. A newer source superseding an older one is a decision for the user, and the old entry may need deleting rather than editing.

### 4. Classify Each New Concept

| Concept type                                                               | Target                            | Where exactly                                                                                                                  |
| -------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Design principle or architectural pattern**                              | `REFERENCE.md`                    | Matching cheat sheet section (Tool Design, Schema, Context, Security, Agent Design…) — or a new `## Topic (Source §N)` section |
| **Planning consideration** for agents/tools/infra                          | `PLANNING-CHECKLISTS.md`          | The relevant checklist (§1 agents/skills, §2 tools, §3 KB integration, §4 reviews, §5 infra)                                   |
| **Topic trigger** for loading context                                      | `KNOWLEDGE-INDEX.md`              | Domain's Mind Maps table + Deep Dive Articles table                                                                            |
| **Top-5-worthy principle** (changes how the architect advises by default)  | `SKILL.md`                        | Design Principles section. **Rare** — argue for it, and say which existing principle it displaces                              |
| **Coding-level convention** (framework rule, API shape, styling rule)      | `docs/rules/{topic}.md`           | A row in an existing rule file (`docs/rules/README.md`), with its gate; architect does not load them                           |
| **Scoring rubric with calibrated anchors** (per-criterion ✅2/⚠️1/❌0)     | `.claude/evaluations/{topic}.md`  | Rubrics live in evaluations, e.g. `ux-evaluation.md`, beside the gates that cite them                                          |
| **Pass/fail gate criterion** for a review                                  | `.claude/evaluations/{x}-eval.md` | Existing eval checklist, plus its MANDATORY-tasks list at the top                                                              |
| **Too implementation-specific** (product names, algorithm internals, code) | Exclude                           | Note in plan with reasoning                                                                                                    |

Two rules that keep the ecosystem clean:

1. **A concept goes in exactly one place.** If it looks like it belongs in both `REFERENCE.md` and a pattern file, decide by audience: architect-level advice → `REFERENCE.md`; something a coder does at the keyboard → `patterns/`.
2. **Every added line carries a citation** to its source (`(S02E04 §3)`, `[NH§1; Nielsen, 1994]`). An uncited claim in `REFERENCE.md` cannot be verified later and will eventually be treated as folklore.

### 5. Present Plan

Output a structured plan:

```
## Integration Plan: {Article ID or topic}

### Additions
- [concept] → [target file] → [section] — [one-line description]

### Updates (existing content, needs enrichment)
- [concept] → [target file] → [section] — [what changes]

### Conflicts (new source disagrees with existing content)
- [concept] → [file:section] — [old claim] vs [new claim] — [recommendation]

### Excluded
- [concept] — [why: too specific / already covered / not relevant to this repo]

### New KNOWLEDGE-INDEX entries
- Mind map: `knowledge/{domain}/mindmaps/{file}.md` | [when to load]
- Deep dive: `knowledge/{domain}/original_source/{pattern}` | [when to read]
```

**Do NOT implement until the user approves.** If the plan is empty because everything is already covered, say that in one line — an empty plan is a valid result.

### 6. Implement on Approval

Edit the target files. Order matters — index last, so it describes what actually landed:

1. `.claude/patterns/*` and `.claude/evaluations/*` — implementation-level content
2. `REFERENCE.md` — principles, with citations
3. `PLANNING-CHECKLISTS.md` — new `□` checkboxes with citations
4. `SKILL.md` — only if a Top-5 principle changed
5. `KNOWLEDGE-INDEX.md` — the new mind map + article rows

If the domain section does not exist yet in `KNOWLEDGE-INDEX.md`, create it following the existing shape: `## {domain}/ — {Domain Name}` → `### Mind Maps` → `### Deep Dive Articles`.

### 7. Post-Integration Checks

- Every new `REFERENCE.md` / `PLANNING-CHECKLISTS.md` line has a KB citation
- `KNOWLEDGE-INDEX.md` paths match actual files on disk — verify with a read, not from memory
- No duplicate concepts introduced (re-grep the key term across all four target files)
- A new eval criterion was added to **both** the criteria list and the MANDATORY-tasks list at the top of that eval file
- New rule file → registered in `docs/rules/README.md`, and a new folder in `docs/map.md`
- New eval file → registered in `CLAUDE.md` Evaluation Templates table and wired into the consuming command/skill
- `/create-mindmap`'s format-example table still names files that exist

## Knowledge Source Paths

**`.claude/skills/architect/KNOWLEDGE-INDEX.md` is the inventory.** Read it — it is not duplicated here, deliberately. Three copies of the same table drift, and the copy you happen to read becomes wrong.

### Target Files

| File                                              | What it contains                                     |
| ------------------------------------------------- | ---------------------------------------------------- |
| `.claude/skills/architect/KNOWLEDGE-INDEX.md`     | Tier 2 — mind map + article tables per domain        |
| `.claude/skills/architect/REFERENCE.md`           | Design principles cheat sheet, cited                 |
| `.claude/skills/architect/PLANNING-CHECKLISTS.md` | Creation checklists by type                          |
| `.claude/skills/architect/SKILL.md`               | Tier 1 summary + Design Principles (Top 5)           |
| `.claude/patterns/*.md`                           | Implementation-level conventions and scoring rubrics |
| `.claude/evaluations/*-eval.md`                   | Gate checklists consumed by review skills            |
