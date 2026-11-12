/**
 * - `FeaturePageCaseChips` · a case's kind above its reach, a two-sided case marked
 */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { ReactElement } from 'react';
import { featureWords as words } from '../../../../workspace/featureView.ts';
import type { CaseGroup } from '../../../../workspace/featureView.ts';
import { caseKindToneOf, reachToneOf } from '../../../../theme/tones.ts';

interface FeaturePageCaseChipsProps {
  readonly one: CaseGroup['cases'][number];
}

function FeaturePageCaseChips({
  one,
}: FeaturePageCaseChipsProps): ReactElement {
  return (
    <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
      <Chip size="small" color={caseKindToneOf(one.kind)} label={one.kind} />
      <Chip
        size="small"
        variant="outlined"
        color={reachToneOf(one.reach)}
        label={one.reach}
      />
      {one.compound ? (
        <Chip size="small" color="error" label={words.cases.compound} />
      ) : null}
    </Stack>
  );
}

export { FeaturePageCaseChips };
