/**
 * - `FeaturePageNotePoints` · a line's points, each a bullet, its bold words kept
 */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import type { NotePoint } from '../../../../workspace/featureView.ts';

interface FeaturePageNotePointsProps {
  readonly points: readonly NotePoint[];
}

function FeaturePageNotePoints({
  points,
}: FeaturePageNotePointsProps): ReactElement {
  return (
    <List dense disablePadding sx={{ listStyleType: 'disc', pl: 2.5 }}>
      {points.map((point, at) => (
        <ListItem
          key={at}
          disableGutters
          sx={{ display: 'list-item', py: 0.25 }}
        >
          <Typography variant="body2">
            {point.map((part, from) => (
              <Typography
                key={from}
                component="span"
                variant="inherit"
                sx={{ fontWeight: part.strong ? 'fontWeightBold' : undefined }}
              >
                {part.text}
              </Typography>
            ))}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}

export { FeaturePageNotePoints };
