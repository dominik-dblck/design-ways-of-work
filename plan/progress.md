# Where the extraction stands

| phase | state | proof |
|---|---|---|
| 0 plan | done | `PLAN.md` v1.2, `plan/inventory.tsv` |
| 1 scaffold | done, minimal | `package.json` (extract, rehearse, verify); no lint or tsc here yet: design/ compiles only inside a product |
| 2 files | done | 371 files of the wow categories copied as they are at eagle-design 266822b |
| 7 rehearsal | done for phase 2 | `yarn verify ../eagle-design`: build, checks, tsc, lint, test, spec-check, checks:gate, ds-scan, dist/ and every written file the same |

## The mechanism, decided while building (8 Nov)

- Files keep their paths. The plan's `@product/*` alias and a `wow/` folder were tried first: a `wow/` folder moves
  every file one level down, so `ROOT` and 167 home paths would change. Linked in place, nothing moves.
- Three changes in design/ make links work, none changes an output: `walk` in `tools/layout.ts` takes a link to a
  file as a file; `tools/build.ts` bundles with `resolve.symlinks: false`; the product runs node with
  `--preserve-symlinks --preserve-symlinks-main`.
- `scripts/extract.ts` ran once: design/ is the source now, and a second run refuses.

## Scope added by the PM (8 Nov)

- [ ] the `.dc.html` wireframes leave the way of working: ds-scan, the Feature page's drawings and read-list links,
      the pack's wireframe pointers, source-check's page lists, the two styling rules, ticket-pipeline row 26
- [ ] every icon a source names is written from lucide-static; `public/lucide-icons` (hand copies) does not come here
- [ ] a third page, Wireframes: every screen together, drawn in React from the product's screens (the POC's way)
- [ ] `dev/` holds the build side's folder structure, atomic design (atoms, molecules, organisms, templates, pages)
- [x] no file named by a number: the documents' parts named by what they hold (15 pipeline parts, 2 api-convention
      parts, agent-instructions in one file); `aFileNamesItsPurpose` refuses a number; size.md says why

## The port folder

`ports/eagle-design/` holds what the port changes in eagle-design itself; the rehearsal lays it over the copy.
Today: the baseline of eagle's 14 numbered files.

`plan/expected-differences.tsv` lists every output a decided change moves, with why; `yarn verify` fails on any
other difference, and on a listed one that no longer differs.
