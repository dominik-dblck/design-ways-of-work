# legacy/

Scripts that ran once and refuse a second run: each wrote files this repository now holds as its source.
Kept as they ran, frozen: no check reads them, and nothing imports them.

- `extract.ts` · copied the way of working's files out of eagle-design into `design/`
- `take-dev.ts` · took eagle-dev's code rules as data into `dev/rules/`
- `split-rules.ts` · split both rule sets into `shared/rules/`, `design/docs/rules/` and `dev/rules/`
- `take-tokens.ts` · read both stylesheets into `design-system/` and the product's `product-tokens.ts`

## `dev/claude/`

The build side's skills and evaluations the PM retired (8 Nov: unused; moved 9 Nov · A), as they were taken.
`scripts/take-dev-claude.ts` and `scripts/take-dev-map.ts` read this folder to leave them out of a new take.

- `skills/` · the planning pipeline outside the specification (architect, brainstorm, discovery, plan,
  orchestration, their gates and the orchestrator), and the knowledge base's mind maps (create-mindmap,
  integrate-knowledge)
- `evaluations/` · the gates only those skills read: discovery, plan, orchestration, architecture, web search
