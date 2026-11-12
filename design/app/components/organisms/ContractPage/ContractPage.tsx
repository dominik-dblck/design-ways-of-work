/**
 * - `ContractPage` · the page whole: head, legend, filters, shared, endpoints
 */
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import {
  contractPage,
  contractWords as words,
} from '../../../workspace/contractView.ts';
import { SectionHead } from '../../atoms/SectionHead/index.ts';
import { ContractPageEndpointCard } from './components/ContractPageEndpointCard.tsx';
import { ContractPageFilters } from './components/ContractPageFilters.tsx';
import { ContractPageHead } from './components/ContractPageHead.tsx';
import { ContractPageLegend } from './components/ContractPageLegend.tsx';
import { ContractPageSharedTypes } from './components/ContractPageSharedTypes.tsx';
import { firstPicked, shownOf } from './utils/contractPagePickedUtils.ts';

function ContractPage(): ReactElement {
  const page = useMemo(contractPage, []);
  const [picked, setPicked] = useState(() => firstPicked(page.epics));
  const shown = shownOf(page.endpoints, picked);
  return (
    <Container maxWidth="lg" sx={{ py: 5.5 }}>
      <Stack spacing={4}>
        <ContractPageHead stats={page.stats} />
        <ContractPageLegend legend={page.legend} />
        <ContractPageFilters page={page} picked={picked} onPick={setPicked} />
        <ContractPageSharedTypes shared={page.shared} />
        <Stack spacing={3}>
          <SectionHead
            label={words.endpoints.label}
            note={`${shown.length} · ${words.endpoints.note}`}
          />
          {shown.length === 0 ? (
            <Typography color="textSecondary">{words.nothing}</Typography>
          ) : null}
          {shown.map((endpoint) => (
            <ContractPageEndpointCard
              key={endpoint.anchor}
              endpoint={endpoint}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export { ContractPage };
