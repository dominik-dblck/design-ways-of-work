/**
 * - `EXAMPLE_TICKET`, `EXAMPLE_EPIC` · the feature run's example ticket, its epic
 */
import { cite } from '../../documents/cited.ts';

const EXAMPLE_TICKET = cite('modes.exampleTicket', 'T-E01-00');
const EXAMPLE_EPIC = EXAMPLE_TICKET.slice(2, 5);

export { EXAMPLE_EPIC, EXAMPLE_TICKET };
