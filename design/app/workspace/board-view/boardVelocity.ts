/**
 * - `velocity` · tickets and criteria done per working day, and what is left
 * - a receipt with `from` spreads its ticket over the working days from..at, Mon–Fri
 */
import { epics as EPICS } from '../../../roadmaps/backlog.ts';
import { all as allTickets } from '../../../roadmaps/tickets.ts';
import { BOARD_WORDS } from './boardWords.ts';
import type { Velocity, VelocityDay } from './boardTypes.ts';

type BoardTicket = ReturnType<typeof allTickets>[number];

// the last days the forecast reads once a run is longer than them
const RECENT_DAYS = 5;
const DAY_MS = 86_400_000;

function workdays(from: string, at: string): readonly string[] {
  const out: string[] = [];
  const last = Date.parse(`${at}T00:00:00Z`);
  for (let day = Date.parse(`${from}T00:00:00Z`); day <= last; day += DAY_MS) {
    const weekday = new Date(day).getUTCDay();
    if (weekday !== 0 && weekday !== 6)
      out.push(new Date(day).toISOString().slice(0, 10));
  }
  return out;
}

function perDay(done: readonly BoardTicket[]): readonly VelocityDay[] {
  const days = new Map<string, { tickets: number; criteria: number }>();
  for (const ticket of done) {
    const at = ticket.receipt?.at ?? '';
    const from = ticket.receipt?.from;
    const span = from ? workdays(from, at) : [at];
    for (const day of span) {
      const was = days.get(day) ?? { tickets: 0, criteria: 0 };
      days.set(day, {
        tickets: was.tickets + 1 / span.length,
        criteria: was.criteria + ticket.acceptance.length / span.length,
      });
    }
  }
  return [...days.entries()]
    .sort(([one], [other]) => (one < other ? -1 : 1))
    .map(([day, count]) => ({ day, ...count }));
}

const average = (rates: readonly number[]): number =>
  rates.length ? rates.reduce((sum, one) => sum + one, 0) / rates.length : 0;

// the rate the forecast reads: the last days' once there are more of them, else every day's
function rateOf(counts: readonly number[]): number {
  return counts.length > RECENT_DAYS
    ? average(counts.slice(-RECENT_DAYS))
    : average(counts);
}

function velocity(): Velocity {
  const all = allTickets();
  const done = all.filter(
    (ticket) => ticket.column === 'done' && ticket.receipt?.at,
  );
  const days = perDay(done);
  const mvp = new Set(
    EPICS.filter((epic) => epic.mvp && epic.group !== 'deferred').map(
      (epic) => epic.id,
    ),
  );
  const left = all.filter(
    (ticket) => mvp.has(ticket.epic) && ticket.column !== 'done',
  );
  const tickets = rateOf(days.map((day) => day.tickets));
  const criteria = rateOf(days.map((day) => day.criteria));
  const criteriaLeft = left.reduce(
    (sum, one) => sum + one.acceptance.length,
    0,
  );
  const over = Math.min(days.length, RECENT_DAYS);
  const forecast = tickets ? Math.ceil(left.length / tickets) : null;
  return {
    summary: days.length
      ? `${tickets.toFixed(1)} tickets and ${Math.round(criteria)} criteria a day over the last ${over} working days · ${left.length} MVP tickets left (${criteriaLeft} criteria), about ${forecast} working days`
      : BOARD_WORDS.velocity.none,
    days,
    ticketsPerDay: tickets,
    criteriaPerDay: criteria,
    ticketsLeft: left.length,
    criteriaLeft,
    daysLeft: forecast,
    overDays: over,
  };
}

export { velocity };
