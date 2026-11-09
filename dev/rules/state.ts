/**
 * - `rules` · state: each rule, its gate, its exceptions and why
 */
import type { RuleFile } from '../../docs/rules/ruleTypes.ts';

const rules: RuleFile = {
  title: 'State',
  intro: "\nWhere a value lives: the server's answer in the query cache, what several components share in a\ncontext, a flow's state in its organism, the rest in the component.\n",
  rows: [
    { rule: 'The root layout mounts `AppProvider` alone, which nests every app-wide provider, outermost first: `AuthProvider`, `QueryClientProvider`, `ThemeProvider`, `NotificationProvider`, `DialogProvider`, `DrawerProvider`. A new one is added there at its level; one that needs server data takes it as a prop on `AppProvider`.', gate: '`theLayoutHoldsTheProviders` · `review` (the order)', exceptions: '—', why: 'One place shows what wraps every page, and an inner provider can use an outer one.' },
    { rule: '`AuthProvider` carries the session the layout resolved (`{ session, googleIsOn }`, read by `useAuth()`) and decides nothing.', gate: '`nextAuthStaysAtTheEdge` · `review`', exceptions: '—', why: 'The session is read once per request, and a page that lied to it would still meet a 401.' },
    { rule: 'A provider is one flat file in `app/providers/`; `AppProvider/` and `AuthProvider/` are folders with a barrel.', gate: '`aContextIsHeldByItsProvider`', exceptions: '—', why: 'A provider is found by its name, in one folder.' },
    { rule: "A context's hook throws outside its provider (`useDialog must be used within DialogProvider`), and its value is memoised.", gate: '`aContextIsHeldByItsProvider`', exceptions: '—', why: 'A missing provider fails at the first render, not as an `undefined` three calls later.' },
    { rule: "A server answer lives in the query cache, and an organism's logic layer reads it and hands it to its parts through its hooks (`EditorScreenProvider`'s `read`, `useEditorScreenDocument()`); an app-wide context never holds one: it holds the session the edge resolved, the open dialog, the theme.", gate: '`review`', exceptions: '—', why: 'The cache stays the one owner, so nothing is copied and nothing disagrees when it refreshes.' },
    { rule: "The page's one Dialog and one Drawer are rendered by `DialogProvider` and `DrawerProvider` and opened with `useDialog()` and `useDrawer()`; content that follows its caller's props (`AssetLibrary`) is portalled into the one frame through `useDialogSlot()`; nothing else renders a `Dialog` or a `Drawer`: MUI's `Dialog` and `Drawer` are imported by their molecules alone, and those molecules by their providers alone.", gate: '`oneDialogOneDrawer`', exceptions: '—', why: 'Two overlays at once fight over focus and Escape.' },
    { rule: 'A toast is `useNotification()`.', gate: '`aToastIsUseNotification`', exceptions: '—', why: 'One look and one queue for every message.' },
    { rule: 'A flow organism keeps its state in its own providers (`EditorScreenProvider` and its parts) and shows one state view at a time (`components.md`).', gate: '`aScreenIsAFlowOrganism` · `review`', exceptions: "`Campaigns`, on the scan's baseline until the documents by type and kind replace it", why: "A flow's state lives and dies with the flow." },
    { rule: "An organism's logic is its `providers/` and `hooks/`: only they call a query or a mutation, the query client, a query key, an app provider's hook (`useAuth`, `useDialog`, `useDrawer`, `useNotification`), or the router (`useRouter`, `usePathname`, `useSearchParams`). Its root and every file in `components/` call the organism's hooks and draw; a drawing hook (`useScrollFade`, `useFileDrop`, `useSettledValue`, `useTheme`) is theirs.", gate: '`organismPartsOnlyDraw`', exceptions: '—', why: 'Logic kept in one layer is found in one place; a part that fetches for itself is a second owner of the same read.' },
    { rule: 'State one component uses stays in it (`useState`); a context is made only for state several share.', gate: '`review`', exceptions: '—', why: 'Every consumer of a context renders again when it changes.' },
    { rule: "A flow organism is driven by its state: its root mounts its providers around one body and takes no prop past the id (`EditorScreen`), and every part reads what it draws through the organism's hooks (`useEditorScreenTree()`, `useEditorScreenSave()`), never through a prop passed down. Props start where state ends: a part hands a molecule, an atom or a view organism (`ApprovalBar`) what it draws, shaped by the organism's adapters.", gate: '`aScreenIsAFlowOrganism` · `review`', exceptions: "a slot passed as `children` · `Campaigns`, on the scan's baseline until the documents by type and kind replace it", why: 'A part that reads its own state moves without rewiring its parents; a prop traced through every layer does not.' },
  ],
  outro: '',
};

export { rules };
