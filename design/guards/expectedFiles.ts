/**
 * - `text` · the files a ticket's run creates or changes, derived from data
 * - `reads`, `named` · the read list a pack needs, and the endpoints by name
 * - what no data names stays in the note beside the marker; recon confirms each path
 */
import { named } from '../sheet/cases/testCases.ts';
import type {
  ComponentsSpec,
  ExpectedFile,
  ExpectedTicket,
} from './expectedFiles/expectedFilesTypes.ts';
import { reads } from './expectedFiles/packReads.ts';
import { endpointsOf, specRowsOf } from './expectedFiles/ticketEndpoints.ts';
import * as COMMANDS from '../sheet/contract/commands.ts';
import * as QUERIES from '../sheet/contract/queries.ts';

function camel(id: string): string {
  return id.charAt(0).toLowerCase() + id.slice(1);
}

function routeFile(route: string): string {
  const path =
    String(route || '')
      .split(' ')
      .pop() ?? '';
  if (/^\/api\/documents\/:id\/commands\//.test(path)) {
    return 'app/api/documents/[id]/commands/[command]/route.ts';
  }
  return `app${path.replace(/:(\w+)/g, '[$1]')}/route.ts`;
}

function collector(): {
  files: ExpectedFile[];
  add: (path: string, why: string) => void;
} {
  const files: { readonly path: string; readonly why: string[] }[] = [];
  const add = (path: string, why: string): void => {
    const found = files.find((file) => file.path === path);
    if (!found) files.push({ path, why: [why] });
    else if (!found.why.includes(why)) found.why.push(why);
  };
  return { files, add };
}

type Add = (path: string, why: string) => void;

function addSpecFiles(
  ticket: ExpectedTicket,
  { spec, add }: { readonly spec: ComponentsSpec; readonly add: Add },
): void {
  for (const row of specRowsOf(spec)) {
    if (!row.wrapper) continue;
    if (row.ownedBy === ticket.id) add(row.wrapper, `spec · ${row.id}`);
    else if ((row.changedIn ?? []).includes(ticket.id)) {
      add(row.wrapper, `spec · ${row.id}, changed`);
    }
  }
}

function addEndpointFiles(ticket: ExpectedTicket, add: Add): void {
  const sources = [
    [COMMANDS.all, 'commands'],
    [QUERIES.all, 'queries'],
  ] as const;
  for (const [rows, folder] of sources) {
    for (const row of endpointsOf(ticket, rows)) {
      add(`packages/domain/${folder}/${camel(row.id)}.ts`, row.id);
      if (row.route) add(routeFile(row.route), row.id);
    }
  }
}

// the journeys' flows are not listed: the repository names each file, its title opening with the journey's id
function of(ticket: ExpectedTicket, spec: ComponentsSpec): ExpectedFile[] {
  const { files, add } = collector();
  addSpecFiles(ticket, { spec, add });
  addEndpointFiles(ticket, add);
  for (const criterion of ticket.acceptance ?? []) {
    const found = String(criterion).match(/\be2e\/[\w/.-]+\.spec\.ts/g) ?? [];
    found.forEach((file) => add(file, 'acceptance'));
  }
  return files;
}

function text(ticket: ExpectedTicket, spec: ComponentsSpec): string {
  return of(ticket, spec)
    .map((file) => `${file.path} (${file.why.join(', ')})`)
    .join(' · ');
}

export { named, reads, text };
