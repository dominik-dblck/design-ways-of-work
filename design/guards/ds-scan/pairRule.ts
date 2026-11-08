/**
 * - `pair` · text whose fill is an ancestor's, judged on the fill a reader sees
 * - it walks the tag stack, carrying the nearest background down to the text
 */
import type { Push, Rule, ScanContext } from './dsScanTypes.ts';
import {
  fillOf,
  fontSizeOf,
  inkOf,
  isInactive,
  judgePair,
} from './styleReading.ts';

interface Layer {
  readonly fill: string;
  readonly size: number;
  readonly unknown: boolean;
}

const PAGE: Layer = { fill: 'var(--bg-display)', size: 12, unknown: false };

// a background from a {{ hole }} is unknown, not inherited: treating it as the ancestor's invents pairs on elements whose real fill is a runtime colour
function layerOf(style: string, top: Layer): Layer {
  const background = fillOf(style);
  const font = fontSizeOf(style);
  const own =
    background && !/transparent|none|gradient|\{\{/.test(background[1]);
  return {
    fill: own ? background[1].trim() : top.fill,
    size: font ? Number(font[1]) : top.size,
    unknown: top.unknown || (background !== null && /\{\{/.test(background[1])),
  };
}

// 4.5:1, 3:1 from 24px, 7:1 under 12px for a receding grey or a chip ink on a page or paper
function needOf(ink: string, layer: Layer): number {
  if (layer.size >= 24) return 3;
  const chipInk = /var\(--(st|ch)-[a-z-]+-fg\)/.test(ink);
  const neutral = /var\(--(fg|ink-micro)/.test(ink);
  const onPaper =
    /var\(--(bg-display|bg-secondary|bg-subtle|bg-container|ui-paper-bg)\)/.test(
      layer.fill,
    );
  return layer.size < 12 && (neutral || chipInk) && onPaper ? 7 : 4.5;
}

function checkTag(
  style: string,
  {
    layer,
    at,
    ctx,
    push,
  }: {
    readonly layer: Layer;
    readonly at: number;
    readonly ctx: ScanContext;
    readonly push: Push;
  },
): void {
  const ink = inkOf(style);
  if (!ink || layer.unknown || /\{\{/.test(ink[1]) || /\{\{/.test(layer.fill))
    return;
  // the inactive roles are that state by name: the evidence is the token, not a cursor somebody remembered to write
  if (isInactive(style)) return;
  judgePair(
    {
      ink: ink[1],
      fill: layer.fill,
      size: layer.size,
      need: needOf(ink[1], layer),
      at,
    },
    { ctx, push },
  );
}

const pair: Rule = {
  id: 'pair',
  what: 'text whose fill comes from an ancestor and does not clear its minimum',
  because:
    'three defect classes hid in the same blind spot: rule contrast can only judge an ink and a fill declared in ONE style attribute, and most text inherits its surface from a parent. --fg-regular/--fg-normal hid there until rule ink, 10px eyebrows until rule micro, and the active agent toggle until review measured the rendered DOM — its label read --fg-empty on --bg-primary at 4.08 in dark, and AppShell shipped the same pill with --fg-tertiary at 1.40, because --bg-primary inverts (black to cyan) AND the neutral ink inverts, so the pair breaks at the far end. This rule walks the authored tag stack, carries the nearest ancestor background down, and checks the pair the reader actually sees (18 Sep)',
  exemptFiles: ['EmailPreview', 'PhonePreview', 'Browser'],
  run: (text, { push, ctx }) => {
    // one pass over the open and close tags, keeping a stack of what each one sits on
    const stack: Layer[] = [PAGE];
    for (const match of text.matchAll(/<(\/?)([a-z-]+)([^>]*)>/gi)) {
      const attrs = match[3];
      if (match[1] === '/') {
        if (stack.length > 1) stack.pop();
        continue;
      }
      const style = (attrs.match(/style="([^"]*)"/) ?? [])[1] ?? '';
      const layer = layerOf(style, stack[stack.length - 1]);
      checkTag(style, { layer, at: match.index, ctx, push });
      const isVoid =
        /^(img|br|hr|input|meta|link|source)$/.test(match[2].toLowerCase()) ||
        /\/$/.test(attrs);
      if (!isVoid) stack.push(layer);
    }
  },
};

export { pair };
