/**
 * - `TIER` · the order refuses are read in, the product's tiers handed on
 * - `orderCheck` · the commands whose refuses break that order
 */
import { TIER } from './refusalRows.ts';
import * as COMMANDS from '../commands.ts';

// a key outside these tiers keeps its place
function orderCheck(epic?: string): readonly string[] {
  const commands = COMMANDS;
  if (!commands) return [];
  return commands.all
    .filter((command) => !epic || command.epic === epic)
    .flatMap((command) => {
      let last = 0;
      return command.refuses.flatMap((key) => {
        const tier = TIER[key];
        if (tier === undefined) return [];
        if (tier < last) return [`${command.id} · ${key}`];
        last = tier;
        return [];
      });
    });
}

export { orderCheck, TIER };
