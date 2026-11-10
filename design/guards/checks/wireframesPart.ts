/**
 * - `wireframesPart` · part w: every wireframe through the editor's view: no error,
 * - the gaps under their baseline, the views against their snapshot
 */
import { lineOf, errorMessageOf } from './checkWorld.ts';
import type { Mirror } from './checkWorld.ts';
import * as SCREEN_VIEW from '../../sheet/screens/screenView.ts';
import * as WIREFRAMES from '../../sheet/screens/wireframes.ts';

// every wireframe's data is in the samples: the gaps are held at none
const GAPS_HELD = 0;

interface Swept {
  readonly errors: readonly string[];
  readonly gaps: readonly string[];
  readonly views: Readonly<Record<string, unknown>>;
}

type View = typeof SCREEN_VIEW;

function sweepFaults(view: View): Pick<Swept, 'errors' | 'gaps'> {
  const swept = Object.values(view.sweep());
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

function swept(): Swept {
  const { errors: sweepErrors, gaps } = sweepFaults(SCREEN_VIEW);
  const errors = [...sweepErrors];
  const views = new Map<string, unknown>();
  for (const frame of WIREFRAMES.all)
    try {
      const drawn = JSON.stringify(
        SCREEN_VIEW.editorView(frame.num),
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
    mirror.save('scraps/wireframes-snapshot.json', JSON.stringify(views));
    return lineOf('wireframes · snapshot', {
      ok: true,
      text: `${Object.keys(views).length} taken`,
    });
  }
  const was: Readonly<Record<string, unknown>> = JSON.parse(
    mirror.readOr('scraps/wireframes-snapshot.json', null) ?? '{}',
  );
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

function wireframesPart(mirror: Mirror): readonly string[] {
  const { errors, gaps, views } = swept();
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
