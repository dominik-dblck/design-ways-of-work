/**
 * - `isEpic`, `firstOpened` · an epic with a tab; the one the page opens on
 */
import { pickedEpic } from '../../../../workspace/boardView.ts';
import { features, firstEpic } from '../../../../workspace/featureView.ts';

const isEpic = (epic: string | null): epic is string =>
  features().some((tab) => tab.epic === epic);

// the address names the epic (Feature.html?epic=<its id>), else the board's last pick, else the first not done
function firstOpened(): string {
  // drawn on the server in a test, the page has no address
  const search = typeof window === 'undefined' ? '' : window.location.search;
  const asked = new URLSearchParams(search).get('epic');
  const remembered = pickedEpic.remembered();
  if (isEpic(asked)) return asked;
  return isEpic(remembered) ? remembered : (firstEpic() ?? '');
}

export { firstOpened, isEpic };
