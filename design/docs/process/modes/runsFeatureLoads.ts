/**
 * - `RUNS_FEATURE_LOADS` · what the feature run loads, as the page lists it
 */
const RUNS_FEATURE_LOADS = {
  title: '📚 What loads when · feature',
  note: 'only the main agent reads the design project · sub-agents: the repository + the cached pack',
  phases: [
    { label: 'Prepare', span: 3, tone: 'subtle' },
    { label: 'Read', span: 1, tone: 'info' },
    { label: 'Contract', span: 1, tone: 'review' },
    { label: 'Build', span: 3, tone: 'ready' },
    { label: 'Review', span: 2, tone: 'subtle' },
    { label: 'Close', span: 1, tone: 'review' },
  ],
  steps: [
    { n: '0', name: 'hand-off' },
    { n: '1–2', name: 'branch, skills' },
    { n: '2a', name: 'contract sync' },
    { n: '3', name: 'recon' },
    { n: '4', name: 'tests, snapshot' },
    { n: '5', name: 'domain, routes' },
    { n: '6', name: 'screens' },
    { n: '7', name: 'journeys' },
    { n: '8', name: 'arch-review' },
    { n: '9', name: 'regression' },
    { n: '10', name: 'report' },
  ],
  legend: [
    { sample: 'main', kind: 'main', text: 'the main agent loads it' },
    { sample: '×5', kind: 'sub', text: 'that many sub-agents load it' },
    { sample: 'main ×5', kind: 'main', text: 'both' },
    { kind: 'line', text: 'holds for the whole run' },
  ],
  rows: [
    {
      name: 'ticket-feature',
      note: '.claude/skills/ticket-feature/SKILL.md',
      holds: true,
      at: { '0': 'main' },
    },
    {
      name: '_shared.md',
      note: 'every skill reads it first',
      holds: true,
      at: { '0': 'main' },
    },
    {
      name: 'ticket-recon',
      note: 'steps 3–5b and its template',
      at: { '3': 'main ×5' },
    },
    {
      name: 'e2e-discovery → e2e-category',
      note: 'with e2e/_shared.md',
      at: { '7': 'main' },
    },
    {
      name: 'architecture-review',
      note: 'STEP 0 main · STEPS 1–5 one sub-agent each',
      at: { '8': 'main ×5' },
    },
    {
      name: 'ticket-regression',
      note: 'with its template',
      at: { '9': 'main ×4' },
    },
    { name: 'ticket-report', note: 'with its template', at: { '10': 'main' } },
    {
      name: 'the pack',
      note: 'through the MCP, main agent only, cached in .sheet-cache/',
      at: { '0': 'main', '3': '×5', '8': '×5', '9': '×4' },
    },
    {
      name: 'api-convention.md',
      note: 'what every endpoint shares',
      at: { '0': 'main', '4': 'main' },
    },
    {
      name: 'the contract fixtures',
      note: 'commands, queries, refusals, events, block-model · the emitter',
      at: { '3': '×5', '4': 'main', '5': 'main', '2a': 'main' },
    },
    {
      name: 'componentsSpec.ts',
      note: 'the rows the ticket builds · read, never synced',
      at: { '3': '×5', '6': 'main' },
    },
    {
      name: 'the wireframes',
      note: 'the ones the pack names',
      at: { '6': 'main', '8': '×1' },
    },
    {
      name: 'the patterns',
      note: '.claude/patterns/ · only the touched layers’ · STEP 2',
      at: { '8': '×1' },
    },
    { name: 'types-eval.md', note: 'STEPS 1 and 3', at: { '8': '×2' } },
    { name: 'tests-eval.md', note: 'Step 4', at: { '8': '×1' } },
    {
      name: 'ux-eval.md',
      note: 'STEP 5, beside the wireframes',
      at: { '8': '×1' },
    },
  ],
} as const;

export { RUNS_FEATURE_LOADS };
