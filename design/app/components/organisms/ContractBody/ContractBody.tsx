/**
 * - `ContractBody` · the contract whole: numbers, legend, filters, shared, endpoints
 */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import {
  contractPage,
  contractWords as words,
} from '../../../workspace/contractView.ts';
import { Heading } from '../../atoms/Heading/index.ts';
import { EndpointFolds } from '../EndpointFolds/index.ts';
import { ContractBodyFilters } from './components/ContractBodyFilters.tsx';
import { ContractBodyLegend } from './components/ContractBodyLegend.tsx';
import { ContractBodySharedTypes } from './components/ContractBodySharedTypes.tsx';
import { ContractBodyStats } from './components/ContractBodyStats.tsx';
import { firstPicked, shownOf } from './utils/contractBodyPickedUtils.ts';

function ContractBody(): ReactElement {
  const page = useMemo(contractPage, []);
  const [picked, setPicked] = useState(() => firstPicked(page.epics));
  const shown = shownOf(page.endpoints, picked);
  return (
    <Stack spacing={4}>
      <ContractBodyStats stats={page.stats} />
      <ContractBodyLegend legend={page.legend} />
      <ContractBodyFilters page={page} picked={picked} onPick={setPicked} />
      <ContractBodySharedTypes shared={page.shared} />
      <Stack spacing={3}>
        <Heading
          level={2}
          quiet
          note={`${shown.length} · ${words.endpoints.note}`}
        >
          {words.endpoints.label}
        </Heading>
        {shown.length === 0 ? (
          <Typography color="textSecondary">{words.nothing}</Typography>
        ) : null}
        <EndpointFolds endpoints={shown} />
      </Stack>
    </Stack>
  );
}

export { ContractBody };
