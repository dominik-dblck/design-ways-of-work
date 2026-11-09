# The browser tier into the way of working (chunk 8), a sketch

From eagle-dev's inventory and its check, 9 Nov. Nothing moves before the PM's Q1 and Q2.

Home in wow: shared/e2e/ (framework), shared/tests/ (gates), a new shared/skills/ home for the generic e2e skill parts
(wow has no shared skill home today: its skills live under design/, the design product's).

1. Framework, by script from mailing-automation/e2e/framework (copy, never retyped):
   - as they stand (8): asserting, clicking, waiting, colours, dragging, theCoverageRegistry, theFlowCatalog, theDefinitions
   - FLOW_PATHS split out of theFlowShapes into its own file (the kinds are wow's); the "names the sheet gives" comment reworded
   - runCategorisedTests: base URL, health path and reporting project become params; their one home the product's
     playwright.config.ts (`testInfo.project.use.baseURL`), never the env read twice (fixes 8.1's two homes at the port)
   - theRuntime: reads the base URL from Playwright's config, no default of its own
   - README: the framework half to wow; the product half stays the product's README
2. Scope: `browser: BrowserTier | null` on RepoScope, explicit (null = no browser tier, the gates report skipped with
   that reason, never pass silently): { screensRoot, registry, statusRoot, templates, componentRoots, roles,
   exemptions: [{ file, why }] }; roles computed from the product's data in its scope.ts (the spelling.computed
   pattern); paths named by the scope, never fixed by wow (a repository names its code once, in scope.ts)
   The registry's shape (`{screen}TestIds` exports, `testid-` values) is the framework's convention, named once in
   shared/e2e, not a scope knob
   `tests: { tiers, helpers, exemptions }`, its own group (SRP): tiers computed by the product's scope.ts through a
   wow helper `tiersOf(vitestConfig)` reading its own vitest config (never a second list of globs), plus `e2e/`
3. Gates as shared tests on `scope.browser`:
   agnostic now: aDragGoesThroughTheFramework, everyPathIsWalked, theStatusFileHolds, e2eReachesByTheRegistry,
   timeIsMovedNotWaited (its one exemption to scope), theBrowserTierIsPortable inverted (framework imports node
   builtins, @playwright/test and its own folder only)
   e2eReachesByTheRegistry split by the tool that reads its fact: half 1 (no getByRole/Text/Label/Placeholder, css
   locator or waitForTimeout in a flow) an ESLint `no-restricted-syntax` on e2e files, timeIsMovedNotWaited's wait
   with it; half 2 (every registry leaf rendered and read, a group used whole covers its leaves) a shared test
   on scope data: everyRoleHasAFlow (roles), testIdsComeFromTheRegistry (componentRoots)
   the tests group, not the browser's: aHelperServesTwoTiers (scope.tests)
   stays the product's: aFlowSaysARefusal (its message API: REFUSALS, `say`, `.line`, its placeholder syntax)
   depends on Q1: aJourneyIsNamedForWhatItDoes, theScreenSuite
   each proven red/green on a fixture tree under tests/ (wow and the design copy have no browser tier)
4. Skills: rule 3 points at the shared rule row, rule 8 says "the browser command" (the product names its script);
   rules 1, 3-8, 12, 13, 15 of e2e/_shared.md and e2e-category/e2e-discovery's framework steps to shared/skills;
   rules 2, 9, 10, 11, 14, 16 stay the product's, appended by its scope's instructions
5. Package: @playwright/test 1.63.0 exact in wow (types for the framework; no browser install in wow)


The PM's questions are on `plan/overnight-8-nov.md`'s morning list.
