/**
 * - `KIND` · one colour per kind, here and nowhere else: the board reads it
 * - `COLUMNS` · the board's four columns, three of them computed
 */

// prettier-ignore
const KIND = {
  command: { label: 'COMMAND', means: 'decide(), apply(), and the tests the catalog row spells out', wash: '#e8eeff', ink: '#2b67ff' },
  schema: { label: 'SCHEMA', means: 'a shape, validated', wash: '#f3e8ff', ink: '#6d3fc4' },
  infra: { label: 'INFRA', means: 'the mechanics under every command', wash: '#eff0f2', ink: '#49505b' },
  port: { label: 'PORT', means: 'an interface outward, with a mock', wash: '#fff1e0', ink: '#a55a00' },
  projection: { label: 'PROJECTION', means: 'derived state, rebuilt from the log', wash: '#e2f6fd', ink: '#06657f' },
  query: { label: 'QUERY', means: 'a read, never a write', wash: '#e6faf7', ink: '#0a7f72' },
  rule: { label: 'RULE', means: 'a derived event or a check, ported from the rules sheets', wash: '#fef6e0', ink: '#8a6a00' },
  run: { label: 'RUN', means: 'an acceptance test over many commands', wash: '#25282e', ink: '#ffffff' },
  fixture: { label: 'FIXTURE', means: 'data the tests stand on', wash: '#fdeceb', ink: '#a8302a' },
  feature: { label: 'FEATURE', means: 'a whole epic in one run: the contract’s endpoints, the screens, the browser scenarios', wash: '#eaf7f0', ink: '#11794a' },
} as const;

// prettier-ignore
const COLUMNS = [
  { id: 'blocked', label: 'BLOCKED', note: 'waiting on an earlier epic or a named ticket' },
  { id: 'ready', label: 'READY', note: 'nothing in the way · top one first' },
  { id: 'doing', label: 'DOING', note: 'in hand' },
  { id: 'done', label: 'DONE', note: 'its acceptance tests are green' },
] as const;

export { COLUMNS, KIND };
