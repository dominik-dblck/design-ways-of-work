/**
 * - `routeFindings`, `journeyFindings`, `notebookFindings`, `closingFindings`
 * - the lines read beside the sheet: routes, journeys, notebooks, the files
 */
import type { Finding, SheetEdge, SheetTicket } from './refineCheckTypes.ts';
import { JOURNEY, NOTEBOOK, WHY } from './refineRules.ts';
import * as COMMANDS from '../../sheet/contract/commands.ts';
import * as TICKETS from '../../roadmaps/tickets.ts';

// rule:route-names-a-typed-row · a route a criterion names belongs to a typed row
function routeFindings(ticket: SheetTicket): Finding[] {
  const commands = COMMANDS.all;
  return commands.flatMap((command) => {
    const route = command.route;
    const named =
      ticket.command === command.id ||
      (Boolean(route) &&
        ticket.acceptance.some((criterion) => criterion.includes(route ?? '')));
    if (!named) return [];
    const typed =
      Boolean(command.writes) &&
      (command.body === '—' ||
        (command.body || '')
          .split('·')
          .every((field) => field.indexOf(':') > 0));
    if (typed) return [];
    return [
      {
        rule: 'route-names-a-typed-row',
        where: command.id,
        text: 'the route is named and commands.ts · body is prose or writes is missing — type the row on the sheet in this refinement',
      },
    ];
  });
}

// rule:journeys-in-one-grammar · a criterion that opens as a journey follows its grammar
function journeyFindings(ticket: SheetTicket): Finding[] {
  return ticket.acceptance.flatMap((criterion, index) =>
    /^J\d+ · /.test(criterion) && !JOURNEY.test(criterion)
      ? [
          {
            rule: 'journeys-in-one-grammar',
            where: `c${index + 1}`,
            text: 'a journey out of its grammar — J{n} · who what · step → step · test (e2e, Playwright): check',
          },
        ]
      : [],
  );
}

function notebookAt(where: string, text: unknown): Finding[] {
  const found = text ? String(text).match(NOTEBOOK) : null;
  if (!found) return [];
  return [
    {
      rule: 'no-notebook-in-the-pack',
      where,
      text: `names a feature notebook: “${found[0]}” — write what the build side needs into the ticket or the sheet`,
    },
  ];
}

// rule:no-notebook-in-the-pack · no feature notebook in what the build side receives
function notebookFindings(
  ticket: SheetTicket,
  {
    edges,
    read,
  }: {
    readonly edges: readonly SheetEdge[];
    readonly read: SheetTicket['touches'];
  },
): Finding[] {
  const checklistRead = TICKETS.checklistRead[ticket.id] ?? {};
  const why = ticket.why;
  return [
    ...ticket.acceptance.flatMap((criterion, index) =>
      notebookAt(`c${index + 1}`, criterion),
    ),
    ...edges.flatMap((edge, index) => [
      ...notebookAt(`E${index + 1} · into`, edge.into),
      ...notebookAt(`E${index + 1} · why`, edge.why),
    ]),
    ...notebookAt('note', ticket.note),
    ...(why ? WHY.flatMap((key) => notebookAt(`why.${key}`, why[key])) : []),
    ...Object.entries(checklistRead).flatMap(([key, text]) =>
      notebookAt(`read ${key}`, text),
    ),
    ...read.flatMap((item) => notebookAt('read', item)),
  ];
}

function closingFindings(
  ticket: SheetTicket,
  read: SheetTicket['touches'],
): Finding[] {
  return [
    ...(/EXPECTED FILES/.test(ticket.note || '')
      ? []
      : [
          {
            rule: 'note-lists-files-touched' as const,
            where: 'note',
            text: 'no EXPECTED FILES list from the repo root',
          },
        ]),
    ...(read.length
      ? []
      : [
          {
            rule: 'read-every-file-naming-it' as const,
            where: 'read',
            text: 'empty read list — name every file that names the same things',
          },
        ]),
  ];
}

export { closingFindings, journeyFindings, notebookFindings, routeFindings };
