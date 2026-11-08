/**
 * - a closed epic's notebook keeps its words: the reasoning of the epic as it closed
 * - closed: the epic's feature ticket is done on the board; its digest pinned here
 */
import crypto from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { STATUS } from '../../roadmaps/tickets/ticketStatus.ts';
import { textsUnder } from './tree.ts';

// each closed epic's notebook, the sha256 of its text as it closed
const FROZEN: Readonly<Record<string, string>> = {
  E03: '67837185845fd626ae787649edc754562b7e7a08fb3af4ebdad0ea41aa5c0b07',
  E04: '138d316bca50574d3ac2fc08b6313c6d00ecfd2e99005f77bb6bb021578af47a',
  E06: '06a654a7aa3477157b9690deda496c9980555c2da248ea483df49f7c8cc67999',
  E09: '3dab01272763f86a1a4c5bca1c5f1ca8310d83b70e43eb5da643f82103a245db',
  E18: 'f1523f11f2dcc0d6387ea90d8ed57ec9302259561e1cd8d0e435d80157993228',
};

// a closed epic's notebook as markdown, an open one's as data until it closes
const A_NOTEBOOK = /^roadmaps\/(E\d{2})\/(?:feature-\1\.md|\1Notes\.ts)$/;

const digestOf = (text: string): string =>
  crypto.createHash('sha256').update(text).digest('hex');

describe('a closed notebook is frozen', () => {
  const notebooks = textsUnder('roadmaps', ['.md', '.ts']).flatMap((source) => {
    const epic = A_NOTEBOOK.exec(source.path)?.[1];
    return epic ? [{ epic, text: source.text }] : [];
  });

  it('pins every notebook of an epic whose feature ticket is done, and no other', () => {
    expect(notebooks.length).toBeGreaterThan(5);
    const closed = notebooks
      .filter(({ epic }) => STATUS[`T-${epic}-00`] === 'done')
      .map(({ epic }) => epic);
    expect(closed).toEqual(Object.keys(FROZEN));
  });

  it('a closed notebook reads as it closed', () => {
    const moved = notebooks
      .filter(({ epic }) => FROZEN[epic] !== undefined)
      .filter(({ epic, text }) => digestOf(text) !== FROZEN[epic])
      .map(({ epic }) => epic);
    expect(moved).toEqual([]);
  });
});
