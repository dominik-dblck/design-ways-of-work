/**
 * - `FeaturePageFieldOptions` · what any field may set
 * - each with its type and what it means
 */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { FieldOptionView } from '../../../../workspace/featureFieldTypes.ts';
import { FeaturePageFieldOption } from './FeaturePageFieldOption.tsx';

function FeaturePageFieldOptions({
  options,
}: {
  readonly options: readonly FieldOptionView[];
}): ReactElement | null {
  if (!options.length) return null;
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" component="h3">
        {words.fields.options}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 1,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        {options.map((one) => (
          <FeaturePageFieldOption key={one.name} one={one} />
        ))}
      </Box>
    </Stack>
  );
}

export { FeaturePageFieldOptions };
