/**
 * - a closed epic's notebook keeps its words: the reasoning of the epic as it closed
 * - closed: its feature ticket is done on the board; its digest pinned by the product
 */
import crypto from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  A_NOTEBOOK,
  FROZEN_NOTEBOOKS,
} from '../../roadmaps/notes/frozenNotebooks.ts';
import { STATUS } from '../../roadmaps/tickets/ticketStatus.ts';
import { textsUnder } from './tree.ts';

const digestOf = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');

describe('a closed notebook is frozen', () => {
  const notebooks = textsUnder('roadmaps', ['.md', '.ts']).flatMap((source) => {
    const epic = A_NOTEBOOK.exec(source.path)?.[1];
    return epic ? [{ epic, text: source.text }] : [];
  });

  it('pins every notebook of an epic whose feature ticket is done, and no other', () => {
    const closed = notebooks
      .filter(({ epic }) => STATUS[`T-${epic}-00`] === 'done')
      .map(({ epic }) => epic);
    expect(closed).toEqual(Object.keys(FROZEN_NOTEBOOKS));
  });

  it('a closed notebook reads as it closed', () => {
    const moved = notebooks
      .filter(({ epic }) => FROZEN_NOTEBOOKS[epic] !== undefined)
      .filter(({ epic, text }) => digestOf(text) !== FROZEN_NOTEBOOKS[epic])
      .map(({ epic }) => epic);
    expect(moved).toEqual([]);
  });
});
