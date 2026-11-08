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

- [x] the `.dc.html` wireframes leave the way of working: ds-scan (tool, guard, 11 parts), checks parts r and h,
      the page lines of part a (src holes, app mark, page scripts), source-check's page checks (components, two
      versions, props, page scripts) and its read list's pages, the Feature page's screens and drawings frames,
      the pack's wireframe pointers, three styling rules, checklist rule design-scan-before-ready (moved to the
      product's quality rules: closed tickets cite it), the recon table's row 26
      - left for phase 5: `layout.ts` still publishes `legacy/` at the artifact's root, and source-check's
        `SHEET_PAGE` and `isHistory` still filter page names; both are product facts that move to `product.ts`
      - the product keeps part d's two helpers (`legacyWorld.ts`, `pageShims.ts`): its list check runs the
        type page, a legacy page
- [ ] every icon a source names is written from lucide-static; `public/lucide-icons` (hand copies) does not come here
- [ ] a third page, Wireframes, and its view in `app/workspace/`: a placeholder first (PM, 8 Nov)
- [ ] `dev/` holds the build side's coding rules and skills (arch review, a component's structure…), taken from
      eagle-dev, and its folder structure, atomic design, product-agnostic
- [ ] the design side's own pages follow those rules: Board, Feature and Wireframes restructured the eagle-dev way
- [ ] one design system at the top, `design-system/`: the tokens and the shared atomic components, loaded into every
      repository by a script, never copied by hand (PM, 8 Nov; changes D62, where eagle-dev owned it)
- [x] no file named by a number: the documents' parts named by what they hold (15 pipeline parts, 2 api-convention
      parts, agent-instructions in one file); `aFileNamesItsPurpose` refuses a number; size.md says why

## The port folder

`ports/eagle-design/` holds what the port changes in eagle-design itself; the rehearsal lays it over the copy.
It is a patch (`ports/eagle-design/port.patch`), written by `scripts/port-save.ts` from the rehearsal copy's own
edits: a patch made on an older eagle-design fails to apply, where a copied file would silently overwrite. Today:
eagle's 14 numbered files as a baseline; design-scan-before-ready in its quality rules; part d's two helpers;
ds-scan out of buildReads, Measure's scan fixtures and package.json; the generated skill and pipeline.
`package.json` in the patch is diffed against the rehearsal's own (`NODE_OPTIONS` added), so the port writes that too.

`plan/expected-differences.tsv` lists every output a decided change moves, with why; `yarn verify` fails on any
other difference, and on a listed one that no longer differs.
