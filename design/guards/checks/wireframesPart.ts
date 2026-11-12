/**
 * - `wireframesPart` · part w: every wireframe through the editor's view: no error,
 * - the gaps under their baseline, the views against their snapshot
 */
import { wireframesSnapshot } from '../__snapshots__/wireframesSnapshot.ts';
import { lineOf, errorMessageOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import { snapshotRecord, snapshotText } from './snapshotModule.ts';
import type { ProductScreens } from '../../tools/productTypes.ts';
import * as WIREFRAMES from '../../sheet/screens/wireframes.ts';

// every wireframe's data is in the samples: the gaps are held at none
const GAPS_HELD = 0;

interface Swept {
  readonly errors: readonly string[];
  readonly gaps: readonly string[];
  readonly views: Readonly<Record<string, unknown>>;
}

function sweepFaults(screens: ProductScreens): Pick<Swept, 'errors' | 'gaps'> {
  const swept = screens.sweep();
  return {
    errors: swept.flatMap((one) =>
      one.error ? [`${one.num} ${one.error}`] : [],
    ),
    gaps: swept.flatMap((one) =>
      (one.gaps || []).map(
        (gap) =>
          `${one.num} · ${gap.what} · ${String(gap.why || '').slice(0, 50)}`,
      ),
    ),
  };
}

function swept(screens: ProductScreens): Swept {
  const { errors: sweepErrors, gaps } = sweepFaults(screens);
  const errors = [...sweepErrors];
  const views = new Map<string, unknown>();
  for (const frame of WIREFRAMES.all)
    try {
      const drawn = JSON.stringify(
        screens.editorView(frame.num),
        (_, drawnValue: unknown) =>
          typeof drawnValue === 'function' ? undefined : drawnValue,
      );
      views.set(frame.num, JSON.parse(drawn));
    } catch (error) {
      errors.push(`${frame.num} view · ${errorMessageOf(error)}`);
    }
  return { errors, gaps, views: Object.fromEntries(views) };
}

function viewsLine(
  mirror: Mirror,
  views: Readonly<Record<string, unknown>>,
): string {
  if (mirror.mode === 'snap') {
    mirror.save(
      'scraps/wireframesSnapshot.ts',
      snapshotText('wireframesSnapshot', views),
    );
    return lineOf('wireframes · snapshot', {
      ok: true,
      text: `${Object.keys(views).length} taken`,
    });
  }
  const was = snapshotRecord(wireframesSnapshot);
  const moved = Object.keys(views).filter(
    (key) => JSON.stringify(was[key]) !== JSON.stringify(views[key]),
  );
  const held = Object.keys(was).length;
  const named = moved.length ? ` · ${moved.slice(0, 8).join(', ')}` : '';
  return lineOf('wireframes · views', {
    ok: !moved.length || !held,
    text: held ? `${moved.length} moved${named}` : 'no snapshot yet',
  });
}

// the screens come from the product's entry point: a product with none runs no line here
function wireframesPart(
  mirror: Mirror,
  screens?: ProductScreens,
): readonly string[] {
  if (screens === undefined) return [];
  const { errors, gaps, views } = swept(screens);
  return [
    lineOf('wireframes · errors', {
      ok: !errors.length,
      text:
        errors.slice(0, 5).join(' | ') || `${Object.keys(views).length} views`,
    }),
    lineOf('wireframes · gaps', {
      ok: gaps.length <= GAPS_HELD,
      text: `${gaps.length} (baseline ${GAPS_HELD})${gaps.length ? ` · ${gaps.slice(0, 6).join(' | ')}` : ''}`,
    }),
    viewsLine(mirror, views),
  ];
}

export { wireframesPart };
