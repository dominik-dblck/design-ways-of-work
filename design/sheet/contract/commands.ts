/**
 * - `all`, `byId`, `byEpic`, `agent` · one row per command, by its epic
 * - `contract`, `checks` · what every command carries and may answer
 * - `derived`, `commandCounts`, `bodyDrafts` · unasked turns, counts, prose drafts
 */
import {
  AGENT,
  BODY_DRAFTS,
  COMMAND_CONTRACT,
  COMMAND_ROWS,
  DERIVED,
  SHARED_CHECKS,
} from './commands/commandRows.ts';
import type {
  Command,
  CommandCounts,
  CommandRow,
} from './commands/commandsTypes.ts';
import * as BACKLOG from '../../roadmaps/backlog.ts';

function commandOf(row: CommandRow): Command {
  const agent = AGENT[row.id];
  return {
    ...row,
    confirm: row.confirm === true,
    idempotent: row.idempotent === true,
    ...(agent === undefined ? {} : { agent }),
  };
}

const COMMANDS: readonly Command[] = COMMAND_ROWS.map(commandOf);

const BY_ID: Readonly<Record<string, Command | undefined>> = Object.fromEntries(
  COMMANDS.map((command) => [command.id, command]),
);

interface EpicCommands {
  readonly epic: string;
  readonly name: string;
  readonly mvp: boolean;
  readonly commands: readonly Command[];
}

function byEpic(): readonly EpicCommands[] {
  const epics = [...new Set(COMMANDS.map((command) => command.epic))];
  return epics.map((epic) => {
    const known = BACKLOG.byId[epic];
    return {
      epic,
      name: known ? known.name : epic,
      mvp: known ? known.mvp : false,
      commands: COMMANDS.filter((command) => command.epic === epic),
    };
  });
}

function counts(): CommandCounts {
  return {
    total: COMMANDS.length,
    gaps: COMMANDS.filter((command) => command.gap).length,
    confirms: COMMANDS.filter((command) => command.confirm).length,
    mentions: COMMANDS.filter((command) => command.mention).length,
    derived: DERIVED.length,
    rules: new Set(COMMANDS.flatMap((command) => command.refuses)).size,
  };
}

export {
  BODY_DRAFTS as bodyDrafts,
  SHARED_CHECKS as checks,
  COMMAND_CONTRACT as contract,
  COMMANDS as all,
  DERIVED as derived,
  BY_ID as byId,
  AGENT as agent,
  byEpic,
  counts as commandCounts,
};
