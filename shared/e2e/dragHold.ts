/**
 * - `aHold`, `Hold` · a drag the page is shown move by move, then let go or ended
 * - a pointer that stops keeps sending, as a browser does; a moved target followed
 */
import type { CDPSession, Locator, Page } from '@playwright/test';
import { pointOn, sentData, theNextFrame } from './dragPointer.ts';
import type { DragData, DragSpot, Point } from './dragPointer.ts';

const STEPS = 8;
const HELD_STILL = 3;
const AIMS = 3;
const ON_TARGET = 1;

type DragMove = 'dragEnter' | 'dragOver' | 'drop' | 'dragCancel';
type Send = (type: DragMove, point: Point) => Promise<unknown>;

export type Hold = {
  readonly send: Send;
  readonly over: (target: Locator, spot?: DragSpot) => Promise<void>;
  readonly end: (type: 'drop' | 'dragCancel') => Promise<Point>;
};

// from one point to another in steps, then held still a few frames there
const glide = async (
  page: Page,
  {
    send,
    from,
    to,
  }: { readonly send: Send; readonly from: Point; readonly to: Point },
): Promise<void> => {
  for (let step = 1; step <= STEPS; step += 1) {
    await send('dragOver', {
      x: from.x + ((to.x - from.x) * step) / STEPS,
      y: from.y + ((to.y - from.y) * step) / STEPS,
    });
    await theNextFrame(page);
  }
  for (let still = 1; still <= HELD_STILL; still += 1) {
    await send('dragOver', to);
    await theNextFrame(page);
  }
};

// aimed at a target a few times, so one the page moves while the pointer travels is followed
const aimedAt = async (
  target: Locator,
  {
    spot,
    moveTo,
    atNow,
  }: {
    readonly spot: DragSpot | undefined;
    readonly moveTo: (to: Point) => Promise<void>;
    readonly atNow: () => Point | null;
  },
): Promise<void> => {
  for (let aim = 1; aim <= AIMS; aim += 1) {
    const to = await pointOn(target, spot);
    const at = atNow();
    if (
      aim > 1 &&
      at !== null &&
      Math.hypot(to.x - at.x, to.y - at.y) < ON_TARGET
    )
      return;
    await moveTo(to);
  }
};

// the pointer is at `entered` once over the page, null before
export const aHold = ({
  page,
  cdp,
  carried,
  entered,
}: {
  readonly page: Page;
  readonly cdp: CDPSession;
  readonly carried: DragData;
  readonly entered: Point | null;
}): Hold => {
  let at = entered;
  const send: Send = (type, point) =>
    cdp.send('Input.dispatchDragEvent', {
      type,
      x: point.x,
      y: point.y,
      data: sentData(carried),
    });
  const moveTo = async (to: Point): Promise<void> => {
    if (at === null) await send('dragEnter', to);
    await glide(page, { send, from: at ?? to, to });
    at = to;
  };
  const over = (target: Locator, spot?: DragSpot): Promise<void> =>
    aimedAt(target, { spot, moveTo, atNow: () => at });
  const end = async (type: 'drop' | 'dragCancel'): Promise<Point> => {
    if (at === null) throw new Error('nothing was carried over the page');
    await send(type, at);
    return at;
  };
  return { send, over, end };
};
