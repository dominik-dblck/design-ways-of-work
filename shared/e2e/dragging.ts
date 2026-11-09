/**
 * - `pickUp`, `startsADrag`, `HeldDrag` · a source picked up as a person does
 * - through the DevTools protocol: a drag a library on the window reads
 * - `carryIn`, `CarriedFiles` · files carried in from the desktop
 */
import type { Locator, Page } from '@playwright/test';
import { aHold } from './dragHold.ts';
import {
  aPointThatReaches,
  pointer,
  pressedPast,
  sentData,
  theDragOf,
  theNextFrame,
} from './dragPointer.ts';
import type { DragData, DragSpot } from './dragPointer.ts';

const SETTLES = 6;
const COPY = 1;

// a drag the browser holds: moved over a target, then let go
export type HeldDrag = {
  readonly over: (target: Locator, spot?: DragSpot) => Promise<void>;
  readonly drop: () => Promise<void>;
};

// files held over the page, let go or ended; it gets no dragleave, so a zone is left by moving off it first
export type CarriedFiles = HeldDrag & { readonly away: () => Promise<void> };

/** Picks `source` up as a person does · the browser's own dragstart, each move a dragover the page reads. */
export const pickUp = async (
  page: Page,
  source: Locator,
): Promise<HeldDrag> => {
  const start = await aPointThatReaches(page, source);
  const cdp = await page.context().newCDPSession(page);
  const intercepted = theDragOf(cdp);
  await cdp.send('Input.setInterceptDrags', { enabled: true });
  const entered = await pressedPast(cdp, start);
  const { data } = await intercepted;
  const hold = aHold({ page, cdp, carried: data, entered });
  await hold.send('dragEnter', entered);
  return {
    over: hold.over,
    drop: async () => {
      const at = await hold.end('drop');
      await pointer(cdp, { type: 'mouseReleased', at, isHeld: false });
      await cdp.send('Input.setInterceptDrags', { enabled: false });
      await cdp.detach();
    },
  };
};

/** Presses `source` past the threshold and lets go · whether the browser started a drag, read after a few frames. */
export const startsADrag = async (
  page: Page,
  source: Locator,
): Promise<boolean> => {
  const start = await aPointThatReaches(page, source);
  const cdp = await page.context().newCDPSession(page);
  let carried: DragData | null = null;
  cdp.on('Input.dragIntercepted', (event) => {
    carried = event.data;
  });
  await cdp.send('Input.setInterceptDrags', { enabled: true });
  const past = await pressedPast(cdp, start);
  for (let frame = 1; frame <= SETTLES; frame += 1) await theNextFrame(page);
  const started: DragData | null = carried;
  if (started !== null)
    await cdp.send('Input.dispatchDragEvent', {
      type: 'dragCancel',
      x: past.x,
      y: past.y,
      data: sentData(started),
    });
  await pointer(cdp, { type: 'mouseReleased', at: past, isHeld: false });
  await cdp.send('Input.setInterceptDrags', { enabled: false });
  await cdp.detach();
  return started !== null;
};

/** Files carried in from outside the window · their types read on each move, the files on the drop. */
export const carryIn = async (
  page: Page,
  paths: readonly string[],
): Promise<CarriedFiles> => {
  const cdp = await page.context().newCDPSession(page);
  const hold = aHold({
    page,
    cdp,
    carried: { items: [], files: paths, dragOperationsMask: COPY },
    entered: null,
  });
  const end = async (type: 'drop' | 'dragCancel'): Promise<void> => {
    await hold.end(type);
    await cdp.detach();
  };
  return {
    over: hold.over,
    drop: () => end('drop'),
    away: () => end('dragCancel'),
  };
};
