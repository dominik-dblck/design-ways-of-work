/**
 * - `PEERS`, `Peer` · the tools the checks load through another, one version each
 */

// a tool by its package's name; `family`, an npm scope whose packages it releases at its version
interface Peer {
  readonly name: string;
  readonly family?: string;
}

// the tools the checks load through another: ESLint's plugins, the shared tests' runner, the typed rules' compiler
const PEERS: readonly Peer[] = [
  { name: 'eslint' },
  { name: 'typescript' },
  { name: 'vitest' },
  { name: 'typescript-eslint', family: '@typescript-eslint/' },
];

export { PEERS };
export type { Peer };
