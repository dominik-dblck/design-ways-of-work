/**
 * - `Picked`, `firstPicked` · the filters' state, read first from the page's link
 * - `shownOf` · the endpoints the filters leave
 */
import type {
  EndpointCode,
  EndpointState,
} from '../../../../workspace/contractView.ts';

interface Picked {
  readonly state: EndpointState | null;
  readonly epic: string | null;
}

// a link may open the contract on one epic: Contract.html?epic=<its id>; drawn in a test, no address
function firstPicked(epics: readonly string[]): Picked {
  const search = typeof window === 'undefined' ? '' : window.location.search;
  const asked = new URLSearchParams(search).get('epic');
  return { state: null, epic: asked && epics.includes(asked) ? asked : null };
}

const shownOf = (
  endpoints: readonly EndpointCode[],
  picked: Picked,
): readonly EndpointCode[] =>
  endpoints.filter(
    (one) =>
      (!picked.state || one.state === picked.state) &&
      (!picked.epic || one.epic === picked.epic),
  );

export { firstPicked, shownOf };
export type { Picked };
