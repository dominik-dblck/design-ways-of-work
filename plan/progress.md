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
- [x] every icon a source names is written from lucide-static (21 today); `public/lucide-icons` (71 hand copies,
      used only by the legacy pages) does not come here, and the port drops it from eagle
- [x] a third page, Wireframes, and its view `app/workspace/wireframes-view.ts`: every screen of the sheet by track,
      each a placeholder frame until the design system's components draw it; tested
      - found on the way: a page's bundle could overwrite a sheet module's (`wireframes.js`): a page bundles as
        `<page>-page.js` now, and the build refuses two sources at one path
- [x] `dev/rules/` · eagle-dev's 18 code-rule files as data, taken by `scripts/take-dev.ts`; the product's build
      prints them back byte for byte (`take-dev --check`), so a release can carry them to every build repository
- [x] `dev/map.ts` → `dev/map.md` · the build repository's folders, atomic design and the organism's inner folders
      included, eagle-dev's routes, renderers and domain concepts cut (`scripts/take-dev-map.ts`, 93 folders)
- [ ] the skills: the ticket skills already ride `ticket-pipeline.md`; eagle-dev's lane-B skills (architect,
      plan-*, orchestrator, evaluate-*, e2e) and `.claude/evaluations/` come next, the same way
- [ ] one set of code rules: `design/docs/rules` (13 files, the design side's) and `dev/rules` (18, eagle-dev's)
      overlap in 11 files and mostly disagree in wording — a decision for the PM
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
