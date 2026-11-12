---
name: design-start
description: "Opens a design-side session: the git state, the rules read first, what is decided, open and in hand, and the build side's messages. Use when a session starts, after a compaction or after a context reset."
---

<!-- Written by `yarn build` from `docs/skills/start.ts`: edit the data, never this file. -->

# design-start · the start of a session

A context reset loses the chat and nothing else: what is in hand is data (W49) — a ticket's status and receipt on the board, an open point a row of `roadmaps/findings.ts`, a decision a row of `docs/process/decisions.ts`.

## In this order

1. `git status` clean, then `git pull`.
2. The rules: the generic ones in `docs/process/plans/` (`principleRules.ts`, `designRules.ts`, `deliveryRules.ts`, `checklistRules.ts`, W59), the product’s in `sheet/rules/` (`domainRules.ts`, `productRules.ts`, `experienceRules.ts`, `architectureRules.ts`, `qualityRules.ts`, W58), each row named by a key that says what it does and cited as `rule:{key}`: read rule:one-source-of-truth, rule:one-responsibility, rule:server-facts-screen-view, rule:layers-read-downward and rule:first-line-says-what before any work · this file names them and never copies them.
3. The product’s own facts: sheet/project.ts · product, company, buildSide, designSession, buildSession, buildRepository, buildBranch, referenceTools. The generic texts name a role; this file names who fills it.
4. `docs/process/decisions.ts`, D1 on: what is decided.
5. `roadmaps/findings.ts`: what is open.
6. The state today, computed from the board, never written (W49): `Tickets.counts`, `Tickets.byColumn`, `Tickets.next`, `Tickets.waitingOn`. The README’s old state lines are `records/state-today-27-oct.md`.
7. The pack of the ticket in hand (`fixtures/packs/{id}.md`), then the Board (`app/pages/board.tsx`, built to `Board.html`).
8. Messages from the repo session: they arrive by `SendMessage`; find it with `ListAgents` (`design-answer-cc`).
9. The build side’s component package: its changelog since the version the drafts pin, each change named. `rule:components-ship-as-a-package`

## Then

- Nothing else until a checklist line asks for it — and `design-refine` · How a point is decided, step 2, asks, before every point, for what the epics it stands on decided: their EDGES, the product’s decided points (`docs/process/projectPlan.ts · decisions`), their notebooks.
- History is in git: `git log --follow -p -- <file>`, and the tag `archive-claude-design-2` (W41). The process documents these skills were cut from are in `legacy/` (W53).
