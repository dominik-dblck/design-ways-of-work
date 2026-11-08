/**
 * - `ports`, `open` · the ports' questions, and the points the backlog leaves open
 * - `kinds` · each kind of ticket, its label and what it means
 */
import { open as OPEN, ports as PORTS } from '../../../roadmaps/backlog.ts';
import { kinds as KINDS } from '../../../roadmaps/tickets.ts';

const ports = (): typeof PORTS => PORTS;

const open = (): readonly { readonly area: string; readonly why: string }[] =>
  OPEN.map(([area, why]) => ({ area, why }));

const kinds = (): readonly {
  readonly label: string;
  readonly means: string;
}[] => Object.values(KINDS).map(({ label, means }) => ({ label, means }));

export { kinds, open, ports };
