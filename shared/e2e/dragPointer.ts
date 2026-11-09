/**
 * - `pointOn`, `pointer`, `pressedPast`, `aPointThatReaches` · the pointer's moves
 * - `theNextFrame`, `theDragOf`, `sentData` · a frame, a drag the browser starts
 * - `Point`, `DragData`, `DragSpot` · a point, what a drag carries, where it rests
 */
import type { CDPSession, Locator, Page } from '@playwright/test';

export type Point = { readonly x: number; readonly y: number };

// what a drag carries, as the DevTools protocol names it: the page's own items, or files from disk
export type DragData = {
  readonly items: readonly {
    readonly mimeType: string;
    readonly data: string;
    readonly title?: string;
    readonly baseURL?: string;
  }[];
  readonly files?: readonly string[];
  readonly dragOperationsMask: number;
};

/** Where on a target the pointer rests · fractions of its box, the middle by default. */
export type DragSpot = { readonly x?: number; readonly y?: number };

type PointerMove = 'mouseMoved' | 'mousePressed' | 'mouseReleased';

const PAST_THE_THRESHOLD = 12;
const STARTS_WITHIN_MS = 5_000;

export const pointOn = async (
  target: Locator,
  spot: DragSpot = {},
): Promise<Point> => {
  const box = await target.boundingBox();
  if (box === null) throw new Error('the drag’s target is not drawn');
  return {
    x: box.x + box.width * (spot.x ?? 0.5),
    y: box.y + box.height * (spot.y ?? 0.5),
  };
};

export const pointer = (
  cdp: CDPSession,
  {
    type,
    at,
    isHeld,
  }: {
    readonly type: PointerMove;
    readonly at: Point;
    readonly isHeld: boolean;
  },
): Promise<unknown> =>
  cdp.send('Input.dispatchMouseEvent', {
    type,
    x: at.x,
    y: at.y,
    button: isHeld || type === 'mouseReleased' ? 'left' : 'none',
    buttons: isHeld ? 1 : 0,
    clickCount: type === 'mouseMoved' ? 0 : 1,
  });

export const theNextFrame = (page: Page): Promise<unknown> =>
  page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => resolve(null))),
  );

// the protocol's own shape, copied out of the readonly one: it names its arrays writable
export const sentData = (
  carried: DragData,
): {
  readonly items: DragData['items'][number][];
  readonly dragOperationsMask: number;
  readonly files?: string[];
} => ({
  items: [...carried.items],
  dragOperationsMask: carried.dragOperationsMask,
  ...(carried.files === undefined ? {} : { files: [...carried.files] }),
});

export const theDragOf = (
  cdp: CDPSession,
): Promise<{ readonly data: DragData }> =>
  new Promise((resolve, reject) => {
    const late = setTimeout(
      () => reject(new Error('the browser started no drag from the source')),
      STARTS_WITHIN_MS,
    );
    cdp.once('Input.dragIntercepted', (event) => {
      clearTimeout(late);
      resolve(event);
    });
  });

// a point on the source no other element covers, waited for as a click waits: a closing dialog takes no press
export const aPointThatReaches = async (
  page: Page,
  source: Locator,
): Promise<Point> => {
  const until = Date.now() + STARTS_WITHIN_MS;
  for (;;) {
    const at = await pointOn(source);
    const isReached = await source.evaluate((element, point) => {
      const hit = element.ownerDocument.elementFromPoint(point.x, point.y);
      return hit !== null && element.contains(hit);
    }, at);
    if (isReached) return at;
    if (Date.now() > until)
      throw new Error('another element covers the drag’s source');
    await theNextFrame(page);
  }
};

// pressed at `start`, moved past the browser's drag threshold in three steps; the point it rests at
export const pressedPast = async (
  cdp: CDPSession,
  start: Point,
): Promise<Point> => {
  await pointer(cdp, { type: 'mouseMoved', at: start, isHeld: false });
  await pointer(cdp, { type: 'mousePressed', at: start, isHeld: true });
  for (let step = 1; step <= 3; step += 1)
    await pointer(cdp, {
      type: 'mouseMoved',
      at: { x: start.x, y: start.y + (PAST_THE_THRESHOLD * step) / 3 },
      isHeld: true,
    });
  return { x: start.x, y: start.y + PAST_THE_THRESHOLD };
};
