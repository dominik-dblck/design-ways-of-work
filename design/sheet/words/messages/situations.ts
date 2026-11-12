/**
 * - `ROWS`, `BY` · every situation in one list, and each one by its name
 * - `state`, `move` · a situation's State cell, and its Move cell for one reader
 */
import { READERS, ROWS } from './messageRows.ts';
import type { Cell, Situation } from './messagesTypes.ts';

const BY: Readonly<Record<string, Situation>> = Object.fromEntries(
  ROWS.map((row) => [
    row[0],
    {
      situation: row[0],
      group: row[1],
      state: row[2],
      move: Object.fromEntries(
        READERS.flatMap((reader, index) => {
          const cell = row[3 + index];
          return cell === undefined ? [] : [[reader, cell]];
        }),
      ),
    },
  ]),
);

function state(situation: string): Cell | undefined {
  return BY[situation]?.state;
}

function move(situation: string, reader: string): Cell | undefined {
  return BY[situation]?.move[reader];
}

export { BY, move, ROWS, state };
