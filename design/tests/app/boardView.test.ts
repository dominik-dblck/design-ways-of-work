/**
 * - `app/workspace/board-view.ts`: each epic stands in one column, by its tickets
 * - an epic opened and a ticket opened read the same rows the board shows
 */
import { describe, expect, it } from 'vitest';
import { epics } from '../../roadmaps/backlog.ts';
import { all as IDEAS } from '../../roadmaps/ideas.ts';
import { all as allTickets } from '../../roadmaps/tickets.ts';
import {
  columns,
  epicOf,
  ideas,
  kinds,
  nextUp,
  stats,
  ticketOf,
  velocity,
} from '../../app/workspace/board-view.ts';

describe('the board view', () => {
  const board = columns();
  const cards = board.flatMap((column) => column.epics);

  it('every epic of the backlog is one card, in one column', () => {
    expect(cards.map((card) => card.id).sort()).toEqual(
      epics.map((epic) => epic.id).sort(),
    );
  });

  it('an epic stands done only when every ticket of it is done', () => {
    for (const card of cards.filter((one) => one.column === 'done'))
      expect(card.doneCount).toBe(card.tickets.length);
    for (const card of cards.filter((one) => one.column !== 'done'))
      expect(card.doneCount < card.tickets.length || !card.tickets.length).toBe(
        true,
      );
  });

  it('the cards hold every ticket once, and the numbers count them', () => {
    const held = cards.flatMap((card) => card.tickets.map((one) => one.id));
    expect(held.sort()).toEqual(
      allTickets()
        .map((one) => one.id)
        .sort(),
    );
    const done = held.filter((id) => ticketOf(id)?.column === 'done').length;
    expect(stats().map((stat) => stat.value)).toContain(
      `${done} / ${held.length}`,
    );
  });

  it('next up is ready tickets, and an opened ticket names its epic', () => {
    for (const line of nextUp()) expect(line.column).toBe('ready');
    const feature = cards.find((card) => card.feature)?.feature;
    const opened = feature ? ticketOf(feature.id) : null;
    expect(opened?.acceptance.length).toBeGreaterThan(0);
    expect(epicOf(opened?.epic ?? '')?.feature?.id).toBe(feature?.id);
  });

  it('the pace spreads each done ticket over its days, once', () => {
    const pace = velocity();
    const spread = pace.days.reduce((sum, day) => sum + day.tickets, 0);
    const done = allTickets().filter(
      (one) => one.column === 'done' && one.receipt?.at,
    ).length;
    expect(Math.round(spread)).toBe(done);
    expect(pace.daysLeft).toBe(
      Math.ceil(pace.ticketsLeft / pace.ticketsPerDay),
    );
  });

  it('a command ticket opens with its command, refusals and reads resolved', () => {
    const command = allTickets().find((one) => one.command !== null);
    const opened = ticketOf(command?.id ?? '');
    expect(opened?.command).toContain(' · ');
    expect(opened?.reading.length).toBe(opened?.read.length);
    for (const one of opened?.reading ?? []) expect(one.title).not.toBe('');
  });

  it('an idea opens to its points, its example and its questions', () => {
    const [first] = ideas();
    const [idea] = IDEAS;
    expect(first?.sections[0]?.lines).toEqual(idea?.points);
    expect(first?.sections.at(-1)?.lines).toEqual(idea?.questions);
  });

  it('an epic with prototype components says how many ship', () => {
    const drawn = cards.filter((card) => card.prototype.length);
    expect(drawn.length).toBe(epics.filter((one) => one.components).length);
    for (const card of drawn) expect(card.prototype[0]?.label).toMatch(/→/);
  });

  it('a ticket opened carries each edge with its options, and every kind its line', () => {
    const edged = allTickets().find((one) => one.edges.length > 0);
    const opened = ticketOf(edged?.id ?? '');
    expect(opened?.edgeSections.length).toBe(edged?.edges.length);
    expect(kinds().length).toBeGreaterThan(5);
  });
});
