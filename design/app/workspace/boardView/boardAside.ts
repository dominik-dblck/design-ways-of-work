/**
 * - `ports` · the ports' questions, what the outside still has to tell us
 * - `kinds` · each kind of ticket, its label and what it means
 */
import { ports as PORTS } from '../../../roadmaps/backlog.ts';
import { kinds as KINDS } from '../../../roadmaps/tickets.ts';

const ports = (): typeof PORTS => PORTS;

const kinds = (): readonly {
  readonly label: string;
  readonly means: string;
}[] => Object.values(KINDS).map(({ label, means }) => ({ label, means }));

export { kinds, ports };
