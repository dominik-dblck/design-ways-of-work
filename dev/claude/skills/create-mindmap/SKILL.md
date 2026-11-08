---
name: create-mindmap
description: Create a detailed mind map from a knowledge base article — read the full article (including image descriptions), extract all concepts, examples, and outcomes, produce a structured Markdown mind map compatible with markmap.js. Use when user asks to create a mind map from an article.
---

# Create Mind Map

You create **detailed, structured mind maps** from knowledge base articles. Your output is a single Markdown file optimized for both reading and interactive visualization (markmap.js).

You do **not** integrate the mind map into the skill ecosystem — that is `/integrate-knowledge`. You produce the file and hand off.

## Project Root

All file paths are **relative to the project root**, NOT the application root (`app/`). Use paths like `knowledge/...`, `.claude/skills/...`.

## Knowledge Domains

The knowledge base is split by domain. Each domain has the same two-folder shape but a different file layout inside:

| Domain     | Source layout                                                             | Mind map output                          |
| ---------- | ------------------------------------------------------------------------- | ---------------------------------------- |
| `ai/`      | Seasoned: `original_source/SXX/EYY/`                                      | `mindmaps/SXX/sXXeYY-mindmap.md`         |
| `ux/`      | Flat: `original_source/{source}-{topic}.md`                               | `mindmaps/{topic}.md`                    |
| new domain | Follow the flat layout unless the source material is genuinely serialized | `knowledge/{domain}/mindmaps/{topic}.md` |

**Ask which domain** if the user's article path does not make it obvious. Putting a mind map in the wrong domain makes it invisible to the skills that load by domain.

## Process

### 1. Read the Source Article

**Seasoned layout (`ai/`)** — the folder holds up to three complementary files:

```
knowledge/ai/original_source/SXX/EYY/
├── sXXeYY-<article-title>.md          # main article
├── sXXeYY_images_to_ascii.md          # image descriptions (ASCII art)
└── AID4_SXXEYY [<id>].md              # extra knowledge — context, insights, commentary (optional, high value)
```

**Flat layout (`ux/` and new domains)** — one article per file, no companions:

```
knowledge/ux/original_source/nngroup-10-heuristics.md
```

Rules either way:

- **Read ALL files** in the source folder. Each carries knowledge the others don't:
  - Main article — primary content. Read in chunks if long (lines 1–300, then 300+).
  - ASCII image descriptions — pre-converted structural descriptions of every diagram, flow, schema, UI screenshot. **Image knowledge comes from this file** — do NOT spawn subagents to fetch or describe images.
  - Extra knowledge (`AID4_*`) — treat as a **supplement that adds detail** the main article may not cover.
- Incorporate image descriptions into the mind map — they often carry details absent from the prose.
- **Source language varies; output is always English.** The `ai/` articles are Polish. Translate concepts, keep proper nouns, tool names, and quoted metrics verbatim.

### 2. Extract Structure

For each major section/topic in the article, create a top-level heading (`## N. Topic Name`). Under each:

- **Core concept** — what is it, why does it matter
- **Research basis / evidence** — studies, authors, years, measured numbers where the article gives them
- **Key technical points** — mechanisms, rules, constraints
- **Examples** — concrete examples from the article (repos, tools, scenarios)
- **Common violations / anti-patterns** — what going wrong looks like
- **Practical implications** — what a builder should take away
- **Connections** — how this topic relates to others, cross-referenced by key (e.g. `NH§1`, `S02E04 §3`)

Not every article supports every bullet. Drop the ones the source cannot back — an empty heading is worse than a missing one.

### 3. Formatting Rules

- **Title**: `# {ID} — Article Title in English` (ID = `SXXEXX` for `ai/`, the topic name for flat domains)
- **Sections**: `## N. Section Name` — numbered to match article flow
- **Hierarchy**: nested bullets (`-`, then `  -`, then `    -`)
- **Bold** for key terms, concepts, emphasis
- **Links** preserved from the original (GitHub repos, tools, papers, spec sections)
- **No code blocks** unless the article contains actual code
- **No emojis**
- Bullets **concise but complete** — one idea per bullet
- Include `unknown` / `debate` points where the article leaves questions open or presents trade-offs
- **Stable citation keys** — if the domain uses them (`NH§1`, `GP§3`, `OP§8`), put the key in the heading so rubrics and evals can cite it

### 4. Output

- Save to the domain's mind map path (see Knowledge Domains table above)
- If a mind map already exists for this article, **overwrite it** — the user is asking for a fresh generation
- **Never edit `original_source/`** — it is the immutable record

### 5. Hand Off

After saving a **new** mind map (not an overwrite), tell the user it needs registering and hand off:

> Mind map written to `{path}`. Run `/integrate-knowledge` to register it in `KNOWLEDGE-INDEX.md` and fold its concepts into the architect skill.

Do **not** edit `KNOWLEDGE-INDEX.md`, `REFERENCE.md`, or the patterns yourself — that is `/integrate-knowledge`'s job, and it diffs against current state before writing. Skipping it produces duplicate concepts.

## Quality Checklist

Before finishing, verify:

- [ ] Every major section from the article has a corresponding heading
- [ ] ASCII image descriptions from the companion file are incorporated (not skipped)
- [ ] Extra knowledge from the `AID4_*` file is incorporated (if present)
- [ ] Examples are included with concrete details — not just "see example"
- [ ] Measured numbers from the source are quoted exactly, with what they measured
- [ ] Key terms are **bolded** for scannability
- [ ] Links to external resources are preserved
- [ ] Citation keys are in headings, if the domain uses them
- [ ] Reads well both as flat Markdown and as a markmap.js tree
- [ ] No sections were missed due to chunked reading
- [ ] Output is in the correct domain folder
- [ ] Hand-off to `/integrate-knowledge` stated

## Reference: Existing Mind Maps

`.claude/skills/architect/KNOWLEDGE-INDEX.md` is the single source of truth for what exists and what each mind map covers. **Read it, don't duplicate it here** — a second list drifts.

Use these as format examples:

| Example                                              | Why                                                                   |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| `knowledge/ai/mindmaps/S02/s02e04-mindmap.md`        | Seasoned layout, 10 branches, dense cross-references between sections |
| `knowledge/ux/mindmaps/ux-principles.md`             | Flat layout, stable citation keys (`NH§`/`GP§`) in headings           |
| `knowledge/ux/mindmaps/onboarding-best-practices.md` | Flat layout, research evidence with exact measured numbers            |
