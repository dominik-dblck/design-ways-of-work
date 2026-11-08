/**
 * - `ScreensSection` · each screen the read list names, framed in the page's theme
 */
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement, SyntheticEvent } from 'react';
import { featureWords as words } from '../../workspace/feature-view.ts';
import type { LinkRow } from '../../workspace/feature-view.ts';
import { SectionHead } from '../common/SectionHead.tsx';

// a drawn page reads its theme off its root, so a frame takes the page's own
function themed(event: SyntheticEvent<HTMLIFrameElement>): void {
  const theme = document.documentElement.getAttribute('data-theme') ?? 'light';
  event.currentTarget.contentDocument?.documentElement.setAttribute('data-theme', theme);
}

function ScreenFrame({ row }: { readonly row: LinkRow }): ReactElement {
  const href = row.href ?? '';
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'baseline', px: 2, py: 1.5 }}>
        <Typography variant="subtitle2" sx={{ flex: 1 }}>{row.label}</Typography>
        <Link href={href} variant="body2">{words.screens.open}</Link>
      </Stack>
      <Box
        component="iframe"
        src={href}
        title={row.label}
        onLoad={themed}
        sx={{ display: 'block', width: 1, height: 720, border: 0, borderTop: 1, borderColor: 'divider' }}
      />
    </Paper>
  );
}

function ScreensSection({ rows }: { readonly rows: readonly LinkRow[] }): ReactElement | null {
  if (!rows.length) return null;
  return (
    <Stack spacing={1.5} id="screens">
      <SectionHead label={words.screens.label} note={words.screens.note} />
      {rows.map((row) => (
        <ScreenFrame key={row.label} row={row} />
      ))}
    </Stack>
  );
}

export { ScreensSection };
