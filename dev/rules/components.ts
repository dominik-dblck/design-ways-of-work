/**
 * - `rules` · components: the shared rules, then this side’s own
 */
import { rowsFor } from '../../shared/rules/rowsFor.ts';
import { shared } from '../../shared/rules/components.ts';
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

// prettier-ignore
const rules: RuleFile = {
  title: 'Components',
  intro: '\n`app/components/` in atomic design: a tier is counted from what a component imports, never judged\nfrom its size.\n',
  rows: [
    ...rowsFor('build', shared),
    { rule: 'An atom is one element over MUI and the theme; joined with another atom it is a molecule (`HintButton`, not a `Button` with two more props). A neighbour\'s id comes in as a prop (`describedBy`), and an atom under a `Hint` passes on its listeners and its ref.', gate: '`anAtomComposesNothing`', exceptions: '—', why: 'A prop that adds a neighbour is a second component hiding in the first.' },
    { rule: 'A molecule imports no organism, template, query, command or `useContext`.', gate: '`aMoleculeComposesOneMolecule` · `theMoleculesAreDumb`', exceptions: '—', why: 'It draws what it is handed, so every screen can use it.' },
    { rule: 'An organism is reached through its barrel: a page mounts one, and an organism may render another (`NameDialog`) only through `organisms/{Name}`.', gate: '`organismsMeetAtTheBarrel` · `theStripIsNotTheShells`', exceptions: 'one slot component exported beside the organism for the shell\'s header (`TypeLibraryHeader`, `EditorScreenHeader`)', why: 'The barrel is the organism\'s face; the files behind it can move.' },
    { rule: 'Every component has the organism\'s folder shape: the root holds `{Name}.tsx` and `index.ts`, every other file sits in `components/`, `hooks/`, `utils/`, `types/`, `constants/`, `providers/`, `services/` or `__tests__/`, prefixed (`names.md`).', gate: '`aComponentFolderIsStructured`', exceptions: 'an atom has no `components/`, having no parts', why: 'One shape everywhere, so a file is found without a search.' },
    { rule: 'Every organism a page mounts is a flow organism; it keeps one view per state in `components/state-views/` and switches between them (`EditorScreenLoadingView`, `EditorScreenReadyView`).', gate: '`aScreenIsAFlowOrganism`', exceptions: '`Campaigns`, on the scan\'s baseline until the documents by type and kind replace it', why: 'Each state reads on its own, and the switch is the one place that chooses.' },
    { rule: '`@mui/material` is imported under `app/components/` only.', gate: '`theWrappersAreTheDoor`', exceptions: '—', why: 'A change to how MUI is used lands in the wrappers, not across the screens.' },
    { rule: 'Every component is a row of `app/styles/components.spec.json`, copied from the design side, or on the roster of organisms this repository owns.', gate: '`nothingIsUnnamed` · `theComponentSpec`', exceptions: '—', why: 'A shape the wireframes do not draw is a question to the design side, not a component.' },
    { rule: 'A test id comes from `e2e/testingIds/`, never a literal.', gate: '`testIdsComeFromTheRegistry` · `testIdsArePrefixed`', exceptions: '—', why: 'The browser tests reach every element through one registry.' },
    { rule: 'Hover text is a `Hint`; no element carries a `title`.', gate: '`hoverTextIsAHint`', exceptions: '—', why: 'One look and one delay for every hover.' },
    { rule: 'A heavy component the first screen does not need loads through `next/dynamic` (`RichTextField`).', gate: '`theRichTextEditorLoadsOnDemand`', exceptions: '—', why: 'The editor\'s code stays out of the first load.' },
    { rule: 'Every glyph is Lucide\'s, through `atoms/Glyph`, by name and a theme step (`small`, `medium`, `large` for a control; `dot`, `badge`, `inline` for a mark), never a number; `glyphSetConstants.ts` is the one importer of `lucide-react`, pinned to an exact version; the colour is `currentColor`.', gate: '`theIconSet`', exceptions: '—', why: 'One set, one stroke, sizes from the tokens.' },
    { rule: '`components/icons/` holds only what Lucide has no glyph for, the brand marks and the one-offs: one flat file each, named exports, no barrel, `IconProps` with one `size`; no `<svg>` is drawn by hand anywhere else.', gate: '`theIconSet`', exceptions: '—', why: 'Two numbers for one size are two numbers a call site can set out of proportion.' },
  ],
  outro: '\n## The folder shape\n\n```\ncomponents/atoms/Button/\n  Button.tsx                         # the component and its props type\n  index.ts                           # the barrel\n  constants/buttonConstants.ts\n  types/buttonTypes.ts\ncomponents/organisms/ApprovalBar/\n  ApprovalBar.tsx\n  index.ts\n  components/ApprovalBarActions.tsx  # one component each\n  constants/approvalBarWords.ts\n  types/approvalBarTypes.ts\n  utils/approvalBarToDoUtils.ts\n```\n',
};

export { rules };
