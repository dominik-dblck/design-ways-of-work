# legacy/

Scripts that ran once and refuse a second run: each wrote files this repository now holds as its source.
Kept as they ran, frozen: no check reads them, and nothing imports them.

- `extract.ts` · copied the way of working's files out of eagle-design into `design/`
- `take-dev.ts` · took eagle-dev's code rules as data into `dev/rules/`
- `split-rules.ts` · split both rule sets into `shared/rules/`, `design/docs/rules/` and `dev/rules/`
- `take-tokens.ts` · read both stylesheets into `design-system/` and the product's `product-tokens.ts`

## The extraction's scaffolding

What proved the extraction file by file, retired on 11 Nov when the gate began to read a repository
(`yarn consumers`): the port is eagle-design's branch `port/wow`, not a patch.

- `scripts/rehearse.ts` · a copy of a product with this repository's files hard-linked in place
- `scripts/verify.ts` · that copy against a clone of the product: every output compared
- `scripts/portSave.ts` · the port written as a patch from the copy
- `scripts/moveProduct.ts` · a product's files moved in the copy and here at once
- `ports/eagle-design/port.patch` · the port as a patch, last saved on 10 Nov
- `plan/inventory.tsv` · each file of eagle-design and the home it went to
- `plan/expected-differences.tsv` · the differences `verify` expected, each with its why

## `dev/claude/`

The build side's skills and evaluations the PM retired (8 Nov: unused; moved 9 Nov · A), as they were taken.
`scripts/take-dev-claude.ts` and `scripts/take-dev-map.ts` read this folder to leave them out of a new take.

- `skills/` · the planning pipeline outside the specification (architect, brainstorm, discovery, plan,
  orchestration, their gates and the orchestrator), and the knowledge base's mind maps (create-mindmap,
  integrate-knowledge)
- `evaluations/` · the gates only those skills read: discovery, plan, orchestration, architecture, web search
