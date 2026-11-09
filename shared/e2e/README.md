**The browser tier.** The way of working's framework for a product's flows: its files import node's builtins,
`@playwright/test` and each other alone, never a product's code. A product names its screens, its registry and
its health path in its scope; its flows import this framework's face (`shared/lint/knipConfig.ts · BROWSER_FACE`).

**`runCategorisedTests`** takes `category -> name -> run(context)` and turns it into Playwright
tests. Two defaults come with it: a `beforeAll` that fetches the product's `healthPath` and fails the suite
with one sentence, and an `afterAll` that prints the coverage table once, from its `reportingProject`. It hands
`page` and `browser` to `createContext`, and `serial` runs a suite in order, stopping at the first
failure.

**`theRuntime`** answers `baseUrl`, from the product's `playwright.config.ts` alone (`use.baseURL`, read
off each test's project): no default of its own and no environment read here, so the address has one home.

**`theFlowCatalog`, `theFlowShapes`, `theDefinitions`** are the catalogue, the kinds of path a flow walks in `flowPaths`: a flow is prose with a
stable id, the catalogue key **is** the id, and the ids and the array are derived from it.

**`theCoverageRegistry`** records what ran and prints the table: every flow of the screen, covered
or not.

**`clicking`, `waiting`, `asserting`** are the interactions. `clickWithFallback` is the one
that earns its keep: a click Playwright refuses with `intercepts pointer events` or `element is not
enabled` is pressed once more a second later, as a person would — the pointer moved off first, so an
interactive tooltip it opened over the target closes — and never dispatched or forced; one
refused with `element is not stable` is dispatched, then forced. It costs nothing when
it does not fire, which is most of the time in chromium and rarely in firefox.

**`dragging`** (its pointer in `dragPointer`, its moves in `dragHold`) is a drag as a person makes it, through Chromium's DevTools protocol: the browser's
own dragstart on the source, then `Input.dispatchDragEvent` for every move, and three more while the
pointer rests, as a browser keeps sending dragover. A `DragEvent` a script dispatches on an element
reaches no listener a drag-and-drop library holds on the window, so it proves nothing about one.
`pickUp` lifts a row the page drew; `carryIn` brings files in from disk, as from the desktop, and
the drop hands the page the files themselves. A target the page moves while the pointer travels is
followed, and the press waits, as a click does, until no other element covers the source. Two
things the protocol cannot do: the page is sent no dragleave when a drag ends with
nothing let go, so a zone is left by moving off it first; and headless Chromium never opens a file
let go where the page does not hold it. Chromium only.

**A journey's file is named for what the person does.** A journey of the product's journeys data runs as one
flow at `{screensRoot}/{screen}/journeys/{whatThePersonDoes}.spec.ts`, its title opening with the journey's id —
`J6 · TR removes a block after v3 and restores it` in `removesAndRestores.spec.ts`. The product's data names
a flow by its id and the repository names the file, so no file is named `J{n}.spec.ts`: a folder of
`J1` to `J12` says nothing about what each one walks.
