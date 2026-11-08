/**
 * - `ComponentsSection` · the epic's drawings and logic pages, framed from their page
 */
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement, SyntheticEvent } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { FeatureView } from '../../workspace/feature-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';

// the drawings' page, until the build side's package draws the components here (D62)
const DRAWINGS = 'Feature drawings.dc.html';

// the frame takes the page's theme, then grows with what the drawings draw, late
function useFitted(): readonly [number, (event: SyntheticEvent<HTMLIFrameElement>) => void] {
  const [height, setHeight] = useState(600);
  const watching = useRef<ResizeObserver | null>(null);
  useEffect(() => () => watching.current?.disconnect(), []);
  const loaded = (event: SyntheticEvent<HTMLIFrameElement>): void => {
    const root = event.currentTarget.contentDocument?.documentElement;
    if (!root) return;
    root.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') ?? 'light');
    watching.current?.disconnect();
    watching.current = new ResizeObserver(() => setHeight(Math.max(root.scrollHeight, 200)));
    watching.current.observe(root);
  };
  return [height, loaded];
}

function ComponentsSection({ view }: { readonly view: FeatureView }): ReactElement | null {
  const [height, loaded] = useFitted();
  if (!view.components.length) return null;
  const href = `${DRAWINGS}?epic=${view.epic}`;
  return (
    <Stack spacing={1.5} id="components">
      <SectionHead label={words.components.label} note={words.components.note} />
      <Link href={href} variant="body2">{words.components.open}</Link>
      <Box
        component="iframe"
        key={view.epic}
        src={href}
        title={words.components.label}
        onLoad={loaded}
        sx={{ display: 'block', width: 1, height, border: 0, borderRadius: 2, bgcolor: 'background.default' }}
      />
    </Stack>
  );
}

export { ComponentsSection };
