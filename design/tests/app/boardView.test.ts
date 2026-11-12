/**
 * - `app/workspace/boardView.ts`: each epic stands in one column, by its tickets
 * - an epic opened and a ticket opened read the same rows the board shows
 */
import { describe, expect, it } from 'vitest';
import { epics } from '../../roadmaps/backlog.ts';
import { all as IDEAS } from '../../roadmaps/ideas.ts';
import { receipts } from '../../roadmaps/receipts.ts';
import { all as allTickets } from '../../roadmaps/tickets.ts';
import {
  columns,
  epicOf,
  ideas,
  kinds,
  nextUp,
  progress,
  repository,
  stats,
  ticketDetailOf,
  velocity,
  words,
} from '../../app/workspace/boardView.ts';

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
    expect([...held].sort()).toEqual(
      allTickets()
        .map((one) => one.id)
        .sort(),
    );
    const done = held.filter(
      (id) => ticketDetailOf(id)?.column === 'done',
    ).length;
    const tickets = stats().find((stat) => stat.id === 'tickets');
    expect(tickets?.value).toBe(String(done));
    expect(tickets?.sub).toContain(String(held.length));
  });

  it('next up is ready tickets, and an opened ticket names its epic', () => {
    for (const line of nextUp()) expect(line.column).toBe('ready');
    const feature = cards.find((card) => card.feature)?.feature;
    const opened = feature ? ticketDetailOf(feature.id) : null;
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
      pace.ticketsPerDay
        ? Math.ceil(pace.ticketsLeft / pace.ticketsPerDay)
        : null,
    );
  });

  it('a command ticket opens with its command, refusals and reads resolved', () => {
    // the first command ticket, where the product holds one
    const first = allTickets()
      .filter((one) => one.command !== null)
      .slice(0, 1);
    for (const command of first) {
      const opened = ticketDetailOf(command.id);
      expect(opened?.command).toContain(' · ');
      expect(opened?.reading.length).toBe(opened?.read.length);
      for (const one of opened?.reading ?? []) expect(one.title).not.toBe('');
    }
  });

  it('an idea opens to its points, its example and its questions', () => {
    const [first] = ideas();
    const [idea] = IDEAS;
    expect(first?.sections[0]?.lines).toEqual(idea?.points);
    expect(first?.sections.at(-1)?.lines).toEqual(idea?.questions);
  });

  it('a ticket opened carries each edge with its options, and every kind its line', () => {
    const edged = allTickets().find((one) => one.edges.length > 0);
    const opened = ticketDetailOf(edged?.id ?? '');
    expect(opened?.edgeSections.length).toBe(edged?.edges.length);
    expect(kinds().length).toBeGreaterThan(5);
  });

  it('the list reads the closed epics first, then the MVP still open, then after it, the deferred last', () => {
    const rows = progress().rows;
    const rankOf = (row: (typeof rows)[number]): number => {
      if (row.column === 'done') return 0;
      if (row.mvp) return 1;
      return row.badge === words.badges.later ? 2 : 3;
    };
    const ranks = rows.map(rankOf);
    expect(ranks).toEqual([...ranks].sort((one, other) => one - other));
    expect(new Set(rows.map((row) => row.id)).size).toBe(cards.length);
  });
  it('the repository card sums the receipts of the board’s tickets, its state from the reports that carry it', () => {
    const own = allTickets().flatMap((one) => receipts[one.id] ?? []);
    const { commit, now, atClose } = repository();
    expect(atClose.map((one) => one.value)).toEqual([
      String(own.reduce((sum, one) => sum + (one.tests ?? 0), 0)),
      String(own.length),
    ]);
    const hasState = own.some((one) => one.repository);
    expect(now.length).toBe(hasState ? 3 : 0);
    expect(commit === null).toBe(!hasState);
    expect([...now, ...atClose].every((one) => one.note)).toBe(true);
  });
});
