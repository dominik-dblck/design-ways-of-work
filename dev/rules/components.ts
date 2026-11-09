/**
 * - `rules` · components: the shared rules, then this side’s own
 */
import { ruleFileFor } from '../../shared/rules/ruleFileFor.ts';
import { shared } from '../../shared/rules/components.ts';

// prettier-ignore
const rules = ruleFileFor({
  side: 'build',
  shared,
  intro: '',
  rows: [
    { rule: 'An atom is one element over MUI and the theme; joined with another atom it is a molecule (`HintButton`, not a `Button` with two more props). A neighbour\'s id comes in as a prop (`describedBy`), and an atom under a `Hint` passes on its listeners and its ref.', gate: '`anAtomComposesNothing`', exceptions: '—', why: 'A prop that adds a neighbour is a second component hiding in the first.' },
    { rule: 'A molecule imports no query, request, command or provider: what it draws comes in as props (`app/providers/` read with a type import alone).', gate: '`theMoleculesAreDumb`', exceptions: '—', why: 'It draws what it is handed, so every screen can use it.' },
    { rule: 'The shell mounts no dev tooling: `PersonaStrip` is the root frame\'s, and `AppShell` never imports it, its barrel included.', gate: '`theStripIsNotTheShells`', exceptions: '—', why: 'The shell is the chrome every screen mounts inside; a dependency on the strip is dev tooling every screen inherits.' },
    { rule: 'Every organism a page mounts is a flow organism; it keeps one view per state in `components/state-views/` and switches between them (`EditorScreenLoadingView`, `EditorScreenReadyView`).', gate: '`aScreenIsAFlowOrganism`', exceptions: '`Campaigns`, on the scan\'s baseline until the documents by type and kind replace it', why: 'Each state reads on its own, and the switch is the one place that chooses.' },
    { rule: '`@mui/material` is imported under `app/components/` only.', gate: '`theWrappersAreTheDoor`', exceptions: '—', why: 'A change to how MUI is used lands in the wrappers, not across the screens.' },
    { rule: 'Every component is a row of `app/styles/components.spec.json`, copied from the design side, or on the roster of organisms this repository owns.', gate: '`nothingIsUnnamed` · `theComponentSpec`', exceptions: '—', why: 'A shape the wireframes do not draw is a question to the design side, not a component.' },
    { rule: 'A test id comes from `e2e/testingIds/`, never a literal.', gate: '`testIdsComeFromTheRegistry` · `testIdsArePrefixed`', exceptions: '—', why: 'The browser tests reach every element through one registry.' },
    { rule: 'A heavy component the first screen does not need loads through `next/dynamic` (`RichTextField`).', gate: '`theRichTextEditorLoadsOnDemand`', exceptions: '—', why: 'The editor\'s code stays out of the first load.' },
    { rule: 'Every glyph is Lucide\'s, through `atoms/Glyph`, by name and a theme step (`small`, `medium`, `large` for a control; `dot`, `badge`, `inline` for a mark), never a number; `glyphSetConstants.ts` is the one importer of `lucide-react`, pinned to an exact version; the colour is `currentColor`.', gate: '`theIconSet`', exceptions: '—', why: { shared: 'oneGlyphSet' } },
    { rule: '`components/icons/` holds only what Lucide has no glyph for, the brand marks and the one-offs: one flat file each, named exports, no barrel, `IconProps` with one `size`; no `<svg>` is drawn by hand anywhere else.', gate: '`theIconSet`', exceptions: '—', why: 'Two numbers for one size are two numbers a call site can set out of proportion.' },
  ],
  outro: '\n## The folder shape\n\n```\ncomponents/atoms/Button/\n  Button.tsx                         # the component and its props type\n  index.ts                           # the barrel\n  constants/buttonConstants.ts\n  types/buttonTypes.ts\ncomponents/organisms/ApprovalBar/\n  ApprovalBar.tsx\n  index.ts\n  components/ApprovalBarActions.tsx  # one component each\n  constants/approvalBarWords.ts\n  types/approvalBarTypes.ts\n  utils/approvalBarToDoUtils.ts\n```\n',
});

export { rules };
