/**
 * - `COMMAND_ROWS`, `AGENT`, `DERIVED` · each command, its agent, the turns counted
 * - `COMMAND_CONTRACT`, `SHARED_CHECKS`, `BODY_DRAFTS` · every command's terms
 */
import type { CommandRow, Derived } from './commandsTypes.ts';

const COMMAND_ROWS: readonly CommandRow[] = [];

const AGENT: Readonly<Record<string, string>> = {};

const DERIVED: readonly Derived[] = [];

const COMMAND_CONTRACT = {};

const SHARED_CHECKS = {};

const BODY_DRAFTS: Readonly<
  Record<string, string | readonly [name: string, type: string] | undefined>
> = {};

export {
  AGENT,
  BODY_DRAFTS,
  COMMAND_CONTRACT,
  COMMAND_ROWS,
  DERIVED,
  SHARED_CHECKS,
};
